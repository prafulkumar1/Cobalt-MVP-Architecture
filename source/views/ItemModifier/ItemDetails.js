import * as UI from '@/components/cobalt/importUI';
import React, { useRef, useState, useEffect } from 'react';
import { Image, Modal, Animated, UIManager, Platform, ScrollView, View, Alert, Text, TouchableOpacity, LayoutAnimation, FlatList } from "react-native";
import { useFormContext } from '@/components/cobalt/event';
import { styles } from '@/source/styles/ItemModifier';
import { useItemModifierLogic } from '@/source/controller/itemModifier/ItemModifier';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import CbLoader from '@/components/cobalt/cobaltLoader';
import { CbDottedLine } from '@/source/constants/dottedLine';
import CheckBox from "react-native-checkbox";
import { ChevronRightIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon, AddIcon, TrashIcon, RemoveIcon } from '@/components/ui/icon';
import { Icon, CheckIcon } from '@/components/ui/icon';

// import { Dimensions, StyleSheet } from "react-native";

import { horizontalScale, isPlatformAndroid } from "../../constants/Matrices";

// const accordionData = [
//     { title: "Modifier 1", content: ["ModifierItem 1", "ModifierItem 2"] },
//     { title: "Modifier 2", content: ["ModifierItem 3", "ModifierItem 4"] },
//     { title: "Modifier 3", content: ["ModifierItem 5", "ModifierItem 6"] },
// ];

