import { useEffect, useRef, useState } from 'react';
import { createContext,  useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postApiCall } from '@/source/utlis/api';
 
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
 
    const [modifierCartItemData , setModifierCartItemData] = useState([])
    const [selectedModifiers, setSelectedModifiers] = useState([]);
    const [selectedTime,setSelectedTime] = useState("")
    const [selectedLocation,setSelectedLocation] = useState("")
    const [isVisible, setIsVisible] = useState(false);
    const [priceLoader, setPriceLoader] = useState(false);
    const [updateOrAddTxt,setUpdateOrAddTxt] = useState("Add to Cart")
 
    const [addedModifierCartData , setAddedModifierCartData] = useState(null)
    const [isExitProfitCenter,setIsExitProfitCenter] = useState(false)
    const [isPrevCartScreen, setIsPrevCartScreen] = useState(false);
    const [selectedLocationId, setSelectedLocationId] = useState("");
    const [toastDetails,setToastDetails] = useState({isToastVisiable:false,toastMessage:""})
 
  
    const commentValue = useRef("")
    const modifiersData = useRef(null)
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
 
    const handleChangeState = () => {
      setIsSearchActive(!isSearchActive)
    }
 
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
            const modifiePrice = selectedModifiers.length === 1
            ? parseFloat(selectedModifiers[0].Price)
            : selectedModifiers?.reduce((total, modifier) => {
              return modifier.isChecked ? (total + parseFloat(modifier.Price)) : (total - parseFloat(modifier.Price));
            }, 0);
            updatedCartData = prevCartData.map((item) =>
              item.Item_ID === mealItemDetails.Item_ID ? { ...item, quantity: newQuantity,quantityIncPrice:(mealItemDetails.Price * newQuantity)+modifiePrice,basePrice :(mealItemDetails.Price * newQuantity)+modifiePrice } : item
            );
          }
          AsyncStorage.setItem("cart_data", JSON.stringify(updatedCartData));
          return updatedCartData;
        });
      } catch (error) {}
    };
 
    const updateCartItemQuantity2 = async (mealItemDetails, newQuantity) => {
      try {
        setCartData((prevCartData) => {
          let updatedCartData;
    
          if (newQuantity === 0) {
            updatedCartData = prevCartData.filter((item) => item.Item_ID !== mealItemDetails.ItemId);
          } else {
            const modifiePrice = selectedModifiers.length === 1
            ? parseFloat(selectedModifiers[0].Price)
            : selectedModifiers?.reduce((total, modifier) => {
              return modifier.isChecked ? (total + parseFloat(modifier.Price)) : (total - parseFloat(modifier.Price));
            }, 0);
            updatedCartData = prevCartData.map((item) =>
              item.Item_ID === mealItemDetails.ItemId ? { ...item, quantity: newQuantity,quantityIncPrice:(mealItemDetails.Price * newQuantity)+modifiePrice,basePrice :(mealItemDetails.Price * newQuantity)+modifiePrice } : item
            );
          }
          AsyncStorage.setItem("cart_data", JSON.stringify(updatedCartData));
          return updatedCartData;
        });
      } catch (error) {}
    };
    const deleteCartItem = async (mealItemDetails) => {
      let updatedCartData = cartData.filter((item) => item.Item_ID !== mealItemDetails.Item_ID);
     await AsyncStorage.setItem("cart_data", JSON.stringify(updatedCartData));
      setCartData(updatedCartData);
    };
 
    const increaseQuantity = (item) => {
      try {
        setModifierCartItemData((prevModifierCartItemData) => {
          const updatedModifierData = [...prevModifierCartItemData];
          const itemIndex = updatedModifierData?.findIndex((modifierItem) => modifierItem.Item_ID === item.Item_ID);
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
            const modifiePrice = selectedModifiers.length === 1
            ? parseFloat(selectedModifiers[0].Price)
            : selectedModifiers?.reduce((total, modifier) => {
              return modifier.isChecked ? (total + parseFloat(modifier.Price)) : (total - parseFloat(modifier.Price));
            }, 0);
            updatedCartData = prevCartData.map((item) =>
              item.Item_ID === mealItemDetails.Item_ID ? { ...item, quantity: newQuantity,quantityIncPrice:(mealItemDetails.Price * newQuantity)+modifiePrice,basePrice :(mealItemDetails.Price * newQuantity)+modifiePrice} : item
            );
           
          }
          const getCurrentItemDetails = updatedCartData?.find(
            (item) => item.Item_ID === singleItemDetails.Item_ID
          );
          singleModifierData.current = {
            quantity: getCurrentItemDetails?.quantity,
            quantityIncPrice: getCurrentItemDetails?.quantityIncPrice,
          };
          return updatedCartData;
        });
      } catch (error) {}
    };
    const updateModifierItemQuantity2 = async (mealItemDetails, newQuantity) => {
      try {
        setModifierCartItemData((prevCartData) => {
          let updatedCartData;
 
          if (newQuantity === 0) {
            updatedCartData = prevCartData.filter((item) => item.Item_ID !== mealItemDetails.ItemId);
          } else {
            const modifiePrice = selectedModifiers.length === 1
            ? parseFloat(selectedModifiers[0].Price)
            : selectedModifiers?.reduce((total, modifier) => {
              return modifier.isChecked ? (total + parseFloat(modifier.Price)) : (total - parseFloat(modifier.Price));
            }, 0);
            updatedCartData = prevCartData.map((item) =>
              item.Item_ID === mealItemDetails.ItemId ? { ...item, quantity: newQuantity,quantityIncPrice:(mealItemDetails.Price * newQuantity)+modifiePrice,basePrice :(mealItemDetails.Price * newQuantity)+modifiePrice} : item
            );
           
          }
          const getCurrentItemDetails = updatedCartData?.find(
            (item) => item.Item_ID === singleItemDetails.Item_ID
          );
          singleModifierData.current = {
            quantity: getCurrentItemDetails?.quantity,
            quantityIncPrice: getCurrentItemDetails?.quantityIncPrice,
          };
          return updatedCartData;
        });
      } catch (error) {}
    };
    const deleteModifierItem = (modifierItem) => {
      let updatedCartData = addedModifierCartData?.filter((item) => item.Item_ID !== modifierItem.Item_ID);
      setAddedModifierCartData(updatedCartData);
    };
 
  const addItemToModifierForCart = async (modifierItem) => {
    try {
      const existingCartData = await AsyncStorage.getItem("cart_data");
      const getProfitCenterItem = await AsyncStorage.getItem("profit_center");
      let getProfitCenterId = getProfitCenterItem !== null ? JSON.parse(getProfitCenterItem) : null;
  
      let prevCartItems = existingCartData ? JSON.parse(existingCartData) : [];
  
      const updatedModifierData = [...prevCartItems];
  
      updatedModifierData.push({
        ...modifierItem,
        quantity: singleModifierData.current.quantity,
        quantityIncPrice: singleModifierData.current.quantityIncPrice,
        comments: commentValue.current || "",
        selectedModifiers: modifiersData.current,
        profitCenterId: getProfitCenterId?.LocationId,
      });
    
      await AsyncStorage.setItem("cart_data", JSON.stringify(updatedModifierData));
      setFormFieldData("ItemModifier","","Comments","",false)
      setCartData(updatedModifierData);
      setTimeout(() => {
        formData.ItemModifier_Comments = ""
        setSelectedModifiers([])
        modifiersData.current= null
        singleModifierData.current = null
      }, 1000);
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };
  
  const updateModifierCartItem = async (updatedItem) => {
    try {
      if(modifiersResponseData?.Categories.length > 0){
        const existingCartData = await AsyncStorage.getItem("cart_data");
        const getProfitCenterItem = await AsyncStorage.getItem("profit_center");
        const getProfitCenterId = getProfitCenterItem ? JSON.parse(getProfitCenterItem) : null;
    
        const prevCartItems = existingCartData ? JSON.parse(existingCartData) : [];
        
        const updatedCartItems = prevCartItems.map((item) =>{
          if(item.Item_ID === updatedItem.Item_ID){
            return{
              ...item,
              comments: commentValue.current || "",
              selectedModifiers:[...item.selectedModifiers,...modifiersData.current],
              profitCenterId: getProfitCenterId?.LocationId
            }
          }else{
            return item
          }
        }
      );
    
        await AsyncStorage.setItem("cart_data", JSON.stringify(updatedCartItems));
        setFormFieldData("ItemModifier","","Comments","",false)
    
        setCartData(updatedCartItems);
        
        setTimeout(() => {
          formData.ItemModifier_Comments = "";
          setSelectedModifiers([]);
          closePreviewModal()
        }, 1000);
      }else{
        addItemToModifierForCart(singleItemDetails)
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };
  const updateWithoutModifierCartItem = async (updatedItem) => {
    const existingCartData = await AsyncStorage.getItem("cart_data");
    const getProfitCenterItem = await AsyncStorage.getItem("profit_center");
    const getProfitCenterId = getProfitCenterItem
      ? JSON.parse(getProfitCenterItem)
      : null;
 
    const prevCartItems = existingCartData ? JSON.parse(existingCartData) : [];
    const updatedCartItems = prevCartItems.map((item) => {
      if (item.Item_ID === updatedItem.Item_ID) {
        return {
          ...item,
          comments: commentValue.current || "",
          profitCenterId: getProfitCenterId?.LocationId,
          quantity: singleModifierData?.current?.quantity,
          quantityIncPrice:singleModifierData?.current?.quantityIncPrice,
        };
      } else {
        return item;
      }
    });
 
    await AsyncStorage.setItem("cart_data", JSON.stringify(updatedCartItems));
    setCartData(updatedCartItems);
    setFormFieldData("ItemModifier", "", "Comments", "", false);
 
    setTimeout(() => {
      formData.ItemModifier_Comments = "";
      closePreviewModal();
      singleModifierData.current = null
    }, 500);
  };
 
  const storeSingleItem = (item) => {
    setSingleItemDetails(item)
  }
  const closePreviewModal = () => {
    setItemDataVisible(!itemDataVisible)
  }
  const removeCartItems = async() => {
    await AsyncStorage.removeItem("cart_data");
    setCartData([])
    setModifierCartItemData([])
  }
    
    const initialValues = {
      getFormFieldData,
      setFormFieldData,
      setMealType,
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
      increaseQuantity,
      modifierCartItemData,
      updateModifierItemQuantity,
      selectedModifiers,
      setSelectedModifiers,
      selectedTime,
      setSelectedTime,
      AppConfigJson,
      getParticularControls,
      selectedLocation,
      setSelectedLocation,
      addItemToModifierForCart,
      addedModifierCartData,
      commentValue,
      deleteModifierItem,
      setMenuOrderData,
      menuOrderData,
      setModifiersResponseData,
      modifiersResponseData,
      setIsVisible,
      isVisible,
      priceLoader,
      selectedModifiers,
      setCartData,
      setModifierCartItemData,
      modifiersData,
      singleModifierData,
      setUpdateOrAddTxt,
      updateOrAddTxt,
      updateModifierCartItem,
      isExitProfitCenter,setIsExitProfitCenter,
      updateWithoutModifierCartItem,
      updateModifierItemQuantity2,
      updateCartItemQuantity2,
      removeCartItems,
      setIsPrevCartScreen,
      isPrevCartScreen,
      selectedLocationId,
      setSelectedLocationId,
      toastDetails,
      setToastDetails
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
   
  export const handleClearClick = (setState, onSearch) => {
    setState({ searchValue: "" });
  
    // Reset the list to default items
    if (onSearch) {
      onSearch(""); // Trigger parent function to reset the list
    }
  };
   
  export const handleCloseClick = (setState, onSearchActivate, handleClear, onBackPress) => {
    setState({ showSearchInput: false, searchValue: "" }, () => {
      // Blur input to stop typing
      if (setState.inputRef?.current) {
        setState.inputRef.current.blur();
      }
      
      // Reset the list by calling handleClear or directly setting empty search
      if (handleClear) {
        handleClear();
      } else if (onSearchActivate) {
        onSearchActivate(false);
      }
  
      // Call onBackPress to restore the default item list
      if (onBackPress) {
        onBackPress();
      }
    });
  };