import { useEffect, useState } from 'react';
import { useFormContext } from '@/components/cobalt/event';
import { foodOrderData } from '@/source/constants/commonData';
const pageId='ItemModifier';
export const useItemModifierLogic = () => {
    const [itemNames, setItemNames] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const { closePreviewModal, singleItemDetails, selectedModifiers, setSelectedModifiers, updateModifierItemQuantity } = useFormContext()


    useEffect(() => {
        const items = [];
        foodOrderData.MenuItems.forEach(mealPeriod => {
            mealPeriod.Categories.forEach(category => {
                category.Submenu.forEach(submenu => {
                    submenu.Items.forEach(item => {
                        items.push(item);
                    });
                });
            });
        });
        setItemNames(items);
    }, []);

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
        setIsVisible
    };
};
