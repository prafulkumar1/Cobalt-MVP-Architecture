import { useEffect, useState } from 'react';
import { useFormContext } from '@/components/cobalt/event';
import { foodOrderData } from '@/source/constants/commonData';
import { postApiCall } from '@/source/utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const pageId='ItemModifier';
export const useItemModifierLogic = () => {
    const [itemNames, setItemNames] = useState([]);
    const [loading,setLoading] = useState(false)
    const {
        setModifiersResponseData,
        modifiersResponseData,
        closePreviewModal,
        singleItemDetails,
        selectedModifiers,
        setSelectedModifiers,
        updateModifierItemQuantity,
        isVisible, 
        setIsVisible
    } = useFormContext()


    useEffect(() => {
        getModifiersData()
    }, []);

    function addIsCheckedProperty(item) {
        let categoryData = typeof item?.Categories == "string"? JSON.parse(item?.Categories): item?.Categories
        return {
          ...item,
          Categories: categoryData.map(category => ({
            ...category,
            Modifiers: category.Modifiers.map(modifier => ({
              ...modifier,
              isChecked: false
            }))
          }))
        };
      }
      

    const getModifiersData = async() => {
      try {
        setLoading(true)
        const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
        let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
        const params = {
          "Item_Id":singleItemDetails?.Item_ID,
          "LocationId": getProfitCenterId?.LocationId
        // Item_Id:"9EFC6F4B-DA70-4991-AFAB-8174C00BCBB7",
        // LocationId:"8AF9F050-0935-430E-BC33-2A154A99E37A"
        }          
        let modifiersResponse = await postApiCall("ITEM_MODIFIERS","GET_ITEM_MODIFIERS", params)
        if(modifiersResponse.statusCode ===200){
            if(modifiersResponse.response.ResponseCode == "Success"){
                const updatedItem = addIsCheckedProperty(modifiersResponse?.response);
                setModifiersResponseData(updatedItem)
            }
            setLoading(false)
        }
      } catch (err) {
        setLoading(false)
      }
    }

    const handleCloseItemDetails = () => {
        if (selectedModifiers.length === 0) {
            setIsVisible(false)
            updateModifierItemQuantity(singleItemDetails, 0)
            setTimeout(() => {
                closePreviewModal()
            }, 100)
        } else {
            setIsVisible(true)
        }
    }

    const handleDiscardChanges = () => {
        setIsVisible(false)
        updateModifierItemQuantity(singleItemDetails, 0)
        setSelectedModifiers([])
        setTimeout(() => {
            closePreviewModal()
        }, 100)
    }
    return {
        handleCloseItemDetails,
        handleDiscardChanges,
        isVisible,
        setIsVisible,
        loading
    };
};
