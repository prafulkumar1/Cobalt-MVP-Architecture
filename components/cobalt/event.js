import { useEffect, useRef, useState } from 'react';
import { createContext,  useContext } from 'react';
import { NativeModules } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";

export const transformStyles = (styles) => {
  if (!styles || typeof styles !== "object") return {};

  const applyResponsive = (styleObj) => {
    if (!styleObj || typeof styleObj !== "object") return styleObj;

    return Object.keys(styleObj).reduce((acc, key) => {
      const value = styleObj[key];

      if (typeof value === "string") {
        const widthMatch = value.match(/^responsiveWidth\(([\d.]+)\)$/);
        const heightMatch = value.match(/^responsiveHeight\(([\d.]+)\)$/);

        if (widthMatch) {
          const num = parseFloat(widthMatch[1]); // Extract number from parentheses
          acc[key] = isNaN(num) ? value : responsiveWidth(num);
        } else if (heightMatch) {
          const num = parseFloat(heightMatch[1]); // Extract number from parentheses
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

  return Object.fromEntries(
    Object.entries(styles).map(([className, styleObject]) => [className, applyResponsive(styleObject)])
  );
};




import { postApiCall } from '@/source/utlis/api';
import { Keyboard } from 'react-native';
 
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
    const [orders, setOrders] = useState([]); // Local state for reactivity
    const [pendingOrders, setPendingOrders] = useState([]);
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
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [isItemFavorite,setIsItemFavorite] = useState(0)
    const [favoriteItemsList,setFavoriteItemsList] = useState(null)
    const [cartApiResponse,setCartApiResponse] = useState(null)

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

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setIsKeyboardVisible(true);
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setIsKeyboardVisible(false);
        }
      );
  
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
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
  const addItemToCartBtnForReOrder = async (data,quantity) => {
    try {
      const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
      let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
      setCartData((prevCartData) => {
        let updatedCartData = [...prevCartData];
        updatedCartData.push({ ...data, quantity: quantity, quantityIncPrice: data.Price, profitCenterId: getProfitCenterId.LocationId });
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
              item.Item_ID === mealItemDetails.Item_ID ? { ...item, quantity: newQuantity,quantityIncPrice:(mealItemDetails.Price * newQuantity)+(modifiePrice*newQuantity),basePrice :(mealItemDetails.Price * newQuantity)+(modifiePrice*newQuantity) } : item
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
    
 
    // const updateModifierItemQuantity = async (mealItemDetails, newValue) => {
    //   try {
    //     setModifierCartItemData((prevCartData) => {
    //       let updatedCartData;
    //       const newQuantity = newValue === 0 ? 1 : newValue
    //       const modifiePrice = selectedModifiers.length === 1
    //         ? parseFloat(selectedModifiers[0].Price)
    //         : selectedModifiers?.reduce((total, modifier) => {
    //           return modifier.isChecked ? (total + parseFloat(modifier.Price)) : (total - parseFloat(modifier.Price));
    //         }, 0);
    //         updatedCartData = prevCartData.map((item) =>
    //           item.Item_ID === mealItemDetails.Item_ID ? { ...item, quantity: newQuantity,quantityIncPrice:(mealItemDetails.Price * newQuantity)+(modifiePrice*newQuantity),basePrice :(mealItemDetails.Price * newQuantity)+(modifiePrice*newQuantity)} : item
    //         );
           
    //       const getCurrentItemDetails = updatedCartData?.find(
    //         (item) => item.Item_ID === singleItemDetails.Item_ID
    //       );
    //       singleModifierData.current = {
    //         quantity: getCurrentItemDetails?.quantity,
    //         quantityIncPrice: getCurrentItemDetails?.quantityIncPrice,
    //       };
    //       return updatedCartData;
    //     });
    //   } catch (error) {}
    // };
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
              item.Item_ID === mealItemDetails.Item_ID ? { ...item, quantity: newQuantity,quantityIncPrice:(mealItemDetails.Price * newQuantity)+(modifiePrice*newQuantity),basePrice :(mealItemDetails.Price * newQuantity)+(modifiePrice*newQuantity)} : item
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

  const addItemToFavorites = async(Items) => {
    const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
    let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
    const currentMealPeriodId = menuOrderData
    ?.filter((item) => item?.MealPeriodIsSelect === 1)
    ?.map((items) => items.MealPeriod_Id);
    const uniqueModifiers = selectedModifiers?.filter((modifier, index, self) => {
      const lastIndex = self.map(item => item.Modifier_Id).lastIndexOf(modifier.Modifier_Id);
      return modifier.isChecked && index === lastIndex;
    });

    let requiredModifier = []
    if(Items?.selectedModifiers?.length > 0){
      requiredModifier = [...Items?.selectedModifiers,...uniqueModifiers]
    }else{
      requiredModifier = uniqueModifiers
    }
    const params = {
      "Location_Id": getProfitCenterId?.LocationId,
      "MealPeriod_Id":currentMealPeriodId[0],
      "Items": [
        {
            "ItemId": Items.Item_ID,
            "IsFavourite":isItemFavorite,
            "Modifiers":requiredModifier?.map((modifiers) => ({ModifierId:modifiers.Modifier_Id}))
        }
      ]
    }
    let postFavResponse = await postApiCall("FAVORITES", "SAVE_FAVORITES",params);
    if (postFavResponse.statusCode === 200 && postFavResponse.response?.ResponseCode === "Success") {
    }else if(response.response?.ResponseCode == "Fail"){
    }
  }

  const toggleFavoriteItems = () => {
    setIsItemFavorite(isItemFavorite === 0?1:0)
  }
  const removeFavoriteItems = async(Items) => {
    const updatedFavData = [
      {
          "ItemId": Items.Item_ID,
          "IsFavourite":0,
          "Modifiers":Items?.Modifiers?.map((modifiers) =>({ModifierId:modifiers.Modifier_Id}))
      }
  ]
    const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
    let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
    const currentMealPeriodId = menuOrderData
    ?.filter((item) => item?.MealPeriodIsSelect === 1)
    ?.map((items) => items.MealPeriod_Id);
    const params = {
      "Location_Id": getProfitCenterId?.LocationId,
      "MealPeriod_Id":currentMealPeriodId[0],
      "Items": updatedFavData
    }
    let postFavResponse = await postApiCall("FAVORITES", "SAVE_FAVORITES",params);
    if (postFavResponse.statusCode === 200 && postFavResponse.response?.ResponseCode === "Success") {
    }else if(response.response?.ResponseCode == "Fail"){
    }
  }

  const updateModifierCartItemForFavs = async (updatedItem) => {
    try {
      if(modifiersResponseData?.Categories.length > 0){
        const existingCartData = await AsyncStorage.getItem("cart_data");
        const getProfitCenterItem = await AsyncStorage.getItem("profit_center");
        const getProfitCenterId = getProfitCenterItem ? JSON.parse(getProfitCenterItem) : null;
    
        const prevCartItems = existingCartData ? JSON.parse(existingCartData) : [];
        const updateModifiers = updatedItem?.Modifiers.map((items) => ({
          "Modifier_Id": items?.Modifier_Id,
          "Modifier_Name": items?.Modifier_Name,
          "Price": items?.ModifierPrice,
          "IsFavourite": 1,
          "isChecked": true,
          "Item_ID":updatedItem?.Item_ID,
          "Category_Id": ""
        }))
        
        const updatedCartItems = prevCartItems.map((item) =>{
          if(item.Item_ID === updatedItem.Item_ID){
            return{
              ...item,
              comments: commentValue.current || "",
              selectedModifiers:[...item.selectedModifiers,...updateModifiers],
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
  }

  const updateItemToFavorites = async(Items) => {
    const newAddedModifiers = [...Items.Modifiers,...selectedModifiers]
    const uniqueModifiers = newAddedModifiers?.filter((modifier, index, self) => {
      const lastIndex = self.map(item => item.Modifier_Id).lastIndexOf(modifier.Modifier_Id);
      return modifier.isChecked && index === lastIndex;
    });
    const updatedFavData = [
      {
          "ItemId": Items.Item_ID,
          "IsFavourite":isItemFavorite,
          "Modifiers":uniqueModifiers?.map((modifiers) => ({ModifierId:modifiers.Modifier_Id}))
      }
  ]
    const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
    let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
    const currentMealPeriodId = menuOrderData
    ?.filter((item) => item?.MealPeriodIsSelect === 1)
    ?.map((items) => items.MealPeriod_Id);
    const params = {
      "Location_Id": getProfitCenterId?.LocationId,
      "MealPeriod_Id":currentMealPeriodId[0],
      "Items": updatedFavData
    }
    let postFavResponse = await postApiCall("FAVORITES", "SAVE_FAVORITES",params);
    if (postFavResponse.statusCode === 200 && postFavResponse.response?.ResponseCode === "Success") {
    }else if(response.response?.ResponseCode == "Fail"){
    }
  }

  const addItemToCartForFavs = async (modifierItem) => {
    try {
      const existingCartData = await AsyncStorage.getItem("cart_data");
      const getProfitCenterItem = await AsyncStorage.getItem("profit_center");
      let getProfitCenterId = getProfitCenterItem !== null ? JSON.parse(getProfitCenterItem) : null;
  
      let prevCartItems = existingCartData ? JSON.parse(existingCartData) : [];
  
      const updatedModifierData = [...prevCartItems];

      const updateModifiers = modifierItem?.Modifiers.map((items) => ({
        "Modifier_Id": items?.Modifier_Id,
        "Modifier_Name": items?.Modifier_Name,
        "Price": items?.ModifierPrice,
        "IsFavourite": 1,
        "isChecked": true,
        "Item_ID":modifierItem?.Item_ID,
        "Category_Id": ""
      }))
  
      updatedModifierData.push({
        ...modifierItem,
        quantity: singleModifierData.current.quantity,
        quantityIncPrice: singleModifierData.current.quantityIncPrice,
        comments: commentValue.current || "",
        selectedModifiers: [...updateModifiers,...modifiersData.current],
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
      removeCartItems,
      setIsPrevCartScreen,
      isPrevCartScreen,
      selectedLocationId,
      setSelectedLocationId,
      toastDetails,
      setToastDetails,
      isKeyboardVisible,
      orders, 
      setOrders,
      pendingOrders,
      setPendingOrders,
      addItemToFavorites,
      toggleFavoriteItems,
      isItemFavorite,
      removeFavoriteItems,
      addItemToCartBtnForReOrder,
      favoriteItemsList,
      setFavoriteItemsList,
      setIsItemFavorite,
      updateModifierCartItemForFavs,
      updateItemToFavorites,
      addItemToCartForFavs,
      cartApiResponse,
      setCartApiResponse,
      setItemDataVisible
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


 const { NativeNavigationModule } = NativeModules;
 export const backAction = () => {
  console.log('tapped');
  if (NativeNavigationModule && NativeNavigationModule.navigateToNative) {
      NativeNavigationModule.navigateToNative(); // Call native iOS navigation
  }
  return true; // Prevent default back behavior
};
 




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