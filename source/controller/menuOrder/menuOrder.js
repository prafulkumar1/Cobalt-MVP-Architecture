import { useEffect, useRef, useState } from 'react';
import { useFormContext } from '@/components/cobalt/event';
import * as DeviceInfo from 'expo-device';
import { postApiCall } from '@/source/utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { newData } from '@/source/constants/commonData';


const pageId='MenuOrder';
export const useMenuOrderLogic = (props) => {
  const [isRecentOrderOpen,setIsRecentOrderOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState("")
  const [mealPeriods, setMealPeriods] = useState(newData);
  const [categoryData, setCategoryData] = useState(newData);

  const [selectedCategory, setSelectedCategory] = useState(newData);

  const flatListRef = useRef(null);

    const { setMenuOrderData,getCartData,menuLoading }= useFormContext();  


    const openRecentOrder = () => {
      setIsRecentOrderOpen(!isRecentOrderOpen)
    }

    useEffect(() => {
      setLoading(true)
      const uniqueMealPeriods = mealPeriods
        .filter((item) => item.MealPeriod_Id && item.MealPeriod_Name)
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
      setMealPeriods(uniqueMealPeriods);

      const categoryData2 = categoryData.filter((item) => item.MealPeriodIsSelect ===1).map((items) => {
        return{
          Category_Name:items.Category_Name,
          Category_ID:items.Category_ID,
          CategoryIsSelect:items.CategoryIsSelect
        }
      })
      setCategoryData(categoryData2)

      const groupedCategories = newData.filter((items) => items.MealPeriodIsSelect ===1).reduce((acc, item) => {
        let category = acc.find(cat => cat.Category_ID === item.Category_ID);
      
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
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }, []);

    useEffect(() => {
      // getCartData()
      // setLoading(false)
      // getMenuOrderList()
      }, [])
  
    
      const getMenuOrderList = async () => {
        // setLoading(true)
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
        }else{
          setMenuOrderData(menuOrderResponseData.response)
          // setLoading(false)
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
  return {
    isRecentOrderOpen,
    openRecentOrder,
    loading,
    errorMessage,
    mealPeriods,
    categoryData,
    selectedCategory,
    flatListRef,
    handleViewableItemsChanged,
    setSelectedCategory
  };
};
