import { useEffect, useRef, useState } from 'react';
import { useFormContext } from '@/components/cobalt/event';
import { postApiCall } from '@/source/utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { newData } from '@/source/constants/commonData';
import { postQuantityApiCall } from '@/components/cobalt/ui';
import { Alert, BackHandler } from 'react-native';
import { navigateToScreen } from '@/source/constants/Navigations';
 
 
const pageId = 'MenuOrder';
export const useMenuOrderLogic = (props) => {
 
  const categoryRefs = useRef({});
  const scrollViewRef = useRef(null);
  const categoryScrollRef = useRef(null);
  const categoryPositions = useRef({});
 
  const [isRecentOrderOpen, setIsRecentOrderOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const [mealPeriods, setMealPeriods] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedSubmenus, setExpandedSubmenus] = useState({});
  const [itemPositions, setItemPositions] = useState({});
  const [expandedIds, setExpandedIds] = useState([])
  const [isAvailable, setIsAvailable] = useState(0);
  const [IsModifierAvailable, setIsModifierAvailable] = useState(0);
  const [apiLoader,setApiLoader] = useState(false)
 
  const {
    setMenuOrderData,
    setCartData,
    menuOrderData,
    storeSingleItem,
    increaseQuantity,
    closePreviewModal,
    cartData,
    singleItemDetails,
    modifiersResponseData,
    addItemToModifierForCart,
    setIsVisible, updateModifierItemQuantity, selectedModifiers,
    setModifiersResponseData,
    updateModifierCartItem,
    setIsExitProfitCenter,
    setModifierCartItemData,
    updateWithoutModifierCartItem,
    setFormFieldData,
    setToastDetails,
    addItemToFavorites,
    setCartApiResponse,
    addItemToCartBtn,
    updateCartItemQuantity,
    itemDataVisible,
    modifierCartItemData,
    setFavoriteItemsList,
    setItemDataVisible
  } = useFormContext();
 
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        const state = props?.navigation?.getState();
        const currentRoute = state?.routes[state?.index]?.name;
        
        if (currentRoute === "MenuOrder") {
          if (cartData?.length > 0) {
            setIsExitProfitCenter(true)
            return true;
          }
          return false;
        }
        return false;
      }
    );

    return () => backHandler?.remove();
  }, [props?.navigation]);
 
  const openRecentOrder = () => {
    setIsRecentOrderOpen(!isRecentOrderOpen)
  }
 
  const requiredDataFormat = (responseData) => {
    const groupedCategories = responseData?.filter((items) => items.MealPeriodIsSelect === 1).reduce((acc, item, index) => {
      let category = acc?.find(cat => cat.Category_ID === item.Category_ID);
 
      if (!category) {
        category = {
          Category_ID: item.Category_ID,
          Category_Name: item.Category_Name,
          CategoryIsSelect: index === 0 ? 1 : 0,
          submenus: [],
        };
        acc.push(category);
      }
 
      let submenu = category.submenus.find(
        sub => sub.SubMenu_ID === item.SubMenu_ID
      );
 
      if (!submenu) {
        submenu = {
          SubMenu_ID: item.SubMenu_ID,
          SubMenu_Name: item.SubMenu_Name,
          items: [],
        };
        category.submenus.push(submenu);
      }
 
      submenu.items.push({
        Item_ID: item.Item_ID,
        Item_Name: item.Item_Name,
        Description: item.Description,
        Price: item.Price,
        ImageUrl: item.ImageUrl,
        IsAvailable: item.IsAvailable,
        IsDisable: item.IsDisable,
        IsFavourite:0
      });
 
      return acc;
    }, []);
 
    setSelectedCategory(groupedCategories)
  }
  const getCartData = async () => {
    try {
      const value = await AsyncStorage.getItem('cart_data');
      const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
      let getProfitCenterId = getProfitCenterItem !== null && JSON.parse(getProfitCenterItem)
      if (value !== null) {
        const parseData = typeof value == "string" ? JSON.parse(value) : value
        let cartItems = parseData?.filter((item) => item.profitCenterId === getProfitCenterId.LocationId)
        setCartData(cartItems)
      } else {
        setCartData([])
      }
    } catch (error) { }
  };

  const getFavorites = async () => {
    try {
      const getProfitCenterItem = await AsyncStorage.getItem("profit_center");
      let getProfitCenterId = getProfitCenterItem !== null ? JSON.parse(getProfitCenterItem) : null;
      const params = {  
        "Location_Id": `${getProfitCenterId?.LocationId}`,
      };
      let favItemInfo = await postApiCall("FAVORITES", "GET_FAVORITES", params);
        console.log("1232!@#$$",favItemInfo.response?.FavouriteItems);
      if (favItemInfo.statusCode === 200 && favItemInfo?.response?.ResponseCode === "Success") {

          setFavoriteItemsList(favItemInfo.response?.FavouriteItems)
      }else if(favItemInfo.response?.ResponseCode == "Fail"){
        setFavoriteItemsList([])
      }
    } catch (err) {
      console.error("Error fetching favorites:", err);
    } finally {
    }
  };
 
  useEffect(() => {
    getMenuOrderList()
    getCartData()
    getFavorites()
    getCartPrice()
  }, [])
 
 
  const getMenuOrderList = async () => {
    setLoading(true)
    const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
    let getProfitCenterId = getProfitCenterItem !== null && JSON.parse(getProfitCenterItem)
    const params = {
      "LocationId": `${getProfitCenterId.LocationId}`,
      "MealPeriod_Id": "",
      "Category_Id": "",
      "Search": ""
    }
    let menuOrderResponseData = await postApiCall("MENU_ORDER", "GET_MENU_ORDER_LIST", params)
 
    if (menuOrderResponseData?.response?.ResponseCode === "Fail") {
      setErrorMessage(menuOrderResponseData?.response?.ResponseMessage)
    } else if (menuOrderResponseData === undefined) {
      setErrorMessage("Something went wrong!Please try again")
      setLoading(false)
    } else {
      const uniqueMealPeriods = menuOrderResponseData.response?.MenuItems
        ?.filter((item) => item.MealPeriod_Id && item.MealPeriod_Name)
        .reduce((acc, current) => {
          const isDuplicate = acc.some((item) => item.MealPeriod_Id === current.MealPeriod_Id);
          if (!isDuplicate) {
            acc.push({
              MealPeriod_Name: current.MealPeriod_Name,
              IsSelect: current.MealPeriodIsSelect,
              Time: current.Time,
              MealPeriod_Id: current.MealPeriod_Id,
              IsEnabled: current.IsEnabled
            });
          }
          return acc;
        }, []);
      requiredDataFormat(menuOrderResponseData.response?.MenuItems)
      setMealPeriods(uniqueMealPeriods);
      setMenuOrderData(menuOrderResponseData.response?.MenuItems)
      setExpandedSubmenus(
        menuOrderResponseData.response?.MenuItems?.reduce((acc, category) => {
          acc[category?.SubMenu_ID] = true;
          return acc;
        }, {})
      )
      setLoading(false)
    }
  }
  const handleCategorySelect = (categoryName) => {
    const updatedCategories = categoryData.map((cat) => ({
      ...cat,
      CategoryIsSelect: cat.Category_Name === categoryName ? 1 : 0,
    }));
    setCategoryData(updatedCategories);
  };
  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const visibleItem = viewableItems[0].item;
      handleCategorySelect(visibleItem.Category_Name);
    }
  };
  const toggleSubmenu = (categoryId) => {
    setExpandedSubmenus((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };
  const setMealType = (mealTypeItem, IsEnabled) => {
    if (IsEnabled === 1) {
      const uniqueMealPeriods = mealPeriods.map((item) => ({
        ...item,
        IsSelect: item.MealPeriod_Id === mealTypeItem.MealPeriod_Id ? 1 : 0,
      }));
      const responseData = menuOrderData.filter((val) => val.MealPeriod_Name === mealTypeItem.MealPeriod_Name)?.map((items) => ({ ...items, MealPeriodIsSelect: 1 }));
      requiredDataFormat(responseData)
      setMealPeriods(uniqueMealPeriods)
    }
  };
 
  const openItemDetails = async (box) => {
    if (box.IsAvailable === 1 && box.IsDisable === 0) {
      setApiLoader(true)
      let quantityInfo = await postQuantityApiCall(1, box?.Item_ID)
      if(quantityInfo.response){
        storeSingleItem({ ...box, response: quantityInfo.response })
        increaseQuantity(box)
        setItemDataVisible(true)
        setApiLoader(false)
      }
    }
  }
 
  const handleReadMoreToggle = (id) => {
    setExpandedIds((prevExpandedIds) => {
      const isExpanded = prevExpandedIds.includes(id);
      return isExpanded
        ? prevExpandedIds.filter((expandedId) => expandedId !== id)
        : [...prevExpandedIds, id];
    });
  };
  
//   const handleModifierAddCart = () => {
//     let categoryData = typeof modifiersResponseData?.Categories === "string"
//         ? JSON.parse(modifiersResponseData?.Categories)
//         : modifiersResponseData?.Categories;
    
//     let isRequiredModifier = false;
//     let requiredModifier = ""
//     const getRequiredItem = categoryData?.filter((items) => items.DisplayOption === "Mandatory")
//     const uniqueModifiers = selectedModifiers?.filter((modifier, index, self) => {
//       const lastIndex = self.map(item => item.Modifier_Id).lastIndexOf(modifier.Modifier_Id);
//       return modifier.isChecked && index === lastIndex;
//     });
//     if(getRequiredItem.length>0){
//       isRequiredModifier = true
//       getRequiredItem?.map((item) => {
//         requiredModifier = item?.Category_Name
//         return uniqueModifiers.length > 0 && uniqueModifiers?.forEach((modifierId) => {
//           if (item.Category_Id == modifierId.Category_Id) {
//             isRequiredModifier = false
//           }
//         })
//       })
//     }
//     if (isRequiredModifier) {
//         setToastDetails({isToastVisiable:true,toastMessage:`Please select the required ${requiredModifier} to proceed with your order`})
//         setTimeout(() => {
//           setToastDetails({isToastVisiable:false,toastMessage:""})
//         }, 6000);
//     } else {
//         let isItemAvailableInCart = false;
//         cartData?.forEach((items) => {
//             if (items.Item_ID === singleItemDetails.Item_ID) {
//                 isItemAvailableInCart = true;
//             }
//         });
//         const existingCartItem = cartData?.find((items) => items.Item_ID === singleItemDetails.Item_ID);
//         if (isItemAvailableInCart) {
//             if (categoryData?.length > 0) {
//               const getRequiredItem = categoryData?.filter((items) => items.DisplayOption === "Mandatory")
//               console.log(existingCartItem,"---->>>editititiititi")
//                 updateModifierCartItem(existingCartItem);
//                 addItemToFavorites(existingCartItem)
//                 toggleFavoriteItems()
//             } else {
//                 updateWithoutModifierCartItem(existingCartItem);
//                 addItemToFavorites(existingCartItem)
//                 toggleFavoriteItems()
//             }
//         } else {
//             addItemToModifierForCart(singleItemDetails);
//             addItemToFavorites(singleItemDetails)
//             closePreviewModal();
//             toggleFavoriteItems()
//         }
//     }
// }
 
 
  const handleModifierAddCart = () => {
    let isItemAvailableInCart = false;
    cartData?.forEach((items) => {
      if (items.Item_ID === singleItemDetails.Item_ID) {
        isItemAvailableInCart = true;
      }
    });
 console.log("modifier response data 1232132",modifiersResponseData)
    let categoryData = typeof modifiersResponseData?.Categories === "string"
    ? JSON.parse(modifiersResponseData?.Categories)
    : modifiersResponseData?.Categories;
 
    if (!isItemAvailableInCart) {
      let isRequiredModifier = false;
      let requiredModifier = ""
      console.log("modifers ",categoryData)
      const getRequiredItem = categoryData?.filter((items) => items.DisplayOption === "Mandatory")
      console.log(selectedModifiers,"---->>>selected modifiers")
      const uniqueModifiers = selectedModifiers?.filter((modifier, index, self) => {
        const lastIndex = self.map(item => item.Modifier_Id).lastIndexOf(modifier.Modifier_Id);
        return modifier.isChecked && index === lastIndex;
      });
      console.log(JSON.stringify(uniqueModifiers),"---------------1234")
      if (getRequiredItem?.length > 0) {
        
        isRequiredModifier = true
        getRequiredItem?.map((item) => {
          requiredModifier = item?.Category_Name
          //  console.log("!2343ashiuagb",item.Category_Id,modifierId.Category_Id)
          return uniqueModifiers?.length > 0 && uniqueModifiers?.forEach((modifierId) => {
           
            if (item.Category_Id == modifierId.Category_Id) {
              isRequiredModifier = false
            }
          })
        })
      }
      console.log("SHiavas----------------------",isRequiredModifier);

      if (isRequiredModifier) {
        setToastDetails({ isToastVisiable:true,toastMessage: `Please select the required ${requiredModifier} to proceed with your order` })
        setTimeout(() => {
          setToastDetails({ isToastVisiable:false,toastMessage: "" })
        }, 6000);
      } else {
        console.log("SHiavas----------------------`1111");
        const modifierCartItem = modifierCartItemData&& modifierCartItemData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
        const modifierQuantity = modifierCartItem ? modifierCartItem?.quantity : 1;
        if (categoryData?.length > 0) {          
          updateModifierItemQuantity(singleItemDetails, modifierQuantity);
          addItemToModifierForCart(singleItemDetails);
          addItemToFavorites(singleItemDetails);
          closePreviewModal();
          getFavorites()
        } else {
          updateModifierItemQuantity(singleItemDetails,modifierQuantity)
          addItemToModifierForCart(singleItemDetails);
          addItemToFavorites(singleItemDetails)
          closePreviewModal();
          getFavorites()
        }
        }
    } else {
      let isRequiredModifier = false
      let requiredModifier = ""
      const existingCartItem = cartData?.find((items) => items.Item_ID === singleItemDetails.Item_ID);
      if (categoryData?.length > 0) {
        const newAddedModifiers = [...existingCartItem?.selectedModifiers,...selectedModifiers]
        const getRequiredItem = categoryData?.filter((items) => items.DisplayOption === "Mandatory")
        const uniqueModifiers = newAddedModifiers?.filter((modifier, index, self) => {
          const lastIndex = self.map(item => item.Modifier_Id).lastIndexOf(modifier.Modifier_Id);
          return modifier.isChecked && index === lastIndex;
        });
 
        getRequiredItem?.map((item) => {
          isRequiredModifier = true
          requiredModifier = item?.Category_Name
          return uniqueModifiers?.length > 0 && uniqueModifiers?.forEach((modifierId) => {
            if (item.Category_Id == modifierId.Category_Id) {
              isRequiredModifier = false
            }
          })
        })
 
        if(isRequiredModifier){
          setToastDetails({ isToastVisiable: true, toastMessage: `Please select the required ${requiredModifier} to proceed with your order` })
          setTimeout(() => {
            setToastDetails({ isToastVisiable: false, toastMessage: "" })
          }, 6000);
        }else{
          updateModifierCartItem(existingCartItem);
          addItemToFavorites(existingCartItem)
          getFavorites()
        }
      } else {
        updateWithoutModifierCartItem(existingCartItem);
        addItemToFavorites(existingCartItem)
        getFavorites()
      }
    }
}
  const removeCartItems = async () => {
    navigateToScreen(props,"ProfitCenters",false,{isCartItemsRemove:true})
    setIsExitProfitCenter(false)
    setModifierCartItemData([])
    await AsyncStorage.removeItem('cart_data')
  }
 
 
  const handleCategoryClick = (categoryId) => {
    const yPosition = itemPositions[categoryId];
    if (yPosition !== undefined && scrollViewRef.current) {
      scrollViewRef?.current?.scrollTo({ y: yPosition, animated: true });
      const updateData = selectedCategory.map((items) => {
        return {
          ...items,
          CategoryIsSelect: items.Category_ID === categoryId ? 1 : 0
        }
      })
      setSelectedCategory(updateData);
    }
  };
  const handleCategoryLayout = (event, categoryId) => {
    const { x } = event?.nativeEvent.layout;
    categoryPositions.current[categoryId] = x;
  };
 
 
  const updateCategorySelection = (visibleCategoryId) => {
    const updatedCategories = selectedCategory?.map(category => {
      return {
        ...category,
        CategoryIsSelect: category.Category_ID === visibleCategoryId ? 1 : 0,
      }
    });
    setSelectedCategory(updatedCategories);
 
    const xPosition = categoryPositions.current[visibleCategoryId];
    if (xPosition !== undefined) {
      categoryScrollRef.current?.scrollTo({ x: xPosition - 200, animated: true });
    }
  };
 
  const handleLayout = (categoryId, event) => {
    const layout = event?.nativeEvent.layout;
    categoryRefs.current[categoryId] = layout.y;
  };
 
  const handleCloseItemDetails = () => {
    setFormFieldData("ItemModifier", "", "Comments", "", false)
    if (selectedModifiers.length === 0) {
      setIsVisible(false)
      updateModifierItemQuantity(singleItemDetails, 0)
      setModifiersResponseData([])
      console.log("$$$$$$$$$$$$",modifiersResponseData)
      setTimeout(() => {
        closePreviewModal()
      }, 100)
    } else {
      setIsVisible(true)
    }
  }
 
  const handleScroll = (event) => {
    const scrollY = event?.nativeEvent?.contentOffset.y;
    let visibleCategory = null;
 
    for (const [categoryId, y] of Object.entries(categoryRefs.current)) {
      if (scrollY >= y - 50 && scrollY < y + 50) {
        visibleCategory = categoryId;
        break;
      }
    }
 
    if (visibleCategory) {
      updateCategorySelection(visibleCategory);
    }
  };
 
  const handleItemLayout = (categoryId, event) => {
    const layout = event?.nativeEvent?.layout;
    setItemPositions((prevPositions) => ({
      ...prevPositions,
      [categoryId]: layout.y,
    }));
  };

  const getCartPrice = async () => {
    try {
      const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
      let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
      const cartItemIds = cartData?.map((item) => {
        const uniqueModifiers = item?.selectedModifiers?.filter((modifier, index, self) => {
          const lastIndex = self.map(item => item.Modifier_Id).lastIndexOf(modifier.Modifier_Id);
          return modifier.isChecked && index === lastIndex;
        });
        return{
          Comments:"",
          ItemId:item.Item_ID,
          Quantity:item.quantity,
          Modifiers:item?.selectedModifiers ? uniqueModifiers?.map((items) => ({ModifierId:items.Modifier_Id})):[]
        }
      })
      const params = {   
         "Location_Id":`${getProfitCenterId?.LocationId}`,
         "Items":cartItemIds,
         "TipPercentage": "",
         "TipCustom": "",
      }
      let cartInfo = await postApiCall("CART", "GET_CART_PRICE",params)
      setCartApiResponse(cartInfo.response?.Items)
    } catch (err) { }
  }
  const handleAddToCartBtn = async (mealItemDetails) => {  
    setApiLoader(true)
    let quantityInfo = await postQuantityApiCall(1, mealItemDetails?.Item_ID);
  
    if (quantityInfo.statusCode === 200) {      
      setIsAvailable(quantityInfo?.response.IsAvailable);
      setIsModifierAvailable(quantityInfo?.response.IsModifierAvailable);
      if (quantityInfo?.response?.IsModifierAvailable === 1) {
        storeSingleItem(mealItemDetails);
        if (itemDataVisible) {
          increaseQuantity(mealItemDetails, false);
        } else {
          closePreviewModal();
          increaseQuantity(mealItemDetails, false);
        }
      } else {
        addItemToCartBtn(mealItemDetails);
      }
      setApiLoader(false)
    } else {
    }
  };

  const modifierIncDecBtn = async (
    mealItemDetails,
    cartQuantity,
    modifierQuantity,
    operation
  ) => {
    let isItemAvailableInCart = false;
    cartData?.forEach((items) => {
      if (items?.Item_ID === mealItemDetails.Item_ID) {
        isItemAvailableInCart = true;
      }
    });
    let requiredQuantity = categoryData.length > 0 ? operation === "decrement" ? modifierQuantity-1: modifierQuantity+1 : operation === "decrement" ? cartQuantity-1: cartQuantity+1;
    let quantityInfo = await postQuantityApiCall(requiredQuantity, mealItemDetails?.Item_ID);
  
    if (quantityInfo.statusCode === 200) {
      if (quantityInfo?.response.IsModifierAvailable === 1) {
        if (operation === "decrement") {
          if (isItemAvailableInCart) {
            updateModifierItemQuantity(mealItemDetails, modifierQuantity - 1);
            updateCartItemQuantity(mealItemDetails, cartQuantity - 1);
          } else {
            updateModifierItemQuantity(mealItemDetails, modifierQuantity - 1);
          }
        } else {
          if (quantityInfo?.response?.IsAvailable === 1) {
            if (isItemAvailableInCart) {
              updateModifierItemQuantity(mealItemDetails, modifierQuantity + 1);
              updateCartItemQuantity(mealItemDetails, cartQuantity + 1);
            } else {
              updateModifierItemQuantity(mealItemDetails, modifierQuantity + 1);
            }
          } else {
            Alert.alert(quantityInfo?.response?.ResponseMessage);
          }
        }
      } else {
        if (operation === "decrement") {
          if (itemDataVisible) {
            updateModifierItemQuantity(mealItemDetails, modifierQuantity - 1);
          } else {
            updateCartItemQuantity(mealItemDetails, cartQuantity - 1);
            updateModifierItemQuantity(mealItemDetails, cartQuantity - 1);
          }
        } else {
          if (quantityInfo?.response?.IsAvailable === 1) {
            if (itemDataVisible) {
              updateModifierItemQuantity(mealItemDetails, modifierQuantity + 1);
            } else {
              updateCartItemQuantity(mealItemDetails, cartQuantity + 1);
              updateModifierItemQuantity(mealItemDetails, cartQuantity + 1);
            }
          } else {
            Alert.alert(quantityInfo?.response?.ResponseMessage);
          }
        }
      }
    }
  };
  return {
    isRecentOrderOpen,
    openRecentOrder,
    loading,
    errorMessage,
    mealPeriods,
    categoryData,
    selectedCategory,
    handleViewableItemsChanged,
    setSelectedCategory,
    expandedSubmenus,
    toggleSubmenu,
    itemPositions,
    setItemPositions,
    expandedIds,
    categoryRefs,
    scrollViewRef,
    categoryScrollRef,
    categoryPositions,
    setMealType,
    openItemDetails,
    handleReadMoreToggle,
    handleModifierAddCart,
    removeCartItems,
    handleCategoryClick,
    handleCategoryLayout,
    updateCategorySelection,
    handleLayout,
    handleCloseItemDetails,
    handleScroll,
    handleItemLayout,
    handleAddToCartBtn,
    modifierIncDecBtn,
    apiLoader
  };
};