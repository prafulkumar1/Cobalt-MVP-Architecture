import { useRef, useState } from 'react';
import { useFormContext } from '@/components/cobalt/event';
const pageId='MenuOrder';
export const useMenuOrderLogic = () => {
  const categoryRef = useRef(null)
  const [isRecentOrderOpen,setIsRecentOrderOpen] = useState(false)
    const { }= useFormContext();  

    const scrollToLast = () => {
      categoryRef.current?.scrollToEnd({ animated: true });
    };
  
    const scrollToFirst = () => {
      categoryRef.current?.scrollTo({ x: 0, animated: true });
    };

    const openRecentOrder = () => {
      setIsRecentOrderOpen(!isRecentOrderOpen)
    }
  return {
    categoryRef,
    scrollToLast,
    scrollToFirst,
    isRecentOrderOpen,
    openRecentOrder
  };
};
