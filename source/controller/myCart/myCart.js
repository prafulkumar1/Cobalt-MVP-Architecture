import {useFormContext } from '@/components/cobalt/event';
import { navigateToScreen } from '@/source/constants/Navigations';
import {  cartConfigResponseData } from '@/source/constants/commonData';
import uuid from "react-native-uuid";
import { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { postApiCall } from '@/source/utlis/api';
const pageId='MyCart';
export const useMyCartLogic = () => {
    const swipeableRefs = useRef({});
    const customTip = useRef(null)
    const scrollViewRef = useRef(null);

    const {addedModifierCartData,getCartData,getModifierData,deleteCartItem,deleteModifierItem,cartData,updateCartItemQuantity,updateModiferItemData ,updateModifierItemQuantity, }= useFormContext(); 
    const [tipData,setTipData] = useState(cartConfigResponseData.Tip)
    const [cartConfigData,setCartCofigData] = useState(cartConfigResponseData)
    const [value,setValue]  =useState(0)
    const [openItemId, setOpenItemId] = useState(null);
    const [isTimeModalSelected,setIsTimeModalSelected] = useState(false)
    const [customTipValue,setCustomTipValue] = useState("")
    const [pickUpTimeLineData,setPickUpTimeLineData] = useState(cartConfigResponseData.Pickup_Times)
    const [finalCartData, setFinalCartData] = useState([]);

    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [showPickupTime,setShowPickupTime] = useState(cartConfigResponseData.Pickup_Times)
     
  useEffect(() => {
    if ((cartData.length > 0 || addedModifierCartData.length > 0)) {
      setFinalCartData([...cartData, ...addedModifierCartData]);
    }
  }, [cartData, addedModifierCartData]);



  useEffect(() => {
    getTipDetails()
    getCartData();
    getModifierData();
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


  const closeAllSwipeables = () => {
    Object.keys(swipeableRefs?.current).forEach((key) => {
      const swipeable = swipeableRefs.current[key];
      if (swipeable && swipeable.close) {
        swipeable.close();
      }
    });
    setOpenItemId(null);
  };

  const handleDelete = (item) => {
    if (openItemId === item.Item_Id && swipeableRefs.current[openItemId]) {
      swipeableRefs.current[openItemId].close();
    }
    delete swipeableRefs.current[item.Item_Id];
    setOpenItemId(null);
    if(item.isModifier ===1){
      deleteModifierItem(item)
    }else{
      deleteCartItem(item);
    }
    let updatedCartData = finalCartData?.filter((itemDetails) => itemDetails.Item_Id !== item.Item_Id);
    setFinalCartData(updatedCartData);
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
    const updatedTipDetails = tipData.map((item) => item.id == tipDetails.id?{...item,isSelected:1}:{...item,isSelected:0})
    setTipData(updatedTipDetails)
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
      };

      setTipData((prevData) => {
        const updatedData = [...prevData, newTip];
        setCustomTipValue("")
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
        return updatedData;
      });
    }
  };
  const postQuantityApiCall = async (item,quantity) => {
    try {
      const params = {
        "Item_ID": item?.Item_ID,
        "Item_Quantity": quantity
      }
      let quantityInfo = await postApiCall("MENU_ORDER", "GET_MENU_ORDER_STATUS", params)
      return quantityInfo
    } catch (err) { }
  }
  const handleIncrement = async(item) => {
    let quantityInfo = await postQuantityApiCall(item,item.quantity + 1)

    if (quantityInfo.statusCode === 200) {
      if (quantityInfo?.response.IsModifierAvailable === 1) {
        updateModiferItemData(item, item.quantity + 1);
        updateModifierItemQuantity(item, item.quantity + 1);
      } else {
        if (quantityInfo?.response.IsAvailable === 1) {
          updateCartItemQuantity(item, item.quantity + 1);
        } else {
          Alert.alert(JSON.stringify(quantityInfo?.response?.ResponseMessage))
        }
      }
    }
  }
  const handleDecrement = async(item) => {
    let quantityInfo = await postQuantityApiCall(item,item.quantity - 1)

    if (quantityInfo.statusCode === 200) {
      if (quantityInfo?.response.IsModifierAvailable === 1) {
        updateModiferItemData(item, item.quantity - 1);
        updateModifierItemQuantity(item, item.quantity - 1);
      } else {
        updateCartItemQuantity(item, item.quantity - 1);
      }
    }
  }
  const editCommentBtn = (props,item) => {
    navigateToScreen(props, "MenuOrder", true, { itemId: item.id })
    storeSingleItem(item)
    setTimeout(() => {
      closePreviewModal()
    }, 1000);
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
    finalCartData,
    keyboardVisible,
    handleIncrement,
    handleDecrement,
    editCommentBtn
  };
};
