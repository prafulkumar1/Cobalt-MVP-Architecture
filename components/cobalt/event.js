import { foodOrderData,ModifiersData } from '@/source/constants/commonData';
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
    const [itemDataVisible, setItemDataVisible] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [cartData, setCartData] = useState(null)
    const [isCategoryEmpty, setIsCategoryEmpty] = useState(false)
    const [singleItemDetails, setSingleItemDetails] = useState(null)
    const [modifierData,setModifierData] = useState(ModifiersData)
    const [modifierCartItemData , setModifierCartItemData] = useState(null)
    const [selectedModifiers, setSelectedModifiers] = useState([]);
    const [modifierCart,setModifierCart] = useState([])
    const [selectedTime,setSelectedTime] = useState("7:30 AM")
    const [currentSelectedVal , setCurrentSelectedVal] = useState("")
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

    const setMealType = (id,IsEnabled) => {
      if(IsEnabled===1){
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
      
        let isCategoryEmptyFlag = false;
        updatedMealType.forEach((items) => {
          if (items.IsSelect === 1 && items.Categories.length === 0) {
            isCategoryEmptyFlag = true; 
          }
        });
        setIsCategoryEmpty(isCategoryEmptyFlag);
        setMenuOrderData(foodMenuList);
      }
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

    const getModifierData =async () => {
      try {
        const modifierDataItem = await AsyncStorage.getItem("modifier_data")
        if (modifierDataItem !== null) {
          setModifierCartItemData(JSON.parse(modifierDataItem))
          setModifierCart(JSON.parse(modifierDataItem))
        } else {
          setModifierCartItemData([])
          setModifierCart([])
        }
      } catch (error) {}
    };

    useEffect(() => {
      getCartData()
      getModifierData()
    },[])

    const addItemToCartBtn = async (data) => {
      try {
        setCartData((prevCartData) => {
          let updatedCartData = [...prevCartData];
          const itemIndex = updatedCartData.findIndex((item) => item.Item_Id === data.Item_Id);
          if (itemIndex !== -1) {
            updatedCartData[itemIndex].quantity += 1;
            updatedCartData[itemIndex].quantityIncPrice +=  data.Price
          } else {
            updatedCartData.push({ ...data, quantity: 1,quantityIncPrice:data.Price });
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
              item.Item_Id === mealItemDetails.Item_Id ? { ...item, quantity: newQuantity,quantityIncPrice:mealItemDetails.Price * newQuantity } : item
            );
          }
          AsyncStorage.setItem("cart_data", JSON.stringify(updatedCartData));
          return updatedCartData;
        });
      } catch (error) {}
    };

    const closePreviewModal = () => {
      setItemDataVisible(!itemDataVisible)
    }
    const deleteCartItem = (mealItemDetails) => {
      let updatedCartData = cartData.filter((item) => item.Item_Id !== mealItemDetails.Item_Id);
      setCartData(updatedCartData);
      AsyncStorage.setItem("cart_data", JSON.stringify(updatedCartData));
    };

    const deleteItemModifierItem = async (mealItemDetails) => {
      let updatedCartData = modifierCartItemData.filter((item) => item.Item_Id !==mealItemDetails.Item_Id)
      setModifierCartItemData(updatedCartData)
    }

    const removeValue = async () => {
      try {
        await AsyncStorage.removeItem('modifier_data')
      } catch(e) {
        // remove error
      }
    
      console.log('Done.')
    }

    const storeSingleItem = (item) => {
      setSingleItemDetails(item)
    }
    const increaseQuantity = (item,isAddToCartClick) => {
      try {
        setModifierCartItemData((prevModifierCartItemData) => {
          const updatedModifierData = [...prevModifierCartItemData];
          const itemIndex = updatedModifierData.findIndex((modifierItem) => modifierItem.Item_Id === item.Item_Id);
          if (itemIndex !== -1) {
            updatedModifierData[itemIndex].quantity += 1;
            updatedModifierData[itemIndex].quantityIncPrice = updatedModifierData[itemIndex].Price * updatedModifierData[itemIndex].quantity;
          } else {
            updatedModifierData.push({ ...item, quantity: 1, quantityIncPrice: item.Price });
          }
          if(isAddToCartClick){
          AsyncStorage.setItem("modifier_data", JSON.stringify(updatedModifierData));
          }
          return updatedModifierData;
        });
      } catch (error) {
        console.error("Error updating cart item:", error);
      }
    };
    

    const updateModifierItemQuantity = async (mealItemDetails, newQuantity) => {
      try {
        setModifierCartItemData((prevCartData) => {
          let updatedCartData;
    
          if (newQuantity === 0) {
            updatedCartData = prevCartData.filter((item) => item.Item_Id !== mealItemDetails.Item_Id);
          } else {
            updatedCartData = prevCartData.map((item) =>
              item.Item_Id === mealItemDetails.Item_Id ? { ...item, quantity: newQuantity,quantityIncPrice:mealItemDetails.Price * newQuantity } : item
            );
           
          }
          return updatedCartData;
        });
      } catch (error) {}
    };

    const getAllSelectedModifiers = (modifiers, itemName) => {    
      setCurrentSelectedVal(itemName)
      setSelectedModifiers((prevState) => {
          let updatedModifiers = [...prevState];
  
          if (modifiers.isChecked) {
              updatedModifiers = updatedModifiers.filter(mod => mod.modifier !== modifiers.modifier);
              updatedModifiers.push(modifiers);
          } else {
              updatedModifiers = updatedModifiers.filter(mod => mod.modifier !== modifiers.modifier);
          }
          return updatedModifiers;
      });
  };

    const calculateTotalPrice = () => {
      let requiredVal = 0;
  
      selectedModifiers.forEach((items) => {
          if (items.isMaxAllowedOne && items.modifier === currentSelectedVal) {
              requiredVal = items.price;
          }
      });
  
      const modifiersTotal = selectedModifiers
          ?.filter((items) => !items.isMaxAllowedOne)
          ?.reduce((total, modifier) => {
              return modifier.isChecked ? total + modifier.price : total;
          }, 0);
  
      let finalValue = modifiersTotal + requiredVal;
  
      let updatedModifierData = modifierCartItemData?.map((items) => {
          const basePrice = items.basePrice ?? items.quantityIncPrice;
  
          return {
              ...items,
              basePrice: basePrice,
              quantityIncPrice: (Number(basePrice) || 0) + finalValue
          };
      });
  
      setModifierCartItemData(updatedModifierData);
  };
  
  useEffect(() => {
      setModifierCartItemData((prevData) =>
          prevData?.map((item) => ({
              ...item,
              basePrice: item.basePrice ?? (item.quantityIncPrice || 0)
          }))
      );
  }, []);
  
  useEffect(() => {
      calculateTotalPrice();
  }, [selectedModifiers]);
    
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
      cartData,
      isCategoryEmpty,
      itemDataVisible,
      closePreviewModal,
      deleteCartItem,
      storeSingleItem,
      singleItemDetails,
      modifierData,
      increaseQuantity,
      modifierCartItemData,
      updateModifierItemQuantity,
      deleteItemModifierItem,
      getAllSelectedModifiers,
      selectedModifiers,
      setSelectedModifiers,
      calculateTotalPrice,
      modifierCart,
      selectedTime,
      setSelectedTime
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

export const handleCheckboxToggle = (modifierIndex, itemIndex, isMaxAllowedOne, isRequired) => {
  this.setState((prevState) => {
    const updatedModifiers = { ...prevState.selectedModifiers };

    if (isMaxAllowedOne) {
  
      updatedModifiers[modifierIndex] = itemIndex;
    } else {
      
      updatedModifiers[modifierIndex] = updatedModifiers[modifierIndex] || [];
      
      if (updatedModifiers[modifierIndex].includes(itemIndex)) {
     
        updatedModifiers[modifierIndex] = updatedModifiers[modifierIndex].filter(
          (i) => i !== itemIndex
        );

       
        if (isRequired && updatedModifiers[modifierIndex].length === 0) {
          return prevState; 
        }
      } else {
       
        updatedModifiers[modifierIndex].push(itemIndex);
      }
    }

    return { selectedModifiers: updatedModifiers };
  });
};
