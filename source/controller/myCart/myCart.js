import {useFormContext } from '@/components/cobalt/event';
import { navigateToScreen } from '@/source/constants/Navigations';
const pageId='MyCart';
export const useMyCartLogic = () => {

    const {getFormFieldData,setFormFieldData }= useFormContext(); 

  const handleLogin = (props) => {
    navigateToScreen(props,"MenuOrder",true)
  };

  return {
    handleLogin,
  };
};
