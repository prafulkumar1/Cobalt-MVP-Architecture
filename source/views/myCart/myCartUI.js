
import * as UI from '@/components/cobalt/importUI';
import {useFormContext } from '@/components/cobalt/event';
import { Image } from 'react-native';
import { useMyCartLogic } from '@/source/controller/myCart/myCart';
import { MessageCircleIcon,ChevronsLeftIcon,ChevronsRightIcon, ChevronDownIcon, CircleIcon,ChevronUpIcon,AddIcon,TrashIcon,RemoveIcon,SearchIcon,CloseIcon,ArrowLeftIcon } from '@/components/ui/icon';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Icon } from '@/components/ui/icon';
import { Swipeable } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const pageId='MyCart';
export default function MyCartScreen(props) {

 let pageConfigJson = global.appConfigJsonArray.find(item => item.PageId === pageId);

 global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
  const [value,setValue]  =useState(0)
   const {   } = useMyCartLogic();
   const {cartData,deleteCartItem}= useFormContext();

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
  
    const handleDelete = (item) => {
      deleteCartItem(item)
    };

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <UI.Box style={[styles.cardContainer,{opacity:value === 0?1:0.5}]}>
          <UI.Box style={styles.mainContainer}>
            <UI.Box style={{ width: responsiveWidth(55) }}>
              <UI.Text style={styles.itemTitle}>{item.Item_Name}</UI.Text>
              <UI.Text style={styles.itemCategory}>
                {item.Description}
              </UI.Text>
            </UI.Box>
  
            <UI.Box style={styles.rightContainer}>
              <UI.Text style={styles.itemPrice}>{`$${item.Price}`}</UI.Text>
              <UI.CbAddToCartButton mealItemDetails={item} style={{ padding: responsiveWidth(2) }} cartStyle = {true}/>
            </UI.Box>
          </UI.Box>
  
          <UI.Box style={styles.notesContainer}>
            <Icon as={MessageCircleIcon} color="#5773a2" size={"lg"} />
            <UI.Text style={styles.itemNotes}>
              Allergfhjsbd sajdklasbdas asjkdbksabdkjjsdasj .
            </UI.Text>
          </UI.Box>
        </UI.Box>
      </Swipeable>
    );
  };

  return (
    <UI.Box style={styles.topContainer}>
      <UI.ScrollView>
        {
          cartData && cartData.length > 0 ? cartData?.map((items) => {
            return renderCartItems(items)
          }) : <UI.View style={{ alignSelf: "center" }}>
            <UI.Text style={styles.emptyCartTxt}>Cart is empty</UI.Text>
          </UI.View>
        }
        <UI.Box style={styles.mainSubContainer}>
          <UI.TouchableOpacity style={styles.orderInstContainer}>
            <Image alt='pras' source={require("@/assets/images/icons/notes.png")} style={styles.notesIcon} resizeMode='contain' />
            <UI.Text style={styles.orderInstTxt}>Order Instructions</UI.Text>
          </UI.TouchableOpacity>
          <UI.CbCommonButton id={"addMorebtn"} showBtnName={"Add More"} isPlusIconAvailable={true} />
        </UI.Box>

        <UI.Box style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", marginVertical: responsiveHeight(2) }}>
          <UI.Box style={{ alignSelf: "flex-end" }}>
            <UI.Text style={styles.priceLabel}>Sub Total:</UI.Text>
            <UI.Text style={styles.priceLabel}>10% Service Charge:</UI.Text>
            <UI.Text style={styles.priceLabel}>State Tax:</UI.Text>
            <UI.Text style={styles.priceLabel}>Tip:</UI.Text>
          </UI.Box>
          <UI.Box style={{ alignSelf: "flex-end", justifyContent: "flex-end", width: responsiveWidth(25) }}>
            <UI.Text style={styles.priceLabel}>$171.00</UI.Text>
            <UI.Text style={styles.priceLabel}>$17.10</UI.Text>
            <UI.Text style={styles.priceLabel}>$8.5</UI.Text>
            <UI.Text style={styles.priceLabel}>$10.00</UI.Text>
          </UI.Box>
        </UI.Box>

        <UI.Box style={styles.tipContainer}>
          <UI.Text style={styles.tipTxt}>ADD OPTIONAL TIP</UI.Text>
        </UI.Box>
      </UI.ScrollView>
    </UI.Box>  
  );
}

const styles = UI.StyleSheet.create({
  topContainer:{ flex: 1, padding: 10 },
  scrollContent: {
    padding: 20,
  },
    operationBtn: {
      padding: responsiveWidth(2),
      height:40,
      backgroundColor:"green",
      borderColor: '#5773a2',
      borderWidth: 1,
      backgroundColor: '#fff',
      borderRadius: 5,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
      iconBtn: { width:responsiveWidth(5) },
    quantityTxt: {
      fontSize: 18,
      fontWeight: "300",
      paddingLeft: responsiveWidth(1.2),
      paddingRight: responsiveWidth(1.6),
    },
    mainContainer:{
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"flex-start",
      paddingBottom:responsiveHeight(1.5),
      borderBottomWidth:0.6,
      borderColor:"#9F9F9F",
    },
    itemTitle:{
      fontSize:16,
      color:"#4B5154",
      lineHeight:20,
      fontWeight:"600"
    },
    itemCategory:{
      color:"#3B87C1",
      fontSize:10,
      fontStyle:"italic",
      lineHeight:16,
    },
    itemNotes:{
      color:"#6D6D6D",
      fontSize:12,
      fontStyle:"italic",
      paddingLeft:5
    },
    itemPrice:{
      fontSize:16,
      color:"#4B5154",
      lineHeight:20,
      fontWeight:"600",
      paddingRight:10
    },
    rightContainer:{ flexDirection: "row", alignItems: "center" },
    cardContainer:{ borderWidth: 0.5, padding: responsiveWidth(3), borderRadius: 10, borderColor: "#0000003B",marginTop:responsiveHeight(1),},
    notesContainer:{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingTop: 10 },
    swipeActionContainer:{
      backgroundColor:"#FF0000",
      width:90,
      height:responsiveHeight(6.5),
      marginLeft:responsiveWidth(2),
      marginTop:responsiveHeight(1),
      justifyContent:"center",
      alignItems:"center",
      borderTopLeftRadius:10,
      borderBottomLeftRadius:10
    },
    removeBtb:{
      color:"#FFFFFF",
      fontSize:16
    },
    emptyCartTxt:{ fontSize: 18, fontWeight: "500", padding: 10 },
    operationBtn: {
      borderColor: '#5773a2',
      borderWidth: 1,
      backgroundColor: '#fff',
      borderRadius: 5,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
    orderInstContainer:{ borderWidth: 1, borderColor: "#C4C4C4", justifyContent: "flex-start", flexDirection: "row", alignItems: "center", width: 180, height: 27, borderRadius: 4, paddingHorizontal: 10 },
    notesIcon:{ width: 12, height: 18 },
    orderInstTxt:{ fontSize: 12, fontStyle: "italic", color: "#4B5154", paddingLeft: 10 },
    mainSubContainer:{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 },
    priceLabel:{textAlign:"right",color:"#4B5154",fontSize:12,fontWeight:"600"},
    tipContainer:{borderTopWidth:0.6,borderBottomWidth:0.6,justifyContent:"center",alignItems:"center",borderColor:"#B9B9B9",padding:10},
    tipTxt:{
      color:"#4B5154",
      fontWeight:"bold",
      fontSize:14
    }
});