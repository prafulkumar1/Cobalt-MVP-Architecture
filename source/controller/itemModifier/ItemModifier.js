import { useEffect, useState } from 'react';
import { useFormContext } from '@/components/cobalt/event';
import { foodOrderData } from '@/source/constants/commonData';
import { postApiCall } from '@/source/utlis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ConstructionIcon } from 'lucide-react-native';
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
        singleModifierData,
        setUpdateOrAddTxt,
        setFormFieldData,
        menuOrderData,
        favoriteItemsList,
        setIsItemFavorite
    } = useFormContext()


    useEffect(() => {
      getModifiersData()
    }, []);

    useEffect(() => {
      const updateFavList = favoriteItemsList.find((itemDetails)=>itemDetails?.Item_ID === singleItemDetails?.Item_ID)
      if(updateFavList){
        setIsItemFavorite(1)
      }else{
        setIsItemFavorite(0)
      }
    },[favoriteItemsList])
    const getModifiersData = async() => {
      try {
        setLoading(true)
        const getProfitCenterItem = await AsyncStorage.getItem("profit_center")
        let getProfitCenterId = getProfitCenterItem !==null && JSON.parse(getProfitCenterItem)
        const params = {
          "Item_Id":singleItemDetails?.Item_ID,
          "Location_Id": getProfitCenterId?.LocationId,
          "MealPeriod_Id":menuOrderData[0]?.MealPeriod_Id
        // Item_Id:"9EFC6F4B-DA70-4991-AFAB-8174C00BCBB7",
        // LocationId:"8AF9F050-0935-430E-BC33-2A154A99E37A"
        }
        console.log('Item Modifiers Request', params);          
        let modifiersResponse = await postApiCall("ITEM_MODIFIERS","GET_ITEM_MODIFIERS", params)
        if(modifiersResponse.statusCode ===200){
            if(modifiersResponse.response.ResponseCode == "Success"){
              const item = modifiersResponse.response

              let categoryData = typeof item?.Categories === "string" ? JSON.parse(item?.Categories) : item?.Categories;
              let updatedData = {
                ...modifiersResponse.response,
                Categories: categoryData?.map(category => ({
                  ...category,
                  Modifiers: category.Modifiers.map(modifier => ({
                        ...modifier,
                        isChecked: cartData?.some(cartItem =>{
                          const uniqueModifiers = cartItem?.selectedModifiers?.filter((modifier, index, self) => {
                            const lastIndex = self.map(item => item.Modifier_Id).lastIndexOf(modifier.Modifier_Id);
                            return modifier.isChecked && index === lastIndex;
                          });
                         return uniqueModifiers?.some(value => value.Modifier_Id === modifier.Modifier_Id)
                        }
                        )
                      }))
                }))
              };
               setModifiersResponseData(updatedData)
               console.log
              const cartItem = cartData.find(item => item.Item_ID === singleItemDetails?.Item_ID);
              setFormFieldData("ItemModifier","","Comments",cartItem?.comments?cartItem?.comments:"",false)
              if(cartItem !==undefined){
                setUpdateOrAddTxt("Update Cart")
              }else{
                setUpdateOrAddTxt("Add to Cart")
              }
               setLoading(false)
            }
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
        updatedModifiers.push({
          ...modifiers,
          Price : modifiers.Price == null ? "0" : modifiers.Price
        });
        return updatedModifiers;
      });
    };

    const calculateTotalPrice = () => {
      const modifiersTotal = selectedModifiers?.reduce((total, modifier) => {
        return modifier.isChecked ? (total + parseFloat(modifier.Price)) : (total - parseFloat(modifier.Price));
      }, 0);
    
      let finalValue = Math.ceil(modifiersTotal);
    
      let updatedModifierData = modifierCartItemData?.map((items) => {
        const basePrice = items.basePrice ?? items.quantityIncPrice;
        const totalItemPrice = items.quantity * (parseFloat(items.Price) || 0);
    
        return {
          ...items,
          basePrice: totalItemPrice + basePrice + finalValue,
          quantityIncPrice: totalItemPrice + finalValue,
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
