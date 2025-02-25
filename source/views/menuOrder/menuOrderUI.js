import * as UI from "@/components/cobalt/importUI";
import {
  useFormContext,
} from "@/components/cobalt/event";
import { Icon } from '@/components/ui/icon';
import { useMenuOrderLogic } from "@/source/controller/menuOrder/menuOrder";
import {  Image, Modal } from "react-native";
import { navigateToScreen } from '@/source/constants/Navigations'
import { RecentOrderData } from "@/source/constants/commonData";
import {ChevronRightIcon,ChevronDownIcon ,ChevronUpIcon,CloseIcon} from '@/components/ui/icon';
import { styles } from "@/source/styles/MenuOrder";
import CbLoader from "@/components/cobalt/cobaltLoader";
import {  useRef, useState } from "react";
import { postQuantityApiCall } from "@/components/cobalt/ui";
import ItemModifier from "../ItemModifier/ItemModifierUI";
import { responsiveHeight } from "react-native-responsive-dimensions";

const pageId = "MenuOrder";
export default function MenuOrderScreen(props) {
  let pageConfigJson = global.appConfigJsonArray?.find(
    (item) => item?.PageId === pageId
  );

  global.controlsConfigJson =
    pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
  const configItems = global.controlsConfigJson?.reduce((acc, item) => {
    if (["mealTypeLabel", "timeLabel", "mealTypeBtn", "tapBarBtn", "recentOrderName", "seeAllRecentOrders", "recentOrderImage"].includes(item.id)) {
      acc[item.id] = item;
    }
    return acc;
  }, {});

  const { mealTypeLabel, timeLabel, mealTypeBtn, tapBarBtn, recentOrderName, seeAllRecentOrders, recentOrderImage } = configItems;

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
      modifiersResponseData,
      updateModifierCartItem,
      isExitProfitCenter,setIsExitProfitCenter
    } = useFormContext();

  const {
      toggleSubmenu,
      expandedSubmenus,
      isRecentOrderOpen,
      openRecentOrder,
      errorMessage,
      loading,
      mealPeriods,
      selectedCategory,
      setSelectedCategory
    } = useMenuOrderLogic(props)

  const categoryRefs = useRef({});
  const scrollViewRef = useRef(null);
  const categoryScrollRef = useRef(null);
  const categoryPositions = useRef({});
  const [itemPositions, setItemPositions] = useState({});

  const [expandedIds,setExpandedIds] = useState([])

  const modifierCartItem = modifierCartItemData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
  const singleItemPrice = modifierCartItem ? Math.floor(modifierCartItem?.quantityIncPrice * 100) / 100  : 0;
  const cartItemDetails = cartData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
  const quantity = cartItemDetails ? cartItemDetails?.quantity : 0;
  const totalCartPrice = cartItemDetails ? cartItemDetails?.quantityIncPrice : 0;

  const openItemDetails = async (box) => {
    let quantityInfo = await postQuantityApiCall(1, box?.Item_ID)
    storeSingleItem({...box,response:quantityInfo.response})
    increaseQuantity(box)
    closePreviewModal()
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
    const existingCartItem = cartData?.find((items) => items.Item_ID === singleItemDetails.Item_ID)
    if(isItemAvailableInCart){
      updateModifierCartItem(existingCartItem)
    }else{
      addItemToModifierForCart(singleItemDetails);
      closePreviewModal();
    }
  }

  const renderMealTypeList = (mealTypeItem) => {
    return (
      <UI.Box style={styles.mealTypeContainer}>
        <UI.TouchableOpacity
          activeOpacity={0.6}
          style={[  
            mealTypeItem.IsSelect === 1
              ? [
                styles.activeMenuType,
                {
                  backgroundColor: mealTypeBtn?.activeBackgroundColor
                    ? mealTypeBtn.activeBackgroundColor
                    : "#00C6FF",
                  borderRadius: mealTypeBtn?.borderRadius
                    ? mealTypeBtn?.borderRadius
                    : 5,
                },
              ]
              : styles.inactiveMenuType,
          ]}
          onPress={() => setMealType(mealTypeItem.MealPeriod_Id,mealTypeItem.IsEnabled)}
      >
          <UI.Text
            style={[
              mealTypeLabel?.styles
                ? mealTypeLabel?.styles
                : styles.mealTypeLabel,
              { color: mealTypeItem.IsSelect === 1 ? "#ffffff" : "#717171" },
            ]}
          >
            {mealTypeItem.MealPeriod_Name?.toUpperCase()}
          </UI.Text>
          <UI.Text
            style={[
              timeLabel?.styles ? timeLabel?.styles : styles.timeDurationTxt,
              { color: mealTypeItem.IsSelect === 1 ? "#fff" : "#717171" },
            ]}
          >
            {mealTypeItem.Time}
          </UI.Text>
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
                tapBarBtn?.styles ? tapBarBtn?.styles : styles.bottomStyle,
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
                scrollEnabled={false}
                data={category.submenus}
                renderItem={({ item }) => {
                  const subMenuItem = item
                  return (
                    <>
                      {item.SubMenu_Name !== null && (
                        <UI.TouchableOpacity
                          activeOpacity={0.5}
                          style={styles.cardMainContainer}
                          onPress={() => toggleSubmenu(subMenuItem.SubMenu_ID)}
                        >
                          <UI.Text style={styles.itemCategoryLabel}>
                            {item.SubMenu_Name}
                          </UI.Text>
                          {expandedSubmenus[subMenuItem.SubMenu_ID] ? (
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
                      <UI.Box style={styles.mainItemContainer}>
                      {expandedSubmenus[subMenuItem.SubMenu_ID] && (
                        item.items.map((item,index) => {
                          let box = item;
                          const lastItem =
                            index === subMenuItem.items?.length - 1;
                          const isExpanded = expandedIds.includes(box?.Item_ID);
                          return (
                            <UI.TouchableOpacity
                              activeOpacity={0.5}
                              disabled={box.IsAvailable === 0}
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
                                    <UI.TouchableOpacity onPress={() =>
                                      handleReadMoreToggle(box.Item_ID)
                                    }>
                                      <UI.Text style={styles.underLineTxt}>
                                        {isExpanded ? "Show Less" : "Read More"}
                                      </UI.Text>
                                    </UI.TouchableOpacity>
                                   
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
                                    <Image
                                      source={{ uri: item.ImageUrl }}
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
                        })
                        
                      )}
                      </UI.Box>
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
                <UI.Text style={styles.orderAmount}>{`$${quantity > 1 ?totalCartPrice:singleItemPrice}`}</UI.Text>
              </UI.Box>
              <UI.CbCommonButton
                showBtnName={updateOrAddTxt}
                style={styles.addToCartBtn}
                btnTextStyle={styles.addCartTxt}
                onPress={() => handleModifierAddCart()}
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
            <UI.CbImage imageJsx={<Image alt='image' id="recentOrderImage" source={{ uri: recentOrderImage?.Image ? recentOrderImage?.Image : item.Image }} style={[recentOrderImage?.borderRadius ? { borderRadius: recentOrderImage.borderRadius } : styles.recentOrderImage
            ]} />} />
          </UI.TouchableOpacity>
          <UI.Box style={styles.recentMainList}>
            <UI.Text id="recentOrderName"
              style={[
                recentOrderName?.styles ? recentOrderName?.styles : styles.recentOrderName,
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
              seeAllRecentOrders?.styles ? seeAllRecentOrders?.styles : styles.seeAllRecentOrders,
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
    <UI.Box style={styles.mainContainer}>
      <UI.Box style={[styles.mainHeaderContainer,isRecentOrderOpen ? {marginTop:6}:{marginVertical: 6}]}>
        {
          !isRecentOrderOpen && <UI.cbSearchbox onSearchActivate={() => handleChangeState()} isRecentOrderOpen={isRecentOrderOpen && true}/>
        }
        {!isSearchActive && (
          <UI.TouchableOpacity style={[styles.recentOrderContainer,{width:isRecentOrderOpen?"100%":"90%"}]} onPress={() => openRecentOrder()}>

            <UI.Box style={styles.recentOrderBox}>
              <UI.TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <UI.CbImage imageJsx={<Image source={require('@/assets/images/icons/ROCart3x.png')} style={styles.recentOrderIcon}/>}/>
              </UI.TouchableOpacity>
              <UI.Text style={styles.recentOrderTxt}>
                Recent Orders
              </UI.Text>
            </UI.Box>

            <UI.TouchableOpacity style={styles.rightIconBtn} onPress={() => openRecentOrder()}>
              <Icon as={isRecentOrderOpen ? ChevronDownIcon:ChevronRightIcon} style={styles.dropdownIcon}/>
            </UI.TouchableOpacity>
          </UI.TouchableOpacity>
        )}
      </UI.Box>
      {
        isRecentOrderOpen && <OnRecentOrderPress /> 
      }

      {renderMenuOrderItems()}

      <Modal
        visible={isExitProfitCenter}
        transparent
        animationType="fade"
        onRequestClose={() => setIsExitProfitCenter(false)}
      >
        <UI.View
          style={styles.modalContainer}
          onPress={() => setIsExitProfitCenter(false)}
        />

        <UI.Box style={styles.confirmMdl}>
          <UI.Box style={styles.innerModal}>
            <UI.Box style={styles.innerModalMsgContainer}>
              <UI.Text style={styles.innerModalAlertTxt}>
              Are you sure you want to leave the profit center? All items in your cart will be deleted if you proceed
              </UI.Text>

              <UI.Box style={styles.discardBtn}>
                <UI.TouchableOpacity
                  onPress={() => setIsExitProfitCenter(false)}
                  style={styles.modalNoYesBtn}
                >
                  <UI.Text style={styles.modalNoYesBtnTxt}>No</UI.Text>
                </UI.TouchableOpacity>

                <UI.TouchableOpacity
                  onPress={() => props.navigation.goBack()}
                  style={styles.modalNoYesBtn}
                >
                  <UI.Text style={styles.modalNoYesBtnTxt}>Yes</UI.Text>
                </UI.TouchableOpacity>
              </UI.Box>
            </UI.Box>
          </UI.Box>
        </UI.Box>
      </Modal>

    </UI.Box>
  );
}

