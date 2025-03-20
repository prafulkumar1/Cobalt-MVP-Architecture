import * as UI from '@/components/cobalt/importUI';
import React, { useRef} from 'react';
import { Image, Modal, Animated, UIManager, Platform } from "react-native";
import { useFormContext } from '@/components/cobalt/event';
import { styles } from '@/source/styles/ItemModifier';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CbLoader from '@/components/cobalt/cobaltLoader';
import { CbDottedLine } from '@/source/constants/dottedLine';
import { useItemModifierFavsLogic } from '@/source/controller/itemModifier/ItemModifierFavs';
 
const pageId = "ItemModifierUIFavs"
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const ItemModifierUIFavs = (props) => {
    const {isItemFavorite,toggleFavoriteItems,toastDetails,setToastDetails, singleItemDetails,setFormFieldData,getFormFieldData,cartData,modifiersResponseData,isVisible,setIsVisible,modifierCartItemData} = useFormContext()
    const {ImageUrl,Item_Name,Price,Description} = singleItemDetails
    const cartItem = cartData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
    const quantity = cartItem ? cartItem.quantity : 0;
    const modifierCartItem = modifierCartItemData&& modifierCartItemData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
    const modifierQuantity = modifierCartItem ? modifierCartItem?.quantity : 0;
    const value = getFormFieldData(pageId,"Comments")
    let categoryData = typeof modifiersResponseData?.Categories == "string"? JSON.parse(modifiersResponseData?.Categories): modifiersResponseData?.Categories
    const { handleDiscardChanges,loading,getAllSelectedModifiers} = useItemModifierFavsLogic()
    const scrollY = useRef(new Animated.Value(0)).current;
    if(loading){
      return(
        <CbLoader />
      )
    }
    return (
      <>
        <Animated.View
          style={[
           styles.stickyHeader,
            {
              opacity: scrollY.interpolate({
                inputRange: [325, 330],
                outputRange: [0, 1],
                extrapolate: 'clamp',
              }),
            },
          ]}
        >
          <UI.Box style={{ marginTop: 10 }}>
            <UI.Text style={styles.foodItemName} numberOfLines={2}>
              {Item_Name ? Item_Name : ""}
            </UI.Text>
            <UI.Text style={styles.foodItemPrice}>${Price}</UI.Text>
          </UI.Box>
 
          <UI.Box
            style={[
              styles.rightItemContainer,
              props?.isRecentOrder? {}:
              {
                width:
                  (quantity >= 1 || modifierQuantity >= 1)
                    ? responsiveWidth(25)
                    : responsiveWidth(17),
              },
            ]}
          >
            <UI.TouchableOpacity style={styles.favIconBtn} onPress={() => toggleFavoriteItems()}>
              {isItemFavorite === 1 ? (
                <Image
                source={require("@/assets/images/icons/Fav3x.png")}
                style={styles.favIcon}
                resizeMode='contain'
              />
              ) : (
                <Image
                source={require("@/assets/images/icons/Notfav3x.png")}
                style={styles.favIcon}
                resizeMode='contain'
              />
              )}
            </UI.TouchableOpacity>
            {
              props?.isRecentOrder ? null :
              <UI.CbAddToCartButton
              mealItemDetails={singleItemDetails}
              style={styles.addBtn}
            />
            }
          </UI.Box>
        </Animated.View>
        
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={[styles.modifierScroll,categoryData?.length === 0 && {flex:1}]}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
         >
          <UI.Box style={[styles.mainContainer, styles.itemMainContainer]}>
            {
              ImageUrl &&
              <UI.TouchableOpacity onPress={() => setIsVisible(false)}>
              <UI.CbImage
                imageJsx={
                  <Image
                    alt="image"
                    source={{ uri: ImageUrl ? ImageUrl : "" }}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                }
              />
            </UI.TouchableOpacity>
            }
 
            <UI.Box style={styles.modifierContainer}>
              <UI.Box
                style={[
                  styles.itemDetailsContainer,
                  { marginRight: (quantity !== 0 || modifierQuantity !== 0) && responsiveWidth(5) },
                ]}
              >
                <UI.Box style={{ marginTop: 10 }}>
                  <UI.Text style={styles.foodItemName} numberOfLines={2}>
                    {Item_Name ? Item_Name : ""}
                  </UI.Text>
                  <UI.Text style={styles.foodItemPrice}>${Price}</UI.Text>
                </UI.Box>
 
                <UI.Box
                  style={[
                    styles.rightItemContainer,
                    props?.isRecentOrder? {}:
                    {
                      width:
                        (quantity >= 1 || modifierQuantity >= 1)
                          ? responsiveWidth(25)
                          : responsiveWidth(17),
                    },
                  ]}
                >
                  <UI.TouchableOpacity style={styles.favIconBtn} onPress={() => toggleFavoriteItems()}>
                    {isItemFavorite === 1 ? (
                      <Image
                      source={require("@/assets/images/icons/Fav3x.png")}
                      style={styles.favIcon}
                      resizeMode='contain'
                    />
                    ) : (
                      <Image
                      source={require("@/assets/images/icons/Notfav3x.png")}
                      style={styles.favIcon}
                      resizeMode='contain'
                    />
                    )}
                  </UI.TouchableOpacity>
                  {
                    props?.isRecentOrder ? null :
                      <UI.CbAddToCartButton
                        mealItemDetails={singleItemDetails}
                        style={styles.addBtn}
                      />
                  }
                </UI.Box>
              </UI.Box>
 
 
              {
                Description &&
                <UI.Box style={styles.foodDiscripContainer}>
                  <CbDottedLine length={50} dotSize={6} dotColor="#0000002B" />
                  <UI.Text style={styles.foodDiscripTxt}>
                    {Description ? Description : ""}
                  </UI.Text>
                  <CbDottedLine length={50} dotSize={6} dotColor="#0000002B" />
                </UI.Box>
              }
 
              <UI.Box style={styles.modifierSubContainer}>
                <UI.Box>
                  {Array.isArray(categoryData) && categoryData.length > 0 && (
                    <>
                    <UI.Text style={styles.modifierTxt}>Modifiers</UI.Text>
                    <UI.CbAccordionlist screenName="Modifiers" props={props} getAllSelectedModifiers={getAllSelectedModifiers}    />
                    </>
                  )}
                </UI.Box>
                  <UI.Box style={{paddingBottom:100}}>
                    <UI.Text style={styles.allergyInfoTxt}>
                      Comment/Allergy Info
                    </UI.Text>
                    <UI.cbForm
                      formId={pageId}
                      setFormFieldData={setFormFieldData}
                      getFormFieldData={getFormFieldData}
                    >   
                      <UI.cbInput id="Comments" style={styles.commentsBox} multiline={true} numberOfLines={4} formId={pageId} value={value?.value}/>
                      {/* <UI.cbInput id="Comments" style={styles.commentsBox} multiline={true} numberOfLines={4} formId={pageId}/> */}
                    </UI.cbForm>
                  </UI.Box>
              </UI.Box>
            </UI.Box>
          </UI.Box>
 
          <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setIsVisible(false)}
          >
            <UI.View
              style={styles.modalContainer}
              onPress={() => setIsVisible(false)}
            />
 
            <UI.Box style={styles.confirmMdl}>
              <UI.Box style={styles.innerModal}>
                <UI.Box style={styles.innerModalMsgContainer}>
                  <Image
                    source={require("@/assets/images/icons/dining3x.png")}
                    style={styles.diningIcon}
                  />
                  <UI.Text style={styles.innerModalAlertTxt}>
                    Are you sure you want to discard your changes?
                  </UI.Text>
 
                  <UI.Box style={styles.discardBtn}>
                    <UI.TouchableOpacity
                      onPress={() => setIsVisible(false)}
                      style={styles.modalNoYesBtn}
                    >
                      <UI.Text style={styles.modalNoYesBtnTxt}>No</UI.Text>
                    </UI.TouchableOpacity>
 
                    <UI.TouchableOpacity
                      onPress={handleDiscardChanges}
                      style={styles.modalNoYesBtn}
                    >
                      <UI.Text style={styles.modalNoYesBtnTxt}>Yes</UI.Text>
                    </UI.TouchableOpacity>
                  </UI.Box>
                </UI.Box>
              </UI.Box>
            </UI.Box>
          </Modal>
        </Animated.ScrollView>
        {
          toastDetails?.isToastVisiable &&
          <UI.CbToastMessage
          message={toastDetails?.toastMessage}
          isToastMessageVisiable={toastDetails?.isToastVisiable}
          transparent={true}
          onRequestClose={() => setToastDetails({isToastVisiable:false,toastMessage:""})}
          closePreviewModal={() => setToastDetails({isToastVisiable:false,toastMessage:""})}
        />
        }
      </>
    );
    
};
 
export default ItemModifierUIFavs;