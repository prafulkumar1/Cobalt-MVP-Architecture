import { useState, useEffect } from 'react';
import { useFormContext } from '@/components/cobalt/event';
import { postApiCall } from '@/source/utlis/api';
import * as DeviceInfo from 'expo-device';
import { navigateToScreen } from '@/source/constants/Navigations';
import AsyncStorage from '@react-native-async-storage/async-storage';

const pageId='ProfitCenter';
export const useProfitCenterLogic = () => {
  const [profitCenterData , setProfitCenterData] = useState(null)
  const [loading, setLoading] = useState(false);
  const { } = useFormContext();
  
  useEffect(() => {
    getProfitCenterList()
  }, [])

  useEffect(() => {
    setLoading(false)
  },[profitCenterData])

  const getProfitCenterList = async () => {
    setLoading(true)
    const params = {
      "FilterDate": "",
      "FilterTime": ""
    }
    let profitCenterResponseData = await postApiCall("PROFIT_CENTER","GET_PROFIT_CENTERS", params)
    if(profitCenterResponseData.statusCode == 200){
      if(profitCenterResponseData.response?.MealPeriodData.length === 1){
        const responseData = profitCenterResponseData.response?.MealPeriodData[0]
        navigateToScreen(props, "MenuOrder", true, { profileCenterTile: responseData?.LocationName,LocationId:responseData?.LocationId })
      }else{
        setProfitCenterData(profitCenterResponseData.response)
      }
    }
  }

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
