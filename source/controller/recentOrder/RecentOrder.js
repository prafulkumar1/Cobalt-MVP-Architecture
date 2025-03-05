import { useState, useEffect } from 'react';
import { useFormContext } from '@/components/cobalt/event';
import { postApiCall } from '@/source/utlis/api';

const pageId='RecentOrder';
export const useRecentOrderLogic = (props) => {
  const [loading, setLoading] = useState(false);
  const {setIsPrevCartScreen} = useFormContext();
  
  useEffect(() => {
    const isCartScreen = props?.route?.params?.cartScreen
    setIsPrevCartScreen(isCartScreen)
    getRecentOrderList()
  }, [])

  const getRecentOrderList = async () => {
    setLoading(true)
    const params = {
      "FilterDate": "",
      "FilterTime": ""
    }
    let recentOrderResponseData = await postApiCall("","", params)
    if(recentOrderResponseData.statusCode == 200){
      
    }
  }
  return {
  };
};
