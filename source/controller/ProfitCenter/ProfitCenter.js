import { useState,useContext, useEffect } from 'react';
import { useFormContextProvider,useFormContext } from '@/components/cobalt/event';
import { postApiCall } from '@/source/utlis/api';
import { endpoints } from '@/source/config/config';
import * as DeviceInfo from 'expo-device';
import { navigateToScreen } from '@/source/constants/Navigations';

const pageId='ProfitCenter';
export const useProfitCenterLogic = () => {
  
  const { } = useFormContext();
  
  useEffect(() => {
    getProfitCenterList()
  }, [])

  const getProfitCenterList = () => {
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
      "FilterDate": "",
      "FilterTime": ""
    }
    const getUrl = `${endpoints['PROFIT_CENTER']['GET_PROFIT_CENTERS']}`
    let profitCenterResponseData = postApiCall(getUrl, params, "token")

    console.log(profitCenterResponseData)
  }

  const navigateToMenuOrder = (props, item) => {
    if (item.Isnavigate == 1) {
      navigateToScreen(props, "MenuOrder", true, { profileCenterTile: item.LocationName })
    }
  }

  return {
    getProfitCenterList,
    navigateToMenuOrder
  };
};
