import { ModifiersData } from '@/source/constants/commonData';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createContext,  useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postApiCall } from '@/source/utlis/api';
import { Alert } from 'react-native';
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

export const transformStyles = (styles) => {
  if (!styles || typeof styles !== "object") return {};

  // Helper function to apply responsiveWidth and responsiveHeight
  const applyResponsive = (styleObj) => {
    if (!styleObj || typeof styleObj !== "object") return styleObj;

    return Object.keys(styleObj).reduce((acc, key) => {
      const value = styleObj[key];

      if (typeof value === "string") {
        if (value.startsWith("responsiveWidth")) {
          const num = parseFloat(value.match(/\d+/)?.[0]); // Extract number
          acc[key] = isNaN(num) ? value : responsiveWidth(num);
        } else if (value.startsWith("responsiveHeight")) {
          const num = parseFloat(value.match(/\d+/)?.[0]); // Extract number
          acc[key] = isNaN(num) ? value : responsiveHeight(num);
        } else {
          acc[key] = value;
        }
      } else {
        acc[key] = value;
      }

      return acc;
    }, {});
  };

  // Process multiple style objects while maintaining class names
  return Object.fromEntries(
    Object.entries(styles).map(([className, styleObject]) => [className, applyResponsive(styleObject)])
  );
};



export const FormContext = createContext(); 

export const useFormContext = () => {
    return useContext(FormContext);
  };

export const UseFormContextProvider = ({children}) => {
  const [AppConfigJson , setAppConfigJsonData] = useState(null);

    
    const [menuOrderData,setMenuOrderData] = useState(null)
    const [modifiersResponseData,setModifiersResponseData] = useState(null)
    const [formData, setFormData] = useState({});
    const [itemDataVisible, setItemDataVisible] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [cartData, setCartData] = useState(null)
    const [isCategoryEmpty, setIsCategoryEmpty] = useState(false)
    const [singleItemDetails, setSingleItemDetails] = useState(null)
    const [modifierData,setModifierData] = useState(ModifiersData)
    const [modifierCartItemData , setModifierCartItemData] = useState([])
    const [selectedModifiers, setSelectedModifiers] = useState([]);
    const [selectedTime,setSelectedTime] = useState("7:30 AM")
    const [selectedLocation,setSelectedLocation] = useState("IT DepartMent")
    const [currentSelectedVal , setCurrentSelectedVal] = useState("")
    const [isVisible, setIsVisible] = useState(false);

    const [addedModifierCartData , setAddedModifierCartData] = useState(null)

    const modifiersData = useRef(null)
    const commentValue = useRef("")
    const singleModifierData = useRef(null)

    useEffect(() => {
      if(formData.ItemModifier_Comments){
        commentValue.current = formData.ItemModifier_Comments?.value
      }
    },[formData])
    useEffect(() => {
      getConfigurations();
    }, []);

       
    const getConfigurations = async () => {
      let AppConfigJsonData = await postApiCall("UI_CONFIGURATIONS", "GET_UI_CONFIGURATIONS", {});
      if (AppConfigJsonData.statusCode === 200) {
        setAppConfigJsonData(AppConfigJsonData?.response?.Data);
      }    
    };

    const getParticularControls = (PageId) =>{
    }
  
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
            IsSelect: updatedCategoryData.length >0 && items.MealPeriod_Id === id ? 1 : 0,
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
        const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
        let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
        if (value !== null) {
          const parseData = typeof value == "string" ? JSON.parse(value) : value
          let cartItems = parseData?.filter((item) => item.profitCenterId === getProfitCenterId.LocationId)
          setCartData(cartItems)
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
      const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
      let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
      setCartData((prevCartData) => {
        let updatedCartData = [...prevCartData];
        updatedCartData.push({ ...data, quantity: 1, quantityIncPrice: data.Price, profitCenterId: getProfitCenterId.LocationId });
        AsyncStorage.setItem("cart_data", JSON.stringify(updatedCartData));
        return updatedCartData;
      });
    } catch (error) { }
  };

    const updateCartItemQuantity = async (mealItemDetails, newQuantity) => {
      try {
        setCartData((prevCartData) => {
          let updatedCartData;
    
          if (newQuantity === 0) {
            updatedCartData = prevCartData.filter((item) => item.Item_ID !== mealItemDetails.Item_ID);
          } else {
            updatedCartData = prevCartData.map((item) =>
              item.Item_ID === mealItemDetails.Item_ID ? { ...item, quantity: newQuantity,quantityIncPrice:mealItemDetails.Price * newQuantity } : item
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
      let updatedCartData = cartData.filter((item) => item.Item_ID !== mealItemDetails.Item_ID);
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
          const itemIndex = updatedModifierData.findIndex((modifierItem) => modifierItem.Item_ID === item.Item_ID);
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
            updatedCartData = prevCartData.filter((item) => item.Item_ID !== mealItemDetails.Item_ID);
          } else {
            updatedCartData = prevCartData.map((item) =>
              item.Item_ID === mealItemDetails.Item_ID ? { ...item, quantity: newQuantity,quantityIncPrice:mealItemDetails.Price * newQuantity } : item
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
      const getCurrentItemDetails = updatedModifierData.find((item) => item.Item_ID === singleItemDetails.Item_ID)
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
          updatedCartData = prevCartData.filter((item) => item.Item_ID !== mealItemDetails.Item_ID);
        } else {
          updatedCartData = prevCartData.map((item) =>
            item.Item_ID === mealItemDetails.Item_ID ? { ...item, quantity: newQuantity,quantityIncPrice:mealItemDetails.Price * newQuantity } : item
          );
         
        }
        AsyncStorage.setItem("modifier_data", JSON.stringify(updatedCartData));
        return updatedCartData;
      });
    } catch (error) {}
  };

  const deleteModifierItem = (modifierItem) => {
    let updatedCartData = addedModifierCartData?.filter((item) => item.Item_ID !== modifierItem.Item_ID);
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
      AppConfigJson,
      getParticularControls,
      selectedLocation,
      setSelectedLocation,
      addItemToModifierForCart,
      addedModifierCartData,
      getCartData,
      getModifierData,
      commentValue,
      updateModiferItemData,
      deleteModifierItem,
      setMenuOrderData,
      menuOrderData,
      setModifiersResponseData,
      modifiersResponseData,
      setIsVisible,
      isVisible
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