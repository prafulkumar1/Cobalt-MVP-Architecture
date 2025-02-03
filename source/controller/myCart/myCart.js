import {useFormContext } from '@/components/cobalt/event';
import { navigateToScreen } from '@/source/constants/Navigations';
import {  cartConfigResponseData } from '@/source/constants/commonData';
import uuid from "react-native-uuid";
import { useEffect, useRef, useState } from 'react';
const pageId='MyCart';
export const useMyCartLogic = () => {
    const swipeableRefs = useRef({});

    const {deleteCartItem }= useFormContext(); 
    const [tipData,setTipData] = useState(cartConfigResponseData.Tip)
    const [cartConfigData,setCartCofigData] = useState(cartConfigResponseData)
    const [value,setValue]  =useState(0)
    const [openItemId, setOpenItemId] = useState(null);
    const [isTimeModalSelected,setIsTimeModalSelected] = useState(false)

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
    changeTime
  };
};
