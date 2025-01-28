import * as UI from '@/components/cobalt/importUI';
import { ProfitCentersData } from '@/source/constants/commonData';
import React from 'react';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const pageId='ProfitCenter';

const RenderingProfitCenter = ({ item }) => {
    const isAvailable = item.Status === "Available";
    return (
        <UI.ImageBackground id="profitCenterBGImage" source={{ uri: item.ImageUrl }} style={styles.profitCenterBGImage}>

            <UI.TouchableOpacity style={styles.profitCenter_btn} activeOpacity={0.6}>
                <UI.Box style={styles.profitCenterOverlay}>
                    <UI.Text id='profitCenterName' style={styles.profitCenterName}>{item.LocationName}</UI.Text>
                    <UI.Text id="profitCenterTimings" style={styles.profitCenterTimings}>
                        {item.OpeningTime}-{item.ClosingTime}
                    </UI.Text>
                </UI.Box>
                <UI.Box id="status" style={[styles.statusBox,{backgroundColor:isAvailable?"#00B253":"#DF2727"}]}>
                    <UI.Text style={styles.statusText}>{item.Status}</UI.Text>
                </UI.Box>
            </UI.TouchableOpacity>
        </UI.ImageBackground>

    );
};

const ProfitCenters = () => {
    return (
        <UI.ScrollView contentContainerStyle={styles.scrollContent}>
            <UI.CbFlatList
                flatlistData={ProfitCentersData.ProfitCenters}
                children={RenderingProfitCenter}
                scrollEnabled={false}
            />
        </UI.ScrollView>
    );
};

export default ProfitCenters;

const styles = UI.StyleSheet.create({
    scrollContent: {
        paddingHorizontal: 5,
    },
    profitCenterBGImage: {
        width: "100%",
        height: 115,
        marginTop: 8,
        borderRadius: 6, 
        overflow: "hidden", 
    },
    profitCenter_btn: {
        height: "100%",
    },
    profitCenterOverlay: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    profitCenterName: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFF",
        paddingTop: 8,
    },
    profitCenterTimings: {
        fontSize: 14,
        color: "#FFF",
        fontStyle: "italic",
    },
    statusBox: {
        position: "absolute",
        top: 13,
        right: 11,
        borderRadius: 10,
        paddingTop: 1,
        paddingBottom:3,
        justifyContent: "center",
        alignItems: "center",
    },
    statusText: {
        fontSize: 12,
        color: "#FFF",
        fontWeight: "500",
        textAlign: "center",
        width:responsiveWidth(20),
        height:responsiveHeight(2.5)
    },
});

