import { foodOrderData } from '@/source/constants/commonData';
import { Children, useState } from 'react';
import { createContext,  useContext } from 'react';

export const FormContext = createContext(); 

export const useFormContext = () => {
    return useContext(FormContext);
  };

export const UseFormContextProvider = ({children}) => {

    const [formData, setFormData] = useState({});
    const [menuOrderData,setMenuOrderData] = useState(foodOrderData)
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
    
    return(
        <FormContext.Provider value={{getFormFieldData,setFormFieldData,menuOrderData,setMealType,setMealCategory}}>
            {children}
            </FormContext.Provider>
    );
    
  };
 
  UseFormContextProvider.displayName='UseFormContextProvider';