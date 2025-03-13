import * as UI from '@/components/cobalt/importUI';
import {useFormContext } from '@/components/cobalt/event';
import { ActivityIndicator, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, TextInput } from 'react-native';
import { useMyCartLogic } from '@/source/controller/myCart/myCart';
import { Swipeable } from 'react-native-gesture-handler';
import {  priceItems } from '@/source/constants/commonData';
import { navigateToScreen } from '@/source/constants/Navigations';
import { AddIcon,TrashIcon,RemoveIcon,CloseIcon } from '@/components/ui/icon';
import { styles } from '@/source/styles/MyCart';
import { Icon } from '@/components/ui/icon';
import CbLoader from '@/components/cobalt/cobaltLoader';
import { CbDottedLine } from '@/source/constants/dottedLine';
 
 
const pageId='MyCart';
export default function MyCartScreen(props) {
 
let pageConfigJson = global.appConfigJsonArray.find(item => item.PageId === pageId);
 
global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
 
   const {
     cartConfigData,
     tipData,
     value,
     setValue,
     swipeableRefs,
     closeAllSwipeables,
     handleDelete,
     handleSwipeOpen,
     addTip,
     handleResetTip,
     getCustomTip,
     customTipValue,
     handleSaveTip,
     scrollViewRef,
     keyboardVisible,
     handleIncrement,
     handleDecrement,
     editCommentBtn,
     loading,
     showPickupTime,
     showPickupLocation,
     isCustomTipAdded,
     textInputRef,
     myCartData,
     priceBreakDownData,
     grandTotal,
     isPriceLoaded,
     handlePlaceOrder,
     tipKeyboardOpen,
     orderInstruction,
     orderInstructions,
     setTipKeyboardOpen,
     isOrderPlaced,
     orderSuccessModal,
     successResponse,
     closeSuccessModal,
     closeKeyBoard
   } = useMyCartLogic();
   const { cartData,selectedTime,selectedLocation}= useFormContext();
   
 
 
  const renderModifierList = ({ item }) => {
    return (
      <UI.Box>
        <UI.Text style={styles.itemCategory}>
          {item?.Modifier_Name}
        </UI.Text>
      </UI.Box>
    );
  }
  const renderCartItems = (item) => {
    const renderRightActions = (progress, dragX) => {
      const safeDragX = typeof dragX === "number" && !isNaN(dragX) ? dragX : 0;
      let roundedAbsolute = Math.abs(Math.round(safeDragX));
      setValue(roundedAbsolute);
      return (
          <UI.TouchableOpacity
            style={styles.swipeActionContainer}
            onPress={() => handleDelete(item)}
          >
            <UI.Text style={styles.removeBtb}>Remove</UI.Text>
          </UI.TouchableOpacity>
      );
    };
  
    return (
      <UI.Pressable>
        <Swipeable
          ref={(ref) => {
            swipeableRefs.current[`${item.Item_ID}`] = ref;
          }}
          renderRightActions={renderRightActions}
          onSwipeableOpen={() => handleSwipeOpen(item.Item_ID)}
        >
          <UI.TouchableOpacity
            style={[styles.cardContainer, { opacity: value === 0 ? 1 : 0.5 }]}
            onPress={() => editCommentBtn(props,item)}
          >
            <UI.Box style={styles.mainContainer}>
              <UI.Box style={styles.cartItemContainer}>
                <UI.Text style={styles.itemTitle}>{item.Item_Name}</UI.Text>
                {
                  item?.selectedModifiers && item.selectedModifiers.length > 0 &&
                  <UI.CbFlatList
                    scrollEnabled = {false}
                    flatlistData={item.selectedModifiers}
                    children={renderModifierList}
                  />
                }
                {item?.Modifiers && item.Modifiers.length > 0 && (
                <UI.CbFlatList
                  scrollEnabled={false}
                  flatlistData={item.Modifiers}
                  children={({ item }) => (
                    <UI.Text style={styles.modifierItem}>
                      {item.Modifier_Name}
                    </UI.Text>
                  )}
                />
              )}
              </UI.Box>
 
              <UI.Box style={styles.rightContainer}>
                <UI.Text
                  style={styles.itemPrice}
                >{`$${item.TotalPrice}`}</UI.Text>
 
                <UI.Box style={styles.operationBtn}>
                  <UI.TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => handleDecrement(item)}
                  >
                    <Icon
                      as={item.quantity === 1 ? TrashIcon : RemoveIcon}
                      color="#5773a2"
                      size={"md"}
                      style={styles.trashIcon}
                    />
                  </UI.TouchableOpacity>
 
                  <UI.Text style={styles.quantityTxt}>{item.quantity}</UI.Text>
 
                  <UI.TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => handleIncrement(item)}
                  >
                    <Icon
                      as={AddIcon}
                      color="#5773a2"
                      size={"xl"}
                      style={styles.addIcon}
                    />
                  </UI.TouchableOpacity>
                </UI.Box>
              </UI.Box>
            </UI.Box>
            {item.comments && (
              <UI.Box style={styles.notesContainer}>
                <UI.TouchableOpacity
                  style={styles.commentBtn}
                  onPress={() => editCommentBtn(props,item)}
                >
                  <Image
                    source={require("@/assets/images/icons/messageIcon2x.png")}
                    style={styles.noteIcon}
                  />
                  <UI.Text style={styles.itemNotes}>{item.comments}</UI.Text>
                </UI.TouchableOpacity>
              </UI.Box>
            )}
          </UI.TouchableOpacity>
        </Swipeable>
      </UI.Pressable>
    );
  };
 
  const renderAddTip = (tipDetails,index) => {
    let lastIndex = tipData.length - 1;
    let item = tipDetails
    const isCustomAdded = item.isCustomAdded === 1;
  
    const containerStyle = isCustomAdded
      ? styles.customTipItem
      : [
          styles.tipMainContainer,
          { backgroundColor: item.isSelected ? '#00BFF6' : '#fff' },
        ];
  
    const textStyle = isCustomAdded
      ? [styles.tipCount, { color: '#000' }]
      : [styles.tipCount, { color: item.isSelected ? '#fff' : '#00BFF6' }];
    return(
     <>
        <UI.TouchableOpacity style={containerStyle} onPress={() => addTip(tipDetails)}>
          <UI.Text style={textStyle}>{`${item.tip}`}</UI.Text>
        </UI.TouchableOpacity>
       {
        (lastIndex === index && isCustomTipAdded) &&
        <UI.Box style={[styles.tipMainContainer,{ backgroundColor:"#fff",}]} >
            <TextInput
              ref={textInputRef}
              placeholder='Custom'
              placeholderTextColor="#00BFF6"
              placeholderStyle={styles.inputBox}
              keyboardType='phone-pad'
              style={styles.enteredTxt}
              onFocus={() => handleResetTip()}
              onBlur={() => handleResetTip()}
              onChangeText={(value) => getCustomTip(value)}
              value={customTipValue}
              onSubmitEditing={() => handleSaveTip()}
            />
          </UI.Box>
       }
       
     </>
    )
  }
 
  const PriceRow = ({ label, value }) => (
    <UI.Box style={styles.splitPriceContainer}>
      <UI.Box style={styles.priceLabelContainer}>
        <UI.Text style={styles.priceLabel}>{label}</UI.Text>
      </UI.Box>
      <UI.Box style={styles.valueMainContainer}>
        <UI.Text style={styles.priceLabel}>${value}</UI.Text>
      </UI.Box>
    </UI.Box>
  );
  
  const PriceDetails = () => (
    <UI.Box style={styles.priceContainer}>
      <UI.Box style={styles.priceSubContainer}>
        {priceBreakDownData && priceBreakDownData?.map((item, index) => (
          <PriceRow key={index} label={item.Label} value={item.Value} />
        ))}
      </UI.Box>
    </UI.Box>
  );
 
 
  const renderCartPriceCalculations = () => {
    return (
      <>
        <UI.Box style={styles.mainSubContainer}>
          <UI.TouchableOpacity style={styles.orderInstContainer}>
            <Image
              alt="notes"
              source={require("@/assets/images/icons/notes.png")}
              style={styles.notesIcon}
              resizeMode="contain"
            />
            <TextInput
              style={[styles.orderInstTxt,{ width:"92%",left:8,height:50}]}
              placeholder='Order Instructions'
              placeholderTextColor={"#4B5154"}
              onChangeText={(text)=>orderInstructions(text)}
              value={orderInstruction}
              onFocus={() =>setTipKeyboardOpen(false)}
              onBlur={() =>setTipKeyboardOpen(false)}
            />
          </UI.TouchableOpacity>
          <UI.CbCommonButton
            id={"addMorebtn"}
            showBtnName={"Add More"}
            screenName={"MenuOrder"}
            onPress={()=>navigateToScreen(props, "MenuOrder", true,{profileCenterTile:props?.route?.params?.profileCenterTile})}
          />
        </UI.Box>
 
        <UI.Box
          style={styles.priceContainer}
        >
          <PriceDetails />
        </UI.Box>
      </>
    )
  }
 
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {
        loading ? <CbLoader />
          :
          <UI.TouchableOpacity style={styles.topContainer} activeOpacity={1} onPress={() => closeAllSwipeables()}>
            <UI.ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} style={{padding:10}}>
              {myCartData && myCartData?.length > 0 ? (
                myCartData?.map((items) => {
                  return renderCartItems(items);
                })
              ) : (
                <UI.View style={styles.cartEmptyContainer}>
                  <UI.Text style={styles.emptyCartTxt}>Cart is empty</UI.Text>
                </UI.View>
              )}
              {myCartData && myCartData.length > 0 && renderCartPriceCalculations()}
            </UI.ScrollView>
 
            {
              cartData && cartData.length > 0 &&
              <UI.Box>
                {
                  cartConfigData?.ShowTip ===1 &&
                  <UI.Box style={styles.tipBox}>
                    <UI.Box style={styles.tipContainer}>
                      <UI.Text style={styles.tipTxt}>ADD OPTIONAL TIP</UI.Text>
                    </UI.Box>
                    <CbDottedLine length={46} dotSize={6} dotColor="#0000002B" />
                    <UI.ScrollView style={{alignSelf:"center"}} bounces={false} keyboardShouldPersistTaps="handled" ref={scrollViewRef} horizontal={true} showsHorizontalScrollIndicator={false}>
                      {
                        tipData && tipData?.map((item, index) => {
                          return renderAddTip(item, index)
                        })
                      }
                    </UI.ScrollView>
                  </UI.Box>
                }
 
                {keyboardVisible && tipKeyboardOpen && (
                  <UI.Box
                    style={styles.bottomBtn}
                  >
                    <UI.CbCommonButton showBtnName="Cancel" style={styles.customBtn} btnTextStyle={styles.btnTextStyle} onPress={() => closeKeyBoard()} />
                    <UI.CbCommonButton showBtnName="Save" style={[styles.customBtn, { backgroundColor: "#5773A2", }]} btnTextStyle={[styles.btnTextStyle, { color: "#fff" }]} onPress={() => handleSaveTip()} />
                  </UI.Box>
                )}
 
                {
                  (cartConfigData?.ShowPickupLocation === 1 || cartConfigData?.ShowPickupTime === 1)
                  && <UI.Box style={styles.pickUpContainer}>
                    {
                      cartConfigData?.ShowPickupTime === 1 &&
                      showPickupTime.length > 0 &&
                      <UI.Box>
                        <UI.Text style={styles.pickUpTimeTxt}>Select Pickup Time</UI.Text>
                        <UI.cbSelectTime
                          id={pageId}
                          selectItems={showPickupTime}
                          style={styles.timeBtn}
                          selectItemLabel={"Select Time"}
                        />
                      </UI.Box>
                    }
 
                    {
                      cartConfigData?.ShowPickupLocation ===1 &&
                      showPickupLocation.length > 0 && 
                      <UI.Box>
                        <UI.Text style={styles.pickUpPointTxt}>Select Pickup Point</UI.Text>
                        <UI.cbSelectTime
                          id={pageId}
                          selectItems={showPickupLocation}
                          style={styles.timeBtn}
                          selectItemLabel={"Select Place"}
                        />
                      </UI.Box>
                    }
                  </UI.Box>
                }
 
                  <UI.TouchableOpacity style={styles.plcOrdBtn} disabled={loading} onPress={() => handlePlaceOrder()}>
                    {
                      isOrderPlaced ? <UI.Box style={styles.loadingContainer}><ActivityIndicator color={"#00C6FF"} size={"small"} /></UI.Box>
                        : <>
                          {
                            isPriceLoaded ? <ActivityIndicator color={"#00C6FF"} size={"small"} />
                              : <UI.Box style={styles.plcMainContainer}>
                                <UI.Text style={styles.totalAmtTxt}>Total Amount</UI.Text>
                                <UI.Text style={styles.totalPrcTxt}>{`$${grandTotal?grandTotal:0}`}</UI.Text>
                              </UI.Box>
                          }
                          <UI.Box style={styles.verticalLn} />
                          <UI.Box style={styles.plcOrderTxtContainer}>
                            <UI.Text style={styles.plcOrderTxt}>Place Order</UI.Text>
                          </UI.Box>
                        </>
                    }
                  </UI.TouchableOpacity>
 
              </UI.Box>
            }
          </UI.TouchableOpacity>
      }
      <Modal
        visible={orderSuccessModal}
        transparent
        animationType="fade"
      >
        <UI.Box
          style={styles.modalContainer}
        />
 
        <UI.Box style={styles.confirmMdl}>
          <UI.Box style={styles.innerModal}>
            <UI.TouchableOpacity onPress={() => closeSuccessModal(props)} style={styles.closeMainContainer}>
              <Icon
                as={CloseIcon}
                color="#5773a2"
                size={"md"}
                style={styles.closeIcon}
              />
            </UI.TouchableOpacity>
            <UI.Box style={styles.innerModalMsgContainer}>
              <Image
                source={require("@/assets/images/icons/dining3x.png")}
                style={styles.diningIcon}
              />
              <UI.Text style={styles.innerModalAlertTxt}>
                {successResponse?.ResponseMessage}
              </UI.Text>
              {
                successResponse?.PickupMesaage?.map((msg) => {
                  return (
                    <>
                      <UI.Text style={styles.pickDetails}>
                        {msg?.Message}
                      </UI.Text>
                      <UI.Text style={styles.timeAlertMsg}>
                        {msg?.Time}
                      </UI.Text>
                      <UI.Text style={styles.timeAlertMsg}>
                        {msg?.Location}
                      </UI.Text>
                    </>
                  )
                })
              }
              <UI.Text style={styles.thankMsg}>
                THANK YOU
              </UI.Text>
            </UI.Box>
          </UI.Box>
        </UI.Box>
      </Modal>
    </KeyboardAvoidingView>
 
  );
}