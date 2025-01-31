
import * as UI from '@/components/cobalt/importUI';
import {useFormContext } from '@/components/cobalt/event';
import { Image } from 'react-native';
import { useMyCartLogic } from '@/source/controller/myCart/myCart';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Swipeable } from 'react-native-gesture-handler';
import { priceItems } from '@/source/constants/commonData';

const pageId='MyCart';
export default function MyCartScreen(props) {

 let pageConfigJson = global.appConfigJsonArray.find(item => item.PageId === pageId);

 global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
  
   const {  tipData, value, setValue,openItemId,setOpenItemId ,swipeableRefs} = useMyCartLogic();
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
    const handleSwipeOpen = (itemId) => {
      if (openItemId !== itemId) {
        if (openItemId !== null && swipeableRefs.current[openItemId]) {
          swipeableRefs.current[openItemId].close();
        }
        setOpenItemId(itemId);
      }
    };
  
    return (
      <Swipeable
        ref={(ref) => {
          swipeableRefs.current[`${item.Item_Id}`] = ref;
        }}
        renderRightActions={renderRightActions}
        onSwipeableOpen={() => handleSwipeOpen(item.Item_Id)}
      >
        <UI.Box style={[styles.cardContainer, { opacity: value === 0 ? 1 : 0.5 }]}>
          <UI.Box style={styles.mainContainer}>
            <UI.Box style={styles.cartItemContainer}>
              <UI.Text style={styles.itemTitle}>{item.Item_Name}</UI.Text>
              <UI.Text style={styles.itemCategory}>
                {item.Description}
              </UI.Text>
            </UI.Box>

            <UI.Box style={styles.rightContainer}>
              <UI.Text style={styles.itemPrice}>{`$${item.Price}`}</UI.Text>
              <UI.CbAddToCartButton mealItemDetails={item} style={styles.addToCartBtn} cartStyle={true} />
            </UI.Box>
          </UI.Box>

          <UI.Box style={styles.notesContainer}>
            <Image source={require("@/assets/images/icons/messageIcon2x.png")} style={styles.noteIcon} />
            <UI.Text style={styles.itemNotes}>
              sdsandkkdksa
            </UI.Text>
          </UI.Box>
        </UI.Box>
      </Swipeable>
    );
  };

  const renderAddTip = (tipDetails,index) => {
    let lastIndex = tipData.length - 1;
    let item = tipDetails
    return(
     <>
         <UI.TouchableOpacity style={[styles.tipMainContainer,{backgroundColor:item.isSelected===1?"#00BFF6":"#fff"}]}>
         <UI.Text style={[styles.tipCount,{color:item.isSelected===1?"#fff":"#00BFF6"}]}>{item.tip}.00%</UI.Text>
       </UI.TouchableOpacity>
       { 
       lastIndex === index &&  <UI.TouchableOpacity style={[styles.tipMainContainer,{backgroundColor:item.isSelected===1?"#00BFF6":"#fff"}]}>
       <UI.Text style={[styles.tipCount,{color:item.isSelected===1?"#fff":"#00BFF6"}]}>Custom</UI.Text>
     </UI.TouchableOpacity>
       }
     </>
    )
  }

  const PriceRow = ({ label, value }) => (
    <UI.Box style={styles.splitPriceContainer}>
      <UI.Box style={styles.priceLabelContainer}>
        <UI.Text style={styles.priceLabel}>{label}</UI.Text>
      </UI.Box>
      <UI.Box style={styles.valueMainContainer}>
        <UI.Text style={styles.priceLabel}>{value}</UI.Text>
      </UI.Box>
    </UI.Box>
  );
  
  const PriceDetails = () => (
    <UI.Box style={styles.priceContainer}>
      <UI.Box style={styles.priceSubContainer}>
        {priceItems.map((item, index) => (
          <PriceRow key={index} label={item.label} value={item.value} />
        ))}
      </UI.Box>
    </UI.Box>
  );
  return (
    <UI.Box style={styles.topContainer}>
      <UI.ScrollView showsVerticalScrollIndicator={false}>
        {cartData && cartData.length > 0 ? (
          cartData?.map((items) => {
            return renderCartItems(items);
          })
        ) : (
          <UI.View style={styles.cartEmptyContainer}>
            <UI.Text style={styles.emptyCartTxt}>Cart is empty</UI.Text>
          </UI.View>
        )}
        <UI.Box style={styles.mainSubContainer}>
          <UI.TouchableOpacity style={styles.orderInstContainer}>
            <Image
              alt="pras"
              source={require("@/assets/images/icons/notes.png")}
              style={styles.notesIcon}
              resizeMode="contain"
            />
            <UI.Text style={styles.orderInstTxt}>Order Instructions</UI.Text>
          </UI.TouchableOpacity>
          <UI.CbCommonButton
            id={"addMorebtn"}
            showBtnName={"Add More"}
            isPlusIconAvailable={true}
            screenName={"MenuOrder"}
            isHomeEnabled={true}
            props={props}
          />
        </UI.Box>

        <UI.Box
          style={styles.priceContainer}
        >
          <PriceDetails />
        </UI.Box>

        <UI.Box style={styles.tipContainer}>
          <UI.Text style={styles.tipTxt}>ADD OPTIONAL TIP</UI.Text>
        </UI.Box>

        <UI.ScrollView horizontal={true}>
          {
            tipData && tipData.map((item, index) => {
              return renderAddTip(item, index)
            })
          }
        </UI.ScrollView>


        <UI.Box style={styles.pickUpContainer}>
          <UI.Box>
            <UI.Text style={styles.pickUpTimeTxt}>Select Pickup Time</UI.Text>
            <UI.TouchableOpacity style={styles.timeBtn}>
              <UI.Text style={styles.timeTxt}>7:00 PM</UI.Text>
            </UI.TouchableOpacity>
          </UI.Box>

          <UI.Box>
            <UI.Text style={styles.pickUpPointTxt}>Select Pickup Point</UI.Text>
            <UI.TouchableOpacity style={styles.timeBtn}>
              <UI.Text style={styles.timeTxt}>Clubhouse Grill</UI.Text>
            </UI.TouchableOpacity>
          </UI.Box>
        </UI.Box>

        <UI.TouchableOpacity style={styles.plcOrdBtn}>
          <UI.Box style={styles.plcMainContainer}>
            <UI.Text style={styles.totalAmtTxt}>Total Amount</UI.Text>
            <UI.Text style={styles.totalPrcTxt}>$206.60</UI.Text>
          </UI.Box>
          <UI.Box style={styles.verticalLn} />
          <UI.Box style={styles.plcOrderTxtContainer}>
            <UI.Text style={styles.plcOrderTxt}>Place Order</UI.Text>
          </UI.Box>
        </UI.TouchableOpacity>

      </UI.ScrollView>
    </UI.Box>
  );
}

