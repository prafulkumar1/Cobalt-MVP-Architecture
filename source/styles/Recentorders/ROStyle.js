import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { horizontalScale, moderateScale, verticalScale } from '@/source/constants/Matrices';
export const styles = StyleSheet.create({
  mainContainer:{ backgroundColor: "#fff",flex:1 },
  subContainer:{ flexDirection: "row", marginVertical: 11, marginLeft: 8,height:responsiveHeight(5),alignItems:"center"},
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
    width:responsiveWidth(30),
    height:responsiveHeight(3),
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
    width:responsiveWidth(30),
    height:responsiveHeight(3),
    marginHorizontal:3
  },
  ActiveButtonTextStyle: { 
    color: "#FFFFFF", 
    fontFamily: "SourceSansPro_SemiBold", 
    fontSize: 16, 
    textAlign:"center"
  },

  pendingOrderAccordion:{
    paddingHorizontal: horizontalScale(10),
        width: "100%", 
        maxHeight: "100%",
        borderRadius: moderateScale(8),
        backgroundColor: "#ffffff",
        shadowColor: "#00000029",
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
        padding: moderateScale(10),
        alignSelf: "center"
  },
  accordionHeaderBox:{
    flexDirection: "row", alignItems: "center", paddingVertical:20,justifyContent:"space-between"
  },
  pendingOrderImg:{ width: 28, height: 28, left: 6 },
  orderStaticStatusTxt:{fontSize: 18, fontStyle: "italic", fontFamily: "SourceSansPro_Bold", fontWeight: "700", marginLeft: 10, left: 10 },
  orderStatusTxt:{ marginLeft: "auto", color: "#FF6F00", fontSize: 16, fontFamily: "SourceSansPro_Bold", fontWeight: "700", right: 20 },
  accordionRriggerBox:{flexDirection: "row", justifyContent: "space-between", alignItems: "center",},
  pickUpTimeAndLocation:{ fontSize: 16, fontFamily: "SourceSansPro_Bold", color: "#2A4E7D" },
  orderIdAndDateStaticTxt:{ fontSize: 14, color: "#4F4F4F", fontFamily: "SourceSansPro_BoldItalic" },
  pickUpTimeAndLocationStaticTxt:{ fontSize: 11, color: "#4F4F4F", fontFamily: "SourceSansPro_Bold", },
  accordionContentBox:{ padding: 12, backgroundColor: "#fff" },
  orderSummaryStaticTxt:{ fontSize: 14, fontFamily: "SourceSansPro_Bold", right: 18, bottom: 10 },
  accordionContentBox2:{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8, },
  timeQtyAmtStaticTxt:{ fontSize: 12, color: "#5773A2", fontFamily: "SourceSansPro_Bold", fontStyle: "italic", },
  itemName:{ fontSize: 12, fontStyle: "italic", fontWeight: "700", right: 18 },
  qtnAnd$:{ fontSize: 12, fontFamily: "SourceSansPro_Bold", fontStyle: "italic" },
  itemModifierName:{ fontSize: 11, color: "#5773A2", fontFamily: "SourceSansPro_Bold", fontStyle: "italic" },
  itemCommentsImg:{ width: horizontalScale(15), height: verticalScale(15), marginRight: 5, top: 1 },
  itemCommentsTxt: {
    fontSize: 12,
    fontFamily: "SourceSansPro_Bold",
    fontStyle: "italic",
    flexShrink: 1,
    flexWrap: "wrap",
    maxWidth: "90%"
  },
  finalAccordionBoxes:{ borderTopWidth: 1, borderTopColor: "#eee", marginTop: 12, paddingTop: 12, alignSelf: "flex-end", alignItems: "flex-end", },
  Item_Image: { height: responsiveHeight(9),width:responsiveWidth(24), borderRadius: 6,resizeMode:"cover" },
  Favorite_Image: { height: 22, width: 20 },
  AddButton: {   width:30, height: 30,left:40,top:12},
  loadingContainer:{ height: responsiveHeight(70), justifyContent: "center", alignItems: "center" },
  favMainContainer:{ paddingHorizontal: 8, height: '100%', paddingBottom: responsiveHeight(20) },
  favItem:{ flexDirection: 'row', justifyContent: 'space-between', gap: 3, paddingVertical: 15, borderBottomWidth: 0.2, borderBlockColor: "#00000026" },
  itemImg:{ width:responsiveWidth(25)},
  labelContainer:{ paddingHorizontal: 5,width:responsiveWidth(40)},
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
    // flexDirection: 'row',
    alignItems:'flex-end',
    width:responsiveWidth(35),
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
  }
})
