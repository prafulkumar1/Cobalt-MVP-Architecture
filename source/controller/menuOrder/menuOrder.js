import { useEffect, useRef, useState } from 'react';
import { useFormContext } from '@/components/cobalt/event';
import * as DeviceInfo from 'expo-device';
import { postApiCall } from '@/source/utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const pageId='MenuOrder';
export const useMenuOrderLogic = (props) => {
  const [isRecentOrderOpen,setIsRecentOrderOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")

    const { setMenuOrderData,getCartData }= useFormContext();  


    const openRecentOrder = () => {
      setIsRecentOrderOpen(!isRecentOrderOpen)
    }

    useEffect(() => {
      getCartData()
      setLoading(false)
      getMenuOrderList()
      }, [])
  
    
      const getMenuOrderList = async () => {
        setLoading(true)
        const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
        let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
        const params = {
          "LocationId": `${getProfitCenterId.LocationId}`,
          "MealPeriod_Id": "",
          "Category_Id": "",
          "Search": ""
        }
        let menuOrderResponseData = await postApiCall("MENU_ORDER","GET_MENU_ORDER_LIST", params)

        if(menuOrderResponseData?.response?.ResponseCode === "Fail"){
          setErrorMessage(menuOrderResponseData?.response?.ResponseMessage)
        }else{
          setMenuOrderData(menuOrderResponseData.response)
          setLoading(false)
        }
      }
  return {
    isRecentOrderOpen,
    openRecentOrder,
    loading,
    errorMessage,
  };
};
