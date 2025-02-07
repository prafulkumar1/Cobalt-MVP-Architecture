import * as UI from '@/components/cobalt/importUI';
import React from 'react';
import { Image, Modal } from "react-native";
import { useFormContext } from '@/components/cobalt/event';
import { styles } from '@/source/styles/ItemModifier';
import { useItemModifierLogic } from '@/source/controller/itemModifier/ItemModifier';

const pageId = "ItemModifier"
const ItemModifier = (props) => {
   
    const {  singleItemDetails,  modifierData,setFormFieldData,getFormFieldData } = useFormContext()

    const { handleCloseItemDetails,handleDiscardChanges,isVisible,setIsVisible} = useItemModifierLogic()

    return (
        <>
            <UI.ScrollView style={styles.itemMainContainer}>
                <UI.Box style={styles.mainContainer}>
                    <UI.TouchableOpacity onPress={() => setIsVisible(false)}>
                        <UI.CbImage
                            imageJsx={
                                <Image
                                    alt='image'
                                    source={{ uri: singleItemDetails?.Image }}
                                    style={styles.itemImage}
                                    resizeMode='cover'
                                />
                            }
                        />
                    </UI.TouchableOpacity>

                    <UI.TouchableOpacity
                        onPress={()=>handleCloseItemDetails()}
                        style={styles.crossbtn}
                    >
                        <Image
                            alt='Close'
                            source={require('@/assets/images/icons/Close.png')}
                            style={styles.crossImage}
                            tintColor={"#fff"}
                        />
                    </UI.TouchableOpacity>

                    <Modal
                        visible={isVisible}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setIsVisible(false)}
                    >
                        <UI.View style={styles.modalContainer} onPress={() => setIsVisible(false)} />

                        <UI.Box
                            style={styles.confirmMdl}
                        >
                            <UI.Box style={styles.innerModal}>
                                <UI.Box style={styles.innerModalMsgContainer}>
                                    <Image source={require("@/assets/images/icons/dining3x.png")} style={styles.diningIcon} />
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

                    <UI.Box style={styles.modifierContainer}>
                        <UI.Box style={styles.itemDetailsContainer}>
                            <UI.Box style={{ marginTop: 10 }}>
                                <UI.Text style={styles.foodItemName}>
                                    {singleItemDetails?.Item_Name}
                                </UI.Text>
                                <UI.Text style={styles.foodItemPrice}>
                                    ${singleItemDetails?.Price}
                                </UI.Text>
                            </UI.Box>

                            <UI.Box style={styles.rightItemContainer}>
                                <UI.TouchableOpacity style={styles.favIconBtn}>
                                    <UI.CbImage imageJsx={<Image source={require("@/assets/images/icons/Fav3x.png")} style={styles.favIcon} />} />
                                </UI.TouchableOpacity>
                                <UI.CbAddToCartButton mealItemDetails={singleItemDetails} style={styles.addBtn} />
                            </UI.Box>
                        </UI.Box>

                        <UI.Box style={styles.foodDiscripContainer}>
                            <UI.Text style={styles.foodDiscripTxt}>
                                {singleItemDetails?.Description}
                            </UI.Text>
                        </UI.Box>

                        <UI.Box style={styles.modifierSubContainer}>
                            <UI.Text style={styles.modifierTxt}>Modifiers</UI.Text>
                            <UI.ScrollView showsVerticalScrollIndicator={false} style={styles.mainList}>
                                <UI.CbAccordionlist componentData={modifierData} screenName="Modifiers" props={props}/>
                                <UI.Text style={styles.allergyInfoTxt}>Comment/Allergy Info</UI.Text>
                                

                                  <UI.cbForm formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData}>
                                  <UI.cbInput id="Comments" style={styles.commentsBox}/>
                                    </UI.cbForm>
                            </UI.ScrollView>
                        </UI.Box>
                    </UI.Box>
                </UI.Box>
            </UI.ScrollView>
        </>
    );
    
};

export default ItemModifier;


