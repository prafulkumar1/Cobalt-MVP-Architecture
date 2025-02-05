import { Platform, StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    mainHeaderContainer:{ display: "flex", flexDirection: "row" },
    recentOrderContainer:{ flexDirection: "row", justifyContent: "space-between", marginLeft: 4, borderBottom: 1, backgroundColor: "#fff", height: 40, alignItems: "center", },
    mealTypeContainer:{flexDirection:"row",justifyContent:"center",alignItems:"center"},
    mainContainer:{flex:1,backgroundColor:"#ECECEC"},
    scrollContent: {
      paddingTop:responsiveHeight(0.2),
      paddingBottom:Platform.OS === "android"&& responsiveHeight(10)
    },
    categoryText: {
      padding:2,
      fontSize: 18,
      color: "#4B5154",
      fontFamily:"SourceSansPro_Bold"
    },
    mealTypeLabel: {
      fontSize: 18,
      fontFamily:"SourceSansPro_Bold"
    },
    bottomStyle: {
      width: "100%",
      borderRadius: 4,
      borderWidth: 3,
      borderColor: "#00c6ff",
      marginTop:6,
    },
    categoryBtn: {
      flex: 1,
      cursor: "pointer",
      marginRight:responsiveWidth(6)
    },
    activeMenuType: {
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      width: responsiveWidth(30),
      height: Platform.OS === "android"?responsiveHeight(5):responsiveHeight(5),
      marginHorizontal:5
    },
    inactiveMenuType: {
      backgroundColor: "#ECECEC",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      width: responsiveWidth(30),
      height: Platform.OS === "android"?responsiveHeight(5):responsiveHeight(5.5),
      borderRadius: 5,
      opacity: 0.8,
      marginHorizontal:5
    },
    timeDurationTxt: {
      fontSize: 10,
      marginTop: -5,
      fontFamily:"SourceSansPro_SemiBoldItalic"
    },
    topContainer: {
      flexDirection: "row",
      paddingVertical: 10,
      alignSelf:"center",
      width:"100%",
      justifyContent:"center",
      alignItems:"center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation:1,
      backgroundColor:"#fff",
      marginBottom:4
    },
    categoryListContainer: {
      flexDirection: "row",
      height: Platform.OS === "android" ?responsiveHeight(5):responsiveHeight(5.5),
      paddingTop:responsiveHeight(1.2),
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    subCategoryContainer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      alignSelf: "center",
      paddingHorizontal:10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation:10,
      backgroundColor:"#fff",
    },
    forwardIcon:{marginLeft:10},
    backWardIcon:{marginRight:10},
    emptyListContainer:{
      justifyContent:"center",
      alignItems:"center",
      alignSelf:"center",
      height:responsiveHeight(10)
    },
    emptyMealTxt:{
      fontFamily:"SourceSansPro_SemiBoldItalic"
    },
    mainBoxContainer: { flex: 1, backgroundColor: "#fff", paddingBottom: responsiveHeight(6) },
    recentOrderTxt: { fontSize: 18, fontFamily:"SourceSansPro_SemiBold", lineHeight: 20, marginLeft: 8 },
    rightIconBtn: { right: 20 },
    recentOrderBox: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginLeft: 10 },
    recentOrderImage:{width: 120, height: 60, borderRadius: 10},
    recentOrderName:{fontSize: 12, color: "#4B5154", width: 85,fontFamily:"SourceSansPro_Regular"},
    seeAllRecentOrders:{fontSize: 16, color: "#26BAE2", width: "100%", textAlign: "center",  paddingVertical: 11,fontFamily:"SourceSansPro_SemiBoldItalic"},
  recentContainer:{paddingLeft: 8, backgroundColor: "#FFFFFF",paddingTop:10},
  recentMainList:{ flexDirection: "row", justifyContent: "space-between", paddingTop: 5 },
  addItemToCartBtn:{
    width:20,
    height:20,
    borderWidth:1,
    borderColor:"#5773A2",
    borderRadius:5,
    justifyContent:"center",
    alignItems:"center"
  },
  recentOrderIcon:{width:20,height:20,resizeMode:"contain"},
  addToCartBtn:{ padding: responsiveWidth(0) }
  });