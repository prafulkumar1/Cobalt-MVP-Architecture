import { horizontalScale, isPlatformAndroid, isPlatformIos } from "@/source/constants/Matrices";
import { StyleSheet } from "react-native";
import { responsiveWidth,responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
  subContainer: {
    width: "94%",
    marginVertical:responsiveHeight(1)
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
    width:responsiveWidth(40),
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
    right: -22,
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
    fontSize: 22,
    fontFamily:"SourceSansPro_Regular",
    paddingLeft: responsiveWidth(1.2),
    paddingRight: responsiveWidth(0.8),
    paddingTop:4
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
  horizontalLine:{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: '#9F9F9F', borderStyle: 'dotted',opacity:0.4 , marginTop:responsiveHeight(2)},
  floatingContainer:{ position: "absolute", bottom: responsiveHeight(8), right: responsiveWidth(5) },
  floatingBtn:{
    width: 72,
    height: 72,
    backgroundColor: "#FF6F00",
    borderRadius: 11,
  },
  cartCountTxt:{
    position: "absolute",
    bottom: 40,
    color: "#FFFFFF",
    fontSize: isPlatformIos()?responsiveFontSize(2.6):responsiveFontSize(2.6),
    overflow: "hidden",
    fontFamily:"SourceSansPro_SemiBold",
    height:responsiveHeight(3),
    paddingTop:5
  },
  backArrowHeader:{width:responsiveWidth(9),justifyContent:"center",alignItems:"center",paddingVertical:5,position:"relative",left:-10},
  BackIcon:{width:12,height:24},
  cartIcon:{
    width:35,
    height:35,
    resizeMode:"contain",
    margin:5,    
    position: "absolute",
    bottom: 8,
    left: 8,
  },
  mediumBtn:{
    paddingVertical: isPlatformAndroid()?6:8,
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
    justifyContent: 'center', 
    alignItems: 'center', 
    height:"100%",
    width:"100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor:"pink",
    flexGrow:1

  },
  modalContent: {
    width: '100%', 
    height: '100%',
    borderRadius: 35, 
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor:"green",
    marginTop:30
  
  },
  itemDetailsContainer:{ paddingTop: 6, backgroundColor: "white" },
  itemDetailsSubContainer:{
    borderWidth: 0.3,
    borderRadius: 5,
    borderColor: "#ccc",
    backgroundColor: "white",
  },
  subHeader:{
    backgroundColor: "#F3F3F3",
    borderRadius: 5,
    padding: 0,
    justifyContent: "center",
  },
  topItem:{
    display: "flex",
    flexDirection: "row",
    gap: 5,
  },
  blackShadow:{
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
    zIndex:-1
  },
  modiferItems:{flex:1},
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
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 20,
},
addToCartBtn:{
  backgroundColor: "#5773a2",
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center'
},
totalAmountTxt:{ fontSize: 12, color: "#4B5154", fontFamily:"SourceSansPro_Italic" },
orderAmount:{ fontSize: 24, color: "#4B5154", paddingVertical: 8,fontFamily:"SourceSansPro_SemiBold" },
addCartTxt:{ color: "#fff", fontSize: 22,fontFamily:"SourceSansPro_SemiBold", textAlign: 'center' },
CheckIcon:{color:"#ffff"},
  roAccordion:{width:"96%",marginHorizontal:8,marginVertical:5},
  roAccordionHeader:{backgroundColor:"#F3F3F3"},
  roAccordionHeading:{ display: "flex", flexDirection: "row", gap: 5 },
  roAccordionTitleText:{fontSize:16,fontFamily:"Source Sans Pro",fontWeight:"700",fontStyle:"italic"},
  roAccordionIcon:{width:20,height:20,right:12},
  roAccordionContentouterbox:{ display: "flex", flexDirection: "row", alignItems: "center",marginVertical:10 },
  roAccordionContentItembox:{ display: "flex",  alignItems: "left" },
  roItemName:{fontSize:16,fontFamily:"SourceSansPro_Bold"},
  roItemprice:{fontSize:16,fontFamily:"SourceSansPro_Bold",marginLeft:4},
  roImagescetion:{ display: "flex",flexDirection: "row",alignItems: "center",marginLeft: "auto", right :10},
  roItemImage:{  marginRight: 10 },
  roItemButton:{ width: 27 ,height:29},
  roReoderButton:{ top : 5, alignSelf:"center", width:116, borderRadius: 19,height: 38, backgroundColor: "#fff",borderColor:"#2A4E7D", justifyContent: "center", alignItems: "center",borderWidth:1.5, },
  roReordertext:{ fontFamily: "SourceSansPro_Bold", fontSize: 16, fontWeight: "bold", textAlign: "center", flexShrink: 1,color:"#2A4E7D"},
  selectedContainer:{
    minHeight:responsiveHeight(30),
    maxHeight: responsiveHeight(45),
    backgroundColor: "white",
    borderRadius: 10,
  },
  selectedLabel:{
    marginVertical: 10,
    fontFamily: "SourceSansPro_Italic",
    color:"#4B5154"
  },
  dropdownContainer:{ 
    minHeight:responsiveHeight(30),
    maxHeight: responsiveHeight(45), 
  },
  selectedContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  pickerWrapper: {
    height: 250, 
    overflow: "hidden",
  },
  pickerItemWrapper: {
    height: 50, 
    justifyContent: "center",
    alignItems: "center",
  },
  selectedItemWrapper: {
    borderRadius: 5,
  },
  scrollIndicator: {
    fontSize: 16,
    color: "#333",
  },
  selectedItem: {
    fontWeight: "bold",
    color: "#007bff",
  },
  unselectedItem: {
    color: "#888",
  },
  amPm: {
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
  doneBtn: {
    marginTop: 20,
    marginBottom:30,
    paddingHorizontal: 52,
    paddingVertical:6,
    backgroundColor: "#5773A2",
    borderRadius: 25,
  },
  doneTxtBtn: {
    fontSize:21,
    fontFamily: "SourceSansPro_SemiBold",
    color: "#fff",
    textAlign: "center",
 
  },
  pickerWrapper: {
    height: 250,
    overflow: "hidden",
    width:"50%"
  },
  item: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",

  },
  selectedText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "SourceSansPro_SemiBold",
  },
  recentOrderContainer:{
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  modifierContainer:{
    color: "#4B5154",
    fontSize: 14,
    fontFamily:"SourceSansPro_SemiBold",
    alignSelf:"center",
  },
  requireText:{ color: "red",fontFamily:"SourceSansPro_SemiBold",fontSize: 12, },
  maxAllowedTxt:{ color: "#3B87C1", fontSize: 13 ,fontFamily:"SourceSansPro_SemiBold"},
  requiredTxt:{     
    color: "#4B5154",
    fontSize: 14,
    fontFamily:"SourceSansPro_SemiBold",
  },
  orderSubContainer:{
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
  },
  itemNameTxt:{
    color: "#4B5154",
    fontSize: 14,
   fontFamily:"SourceSansPro_SemiBoldItalic"
  },
  priceMainTxt:{
    marginLeft: "auto",
    color: "#4B5154",
    fontSize: 14,
     fontFamily:"SourceSansPro_SemiBold"
  },
  searchBarMainContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "95%",
    height: "100%",
    marginRight: 25
  },
  inputBox:{
    flex: 1,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: "#f0f0f0"
  },
  selectedLabelItem:{fontSize:responsiveFontSize(2.5),fontFamily: "SourceSansPro_SemiBold",color:"#4B5154"},
  crossIcon:{
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top:isPlatformAndroid()?horizontalScale(60):horizontalScale(40),
    alignSelf: "center",
    opacity: 1,
    zIndex: 1000,
  },
  emptyListContainer:{
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
    height:responsiveHeight(10)
  },
  emptyMealTxt:{
    fontFamily:"SourceSansPro_SemiBoldItalic",
    alignSelf:"center",
    marginTop:responsiveHeight(3)
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:"center",
    alignSelf:"center",
    shadowColor: '#000',
    width:responsiveWidth(85),
    height:responsiveHeight(7),
    marginBottom:responsiveHeight(10),
    borderColor:"#3B87C1",
    borderWidth:2
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily:"SourceSansPro_SemiBold"
  },
  modalText: {
    textAlign: 'left',
    fontFamily:"SourceSansPro_SemiBold",
    padding:10,
    lineHeight:15
  },
  blackShadow:{width:"100%",height:"100%",backgroundColor:"#00000099",position:"absolute",opacity:0.6},
  collapseIcon:{},
  quantityMessage:{flexDirection:"row",justifyContent:"center",alignItems:"center"},
  searchTxt:{fontFamily:"SourceSansPro_Regular",color:"#8A8A8A",marginLeft:12,fontSize:responsiveFontSize(1.8)},
  searchBtn:{position:"absolute",left:20,flexDirection:"row",alignItems:"center"}
})