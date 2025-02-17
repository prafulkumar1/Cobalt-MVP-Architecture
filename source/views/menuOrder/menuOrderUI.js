import * as UI from "@/components/cobalt/importUI";
import {
  useFormContext,
} from "@/components/cobalt/event";
import { Icon } from '@/components/ui/icon';
import { useMenuOrderLogic } from "@/source/controller/menuOrder/menuOrder";
import { Image, Modal } from "react-native";
import { navigateToScreen } from '@/source/constants/Navigations'
import { RecentOrderData } from "@/source/constants/commonData";
import {ChevronRightIcon,ChevronDownIcon ,ChevronUpIcon,CloseIcon} from '@/components/ui/icon';
import { styles } from "@/source/styles/MenuOrder";
import CbLoader from "@/components/cobalt/cobaltLoader";
import {  useRef, useState } from "react";
import { Image as ExpoImage } from 'expo-image';
import { postQuantityApiCall } from "@/components/cobalt/ui";
import ItemModifier from "../ItemModifier/ItemModifierUI";

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

  const {menuLoading, menuOrderData, setMealCategory, setMealType, isCategoryEmpty, isSearchActive, handleChangeState,cartData,addedModifierCartData ,closePreviewModal,storeSingleItem,itemDataVisible} = useFormContext();

  const { isRecentOrderOpen,openRecentOrder,errorMessage,loading,mealPeriods,categoryData,selectedCategory,flatListRef ,handleViewableItemsChanged,setSelectedCategory} = useMenuOrderLogic(props)
  const categoryRefs = useRef({});
  const scrollViewRef = useRef(null);
  const [itemPositions, setItemPositions] = useState({});

  const [expandedIds,setExpandedIds] = useState([])
  const [expandedSubmenus, setExpandedSubmenus] = useState(
    selectedCategory.reduce((acc, category) => {
      acc[category.Category_ID] = true;
      return acc;
    }, {})
  );
   const openItemDetails = async (box) => {
      let quantityInfo = await postQuantityApiCall(1, box?.Item_ID)
      if(box.IsAvailable ===1){
        storeSingleItem({...box,response:quantityInfo.response})
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
      scrollViewRef.current.scrollTo({ y: yPosition, animated: true });
    }
  };
  const renderMenuCategoryList = (item) => {
    return (
      <UI.Box>
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
    };
  
    const handleLayout = (categoryId, event) => {
      const layout = event.nativeEvent.layout;
      categoryRefs.current[categoryId] = layout.y;
    };

    const toggleSubmenu = (categoryId) => {
      setExpandedSubmenus((prevState) => ({
        ...prevState,
        [categoryId]: !prevState[categoryId],
      }));
    };



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
        >
          {selectedCategory.map((group) => renderMenuCategoryList(group))}
        </UI.ScrollView>

        <UI.ScrollView style={styles.bottomMiddleContainer}
          ref={scrollViewRef}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          {selectedCategory.map((category) => {
            return (
              <UI.FlatList
                onLayout={(e) => {handleLayout(category.Category_ID, e);handleItemLayout(category.Category_ID, e)}}
                data={category.submenus}
                renderItem={({ item }) => {
                  const subMenuItem = item
                  return (
                    <>
                      <UI.TouchableOpacity activeOpacity={0.5} style={styles.cardMainContainer} onPress={() => toggleSubmenu(category.Category_ID)}>
                        <UI.Text style={styles.itemCategoryLabel}>{item.SubMenu_Name}</UI.Text>
                        {expandedSubmenus[category.Category_ID] ? (
                          <ChevronUpIcon style={styles.icon} color="#5773a2" size={"xl"}/>
                        ) : (
                          <ChevronDownIcon style={styles.icon} color="#5773a2" size={"xl"}/>
                        )}
                      </UI.TouchableOpacity>
                      {expandedSubmenus[category.Category_ID] && (
                        <UI.FlatList
                          data={item.items}
                          style={{ backgroundColor: "#fff" }}
                          renderItem={({ item, index }) => {
                            let box = item;
                            const lastItem =
                              index === subMenuItem.items?.length - 1;
                            const isExpanded = expandedIds.includes(box?.Item_ID);

                            return (
                              <UI.TouchableOpacity
                                activeOpacity={0.5}
                                disabled={box.IsAvailable !== 1}
                                onPress={() =>
                                  openItemDetails(box)
                                }
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
                                      numberOfLines={
                                        isExpanded ? undefined : 2
                                      }
                                      style={[
                                        styles.priceTxt,
                                        showActiveAvailableColor(
                                          box.IsAvailable,
                                          box.IsDisable
                                        ),
                                      ]}
                                    >
                                      {`$${box?.Price != null
                                        ? box?.Price
                                        : 0
                                        }`}
                                    </UI.Text>
                                    <UI.Text
                                      numberOfLines={
                                        isExpanded ? undefined : 1
                                      }
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
                                    {box?.Description?.length > 35 && (
                                      <UI.Text
                                        onPress={() =>
                                          handleReadMoreToggle(
                                            box.Item_ID
                                          )
                                        }
                                        style={styles.underLineTxt}
                                      >
                                        {isExpanded
                                          ? "Show Less"
                                          : "Read More"}
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
                                        source={{ uri: box.ImageUrl }}
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
          <UI.TouchableOpacity
            // onPress={() => this.handleCloseItemDetails(setIsVisible, updateModifierItemQuantity, closePreviewModal, selectedModifiers, setSelectedModifiers, singleItemDetails)}
            style={styles.crossIcon}
          >
            <Icon as={CloseIcon} color="#fff" size={'md'} style={{ width: 20, height: 20 }} />

          </UI.TouchableOpacity>
          <UI.Box style={styles.blackShadow} />
          <ItemModifier />
          <UI.Box style={styles.footerContainer}>
            <UI.Box>
              <UI.Text style={styles.totalAmountTxt}>Total Amount</UI.Text>
              <UI.Text
                style={styles.orderAmount}
              >{`$23`}</UI.Text>
            </UI.Box>
            <UI.CbCommonButton
              showBtnName={"Add to Cart"}
              style={styles.addToCartBtn}
              btnTextStyle={styles.addCartTxt}
            // onPress={() => {
            //   navigateToScreen(this.props, "MyCart", true);
            //   addItemToModifierForCart(singleItemDetails);
            //   closePreviewModal();
            //   setTimeout(() => {
            //     commentValue.current = "";
            //   }, 1000);
            // }}
            />
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
              <UI.CbAddToCartButton mealItemDetails={{}} style={styles.addToCartBtn} />
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

          {(cartData?.length > 0 || addedModifierCartData?.length > 0) && <UI.CbFloatingButton props={props} />}
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
              <Icon as={isRecentOrderOpen ? ChevronDownIcon:ChevronRightIcon} style={{width:25,height:25}}/>
            </UI.TouchableOpacity>
          </UI.TouchableOpacity>
        )}
      </UI.Box>
      {
        isRecentOrderOpen && <OnRecentOrderPress /> 
      }

      {renderMenuOrderItems()}

    </UI.Box>
  );
}

