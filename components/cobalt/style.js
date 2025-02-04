import { Platform, StyleSheet } from "react-native";
import { responsiveWidth,responsiveHeight } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
  subContainer: {
    marginBottom: 25,
    width: "95%",
  },
  mealTypeTitle: {
    fontSize: 20,
    lineHeight: 20,
    fontFamily:"SourceSansPro_SemiBold",
    width:responsiveWidth(45),
    color:"#4B5154"
  },
  priceTxt: {
    fontSize: 18,
    lineHeight: 20,
    marginVertical: 1.5,
    fontFamily:"SourceSansPro_SemiBold",
    color:"#4B5154"
  },
  descriptionTxt: {
    fontSize: 12,
    lineHeight: 16,
    color: '#6D6D6D',
    fontFamily:"SourceSansPro_SemiBold",
    width:responsiveWidth(40)
  },
  underLineTxt: {
    color: '#00C6FF',
    fontSize: 12,
    fontFamily:"SourceSansPro_SemiBoldItalic"
  },
  mealTypeImg: {
    width: responsiveWidth(30),
    height: responsiveHeight(9.5),
    borderRadius: 5,
    resizeMode: "cover",
  },
  addItemToCartBtn: {
    padding: responsiveWidth(2),
    position: 'absolute',
    right: -22,
  },
  operationBtn: {
    position: 'absolute',
    right: -18,
    borderColor: '#5773a2',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  operationBtn2: {
    borderColor: '#5773a2',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: { flex: 1, paddingRight: 20, minWidth: "30%", maxWidth: "60%" },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
  },
  quantityTxt: {
    fontSize: Platform.OS == "ios"?20:18,
    fontFamily:"SourceSansPro_Regular",
    paddingLeft: responsiveWidth(1.2),
    paddingRight: responsiveWidth(0.8)
  },
  container: {
    flex: 1,
    padding: 20,
  },
  iconBtn: { width: responsiveWidth(7.9),height:responsiveHeight(5),justifyContent:"center",alignItems:'center' },
  mainContainer: { paddingTop: responsiveHeight(5), backgroundColor: "#fff" },
  scrollContent: {
    backgroundColor: "#fff",
    paddingHorizontal: responsiveWidth(2)
  },
  categoryText: {
    padding: 2,
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B5154",
  },
  mealTypeTxt: {
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryBottomContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  subCategoryContainer: {
    width: "100%",
    marginTop: 10
  },
  bottomStyle: {
    width: "100%",
    borderRadius: 4,
    borderWidth: 3,
    borderColor: "#00c6ff",
    marginTop: 5
  },
  categoryBtn: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    cursor: "pointer"
  },
  activeMenuType: {
    backgroundColor: "#00C6FF",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    alignSelf: "center",
    borderRadius: 5,
    width: 115,
    height: 40,
  },
  inactiveMenuType: {
    backgroundColor: "#ECECEC",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 115,
    height: 40,
    alignSelf: "center",
    marginHorizontal: 5,
    borderRadius: 5,
    opacity: 0.5
  },
  timeDurationTxt: {
    fontSize: 10,
    fontWeight: "600",
    fontStyle: "italic",
    marginTop: -2
  },
  bottomMainContent:{marginTop:10},
  accordionHeaderTxt:{color:"#5773a2",fontSize:16},
  mainContainerList:{ flexGrow: 1},
  itemCategoryLabel:{ color: "#5773a2", fontSize: 20 ,fontFamily:"SourceSansPro_Bold",paddingVertical:8},
  horizontalLine:{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: '#9F9F9F', borderStyle: 'dotted',marginTop:responsiveHeight(1),opacity:0.4 },
  floatingContainer:{ position: "absolute", bottom: responsiveHeight(8), right: responsiveWidth(1.5) },
  floatingBtn:{
    width: 72,
    height: 72,
    backgroundColor: "#FF6F00",
    borderRadius: 11,
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 20,
    right: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding:5
  },
  cartCountTxt:{
    position: "absolute",
    bottom: 28,
    right: 8,
    color: "#FFFFFF",
    fontSize: 26,
    padding: 4,
    borderRadius: 20,
    overflow: "hidden",
    fontFamily:"SourceSansPro_SemiBold"
  },
  backArrowHeader:{width:responsiveWidth(9),marginRight:10,justifyContent:"center",alignItems:"center"},
  cartIcon:{width:35,height:35,resizeMode:"contain",margin:5},
  mediumBtn:{
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#2A4E7D",
    width: responsiveWidth(30)
  },
  mediumBtnTxt:{ color: "#2A4E7D", fontSize: 16, textAlign: "center",fontFamily: "SourceSansPro_SemiBold"},
  CheckboxIndicator:{
    width: 20,
    height: 20,
    borderWidth: 0.75,
    borderColor: "#4B5154",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff"
  },
  scrollIndicator:{justifyContent:"center",alignSelf:"center",alignItems:"center"},
  doneBtn:{
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#2A4E7D",
    marginVertical:15,
    width: responsiveWidth(35)
  },
  doneTxtBtn:{color: "#FFFFFF", fontSize: 16, fontWeight: "bold", textAlign: "center" },
  hoverItem:{  
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor:"#fff",
    width:"90%",
    elevation: 5,
  },
  menuHeader:{backgroundColor:"#F4F6FB"},
  subItem:{backgroundColor:"#fff",marginTop:8},
  headerTxt:{fontFamily:"SourceSansPro_SemiBold"},
  modalContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.2)' ,
  },
  modalContent: {
    width: '100%', 
    height: '90%',
    position:"absolute",
    bottom:0,right:0,left:0,
    backgroundColor: 'white', 
    borderRadius: 35, 
  
  }
})