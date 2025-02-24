import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { isPlatformIos } from "../constants/Matrices";

export const styles = StyleSheet.create({
    topContainer:{ flex: 1, padding: 10,backgroundColor:"#fff" },
    scrollContent: {
      padding: 20,
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
        fontFamily:"SourceSansPro_SemiBold",
        paddingBottom:5
      },
      itemCategory:{
        color:"#3B87C1",
        fontSize:10,
        lineHeight:16,
        width:responsiveWidth(35),
        fontFamily:"SourceSansPro_Italic"
      },
      itemNotes:{
        color:"#6D6D6D",
        fontSize:12,
        paddingLeft:8,
        fontFamily:"SourceSansPro_SemiBoldItalic",
        top:-2
      },
      itemPrice:{
        fontSize:16,
        color:"#4B5154",
        lineHeight:20,
        paddingRight:10,
        fontFamily:"SourceSansPro_SemiBold"
      },
      rightContainer:{ flexDirection: "row", alignItems: "center" },
      cardContainer:{ 
        padding: responsiveWidth(3), 
        borderRadius: 10, 
        marginTop:responsiveHeight(1),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 2,  
        elevation: 2,
        backgroundColor:"#fff",
        margin:4,
      },
      notesContainer:{ flexDirection: "row", justifyContent: "flex-start", paddingTop: 5 },
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
        fontSize:16,
        fontFamily:"SourceSansPro_SemiBold"
      },
      emptyCartTxt:{ fontSize: 18, fontWeight: "500", padding: 10,fontFamily:"SourceSansPro_BoldItalic" },
      orderInstContainer:{ borderWidth: 1, borderColor: "#C4C4C4", justifyContent: "flex-start", flexDirection: "row", alignItems: "center", width: 180, height: 27, borderRadius: 4, paddingHorizontal: 10 },
      notesIcon:{ width: 12, height: 18 },
      orderInstTxt:{ fontSize: 12, color: "#4B5154", paddingLeft: 10,fontFamily:"SourceSansPro_SemiBoldItalic" },
      mainSubContainer:{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 },
      priceLabel:{textAlign:"right",color:"#4B5154",fontSize:12, fontFamily:"SourceSansPro_SemiBold"},
      tipContainer:{borderTopWidth:0.6,borderBottomWidth:0.6,justifyContent:"center",alignItems:"center",borderColor:"#B9B9B9",padding:10},
      tipTxt:{
        color:"#4B5154",
        fontSize:14,
        fontFamily:"SourceSansPro_SemiBold"
      },
      tipMainContainer:{
        width:83,
        height:40,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        marginHorizontal:5,
        marginVertical:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,  
        elevation: 3,
        alignSelf:"center"
      },
      tipCount:{fontSize:14,fontFamily: "SourceSansPro_SemiBold"},
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
      pickUpTimeTxt:{ textAlign: "center", fontSize: 12,fontFamily:"SourceSansPro_BoldItalic" },
      timeBtn:{ borderRadius: 5, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", width: 165, height: 32, marginTop: 5, },
      timeTxt:{ color: "#4B5154", fontSize: 18 ,fontFamily:"SourceSansPro_BoldItalic"},
      pickUpPointTxt:{ textAlign: "center",  fontSize: 12,fontFamily:"SourceSansPro_BoldItalic" },
      plcOrdBtn:{ width: 250, height: 45, paddingHorizontal: 25, flexDirection: "row", backgroundColor: "#5773A2", justifyContent: "space-between", alignItems: "center", alignSelf: "center", borderRadius: 23, margin: 20,zIndex:0 },
      plcMainContainer:{ paddingRight: 10 },
      totalAmtTxt:{ color: "#ffffff", fontSize: 12, fontFamily:"SourceSansPro_SemiBoldItalic" },
      totalPrcTxt:{ fontSize: 16, color: "#FFFFFF", top: -4, fontFamily:"SourceSansPro_Bold" },
      verticalLn:{ height: 30, borderWidth: 0.7, borderColor: "#93A5C4" },
      plcOrderTxtContainer:{ width: "70%" },
      plcOrderTxt:{
        color: "#FFFFFF", fontSize: 20, textAlign: "center",fontFamily:"SourceSansPro_Bold"
      },
      splitPriceContainer:{ marginTop:2,flexDirection: "row", width: responsiveWidth(55), justifyContent: "space-between", alignItems: "center" },
      priceLabelContainer:{ alignSelf: "flex-end", width: responsiveWidth(30) },
      valueMainContainer:{ flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end", },
      noteIcon:{width:15,height:15,resizeMode:"contain",},
      customBtn:{    
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderRadius: 20,
      justifyContent: "space-around",
      alignItems: "center",
      flexDirection: "row",
      width: responsiveWidth(30),
      marginVertical:4
    },
    bottomBtn:{
      position: 'absolute',
      bottom:isPlatformIos()?responsiveHeight(10):responsiveHeight(0),
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      zIndex:1,
      backgroundColor: '#fff',
    },
    btnTextStyle:{color: "#4B5154", fontSize: 16, textAlign: "center",fontFamily:"SourceSansPro_SemiBold"},
    operationBtn: {
      borderColor: '#5773a2',
      borderWidth: 1,
      backgroundColor: '#fff',
      borderRadius: 5,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
    iconBtn: { width: responsiveWidth(7.9),height:responsiveHeight(5),justifyContent:"center",alignItems:'center',alignSelf:"center" },
    quantityTxt: {
      fontSize: responsiveFontSize(2.5),
      fontFamily:"SourceSansPro_Regular",
      paddingLeft: responsiveWidth(1.2),
      paddingRight: responsiveWidth(0.8),
      paddingTop:isPlatformIos() ? 2 : 4
    },
    trashIcon:{ width: 23, height: 23 },
    addIcon:{ width: 25, height: 25 },
    commentBtn:{ flexDirection: "row", justifyContent: "flex-start",alignItems:"flex-start" },
    
  }); 