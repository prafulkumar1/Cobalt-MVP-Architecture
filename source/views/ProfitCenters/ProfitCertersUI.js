import * as UI from '@/components/cobalt/importUI';
import { useProfitCenterLogic } from '@/source/controller/ProfitCenter/ProfitCenter';
import { styles } from '@/source/styles/ProfitCenter';
import React from 'react';
import { ImageBackground } from "react-native";

const pageId = 'ProfitCenter';
const ProfitCenters = (props) => {
    const {navigateToMenuOrder,profitCenterData,loading} = useProfitCenterLogic()

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
      const { backgroundImage, profitCenterName, timingsText, availabilityStatus, } = configItems;

    
    const RenderingProfitCenter = ({item},props) => {
        const isAvailable = item.STATUS === "Available";
        return (
            <ImageBackground id="backgroundImage" source={{ uri: backgroundImage?.imageUrl ? backgroundImage?.imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatLiJAG6jse2XTu96VcidI8X5OYIvWzcenw&s" }} style={styles.profitCenterBGImage}>
                <UI.Box style={styles.blackShadow} />
                <UI.TouchableOpacity style={styles.profitCenter_btn} activeOpacity={0.6} onPress={() => navigateToMenuOrder(props,item)}>
                    <UI.Box style={styles.profitCenterOverlay}>
                        <UI.Text id='profitCenterName' numberOfLines={1} style={[profitCenterName?.styles ? profitCenterName?.styles : styles.profitCenterName]}>{item.LocationName}</UI.Text>
                        <UI.Text id="timingsText" style={[timingsText?.styles ? timingsText?.timingsText : styles.profitCenterTimings]}>
                            {item.STATUSTEXT}
                        </UI.Text>
                    </UI.Box>
                    <UI.Box id="availabilityStatus" style={[
                        styles.statusBox,
                        { borderRadius: availabilityStatus?.borderRadius ? availabilityStatus.borderRadius : 20 },
                        isAvailable ? availabilityStatus?.activeBackgroundColor ? { backgroundColor: availabilityStatus?.activeBackgroundColor } :
                            styles.available : availabilityStatus?.inactiveBackgroundColor ? { backgroundColor: availabilityStatus?.inactiveBackgroundColor } : styles.closed
                    ]}>
                        <UI.Text style={styles.statusText}>{item.STATUS}</UI.Text>
                    </UI.Box>
                </UI.TouchableOpacity>
            </ImageBackground>
        );
    };
    if (loading) {
        return (
          <UI.Box style={styles.loadingContainer}>
            <UI.ActivityIndicator size="large" color="#00BFF6" />
          </UI.Box>
        );
      }
    return (
        <UI.ScrollView contentContainerStyle={styles.scrollContent}>
            {
                profitCenterData?.MealPeriodData && 
                <UI.CbFlatList
                flatlistData={profitCenterData?.MealPeriodData}
                children={(item) => RenderingProfitCenter(item,props)}
                scrollEnabled={false}
            />
            }
        </UI.ScrollView>
    );
};

export default ProfitCenters;
