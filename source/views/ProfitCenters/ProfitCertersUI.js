import * as UI from '@/components/cobalt/importUI';
import { ProfitCentersData } from '@/source/constants/commonData';
import { useProfitCenterLogic } from '@/source/controller/ProfitCenter/ProfitCenter';
import { styles } from '@/source/styles/ProfitCenter';
import React from 'react';
import { ImageBackground } from "react-native";

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
