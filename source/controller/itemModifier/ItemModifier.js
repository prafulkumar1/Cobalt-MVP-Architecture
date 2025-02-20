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
        setIsVisible,
        cartData,
        modifierCartItemData,
        setModifierCartItemData,
        modifiersData,
        singleModifierData
    } = useFormContext()


    useEffect(() => {
        getModifiersData()
    }, []);

    function addIsCheckedProperty(item) {
      if (!item) return item;
    
      let categoryData = typeof item?.Categories === "string" ? JSON.parse(item?.Categories) : item?.Categories;
    
      const updatedData = {
        ...item,
        Categories: categoryData.map(category => ({
          ...category,
          Modifiers: category.Modifiers.map(modifier => ({
            ...modifier,
            isChecked: cartData?.some(cartItem =>
              cartItem?.selectedModifiers?.some(value => value.Modifier_Id === modifier.Modifier_Id)
            )
          }))
        }))
      };
      return updatedData;
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

    const getAllSelectedModifiers = (modifiers) => {
      setSelectedModifiers((prevState) => {
        let updatedModifiers = [...prevState];
        updatedModifiers.push(modifiers);
        console.log(updatedModifiers,"==--->>>@222")
        return updatedModifiers;
      });
    };

    const calculateTotalPrice = () => {
      const modifiersTotal = selectedModifiers?.reduce((total, modifier) => {
        return modifier.isChecked
          ? total + modifier.Price
          : total - modifier.Price;
      }, 0);
  
      let finalValue = Math.ceil(modifiersTotal);
  
      let updatedModifierData = modifierCartItemData?.map((items) => {
        const basePrice = items.basePrice ?? items.quantityIncPrice;
  
        return {
          ...items,
          basePrice: basePrice,
          quantityIncPrice: (Number(basePrice) || 0) + finalValue,
        };
      });
  
      setModifierCartItemData(updatedModifierData);
      const getCurrentItemDetails = updatedModifierData?.find(
        (item) => item.Item_ID === singleItemDetails.Item_ID
      );
      singleModifierData.current = {
        quantity: getCurrentItemDetails?.quantity,
        quantityIncPrice: getCurrentItemDetails?.quantityIncPrice,
      };
    };
  
    useEffect(() => {
      setModifierCartItemData((prevData) =>
        prevData?.map((item) => ({
          ...item,
          basePrice: item.basePrice ?? (item.quantityIncPrice || 0),
        }))
      );
    }, []);
  
    useEffect(() => {
      calculateTotalPrice();
      modifiersData.current = selectedModifiers;
    }, [selectedModifiers]);
    return {
        handleCloseItemDetails,
        handleDiscardChanges,
        isVisible,
        setIsVisible,
        loading,
        getAllSelectedModifiers
    };
};
