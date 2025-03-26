import { horizontalScale, isPlatformAndroid,isPlatformIos, moderateScale, verticalScale } from "@/source/constants/Matrices";
import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
 
export const styles = StyleSheet.create({
  mainContainer:{ backgroundColor: "#fff",flex:1 },
  subContainer:{ flexDirection: "row",marginTop:responsiveHeight(1), marginLeft: 8,height:responsiveHeight(5),alignItems:"center"},
  ButtonStyle: {
    backgroundColor: '#FFFFFF',
    shadowColor: "#000",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width:isPlatformAndroid()?130:responsiveHeight(19),
    height:isPlatformAndroid()?30:responsiveHeight(3.5),
    marginHorizontal:3
  },
  ButtonTextStyle: {
    color: "#4B5154",
    fontFamily: "SourceSansPro_SemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  ActiveButtonStyle: {
    backgroundColor: '#26BAE2',
    shadowColor: "#000",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width:isPlatformAndroid()?130:responsiveHeight(19),
    height:isPlatformAndroid()?30:responsiveHeight(3.5),
    marginHorizontal:3
  },
  ActiveButtonTextStyle: {
    color: "#FFFFFF",
    fontFamily: "SourceSansPro_SemiBold",
    fontSize: 16,
    textAlign:"center"
  },
  Item_Image: { height: responsiveHeight(6.4),width:responsiveWidth(23), borderRadius: 6,resizeMode:"cover" },
  Favorite_Image: { height: 22, width: 20 },
  AddButton: {   width:30, height: 30,left:40,top:12},
  loadingContainer:{ height: responsiveHeight(70), justifyContent: "center", alignItems: "center" },
  favMainContainer:{ paddingHorizontal: 8, height: '100%', paddingBottom: responsiveHeight(20) },
  favItem:{ flexDirection: 'row', justifyContent: 'space-between', gap: 3, paddingVertical: 15, borderBottomWidth: 0.2, borderBlockColor: "#00000026" },
  itemImg:{ width:responsiveWidth(25)},
  labelContainer:{ paddingHorizontal: 5,width:responsiveWidth(38)},
  itemLables:{
    fontSize: 18,
    color: "#4B5154",
    fontFamily: 'SourceSansPro_SemiBold',
   },
   showLessTxt:{
    fontSize: 11,
    color: '#3B87C1',
    fontFamily: 'SourceSansPro_SemiBold',
    lineHeight: 13
  },
  readLessTxt:{ color: '#26BAE2', fontSize: 11 },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent:"space-between",
    width:responsiveWidth(35),
  },
  rightSubContainer: {
    width: responsiveWidth(5),
    height: responsiveHeight(2.5),
    justifyContent: "center",
    alignItems: "center",
    right:15,
  },
  favIcon:{ width: 20, height:20,top:10 },
  addToCartBtn: {
    padding: responsiveWidth(1.8),
  },
  addToCartBtn2: {
    backgroundColor: "#5773a2",
    width:responsiveWidth(40),
    height:responsiveHeight(5),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  operationBtn: {
    borderColor: '#5773a2',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    left:-20
  },
  operationBtn2:{
    borderWidth:1,borderColor:"#5773a2",borderRadius:5,left:-20,padding: responsiveWidth(1.8)
  },
   iconBtn: { width: responsiveWidth(7.9), height: responsiveHeight(5), justifyContent: "center", alignItems: 'center', alignSelf: "center" },
   trashIcon: { width: 23, height: 23 },
   addIcon: { width: 25, height: 25 },
    quantityTxt: {
       fontSize: responsiveFontSize(2.8),
       fontFamily: "SourceSansPro_Regular",
       paddingLeft: responsiveWidth(1.2),
       paddingRight: responsiveWidth(0.8),
       paddingTop: 4
     },
   recentContainer:{
    paddingHorizontal: horizontalScale(10),
    width: "100%",
    borderRadius: moderateScale(8),
    backgroundColor: "#ffffff",
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    borderRadius: 5,
    elevation: 0,
  },
  recentCardContainer:{
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 5,
    elevation: 3,
  },
  recentStatusContainer:{ flexDirection: "row", alignItems: "center", paddingVertical: 10, justifyContent: "space-between" ,width:"100%"},
  orderIcon:{ width: 28, height: 28, left: 6 },
  orderCompIcon:{ width: 28, height: 28 },
  labelStatus:{ fontSize: 18, fontFamily: "SourceSansPro_SemiBoldItalic", marginLeft: 10, left: 10 },
  completeLabelStatus:{ fontSize: 18, fontFamily: "SourceSansPro_SemiBoldItalic", marginLeft: 10, left: 5 },
  statusValTxt:{ marginLeft: "auto", color: "#FF6F00", fontSize: responsiveFontSize(1.9), fontFamily: "SourceSansPro_SemiBold", right: 15 },
  statusCompelete:{ marginLeft: "auto", color: "#FF6F00", fontSize: responsiveFontSize(1.9), fontFamily: "SourceSansPro_SemiBold", },
  dottedLine:{width:"95%",alignSelf:"center"},
  compDottedLine:{width:"100%",alignSelf:"center"},
  pickUpDetailsContainer:{ flexDirection: "row", justifyContent: "space-between", alignItems: "center",paddingBottom:10,width:"96%",marginTop:10 },
  completedContainer:{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end",paddingVertical:10,width:"100%" },
  pickUpSubContainer:{ flexDirection: "row", justifyContent: "space-around", alignItems: "flex-start" },
  labelPickUpTime:{ fontSize: responsiveFontSize(1.3), color: "#4F4F4F", fontFamily: "SourceSansPro_SemiBoldItalic", },
  pickValue:{ fontSize:responsiveFontSize(2.2), fontFamily: "SourceSansPro_SemiBold", color: "#2A4E7D" },
  pickUpLocation:{ fontSize:responsiveFontSize(2.2), fontFamily: "SourceSansPro_SemiBold", color: "#2A4E7D",width:responsiveWidth(29) },
  compPickUpLocation:{ fontSize:responsiveFontSize(2.2), fontFamily: "SourceSansPro_SemiBold", color: "#2A4E7D",width:responsiveWidth(55)},
  verticalLine:{ height: responsiveHeight(4), width: 1, backgroundColor: "#CECECE", marginHorizontal: 15 },
  labelPickUpPoint:{ fontSize: responsiveFontSize(1.3), color: "#4F4F4F", fontFamily: "SourceSansPro_SemiBoldItalic",  },
  detailsContainer:{ justifyContent:"center",flexDirection:"row",alignItems:"center" },
  labelOrderId:{ fontSize: 14, color: "#4F4F4F", fontFamily: "SourceSansPro_BoldItalic" },
  orderSummaryContainer: {
    backgroundColor: "#ffffff",
  },
  labelOrdSummary:{ fontSize: 15, fontFamily: "SourceSansPro_SemiBold",marginBottom:10 },
  itemContainer:{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8, },
  labelItem:{ fontSize: 14, color: "#5773A2", fontFamily: "SourceSansPro_SemiBoldItalic",  },
  amountContainer:{ flexDirection: "row", alignItems: "center" },
  labelQty:{ fontSize: 14, color: "#5773A2", fontFamily: "SourceSansPro_SemiBoldItalic",  marginRight: 16 },
  labelAmount:{ fontSize: 14, color: "#5773A2", fontFamily: "SourceSansPro_SemiBoldItalic", },
  pendingOrderBox:{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  labelItemName:{ fontSize: 15,color:"#4B5154",fontFamily:"SourceSansPro_SemiBold",width:responsiveWidth(60), },
  labelQuantity:{ fontSize: 15, fontFamily: "SourceSansPro_SemiBold",color:"#4B5154",width:45,textAlign:"center", },
  itemPrice:{ fontSize: 15, fontFamily: "SourceSansPro_SemiBold",color:"#4B5154",width:70,textAlign:"center", },
  modifierName:{ fontSize: 12, color: "#3B87C1", fontFamily: "SourceSansPro_SemiBoldItalic", },
  commentBox:{ flexDirection: "row", alignItems: "flex-start", marginTop: 5 },
  commentIcon:{ width: horizontalScale(12), height: verticalScale(12), marginRight: 10, top: 5 },
  labelComment: {
    fontSize: 12,
    fontFamily: "SourceSansPro_SemiBoldItalic",
    flexShrink: 1,
    flexWrap: "wrap",
    maxWidth: "90%",
    color:"#6D6D6D",
  },
  priceSplitContainer: {
    marginTop:20,
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  labelSubTotal:{ fontFamily: "SourceSansPro_SemiBold",color:"#4B5154",paddingVertical:10 },
  tipDetailsContainer: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
    fontFamily: "SourceSansPro_Regular",
  },
  pendingOrderContainer:{},
  tipVal:{ fontFamily: "SourceSansPro_SemiBold",color:"#4B5154",fontSize:14,},
  loaderContainer:{height:responsiveHeight(80),alignItems:"center",justifyContent:"center"},
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  priceSubContainer: { alignSelf: "flex-end" },
  totalPriceContainer: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    width: responsiveWidth(25),
  },
  splitPriceContainer: { marginTop: 2, flexDirection: "row", width: responsiveWidth(55), justifyContent: "space-between", alignItems: "center" },
  priceLabelContainer: { alignSelf: "flex-end", width: responsiveWidth(30) },
  priceLabel: { textAlign: "right", color: "#4B5154", fontSize: 12, fontFamily: "SourceSansPro_SemiBold" },
  valueMainContainer: { flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end", },
  itemDetailsSubContainer:{
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  roAccordion:{width:"96%",marginHorizontal:8,marginVertical:5},
  roAccordionHeader:{backgroundColor:"#F3F3F3"},
  roAccordionHeading:{ display: "flex", flexDirection: "row", gap: 5 },
  roAccordionTitleText:{fontSize:18,fontFamily:"SourceSansPro_SemiBoldItalic",left:5},
  collapseIcon:{right:10},
  roReordertext:{ fontFamily: "SourceSansPro_Bold", fontSize: 16, fontWeight: "bold", textAlign: "center", flexShrink: 1,color:"#2A4E7D"},
  roReoderButton:{alignSelf:"center", width:116, borderRadius: 19,height: 38, backgroundColor: "#fff",borderColor:"#2A4E7D", justifyContent: "center", alignItems: "center",borderWidth:1.5,marginTop:20,marginBottom:15 },
  reorderBox:{ marginTop: 12, marginBottom: 6 },
  emptyFavList:{   
  fontFamily:"SourceSansPro_SemiBoldItalic",
  alignSelf:"center",
  marginTop:responsiveHeight(3)
},
divider:{marginTop:14,marginBottom:8,width:"95%",alignSelf:"center"},
modalBackground:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: "100%",
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
crossIcon: {
  width: 30,
  height: 30,
  borderRadius: 15,
  backgroundColor: "#000",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  top: horizontalScale(60),
  alignSelf: "center",
  opacity: 1,
  zIndex: 1000,
},
closeIcon:{ width: 20, height: 20 },
modiferItems:{height:responsiveHeight(85),width:"100%",position:'absolute',borderTopLeftRadius:35,borderTopRightRadius:35,bottom:0,right:0,left:0},
footerContainer: {
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
},
totalAmountTxt: {
  fontSize: 12,
  color: "#4B5154",
  fontFamily: "SourceSansPro_Italic",
},
orderAmount: {
  fontSize: 24,
  color: "#4B5154",
  paddingVertical: 8,
  fontFamily: "SourceSansPro_SemiBold",
},
addToCartBtn2: {
  backgroundColor: "#5773a2",
  width:responsiveWidth(40),
  height:responsiveHeight(5),
  borderRadius: 20,
  justifyContent: "center",
  alignItems: "center",
},
addCartTxt: {
  color: "#fff",
  fontSize: responsiveFontSize(2.8),
  fontFamily: "SourceSansPro_SemiBold",
  textAlign: "center",
  paddingTop:isPlatformAndroid()?8:10
},
itemCategory: {
  color: "#3B87C1",
  fontSize: 10,
  lineHeight: 16,
  width: responsiveWidth(35),
  fontFamily: "SourceSansPro_SemiBold"
},
headerContainer:{ flexDirection: "column" }
})
