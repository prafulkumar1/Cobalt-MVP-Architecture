import * as UI from '@/components/cobalt/importUI';
import { ProfitCentersData, foodOrderData } from '@/source/constants/commonData';
import { navigateToScreen } from '@/source/constants/Navigations';
import React, { useState, useEffect } from 'react';
import { Image } from "react-native";
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { AddIcon, TrashIcon, RemoveIcon, Icon } from '@/components/ui/icon';

const ItemData = () => {

    const [quantity, setQuantity] = useState(1);
    const [itemNames, setItemNames] = useState([]);
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

    const updateCartItemQuantity = (item, newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    // Ensure we have items before accessing
    const firstItem = itemNames[0] || {};

    return (
        <UI.Box style={{ flex: 1, position: "relative",backgroundColor:'#fff', borderTopLeftRadius: 35, borderTopRightRadius: 35 }}>
            <UI.TouchableOpacity>
                <UI.CbImage
                    imageJsx={<Image
                        alt='image'
                        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU" }}
                        style={{ width: "100%", height: 230, borderTopLeftRadius: 35, borderTopRightRadius: 35 }}
                    />}
                />
               


            </UI.TouchableOpacity>

            <UI.Box style={{ paddingHorizontal: 7, width: "100%" ,backgroundColor:"#fff"}}>
                <UI.Box style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 0.4, borderStyle: 'dashed' }}>
                    <UI.Box >
                        <UI.Text style={{ fontSize: 18, color: "#4B5154", paddingBottom: 3, fontWeight: 'semibold' }}>
                            {firstItem.Item_Name || 'Item Name'}
                        </UI.Text>
                        <UI.Text style={{ fontSize: 18, color: "#4B5154" }}>
                            ${firstItem.Price || '0.00'}
                        </UI.Text>
                    </UI.Box>

                    <UI.Box style={{ flexDirection: 'row', alignItems: 'center' }}>

                        {/* <UI.TouchableOpacity
                            style={styles.iconBtn}
                            onPress={() => updateCartItemQuantity(firstItem, quantity - 1)}
                        >
                            <Icon as={quantity === 1 ? TrashIcon : RemoveIcon} color="#5773a2" size={18} />
                        </UI.TouchableOpacity>

            
                        <UI.Text style={styles.quantityTxt}>{quantity}</UI.Text>

                       
                        <UI.TouchableOpacity
                            style={styles.iconBtn}
                            onPress={() => updateCartItemQuantity(firstItem, quantity + 1)}
                        >
                            <Icon as={AddIcon} color="#5773a2" size={20} />
                        </UI.TouchableOpacity> */}
                        <UI.Text>QUANTITY</UI.Text>
                    </UI.Box>
                </UI.Box>
                <UI.Box style={{ paddingVertical: 15, borderBottomWidth: 0.4, borderStyle: 'dashed' }}>

                    <UI.Text style={{ fontSize: 12, color: "#6D6D6D", fontStyle: 'italic', fontWeight: 'semibold' }}>
                        {firstItem.Description}
                    </UI.Text>
                </UI.Box>

                <UI.Box style={{ paddingVertical: 15 }} >
                    <UI.Text style={{ fontSize: 16, color: "#4B5154", fontWeight: "Semibold" }}>Modifiers</UI.Text>


                </UI.Box >



            </UI.Box>
            <UI.Box style={{
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
            }}>

                <UI.Box>
                    <UI.Text style={{ fontSize: 12, color: "#4B5154", fontStyle: 'italic' }}>
                        Total Amount
                    </UI.Text>
                    <UI.Text style={{ fontSize: 24, color: "#4B5154", fontWeight: "semibold", paddingVertical: 8 }}>
                        $34.00
                    </UI.Text>
                </UI.Box>


                <UI.TouchableOpacity
                    style={{
                        backgroundColor: "#5773a2",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 20,
                        justifyContent:'center',
                        alignItems:'center'
                    }}
                >
                    <UI.Text style={{ color: "#fff", fontSize: 22, fontWeight: "semibold",textAlign:'center'}}>
                        Add to Cart
                    </UI.Text>
                </UI.TouchableOpacity>
            </UI.Box>

        </UI.Box>
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
    }
});
