import {useFormContext } from '@/components/cobalt/event';
import { navigateToScreen } from '@/source/constants/Navigations';
const pageId='Login';
export const useLoginLogic = () => {

    const {getFormFieldData,setFormFieldData }= useFormContext();
   
  const handleValidation = () => {
    const usernameField = getFormFieldData(pageId, 'username');
    const passwordField = getFormFieldData(pageId, 'password');
  
    let isValid = true;
  
    if (!usernameField.value) {
      setFormFieldData(pageId, 'input', 'username', usernameField.value, true);
      isValid = false;
    } else {
      setFormFieldData(pageId, 'input', 'username', usernameField.value, false);
    }
    if (!passwordField.value) {
      setFormFieldData(pageId, 'input', 'password', passwordField.value, true);
      isValid = false;
    } else {
      setFormFieldData(pageId, 'input', 'password', passwordField.value, false);
    }
  
    return isValid;
  };
  

  const handleLogin = (props) => {
  
    navigateToScreen(props,"MenuOrder",true)
  };

  return {
    handleLogin,
  };
};
