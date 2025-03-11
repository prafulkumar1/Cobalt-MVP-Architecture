import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

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
  }
})
