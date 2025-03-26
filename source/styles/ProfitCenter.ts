import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 5,
        flex:1
    },
    BGImage: {
        width: "100%",
        height: responsiveHeight(15),
        marginTop: 8,
        borderRadius: 10, 
        overflow: "hidden", 
    },
    profitCenter_btn: {
        height: "100%",
    },
    profitCenterOverlay: {
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    profitCenterName: {
        fontSize: responsiveFontSize(2.8),
        color: "#FFF",
        paddingTop: 8,
        fontFamily: "SourceSansPro_SemiBold",
        width:responsiveWidth(70),
    },
    profitCenterTimings: {
        fontSize: 14,
        color: "#FFF",
        fontFamily: "SourceSansPro_Italic"
    },
    statusBox: {
        position: "absolute",
        top: 13,
        right: 11,
        borderRadius:20,
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center",
        width: responsiveWidth(22),
        height: responsiveHeight(3),
    },
    available: {
        backgroundColor: "#00B253",
    },
    closed: {
        backgroundColor: "#DF2727",
    },
    statusText: {
        fontSize: responsiveFontSize(1.8),
        color: "#FFF",
        textAlign: "center",
        fontFamily:"SourceSansPro_Regular"
    },
    blackShadow:{width:"100%",height:"100%",backgroundColor:"#00000099",position:"absolute"},
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyMealTxt: {
        fontFamily: "SourceSansPro_SemiBoldItalic",
        alignSelf: "center",
        marginTop: responsiveHeight(3),
      },
      emptyMealContainer:{flex:1,justifyContent:"center",alignItems:"center"},
      loaderContainer:{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"#fff"}
});