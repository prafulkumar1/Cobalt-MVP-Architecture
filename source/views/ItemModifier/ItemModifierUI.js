
import * as UI from '@/components/cobalt/importUI';
import React, { useRef, useEffect, useState } from 'react';
import { Image, Modal, Animated, LayoutAnimation, UIManager, Platform } from "react-native";
import { useFormContext } from '@/components/cobalt/event';
import { styles } from '@/source/styles/ItemModifier';
import { useItemModifierLogic } from '@/source/controller/itemModifier/ItemModifier';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import CbLoader from '@/components/cobalt/cobaltLoader';

const pageId = "ItemModifier";

// Enable Layout Animation for Android
if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ItemModifier = (props) => {
    const { singleItemDetails, modifierData, setFormFieldData, getFormFieldData, cartData, modifiersResponseData, isVisible, setIsVisible,storeSingleItem } = useFormContext();
    const { ImageUrl, Item_Name, Price, Description, response } = singleItemDetails ;
    const cartItem = cartData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
    const quantity = cartItem ? cartItem.quantity : 0;
    const { handleCloseItemDetails, handleDiscardChanges, loading } = useItemModifierLogic();
 
   
    const scrollY = useRef(new Animated.Value(0)).current;
    // const [isImageVisible, setIsImageVisible] = useState(true);


    // const imageOpacity = scrollY.interpolate({
    //     inputRange: [0, 60],

    //     outputRange: [1, 1],
    //     // extrapolate: "clamp",
    // });


    // const handleScrollEnd = (event) => {
    //     const scrolledDistance = event.nativeEvent.contentOffset.y;
    //     const hideImageAfter = 60;
    //     const newVisibility = scrolledDistance < hideImageAfter;

    //     // if (isImageVisible !== newVisibility) {
    //     //     LayoutAnimation.easeInEaseOut();
    //     //     setIsImageVisible(newVisibility);
    //     // }
    //     if (scrolledDistance >= hideImageAfter) {

    //         if (isImageVisible) {
    //             LayoutAnimation.easeInEaseOut();
    //             setIsImageVisible(false);
    //         }
    //     }
    // };



    return (
        <>

            <Animated.View
                style={[
                    styles.fixedNameComp,
                    {
                        opacity: scrollY.interpolate({
                            inputRange: [310, 315],
                            outputRange: [0, 1],
                            extrapolate: 'clamp',
                        }),
                    },
                ]}
            >
                <UI.Box style={{ marginTop: 10, }}>
                    <UI.Text style={styles.foodItemName}>
                        {Item_Name || ""}
                    </UI.Text>
                    <UI.Text style={styles.foodItemPrice}>
                        ${Price}
                    </UI.Text>
                </UI.Box>
                <UI.Box style={[styles.rightItemContainer, { width: quantity >= 1 ?responsiveWidth(25): responsiveWidth(17)   }]}>
                                    <UI.TouchableOpacity style={styles.favIconBtn}>
                                        {
                                            modifiersResponseData?.IsFavorite == 1 ?
                                                <UI.CbImage imageJsx={<Image source={require("@/assets/images/icons/Fav3x.png")} style={styles.favIcon} />} />
                                                :
                                                <UI.CbImage imageJsx={<Image source={require("@/assets/images/icons/Notfav3x.png")} style={styles.favIcon} />} />
                                        }
                                    </UI.TouchableOpacity>
                                    <UI.CbAddToCartButton mealItemDetails={singleItemDetails} style={styles.addBtn} />
                                </UI.Box>
            </Animated.View>


            <Animated.ScrollView
                contentContainerStyle={{borderTopLeftRadius:35,borderTopRightRadius:35}}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={10}>
                <UI.Box style={styles.itemMainContainer}>
                    <UI.Box style={styles.mainContainer}>



                        <UI.Box >
                            <UI.TouchableOpacity onPress={() => setIsVisible(false)}>
                                <UI.CbImage
                                    imageJsx={
                                        <Image
                                            alt='image'
                                            source={{ uri: ImageUrl || "" }}
                                            style={styles.itemImage}
                                            resizeMode='cover'
                                        />
                                    }
                                />
                            </UI.TouchableOpacity>
                        </UI.Box>


                        <Modal
                            visible={isVisible}
                            transparent
                            animationType="fade"
                            onRequestClose={() => setIsVisible(false)}
                        >
                            <UI.View style={styles.modalContainer} onPress={() => setIsVisible(false)} />
                            <UI.Box style={styles.confirmMdl}>
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


                        <UI.Box style={[styles.modifierContainer, { marginTop: 0 }]}>
                            <UI.Box style={[styles.itemDetailsContainer, { marginRight: quantity !== 0 && responsiveWidth(5) }]}>
                                <UI.Box style={{ marginTop: 10 }}>
                                    <UI.Text style={styles.foodItemName}>
                                    {Item_Name?Item_Name:""}
                                    </UI.Text>
                                    <UI.Text style={styles.foodItemPrice}>
                                        ${Price}
                                    </UI.Text>
                                </UI.Box>

                                <UI.Box style={[styles.rightItemContainer, { width: quantity >= 1 ?responsiveWidth(25): responsiveWidth(17) }]}>
                                    <UI.TouchableOpacity style={styles.favIconBtn}>
                                        {
                                            modifiersResponseData?.IsFavorite == 1 ?
                                                <UI.CbImage imageJsx={<Image source={require("@/assets/images/icons/Fav3x.png")} style={styles.favIcon} />} />
                                                :
                                                <UI.CbImage imageJsx={<Image source={require("@/assets/images/icons/Notfav3x.png")} style={styles.favIcon} />} />
                                        }
                                    </UI.TouchableOpacity>
                                    <UI.CbAddToCartButton mealItemDetails={singleItemDetails} style={styles.addBtn} />
                                </UI.Box>
                            </UI.Box>


                            <UI.Box style={styles.foodDiscripContainer}>
                                <UI.Text style={styles.foodDiscripTxt}>
                                    {Description?Description:""}
                                </UI.Text>
                            </UI.Box>

                            <UI.Box style={styles.modifierSubContainer}>
                                <Animated.ScrollView
                                    showsVerticalScrollIndicator={false}
                                    style={[styles.mainList, { marginBottom: response?.IsModifierAvailable == 0 ? responsiveHeight(10) : responsiveHeight(30) }]}
                                    onScroll={Animated.event(
                                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                                        { useNativeDriver: true }
                                    )}
                                    // onScrollEndDrag={handleScrollEnd}
                                    scrollEventThrottle={16}
                                >
                                    {response?.IsModifierAvailable === 0 && loading ? (
                                        <CbLoader />
                                    ) : (
                                        <UI.Box>
                                            <UI.Text style={styles.modifierTxt}>Modifiers</UI.Text>
                                            <UI.CbAccordionlist componentData={modifierData} screenName="Modifiers" props={props} />
                                        </UI.Box>
                                    )}

                                    <UI.Box>
                                        <UI.Text style={styles.allergyInfoTxt}>Comment/Allergy Info</UI.Text>
                                        <UI.cbForm formId={pageId} setFormFieldData={setFormFieldData} getFormFieldData={getFormFieldData}>
                                            <UI.cbInput id="Comments" style={styles.commentsBox} />
                                        </UI.cbForm>
                                    </UI.Box>
                                </Animated.ScrollView>
                            </UI.Box>
                        </UI.Box>
                    </UI.Box>
                </UI.Box>
            </Animated.ScrollView>
            {/* </UI.Box> */}
        </>
    );
};

export default ItemModifier;
