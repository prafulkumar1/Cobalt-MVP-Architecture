import * as UI from '@/components/cobalt/importUI';
import { foodOrderData, ModifiersData } from '@/source/constants/commonData';
import React, { useState, useEffect } from 'react';
import { Image, Modal } from "react-native";
import { useFormContext } from '@/components/cobalt/event';
import { styles } from '@/source/styles/ItemData';

const ItemData = (props) => {
    const [itemNames, setItemNames] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const { closePreviewModal,singleItemDetails,cartData } = useFormContext()
    const cartItem = cartData?.find((item) => item.Item_Id === singleItemDetails.Item_Id);
    const quantity = cartItem ? cartItem.quantity : 0;
    useEffect(() => {
        const items = [];
        foodOrderData.MenuItems.forEach(mealPeriod => {
            mealPeriod.Categories.forEach(category => {
                category.Submenu.forEach(submenu => {
                    submenu.Items.forEach(item => {
                        items.push(item);
                    });
                });
            });
        });
        setItemNames(items);
    }, []);

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
                        onPress={() => setIsVisible(true)}
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
                                            onPress={() => {
                                                setIsVisible(false)
                                                setTimeout(() => {
                                                    closePreviewModal()
                                                }, 100)
                                            }}
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

                            <UI.Box style={[quantity === 0 ? styles.addIconBtn : styles.rightItemContainer]}>
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
                                <UI.CbAccordionlist componentData={ModifiersData} screenName="Modifiers" />
                                <UI.Text style={styles.allergyInfoTxt}>Comment/Allergy Info</UI.Text>
                                <UI.cbInput id="Comments" style={styles.commentsBox}
                                />
                            </UI.ScrollView>
                        </UI.Box>
                    </UI.Box>
                </UI.Box>
            </UI.ScrollView>

            <UI.Box style={styles.footerContainer}>
                <UI.Box>
                    <UI.Text style={styles.totalAmountTxt}>Total Amount</UI.Text>
                    <UI.Text style={styles.orderAmount}>$34.00</UI.Text>
                </UI.Box>
                <UI.CbCommonButton
                    showBtnName={"Add to Cart"}
                    style={styles.addToCartBtn}
                    btnTextStyle={styles.addCartTxt}
                    onPress={() => console.log("cliekcc")}
                />
            </UI.Box>
        </>
    );
    
};

export default ItemData;


