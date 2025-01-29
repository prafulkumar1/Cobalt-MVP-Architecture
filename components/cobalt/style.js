import { StyleSheet } from "react-native";
import { responsiveWidth,responsiveHeight } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
  subContainer: {
    marginBottom: 25,
    width: "95%",
  },
  mealTypeTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "600",
  },
  priceTxt: {
    fontSize: 16,
    lineHeight: 20,
    marginVertical: 1.5,
    fontWeight: "500"
  },
  descriptionTxt: {
    fontSize: 12,
    lineHeight: 16,
    color: '#6D6D6D',
  },
  underLineTxt: {
    color: '#00C6FF',
    fontStyle: "italic",
    fontSize: 12
  },
  mealTypeImg: {
    width: 100,
    height: 70,
    borderRadius: 5,
    resizeMode: "cover",
  },
  addItemToCartBtn: {
    padding: responsiveWidth(2),
    position: 'absolute',
    right: -15,
    top: 15,
  },
  operationBtn: {
    padding: responsiveWidth(2),
    position: 'absolute',
    right: -15,
    top: 15,
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
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
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
    fontSize: 18,
    fontWeight: "300",
    paddingLeft: responsiveWidth(1.2),
    paddingRight: responsiveWidth(0.8)
  },
  container: {
    flex: 1,
    padding: 20,
  },
  iconBtn: { width: responsiveWidth(4) },
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
  itemCategoryLabel:{ color: "#5773a2", fontSize: 16 },
  horizontalLine:{ height: 1, width: '100%', borderRadius: 1, borderWidth: 1, borderColor: '#9F9F9F', borderStyle: 'dotted',marginTop:responsiveHeight(1),opacity:0.4 },
  floatingContainer:{ position: "absolute", bottom: 0, right: 0 },
  floatingBtn:{
    width: 68,
    height: 68,
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
    fontWeight: "bold",
    padding: 4,
    borderRadius: 20,
    overflow: "hidden",
  },
  cartIcon:{ width: 40, height: 40 },
  backArrowHeader:{marginRight:20}
})