const pageId = "ItemModifier"
const ItemDetails = (props) => {
    const { setToastMessage, setModifiersResponseData, isItemFavorite, toggleFavoriteItems, toastDetails, setToastDetails, itemDataVisible, singleItemDetails, setFormFieldData, getFormFieldData, cartData, modifiersResponseData, isVisible, setIsVisible, modifierCartItemData } = useFormContext()
    const { ImageUrl, Item_Name, Price, Description } = singleItemDetails
    const cartItem = cartData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
    const quantity = cartItem ? cartItem.quantity : 0;
    const modifierCartItem = modifierCartItemData && modifierCartItemData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
    const modifierQuantity = modifierCartItem ? modifierCartItem?.quantity : 0;
    const totalCartPrice = cartItem ? Math.floor(cartItem?.quantityIncPrice * 100) / 100 : 0;
    const singleItemPrice = modifierCartItem ? Math.floor(modifierCartItem?.quantityIncPrice * 100) / 100 : 0;
    const value = getFormFieldData(pageId, "Comments")
    let categoryData = typeof modifiersResponseData?.Categories === "string"
        ? JSON.parse(modifiersResponseData?.Categories || "[]")
        : modifiersResponseData?.Categories || [];
    const { handleDiscardChanges, loading, getAllSelectedModifiers } = useItemModifierLogic()
    const scrollY = useRef(new Animated.Value(0)).current;
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [checkedItems, setCheckedItems] = useState({});
    // const [toastVisible, setToastVisible] = useState(false);
    const [isValueChecked, setIsValueChecked] = useState(false);
    const [isToastMessageVisiable, setIsToastMessageVisiable] = useState(false);
    const [toastMessage, setTastMessage] = useState("");

    const [expandedSections, setExpandedSections] = useState(() => {
        return Array.isArray(categoryData) ? categoryData.reduce((acc, _, index) => {
            acc[index] = true;
            return acc;
        }, {}) : {};
    });

    useEffect(() => {
        if (Array.isArray(categoryData)) {
            setExpandedSections(categoryData.reduce((acc, _, index) => {
                acc[index] = true;
                return acc;
            }, {}));
        }
    }, [categoryData]);


    // const handleIncrement = async (item, quantity) => {
    //     let quantityInfo = await postQuantityApiCall(item, quantity + 1)

    //     if (quantityInfo.statusCode === 200) {
    //       if (quantityInfo?.response.IsAvailable === 1) {
    //         updateCartItemQuantity(item, quantity + 1);
    //         updateModifierItemQuantity(item, quantity + 1);
    //       } else {
    //         Alert.alert(quantityInfo?.response?.ResponseMessage)
    //       }
    //     }
    //   }
    //   const handleDecrement = async (item, quantity) => {
    //     let quantityInfo = await postQuantityApiCall(item, quantity - 1)

    //     if (quantityInfo.statusCode === 200) {
    //       updateCartItemQuantity(item, quantity - 1);
    //       updateModifierItemQuantity(item, quantity - 1);
    //     }
    //   }
    //   const addItemToCartBtnDetails = (itemsDetails) => {
    //     if(itemsDetails?.Modifiers?.length > 0){
    //       openItemDetails(itemsDetails)
    //     }else{
    //       addItemToCartBtn(itemsDetails)
    //     }
    //   }



    const toggleExpand = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedSections((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    // const toggleCheckbox = (categoryIndex, itemIndex, item) => {
    //     setCheckedItems((prev = {}) => {  
    //         const key = `${categoryIndex}-${itemIndex}`;
    //         const newCheckedState = !prev[key];

    //         if (!categoryData || !categoryData[categoryIndex]) {
    //             console.error("categoryData is undefined or does not have categoryIndex:", categoryIndex);
    //             return prev;
    //         }

    //         const category = categoryData[categoryIndex];

    //         if (!category || !category.Message) {
    //             console.error("category or category.Message is undefined:", category);
    //             return prev;
    //         }

    //         const selectedModifiersCount = Object.keys(prev).filter(
    //             (k) => k.startsWith(`${categoryIndex}-`) && prev[k]
    //         ).length;

    //         const numberMatch = category.Message.match(/\d+/);
    //         let maxVal = numberMatch ? parseInt(numberMatch[0]) : 0;

    //         console.log(maxVal, selectedModifiersCount, "maxVal");

    //         if (maxVal !== 0 && newCheckedState && selectedModifiersCount >= maxVal) {
    //             Alert.alert(`Max limit of ${maxVal} reached for ${item.Category_Name} modifier. Please unselect one to add another.`);
    //             return prev;  
    //         }

    //         const updatedCheckedItems = { ...prev, [key]: newCheckedState };

    //         getAllSelectedModifiers({
    //             ...item,
    //             isChecked: newCheckedState,
    //             Item_ID: singleItemDetails?.Item_ID,
    //             Category_Id: item?.Category_Id
    //         });

    //         return updatedCheckedItems;
    //     });
    // };



    // const toggleCheckbox = (categoryIndex, itemIndex) => {
    //     setCheckedItems((prev) => ({
    //         ...prev,
    //         [`${categoryIndex}-${itemIndex}`]: !prev[`${categoryIndex}-${itemIndex}`],

    //     }));
    // };


    const toggleCheckbox = (
        subItem,
        Category_Id,
        order,
        subIndex,
        index
    ) => {
        setCheckedItems((prev) => {

            const newCheckedState = !prev[`${index}-${subIndex}`];
            console.log(newCheckedState)


            const numberMatch = order.Message.match(/\d+/);
            let maxVal = numberMatch ? parseInt(numberMatch[0]) : 0;

            const updatedModifiersResponseData = { ...modifiersResponseData };

            const categoryIndex = updatedModifiersResponseData?.Categories.findIndex(
                (category) => category.Category_Id === Category_Id
            );

            if (categoryIndex !== -1) {
                const category = updatedModifiersResponseData.Categories[categoryIndex];

                const selectedModifiers = category.Modifiers.filter(
                    (modifier) => modifier.isChecked
                ).length;

                if (maxVal !== 0) {
                    if (newCheckedState && selectedModifiers >= maxVal) {
                        setIsToastMessageVisiable(true);
                        setTastMessage(
                            `Max limit of ${maxVal} reached for ${order?.Category_Name} modifier. Please unselect one to add another.`
                        );

                        setTimeout(() => {
                            setIsToastMessageVisiable(false);
                            setTastMessage("");
                        }, 6000);
                        return prev;
                    }
                }


                const modifierIndex = category.Modifiers.findIndex(
                    (modifier) => modifier.Modifier_Id === subItem?.Modifier_Id
                );

                if (modifierIndex !== -1) {
                    subItem.isChecked = newCheckedState;
                }
            }


            setModifiersResponseData(updatedModifiersResponseData);


            getAllSelectedModifiers({
                ...subItem,
                isChecked: newCheckedState,
                Item_ID: singleItemDetails?.Item_ID,
                Category_Id,
            });

            return {
                ...prev,
                [`${index}-${subIndex}`]: newCheckedState,
            };
        });
    };



    // const toggleCheckbox = (
    //     subItem,
    //     Category_Id,
    //     order,
    //     subIndex,
    //     index
    //   ) => {
    //     setCheckedItems((prev) => ({
    //         ...prev,
    //         [`${index}-${subIndex}`]: !prev[`${index}-${subIndex}`],
    //     }));
    //     console.log(subItem,
    //         Category_Id,
    //         order,
    //         subIndex,
    //         index,"================>.")
    //     setIsValueChecked(!isValueChecked);
    //     const numberMatch = order.Message.match(/\d+/);
    //     let maxVal = numberMatch ? parseInt(numberMatch[0]) : 0;

    //     const updatedModifiersResponseData = { ...modifiersResponseData };

    //     const categoryIndex = updatedModifiersResponseData?.Categories.findIndex(
    //       (category) => category.Category_Id === Category_Id
    //     );

    //     if (categoryIndex !== -1) {
    //       const category = updatedModifiersResponseData.Categories[categoryIndex];

    //       const selectedModifiers = category.Modifiers.filter(modifier => modifier.isChecked).length;
    //       console.log(selectedModifiers,isValueChecked, "selectedModifiers----------------->>>>>>>>>>>>>");
    //       if (maxVal !== 0) {
    //         if (selectedModifiers >= maxVal) {
    //             setIsToastMessageVisiable(true);
    //             setTastMessage(`Max limit of ${maxVal} reached for ${order?.Category_Name} modifier. Please unselect one to add another.`);

    //           setTimeout(() => {
    //             setIsToastMessageVisiable(false);
    //             setTastMessage("");
    //           }, 6000);
    //           return;
    //         }
    //       }

    //       const modifierIndex = category.Modifiers.findIndex(
    //         (modifier) => modifier.Modifier_Id === subItem?.Modifier_Id
    //       );

    //       if (modifierIndex !== -1) {
    //         category.Modifiers[modifierIndex].isChecked = isValueChecked;
    //       }
    //     }

    //     setModifiersResponseData(updatedModifiersResponseData);

    //     getAllSelectedModifiers({ ...subItem, isChecked: isValueChecked, Item_ID:singleItemDetails?.Item_ID, Category_Id });
    //   };
    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={[styles.modifierScroll, categoryData?.length === 0 && { flex: 1 }]}
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
                                    props?.isRecentOrder ? {} :
                                        {
                                            width:
                                                (quantity >= 1 || modifierQuantity >= 1)
                                                    ? responsiveWidth(25)
                                                    : responsiveWidth(17),
                                        },
                                ]}
                            >
                                <UI.TouchableOpacity style={styles.favIconBtn}
                                    onPress={() => toggleFavoriteItems()}
                                >
                                    {isItemFavorite === 1 ? (
                                        <Image
                                            source={require("@/assets/images/icons/Fav3x.png")}
                                            style={[styles.favIcon, { right: (quantity >= 10 || modifierQuantity >= 10) && 8 }]}
                                            resizeMode='contain'
                                        />
                                    ) : (
                                        <Image
                                            source={require("@/assets/images/icons/Notfav3x.png")}
                                            style={[styles.favIcon, { right: (quantity >= 10 || modifierQuantity >= 10) && 8 }]}
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

                                        <View style={{ marginVertical: 10 }}>
                                            <FlatList
                                                data={categoryData}
                                                keyExtractor={(item, index) => index.toString()}
                                                renderItem={({ item, index }) => (
                                                    <View
                                                        style={{
                                                            backgroundColor: "#f9f9f9",
                                                            marginBottom: 6,
                                                            borderRadius: 5,
                                                            overflow: "hidden",
                                                            borderWidth: 0.2,
                                                        }}
                                                    >
                                                        <TouchableOpacity
                                                            onPress={() => toggleExpand(index)}
                                                            style={{
                                                                flexDirection: "row",
                                                                justifyContent: "space-between",
                                                                backgroundColor: "#F3F3F3",
                                                                paddingHorizontal: 10,
                                                                paddingVertical: 5,
                                                                borderRadius: 5,
                                                            }}
                                                        >
                                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                <Text
                                                                    style={{
                                                                        color: "#4B5154",
                                                                        fontSize: 14,
                                                                        fontFamily: "SourceSansPro_SemiBold",
                                                                        alignSelf: "center",
                                                                    }}
                                                                >
                                                                    {item.Category_Name}
                                                                </Text>
                                                                {/* <Text>{item.require}</Text> */}

                                                                {
                                                                    item.DisplayOption &&
                                                                    <Text
                                                                        style={{color: "#4B5154",
                                                                            fontSize: 14,
                                                                            fontFamily:"SourceSansPro_SemiBold",}}
                                                                    >
                                                                        {` (${(item.DisplayOption)}) `}
                                                                    </Text>
                                                                }
                                                                <Text style={{ color: "#3B87C1", fontSize: 13, fontFamily: "SourceSansPro_SemiBold", paddingHorizontal: 4 }}>
                                                                    {item.Message
                                                                        ? `(${item.Message})`
                                                                        : ""}
                                                                </Text>
                                                            </View>
                                                            <Text style={{ fontSize: 16, color: "#000" }}>
                                                                {expandedSections[index] ? (
                                                                    <ChevronDownIcon
                                                                        style={{ width: 22, height: 22 }}
                                                                        color="#5773a2"
                                                                        size={"xl"}
                                                                    />
                                                                ) : (
                                                                    <ChevronRightIcon
                                                                        style={{ width: 22, height: 22 }}
                                                                        color="#5773a2"
                                                                        size={"xl"}
                                                                    />
                                                                )}
                                                            </Text>
                                                        </TouchableOpacity>

                                                        {expandedSections[index] && (
                                                            <FlatList
                                                                data={item?.Modifiers}
                                                                // keyExtractor={(item, subIndex) => `${index}-${subIndex}`}
                                                                style={{ padding: 10, backgroundColor: "#fff" }}
                                                                renderItem={({ item: subItem, index: subIndex }) => {

                                                                    return (
                                                                        <View
                                                                            style={{
                                                                                flexDirection: "row",
                                                                                justifyContent: "space-between",
                                                                            }}
                                                                        >
                                                                            <TouchableOpacity
                                                                                onPress={() => toggleCheckbox(subItem, item?.Category_Id, item, subIndex, index)}
                                                                                style={{
                                                                                    flexDirection: "row",
                                                                                    alignItems: "center",
                                                                                    paddingVertical: 5,
                                                                                }}
                                                                            >
                                                                                <View
                                                                                    style={{
                                                                                        width: 20,
                                                                                        height: 20,
                                                                                        borderWidth: 0.75,
                                                                                        borderColor: "#4B5154",
                                                                                        borderRadius: 3,
                                                                                        justifyContent: "center",
                                                                                        alignItems: "center",
                                                                                        backgroundColor: "#fff",
                                                                                    }}
                                                                                >
                                                                                    {(
                                                                                        // `checkedItems[`${index}-${subIndex}`] && 
                                                                                    subItem.isChecked) && (
                                                                                        <Icon
                                                                                            as={CheckIcon}
                                                                                            className="text-typography-500 m-2 w-5 h-5"
                                                                                        />
                                                                                    )}
                                                                                </View>

                                                                                <Text
                                                                                    style={{
                                                                                        color: "#4B5154",
                                                                                        fontSize: 14,
                                                                                        fontFamily: "SourceSansPro_SemiBoldItalic",
                                                                                        paddingHorizontal: 10,
                                                                                    }}
                                                                                >
                                                                                    {subItem?.Modifier_Name}
                                                                                </Text>
                                                                            </TouchableOpacity>

                                                                            <Text
                                                                                style={{
                                                                                    marginLeft: "auto",
                                                                                    color: "#4B5154",
                                                                                    fontSize: 14,
                                                                                    fontFamily: "SourceSansPro_SemiBold",
                                                                                }}
                                                                            >
                                                                                {subItem?.Price !== null && parseFloat(subItem?.Price) !== 0 && (
                                                                                    <Text>{`$${parseFloat(subItem?.Price).toFixed(2)}`}</Text>
                                                                                )}
                                                                            </Text>
                                                                        </View>
                                                                    )
                                                                }}
                                                            />
                                                        )}
                                                    </View>
                                                )}
                                            />
                                        </View>


                                        {/* <UI.CbAccordionlist screenName="Modifiers" props={props} getAllSelectedModifiers={getAllSelectedModifiers}    /> */}
                                    </>
                                )}
                            </UI.Box>
                            <UI.Box style={{ paddingBottom: 100 }}>
                                <UI.Text style={styles.allergyInfoTxt}>
                                    Comment/Allergy Info
                                </UI.Text>
                                <UI.cbForm
                                    formId={pageId}
                                    setFormFieldData={setFormFieldData}
                                    getFormFieldData={getFormFieldData}
                                >
                                    <UI.cbInput id="Comments" style={styles.commentsBox} multiline={true} numberOfLines={4} formId={pageId} value={value?.value} />
                                    {/* <UI.cbInput id="Comments" style={styles.commentsBox} multiline={true} numberOfLines={4} formId={pageId}/> */}
                                </UI.cbForm>
                            </UI.Box>
                        </UI.Box>
                    </UI.Box>

                </UI.Box>

            </ScrollView>
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

            {
                isToastMessageVisiable &&
                <UI.CbToastMessage
                    message={toastMessage}
                    isToastMessageVisiable={isToastMessageVisiable}
                    transparent={true}
                    onRequestClose={() => setIsToastMessageVisiable(!isToastMessageVisiable)}
                    closePreviewModal={() => setIsToastMessageVisiable(!isToastMessageVisiable)}
                />
            }
        </>
    )
}

