
import * as UI from '@/components/cobalt/importUI';
import {useFormContext } from '@/components/cobalt/event';
import { Image, Keyboard, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useMyCartLogic } from '@/source/controller/myCart/myCart';
import { Swipeable } from 'react-native-gesture-handler';
import {  departments, pickupLocations, priceItems } from '@/source/constants/commonData';
import { navigateToScreen } from '@/source/constants/Navigations';
import { AddIcon,TrashIcon,RemoveIcon } from '@/components/ui/icon';
import { styles } from '@/source/styles/MyCart';
import { Icon } from '@/components/ui/icon';


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
     finalCartData,
     keyboardVisible,
     handleIncrement,
     handleDecrement,
     editCommentBtn
   } = useMyCartLogic();
   const { cartData,selectedTime,selectedLocation ,closePreviewModal,storeSingleItem}= useFormContext();


  const renderModifierList = ({ item }) => {
    return (
      <UI.TouchableOpacity>
        <UI.Text style={styles.itemCategory}>
          {item?.Modifier_Name}
        </UI.Text>
      </UI.TouchableOpacity>
    );
  }
  const renderCartItems = (item) => {
    const uniqueModifiers = item?.selectedModifiers?.filter((modifier, index, self) => {
      const lastIndex = self.map(item => item.Modifier_Id).lastIndexOf(modifier.Modifier_Id);
      return modifier.isChecked && index === lastIndex;
    });
    const quantityIncPrice =  Math.floor(item?.quantityIncPrice * 100) /100
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
          <UI.Box
            style={[styles.cardContainer, { opacity: value === 0 ? 1 : 0.5 }]}
          >
            <UI.Box style={styles.mainContainer}>
              <UI.Box style={styles.cartItemContainer}>
                <UI.Text style={styles.itemTitle}>{item.Item_Name}</UI.Text>
                {
                  uniqueModifiers && uniqueModifiers.length > 0 &&
                  <UI.CbFlatList
                    scrollEnabled = {false}
                    flatlistData={uniqueModifiers}
                    children={renderModifierList}
                  />
                }
                
              </UI.Box>

              <UI.Box style={[styles.rightContainer,{right:(item.quantity >=10 | `${quantityIncPrice}`.length >= 5 )?21:0}]}>
                <UI.Text
                  style={styles.itemPrice}
                >{`$${quantityIncPrice}`}</UI.Text>

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
                  // onPress={() => editCommentBtn(props,item)} 
                >
                  <Image
                    source={require("@/assets/images/icons/messageIcon2x.png")}
                    style={styles.noteIcon}
                  />
                  <UI.Text style={styles.itemNotes}>{item.comments}</UI.Text>
                </UI.TouchableOpacity>
              </UI.Box>
            )}
          </UI.Box>
        </Swipeable>
      </UI.Pressable>
    );
  };

  const renderAddTip = (tipDetails,index) => {
    let lastIndex = tipData.length - 1;
    let item = tipDetails
    return(
     <>
         <UI.TouchableOpacity style={[styles.tipMainContainer,{backgroundColor:item.isSelected===1?"#00BFF6":"#fff"}]} onPress={() => addTip(tipDetails)}>
         <UI.Text style={[styles.tipCount,{color:item.isSelected===1?"#fff":"#00BFF6"}]}>{item.tip}</UI.Text>
       </UI.TouchableOpacity>
        { 
       lastIndex === index &&  
          <UI.Box style={[styles.tipMainContainer,{ backgroundColor:"#fff",}]} >
            <TextInput
              placeholder='Custom'
              placeholderTextColor="#00BFF6"
              placeholderStyle={{ fontFamily: "SourceSansPro_SemiBold", textAlign: "center" }}
              keyboardType='phone-pad'
              style={{
                color:"#4D4F50",
                fontFamily:"SourceSansPro_SemiBold"
              }}
              onFocus={() => handleResetTip()}
              onBlur={() => handleResetTip()}
              onChangeText={(value) => getCustomTip(value)}
              value={customTipValue}
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
        <UI.Text style={styles.priceLabel}>{value}</UI.Text>
      </UI.Box>
    </UI.Box>
  );
  
  const PriceDetails = () => (
    <UI.Box style={styles.priceContainer}>
      <UI.Box style={styles.priceSubContainer}>
        {priceItems.map((item, index) => (
          <PriceRow key={index} label={item.label} value={item.value} />
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
            <UI.Text style={styles.orderInstTxt}>Order Instructions</UI.Text>
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
      <UI.TouchableOpacity style={styles.topContainer} activeOpacity={1} onPress={() => closeAllSwipeables()}>
        <UI.ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {cartData && cartData?.length > 0 ? (
            cartData?.map((items) => {
              return renderCartItems(items);
            })
          ) : (
            <UI.View style={styles.cartEmptyContainer}>
              <UI.Text style={styles.emptyCartTxt}>Cart is empty</UI.Text>
            </UI.View>
          )}
          {cartData && cartData.length > 0 && renderCartPriceCalculations()}
        </UI.ScrollView>

        {
          cartData && cartData.length > 0 &&
          <UI.Box>
            {
              cartConfigData.ShowTip === 1 &&
              <>
                <UI.Box style={styles.tipContainer}>
                  <UI.Text style={styles.tipTxt}>ADD OPTIONAL TIP</UI.Text>
                </UI.Box>
                <UI.ScrollView scrollEnabled={false} keyboardShouldPersistTaps="handled" ref={scrollViewRef} horizontal={true} showsHorizontalScrollIndicator={false}>
                  {
                    tipData && tipData.map((item, index) => {
                      return renderAddTip(item, index)
                    })
                  }
                </UI.ScrollView>
              </>
            }

            {keyboardVisible && (
              <UI.Box
                style={styles.bottomBtn}
              >
                <UI.CbCommonButton showBtnName="Cancel" style={styles.customBtn} btnTextStyle={styles.btnTextStyle} onPress={() => Keyboard.dismiss()} />
                <UI.CbCommonButton showBtnName="Save" style={[styles.customBtn, { backgroundColor: "#5773A2", }]} btnTextStyle={[styles.btnTextStyle, { color: "#fff" }]} onPress={() => handleSaveTip()} />
              </UI.Box>
            )}

            <UI.Box style={styles.pickUpContainer}>
              <UI.Box>
                <UI.Text style={styles.pickUpTimeTxt}>Select Pickup Time</UI.Text>
                <UI.cbSelectTime
                  id={pageId}
                  selectItems={departments}
                  Label={selectedTime}
                  style={styles.timeBtn}
                  selectItemLabel={"Select Time"}
                />
              </UI.Box>

              <UI.Box>
                <UI.Text style={styles.pickUpPointTxt}>Select Pickup Point</UI.Text>
                 <UI.cbSelectTime
                  id={pageId}
                  selectItems={pickupLocations}
                  Label={selectedLocation}
                  style={styles.timeBtn}
                  selectItemLabel={"Select Place"}
                />
              </UI.Box>
            </UI.Box>

            <UI.TouchableOpacity style={styles.plcOrdBtn}>
              <UI.Box style={styles.plcMainContainer}>
                <UI.Text style={styles.totalAmtTxt}>Total Amount</UI.Text>
                <UI.Text style={styles.totalPrcTxt}>$206.60</UI.Text>
              </UI.Box>
              <UI.Box style={styles.verticalLn} />
              <UI.Box style={styles.plcOrderTxtContainer}>
                <UI.Text style={styles.plcOrderTxt}>Place Order</UI.Text>
              </UI.Box>
            </UI.TouchableOpacity>

          </UI.Box>
        }
      </UI.TouchableOpacity>

    </KeyboardAvoidingView>

  );
}

