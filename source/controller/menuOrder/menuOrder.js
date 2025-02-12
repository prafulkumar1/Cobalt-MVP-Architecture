import { useEffect, useRef, useState } from 'react';
import { useFormContext } from '@/components/cobalt/event';
import * as DeviceInfo from 'expo-device';
import { postApiCall } from '@/source/utlis/api';


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
        const {LocationId} = props?.route?.params
        setLoading(true)
        const params = {
          "LocationId": `${LocationId}`,
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