export default ItemDetails


{/* <UI.Box style={{
                backgroundColor: "#fff",
                width: "100%",
                height: 80,
                position: "absolute",
                bottom: 0,
                right: 0,
                left: 0,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderTopWidth: 1,
                borderColor: "#ccc",
                paddingHorizontal: 20,
                zIndex: 9
            }}>
                <UI.Box>
                    <UI.Text style={{
                        fontSize: 12,
                        color: "#4B5154",
                        fontFamily: "SourceSansPro_Italic",
                    }}>Total Amount</UI.Text>
                    <UI.Text style={{
                        fontSize: 24,
                        color: "#4B5154",
                        paddingVertical: 8,
                        fontFamily: "SourceSansPro_SemiBold",
                    }}>{`$${quantity >= 1 ? itemDataVisible ? singleItemPrice : totalCartPrice : singleItemPrice}`}</UI.Text>
                    <UI.Text style={{
                        fontSize: 24,
                        color: "#4B5154",
                        paddingVertical: 8,
                        fontFamily: "SourceSansPro_SemiBold",
                    }}>10</UI.Text>
                </UI.Box>
                <UI.TouchableOpacity style={{
                    backgroundColor: "#5773a2",
                    width: responsiveWidth(40),
                    height: responsiveHeight(5),
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                   onPress={() => handleModifierAddCart()}
                >
                    <UI.Text style={{
                        color: "#fff",
                        fontSize: responsiveFontSize(2.8),
                        fontFamily: "SourceSansPro_SemiBold",
                        textAlign: "center",
                        paddingTop: isPlatformAndroid() ? 8 : 10
                    }}>Add to Cart</UI.Text>
                </UI.TouchableOpacity>
            </UI.Box> */}


                                                                             