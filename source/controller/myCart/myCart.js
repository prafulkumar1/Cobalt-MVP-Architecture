import {useFormContext } from '@/components/cobalt/event';
import { navigateToScreen } from '@/source/constants/Navigations';
import { additionalTipData } from '@/source/constants/commonData';
import { useState } from 'react';
const pageId='MyCart';
export const useMyCartLogic = () => {

    const {getFormFieldData,setFormFieldData }= useFormContext(); 
    const [tipData,setTipData] = useState(additionalTipData)

  return {
    tipData,
  };
};
