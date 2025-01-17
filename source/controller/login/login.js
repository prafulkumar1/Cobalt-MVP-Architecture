import { useState,useContext } from 'react';
import { useFormContextProvider,useFormContext } from '@/components/cobalt/event';
const pageId='Login';
export const useLoginLogic = () => {
    
    const {getFormFieldData,setFormFieldData }= useFormContext();
   
  // const handleValidation = () => {
       
  //     if(!getFormFieldData(pageId,"username") && !getFormFieldData(pageId,"password"))
  //     {
  //       alert("Please give login Creditianls");
  //     }
  //    else{
  //     alert("success");
  //    }
  // };
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
    //const checkarray=getFormFieldData(pageId, 'username');
    if (!passwordField.value) {
      setFormFieldData(pageId, 'input', 'password', passwordField.value, true);
      isValid = false;
    } else {
      setFormFieldData(pageId, 'input', 'password', passwordField.value, false);
    }
  
    return isValid;
  };
  

  const handleLogin = () => {
   
  if (handleValidation()) {
     alert('Login successful');
    } 
  };

  return {
    handleLogin,
  };
};
