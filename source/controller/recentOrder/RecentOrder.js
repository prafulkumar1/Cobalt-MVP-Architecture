import { useEffect, useState } from 'react';
import { postApiCall } from '@/source/utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormContext } from '@/components/cobalt/event';
import { useMyCartLogic } from '@/source/controller/myCart/myCart';
let recentOrderData = []; 
let pendingOrderData = [];

export const useRecentOrderLogic = () => {
  const [loading, setLoading] = useState(false);
  const {pendingOrders, setPendingOrders} = useFormContext();
  const [favItems, setFavItems] = useState();
  const [loaded, setLoaded] = useState(false);
  const [emptyOrderMessage, setEmptyOrderMessage] = useState("");
  const [favErrorMessage, setFavErrorMessage] = useState("");

  const {
    postQuantityApiCall
     } = useMyCartLogic();
  const {
    orders, 
    setOrders,    
    removeFavoriteItems,
    updateCartItemQuantity,
    updateModifierItemQuantity
  } = useFormContext()
  
  
  useEffect(() => {
    fetchRecentOrders();
    getFavorites();

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
        recentOrderData = response?.response.CompletedOrders || [];
        pendingOrderData = response?.response.PendingOrders || [];
        setOrders(recentOrderData);
        setPendingOrders(pendingOrderData);
      }else if(response.response?.ResponseCode == "Fail"){
        setEmptyOrderMessage(response.response?.ResponseMessage);
      }
    } catch (error) {
      console.error("Error fetching recent orders:", error);
    }
    setLoading(false);
  };

  const getFavorites = async () => {
    try {
      setLoaded(true);
      const getProfitCenterItem = await AsyncStorage.getItem("profit_center");
      let getProfitCenterId = getProfitCenterItem !== null ? JSON.parse(getProfitCenterItem) : null;
      const params = {  
        "Location_Id": `${getProfitCenterId.LocationId}`,
      };
      let favItemInfo = await postApiCall("FAVORITES", "GET_FAVORITES", params);

      if (favItemInfo.statusCode === 200 && favItemInfo?.response?.ResponseCode === "Success") {
          setFavItems(favItemInfo.response?.FavouriteItems);
      }else if(favItemInfo.response?.ResponseCode == "Fail"){
        setFavItems([])
        setFavErrorMessage(favItemInfo.response?.ResponseMessage);
      }
      setLoaded(false);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    } finally {
      setLoaded(false);
    }
  };

  const handleIncrement = async (item, quantity) => {
    let quantityInfo = await postQuantityApiCall(item, quantity + 1)

    if (quantityInfo.statusCode === 200) {
      if (quantityInfo?.response.IsAvailable === 1) {
        updateCartItemQuantity(item, quantity + 1);
        updateModifierItemQuantity(item, quantity + 1);
      } else {
        Alert.alert(quantityInfo?.response?.ResponseMessage)
      }
    }
  }
  const handleDecrement = async (item, quantity) => {
    let quantityInfo = await postQuantityApiCall(item, quantity - 1)

    if (quantityInfo.statusCode === 200) {
      updateCartItemQuantity(item, quantity - 1);
      updateModifierItemQuantity(item, quantity - 1);
    }
   
  }
  const toggleFavBtn = (items) => {
    removeFavoriteItems(items)
    setTimeout(() => {
      getFavorites()
    }, 300);
  }

  return { favErrorMessage,loading, orders, fetchRecentOrders ,favItems,loaded, pendingOrders,emptyOrderMessage,toggleFavBtn,handleIncrement,handleDecrement};
};
