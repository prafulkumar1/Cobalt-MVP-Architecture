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
import { useMenuOrderLogic } from '@/source/controller/menuOrder/menuOrder';
import ItemModifier from '../ItemModifier/ItemModifierUI';
import { isPlatformAndroid } from '@/source/constants/Matrices';
import { Divider } from '@/components/ui/divider';
import { loadPageConfig } from '@/source/constants/ConfigLoad';
import { useState,useEffect } from "react";
import {transformStyles } from '@/components/cobalt/event'
const pageId='MyCart';
export default function MyCartScreen(props) {

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
     closeKeyBoard,
     handleContentSizeChange,
     height,
     setLoading
   } = useMyCartLogic();
   const { 
    cartData,
    selectedTime,
    selectedLocation,
    itemDataVisible ,
    closePreviewModal,
    isKeyboardVisible,
    setIsVisible,
    updateModifierItemQuantity,
    selectedModifiers,
    setSelectedModifiers,
    singleItemDetails,
    updateOrAddTxt,
    modifierCartItemData,
    setKeyBoard,
    keyBoard
  }= useFormContext();
   
  const modifierCartItem = modifierCartItemData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
  const cartItemDetails = cartData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
  const quantity = cartItemDetails ? cartItemDetails?.quantity : 0;
  const totalCartPrice = cartItemDetails ?  Math.floor(cartItemDetails?.quantityIncPrice * 100) / 100 : 0;
  const singleItemPrice = modifierCartItem ?   Math.floor(modifierCartItem?.quantityIncPrice * 100) / 100 : 0;
  const {handleModifierAddCart,handleCloseItemDetails} = useMenuOrderLogic()
  const [tipContainerConfig, setTipContainerConfig] = useState(null);
  const [tipTextConfig, setTipTextConfig] = useState(null);
  const [customTipConfig, setCustomTipConfig] = useState(null);
  
  useEffect(() => {
      const loadConfig = async () => {
          const containerConfig = await loadPageConfig("MyCart", "TipcontainerStyle");
          const textConfig = await loadPageConfig("MyCart", "TiptextStyle");
          const customTipInput = await loadPageConfig("MyCart", "CustomTipInput");
  
          setTipContainerConfig(containerConfig);
          setTipTextConfig(textConfig);
          setCustomTipConfig(customTipInput);
      };
  
      loadConfig();
  }, []);
 
 
  const renderModifierList = ({ item }) => {
    return (
      <UI.Box>
        <UI.CbText id="CartitemCategory" pageId="MyCart" style={styles.itemCategory}>
          {item?.Modifier_Name}
        </UI.CbText>
      </UI.Box>
    );
  }
  const renderCartItems = (item) => {
    const renderRightActions = (progress, dragX) => {
      const safeDragX = typeof dragX === "number" && !isNaN(dragX) ? dragX : 0;
      let roundedAbsolute = Math.abs(Math.round(safeDragX));
      setValue(roundedAbsolute);
      return (
          <UI.TouchableOpacity  onPress={() => handleDelete(item)}>
            <UI.CbBox id="SwipeActionContainer" pageId="MyCart" style={styles.swipeActionContainer}>
              <UI.CbText id="RemoveBtb" pageId="MyCart" style={styles.removeBtb}></UI.CbText>
            </UI.CbBox>
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
          <UI.TouchableOpacity  style={[styles.cardContainer, { opacity: value === 0 ? 1 : 0.5 }]}  onPress={() => editCommentBtn(props,item)} >
            <UI.CbBox id="ItemmainContainer" pageId="MyCart" style={styles.mainContainer}>
              <UI.CbBox id="CartItemContainer" pageId="MyCart"  style={styles.cartItemContainer}>
                <UI.CbText id="CartitemTitle" pageId="MyCart" style={styles.itemTitle}>{item.Item_Name}</UI.CbText>
                {
                  item?.selectedModifiers && item.selectedModifiers.length > 0 &&
                  <UI.CbFlatList
                    scrollEnabled = {false}
                    flatlistData={item.selectedModifiers}
                    children={renderModifierList}
                  />
                }
              </UI.CbBox>
 
              <UI.CbBox id="CartrightContainer" pageId="MyCart" style={styles.rightContainer}>
                <UI.CbText id="CartTotalPrice" pageId="MyCart"
                  style={styles.itemPrice}
                >{`$${item.TotalPrice}`}</UI.CbText>
 
                <UI.CbBox id="CartoperationBtn" pageId="MyCart" style={styles.operationBtn}>
                  <UI.TouchableOpacity onPress={() => handleDecrement(item)}>
                    <UI.CbBox id="DecrementButton" pageId="MyCart" style={styles.iconBtn}>
                          {item.quantity === 1 ? (
                           <Image source={require('@/assets/images/icons/Trash_Icon3x.png')} resizeMode='contain' style={styles.addCartIcons}/>  
                          ) : (
                            <Image source={require('@/assets/images/icons/Minus_Icon3x.png')} resizeMode='contain' style={styles.addCartIcons}/> 
                          )}
                    </UI.CbBox>
                  </UI.TouchableOpacity>
 
                  <UI.CbText id="Itemquantitytxt" pageId="MyCart" style={styles.quantityTxt}>{item.quantity}</UI.CbText>
 
                  <UI.TouchableOpacity  onPress={() => handleIncrement(item)} >
                    <UI.CbBox id="IncrementButton" pageId="MyCart" style={styles.iconBtn}>
                          <Image source={require('@/assets/images/icons/Plus_Icon3x.png')} resizeMode='contain' style={styles.addCartIcons}/>      
                    </UI.CbBox>
                  </UI.TouchableOpacity>                  
                </UI.CbBox>
              </UI.CbBox>
            </UI.CbBox>
            {item.comments && (
              <UI.CbBox id="NotesContainer" pageId="MyCart" style={styles.notesContainer}>
                <UI.TouchableOpacity  onPress={() => editCommentBtn(props,item)}  >
                  <UI.CbBox id="CommentBtn" pageId="MyCart" style={styles.commentBtn}>
                  <UI.CbImage  id="NoteIcon" pageId="MyCart" imageJsx={<Image source={require('@/assets/images/icons/ROComment3x.png')} resizeMode='contain' style={styles.noteIcon}/>}/>       
                   <UI.CbText id="ItemNotes" pageId="MyCart" style={styles.itemNotes}>{item.comments}</UI.CbText>
                  </UI.CbBox>
                </UI.TouchableOpacity>
              </UI.CbBox>
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

     const TipContainerConfigStyles=transformStyles(tipContainerConfig?.Styles);
  
    const containerStyle = isCustomAdded
      ? (TipContainerConfigStyles ? TipContainerConfigStyles.customTipItem :styles.customTipItem)
      : [
          (TipContainerConfigStyles ? TipContainerConfigStyles.tipMainContainer : styles.tipMainContainer),
          {backgroundColor: item.isSelected ? (tipContainerConfig ? tipContainerConfig.Activecolor : "#00BFF6") : (tipContainerConfig ? tipContainerConfig.Inactivecolor : "#fff")},
        ];
        const TipTextConfigStyles=transformStyles(tipTextConfig?.Styles);
  
    const textStyle = isCustomAdded
      ? [(TipTextConfigStyles ? TipTextConfigStyles.tipCount : styles.tipCount), { color: (tipTextConfig ? tipTextConfig.Customcolor :  '#000') }]
      : [(TipTextConfigStyles ? TipTextConfigStyles.tipCount : styles.tipCount), { color: item.isSelected ? (tipTextConfig ? tipTextConfig.Activecolor :  '#ffff') : (tipTextConfig ? tipTextConfig.Inactivecolor : "#00BFF6") }];
    
      const CustomTipConfigStyles= transformStyles(customTipConfig?.Styles);  
      return(
     <>
        <UI.TouchableOpacity activeOpacity={0} onPress={() => addTip(tipDetails)}>
          <UI.Box style={containerStyle}>
            <UI.Text style={textStyle} >{`${item.tip}`}</UI.Text>
          </UI.Box>
        </UI.TouchableOpacity>
       {
        (lastIndex === index && isCustomTipAdded) &&
        <UI.Box style={[(CustomTipConfigStyles ? CustomTipConfigStyles.tipMainContainer : styles.tipMainContainer),{backgroundColor: (customTipConfig? customTipConfig.ContainerBG :"#fff")}]} >
            <TextInput
              ref={textInputRef}
              placeholder= {(customTipConfig? customTipConfig.placeholder : "Custom")}
              placeholderTextColor={(customTipConfig? customTipConfig.placeholderTextColor : "#00BFF6")}
              placeholderStyle={CustomTipConfigStyles ? CustomTipConfigStyles.inputBox : styles.inputBox}
              keyboardType={(customTipConfig? customTipConfig.keyboardType : 'phone-pad')}
              style={CustomTipConfigStyles ? CustomTipConfigStyles.enteredTxt : styles.enteredTxt}
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
    <UI.CbBox id="SplitPriceContainer" pageId="MyCart"  style={styles.splitPriceContainer}>
      <UI.CbBox id="PriceLabelContainer" pageId="MyCart" style={styles.priceLabelContainer}>
        <UI.CbText id="PriceLabel" pageId="MyCart" style={styles.priceLabel}>{label}</UI.CbText>
      </UI.CbBox>
      <UI.CbBox id="ValueMainContainer" pageId="MyCart" style={styles.valueMainContainer}>
        <UI.CbText id="PriceLabel" pageId="MyCart" style={styles.priceLabel}>${value}</UI.CbText>
      </UI.CbBox>
    </UI.CbBox>
  );
  
  const PriceDetails = () => (
    <UI.CbBox id="PriceContainer" pageId="MyCart"   style={styles.priceContainer}>
      <UI.CbBox id="PriceSubContainer" pageId="MyCart"   style={styles.priceSubContainer}>
        {priceBreakDownData && priceBreakDownData?.map((item, index) => (
          <PriceRow key={index} label={item.Label} value={item.Value} />
        ))}
      </UI.CbBox>
    </UI.CbBox>
  );
 
 
  const renderCartPriceCalculations = () => {
    return (
      <>
        <UI.CbBox id="MainSubContainer" pageId="MyCart" style={styles.mainSubContainer}>
          <UI.TouchableOpacity style={[styles.orderInstContainer]}>
          <UI.CbImage  id="OderNoteIcon" pageId="MyCart" imageJsx={<Image source={require('@/assets/images/icons/notes.png')} resizeMode='contain' style={styles.noteIcon}/>}/>  
            {/* <Image
              alt="notes"
              source={require("@/assets/images/icons/notes.png")}
              style={[isPlatformAndroid()?styles.notesIcon:styles.noteIcon2]}
              resizeMode="contain"
            /> */}
            <TextInput
              style={[styles.orderInstTxt,{ width:"92%",left:8,height:height}]}
              placeholder='Order Instructions'
              placeholderTextColor={"#4B5154"}
              onChangeText={(text)=>orderInstructions(text)}
              value={orderInstruction}
              onFocus={() =>{setTipKeyboardOpen(false),setKeyBoard(false)}}
              onBlur={() =>{setTipKeyboardOpen(false),setKeyBoard(true)}}
              multiline={true}
              onContentSizeChange={handleContentSizeChange}
            />
          </UI.TouchableOpacity>
          <UI.CbCommonButton id="Addmore" pageId="MyCart"
            showBtnName={"Add More"}
            screenName={"MenuOrder"}
            isPlusIconAvailable = {true}
            onPress={()=>navigateToScreen(props, "MenuOrder", true,{profileCenterTile:props?.route?.params?.profileCenterTile})}
          />
        </UI.CbBox>
 
        <UI.CbBox id="PriceContainer" pageId="MyCart"  style={styles.priceContainer}>
          <PriceDetails />
        </UI.CbBox>
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
                <UI.View id="CartEmptyContainer" pageId="MyCart" style={styles.cartEmptyContainer}>
                  <UI.CbText id="EmptyCartTxt" pageId="MyCart" style={styles.emptyCartTxt}></UI.CbText>
                </UI.View>
              )}
              {myCartData && myCartData.length > 0 && renderCartPriceCalculations()}
            </UI.ScrollView>
    
            {
              cartData && cartData.length > 0 && keyBoard &&
              <UI.Box> 
                {
                  cartConfigData?.ShowTip ===1 &&
                  <UI.CbBox id="TipBox" pageId="MyCart" style={styles.tipBox}>
                    <UI.CbBox id="TipContainer" pageId="MyCart" style={styles.tipContainer}>
                      <UI.CbText id="TipText" pageId="MyCart" style={styles.tipTxt}></UI.CbText>
                    </UI.CbBox>
                    <CbDottedLine length={46} dotSize={6} dotColor="#0000002B" />
                    <UI.ScrollView scrollEnabled={isPlatformAndroid()?true :false} style={{alignSelf:"center"}} bounces={false} keyboardShouldPersistTaps="handled" ref={scrollViewRef} horizontal={true} showsHorizontalScrollIndicator={false}>
                      {
                        tipData && tipData?.map((item, index) => {
                          return renderAddTip(item, index)
                        })
                      }
                    </UI.ScrollView>
                  </UI.CbBox>
                }
 
                {keyboardVisible && tipKeyboardOpen && (
                  <UI.Box style={styles.bottomBtn}>
                    <UI.CbCommonButton showBtnName="Cancel" style={styles.customBtn} btnTextStyle={styles.btnTextStyle} onPress={() => closeKeyBoard()} />
                    <UI.CbCommonButton showBtnName="Save" style={[styles.customBtn, { backgroundColor: "#5773A2", }]} btnTextStyle={[styles.btnTextStyle, { color: "#fff" }]} onPress={() => handleSaveTip()} />
                  </UI.Box>
                )}
 
                {
                  (cartConfigData?.ShowPickupLocation === 1 || cartConfigData?.ShowPickupTime === 1)
                  && <UI.CbBox id="PickUpContainer" pageId="MyCart" style={styles.pickUpContainer}>
                    {
                      cartConfigData?.ShowPickupTime === 1 &&
                      showPickupTime.length > 0 &&
                      <UI.Box>
                        <UI.CbText id="PickUpTimeTxt" pageId="MyCart" style={styles.pickUpTimeTxt}></UI.CbText>
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
                        <UI.CbText  id="PickUpPointTxt" pageId="MyCart"  style={styles.pickUpPointTxt}></UI.CbText>
                        <UI.cbSelectTime
                          id={pageId}
                          selectItems={showPickupLocation}
                          style={styles.timeBtn}
                          selectItemLabel={"Select Place"}
                        />
                      </UI.Box>
                    }
                  </UI.CbBox>
                }
 
                  <UI.TouchableOpacity  disabled={loading} onPress={() => handlePlaceOrder()}>
                    <UI.CbBox id="PlaceOrdBtnContainer" pageId="MyCart"   style={styles.plcOrdBtn}>
                    {
                      isOrderPlaced ? <UI.CbBox id="LoadingContainer" pageId="MyCart" style={styles.loadingContainer}><UI.CbActivityIndicator id="PriceActivityIndicator" pageId="MyCart" color={"#00C6FF"} size={"small"} /></UI.CbBox>
                        : <>
                          {
                            isPriceLoaded ? <UI.CbActivityIndicator id="PriceActivityIndicator" pageId="MyCart" color={"#00C6FF"} size={"small"} />
                              : <UI.CbBox id="PlcMainContainer" pageId="MyCart"  style={styles.plcMainContainer}>
                                <UI.CbText id="TotalAmtTxt" pageId="MyCart" style={styles.totalAmtTxt}></UI.CbText>
                                <UI.CbText id="TotalPrcTxt" pageId="MyCart" style={styles.totalPrcTxt}>{`$${grandTotal?grandTotal:0}`}</UI.CbText>
                              </UI.CbBox>
                          }
                          <UI.CbBox id="VerticalLn" pageId="MyCart" style={styles.verticalLn} />
                          <UI.CbBox id="PlcOrderTxtContainer" pageId="MyCart" style={styles.plcOrderTxtContainer}>
                            <UI.CbText id="PlcOrderTxt" pageId="MyCart"  style={styles.plcOrderTxt}></UI.CbText>
                          </UI.CbBox>
                        </>
                    }
                    </UI.CbBox>
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
        <UI.CbBox id="ModalContainer" pageId="MyCart" 
          style={styles.modalContainer}
        />
 
        <UI.CbBox id="ConfirmMdl" pageId="MyCart"  style={styles.confirmMdl}>
          <UI.CbBox id="InnerModal" pageId="MyCart"  style={styles.innerModal}>
            <UI.TouchableOpacity onPress={() => closeSuccessModal(props)} >
              <UI.CbBox id="CloseMainContainer" pageId="MyCart"  style={styles.closeMainContainer}>
              <Icon
                as={CloseIcon}
                color="#5773a2"
                size={"md"}
                style={styles.closeIcon}
              />
              </UI.CbBox>
            </UI.TouchableOpacity>
            <UI.CbBox id="InnerModalMsgContainer" pageId="MyCart"  style={styles.innerModalMsgContainer}>
              <Image
                source={require("@/assets/images/icons/dining3x.png")}
                style={styles.diningIcon}
              />
             <Divider style={styles.dividerLine} />
              <UI.CbText id="InnerModalAlertTxt" pageId="MyCart"  style={styles.innerModalAlertTxt}>
                {successResponse?.ResponseMessage}
              </UI.CbText>
              {
                successResponse?.PickupMesaage?.map((msg) => {
                  return (
                    <>
                      <UI.CbText id="PickDetails" pageId="MyCart"  style={styles.pickDetails}>
                        {msg?.Message}
                      </UI.CbText>
                      <UI.CbText id="TimeAlertMsg" pageId="MyCart"  style={styles.timeAlertMsg}>
                        {msg?.Time}
                      </UI.CbText>
                      <UI.CbText id="TimeAlertMsg" pageId="MyCart"  style={styles.timeAlertMsg}>
                        {msg?.Location}
                      </UI.CbText>
                    </>
                  )
                })
              }
              <UI.CbText id="ThankMsg" pageId="MyCart"  style={styles.thankMsg}></UI.CbText>
            </UI.CbBox>
          </UI.CbBox>
        </UI.CbBox>
      </Modal>

      <Modal
          visible={itemDataVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closePreviewModal}
        >
          <UI.CbBox id="ModalBackground" pageId="MyCart"  style={styles.modalBackground}>
            {
              !isKeyboardVisible
              && 
              <UI.TouchableOpacity
              onPress={() =>
                handleCloseItemDetails(
                  setIsVisible,
                  updateModifierItemQuantity,
                  closePreviewModal,
                  selectedModifiers,
                  setSelectedModifiers,
                  singleItemDetails
                )
              }
            >
              <UI.CbBox id="CrossIconcontainer" pageId="MyCart" style={styles.crossIcon}>
              <UI.CbImage id="CloseIcon" pageId="MyCart" imageJsx={<Image source={require('@/assets/images/icons/Modal_Close.png')} style={styles.closeIcon}/>}/> 
              </UI.CbBox>
            </UI.TouchableOpacity>
            }
            <UI.CbBox id="ModiferItems" pageId="MyCart" style={styles.modiferItems}>
              <ItemModifier />
            </UI.CbBox>
            <UI.CbBox id="FooterContainer" pageId="MyCart" style={styles.footerContainer}>
              <UI.Box>
                <UI.CbText id="TotalAmountTxt" pageId="MyCart"  style={styles.totalAmountTxt}>Total Amount</UI.CbText>
                <UI.CbText id="OrderAmount" pageId="MyCart"  style={styles.orderAmount}>{`$${quantity >= 1 ?itemDataVisible ? singleItemPrice :  totalCartPrice : singleItemPrice}`}</UI.CbText>
              </UI.Box>
              <UI.TouchableOpacity  onPress={() => {
                setLoading(true)
                handleModifierAddCart()
                setTimeout(() => {
                  setLoading(false)
                },1000)
              }}>
                <UI.CbBox id="addToCartBtn2" pageId="MyCart" style={styles.addToCartBtn2}>
                <UI.CbText id="AddCartTxt" pageId="MyCart"  style={styles.addCartTxt}>{updateOrAddTxt}</UI.CbText>
                </UI.CbBox>
              </UI.TouchableOpacity>
            </UI.CbBox>
          </UI.CbBox>
        </Modal>
    </KeyboardAvoidingView>
 
  );
}