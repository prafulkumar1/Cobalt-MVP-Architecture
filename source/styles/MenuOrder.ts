import { Dimensions, StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { horizontalScale, isPlatformAndroid } from "../constants/Matrices";
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  mainHeaderContainer: { display: "flex", flexDirection: "row" },
  recentOrderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 4,
    borderBottom: 1,
    backgroundColor: "#fff",
    height: 40,
    alignItems: "center",
  },
  mealTypeContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  mainContainer: { flex: 1, backgroundColor: "#ECECEC" },
  scrollContent: {
    paddingTop: responsiveHeight(0.2),
    paddingBottom: isPlatformAndroid() && responsiveHeight(10),
  },
  categoryText: {
    fontSize: 18,
    color: "#4B5154",
    fontFamily: "SourceSansPro_Bold",
  },
  mealTypeLabel: {
    fontSize: 18,
    fontFamily: "SourceSansPro_Bold",
  },
  bottomStyle: {
    width: "100%",
    borderRadius: 4,
    borderWidth: 3,
    borderColor: "#00c6ff",
    marginTop: 5,
    position: "absolute",
    bottom: -15,
    zIndex:1
  },
  categoryBtn: {
    marginRight: responsiveWidth(6),
    zIndex:-1
  },
  activeMenuType: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: responsiveWidth(30),
    marginHorizontal: 5,
    paddingVertical: responsiveHeight(0.5),
  },
  inactiveMenuType: {
    backgroundColor: "#ECECEC",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: responsiveWidth(30),
    borderRadius: 5,
    opacity: 0.8,
    marginHorizontal: 5,
    paddingVertical: responsiveHeight(0.5),
  },
  timeDurationTxt: {
    fontSize: 10,
    marginTop: -5,
    fontFamily: "SourceSansPro_SemiBoldItalic",
  },
  topContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 1,
    backgroundColor: "#fff",
    marginBottom: 4,
    paddingHorizontal: 10,
  },
  categoryListContainer: {
    height: isPlatformAndroid() ? responsiveHeight(5) : width * 0.105,
    paddingTop: responsiveHeight(1.2),
    paddingHorizontal: responsiveWidth(2),
    borderBottomWidth:1.5,
    borderColor:"#F4F6FB",
    marginBottom:responsiveHeight(1)
  },
  subCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 10,
  },
  forwardIcon: { marginLeft: 10 },
  backWardIcon: { marginRight: 10 },
  emptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: responsiveHeight(10),
  },
  emptyMealTxt: {
    fontFamily: "SourceSansPro_SemiBoldItalic",
    alignSelf: "center",
    marginTop: responsiveHeight(3),
  },
  categoryItem: { textAlign: "center", width: "100%" },
  mainBoxContainer: { backgroundColor: "#fff" },
  recentOrderTxt: {
    fontSize: 18,
    fontFamily: "SourceSansPro_SemiBold",
    lineHeight: 20,
    marginLeft: 8,
  },
  rightIconBtn: { right: 20 },
  recentOrderBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  recentOrderImage: {
    width: responsiveWidth(30),
    height: responsiveHeight(9),
    borderRadius: 5,
    resizeMode: "cover",
  },
  recentOrderName: {
    fontSize: 12,
    color: "#4B5154",
    width: 85,
    fontFamily: "SourceSansPro_Regular",
  },
  seeAllRecentOrders: {
    fontSize: 16,
    color: "#26BAE2",
    width: "100%",
    textAlign: "center",
    paddingVertical: 11,
    fontFamily: "SourceSansPro_SemiBoldItalic",
  },
  recentContainer: {
    paddingLeft: 8,
    backgroundColor: "#FFFFFF",
    paddingTop: 10,
  },
  recentMainList: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  addItemToCartBtn: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#5773A2",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  recentOrderIcon: { width: 20, height: 20, resizeMode: "contain" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    width: "94%",
    marginVertical: responsiveHeight(1),
    backgroundColor: "#fff",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  mealTypeTitle: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily: "SourceSansPro_SemiBold",
    width: responsiveWidth(55),
    color: "#4B5154",
  },
  priceTxt: {
    fontSize: 18,
    lineHeight: 20,
    marginVertical: 1.5,
    fontFamily: "SourceSansPro_SemiBold",
    color: "#4B5154",
  },
  descriptionTxt: {
    fontSize: 12,
    lineHeight: 16,
    color: "#6D6D6D",
    fontFamily: "SourceSansPro_SemiBold",
    width: responsiveWidth(40),
  },
  underLineTxt: {
    color: "#00C6FF",
    fontSize: 12,
    fontFamily: "SourceSansPro_SemiBoldItalic",
  },
  mealTypeImg: {
    width: responsiveWidth(30),
    height: responsiveHeight(9.5),
    borderRadius: 5,
    resizeMode: "cover",
  },
  horizontalLine: {
    width: responsiveWidth(95),
    marginTop: responsiveHeight(2),
    opacity:0.6
  },
  itemCategoryLabel: {
    color: "#5773a2",
    fontSize: responsiveFontSize(2.5),
    fontFamily: "SourceSansPro_SemiBold",
    paddingVertical: 8,
  },
  cardMainContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: responsiveHeight(1.5),
    marginTop: 10,
  },
  bottomMiddleContainer: {
    marginTop: 10,
    marginHorizontal: responsiveWidth(2),
    backgroundColor: "#F4F6FB",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 22,
    height: 22,
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
  blackShadow: {
    flex: 1,
    position: "absolute",
    backgroundColor: "#000000",
    opacity: 0.4,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 10,
    zIndex: -1,
  },
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
  addToCartBtn: {
    backgroundColor: "#5773a2",
    width:responsiveWidth(40),
    height:responsiveHeight(5),
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  recentBtn: {
    backgroundColor: "#5773a2",
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
  dropdownIcon:{width:25,height:25},
  modalBackground:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  mainItemContainer:{backgroundColor:"#fff"},
  modalContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
},
innerModalAlertTxt:{ fontSize: 22, color: "#4B5154",fontFamily:"SourceSansPro_SemiBold", textAlign: 'center', lineHeight: 30,width:responsiveWidth(80),marginTop:responsiveHeight(3) },
innerModalMsgContainer:{ width: "100%", justifyContent: 'space-between', alignItems: 'center',},
innerModal:{
    width: '100%',
    backgroundColor: "#fff",
    height: responsiveHeight(35),
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 20,
    justifyContent: 'space-between',
},
confirmMdl:{
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
},
diningIcon:{width:responsiveWidth(25),height:responsiveHeight(8),resizeMode:"contain",marginTop:responsiveHeight(6)},
discardBtn:{ flexDirection: 'row', justifyContent: "space-between",width:"85%",marginTop:responsiveHeight(6) },
modalNoYesBtnTxt: { color: "#5773A2", fontSize: 21,fontFamily:"SourceSansPro_SemiBold" },
modalNoYesBtn: {
  padding: 10,
  backgroundColor: "#fff",
  alignItems: 'center',
  borderWidth: 1,
  borderColor: "#5773A2",
  borderRadius: 32,
  width: responsiveWidth(37)
},
closeIcon:{ width: 20, height: 20 },
mainContainerList:{paddingBottom:responsiveHeight(80)}
});