import * as UI from "@/components/cobalt/importUI";
import {
  useFormContext,
} from "@/components/cobalt/event";
import { Icon } from '@/components/ui/icon';
import { useMenuOrderLogic } from "@/source/controller/menuOrder/menuOrder";
import {  Image, Modal } from "react-native";
import { navigateToScreen } from '@/source/constants/Navigations'
import { RecentOrderData } from "@/source/constants/commonData";
import {ChevronDownIcon ,ChevronUpIcon,CloseIcon} from '@/components/ui/icon';
import { styles } from "@/source/styles/MenuOrder";
import CbLoader from "@/components/cobalt/cobaltLoader";
import {  useRef, useState,useEffect } from "react";
import { Image as ExpoImage } from 'expo-image';
import { postQuantityApiCall } from "@/components/cobalt/ui";
import ItemModifier from "../ItemModifier/ItemModifierUI";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { loadPageConfig } from '@/source/constants/ConfigLoad';
  
 let controlsConfigJson=[]; 

export default function MenuOrderScreen(props) { 
 
  

  const {
      setMealType, 
      isCategoryEmpty, 
      isSearchActive, 
      handleChangeState,
      cartData,
      closePreviewModal,
      storeSingleItem,
      itemDataVisible,
      addItemToModifierForCart,
      setIsVisible, updateModifierItemQuantity, selectedModifiers, singleItemDetails,
      modifierCartItemData,
      increaseQuantity,
      setSelectedModifiers,
      setModifiersResponseData,
      updateOrAddTxt,
      setUpdateOrAddTxt,
      modifiersResponseData
    } = useFormContext();
    const {toggleSubmenu, expandedSubmenus,isRecentOrderOpen,openRecentOrder,errorMessage,loading,mealPeriods,categoryData,selectedCategory,flatListRef ,handleViewableItemsChanged,setSelectedCategory,getCartData} = useMenuOrderLogic(props)
  const categoryRefs = useRef({});
  const scrollViewRef = useRef(null);
  const categoryScrollRef = useRef(null);
  const categoryPositions = useRef({});
  const [itemPositions, setItemPositions] = useState({});

  const [expandedIds,setExpandedIds] = useState([])
  const [updatedTotalPrice,setUpdatedTotalPrice] = useState("")
  const [isItemEditable , setIsItemEditable] = useState(false)

  const modifierCartItem = modifierCartItemData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
  const singleItemPrice = modifierCartItem ? modifierCartItem?.quantityIncPrice : 0;
  const cartItemDetails = cartData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
  const quantity = cartItemDetails ? cartItemDetails?.quantity : 0;
  const totalCartPrice = cartItemDetails ? cartItemDetails?.quantityIncPrice : 0;

  const openItemDetails = async (box) => {
    let quantityInfo = await postQuantityApiCall(1, box?.Item_ID)
    if(quantityInfo.response.IsAvailable ===1){
      storeSingleItem({...box,response:quantityInfo.response})
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
    if(items.Item_ID === singleItemDetails.Item_ID ){
    isItemAvailableInCart = true
    }
    })
    if(isItemAvailableInCart){
      UI.Alert.alert("Item is already available in cart")
    }else{
      addItemToModifierForCart(singleItemDetails);
      closePreviewModal();
    }
  }

  const renderMealTypeList = (mealTypeItem) => {
    return (
      <UI.Box style={styles.mealTypeContainer}>
        <UI.TouchableOpacity activeOpacity={0.6}   onPress={() => setMealType(mealTypeItem.MealPeriod_Id,mealTypeItem.IsEnabled)}>
         <UI.Box style={[mealTypeItem.IsSelect === 1 ? [styles.activeMenuType,{backgroundColor: "#00C6FF", borderRadius: 5,},] : styles.inactiveMenuType,]} >
          <UI.Text
            style={[
              styles.mealTypeLabel,
              { color: mealTypeItem.IsSelect === 1 ? "#ffffff" : "#717171" },
            ]}
          >
            {mealTypeItem.MealPeriod_Name?.toUpperCase()}
          </UI.Text>
          <UI.Text
            style={[
             styles.timeDurationTxt,
              { color: mealTypeItem.IsSelect === 1 ? "#fff" : "#717171" },
            ]}
          >
            {mealTypeItem.Time}
          </UI.Text>
          </UI.Box>
        </UI.TouchableOpacity>
      </UI.Box>
    );
  }

  const handleCategoryClick = (categoryId) => {
    const yPosition = itemPositions[categoryId];
    if (yPosition !== undefined && scrollViewRef.current) {
      scrollViewRef?.current.scrollTo({ y: yPosition, animated: true });
    }
  };
  const handleCategoryLayout = (event, categoryId) => {
    const { x } = event.nativeEvent.layout;
    categoryPositions.current[categoryId] = x;
  };
  const renderMenuCategoryList = (item) => {
    return (
      <UI.Box onLayout={(e) => handleCategoryLayout(e, item.Category_ID)}>
        <UI.TouchableOpacity
          style={styles.categoryBtn}
          activeOpacity={0.6}
          onPress={() => handleCategoryClick(item.Category_ID)}
        >
          <UI.Text style={styles.categoryText}>
            {item.Category_Name?.toUpperCase()}
          </UI.Text>
          {item.CategoryIsSelect === 1 && (
            <UI.Box
              style={[
               styles.bottomStyle,
              ]}
            />
          )}
        </UI.TouchableOpacity>
      </UI.Box>
    );
  }

  const renderCategoryMainList = () => {
    const updateCategorySelection = (visibleCategoryId) => {
      const updatedCategories = selectedCategory.map(category => {
        return{
          ...category,
          CategoryIsSelect: category.Category_ID === visibleCategoryId ? 1 : 0,
        }
      });
      setSelectedCategory(updatedCategories);

      const xPosition = categoryPositions.current[visibleCategoryId];
      if (xPosition !== undefined) {
        categoryScrollRef.current?.scrollTo({ x: xPosition-200, animated: true });
      }
    };
  
    const handleLayout = (categoryId, event) => {
      const layout = event.nativeEvent.layout;
      categoryRefs.current[categoryId] = layout.y;
    };

  const handleCloseItemDetails = () => {
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


    const showActiveAvailableColor = (isAvailable,IsDisable) => {
      return { color: isAvailable === 1 &&IsDisable===0  ? "#4B5154" : "#4B515469" };
    };
  
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
  
    if (isCategoryEmpty) {
      return (
        <UI.Box style={styles.emptyListContainer}>
          <UI.Text style={styles.emptyMealTxt}>No items available</UI.Text>
        </UI.Box>
      );
    }
  
    return (
      <UI.Box style={styles.mainBoxContainer}>
        <UI.ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryListContainer}
          ref={categoryScrollRef}
        >
          {selectedCategory?.map((group) => renderMenuCategoryList(group))}
        </UI.ScrollView>

        <UI.ScrollView style={styles.bottomMiddleContainer}
          ref={scrollViewRef}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{paddingBottom:responsiveHeight(80)}}
        >
          {selectedCategory?.map((category) => {
            return (
              <UI.FlatList
                onLayout={(e) => {
                  handleLayout(category.Category_ID, e);
                  handleItemLayout(category.Category_ID, e);
                }}
                data={category.submenus}
                renderItem={({ item }) => {
                  const subMenuItem = item
                  return (
                    <>
                      {item.SubMenu_Name !== null && (
                        <UI.TouchableOpacity
                          activeOpacity={0.5}
                          style={styles.cardMainContainer}
                          onPress={() => toggleSubmenu(category.Category_ID)}
                        >
                          <UI.Text style={styles.itemCategoryLabel}>
                            {item.SubMenu_Name}
                          </UI.Text>
                          {expandedSubmenus[category.Category_ID] ? (
                            <ChevronUpIcon
                              style={styles.icon}
                              color="#5773a2"
                              size={"xl"}
                            />
                          ) : (
                            <ChevronDownIcon
                              style={styles.icon}
                              color="#5773a2"
                              size={"xl"}
                            />
                          )}
                        </UI.TouchableOpacity>
                      )}
                      {expandedSubmenus[category.Category_ID] && (
                        <UI.CbFlatList
                          flatlistData={item.items}
                          customStyles={{ backgroundColor: "#fff" }}
                          children={({ item, index }) => {
                            let box = item;
                            const lastItem =
                              index === subMenuItem.items?.length - 1;
                            const isExpanded = expandedIds.includes(box?.Item_ID);

                            return (
                              <UI.TouchableOpacity
                                activeOpacity={0.5}
                                disabled={box.IsAvailable !== 1}
                                onPress={() => openItemDetails(box)}
                                key={box?.Item_ID}
                                style={[
                                  styles.subContainer,
                                  {
                                    opacity:
                                      box?.IsAvailable === 1 &&
                                      box?.IsDisable === 0
                                        ? 1
                                        : 0.8,
                                  },
                                ]}
                              >
                                <UI.Box style={styles.rowContainer}>
                                  <UI.Box style={[styles.textContainer]}>
                                    <UI.Text
                                      numberOfLines={1}
                                      style={[
                                        styles.mealTypeTitle,
                                        showActiveAvailableColor(
                                          box?.IsAvailable,
                                          box?.IsDisable
                                        ),
                                        { textAlign: "justify" },
                                      ]}
                                    >
                                      {box?.Item_Name}
                                    </UI.Text>
                                    <UI.Text
                                      numberOfLines={isExpanded ? undefined : 2}
                                      style={[
                                        styles.priceTxt,
                                        showActiveAvailableColor(
                                          box.IsAvailable,
                                          box.IsDisable
                                        ),
                                      ]}
                                    >
                                      {`$${box?.Price != null? box?.Price: 0}`}
                                    </UI.Text>
                                    <UI.Text
                                      numberOfLines={isExpanded ? undefined : 2}
                                      style={[
                                        styles.descriptionTxt,
                                        showActiveAvailableColor(
                                          box.IsAvailable,
                                          box.IsDisable
                                        ),
                                        {
                                          textAlign: "left",
                                          letterSpacing: -0.5,
                                        },
                                      ]}
                                    >
                                      {box?.Description}
                                    </UI.Text>
                                    {box?.Description?.length > 68 && (
                                      <UI.Text
                                        onPress={() =>
                                          handleReadMoreToggle(box.Item_ID)
                                        }
                                        style={styles.underLineTxt}
                                      >
                                        {isExpanded? "Show Less": "Read More"}
                                      </UI.Text>
                                    )}
                                  </UI.Box>

                                  <UI.Box style={styles.imageContainer}>
                                    <UI.Box
                                      style={{
                                        backgroundColor:
                                          "rgba(255, 255, 255, 0.2)",
                                      }}
                                      disabled={box.IsAvailable === 0 && box.IsDisable === 1 ? true : false}
                                    >
                                      <ExpoImage
                                        source={{ uri: item.ImageUrl }}
                                        contentFit="cover"
                                        cachePolicy="memory-disk"
                                        style={[
                                          styles.mealTypeImg,
                                          box.IsAvailable === 0 &&
                                            box.IsDisable === 1 && {
                                              opacity: 0.4,
                                            },
                                        ]}
                                      />
                                    </UI.Box>
                                    <UI.CbAddToCartButton mealItemDetails={box} />
                                  </UI.Box>
                                </UI.Box>
                                {!lastItem && (
                                  <UI.Box style={styles.horizontalLine} />
                                )}
                              </UI.TouchableOpacity>
                            );
                          }}
                        />
                      )}
                    </>
                  );
                }}
              />
            );
          })}
        </UI.ScrollView>

        <Modal
          visible={itemDataVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closePreviewModal}
        >
          <UI.Box style={styles.modalBackground}>
            <UI.TouchableOpacity
              onPress={() =>
                handleCloseItemDetails(
                  setIsVisible,
                  updateModifierItemQuantity,
                  closePreviewModal,
                  selectedModifiers,
                  setSelectedModifiers,
                  singleItemDetails
                )
              }
              style={styles.crossIcon}
            >
              <Icon
                as={CloseIcon}
                color="#fff"
                size={"md"}
                style={{ width: 20, height: 20 }}
              />
            </UI.TouchableOpacity>
            <UI.Box style={styles.modiferItems}>
              <ItemModifier />
            </UI.Box>
            <UI.Box style={styles.footerContainer}>
              <UI.Box>
                <UI.Text style={styles.totalAmountTxt}>Total Amount</UI.Text>
                {/* <UI.Text style={styles.orderAmount}>{`$${quantity > 1 ? totalCartPrice : singleItemPrice}`}</UI.Text> */}
                <UI.Text style={styles.orderAmount}>{`$${quantity > 1 ?updatedTotalPrice:singleItemPrice}`}</UI.Text>
              </UI.Box>
              <UI.CbCommonButton
                showBtnName={updateOrAddTxt}
                style={styles.addToCartBtn}
                btnTextStyle={styles.addCartTxt}
                onPress={() => {
                  addItemToModifierForCart(singleItemDetails);
                  closePreviewModal();
                }}
              />
            </UI.Box>
          </UI.Box>
        </Modal>
      </UI.Box>
    );
  };

  const OnRecentOrderPress = () => {
    const RenderingRecentOrders = ({ item }) => {
      return (
        <UI.Box style={{ marginRight: 18, }}>
          <UI.TouchableOpacity>
            <UI.CbImage imageJsx={<Image alt='image' id="recentOrderImage" source={{ uri: item.Image }} style={[styles.recentOrderImage
            ]} />} />
          </UI.TouchableOpacity>
          <UI.Box style={styles.recentMainList}>
            <UI.Text id="recentOrderName"
              style={[
                styles.recentOrderName,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >{item.Item_Name}
            </UI.Text>

            <UI.TouchableOpacity
              activeOpacity={0.5}
            >
              <UI.CbAddToCartButton mealItemDetails={{}} style={styles.recentBtn} />
            </UI.TouchableOpacity>
          </UI.Box>
        </UI.Box>
      );
    };

    return (
      <UI.Box style={styles.recentContainer}>
        <UI.CbFlatList
          flatlistData={RecentOrderData}
          horizontal
          children={({ item }) => <RenderingRecentOrders item={item} />}
        />
        <UI.TouchableOpacity onPress={() => navigateToScreen(props, "Recentorders", true)}>
          <UI.Text
            style={[
              styles.seeAllRecentOrders,
            ]}
          >Show All</UI.Text>
        </UI.TouchableOpacity>
      </UI.Box>
    );
  };

  const renderMenuOrderItems = () => {
    if(errorMessage ===""){
      if(loading){
        return (
          <CbLoader />
        )
      }else{
        return(
          <>
          <UI.Box style={styles.topContainer}>
            {mealPeriods.map((item) => {
                return renderMealTypeList(item, setMealType);
              })}
          </UI.Box>
         
          {renderCategoryMainList()}

          {cartData?.length > 0 && <UI.CbFloatingButton props={props} />}
        </>
        )
      }
    }else{
      return(
        <UI.Text style={styles.emptyMealTxt}>{errorMessage}</UI.Text>
      )
    }
  }
  return (
    
    <UI.CbBox id="MenuorderContainer" pageId={'MenuOrder'} style={styles.mainContainer}>
      <UI.CbBox id="MainHeaderContainer" pageId={'MenuOrder'} Conditionalstyle={isRecentOrderOpen ? {marginTop:6}:{marginVertical: 6}} styles={[styles.mainHeaderContainer,isRecentOrderOpen ? {marginTop:6}:{marginVertical: 6}]}>
        {
          !isRecentOrderOpen && <UI.cbSearchbox id="ItemSearch" pageId={'MenuOrder'} controlsConfigJson={controlsConfigJson} onSearchActivate={() => handleChangeState()} isRecentOrderOpen={isRecentOrderOpen && true}/>
        }
        {!isSearchActive && (
          <UI.TouchableOpacity style={[styles.recentOrderContainer,{width:isRecentOrderOpen?"100%":"90%"}]} onPress={() => openRecentOrder()}>
            <UI.CbBox id="RecentOrderBox" pageId={'MenuOrder'} style={styles.recentOrderBox}>
               <UI.CbImage id="RecentOrderIcon" pageId={'MenuOrder'} imageJsx={<Image source={require('@/assets/images/icons/ROCart3x.png')} style={styles.recentOrderIcon}/>}/>
               <UI.CbText id="ROText" pageId={'MenuOrder'}  style={styles.recentOrderTxt}/>
            </UI.CbBox> 
            <UI.CbImage id="RoNavIcon" pageId={'MenuOrder'} imageJsx={<Image source={require('@/assets/images/icons/RONav.png')} style={styles.dropdownIcon}/>}/>          
          </UI.TouchableOpacity>
        )}
      </UI.CbBox>
      {
        isRecentOrderOpen && <OnRecentOrderPress /> 
      }

      {renderMenuOrderItems()}

    </UI.CbBox>
  );
}

