import * as UI from '@/components/cobalt/importUI';
import { ProfitCentersData } from '@/source/constants/commonData';
import { navigateToScreen } from '@/source/constants/Navigations';
import { useProfitCenterLogic } from '@/source/controller/ProfitCenter/ProfitCenter';
import React from 'react';
import { ImageBackground } from "react-native";
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const pageId = 'ProfitCenter';
const ProfitCenters = (props) => {

    let pageConfigJson = global.appConfigJsonArray?.find(
        (item) => item.PageId === pageId
      );
    
      global.controlsConfigJson =
        pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
      const configItems = global.controlsConfigJson?.reduce((acc, item) => {
        if (["backgroundImage", "profitCenterName", "timingsText", "availabilityStatus"].includes(item.id)) {
          acc[item.id] = item;
        }
        return acc;
      }, {});
    
      const {getProfitCenterList,navigateToMenuOrder} = useProfitCenterLogic()

      const { backgroundImage, profitCenterName, timingsText, availabilityStatus } = configItems;
    
    const RenderingProfitCenter = ({ item },props) => {
        const isAvailable = item.Status === "Available";
        return (
            <ImageBackground id="profitCenterBGImage" source={{ uri: backgroundImage?.imageUrl ? backgroundImage?.imageUrl : item.ImageUrl }} style={styles.profitCenterBGImage}>
                <UI.Box style={styles.blackShadow} />
                <UI.TouchableOpacity style={styles.profitCenter_btn} activeOpacity={0.6} onPress={() => navigateToMenuOrder(props,item)}>
                    <UI.Box style={styles.profitCenterOverlay}>
                        <UI.Text id='profitCenterName' style={[profitCenterName?.styles ? profitCenterName?.styles : styles.profitCenterName]}>{item.LocationName}</UI.Text>
                        <UI.Text id="profitCenterTimings" style={[timingsText?.styles ? timingsText?.timingsText : styles.profitCenterTimings]}>
                            {
                                isAvailable ? `Closes at ${item.ClosingTime}` : `Available at ${item.OpeningTime}`
                            }
                        </UI.Text>
                    </UI.Box>
                    <UI.Box id="status" style={[
                        styles.statusBox,
                        { borderRadius: availabilityStatus?.borderRadius ? availabilityStatus.borderRadius : 20 },
                        isAvailable ? availabilityStatus?.activeBackgroundColor ? { backgroundColor: availabilityStatus?.activeBackgroundColor } :
                            styles.available : availabilityStatus?.inactiveBackgroundColor ? { backgroundColor: availabilityStatus?.inactiveBackgroundColor } : styles.closed
                    ]}>
                        <UI.Text style={styles.statusText}>{item.Status}</UI.Text>
                    </UI.Box>
                </UI.TouchableOpacity>
            </ImageBackground>
        );
    };
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
