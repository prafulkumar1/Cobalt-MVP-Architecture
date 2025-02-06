
import * as UI from '@/components/cobalt/importUI';
import {useFormContext } from '@/components/cobalt/event';
import { Image, Keyboard, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { useMyCartLogic } from '@/source/controller/myCart/myCart';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Swipeable } from 'react-native-gesture-handler';
import { cartConfigResponseData, priceItems } from '@/source/constants/commonData';
import { useEffect, useState } from 'react';
import { navigateToScreen } from '@/source/constants/Navigations';
import { styles } from '@/source/styles/MyCart';



const pageId='MyCart';
export default function MyCartScreen(props) {

 let pageConfigJson = global.appConfigJsonArray.find(item => item.PageId === pageId);

 global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
 const [keyboardVisible, setKeyboardVisible] = useState(false);
 const [showPickupTime,setShowPickupTime] = useState(cartConfigResponseData.Pickup_Times)

 
  
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
   } = useMyCartLogic();
   const {cartData, selectedTime,setSelectedTime   }= useFormContext();

   useEffect(() => {
    const keyboardDidShowListener = Keyboard?.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard?.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    setTimeout(() => {
      const updatedShowTime = showPickupTime?.map((items) => {
        return{
          label:items.Time,
          value:items.Time
        }
      })
      console.log(updatedShowTime,"==>Pickup_Times")
      setShowPickupTime(updatedShowTime)
    }, 100);

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
            swipeableRefs.current[`${item.Item_Id}`] = ref;
          }}
          renderRightActions={renderRightActions}
          onSwipeableOpen={() => handleSwipeOpen(item.Item_Id)}
        >
          <UI.Box style={[styles.cardContainer, { opacity: value === 0 ? 1 : 0.5 }]}>
            <UI.Box style={styles.mainContainer}>
              <UI.Box style={styles.cartItemContainer}>
                <UI.Text style={styles.itemTitle}>{item.Item_Name}</UI.Text>
                <UI.Text style={styles.itemCategory}>
                  {item.Description}
                </UI.Text>
              </UI.Box>

              <UI.Box style={styles.rightContainer}>
                <UI.Text style={styles.itemPrice}>{`$${item.quantityIncPrice}`}</UI.Text>
                <UI.CbAddToCartButton mealItemDetails={item} style={styles.addToCartBtn} cartStyle={true} />
              </UI.Box>
            </UI.Box>

            <UI.Box style={styles.notesContainer}>
              <Image source={require("@/assets/images/icons/messageIcon2x.png")} style={styles.noteIcon} />
              <UI.Text style={styles.itemNotes}>
                sdsandkkdksa
              </UI.Text>
            </UI.Box>
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
            onPress={()=>navigateToScreen(props, "MenuOrder", true,{})}
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
  const departments =[{"label": "08:00 AM", "value": "08:00 AM"}, {"label": "08:30 AM", "value": "08:30 AM"}, {"label": "09:00 AM", "value": "09:00 AM"}, {"label": "09:30 AM", "value": "09:30 AM"}, {"label": "10:00 AM", "value": "10:00 AM"}, {"label": "10:30 AM", "value": "10:30 AM"}, {"label": "11:00 AM", "value": "11:00 AM"}];
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <UI.TouchableOpacity style={styles.topContainer} activeOpacity={1} onPress={() => closeAllSwipeables()}>
        <UI.ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {cartData && cartData.length > 0 ? (
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
                <UI.ScrollView keyboardShouldPersistTaps="handled" ref={scrollViewRef} horizontal={true} showsHorizontalScrollIndicator={false}>
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
                />
              </UI.Box>

              <UI.Box>
                <UI.Text style={styles.pickUpPointTxt}>Select Pickup Point</UI.Text>
                <UI.TouchableOpacity style={styles.timeBtn}>
                  <UI.Text style={styles.timeTxt}>Clubhouse Grill</UI.Text>
                </UI.TouchableOpacity>
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

