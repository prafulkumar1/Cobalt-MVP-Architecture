import {useFormContext } from '@/components/cobalt/event';
import { navigateToScreen } from '@/source/constants/Navigations';
import {  cartConfigResponseData } from '@/source/constants/commonData';
import uuid from "react-native-uuid";
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
const pageId='MyCart';
export const useMyCartLogic = () => {
    const swipeableRefs = useRef({});
    const customTip = useRef(null)
    const scrollViewRef = useRef(null);

    const {deleteCartItem }= useFormContext(); 
    const [tipData,setTipData] = useState(cartConfigResponseData.Tip)
    const [cartConfigData,setCartCofigData] = useState(cartConfigResponseData)
    const [value,setValue]  =useState(0)
    const [openItemId, setOpenItemId] = useState(null);
    const [isTimeModalSelected,setIsTimeModalSelected] = useState(false)
    const [customTipValue,setCustomTipValue] = useState("")
    const [pickUpTimeLineData,setPickUpTimeLineData] = useState(cartConfigResponseData.Pickup_Times)

  useEffect(() => {
    getTipDetails()
  },[])

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

  const getPickupTimeLine = () => {
    let updatedPickupTimeData = pickUpTimeLineData.map((items) => {
      return{
        id:uuid.v4(),
        tip: items.tip,
        isSelected:0
      }
    })
    setPickUpTimeLineData(updatedPickupTimeData)
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
    deleteCartItem(item)
  };
  const handleSwipeOpen = (itemId) => {
    if (openItemId !== itemId) {
      if (openItemId !== null && swipeableRefs.current[openItemId]) {
        swipeableRefs.current[openItemId].close();
      }
      setOpenItemId(itemId);
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
    scrollViewRef
  };
};
