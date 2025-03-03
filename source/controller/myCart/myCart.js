import {useFormContext } from '@/components/cobalt/event';
import { navigateToScreen } from '@/source/constants/Navigations';
import {  cartConfigResponseData, departments, pickupLocations } from '@/source/constants/commonData';
import uuid from "react-native-uuid";
import { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { postApiCall } from '@/source/utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const pageId='MyCart';
export const useMyCartLogic = () => {
    const swipeableRefs = useRef({});
    const customTip = useRef(null)
    const scrollViewRef = useRef(null);
    const textInputRef = useRef(null);

    const {cartData,menuOrderData,deleteCartItem,updateCartItemQuantity ,updateModifierItemQuantity,setSelectedModifiers,storeSingleItem,closePreviewModal}= useFormContext(); 
    const [tipData,setTipData] = useState(cartConfigResponseData.Tip)
    const [cartConfigData,setCartCofigData] = useState(null)
    const [value,setValue]  =useState(0)
    const [openItemId, setOpenItemId] = useState(null);
    const [isTimeModalSelected,setIsTimeModalSelected] = useState(false)
    const [customTipValue,setCustomTipValue] = useState("")
    const [loading , setLoading] = useState(false)
    const [isCustomTipAdded,setIsCustomTipAdded] = useState(true)

    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [showPickupTime,setShowPickupTime] = useState(departments)
    const [showPickupLocation,setShowPickupLocation] = useState(pickupLocations)
    const [myCartData,setMyCartData] =  useState([])
    const [priceBreakDownData,setPriceBreakDownData] = useState([])
    const [grandTotal,setGrandTotal] = useState(0)


  useEffect(() => {
    getCartPrice()
    getCartConfigData()
    getTipDetails()
    const keyboardDidShowListener = Keyboard?.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard?.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    setTimeout(() => {
      const updatedShowTime = showPickupTime?.map((items) => {
        return {
          label: items.Time,
          value: items.Time
        }
      })
      setShowPickupTime(updatedShowTime)
    }, 100);

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const getTipDetails = () => {
    let tipDetails = tipData.map((items) => {
      return{
        id:uuid.v4(),
        tip: items.tip,
        isSelected:0
      }
    })
    setTipData(tipDetails)
  }
  const getCartConfigData = async () => {
    try {
      setLoading(true)
      const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
      let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
      const params = {   
        "Location_Id":`${getProfitCenterId?.LocationId}`,
        "MealPeriod_Id":menuOrderData?.[0]?.MealPeriod_Id
      }
      let cartInfo = await postApiCall("CART", "GET_CART_CONFIG", params)
      const showTimeData = cartInfo?.response?.Pickup_Times?.map((item) => ({label:item.Time,value:item.Time}))
      const showPickLocationData = cartInfo?.response?.Pickup_Locations?.map((item) => ({label:item.Time,value:item.Time}))
      setCartCofigData(cartInfo?.response)
      setLoading(false)
      showPickupTime(showTimeData)
      setShowPickupLocation(showPickLocationData)
    } catch (err) { }
  }

  const getCartPrice = async () => {
    try {
      const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
      let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
      const cartItemIds = cartData?.map((item) => ({Comments:item.comments,ItemId:item.Item_ID,Quantity:item.quantity,Modifiers:item?.selectedModifiers?.map((items) => ({ModifierId:items.Modifier_Id}))}))
      const params = {   
        "LocationId":`${getProfitCenterId?.LocationId}`,
         "Items":cartItemIds,
      }
      let cartInfo = await postApiCall("CART", "GET_CART_PRICE", params)
      setMyCartData(cartInfo.response?.Items)
      setPriceBreakDownData(cartInfo.response?.Breakdown)
      setGrandTotal(cartInfo.response?.GrandTotal)
    } catch (err) { }
  }


  const closeAllSwipeables = () => {
    Object.keys(swipeableRefs?.current).forEach((key) => {
      const swipeable = swipeableRefs.current[key];
      if (swipeable && swipeable.close) {
        swipeable.close();
      }
    });
    setOpenItemId(null);
  };

  const handleDelete = async(item) => {
    if (openItemId === item.Item_ID && swipeableRefs.current[openItemId]) {
      swipeableRefs.current[openItemId].close();
    }
    delete swipeableRefs.current[item.Item_ID];
    setOpenItemId(null);
    deleteCartItem(item);
    setSelectedModifiers([])
    updateModifierItemQuantity(item, 0)
    await postQuantityApiCall(item,0)
  };
  const handleSwipeOpen = (itemId) => {
    if (openItemId !== itemId) {
      if (openItemId !== null && swipeableRefs.current[openItemId]) {
        swipeableRefs.current[openItemId].close();
      }
      setOpenItemId(itemId);
    }else{
      setOpenItemId(null);
    }
  };

  const addTip = (tipDetails) => {
    if(tipDetails.isCustomAdded && tipDetails.isCustomAdded ===1){
      textInputRef?.current?.focus();
      const updatedTipDetails = tipData.filter((item) => item.isCustomAdded ===1)
      const removeLastItem = tipData.filter((itemId) => updatedTipDetails[0]?.id !== itemId.id)
      setTipData(removeLastItem)
      setIsCustomTipAdded(true)
      setCustomTipValue(tipDetails.tip);
     customTip.current = tipDetails.tip
    }else{
      const updatedTipDetails = tipData.filter((item) => item.isCustomAdded ===1)
      const removeLastItem = tipData.filter((itemId) => updatedTipDetails[0]?.id !== itemId.id).map((item) => item.id == tipDetails.id?{...item,isSelected:1}:{...item,isSelected:0})
      setTipData(removeLastItem)
      setIsCustomTipAdded(true)
    }
  }

  const changeTime = () => {
    setIsTimeModalSelected(true)
  }

  const handleResetTip = () => {
    const updatedTipDetails = tipData.map((item) => {
      return{
        ...item,
        isSelected:0
      }
    })
    setTipData(updatedTipDetails)
  }

  const getCustomTip = (value) =>{
     const numericValue = value.replace(/[^0-9]/g, '');
     setCustomTipValue(numericValue ? `$${numericValue}` : '');
     customTip.current = numericValue ? `$${numericValue}` : ''
  }

  const handleSaveTip = () => {
    if (customTip.current.length === 0) {
      Alert.alert('Please select a custom tip');
    } else {
      const newTip = {
        id: uuid.v4(),
        tip: `${customTip.current}`,
        isSelected: 0,
        isCustomAdded:1
      };

      setTipData((prevData) => {
        const updatedData = [...prevData, newTip];
        setCustomTipValue("")
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
        return updatedData;
      });
      setIsCustomTipAdded(false)
    }
  };
  const postQuantityApiCall = async (item,quantity) => {
    try {
      const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
      let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
      const params = {
        "Item_ID": item?.ItemId,
        "Item_Quantity": quantity,
        "LocationId":`${getProfitCenterId.LocationId}`
      }
      let quantityInfo = await postApiCall("MENU_ORDER", "GET_MENU_ORDER_STATUS", params)
      return quantityInfo
    } catch (err) { }
  }
  const handleIncrement = async(item) => {
    let quantityInfo = await postQuantityApiCall(item,item.Quantity + 1)

    if (quantityInfo.statusCode === 200) {
      if (quantityInfo?.response.IsAvailable === 1) {
        updateCartItemQuantity(item, item.Quantity + 1);
        updateModifierItemQuantity(item, item.Quantity + 1);
        getCartPrice()
      } else {
        Alert.alert(quantityInfo?.response?.ResponseMessage)
      }
    }
  }
  const handleDecrement = async(item) => {
    let quantityInfo = await postQuantityApiCall(item,item.Quantity - 1)

    if (quantityInfo.statusCode === 200) {
      updateCartItemQuantity(item, item.Quantity - 1);
      updateModifierItemQuantity(item, item.Quantity - 1);
      getCartPrice()
    }
  }
  const editCommentBtn = (props,item) => {
    navigateToScreen(props, "MenuOrder", true, { itemId: item.id })
    storeSingleItem(item)
    setTimeout(() => {
      closePreviewModal()
    }, 500);
  }
  return {
    tipData,
    value,
    setValue,
    openItemId,
    setOpenItemId,
    swipeableRefs,
    closeAllSwipeables,
    handleDelete,
    handleSwipeOpen,
    addTip,
    cartConfigData,
    isTimeModalSelected,
    changeTime,
    handleResetTip,
    getCustomTip,
    customTipValue,
    handleSaveTip,
    scrollViewRef,
    keyboardVisible,
    handleIncrement,
    handleDecrement,
    editCommentBtn,
    loading,
    showPickupTime,
    showPickupLocation,
    isCustomTipAdded,
    textInputRef,
    myCartData,
    priceBreakDownData,
    grandTotal
  };
};
