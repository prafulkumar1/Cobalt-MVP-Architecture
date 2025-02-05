import * as UI from '@/components/cobalt/importUI';
import { ProfitCentersData, foodOrderData, ModifiersData } from '@/source/constants/commonData';
import { navigateToScreen } from '@/source/constants/Navigations';
import React, { useState, useEffect } from 'react';
import { Image, Modal } from "react-native";
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { AddIcon, TrashIcon, RemoveIcon, Icon } from '@/components/ui/icon';
import { useFormContext } from '@/components/cobalt/event';

const ItemData = (props) => {
    const [quantity, setQuantity] = useState(1);
    const [itemNames, setItemNames] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const { itemDataVisible, closePreviewModal,singleItemDetails } = useFormContext()
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


    const firstItem = itemNames[0] || {};

    return (
        <>
            <UI.ScrollView style={{ flex: 1,  }}>
                <UI.Box style={styles.mainContainer}>
                    <UI.TouchableOpacity onPress={() => setIsVisible(false)}>
                        <UI.CbImage
                            imageJsx={
                                <Image
                                    alt='image'
                                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU" }}
                                    style={styles.itemImage}
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
                            style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                paddingBottom: 20,
                            }}
                        >
                            <UI.Box style={styles.innerModal}>
                                <UI.Box style={styles.innerModalMsgContainer}>
                                    <UI.Text style={styles.innerModalAlertTxt}>
                                        Are you sure you want to discard your changes?
                                    </UI.Text>
                                </UI.Box>
                                <UI.Box style={{ flexDirection: 'row', justifyContent: "space-between" }}>
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
                                            },100)
                                        }}
                                        style={styles.modalNoYesBtn}
                                    >
                                        <UI.Text style={styles.modalNoYesBtnTxt}>Yes</UI.Text>
                                    </UI.TouchableOpacity>
                                </UI.Box>
                            </UI.Box>
                        </UI.Box>
                    </Modal>
    
                    <UI.Box style={{ paddingHorizontal: 7, width: "100%", backgroundColor: "#fff" }}>
                        <UI.Box style={styles.itemDetailsContainer}>
                            <UI.Box>
                                <UI.Text style={styles.foodItemName}>
                                    {firstItem.Item_Name || 'Item Name'}
                                </UI.Text>
                                <UI.Text style={styles.foodItemPrice}>
                                    ${firstItem.Price || '0.00'}
                                </UI.Text>
                            </UI.Box>
    
                            <UI.Box style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <UI.Text>QUANTITY</UI.Text>
                            </UI.Box>
                        </UI.Box>
    
                        <UI.Box style={styles.foodDiscripContainer}>
                            <UI.Text style={styles.foodDiscripTxt}>
                                {firstItem.Description}
                            </UI.Text>
                        </UI.Box>
    
                        <UI.Box style={{ paddingVertical: 15 }}>
                            <UI.Text style={styles.modifierTxt}>Modifiers</UI.Text>
    
                           
                            <UI.ScrollView  showsVerticalScrollIndicator={false} style={{flex:1,marginBottom: 80,  }}>
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
    
                <UI.TouchableOpacity style={styles.addToCartBtn}>
                    <UI.Text style={styles.addCartTxt}>Add to Cart</UI.Text>
                </UI.TouchableOpacity>
            </UI.Box>
        </>
    );
    
};

export default ItemData;

const styles = UI.StyleSheet.create({
    iconBtn: {
        marginHorizontal: 10,
    },
    quantityTxt: {
        fontSize: 18,
        color: "#4B5154",
    },
    mainContainer:{ flex: 1, position: "relative", backgroundColor: '#fff', borderTopLeftRadius: 35, borderTopRightRadius: 35 },
    itemImage: { width: "100%", height: 230, borderTopLeftRadius: 35, borderTopRightRadius: 35 },
    itemDetailsContainer:{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 0.4, borderStyle: 'dashed' },
    foodItemName:{ fontSize: 18, color: "#4B5154", paddingBottom: 3, fontWeight: '500' },
    foodItemPrice:{ fontSize: 18, color: "#4B5154", fontWeight: '500' },
    foodDiscripContainer:{ paddingVertical: 15, borderBottomWidth: 0.4, borderStyle: 'dashed' },
    foodDiscripTxt:{ fontSize: 12, color: "#6D6D6D", fontStyle: 'italic', fontWeight: 'semibold' },
    modifierTxt:{ fontSize: 16, color: "#4B5154", fontWeight: "500" },
    allergyInfoTxt:{ fontSize: 16, color: "#4B5154", fontWeight: "500", paddingVertical: 10 },
    commentsBox:{height: 100, borderColor: "#00000026",   borderRadius: 5,paddingBottom:10 ,},
    footerContainer:{
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
        borderTopWidth: 0.4,
        borderColor: "#ccc",
        paddingHorizontal: 20
    },
    totalAmountTxt:{ fontSize: 12, color: "#4B5154", fontStyle: 'italic' },
    orderAmount:{ fontSize: 24, color: "#4B5154", fontWeight: "semibold", paddingVertical: 8 },
    addToCartBtn:{
        backgroundColor: "#5773a2",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addCartTxt:{ color: "#fff", fontSize: 22, fontWeight: "semibold", textAlign: 'center' },
    crossbtn: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        top: 15,
        right: 15
    },
    crossImage: { width: 20, height: 20, tintColor: "white" },
    modalContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalNoYesBtn: {
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#5773A2",
        borderRadius: 32,
        width: 150
    }, 
    modalNoYesBtnTxt: { color: "#5773A2", fontSize: 21 },
    innerModalAlertTxt:{ fontSize: 24, color: "#4B5154", fontWeight: '500', textAlign: 'center', lineHeight: 30 },
    innerModalMsgContainer:{ width: "100%", height: "80%", justifyContent: 'center', alignItems: 'center', paddingHorizontal: 50 },
    innerModal:{
        width: '100%',
        backgroundColor: "#fff",
        height: 390,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        justifyContent: 'space-between',
    },

});
