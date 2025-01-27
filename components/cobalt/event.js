import { foodOrderData } from '@/source/constants/commonData';
import { Children, useState } from 'react';
import { createContext,  useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const FormContext = createContext(); 

export const useFormContext = () => {
    return useContext(FormContext);
  };

export const UseFormContextProvider = ({children}) => {

    const [formData, setFormData] = useState({});
    const [menuOrderData,setMenuOrderData] = useState(foodOrderData)
    const [isSearchActive, setIsSearchActive] = useState(false);
    // const setFormFieldData = (formId,controlType,controlId,controlValue,isInvalid) => {
    //      setFormData({...formData,[formId + '_' + controlId]: {
    //       value: controlValue,
    //       ...(isInvalid !== null && { isInvalid }), // Conditionally add or update `isInvalid`
    //     },
    //    });
    //  };
    const setFormFieldData = (formId, controlType, controlId, controlValue, isInvalid) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [formId + '_' + controlId]: {
          value: controlValue,
          isInvalid: isInvalid ?? false, 
        },
      }));
    };
    
    const getFormFieldData = (formId, controlId) => {
      return formData[formId + '_' + controlId] || { value: '', isInvalid: false };
    };

    const setMealType = (id) => {
      const updatedMealType = menuOrderData.MenuItems.map((items) => {
        return {
          ...items,
          IsSelect: items.MealPeriod_Id === id?1:0,
        }
      });
    
      const foodMenuList = {
        ...menuOrderData,
        MenuItems: updatedMealType,
      };
      setMenuOrderData(foodMenuList);
    };

    const setMealCategory = (id) => {
      const updatedMealCategory = menuOrderData.MenuItems.map((items) => ({
       ...items,
        Categories: items.Categories.map((category) => ({
         ...category,
         IsSelect: category.Category_Id === id ? 1:0,
        })),
      }));
      const foodMenuList = {
       ...menuOrderData,
       MenuItems: updatedMealCategory,
      };
      setMenuOrderData(foodMenuList)
    }

    const handleChangeState = () => {
      setIsSearchActive(!isSearchActive)
    }
    removeValue = async () => {
      try {
        await AsyncStorage.removeItem('cart_data')
        
      } catch(e) {
      }

    }

    const addItemToCartBtn = async(data,cartData) => {
      // console.log(data,cartData,"====>datatattatata")
      // if(cartData === null){
      //   try {
      //     const jsonValue = JSON.stringify([...cartData,{...data,quantity:1}]);
      //     await AsyncStorage.setItem('cart_data', jsonValue);
      //   } catch (e) {
      //     // saving error
      //   }
      // }else{
      //   // let getStorageData = await AsyncStorage.getItem("cart_data")
      //   // if(getStorageData !==null){
      //   //   let updatedData = getStorageData.find((items) => items.Item_Id === data.Item_Id)
          
      //   // }
      // }
     
    }
    
    
    return(
        <FormContext.Provider value={{getFormFieldData,setFormFieldData,menuOrderData,setMealType,setMealCategory,isSearchActive,handleChangeState,addItemToCartBtn}}>
            {children}
            </FormContext.Provider>
    );
    
  };
  
  UseFormContextProvider.displayName='UseFormContextProvider';



  // searchHandlers.js
export const handleSearchClick = (setState, onSearchActivate) => {
  setState({ showSearchInput: true });
  if (onSearchActivate) {
    onSearchActivate(true);
  }
};

export const handleClearClick = (setState, searchValue, onSearchActivate) => {
  if (searchValue.trim()) {
    // Clear the input field if text is present
    setState({ searchValue: "" });
  } else {
    // Close the search box if no text
    setState({ showSearchInput: false });
    if (onSearchActivate) {
      onSearchActivate(false);
    }
  }
};

export const handleCloseClick = (setState, onSearchActivate) => {
  setState({ showSearchInput: false, searchValue: "" });
  if (onSearchActivate) {
    onSearchActivate(false);
  }
};
