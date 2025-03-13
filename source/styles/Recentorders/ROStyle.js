import { horizontalScale, isPlatformAndroid, moderateScale, verticalScale } from "@/source/constants/Matrices";
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
    elevation: 10,
    width:isPlatformAndroid()?responsiveWidth(30):responsiveHeight(16),
    height:isPlatformAndroid()?responsiveHeight(3):responsiveHeight(3.8),
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
    width:isPlatformAndroid()?responsiveWidth(30):responsiveHeight(16),
    height:isPlatformAndroid()?responsiveHeight(3):responsiveHeight(3.8),
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
  labelContainer:{ paddingHorizontal: 5,width:responsiveWidth(44)},
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
  },
  rightSubContainer: {
    width: responsiveWidth(5),
    height: responsiveHeight(2.5),
    justifyContent: "center",
    alignItems: "center",
    right:15,
  },
  favIcon:{ width: 25, height:25,top:10 },
  addToCartBtn: {
    padding: responsiveWidth(1.8),
  },
  recentContainer:{
    paddingHorizontal: horizontalScale(10),
    width: "100%",
    borderRadius: moderateScale(8),
    backgroundColor: "#ffffff",
    padding: moderateScale(10),
    alignSelf: "center"
  },
  recentCardContainer:{
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderRadius: 5,
    elevation: 5,
    marginTop:10,
  },
  recentStatusContainer:{ flexDirection: "row", alignItems: "center", paddingVertical: 18, justifyContent: "space-between" },
  orderIcon:{ width: 28, height: 28, left: 6 },
  labelStatus:{ fontSize: 18, fontFamily: "SourceSansPro_SemiBoldItalic", marginLeft: 10, left: 10 },
  statusValTxt:{ marginLeft: "auto", color: "#FF6F00", fontSize: responsiveFontSize(1.9), fontFamily: "SourceSansPro_SemiBold", right: 15 },
  dottedLine:{width:"92%",alignSelf:"center"},
  pickUpDetailsContainer:{ flexDirection: "row", justifyContent: "space-between", alignItems: "center",paddingBottom:10,width:"96%" },
  pickUpSubContainer:{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" },
  labelPickUpTime:{ fontSize: responsiveFontSize(1.3), color: "#4F4F4F", fontFamily: "SourceSansPro_SemiBoldItalic", },
  pickValue:{ fontSize:responsiveFontSize(2.2), fontFamily: "SourceSansPro_SemiBold", color: "#2A4E7D" },
  pickUpLocation:{ fontSize:responsiveFontSize(2.2), fontFamily: "SourceSansPro_SemiBold", color: "#2A4E7D",width:responsiveWidth(29) },
  verticalLine:{ height: responsiveHeight(4), width: 1, backgroundColor: "#CECECE", marginHorizontal: 15 },
  labelPickUpPoint:{ fontSize: responsiveFontSize(1.3), color: "#4F4F4F", fontFamily: "SourceSansPro_SemiBoldItalic",  },
  detailsContainer:{ justifyContent:"center",flexDirection:"row",alignItems:"center" },
  labelOrderId:{ fontSize: 14, color: "#4F4F4F", fontFamily: "SourceSansPro_BoldItalic" },
  orderSummaryContainer: {
    backgroundColor: "#ffffff",
    // borderWidth:1
  },
  labelOrdSummary:{ fontSize: 15, fontFamily: "SourceSansPro_SemiBold",marginBottom:10 },
  itemContainer:{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8, },
  labelItem:{ fontSize: 14, color: "#5773A2", fontFamily: "SourceSansPro_SemiBoldItalic",  },
  amountContainer:{ flexDirection: "row", alignItems: "center" },
  labelQty:{ fontSize: 14, color: "#5773A2", fontFamily: "SourceSansPro_SemiBoldItalic",  marginRight: 16 },
  labelAmount:{ fontSize: 14, color: "#5773A2", fontFamily: "SourceSansPro_SemiBoldItalic", },
  pendingOrderBox:{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  labelItemName:{ fontSize: 15,color:"#4B5154",fontFamily:"SourceSansPro_SemiBold" },
  labelQuantity:{ fontSize: 15, fontFamily: "SourceSansPro_SemiBold",marginRight: 20,color:"#4B5154" },
  itemPrice:{ fontSize: 15, fontFamily: "SourceSansPro_SemiBold",color:"#4B5154" },
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
  loaderContainer:{height:responsiveHeight(80),alignItems:"center",justifyContent:"center"}
})
