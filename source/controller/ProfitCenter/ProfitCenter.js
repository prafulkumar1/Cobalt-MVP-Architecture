import { useState, useEffect } from 'react';
import { useFormContext } from '@/components/cobalt/event';
import { postApiCall } from '@/source/utlis/api';
import * as DeviceInfo from 'expo-device';
import { navigateToScreen } from '@/source/constants/Navigations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const pageId='ProfitCenter';
export const useProfitCenterLogic = (props) => {
  const [profitCenterData , setProfitCenterData] = useState(null)
  const [loading, setLoading] = useState(false);
  const { } = useFormContext();
  const fetchTrigger = global.fetchTrigger
  const locationId = global.location_id
  
  useEffect(() => {
    getProfitCenterList()
  }, [])

  const getProfitCenterList = async () => {
    setLoading(true);

    const params = {
      FilterDate: "",
      FilterTime: "",
    };

    let profitCenterResponseData = await postApiCall(
      "PROFIT_CENTER",
      "GET_PROFIT_CENTERS",
      params
    );

    if (profitCenterResponseData.statusCode === 200) {
      const mealPeriods = profitCenterResponseData.response?.MealPeriodData || [];

      const matchedLocation = mealPeriods.find(
        (location) => location.LocationId === locationId
      );

      console.log("Native Location ID:", locationId);
      console.log("Matched Location:", matchedLocation);

      if (matchedLocation?.LocationId && fetchTrigger) {
        console.log("Navigating to Recentorders...");
        navigateToScreen(props, "Recentorders", true, {
          profileCenterTile: matchedLocation.LocationName,
          LocationId: matchedLocation.LocationId,
        });
      } else if (mealPeriods.length === 1 && mealPeriods[0].Isnavigate === 1) {
        await AsyncStorage.setItem("profit_center", JSON.stringify(mealPeriods[0]));

        navigateToScreen(props, "MenuOrder", true, {
          profileCenterTile: mealPeriods[0].LocationName,
          LocationId: mealPeriods[0].LocationId,
        });
      }

      setProfitCenterData(profitCenterResponseData.response);
    }

    setLoading(false);
  };

  const navigateToMenuOrder = async (props, item) => {
    if (item.Isnavigate == 1) {
      await AsyncStorage.setItem("profit_center",JSON.stringify(item))
      navigateToScreen(props, "MenuOrder", true, { profileCenterTile: item.LocationName,LocationId:item.LocationId })
    }
  }

  return {
    getProfitCenterList,
    navigateToMenuOrder,
    profitCenterData,
    loading
  };
};