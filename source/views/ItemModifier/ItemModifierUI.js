import * as UI from '@/components/cobalt/importUI';
import React, { useRef} from 'react';
import { Image, Modal, Animated, UIManager, Platform } from "react-native";
import { useFormContext } from '@/components/cobalt/event';
import { styles } from '@/source/styles/ItemModifier';
import { useItemModifierLogic } from '@/source/controller/itemModifier/ItemModifier';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CbLoader from '@/components/cobalt/cobaltLoader';
import { CbDottedLine } from '@/source/constants/dottedLine';

const pageId = "ItemModifier"
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const ItemModifier = (props) => {
    const {isItemFavorite,toggleFavoriteItems,toastDetails,setToastDetails, singleItemDetails,setFormFieldData,getFormFieldData,cartData,modifiersResponseData,isVisible,setIsVisible,modifierCartItemData} = useFormContext()
    const {ImageUrl,Item_Name,Price,Description} = singleItemDetails
    const cartItem = cartData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
    const quantity = cartItem ? cartItem.quantity : 0;
    const modifierCartItem = modifierCartItemData&& modifierCartItemData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
    const modifierQuantity = modifierCartItem ? modifierCartItem?.quantity : 0;
    const value = getFormFieldData(pageId,"Comments")
    let categoryData = typeof modifiersResponseData?.Categories == "string"? JSON.parse(modifiersResponseData?.Categories): modifiersResponseData?.Categories
    const { handleDiscardChanges,loading,getAllSelectedModifiers} = useItemModifierLogic()
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
          <UI.CbBox id="ItemNameContainer" pageId="ItemModifier" style={styles.itemNameContainer}>
            <UI.CbText id="ItemNameText" pageId="ItemModifier" style={styles.foodItemName} numberOfLines={2}>
              {Item_Name ? Item_Name : ""}
            </UI.CbText>
            <UI.CbText id="ItemPriceText" pageId="ItemModifier" style={styles.foodItemPrice}>${Price}</UI.CbText>
          </UI.CbBox>

          <UI.Box
            style={[
              styles.rightItemContainer,
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
                <UI.CbImage id="FavIcon" pageId="ItemModifier"
                imageJsx={
                  <Image
                source={require("@/assets/images/icons/Fav3x.png")}
                style={styles.favIcon}
                resizeMode='contain'
              />
                }
              />
                
              ) : (
                <UI.CbImage id="NotFavIcon" pageId="ItemModifier"
                imageJsx={
                  <Image
                source={require("@/assets/images/icons/Notfav3x.png")}
                style={styles.favIcon}
                resizeMode='contain'
              />
                }
              />
                
              )}
            </UI.TouchableOpacity>
            <UI.CbAddToCartButton id="AddtoCartButton" pageId="ItemModifier"
              mealItemDetails={singleItemDetails}
              style={styles.addBtn}
            />
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
          <UI.CbBox id="ItemModifierContainer" pageId="ItemModifier" style={[styles.mainContainer, styles.itemMainContainer]}>
            {
              ImageUrl && 
              <UI.TouchableOpacity onPress={() => setIsVisible(false)}>
              <UI.CbImage id="itemImage" pageId="ItemModifier"
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
                      <UI.CbBox id="ItemNameContainer" pageId="ItemModifier" style={styles.itemNameContainer}>
                            <UI.CbText id="ItemNameText" pageId="ItemModifier" style={styles.foodItemName} numberOfLines={2}>
                                 {Item_Name ? Item_Name : ""}
                            </UI.CbText>
                            <UI.CbText id="ItemPriceText" pageId="ItemModifier" style={styles.foodItemPrice}>${Price}</UI.CbText>
                      </UI.CbBox>

                <UI.Box
                  style={[
                    styles.rightItemContainer,
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
                  <UI.CbAddToCartButton id="AddtoCartButton" pageId="ItemModifier"
                    mealItemDetails={singleItemDetails}
                    style={styles.addBtn}
                  />
                </UI.Box>
              </UI.Box>


              {
                Description &&
                <UI.CbBox id="FoodDiscripContainer" pageId="ItemModifier" style={styles.foodDiscripContainer}>
                  <CbDottedLine length={50} dotSize={6} dotColor="#0000002B" />
                  <UI.CbText id="FoodDiscripText" pageId="ItemModifier" style={styles.foodDiscripTxt}>
                    {Description ? Description : ""}
                  </UI.CbText>
                  <CbDottedLine length={50} dotSize={6} dotColor="#0000002B" />
                </UI.CbBox>
              }

              <UI.CbBox id="ModifierSubContainer" pageId="ItemModifier"  style={styles.modifierSubContainer}>
                <UI.Box>
                  {Array.isArray(categoryData) && categoryData.length > 0 && (
                    <>
                    <UI.CbText id="ModifierText" pageId="ItemModifier" style={styles.modifierTxt}></UI.CbText>
                    <UI.CbAccordionlist id="ModifiersList" pageId="ItemModifier" screenName="Modifiers" props={props} getAllSelectedModifiers={getAllSelectedModifiers}/>
                    </>
                  )}
                </UI.Box>
                  <UI.CbBox id="CommentContainer" pageId="ItemModifier" style={styles.commentContainer} >
                    <UI.CbText id="AllergyInfoTxt" pageId="ItemModifier" style={styles.allergyInfoTxt}>          </UI.CbText>
                    <UI.cbForm
                      formId={pageId}
                      setFormFieldData={setFormFieldData}
                      getFormFieldData={getFormFieldData}
                    >   
                      <UI.cbInput id="Comments" pageId="ItemModifier" style={styles.commentsBox} multiline={true} numberOfLines={4} value={value?.value}/>
                      {/* <UI.cbInput id="Comments" style={styles.commentsBox} multiline={true} numberOfLines={4} formId={pageId}/> */}
                    </UI.cbForm>
                  </UI.CbBox>
              </UI.CbBox>
            </UI.Box>
          </UI.CbBox>

          <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setIsVisible(false)}
          >
            <UI.CbView id="ConfrimModalContainer" pageId="ItemModifier"
              style={styles.modalContainer}
              onPress={() => setIsVisible(false)}
            />

            <UI.CbBox id="ConfrimModal" pageId="ItemModifier" style={styles.confirmMdl}>
              <UI.CbBox id="ConfrimInnerModal" pageId="ItemModifier" style={styles.innerModal}>
                <UI.CbBox id="InnerModalMsgContainer" pageId="ItemModifier" style={styles.innerModalMsgContainer}>
                  <UI.CbImage id="ModalDiningIcon" pageId="ItemModifier"
                  imageJsx={
                    <Image
                      alt="image"
                      source={require("@/assets/images/icons/dining3x.png")}
                      style={styles.diningIcon}
                    />
                  }/>
                  <UI.CbText id="InnerModalAlertTxt" pageId="ItemModifier" style={styles.innerModalAlertTxt}>              
                  </UI.CbText>

                  <UI.CbBox id="DiscardButton" pageId="ItemModifier" style={styles.discardBtn}>
                    <UI.TouchableOpacity  onPress={() => setIsVisible(false)}>
                      <UI.CbBox id="ModalNoBtn" pageId="ItemModifier" style={styles.modalNoYesBtn}><UI.CbText id="ModalNoBtnTxt" pageId="ItemModifier" style={styles.modalNoYesBtnTxt}></UI.CbText></UI.CbBox>
                    </UI.TouchableOpacity>

                    <UI.TouchableOpacity  onPress={handleDiscardChanges} >
                      <UI.CbBox id="ModalYesBtn" pageId="ItemModifier" style={styles.modalNoYesBtn}><UI.CbText id="ModalYesBtnTxt" pageId="ItemModifier"  style={styles.modalNoYesBtnTxt}></UI.CbText></UI.CbBox>
                    </UI.TouchableOpacity>
                  </UI.CbBox>
                </UI.CbBox>
              </UI.CbBox>
            </UI.CbBox>
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

export default ItemModifier;

