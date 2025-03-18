import * as UI from "@/components/cobalt/importUI";
import {
  useFormContext,
} from "@/components/cobalt/event";
import { Icon } from '@/components/ui/icon';
import { useMenuOrderLogic } from "@/source/controller/menuOrder/menuOrder";
import { Image, Modal } from "react-native";
import { navigateToScreen } from '@/source/constants/Navigations'
import { RecentOrderData } from "@/source/constants/commonData";
import { ChevronRightIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon } from '@/components/ui/icon';
import { Image as ExpoImage } from 'expo-image';
import { styles } from "@/source/styles/MenuOrder";
import CbLoader from "@/components/cobalt/cobaltLoader";
import { useRef, useState, useEffect } from "react";
import { postQuantityApiCall } from "@/components/cobalt/ui";
import ItemModifier from "../ItemModifier/ItemModifierUI";
import { loadPageConfig } from '@/source/constants/ConfigLoad';


let controlsConfigJson=[]; 
const pageId = "MenuOrder";
export default function MenuOrderScreen(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false); // New local state
  const [searchTrigger, setSearchTrigger] = useState(false); // New state to force re-render


  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems([]);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase().trim();
      const searchTerms = lowerCaseQuery.split(" ").filter(Boolean); // Split into words for multi-word search

      let allItems = selectedCategory.flatMap(category =>
        (category.submenus || []).flatMap(submenu =>
          (submenu.items || []).map(item => ({
            ...item,
            categoryName: category.Category_Name || "",
            subMenuName: submenu.SubMenu_Name || ""
          }))
        )
      );

      // **1️⃣ Exact Match Priority (Only Show This If Fully Typed)**
      const exactMatches = allItems.filter(item =>
        item?.Item_Name?.toLowerCase() === lowerCaseQuery
      );

      // **If an exact match exists, return only that item**
      if (exactMatches.length > 0) {
        setFilteredItems([{
          Category_Name: exactMatches[0].categoryName,
          submenus: [{
            SubMenu_Name: exactMatches[0].subMenuName,
            items: exactMatches
          }]
        }]);
        setSearchTrigger(prev => !prev); // Force re-render
        return;
      }

      // **2️⃣ Prefix Search - Items that start with the search query**
      const startsWithQuery = allItems.filter(item =>
        item?.Item_Name?.toLowerCase().startsWith(lowerCaseQuery)
      );

      // **3️⃣ Full Word Matches - Items that contain the search term as a whole word**
      const fullWordMatches = allItems.filter(item =>
        item?.Item_Name?.toLowerCase().split(" ").includes(lowerCaseQuery)
      );

      // **4️⃣ Substring Matches - Items that contain the search anywhere in the name**
      const containsQuery = allItems.filter(item =>
        item?.Item_Name?.toLowerCase().includes(lowerCaseQuery) &&
        !item?.Item_Name?.toLowerCase().split(" ").includes(lowerCaseQuery) &&
        !item?.Item_Name?.toLowerCase().startsWith(lowerCaseQuery)
      );

      // **Combine and Sort by Priority**
      const sortedItems = [
        ...startsWithQuery, // First priority (Prefix match)
        ...fullWordMatches, // Second priority (Full-word match)
        ...containsQuery    // Last priority (Substring match)
      ];

      // **Re-group into categories and submenus**
      const newFilteredItems = sortedItems.reduce((acc, item) => {
        if (!item.Item_Name) return acc;

        let category = acc.find(c => c.Category_Name === item.categoryName);
        if (!category) {
          category = { Category_Name: item.categoryName, submenus: [] };
          acc.push(category);
        }

        let submenu = category.submenus.find(s => s.SubMenu_Name === item.subMenuName);
        if (!submenu) {
          submenu = { SubMenu_Name: item.subMenuName, items: [] };
          category.submenus.push(submenu);
        }

        submenu.items.push(item);
        return acc;
      }, []);

      setFilteredItems(newFilteredItems);
      setSearchTrigger(prev => !prev); // Force re-render
    }
  }, [searchQuery, selectedCategory]);

  const {       
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
    isExitProfitCenter,
    setIsExitProfitCenter,
    setModifierCartItemData,
    updateWithoutModifierCartItem,
    setFormFieldData
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
      expandedIds,
      scrollViewRef,
      categoryScrollRef,
      setMealType,
      openItemDetails,
      handleReadMoreToggle,
      handleModifierAddCart,
      removeCartItems,
      handleCategoryClick,
      handleCategoryLayout,
      handleLayout,
      handleCloseItemDetails,
      handleScroll,
      handleItemLayout
    } = useMenuOrderLogic(props)

  const modifierCartItem = modifierCartItemData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
  const singleItemPrice = modifierCartItem ?  Math.floor(Math.floor(modifierCartItem?.quantityIncPrice * 100) / 100 * 100) / 100 : 0;
  const cartItemDetails = cartData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
  const quantity = cartItemDetails ? cartItemDetails?.quantity : 0;
  const totalCartPrice = cartItemDetails ?  Math.floor(cartItemDetails?.quantityIncPrice * 100) / 100 : 0;
 
  const renderMealTypeList = (mealTypeItem) => {
    return (
      <UI.CbBox id="MealTypeContainer" pageId={'MenuOrder'} style={styles.mealTypeContainer}>
        <UI.TouchableOpacity activeOpacity={0.6}  onPress={() => {setMealType(mealTypeItem,mealTypeItem.IsEnabled)}}>
        <UI.Box id="MenuMealType" pageId={'MenuOrder'} style={[styles.MenuMealType,mealTypeItem.IsSelect === 1 ? { backgroundColor: "#00C6FF"}:{ backgroundColor: "#ECECEC",opacity: 0.8}]}  >
        <UI.Text id="MealTypeLabel" pageId={'MenuOrder'}  style={[styles.mealTypeLabel,{ color: mealTypeItem.IsSelect === 1 ? "#ffffff" : "#717171" },]}  >
            {mealTypeItem.MealPeriod_Name?.toUpperCase()}
        </UI.Text>
          <UI.Text id="MealTimeDuration" pageId={'MenuOrder'}   style={[styles.timeDurationTxt,{ color: mealTypeItem.IsSelect === 1 ? "#fff" : "#717171" }]}          >
            {mealTypeItem.Time}
          </UI.Text>
          </UI.Box>
        </UI.TouchableOpacity>
        </UI.CbBox>
    );
  }

  const renderMenuCategoryList = (item) => {
    return (
      <UI.Box onLayout={(e) => handleCategoryLayout(e, item.Category_ID)}>
        <UI.TouchableOpacity
          style={styles.categoryBtn}
          activeOpacity={0.6}
          onPress={() => handleCategoryClick(item.Category_ID)}
        >
            <UI.CbText id="CategoryText" pageId="MenuOrder" style={styles.categoryText}>
                {item.Category_Name?.toUpperCase()}
            </UI.CbText>
          {item.CategoryIsSelect === 1 && (
             <UI.CbBox id="BottomStyle" pageId="MenuOrder"
             style={[styles.bottomStyle]} />
          )}
        </UI.TouchableOpacity>
      </UI.Box>
    );
  }

  const handleSearchPress = () => {
    setIsSearchTriggered(true); // Set true when search icon is pressed
    setSearchQuery(""); // Clear previous search query
  }

  const handleBackPress = () => {
    setSearchQuery(""); // Clear search query
    setFilteredItems(selectedCategory); // Restore all items
    setIsSearchTriggered(false); // Disable search mode
  };

  const renderCategoryMainList = () => {

    const showActiveAvailableColor = (isAvailable,IsDisable) => {
      return { color: isAvailable === 1 &&IsDisable===0  ? "#4B5154" : "#4B515469" };
    };
   
    if (isCategoryEmpty) {
      return (
        <UI.CbBox id="EmptyListContainer" pageId="MenuOrder" style={styles.emptyListContainer}>
          <UI.CbText id="EmptyMealTxt" pageId="MenuOrder" style={styles.emptyMealTxt}></UI.CbText>
        </UI.CbBox>
      );
    }

    return (
      <UI.Box style={styles.mainBoxContainer}>
      {searchQuery.trim() === "" && (
          <UI.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryListContainer}
            ref={categoryScrollRef}
          >
            {selectedCategory?.map((group) => renderMenuCategoryList(group))}
          </UI.ScrollView>
        )}

        <UI.ScrollView style={styles.bottomMiddleContainer}
          ref={scrollViewRef}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.mainContainerList}
        >
   {
            searchQuery.trim() !== "" && filteredItems.length === 0 ? (
              <UI.Box style={{ flex: 1, justifyContent: "center", alignItems: "center" }} />
            ) : (
              filteredItems.length > 0 ? (
                <UI.FlatList
                  data={filteredItems}
                  keyExtractor={(category, index) => `category-${category.Category_ID}-${searchQuery}-${index}`} // 🔥 Unique key changes on search
                  renderItem={({ item: category }) => (
                    <UI.FlatList
                      data={category.submenus}
                      keyExtractor={(submenu) => `submenu-${submenu.SubMenu_ID}`}
                      renderItem={({ item: submenu }) => (
                        <>
                          <UI.TouchableOpacity
                            activeOpacity={0.5}
                            style={styles.cardMainContainer}
                            onPress={() => toggleSubmenu(category.Category_ID)}
                          >
                             <UI.CbText id="ItemCategoryLabel" pageId="MenuOrder" style={styles.itemCategoryLabel}>
                            {item.SubMenu_Name}
                          </UI.CbText>
                            {searchQuery.trim() !== "" || expandedSubmenus[category.Category_ID] ? (
                             <ChevronUpIcon style={styles.icon} color="#5773a2" size={"xl"} />
                            ) : (
                              <ChevronDownIcon style={styles.icon} color="#5773a2" size={"xl"} />
                              )}
                          </UI.TouchableOpacity>

                          {(searchQuery.trim() !== "" || expandedSubmenus[category.Category_ID]) && (
                            <UI.CbFlatList
                              flatlistData={submenu.items}
                              customStyles={{ backgroundColor: "#fff" }}
                              children={({ item: box, index }) => {
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
                                        opacity: box?.IsAvailable === 1 && box?.IsDisable === 0 ? 1 : 0.8,
                                      },
                                    ]}
                                  >
                                    <UI.CbBox id="ItemrowContainer" pageId="MenuOrder" style={styles.rowContainer}>
                                      <UI.CbBox id="ItemtextContainer" pageId="MenuOrder" style={[styles.textContainer]}>
                                        <UI.CbText id="Itemnametext" pageId="MenuOrder"
                                          numberOfLines={1}
                                          style={[
                                            styles.mealTypeTitle,
                                            showActiveAvailableColor(box?.IsAvailable, box?.IsDisable),
                                            { textAlign: "justify" },
                                          ]}
                                          Conditionalstyle={showActiveAvailableColor(box?.IsAvailable, box?.IsDisable)}
                                        >
                                          {box?.Item_Name}
                                        </UI.CbText>
                                        <UI.Text
                                          numberOfLines={isExpanded ? undefined : 2}
                                          style={[
                                            styles.priceTxt,
                                            showActiveAvailableColor(box.IsAvailable, box.IsDisable),
                                          ]}
                                        >
                                          {`$${box?.Price != null ? box?.Price : 0}`}
                                        </UI.Text>
                                        <UI.Text
                                          numberOfLines={isExpanded ? undefined : 2}
                                          style={[
                                            styles.descriptionTxt,
                                            showActiveAvailableColor(box.IsAvailable, box.IsDisable),
                                            { textAlign: "left", letterSpacing: -0.5 },
                                          ]}
                                        >
                                          {box?.Description}
                                        </UI.Text>
                                        {box?.Description?.length > 68 && (
                                          <UI.Text
                                            onPress={() => handleReadMoreToggle(box.Item_ID)}
                                            style={styles.underLineTxt}
                                          >
                                            {isExpanded ? "Show Less" : "Read More"}
                                          </UI.Text>
                                        )}
                                      </UI.CbBox>

                                      <UI.Box style={styles.imageContainer}>
                                        <UI.Box
                                          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                                          disabled={box.IsAvailable === 0 && box.IsDisable === 1}
                                        >
                                          <Image
                                            source={{ uri: box.ImageUrl }}
                                            style={[
                                              styles.mealTypeImg,
                                              box.IsAvailable === 0 && box.IsDisable === 1 && {
                                                opacity: 0.4,
                                              },
                                            ]}
                                          />
                                        </UI.Box>
                                        <UI.CbAddToCartButton mealItemDetails={box} />
                                      </UI.Box>
                                    </UI.CbBox>
                                  </UI.TouchableOpacity>
                                );
                              }}
                            />
                          )}
                        </>
                      )}
                    />
                  )}
                />
              ):(
            
            selectedCategory?.map((category) => {
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
                          <UI.CbText id="ItemCategoryLabel" pageId="MenuOrder" style={styles.itemCategoryLabel}>
                            {item.SubMenu_Name}
                          </UI.CbText>
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
                              disabled={(box.IsAvailable === 0 && box.IsDisable === 1)}
                              onPress={() => openItemDetails(box)}
                              key={box?.Item_ID}
                              style={[
                                styles.subContainer,
                                {
                                  opacity:
                                    (box?.IsAvailable === 1 &&
                                    box?.IsDisable === 0)
                                      ? 1
                                      : 0.8,
                                },
                              ]}
                            >
                              <UI.CbBox id="ItemrowContainer" pageId="MenuOrder" style={styles.rowContainer}>
                              <UI.CbBox id="ItemtextContainer" pageId="MenuOrder" style={[styles.textContainer]}>
                              <UI.CbText id="Itemnametext" pageId="MenuOrder"
                                          numberOfLines={1}
                                          style={[
                                            styles.mealTypeTitle,
                                            showActiveAvailableColor(box?.IsAvailable, box?.IsDisable),
                                            { textAlign: "justify" },
                                          ]}
                                          Conditionalstyle={showActiveAvailableColor(box?.IsAvailable, box?.IsDisable)}
                                        >
                                    {box?.Item_Name}
                                  </UI.CbText>
                                  <UI.CbText id="Itempricetext" pageId="MenuOrder" numberOfLines={isExpanded ? undefined : 2}
                                    style={[styles.priceTxt,showActiveAvailableColor(box.IsAvailable,box.IsDisable)]}
                                    Conditionalstyle={showActiveAvailableColor(box?.IsAvailable, box?.IsDisable)}
                                  >
                                    {`$${box?.Price != null? box?.Price: 0}`}
                                  </UI.CbText>
                                  <UI.Text id="Itemdescriptiontext" pageId="MenuOrder"
                                    numberOfLines={isExpanded ? undefined : 2}
                                    style={[styles.descriptionTxt,showActiveAvailableColor( box.IsAvailable,box.IsDisable),
                                      {
                                        textAlign: "left",
                                        letterSpacing: -0.5,
                                      },
                                    ]}
                                    Conditionalstyle={showActiveAvailableColor(box?.IsAvailable, box?.IsDisable)}
                                  >
                                    {box?.Description}
                                  </UI.Text>
                                  {box?.Description?.length > 68 && (
                                    <UI.TouchableOpacity onPress={() =>
                                      handleReadMoreToggle(box.Item_ID)
                                    }>
                                      <UI.CbText id="Itemunderlinetext" pageId="MenuOrder"  style={styles.underLineTxt}>
                                        {isExpanded ? "Show Less" : "Read More"}
                                      </UI.CbText>
                                    </UI.TouchableOpacity>
                                   
                                  )}
                                </UI.CbBox>

                                        <UI.Box style={styles.imageContainer}>
                                          <UI.Box
                                            style={{
                                              backgroundColor:
                                                "rgba(255, 255, 255, 0.2)",
                                            }}
                                            disabled={(box.IsAvailable === 0 && box.IsDisable === 1) ? true : false}
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
                                          <UI.CbAddToCartButton id="AddtoCartButton" pageId="MenuOrder"  mealItemDetails={box} />
                                        </UI.Box>
                                      </UI.CbBox>
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
                })))}
        </UI.ScrollView>

        <Modal
          visible={itemDataVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closePreviewModal}
        >
          <UI.CbBox id="ModalBackground" pageId="MenuOrder" style={styles.modalBackground}>
            <UI.TouchableOpacity style={styles.crossIcon}
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
            >
              <UI.CbBox id="CloseIconContainer" pageId="MenuOrder"  style={styles.CloseIconContainer} >
               <UI.CbImage id="CloseIcon" pageId={'MenuOrder'} imageJsx={<Image source={require('@/assets/images/icons/Modal_Close.png')} style={styles.closeIcon}/>}/>    
              </UI.CbBox>
            </UI.TouchableOpacity>
            <UI.CbBox id="ModiferItems" pageId="MenuOrder" style={styles.modiferItems}>
              <ItemModifier />
            </UI.CbBox>
            <UI.CbBox id="FooterContainer" pageId="MenuOrder" style={styles.footerContainer}>
              <UI.Box>
                <UI.CbText id="TotalAmountText" pageId="MenuOrder"  style={styles.totalAmountTxt}>Total Amount</UI.CbText>
                {/* <UI.Text style={styles.orderAmount}>{`$${quantity > 1 ? totalCartPrice : singleItemPrice}`}</UI.Text> */}
                <UI.CbText id="OrderAmount" pageId="MenuOrder" style={styles.orderAmount}>{`$${quantity > 1 ? totalCartPrice : singleItemPrice}`}</UI.CbText>
              </UI.Box>
              <UI.CbCommonButton id="AddCartButton" pageId="MenuOrder" 
                showBtnName={""}
                style={styles.addToCartBtn}
                btnTextStyle={styles.addCartTxt}
                onPress={() => handleModifierAddCart()} 
              />
            </UI.CbBox>
          </UI.CbBox>
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
              seeAllRecentOrders?.styles ? seeAllRecentOrders?.styles : styles.seeAllRecentOrders,
            ]}
          >Show All</UI.Text>
        </UI.TouchableOpacity>
      </UI.Box>
    );
  };

  const renderMenuOrderItems = () => {
    if (errorMessage === "") {
      if (loading) {
        return (
          <CbLoader />
        )
      } else {
        return (
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
    } else {
      return (
        <UI.Text style={styles.emptyMealTxt}>{errorMessage}</UI.Text>
      )
    }
  }

  return (
    <UI.CbBox id="MenuorderContainer" pageId={'MenuOrder'} style={styles.mainContainer}>
    <UI.CbBox id="MainHeaderContainer" pageId={'MenuOrder'} Conditionalstyle={isRecentOrderOpen ? {marginTop:6}:{marginVertical: 6}} styles={[styles.mainHeaderContainer,isRecentOrderOpen ? {marginTop:6}:{marginVertical: 6}]}>
      {
        !isRecentOrderOpen && <UI.cbSearchbox id="ItemSearch" pageId={'MenuOrder'} onSearchActivate={() => handleChangeState()} isRecentOrderOpen={isRecentOrderOpen && true}/>
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
      {isRecentOrderOpen && <OnRecentOrderPress />}

      {renderMenuOrderItems()}

      {isExitProfitCenter && (
        <Modal
          visible={isExitProfitCenter}
          transparent
          animationType="fade"
          onRequestClose={() => setIsExitProfitCenter(false)}
        >
          <UI.CbView id="Modalview" pageId={'MenuOrder'}
            style={styles.modalContainer}
            onPress={() => setIsExitProfitCenter(false)}
          />

          <UI.CbBox id="ConfirmModal" pageId={'MenuOrder'} style={styles.confirmMdl}>
            <UI.CbBox id="InnerModal" pageId={'MenuOrder'}  style={styles.innerModal}>
              <UI.CbBox id="InnerModalMsgContainer" pageId={'MenuOrder'} style={styles.innerModalMsgContainer}>
                <UI.CbText id="InnerModalAlertText" pageId={'MenuOrder'} style={styles.innerModalAlertTxt}/>
                <UI.CbBox id="DiscardButtoncontainer" pageId={'MenuOrder'} style={styles.discardBtn}>
                  <UI.TouchableOpacity onPress={() => setIsExitProfitCenter(false)} >
                    <UI.CbBox id="ModalNoYesBtn" pageId={'MenuOrder'} style={styles.modalNoYesBtn}>
                        <UI.CbText id="ModalNoBtnText" pageId={'MenuOrder'} style={styles.modalNoYesBtnTxt}></UI.CbText>
                    </UI.CbBox>
                  </UI.TouchableOpacity>
                  <UI.TouchableOpacity onPress={() => removeCartItems()} >
                    <UI.CbBox id="ModalNoYesBtn" pageId={'MenuOrder'} style={styles.modalNoYesBtn}>
                      <UI.CbText id="ModalYesBtnText" pageId={'MenuOrder'} style={styles.modalNoYesBtnTxt}></UI.CbText>
                    </UI.CbBox>
                  </UI.TouchableOpacity>
                </UI.CbBox>
              </UI.CbBox>
            </UI.CbBox>
          </UI.CbBox>
        </Modal>
      )}
   </UI.CbBox>
  );
}