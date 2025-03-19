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
 
    const {setIsPrevCartScreen,setSelectedLocationId,increaseQuantity,selectedLocationId,selectedTime,setSelectedLocation,setSelectedTime,removeCartItems,cartData,menuOrderData,deleteCartItem,updateCartItemQuantity ,updateModifierItemQuantity,setSelectedModifiers,storeSingleItem,closePreviewModal}= useFormContext();
    const [tipData,setTipData] = useState([])
    const [cartConfigData,setCartCofigData] = useState(null)
    const [value,setValue]  =useState(0)
    const [openItemId, setOpenItemId] = useState(null);
    const [isTimeModalSelected,setIsTimeModalSelected] = useState(false)
    const [customTipValue,setCustomTipValue] = useState("")
    const [loading , setLoading] = useState(false)
    const [isCustomTipAdded,setIsCustomTipAdded] = useState(true)
    const [tipKeyboardOpen,setTipKeyboardOpen] = useState(false)
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
 
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [showPickupTime,setShowPickupTime] = useState([])
    const [showPickupLocation,setShowPickupLocation] = useState([])
    const [myCartData,setMyCartData] =  useState([])
    const [priceBreakDownData,setPriceBreakDownData] = useState([])
    const [grandTotal,setGrandTotal] = useState(0)
    const [isPriceLoaded,setIsPriceLoaded]= useState(0)
    const [orderInstruction,setOrderInstruction]= useState("")
    const [height, setHeight] = useState(29);
    const [orderSuccessModal,setOrderSuccessModal] = useState(false)
    const [successResponse,setSuccessResponse] =useState(null)
    const [pickUpLocations,setPickUpLocations] =useState(null)
    const tipSelection = useRef()
 
 
  useEffect(() => {
    getCartPrice()
    getCartConfigData()
    const keyboardDidShowListener = Keyboard?.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard?.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });
 
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
 
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
      const showTimeData = cartInfo?.response?.Pickup_Times?.map((item) => ({label:item.PickupTime,value:item.PickupTime}))
      const showPickLocationData = cartInfo?.response?.Pickup_Locations?.map((item) => ({label:item.Pickup_LocationName,value:item.Pickup_LocationName,pickUpLocationId:item.Pickup_LocationID}))
      setCartCofigData(cartInfo?.response)
      setLoading(false)
      let tipDetails = cartInfo?.response?.Tip?.map((items) => {
        return{
          id:uuid.v4(),
          tip: items?.tipvalue,
          isSelected:false
        }
      })
      setTipData(tipDetails)
      setSelectedTime(showTimeData[0]?.value)
      setSelectedLocation(showPickLocationData[0]?.value)
      setSelectedLocationId(showPickLocationData?.length === 1 && showPickLocationData[0]?.pickUpLocationId)
      setPickUpLocations(cartInfo?.response?.Pickup_Locations)
      setShowPickupTime(showTimeData)
      setShowPickupLocation(showPickLocationData)
    } catch (err) {
      setLoading(false)
    }
  }
 
  const getCartPrice = async () => {
    try {
      let customTipVal = tipSelection.current?.TipCustom?.replace("$", "");
      setIsPriceLoaded(true)
      const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
      let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
      const cartItemIds = cartData?.map((item) => {
        const uniqueModifiers = item?.selectedModifiers?.filter((modifier, index, self) => {
          const lastIndex = self.map(item => item.Modifier_Id).lastIndexOf(modifier.Modifier_Id);
          return modifier.isChecked && index === lastIndex;
        });
        return{
          Comments:item.comments,
          ItemId:item.Item_ID,
          Quantity:item.quantity,
          Modifiers:item?.selectedModifiers ? uniqueModifiers?.map((items) => ({ModifierId:items.Modifier_Id})):[]
        }
      })
      const params = {   
         "Location_Id":`${getProfitCenterId?.LocationId}`,
         "Items":cartItemIds,
         "TipPercentage": tipSelection.current?.TipPercentage,
         "TipCustom": customTipVal,
      }

      let cartInfo = await postApiCall("CART", "GET_CART_PRICE",params)
      setMyCartData(cartInfo.response?.Items)
      setPriceBreakDownData(cartInfo.response?.Breakdown)
      setGrandTotal(cartInfo.response?.GrandTotal)
      setIsPriceLoaded(false)
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
    setIsPriceLoaded(true)
    if (openItemId === item.Item_ID && swipeableRefs.current[openItemId]) {
      swipeableRefs.current[openItemId].close();
    }
    delete swipeableRefs.current[item.Item_ID];
    setOpenItemId(null);
    deleteCartItem(item);
    setSelectedModifiers([])
    updateModifierItemQuantity(item, 0)
    await postQuantityApiCall(item,0)
    setIsPriceLoaded(false)
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
     getCartPrice()
    }else{
      let tipWithoutPercent = tipDetails.tip.replace("%", "");
      const updatedTipDetails = tipData.filter((item) => item.isCustomAdded ===1)
      const removeLastItem = tipData.filter((itemId) => updatedTipDetails[0]?.id !== itemId.id).map((item) => item.id == tipDetails.id?{...item,isSelected:!item.isSelected}:{...item,isSelected:false})
      setTipData(removeLastItem)
      setIsCustomTipAdded(true)
      setCustomTipValue("")
      tipSelection.current = ({"TipPercentage": !tipDetails.isSelected ? tipWithoutPercent : "","TipCustom":"" })
      getCartPrice()
    }
  }
 
  const changeTime = () => {
    setIsTimeModalSelected(true)
  }
 
  const handleResetTip = () => {
    const updatedTipDetails = tipData.map((item) => {
      return{
        ...item,
        isSelected:false
      }
    })
    setTipData(updatedTipDetails)
    setTipKeyboardOpen(true)
  }
 
  const getCustomTip = (value) =>{
     const numericValue = value.replace(/[^0-9]/g, '');
     setCustomTipValue(numericValue ? `$${numericValue}` : '');
     customTip.current = numericValue ? `$${numericValue}` : ''
     handleResetTip()
     tipSelection.current = {"TipPercentage":"","TipCustom": value}
  }
 
  const handleSaveTip = () => {
    if (customTip.current.length === 0) {
      Keyboard.dismiss()
      getCartPrice()
    } else {
      const newTip = {
        id: uuid.v4(),
        tip: `${customTip.current}`,
        isSelected: false,
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
      getCartPrice()
    }
  };
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
  useEffect(() => {
    getCartPrice()
  },[cartData])
 
  const handleIncrement = async(item) => {
    let quantityInfo = await postQuantityApiCall(item,item.quantity + 1)
 
    if (quantityInfo.statusCode === 200) {
      if (quantityInfo?.response.IsAvailable === 1) {
        updateCartItemQuantity(item, item.quantity + 1);
        updateModifierItemQuantity(item, item.quantity + 1);
      } else {
        Alert.alert(quantityInfo?.response?.ResponseMessage)
      }
    }
  }
  const handleDecrement = async(item) => {
    let quantityInfo = await postQuantityApiCall(item,item.quantity - 1)
 
    if (quantityInfo.statusCode === 200) {
      updateCartItemQuantity(item, item.quantity - 1);
      updateModifierItemQuantity(item, item.quantity - 1);
    }
  }
  const editCommentBtn = (props,item) => {
    closePreviewModal()
    const cartItem = cartData?.find((items) => items.Item_ID === item?.Item_ID);
    storeSingleItem({
      ...item,
      quantityIncPrice:item?.TotalPrice,
      ImageUrl:cartItem?.ImageUrl
    })
    increaseQuantity({
      ...item,
      quantityIncPrice:item?.TotalPrice
    })
  }
  const handlePlaceOrder = async() => {
    try {
      setIsOrderPlaced(true)
      const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
      let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
      const cartItemIds = cartData?.map((item) => ({Comments:item.comments,ItemId:item.Item_ID,Quantity:item.quantity,Modifiers:item?.selectedModifiers?.map((items) => ({ModifierId:items.Modifier_Id}))}))
      let customTipVal = tipSelection.current?.TipCustom?.replace("$", "");
      const params = {
        "OrderDetails": {
          "Location_Id": `${getProfitCenterId?.LocationId}`,
          "MealPeriod_Id":menuOrderData?.[0]?.MealPeriod_Id,
          "PickupTime": selectedTime ? selectedTime :"",
          "PickupLocationId": selectedLocationId?selectedLocationId:"",
          "Instructions": orderInstruction,
          "GrandTotal": grandTotal,
          "TipPercentage": tipSelection.current?.TipPercentage, 
          "TipCustom": customTipVal
        },
        "Items": cartItemIds,
      }
      console.log(JSON.stringify(params),"=============>>>>>catrssshsh")
      let placeOrderDetails = await postApiCall("CART", "PLACE_ORDER", params)
 
      if(placeOrderDetails?.response?.ResponseCode === "Success"){
        setSuccessResponse(placeOrderDetails?.response)
        removeCartItems()
        setOrderSuccessModal(true)
      }
      setIsOrderPlaced(false)
    } catch (err) { }
  }
  const orderInstructions = (text) => {
    setOrderInstruction(text)
  }
  const closeSuccessModal = (props) => {
    navigateToScreen(props,"Recentorders",true,{cartScreen:true});
    setIsPrevCartScreen(true)
    setTimeout(() => {
      setOrderSuccessModal(false);
    }, 100);
  }
  const closeKeyBoard = () => {
    setIsCustomTipAdded(true)
    setCustomTipValue("")
    Keyboard.dismiss()
    getCartPrice()
  }
  const handleContentSizeChange = (event) => {
    const newHeight = event?.nativeEvent?.contentSize.height;
    setHeight(newHeight > 30 ? newHeight : 29); 
  };
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
    grandTotal,
    isPriceLoaded,
    handlePlaceOrder,
    tipKeyboardOpen,
    orderInstruction,
    orderInstructions,
    setTipKeyboardOpen,
    isOrderPlaced,
    orderSuccessModal,
    setOrderSuccessModal,
    successResponse,
    closeSuccessModal,
    setIsCustomTipAdded,
    closeKeyBoard,
    handleContentSizeChange,
    height,
    postQuantityApiCall
  };
};