import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { horizontalScale, isPlatformAndroid, isPlatformIos } from "../constants/Matrices";

export const styles = StyleSheet.create({
  topContainer: { flex: 1, backgroundColor: "#fff" },
  scrollContent: {
    padding: 20,
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemTitle: {
    fontSize: 16,
    color: "#4B5154",
    lineHeight: 20,
    fontFamily: "SourceSansPro_SemiBold",
    paddingBottom: 5
  },
  itemCategory: {
    color: "#3B87C1",
    fontSize: 10,
    lineHeight: 16,
    width: responsiveWidth(35),
    fontFamily: "SourceSansPro_Italic"
  },
  itemNotes: {
    color: "#6D6D6D",
    fontSize: 12,
    paddingLeft: 8,
    fontFamily: "SourceSansPro_SemiBoldItalic",
    top: -4,
    width: responsiveWidth(80),
  },
  itemPrice: {
    fontSize: 16,
    color: "#4B5154",
    lineHeight: 20,
    paddingRight: 10,
    fontFamily: "SourceSansPro_SemiBold"
  },
  rightContainer: { flexDirection: "row", alignItems: "center" },
  cardContainer: {
    padding: responsiveWidth(3),
    borderRadius: 10,
    marginTop: responsiveHeight(0.2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: "#fff",
    margin: 4,
  },
  notesContainer: { flexDirection: "row", justifyContent: "flex-start", paddingTop: 5 },
  swipeActionContainer: {
    backgroundColor: "#FF0000",
    width: 90,
    height: responsiveHeight(6.5),
    marginLeft: responsiveWidth(2),
    marginTop: responsiveHeight(1),
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  removeBtb: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "SourceSansPro_SemiBold"
  },
  emptyCartTxt: { fontSize: 18, padding: 10, fontFamily: "SourceSansPro_BoldItalic" },
  orderInstContainer: { borderWidth: 1, borderColor: "#C4C4C4", justifyContent: "flex-start", flexDirection: "row", alignItems: "center", width: 180,borderRadius: 4, paddingHorizontal: 10 },
  notesIcon: { width: 12, height: 18 },
  noteIcon2: { width: 12, height: 18 ,alignSelf:"flex-start",marginTop:6},
  orderInstTxt: { fontSize: 13, color: "#4B5154", paddingLeft: 10, fontFamily: "SourceSansPro_SemiBoldItalic",marginTop:isPlatformAndroid()?0:2 },
  mainSubContainer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20 },
  priceLabel: { textAlign: "right", color: "#4B5154", fontSize: 12, fontFamily: "SourceSansPro_SemiBold" },
  tipContainer: { justifyContent: "center", alignItems: "center", padding: 10 },
  tipTxt: {
    color: "#4B5154",
    fontSize: 14,
    fontFamily: "SourceSansPro_SemiBold"
  },
  tipMainContainer: {
    width: isPlatformIos()?80:83,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    alignSelf: "center"
  },
  customTipItem: {
    width: 90,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "#00BFF6",
    alignSelf: "center",
    backgroundColor: "#fff"
  },
  tipCount: { fontSize: 14, fontFamily: "SourceSansPro_SemiBold" },
  cartItemContainer: {},
  addToCartBtn: { padding: responsiveWidth(2) },
  cartEmptyContainer: { alignSelf: "center" },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: responsiveHeight(1),
  },
  priceSubContainer: { alignSelf: "flex-end" },
  totalPriceContainer: {
    alignSelf: "flex-end",
    justifyContent: "flex-end",
    width: responsiveWidth(25),
  },
  pickUpContainer: { 
    flexDirection: "row",
    alignItems: "center", 
    justifyContent: "space-around", 
    backgroundColor: "#EFEFEF", 
    padding: 10, 
  },
  pickUpTimeTxt: { textAlign: "center", fontSize: 12, fontFamily: "SourceSansPro_BoldItalic" },
  timeBtn: { borderRadius: 5, backgroundColor: "#fff", justifyContent: "center", alignItems: "center", width: 165, height: 36, marginTop: 5, },
  timeTxt: { color: "#4B5154", fontSize: 18, fontFamily: "SourceSansPro_BoldItalic" },
  pickUpPointTxt: { textAlign: "center", fontSize: 12, fontFamily: "SourceSansPro_BoldItalic" },
  plcOrdBtn: { width: 250, height: 45, paddingHorizontal: 25, flexDirection: "row", backgroundColor: "#5773A2", justifyContent: "space-between", alignItems: "center", alignSelf: "center", borderRadius: 23, margin: 20, zIndex: 0 },
  plcMainContainer: { paddingRight: 10 },
  totalAmtTxt: { color: "#ffffff", fontSize: 12, fontFamily: "SourceSansPro_SemiBoldItalic" },
  totalPrcTxt: { fontSize: 16, color: "#FFFFFF", top: -4, fontFamily: "SourceSansPro_Bold", textAlign: "center" },
  verticalLn: { height: 30, borderWidth: 0.7, borderColor: "#93A5C4" },
  plcOrderTxtContainer: { width: "70%" },
  plcOrderTxt: {
    color: "#FFFFFF", fontSize: 20, textAlign: "center", fontFamily: "SourceSansPro_Bold"
  },
  splitPriceContainer: { marginTop: 2, flexDirection: "row", width: responsiveWidth(55), justifyContent: "space-between", alignItems: "center" },
  priceLabelContainer: { alignSelf: "flex-end", width: responsiveWidth(30) },
  valueMainContainer: { flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end", },
  noteIcon: { width: 15, height: 15, resizeMode: "contain", },
  customBtn: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: responsiveWidth(30),
    marginVertical: 4
  },
  bottomBtn: {
    position: 'absolute',
    bottom: isPlatformIos() ? responsiveHeight(-13) : responsiveHeight(0),
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    zIndex: 1,
    backgroundColor: '#fff',
    paddingVertical:10,
    paddingBottom:isPlatformIos()?responsiveHeight(4):0
  },
  btnTextStyle: { color: "#4B5154", fontSize: 16, textAlign: "center", fontFamily: "SourceSansPro_SemiBold" },
  operationBtn: {
    borderColor: '#5773a2',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: { width: responsiveWidth(7.9), height: responsiveHeight(5), justifyContent: "center", alignItems: 'center', alignSelf: "center" },
  quantityTxt: {
    fontSize: responsiveFontSize(2.5),
    fontFamily: "SourceSansPro_Regular",
    paddingLeft: responsiveWidth(1.2),
    paddingRight: responsiveWidth(0.8),
    paddingTop: isPlatformIos() ? 2 : 4
  },
  trashIcon: { width: 23, height: 23 },
  addIcon: { width: 25, height: 25 },
  commentBtn: { flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start" },
  inputBox: { fontFamily: "SourceSansPro_SemiBold", textAlign: "center" },
  enteredTxt: {
    color: "#4D4F50",
    fontFamily: "SourceSansPro_SemiBold",
    fontSize:16
  },
  loadingContainer: { alignSelf: "center", width: "100%" },
  modalContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  confirmMdl: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  modalNoYesBtnTxt: { color: "#5773A2", fontSize: 21, fontFamily: "SourceSansPro_SemiBold" },
  innerModalAlertTxt: { fontSize: 24, color: "#4B5154", fontFamily: "SourceSansPro_SemiBoldItalic", textAlign: 'center', width: isPlatformIos()?responsiveWidth(100):responsiveWidth(60), marginTop: responsiveHeight(3), lineHeight: 30 },
  timeAlertMsg: { fontSize: 22, color: "#4B5154", fontFamily: "SourceSansPro_SemiBoldItalic", textAlign: 'center', paddingTop: 10 },
  pickDetails: { fontSize: 22, color: "#4B5154", fontFamily: "SourceSansPro_SemiBoldItalic", textAlign: 'center', marginTop: responsiveHeight(4), },
  innerModalMsgContainer: { width: "100%", justifyContent: 'space-between', alignItems: 'center', },
  innerModal: {
    width: '100%',
    backgroundColor: "#fff",
    height: isPlatformIos()?responsiveHeight(68):responsiveHeight(70),
    padding: 20,
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 10,
  },
  diningIcon: { width: responsiveWidth(25), height: responsiveHeight(8), resizeMode: "contain"},
  discardBtn: { flexDirection: 'row', justifyContent: "space-between", width: "85%", marginTop: responsiveHeight(6) },
  modalNoYesBtn: {
    padding: 10,
    backgroundColor: "#fff",
    alignItems: 'center',
    borderWidth: 1,
    borderColor: "#5773A2",
    borderRadius: 32,
    width: responsiveWidth(37)
  },
  closeIcon: { height: 30, width: 30 },
  closeMainContainer: { position: "absolute", right: 10, top: 10, cursor: "pointer" },
  thankMsg:{
    fontSize:responsiveFontSize(4),
    color:"#5773A2",
    fontFamily: "SourceSansPro_Bold",
    marginTop:responsiveHeight(4),
    lineHeight:35,
  },
  tipBox:{backgroundColor:"#F3F3F3",borderRadius:10,marginBottom:5,margin:10},
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
  closeIcon2:{ width: 20, height: 20 },
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
  dividerLine:{ width: "60%", marginVertical: responsiveHeight(2) }
}); 