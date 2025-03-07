import { useEffect, useRef, useState } from 'react';
import { useFormContext } from '@/components/cobalt/event';
import { postApiCall } from '@/source/utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { newData } from '@/source/constants/commonData';
import { postQuantityApiCall } from '@/components/cobalt/ui';


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
  const [selectedCategory, setSelectedCategory] = useState(newData);
  const [expandedSubmenus, setExpandedSubmenus] = useState({});
  const [itemPositions, setItemPositions] = useState({});
  const [expandedIds, setExpandedIds] = useState([])


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
    setFormFieldData
  } = useFormContext();


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

  useEffect(() => {
    getMenuOrderList()
    getCartData()
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
      let quantityInfo = await postQuantityApiCall(1, box?.Item_ID)
      storeSingleItem({ ...box, response: quantityInfo.response })
      increaseQuantity(box)
      closePreviewModal()
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

  const handleModifierAddCart = () => {
    let isItemAvailableInCart = false
    cartData?.forEach((items) => {
      if (items.Item_ID === singleItemDetails.Item_ID) {
        isItemAvailableInCart = true
      }
    })
    const existingCartItem = cartData?.find((items) => items.Item_ID === singleItemDetails.Item_ID)
    let categoryData = typeof modifiersResponseData?.Categories === "string" ? JSON.parse(modifiersResponseData?.Categories) : modifiersResponseData?.Categories;
    if (isItemAvailableInCart) {
      if (categoryData?.length > 0) {
        updateModifierCartItem(existingCartItem)
      } else {
        updateWithoutModifierCartItem(existingCartItem)
      }
    } else {
      addItemToModifierForCart(singleItemDetails);
      closePreviewModal();
    }
  }
  const removeCartItems = async () => {
    props.navigation?.goBack()
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
      if (scrollY >= y - 50 && scrollY < y + 100) {
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
    handleItemLayout
  };
};
