import {useFormContext } from '@/components/cobalt/event';
import { navigateToScreen } from '@/source/constants/Navigations';
import { additionalTipData } from '@/source/constants/commonData';
import { useRef, useState } from 'react';
const pageId='MyCart';
export const useMyCartLogic = () => {
    const swipeableRefs = useRef({});

    const {getFormFieldData,setFormFieldData }= useFormContext(); 
    const [tipData,setTipData] = useState(additionalTipData)
    const [value,setValue]  =useState(0)
    const [openItemId, setOpenItemId] = useState(null);

  return {
    tipData,
    value,
    setValue,
    openItemId,
    setOpenItemId,
    swipeableRefs
  };
};
