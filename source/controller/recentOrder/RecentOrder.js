import { useEffect, useState } from 'react';
import { postApiCall } from '@/source/utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormContext } from '@/components/cobalt/event';

let recentOrderData = []; // Global variable to store fetched data

export const useRecentOrderLogic = () => {
  const [loading, setLoading] = useState(false);
  const {orders, setOrders} = useFormContext()
  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    setLoading(true);
    try {
      const getProfitCenterItem = await AsyncStorage.getItem("profit_center");
      let getProfitCenterId = getProfitCenterItem ? JSON.parse(getProfitCenterItem) : null;

      const params = {
        "Location_Id": getProfitCenterId?.LocationId || "",
      };
      console.log('location ID', params);

      let response = await postApiCall("RECENT_ORDERS", "GET_RECENT_ORDERS", params);

      if (response.statusCode === 200 && response.response.ResponseCode === "Success") {
        recentOrderData = response.response.CompletedOrders || [];
        setOrders(recentOrderData); // Update local state
      }
    } catch (error) {
      console.error("Error fetching recent orders:", error);
    }
    setLoading(false);
  };

  return { loading, orders, fetchRecentOrders };
};

export { recentOrderData }; // Export the data
