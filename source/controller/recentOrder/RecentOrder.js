import { useEffect, useState } from 'react';
import { postApiCall } from '@/source/utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormContext } from '@/components/cobalt/event';
let recentOrderData = [];
let pendingOrderData = [];
 
export const useRecentOrderLogic = () => {
  const [loading, setLoading] = useState(false);
  const {pendingOrders, setPendingOrders} = useFormContext();
  const [favItems, setFavItems] = useState();
  const [loaded, setLoaded] = useState(false);
  const [emptyOrderMessage, setEmptyOrderMessage] = useState("");
  const [favErrorMessage, setFavErrorMessage] = useState("");

  const postQuantityApiCall = async (item,quantity) => {
    try {
      const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
      let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
      const params = {
        "Item_ID": item?.Item_ID,
        "Item_Quantity": quantity,
        "LocationId":`${getProfitCenterId.LocationId}`
      }
      let quantityInfo = await postApiCall("MENU_ORDER", "GET_MENU_ORDER_STATUS", params)
      return quantityInfo
    } catch (err) { }
  }
 
  const {
    orders,
    setOrders,    
    removeFavoriteItems,
    updateCartItemQuantity,
    updateModifierItemQuantity,
    setFavoriteItemsList,
    closePreviewModal,
    cartData,
    singleItemDetails,
    modifiersResponseData,
    addItemToModifierForCart,
    selectedModifiers,
    updateModifierCartItemForFavs,
    updateWithoutModifierCartItem,
    setToastDetails,
    addItemToFavorites,
    setIsVisible,
    setModifiersResponseData,
    setFormFieldData,
    favoriteItemsList,
    updateItemToFavorites
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
          setFavoriteItemsList(favItemInfo.response?.FavouriteItems)
      }else if(favItemInfo.response?.ResponseCode == "Fail"){
        setFavItems([])
        setFavErrorMessage(favItemInfo.response?.ResponseMessage);
        setFavoriteItemsList([])
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

  const handleModifierAddCart = () => {
    let isItemAvailableInCart = false;
    cartData?.forEach((items) => {
      if (items.Item_ID === singleItemDetails.Item_ID) {
        isItemAvailableInCart = true;
      }
    });
 
    let categoryData = typeof modifiersResponseData?.Categories === "string"
    ? JSON.parse(modifiersResponseData?.Categories)
    : modifiersResponseData?.Categories;
 
    if (!isItemAvailableInCart) {
      let isRequiredModifier = false;
      let requiredModifier = ""
      const getRequiredItem = categoryData?.filter((items) => items.DisplayOption === "Mandatory")
      const uniqueModifiers = selectedModifiers?.filter((modifier, index, self) => {
        const lastIndex = self.map(item => item.Modifier_Id).lastIndexOf(modifier.Modifier_Id);
        return modifier.isChecked && index === lastIndex;
      });
      if (getRequiredItem.length > 0) {
        isRequiredModifier = true
        getRequiredItem?.map((item) => {
          requiredModifier = item?.Category_Name
          return uniqueModifiers.length > 0 && uniqueModifiers?.forEach((modifierId) => {
            if (item.Category_Id == modifierId.Category_Id) {
              isRequiredModifier = false
            }
          })
        })
      }
      if (isRequiredModifier) {
        setToastDetails({ isToastVisiable:true,toastMessage: `Please select the required ${requiredModifier} to proceed with your order` })
        setTimeout(() => {
          setToastDetails({ isToastVisiable:false,toastMessage: "" })
        }, 6000);
      } else {
        addItemToModifierForCart(singleItemDetails);
        addItemToFavorites(singleItemDetails)
        closePreviewModal();
      }
    } else {
      let isRequiredModifier = false
      let requiredModifier = ""
      const existingFavItem = favoriteItemsList?.find((items) => items.Item_ID === singleItemDetails?.Item_ID);

      if (categoryData?.length > 0) {
        const updateModifiers = existingFavItem?.Modifiers?.map((items) => ({
          "Modifier_Id": items?.Modifier_Id,
          "Modifier_Name": items?.Modifier_Name,
          "Price": items?.ModifierPrice,
          "IsFavourite": 1,
          "isChecked": true,
          "Item_ID":existingFavItem?.Item_ID,
          "Category_Id": ""
        }))
  
        const newAddedModifiers = [...updateModifiers,...selectedModifiers]
        const getRequiredItem = categoryData?.filter((items) => items.DisplayOption === "Mandatory")
        const uniqueModifiers = newAddedModifiers?.filter((modifier, index, self) => {
          const lastIndex = self.map(item => item.Modifier_Id).lastIndexOf(modifier.Modifier_Id);
          return modifier.isChecked && index === lastIndex;
        });
 
        getRequiredItem?.map((item) => {
          isRequiredModifier = true
          requiredModifier = item?.Category_Name
          return uniqueModifiers.length > 0 && uniqueModifiers?.forEach((modifierId) => {
            return item?.Modifiers.forEach((modifier) => {
              if(modifier?.Modifier_Id === modifierId?.Modifier_Id){
                isRequiredModifier = false
              }
            })
          })
        })
 
        if(isRequiredModifier){
          setToastDetails({ isToastVisiable: true, toastMessage: `Please select the required ${requiredModifier} to proceed with your order` })
          setTimeout(() => {
            setToastDetails({ isToastVisiable: false, toastMessage: "" })
          }, 6000);
        }else{
          updateModifierCartItemForFavs(existingFavItem);
          updateItemToFavorites(existingFavItem)
        }
      } else {
        updateWithoutModifierCartItem(existingFavItem);
        updateItemToFavorites(existingFavItem)
      }
    }
}
const handleCloseItemDetails = () => {
  setFormFieldData("ItemModifier", "", "Comments", "", false)
  if (selectedModifiers.length === 0) {
    setIsVisible(false)
    updateModifierItemQuantity(singleItemDetails, 0)
    setModifiersResponseData([])
    setTimeout(() => {
      closePreviewModal()
    }, 100)
  } else {
    setIsVisible(true)
  }
}
 
  return {handleCloseItemDetails,handleModifierAddCart,getFavorites, favErrorMessage,loading, orders ,favItems,loaded, pendingOrders,emptyOrderMessage,toggleFavBtn,handleIncrement,handleDecrement};
};
