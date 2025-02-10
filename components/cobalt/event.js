import { ModifiersData } from '@/source/constants/commonData';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createContext,  useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const FormContext = createContext(); 

export const useFormContext = () => {
    return useContext(FormContext);
  };

export const UseFormContextProvider = ({children}) => {
    
    const [formData, setFormData] = useState({});
    const [menuOrderData,setMenuOrderData] = useState(null)
    const [itemDataVisible, setItemDataVisible] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [cartData, setCartData] = useState(null)
    const [isCategoryEmpty, setIsCategoryEmpty] = useState(false)
    const [singleItemDetails, setSingleItemDetails] = useState(null)
    const [modifierData,setModifierData] = useState(ModifiersData)
    const [modifierCartItemData , setModifierCartItemData] = useState([])
    const [selectedModifiers, setSelectedModifiers] = useState([]);
    const [selectedTime,setSelectedTime] = useState("7:30 AM")
    const [currentSelectedVal , setCurrentSelectedVal] = useState("")

    const [addedModifierCartData , setAddedModifierCartData] = useState(null)

    const modifiersData = useRef(null)
    const commentValue = useRef("")
    const singleModifierData = useRef(null)

    useEffect(() => {
      if(formData.ItemModifier_Comments){
        commentValue.current = formData.ItemModifier_Comments?.value
      }
    },[formData])
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
        const updatedMealType = menuOrderData.MenuItems.map((items) => {
          let updatedCategoryData =  typeof items.Categories === 'string' ? JSON.parse(items.Categories) : items.Categories;
          return{
            ...items,
            IsSelect: items.MealPeriod_Id === id ? 1 : 0,
            Categories: updatedCategoryData.map((category, index) => ({
              ...category,
              IsSelect: items.MealPeriod_Id === id && index === 0 ? 1 : 0,
            })),
          }
        });
      
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
      const updatedMealCategory = menuOrderData.MenuItems.map((items) => {
        let updatedCategoryData =  typeof items.Categories === 'string' ? JSON.parse(items.Categories) : items.Categories;
        return{
          ...items,
           Categories: updatedCategoryData.map((category) => ({
            ...category,
            IsSelect: category.Category_ID === id ? 1:0,
           })),
         }
      });
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
          setAddedModifierCartData(JSON.parse(modifierDataItem))
          setModifierCartItemData(JSON.parse(modifierDataItem))
        } else {
          setAddedModifierCartData([])
          setModifierCartItemData([])
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
          // if (itemIndex !== -1) {
          //   updatedCartData[itemIndex].quantity += 1;
          //   updatedCartData[itemIndex].quantityIncPrice +=  data.Price
          // } else {
            updatedCartData.push({ ...data, quantity: 1,quantityIncPrice:data.Price });
          //}    
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

    const storeSingleItem = (item) => {
      setSingleItemDetails(item)
    }
    const increaseQuantity = (item) => {
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
          AsyncStorage.setItem("modifier_data", JSON.stringify(updatedCartData));
          updateModiferItemData(mealItemDetails, newQuantity)
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
      const getCurrentItemDetails = updatedModifierData.find((item) => item.Item_Id === singleItemDetails.Item_Id)
      singleModifierData.current = {quantity:getCurrentItemDetails?.quantity,quantityIncPrice:getCurrentItemDetails?.quantityIncPrice}
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
      modifiersData.current = selectedModifiers
  }, [selectedModifiers]);

  const addItemToModifierForCart = useCallback((modifierItem) => {
    try {
      if (modifiersData.current.length === 0) {
        Alert.alert("Sorry", "Please select the modifiers")
      } else {
        setAddedModifierCartData((prevModifierCartItemData) => {
          const updatedModifierData = [...prevModifierCartItemData];
          updatedModifierData.push({
            ...modifierItem,
            quantity: singleModifierData.current.quantity,
            quantityIncPrice: singleModifierData.current.quantityIncPrice,
            comments: commentValue.current || "",
            selectedModifiers: modifiersData.current
          });

          AsyncStorage.setItem("modifier_data", JSON.stringify(updatedModifierData));
          setTimeout(() => {
            setSelectedModifiers([])
            modifiersData.current = null
          }, 1000);
          return updatedModifierData;
        });
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  }, []);

  const updateModiferItemData = async (mealItemDetails, newQuantity) => {
    try {
      setAddedModifierCartData((prevCartData) => {
        let updatedCartData;
  
        if (newQuantity === 0) {
          updatedCartData = prevCartData.filter((item) => item.Item_Id !== mealItemDetails.Item_Id);
        } else {
          updatedCartData = prevCartData.map((item) =>
            item.Item_Id === mealItemDetails.Item_Id ? { ...item, quantity: newQuantity,quantityIncPrice:mealItemDetails.Price * newQuantity } : item
          );
         
        }
        AsyncStorage.setItem("modifier_data", JSON.stringify(updatedCartData));
        return updatedCartData;
      });
    } catch (error) {}
  };

  const deleteModifierItem = (modifierItem) => {
    let updatedCartData = addedModifierCartData?.filter((item) => item.Item_Id !== modifierItem.Item_Id);
    setAddedModifierCartData(updatedCartData);
    AsyncStorage.setItem("modifier_data", JSON.stringify(updatedCartData));
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
      getAllSelectedModifiers,
      selectedModifiers,
      setSelectedModifiers,
      calculateTotalPrice,
      selectedTime,
      setSelectedTime,
      addItemToModifierForCart,
      addedModifierCartData,
      getCartData,
      getModifierData,
      commentValue,
      updateModiferItemData,
      deleteModifierItem,
      setMenuOrderData,
      menuOrderData
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

export const handleSearchClick = (setState, onSearchActivate) => {
  setState({ showSearchInput: true });
  if (onSearchActivate) {
    onSearchActivate(true);
  }
};

export const handleClearClick = (setState, searchValue, onSearchActivate) => {
  if (searchValue.trim()) {
    setState({ searchValue: "" });
  } else {
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