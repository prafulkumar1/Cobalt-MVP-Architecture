import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 5,
    },
    profitCenterBGImage: {
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
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFF",
        paddingTop: 8,
        fontFamily: "SourceSansPro_SemiBold"
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
        justifyContent: "center",
        alignItems: "center",
        alignSelf:"center"
    },
    available: {
        backgroundColor: "#00B253",
    },
    closed: {
        backgroundColor: "#DF2727",
    },
    statusText: {
        fontSize: 12,
        color: "#FFF",
        textAlign: "center",
        width: responsiveWidth(20),
        height: responsiveHeight(2.5),
        fontFamily:"SourceSansPro_Regular"
    },
    blackShadow:{width:"100%",height:"100%",backgroundColor:"#00000099",position:"absolute"}
});