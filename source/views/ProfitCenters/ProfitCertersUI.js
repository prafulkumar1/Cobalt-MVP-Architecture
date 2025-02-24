import CbLoader from '@/components/cobalt/cobaltLoader';
import * as UI from '@/components/cobalt/importUI';
import { useProfitCenterLogic } from '@/source/controller/ProfitCenter/ProfitCenter';
import { styles } from '@/source/styles/ProfitCenter';
import React from 'react';
import { ImageBackground } from "react-native";
import  { useEffect, useState } from 'react';
import { loadPageConfig } from '@/source/constants/ConfigLoad';
const pageId = 'ProfitCenter';
global.controlsConfigJson=[];




const ProfitCenters = (props) => {
    const {navigateToMenuOrder,profitCenterData,loading} = useProfitCenterLogic(props)
    const [configLoaded, setConfigLoaded] = useState(false);

    const fetchConfig = async () => {

      global.controlsConfigJson = await loadPageConfig('ProfitCenter');
      console.log("=====>", JSON.stringify(global.controlsConfigJson));
      setConfigLoaded(true);
    };
    
    useEffect(() => {
      fetchConfig();
    }, []);
    
    if ( !configLoaded) {
        return (
          <CbLoader />
        );
      }
    
    const RenderingProfitCenter = ({item},props) => {
        // console.log(global.controlsConfigJson,"123")
        const isAvailable = item.STATUS === "Available";
        return (
            <UI.cbImageBackground id="ProfitCenterBGImage" source={{ uri:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatLiJAG6jse2XTu96VcidI8X5OYIvWzcenw&s" }} style={styles.profitCenterBGImage}>
                <UI.CbBox id='BoxContainer' style={styles.blackShadow} />
                <UI.TouchableOpacity style={styles.profitCenter_btn} activeOpacity={0.6} onPress={() => navigateToMenuOrder(props,item)}>
                    <UI.CbBox id='BoxTextContainer' style={styles.profitCenterOverlay}>
                        <UI.CbText id='ProfitCenterName' numberOfLines={1} style={[ styles.profitCenterName]}>{item.LocationName}</UI.CbText>
                        <UI.CbText id="TimingsText" style={[ styles.profitCenterTimings]}>
                            {item.STATUSTEXT}
                        </UI.CbText>
                    </UI.CbBox>
                    <UI.CbBox id="AvailabilityStatus" style={styles.statusBox} Conditionalstyle={isAvailable ? styles.available : styles.closed}>
                        <UI.CbText id="AvailabilityStatusText" style={styles.statusText}>{item.STATUS}</UI.CbText>
                    </UI.CbBox>
                </UI.TouchableOpacity>
            </UI.cbImageBackground>
        );
    };
    const renderProfitCenters = () => {
        if (loading) {
            return (
                <UI.Box style={styles.loaderContainer}>
                    <CbLoader />
                </UI.Box>
            )
        } else if (profitCenterData?.MealPeriodData.length === 0) {
            return (
                <UI.Box style={styles.emptyMealContainer}>
                    <UI.Text style={styles.emptyMealTxt}>No profit centers available</UI.Text>
                </UI.Box>
            )
        } else {
              return (
                <UI.CbFlatList
                    flatlistData={profitCenterData?.MealPeriodData}
                    children={(item) => RenderingProfitCenter(item, props)}
                    scrollEnabled={false}
                />
            )
        }
    }
    return (
        <UI.ScrollView contentContainerStyle={styles.scrollContent}>
            {renderProfitCenters()}
        </UI.ScrollView>
    );
};

export default ProfitCenters;
