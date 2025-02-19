import * as UI from '@/components/cobalt/importUI';
import React from 'react';
import { Image, Modal } from "react-native";
import { useFormContext } from '@/components/cobalt/event';
import { styles } from '@/source/styles/ItemModifier';
import { useItemModifierLogic } from '@/source/controller/itemModifier/ItemModifier';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CbLoader from '@/components/cobalt/cobaltLoader';
import { CbDottedLine } from '@/source/constants/dottedLine';

const pageId = "ItemModifier"
const ItemModifier = (props) => {
   
    const {  singleItemDetails,modifierData,setFormFieldData,getFormFieldData,cartData,modifiersResponseData,isVisible,setIsVisible,modifierCartItemData } = useFormContext()

    const {ImageUrl,Item_Name,Price,Description,response} = singleItemDetails
    const cartItem = cartData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
    const quantity = cartItem ? cartItem.quantity : 0;
    const modifierCartItem = modifierCartItemData&& modifierCartItemData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
    const modifierQuantity = modifierCartItem ? modifierCartItem?.quantity : 0;
    let categoryData = typeof modifiersResponseData?.Categories == "string"? JSON.parse(modifiersResponseData?.Categories): modifiersResponseData?.Categories
    const { handleDiscardChanges,loading} = useItemModifierLogic()

    return (
      <>
          <UI.Box style={[styles.mainContainer,styles.itemMainContainer]}>
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

            <UI.Box style={styles.modifierContainer}>
              <UI.Box
                style={[
                  styles.itemDetailsContainer,
                  { marginRight: (quantity !== 0 || modifierQuantity !==0) && responsiveWidth(5) },
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
                    {
                      width:
                        (quantity >= 1 || modifierQuantity>=1)
                          ? responsiveWidth(25)
                          : responsiveWidth(17) ,
                    },
                  ]}
                >
                  <UI.TouchableOpacity style={styles.favIconBtn}>
                    {modifiersResponseData?.IsFavorite == 1 ? (
                      <UI.CbImage
                        imageJsx={
                          <Image
                            source={require("@/assets/images/icons/Fav3x.png")}
                            style={styles.favIcon}
                            resizeMode='contain'
                          />
                        }
                      />
                    ) : (
                      <UI.CbImage
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
                  <UI.CbAddToCartButton
                    mealItemDetails={singleItemDetails}
                    style={styles.addBtn}
                  />
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
                <UI.ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{paddingBottom:responsiveHeight(55)}}
                  style={[
                    styles.mainList,
                    {
                      marginBottom:
                        response?.IsModifierAvailable == 0
                          ? responsiveHeight(10)
                          : responsiveHeight(30),
                    },
                  ]}
                >
                  {response?.IsModifierAvailable === 0 && loading ? (
                    <CbLoader />
                  ) : (
                    <UI.Box>
                      {
                        categoryData?.length > 0 &&
                        <>  <UI.Text style={styles.modifierTxt}>Modifiers</UI.Text>
                          <UI.CbAccordionlist
                            screenName="Modifiers"
                            props={props}
                          /></>
                      }
                    </UI.Box>
                  )}
                  <UI.Box>
                    <UI.Text style={styles.allergyInfoTxt}>
                      Comment/Allergy Info
                    </UI.Text>
                    <UI.cbForm
                      formId={pageId}
                      setFormFieldData={setFormFieldData}
                      getFormFieldData={getFormFieldData}
                    >
                      <UI.cbInput id="Comments" style={styles.commentsBox} />
                    </UI.cbForm>
                  </UI.Box>
                </UI.ScrollView>
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
      </>
    );
    
};

export default ItemModifier;