const styles = UI.StyleSheet.create({
  topContainer:{ flex: 1, padding: 10,backgroundColor:"#fff" },
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
      width:responsiveWidth(35)
    },
    itemNotes:{
      color:"#6D6D6D",
      fontSize:12,
      fontStyle:"italic",
      paddingLeft:8
    },
    itemPrice:{
      fontSize:16,
      color:"#4B5154",
      lineHeight:20,
      fontWeight:"600",
      paddingRight:10
    },
    rightContainer:{ flexDirection: "row", alignItems: "center" },
    cardContainer:{ 
      padding: responsiveWidth(3), 
      borderRadius: 10, 
      marginTop:responsiveHeight(1),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
      elevation: 2,
      backgroundColor:"#fff",
      margin:4
    },
    notesContainer:{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingTop: 5 },
    swipeActionContainer:{
      backgroundColor:"#FF0000",
      width:90,
      height:responsiveHeight(6.5),
      marginLeft:responsiveWidth(2),
      marginTop:responsiveHeight(1),
      justifyContent:"center",
      alignItems:"center",
      borderTopLeftRadius:10,
      borderBottomLeftRadius:10,
    },
    removeBtb:{
      color:"#FFFFFF",
      fontSize:16
    },
    emptyCartTxt:{ fontSize: 18, fontWeight: "500", padding: 10,fontStyle:"italic" },
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
    },
    tipMainContainer:{
      width:90,
      height:40,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:10,
      marginHorizontal:5,
      marginVertical:10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 2,  
      elevation: 3,
      alignSelf:"center"
    },
    tipCount:{fontSize:14,fontWeight:"700"},
    cartItemContainer:{ width: responsiveWidth(55) },
    addToCartBtn:{ padding: responsiveWidth(2) },
    cartEmptyContainer:{ alignSelf: "center" },
    priceContainer:{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      marginVertical: responsiveHeight(1),
    },
    priceSubContainer:{ alignSelf: "flex-end" },
    totalPriceContainer:{
      alignSelf: "flex-end",
      justifyContent: "flex-end",
      width: responsiveWidth(25),
    },
    pickUpContainer:{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", backgroundColor: "#EFEFEF", padding: 10 },
    pickUpTimeTxt:{ textAlign: "center", fontStyle: "italic", fontSize: 12 },
    timeBtn:{ borderRadius: 5, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", width: 165, height: 32, marginTop: 5 },
    timeTxt:{ color: "#4B5154", fontWeight: "800", fontSize: 18 },
    pickUpPointTxt:{ textAlign: "center", fontStyle: "italic", fontSize: 12 },
    plcOrdBtn:{ width: 250, height: 45, paddingHorizontal: 25, flexDirection: "row", backgroundColor: "#5773A2", justifyContent: "space-between", alignItems: "center", alignSelf: "center", borderRadius: 23, margin: 20 },
    plcMainContainer:{ paddingRight: 10 },
    totalAmtTxt:{ color: "#ffffff", fontSize: 12, fontStyle: "italic" },
    totalPrcTxt:{ fontSize: 16, color: "#FFFFFF", top: -4, fontWeight: "600" },
    verticalLn:{ height: 30, borderWidth: 0.7, borderColor: "#93A5C4" },
    plcOrderTxtContainer:{ width: "70%" },
    plcOrderTxt:{
      color: "#FFFFFF", fontSize: 20, fontWeight: "600", textAlign: "center"
    },
    splitPriceContainer:{ marginTop:2,flexDirection: "row", width: responsiveWidth(55), justifyContent: "space-between", alignItems: "center" },
    priceLabelContainer:{ alignSelf: "flex-end", width: responsiveWidth(30) },
    valueMainContainer:{ flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end", },
    noteIcon:{width:15,height:15,resizeMode:"contain"}
}); 