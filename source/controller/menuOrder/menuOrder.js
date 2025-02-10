import { useEffect, useRef, useState } from 'react';
import { useFormContext } from '@/components/cobalt/event';
import * as DeviceInfo from 'expo-device';
import { postApiCall } from '@/source/utlis/api';


const pageId='MenuOrder';
export const useMenuOrderLogic = (props) => {
  const [isRecentOrderOpen,setIsRecentOrderOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")
  const [mealItems,setMealItems] = useState(null)

    const { setMenuOrderData}= useFormContext();  


    const openRecentOrder = () => {
      setIsRecentOrderOpen(!isRecentOrderOpen)
    }

    useEffect(() => {
      // console.log(props,"==>>>")
      getMenuOrderList()
      }, [])
    
      // useEffect(() => {
      //   setLoading(false)
      // },[])
    
      const getMenuOrderList = async () => {
        const {LocationId} = props?.route?.params
        setLoading(true)
        const params = {
          "MemberID": "09071",
          "ID": "128EF3F3-A7F1-4278-A99E-6C53F5B3B047",
          "ParentID": "78F8EE9D-CF86-441D-86F8-29F8B9161B9F",
          "DeviceInfo": [
            {
              "DeviceType": DeviceInfo.deviceType,
              "OSVersion": DeviceInfo.osVersion,
              "OriginatingIP": "183.82.116.84",
              "SessionID": "iedtpmh83f860p0daqq75bhf76kbmmlt",
              "Browser": DeviceInfo.osName,
              "HostName": "183.82.116.84.actcorp.in",
              "SourcePortNo": "50189"
            }
          ],
          "IsAdmin": "0",
          "UserName": "Henry, aa Luther",
          "Role": "Full Access",
          "UserId": "9837",
          "LocationId": `${LocationId}`,
          "MealPeriod_Id": "",
          "Category_Id": "",
          "Search": ""
        }
        let menuOrderResponseData = await postApiCall("MENU_ORDER","GET_MENU_ORDER_LIST", params)
        // console.log(JSON.stringify(menuOrderResponseData),"===>>>menuOrderResponseData")

        if(menuOrderResponseData?.response?.ResponseCode === "Fail"){
          setErrorMessage(menuOrderResponseData?.response?.ResponseMessage)
        }else{
          setMenuOrderData(menuOrderResponseData.response)
          // setMealItems(menuOrderResponseData.response)
        }
      }
  return {
    isRecentOrderOpen,
    openRecentOrder,
    loading,
    errorMessage,
  };
};
