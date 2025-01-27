import { foodOrderData } from '@/source/constants/commonData';
import { useEffect, useState } from 'react';
import { createContext,  useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FormContext = createContext(); 

export const useFormContext = () => {
    return useContext(FormContext);
  };

export const UseFormContextProvider = ({children}) => {

    const [formData, setFormData] = useState({});
    const [menuOrderData,setMenuOrderData] = useState(foodOrderData)
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [cartData, setCartData] = useState(null)
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
      const updatedMealType = menuOrderData.MenuItems.map((items) => ({
        ...items,
        IsSelect: items.MealPeriod_Id === id ? 1 : 0,
        Categories: items.Categories.map((category, index) => ({
          ...category,
          IsSelect: items.MealPeriod_Id === id && index === 0 ? 1 : 0,
        })),
      }));
    
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
    const getCartData = async () => {
      try {
        const value = await AsyncStorage.getItem('cart_data');
        if (value !== null) {
          setCartData(JSON.parse(value))
        } else {
          setCartData([])
        }
      } catch (error) {}
    };

    useEffect(() => {
      getCartData()
    },[])

    const addItemToCartBtn = async (data) => {
      try {
        setCartData((prevCartData) => {
          let updatedCartData = [...prevCartData];
          const itemIndex = updatedCartData.findIndex((item) => item.Item_Id === data.Item_Id);
    
          if (itemIndex !== -1) {
            updatedCartData[itemIndex].quantity += 1;
          } else {
            updatedCartData.push({ ...data, quantity: 1 });
          }
    
          AsyncStorage.setItem("cart_data", JSON.stringify(updatedCartData));
          return updatedCartData;
        });
      } catch (error) {}
    };

    const updateCartItemQuantity = async (mealItemDetails, newQuantity) => {
      try {
        setCartData((prevCartData) => {
          let updatedCartData;
    
          if (newQuantity === 0) {
            updatedCartData = prevCartData.filter((item) => item.Item_Id !== mealItemDetails.Item_Id);
          } else {
            updatedCartData = prevCartData.map((item) =>
              item.Item_Id === mealItemDetails.Item_Id ? { ...item, quantity: newQuantity } : item
            );
          }
    
          AsyncStorage.setItem("cart_data", JSON.stringify(updatedCartData));
          return updatedCartData;
        });
      } catch (error) {}
    };
    const initialValues = {
      getFormFieldData,
      setFormFieldData,
      menuOrderData,
      setMealType,
      setMealCategory,
      isSearchActive,
      handleChangeState,
      addItemToCartBtn,
      updateCartItemQuantity,
      cartData
    }
    return (
      <FormContext.Provider
        value={initialValues}
      >
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
