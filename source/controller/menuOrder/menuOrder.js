import { useRef } from 'react';
import { useFormContext } from '@/components/cobalt/event';
const pageId='MenuOrder';
export const useMenuOrderLogic = () => {
  const categoryRef = useRef(null)
    const { }= useFormContext();  

    const scrollToLast = () => {
      categoryRef.current?.scrollToEnd({ animated: true });
    };
  
    const scrollToFirst = () => {
      categoryRef.current?.scrollTo({ x: 0, animated: true });
    };
  return {
    categoryRef,
    scrollToLast,
    scrollToFirst
  };
};
