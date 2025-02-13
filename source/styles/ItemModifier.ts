import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    iconBtn: {
        marginHorizontal: 10,
    },
    quantityTxt: {
        fontSize: 18,
        color: "#4B5154",
    },
    mainContainer:{ flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 35, borderTopRightRadius: 35},
    itemImage: { width: "100%", height: 230, borderTopLeftRadius: 35, borderTopRightRadius: 35 },
    itemDetailsContainer:{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 0.4, borderStyle: 'dashed',paddingHorizontal:6,},
    foodItemName:{ fontSize: 20, color: "#4B5154", paddingBottom: 3, fontFamily: 'SourceSansPro_SemiBold'  },
    foodItemPrice:{ fontSize: 18, color: "#4B5154",fontFamily: 'SourceSansPro_SemiBold'  },
    foodDiscripContainer:{ paddingVertical: 15, borderBottomWidth: 0.4, borderStyle: 'dashed' },
    foodDiscripTxt:{ fontSize: 12, color: "#6D6D6D",fontFamily:"SourceSansPro_SemiBoldItalic" },
    modifierTxt:{ fontSize: 16, color: "#4B5154", fontFamily:"SourceSansPro_SemiBold"},
    allergyInfoTxt:{ fontSize: 16, color: "#4B5154", fontFamily:"SourceSansPro_Italic", paddingVertical: 10 },
    commentsBox:{height: 100, borderColor: "#00000026",   borderRadius: 5,paddingBottom:10 ,},
    crossbtn: {
        width: 30,
        height: 30,
        borderRadius: 20,
        backgroundColor: "#9B9B9B",
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        top: 15,
        right: 15,
        opacity:0.8
    },
    crossImage: { width: 15, height: 15,},
    modalContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalNoYesBtn: {
        padding: 10,
        backgroundColor: "#fff",
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#5773A2",
        borderRadius: 32,
        width: responsiveWidth(37)
    }, 
    modalNoYesBtnTxt: { color: "#5773A2", fontSize: 21,fontFamily:"SourceSansPro_SemiBold" },
    innerModalAlertTxt:{ fontSize: 24, color: "#4B5154",fontFamily:"SourceSansPro_SemiBold", textAlign: 'center', lineHeight: 30,width:responsiveWidth(50),marginTop:responsiveHeight(3) },
    innerModalMsgContainer:{ width: "100%", justifyContent: 'space-between', alignItems: 'center',},
    innerModal:{
        width: '100%',
        backgroundColor: "#fff",
        height: responsiveHeight(55),
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
        justifyContent: 'space-between',
    },
    confirmMdl:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    rightItemContainer:{ flexDirection: 'row', alignItems: 'center',justifyContent:"space-between"},
    addIconBtn:{ 
        flexDirection: 'row', 
        alignItems: 'center',
        width:responsiveWidth(17), 
        justifyContent:"space-between",
        marginRight:responsiveWidth(5)
    },
    favIconBtn:{width:responsiveWidth(5),height:responsiveHeight(2.5)},
    favIcon:{width:"100%",height:"100%"},
    addBtn:{padding:responsiveWidth(1.2)},
    modifierContainer:{ paddingHorizontal: 7, width: "100%", backgroundColor: "#fff" },
    itemMainContainer:{ flex: 1,borderTopRightRadius:20,borderTopLeftRadius:20,marginTop:responsiveHeight(8)},
    diningIcon:{width:responsiveWidth(25),height:responsiveHeight(8),resizeMode:"contain",marginTop:responsiveHeight(6)},
    discardBtn:{ flexDirection: 'row', justifyContent: "space-between",width:"85%",marginTop:responsiveHeight(6) },
    modifierSubContainer:{ paddingVertical: 15 },
    mainList:{marginBottom: responsiveHeight(18),  }
});