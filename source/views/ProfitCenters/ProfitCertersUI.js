import * as UI from '@/components/cobalt/importUI';
import { ProfitCentersData } from '@/source/constants/commonData';
import { navigateToScreen } from '@/source/constants/Navigations';
import React from 'react';
import { ImageBackground, Alert } from "react-native";
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';

const pageId = 'ProfitCenter';

const RenderingProfitCenter = ({ item },props) => {
    const isAvailable = item.Status === "Available";

    const navigationMap = {
        'Panache': 'Panache',
        'Living Room': 'MenuOrder',
    };

    const onItemPress = () => { 
        const destination = navigationMap[item.LocationName];
        if (destination) {
            navigation.navigate(destination);
        } else {
            Alert.alert( `No Screen Found for ${item.LocationName}`);
        }
    };

    return (
        <ImageBackground id="profitCenterBGImage" source={{ uri: item.ImageUrl }} style={styles.profitCenterBGImage}>
            <UI.TouchableOpacity style={styles.profitCenter_btn} activeOpacity={0.6} onPress={() => navigateToScreen(props, "MenuOrder", true,{profileCenterTile:item.LocationName})}>
                <UI.Box style={styles.profitCenterOverlay}>
                    <UI.Text id='profitCenterName' style={styles.profitCenterName}>{item.LocationName}</UI.Text>
                    <UI.Text id="profitCenterTimings" style={styles.profitCenterTimings}>
                        {
                            isAvailable ? `Closes at ${item.ClosingTime}` : `Available at ${item.OpeningTime}`
                        }
                    </UI.Text>
                </UI.Box>
                <UI.Box id="status" style={[styles.statusBox, isAvailable ? styles.available : styles.closed]}>
                    <UI.Text style={styles.statusText}>{item.Status}</UI.Text>
                </UI.Box>
            </UI.TouchableOpacity>
        </ImageBackground>
    );
};

const ProfitCenters = (props) => {
    return (
        <UI.ScrollView contentContainerStyle={styles.scrollContent}>
            <UI.CbFlatList
                flatlistData={ProfitCentersData.ProfitCenters}
                children={(item) => RenderingProfitCenter(item,props)}
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
        borderRadius: 10,
        paddingTop: 1,
        paddingBottom: 3,
        justifyContent: "center",
        alignItems: "center",
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
        fontWeight: "500",
        textAlign: "center",
        width: responsiveWidth(20),
        height: responsiveHeight(2.5),
        fontFamily:"SourceSansPro_Regular"
    },
});
