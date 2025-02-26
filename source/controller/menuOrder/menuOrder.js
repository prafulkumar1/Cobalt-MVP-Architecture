import {useEffect, useRef, useState } from 'react';
import { useFormContext } from '@/components/cobalt/event';
import * as DeviceInfo from 'expo-device';
import { postApiCall } from '@/source/utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { newData } from '@/source/constants/commonData';


const pageId='MenuOrder';
export const useMenuOrderLogic = (props) => {

  const categoryRefs = useRef({});
  const scrollViewRef = useRef(null);
  const categoryScrollRef = useRef(null);
  const categoryPositions = useRef({});

  const [isRecentOrderOpen,setIsRecentOrderOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")
  const [mealPeriods, setMealPeriods] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(newData);
  const [expandedSubmenus, setExpandedSubmenus] = useState({});
  const [itemPositions, setItemPositions] = useState({});
  const [expandedIds,setExpandedIds] = useState([])


  const { setMenuOrderData,menuLoading,setCartData }= useFormContext();  


    const openRecentOrder = () => {
      setIsRecentOrderOpen(!isRecentOrderOpen)
    }

  const requiredDataFormat = (responseData) => {
    const groupedCategories = responseData?.filter((items) => items.MealPeriodIsSelect === 1).reduce((acc, item) => {
      let category = acc?.find(cat => cat.Category_ID === item.Category_ID);

      if (!category) {
        category = {
          Category_ID: item.Category_ID,
          Category_Name: item.Category_Name,
          CategoryIsSelect: item.CategoryIsSelect,
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

  useEffect(() => {
    getMenuOrderList()
    getCartData()
    }, [])
  
    
      const getMenuOrderList = async () => {
        setLoading(true)
        const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
        let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
        const params = {
          "LocationId": `${getProfitCenterId.LocationId}`,
          "MealPeriod_Id": "",
          "Category_Id": "",
          "Search": ""
        }
        let menuOrderResponseData = await postApiCall("MENU_ORDER","GET_MENU_ORDER_LIST", params)

        if(menuOrderResponseData?.response?.ResponseCode === "Fail"){
          setErrorMessage(menuOrderResponseData?.response?.ResponseMessage)
        }else if(menuOrderResponseData ===undefined){
          setErrorMessage("Something went wrong!Please try again")
          setLoading(false)
        }else{
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
    setExpandedIds,
    categoryRefs,
    scrollViewRef,
    categoryScrollRef,
    categoryPositions
  };
};
