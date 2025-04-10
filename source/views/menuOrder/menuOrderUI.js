import * as UI from "@/components/cobalt/importUI";
import {
  useFormContext,
} from "@/components/cobalt/event";
import { Icon } from '@/components/ui/icon';
import { useMenuOrderLogic } from "@/source/controller/menuOrder/menuOrder";
import { Image, Modal } from "react-native";
import { navigateToScreen } from '@/source/constants/Navigations'
import { RecentOrderData } from "@/source/constants/commonData";
import { ChevronRightIcon, ChevronDownIcon, ChevronUpIcon, CloseIcon ,AddIcon,TrashIcon,RemoveIcon} from '@/components/ui/icon';
import { styles } from "@/source/styles/MenuOrder";
import CbLoader from "@/components/cobalt/cobaltLoader";
import { useRef, useState, useEffect } from "react";
import { postQuantityApiCall } from "@/components/cobalt/ui";
import ItemModifier from "../ItemModifier/ItemModifierUI";
import { CbDottedLine } from "@/source/constants/dottedLine";
import { loadPageConfig } from '@/source/constants/ConfigLoad';
import {transformStyles } from '@/components/cobalt/event'
import { Divider } from "@/components/ui/divider";

let controlsConfigJson=[]; 
const pageId = "MenuOrder";
export default function MenuOrderScreen(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false); // New local state
  const [searchTrigger, setSearchTrigger] = useState(false); // New state to force re-render
  const [mealperiodButtonConfig, setMealperiodButtonConfig] = useState(null);
  const [mOAddtoCartButtonConfig, setmOAddtoCartButtonConfig] = useState(null);
  const [categoryMainListConfig, setcategoryMainListConfig] = useState(null); 

  useEffect(() => {
    const loadConfig = async () => {
        const containerConfig = await loadPageConfig("MenuOrder", "MealperiodButton");
        const mOAddtoCartButton = await loadPageConfig("MenuOrder", "MOAddtoCartButton");
        const categoryMainList = await loadPageConfig("MenuOrder", "CategoryMainList");

         setMealperiodButtonConfig(containerConfig);
         setmOAddtoCartButtonConfig(mOAddtoCartButton);
         setcategoryMainListConfig(categoryMainList);
    };
    loadConfig();
}, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems([]);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase().trim();
      const searchTerms = lowerCaseQuery.split(" ").filter(Boolean); // Split into words for multi-word search

      let allItems = selectedCategory?.length > 0 ? selectedCategory?.flatMap(category =>
        (category.submenus || [])?.flatMap(submenu =>
          (submenu.items || [])?.map(item => ({
            ...item,
            categoryName: category.Category_Name || "",
            subMenuName: submenu.SubMenu_Name || ""
          }))
        )
      ) : [];

      // **1️⃣ Exact Match Priority (Only Show This If Fully Typed)**
      const exactMatches = allItems?.filter(item =>
        item?.Item_Name?.toLowerCase() === lowerCaseQuery
      );

      // **If an exact match exists, return only that item**
      if (exactMatches?.length > 0) {
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
    cartData,
    closePreviewModal,
    itemDataVisible,
    setIsVisible, updateModifierItemQuantity, selectedModifiers, singleItemDetails,
    modifierCartItemData,
    setSelectedModifiers,
    updateOrAddTxt,
    isExitProfitCenter,
    setIsExitProfitCenter,
    menuOrderData,
    isKeyboardVisible
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
      handleItemLayout,
      handleAddToCartBtn,
      modifierIncDecBtn,
      apiLoader
    } = useMenuOrderLogic(props)

  const modifierCartItem = modifierCartItemData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
  const cartItemDetails = cartData?.find((item) => item.Item_ID === singleItemDetails?.Item_ID);
  const quantity = cartItemDetails ? cartItemDetails?.quantity : 0;
  const totalCartPrice = cartItemDetails ?  Math.floor(cartItemDetails?.quantityIncPrice * 100) / 100 : 0;
  const singleItemPrice = modifierCartItem ?   Math.floor(modifierCartItem?.quantityIncPrice * 100) / 100 : 0;
 
  const renderMealTypeList = (mealTypeItem,index) => {
    const MealperiodButtonConfigStyles=transformStyles(mealperiodButtonConfig?.Styles);
      const BgActivecolor =mealperiodButtonConfig?.BgActivecolor  ||  "#00C6FF";
      const BgInactivecolor =mealperiodButtonConfig?.BgInActivecolor  ||  "#ECECEC";
      const TextActivecolor =mealperiodButtonConfig?.TextActivecolor  ||  "#ffffff";
      const TextInctivecolor =mealperiodButtonConfig?.TextInactivecolor  ||  "#717171";
      const Bgopacity= mealperiodButtonConfig?.opacity  ||  0.8;
      const MenuMealType=MealperiodButtonConfigStyles?.MenuMealType || styles.MenuMealType; 
      const MealTypeLabel=MealperiodButtonConfigStyles?.mealTypeLabel || styles.mealTypeLabel;
      const TimeDurationTxt=MealperiodButtonConfigStyles?.timeDurationTxt || styles.timeDurationTxt;

    const lastIndex = mealPeriods.length -1 === index
    return (
      <UI.CbBox id="MealTypeContainer" pageId={'MenuOrder'} style={styles.mealTypeContainer}>
        <UI.TouchableOpacity activeOpacity={0.6}  onPress={() => {setMealType(mealTypeItem,mealTypeItem.IsEnabled)}}>
        <UI.Box  style={[MenuMealType,mealTypeItem.IsSelect === 1 ? { backgroundColor: BgActivecolor}:{ backgroundColor: BgInactivecolor,opacity: Bgopacity}]}  >
        <UI.Text   style={[MealTypeLabel,{ color: mealTypeItem.IsSelect === 1 ? TextActivecolor : TextInctivecolor }]}  >
            {mealTypeItem.MealPeriod_Name?.toUpperCase()}
        </UI.Text>
          <UI.Text style={[TimeDurationTxt,{ color: mealTypeItem.IsSelect === 1 ? TextActivecolor : TextInctivecolor }]}          >
            {mealTypeItem.Time}
          </UI.Text>
          </UI.Box>
        </UI.TouchableOpacity>
        </UI.CbBox>
    );
  }

  const renderMenuCategoryList = (item) => {
    const MealperiodButtonConfigStyles=transformStyles(mealperiodButtonConfig?.Styles);
    const ActiveBottomStyle=MealperiodButtonConfigStyles?.bottomStyle || styles.bottomStyle;
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
             <UI.Box id="BottomStyle" pageId="MenuOrder"
             style={ActiveBottomStyle} />
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

    const CategoryMainListConfigStyles=transformStyles(categoryMainListConfig?.Styles);
    const Activecolor =categoryMainListConfig?.Activecolor  ||  "#4B5154";
    const InActivecolor =categoryMainListConfig?.InActivecolor  ||  "#4B515469";
    const EmptyLabeltext=categoryMainListConfig?.EmptyLabeltext  ||  "No items available";
    const ChevronIconColor=categoryMainListConfig?.ChevronIconColor  ||  "#5773a2";
    const ChevronIconSize=categoryMainListConfig?.ChevronIconSize  ||  "xl";
    const Activeopacity=categoryMainListConfig?.Activeopacity  ||  1;
    const InActiveopacity=categoryMainListConfig?.InActiveopacity  ||  0.8;
    const Descmore=categoryMainListConfig?.Descmore ||  "Read More";
    const Descless=categoryMainListConfig?.Descless || "Show Less";
    const Imageopacity=categoryMainListConfig?.Imageopacity || 0.4;
    const MainBoxContainer=CategoryMainListConfigStyles?.mainBoxContainer || styles.mainBoxContainer; 
    const BottomMiddleContainer=CategoryMainListConfigStyles?.bottomMiddleContainer || styles.bottomMiddleContainer; 
    const MainContainerList=CategoryMainListConfigStyles?.mainContainerList || styles.mainContainerList; 
    const EmptyBoxContainer=CategoryMainListConfigStyles?.emptyBoxContainer || styles.emptyBoxContainer; 
    const EmptyMealTxt=CategoryMainListConfigStyles?.emptyMealTxt || styles.emptyMealTxt; 
    const CardMainContainer=CategoryMainListConfigStyles?.cardMainContainer || styles.cardMainContainer; 
    const Chevronicon=CategoryMainListConfigStyles?.Chevronicon || styles.icon;
    const SubContainer=CategoryMainListConfigStyles?.subContainer || styles.subContainer;
  const MealTypeTitle=CategoryMainListConfigStyles?.mealTypeTitle || styles.mealTypeTitle;
    const PriceTxt=CategoryMainListConfigStyles?.priceTxt || styles.priceTxt;
    const DescriptionTxt=CategoryMainListConfigStyles?.descriptionTxt || styles.descriptionTxt;
    const UnderLineTxt=CategoryMainListConfigStyles?.underLineTxt || styles.underLineTxt;
    const ImageContainer=CategoryMainListConfigStyles?.imageContainer || styles.imageContainer;
    const Itemimage=CategoryMainListConfigStyles?.itemImage || styles.itemImage;
    const MealTypeImg=CategoryMainListConfigStyles?.mealTypeImg || styles.mealTypeImg;
    


    const showActiveAvailableColor = (isAvailable,IsDisable) => {
      return { color: isAvailable === 1 &&IsDisable===0  ? Activecolor : InActivecolor };
    };
   
    if (isCategoryEmpty) {
      return (
        <UI.CbBox id="EmptyListContainer" pageId="MenuOrder" style={styles.emptyListContainer}>
          <UI.CbText id="EmptyMealTxt" pageId="MenuOrder" style={styles.emptyMealTxt}></UI.CbText>
        </UI.CbBox>
      );
    }

    return (
      <UI.Box style={MainBoxContainer}>
      {searchQuery.trim() === "" && (
          <UI.ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryListContainer}
            keyboardShouldPersistTaps="handled"
            ref={categoryScrollRef}
          >
            {selectedCategory?.map((group) => renderMenuCategoryList(group))}
          </UI.ScrollView>
        )}

        <UI.ScrollView style={BottomMiddleContainer}
          ref={scrollViewRef}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={MainContainerList}
        >
   {
            searchQuery.trim() !== "" && filteredItems?.length === 0 ? (
              <UI.Box style={EmptyBoxContainer} >
                <UI.Text style={EmptyMealTxt}>{EmptyLabeltext}</UI.Text>
              </UI.Box>
            ) : (
              filteredItems?.length > 0 ? (
                <UI.FlatList
                  data={filteredItems}
                  keyExtractor={(category, index) => `category-${category.Category_ID}-${searchQuery}-${index}`} // 🔥 Unique key changes on search
                  renderItem={({ item: category }) => (
                    <UI.FlatList
                      data={category?.submenus}
                      keyExtractor={(submenu) => `submenu-${submenu.SubMenu_ID}`}
                      renderItem={({ item: submenu }) => (
                        <UI.Box style={{opacity:apiLoader?0.5:1}}>
                          <UI.TouchableOpacity
                            activeOpacity={0.5}
                            style={CardMainContainer}
                            onPress={() => toggleSubmenu(category?.Category_ID)}
                          >
                             <UI.CbText id="ItemCategoryLabel" pageId="MenuOrder" style={styles.itemCategoryLabel}>
                            {submenu?.SubMenu_Name}
                          </UI.CbText>
                            {searchQuery.trim() !== "" || expandedSubmenus[category.Category_ID] ? (
                             <ChevronUpIcon style={Chevronicon} color={ChevronIconColor} size={ChevronIconSize} />
                            ) : (
                              <ChevronDownIcon style={Chevronicon} color={ChevronIconColor} size={ChevronIconSize} />
                              )}
                          </UI.TouchableOpacity>

                          {(searchQuery.trim() !== "" || expandedSubmenus[category.Category_ID]) && (
                            <UI.CbFlatList
                              flatlistData={submenu?.items}
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
                                      SubContainer,
                                      {
                                        opacity: box?.IsAvailable === 1 && box?.IsDisable === 0 ? Activeopacity : InActiveopacity,
                                      },
                                    ]}
                                  >
                                    <UI.CbBox id="ItemrowContainer" pageId="MenuOrder" style={styles.rowContainer}>
                                      <UI.CbBox id="ItemtextContainer" pageId="MenuOrder" style={[styles.textContainer]}>
                                        <UI.Text  numberOfLines={1} style={[ MealTypeTitle,showActiveAvailableColor(box?.IsAvailable, box?.IsDisable) ]} >
                                          {box?.Item_Name}
                                        </UI.Text>
                                        <UI.Text  numberOfLines={isExpanded ? undefined : 2} style={[ PriceTxt, showActiveAvailableColor(box.IsAvailable, box.IsDisable) ]} >
                                          {`$${box?.Price != null ? box?.Price : 0}`}
                                        </UI.Text>
                                        <UI.Text numberOfLines={isExpanded ? undefined : 2}   style={[ DescriptionTxt,showActiveAvailableColor(box.IsAvailable, box.IsDisable) ]} >
                                          {box?.Description}
                                        </UI.Text>
                                        {box?.Description?.length > 68 && (
                                          <UI.Text
                                            onPress={() => handleReadMoreToggle(box.Item_ID)}
                                            style={UnderLineTxt}
                                          >
                                            {isExpanded ? Descmore : Descless}
                                          </UI.Text>
                                        )}
                                      </UI.CbBox>

                                      <UI.Box style={ImageContainer}>
                                        <UI.Box
                                          style={Itemimage}
                                          disabled={box.IsAvailable === 0 && box.IsDisable === 1}
                                        >
                                          <Image source={{ uri: box.ImageUrl }}   style={[MealTypeImg, box.IsAvailable === 0 && box.IsDisable === 1 && { opacity: Imageopacity}]}/>
                                        </UI.Box>
                                        {
                                            renderAddToCartBtn(box)
                                        }
                                      </UI.Box>
                                    </UI.CbBox>
                                  </UI.TouchableOpacity>
                                );
                              }}
                            />
                          )}
                        </UI.Box>
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
                data={category?.submenus}
                renderItem={({ item }) => {
                  const subMenuItem = item
                  return (
                    <UI.Box style={{opacity:apiLoader?0.5:1}}>
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
                        item?.items?.map((item,index) => {
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
                              <UI.Text id="Itemnametext" pageId="MenuOrder"
                                          numberOfLines={1}
                                          style={[
                                            styles.mealTypeTitle,
                                            showActiveAvailableColor(box?.IsAvailable, box?.IsDisable),
                                            { textAlign: "justify" },
                                          ]}
                                          Conditionalstyle={showActiveAvailableColor(box?.IsAvailable, box?.IsDisable)}
                                        >
                                    {box?.Item_Name}
                                  </UI.Text>
                                  <UI.Text id="Itempricetext" pageId="MenuOrder" numberOfLines={isExpanded ? undefined : 2}
                                    style={[styles.priceTxt,showActiveAvailableColor(box.IsAvailable,box.IsDisable)]}
                                    Conditionalstyle={showActiveAvailableColor(box?.IsAvailable, box?.IsDisable)}
                                  >
                                    {`$${box?.Price != null? box?.Price: 0}`}
                                  </UI.Text>
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
                                          {
                                            renderAddToCartBtn(box)
                                          }
                                          {/* <UI.CbAddToCartButton mealItemDetails={box} /> */}
                                        </UI.Box>
                                      </UI.CbBox>
                                      {!lastItem && (
                                        <UI.Box style={styles.horizontalLine}>
                                          <CbDottedLine length={100} dotSize={6} dotColor="#0000002B" />
                                        </UI.Box>
                                      )}
                                    </UI.TouchableOpacity>
                                  );
                                })

                              )}
                            </UI.Box>
                          </UI.Box>
                        );
                      }}
                    />
                  );
                })))}
          {
            apiLoader ? <UI.Box style={styles.loaderTrans}>
              <CbLoader />
            </UI.Box> : null
          }
        </UI.ScrollView>

        <Modal
          visible={itemDataVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closePreviewModal}
        >
          <UI.CbBox id="ModalBackground" pageId="MenuOrder" style={styles.modalBackground}>
            {
              !isKeyboardVisible
              && 
              <UI.TouchableOpacity
              onPress={() =>handleCloseItemDetails()}
              style={styles.crossIcon}
            >
              <UI.CbBox id="CloseIconContainer" pageId="MenuOrder"  style={styles.CloseIconContainer} >
               <UI.CbImage id="CloseIcon" pageId={'MenuOrder'} imageJsx={<Image source={require('@/assets/images/icons/Modal_Close.png')} style={styles.closeIcon}/>}/>    
              </UI.CbBox>
            </UI.TouchableOpacity>
            }
            <UI.CbBox id="ModiferItems" pageId="MenuOrder" style={styles.modiferItems}>
              <ItemModifier />
            </UI.CbBox>
            {!isKeyboardVisible
              && 
              <UI.CbBox id="FooterContainer" pageId="MenuOrder" style={styles.footerContainer}>
              <UI.Box>
                <UI.CbText id="TotalAmountText" pageId="MenuOrder"  style={styles.totalAmountTxt}>Total Amount</UI.CbText>
                <UI.CbText id="OrderAmount" pageId="MenuOrder" style={styles.orderAmount}>{`$${quantity >= 1 ?itemDataVisible ? singleItemPrice :  totalCartPrice : singleItemPrice}`}</UI.CbText>
              </UI.Box>
              <UI.CbCommonButton id="AddCartButton" pageId="MenuOrder" 
                showBtnName={""}
                style={styles.addToCartBtn}
                btnTextStyle={styles.addCartTxt}
                onPress={() => handleModifierAddCart()} 
              />
            </UI.CbBox>}
          </UI.CbBox>
        </Modal>
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
            <UI.Box style={styles.topContainer2}>
              <UI.ScrollView
                horizontal={true}
                style={styles.topContainer}
                showsHorizontalScrollIndicator={false}
              >
                {mealPeriods?.map((item, index) => {
                  return renderMealTypeList(item, index);
                })}
              </UI.ScrollView>
            </UI.Box>

            {renderCategoryMainList()}

            {cartData?.length > 0 && <UI.CbFloatingButton id="CartButton" pageId="MenuOrder"  props={props} />}
          </>
        )
      }
    } else {
      return (
        <UI.Text style={styles.emptyMealTxt}>{errorMessage}</UI.Text>
      )
    }
  }

  const renderAddToCartBtn = (item) => {
    const cartItem = cartData && cartData?.find((values) => values.Item_ID === item?.Item_ID);
    const cartQuantity = cartItem ? cartItem?.quantity : 0
    const modifierCartItems = modifierCartItemData && modifierCartItemData?.find((values) => values?.Item_ID === item?.Item_ID);
    const modifierQuantity = modifierCartItems? modifierCartItems?.quantity : 0
    const commonStyles = (
      isAvailable,
      IsDisable,
      primaryColor,
      secondaryColor
    ) => {
      if (isAvailable === 1 && IsDisable === 0) {
        return primaryColor;
      } else {
        return secondaryColor;
      }
    };

    const renderAddCartUi = () => {
      const MOAddtoCartButtonConfigStyles=transformStyles(mOAddtoCartButtonConfig?.Styles);
      const Activecolor =mOAddtoCartButtonConfig?.Activecolor  ||  "#5773a2";
      const InActivecolor =mOAddtoCartButtonConfig?.InActivecolor  ||  "#ABABAB";
      const AddIconSource =mOAddtoCartButtonConfig?.AddIconSource ;
      const RemoveIconSource =mOAddtoCartButtonConfig?.RemoveIconSource ;
      const DeleteIconSource= mOAddtoCartButtonConfig?.DeleteIconSource ;
      const OperationBtn3=MOAddtoCartButtonConfigStyles?.operationBtn3 || styles.operationBtn3; 
      const OperationBtn2=MOAddtoCartButtonConfigStyles?.operationBtn2 || styles.operationBtn2;
      const OperationBtn=MOAddtoCartButtonConfigStyles?.operationBtn || styles.operationBtn;
      const AddCartIcons=MOAddtoCartButtonConfigStyles?.addCartIcons || styles.addCartIcons;
      const IconBtn=MOAddtoCartButtonConfigStyles?.iconBtn || styles.iconBtn;
      const QuantityTxt=MOAddtoCartButtonConfigStyles?.quantityTxt || styles.quantityTxt;
     
      if(cartQuantity === 0 && modifierQuantity === 0){
        return(
          <UI.Box style={OperationBtn3}>
          <UI.TouchableOpacity
            disabled={ item.IsAvailable === 1 && item.IsDisable === 0 ? false : true}
            onPress={() => handleAddToCartBtn(item)}
            style={[OperationBtn2,{ borderColor: commonStyles(item.IsAvailable, item.IsDisable, Activecolor,InActivecolor)}]} >
              { AddIconSource ? <Image source={{ uri: AddIconSource}} style={AddCartIcons} /> : <Image source={require('@/assets/images/icons/Plus_Icon3x.png')} style={AddCartIcons}/> }
          </UI.TouchableOpacity>
        </UI.Box>
        )
      }else if(item.IsDisable === 1){
        return(
          <UI.Box style={OperationBtn3}>
          <UI.TouchableOpacity
            disabled={ item.IsAvailable === 1 && item.IsDisable === 0 ? false : true}
            onPress={() => handleAddToCartBtn(item)}
            style={[ OperationBtn2,{ borderColor: commonStyles(item.IsAvailable,item.IsDisable, Activecolor,InActivecolor)}]}>
              { AddIconSource ? <Image source={{ uri: AddIconSource}} style={AddCartIcons} /> : <Image source={require('@/assets/images/icons/Plus_Icon3x.png')} style={AddCartIcons}/> }
          </UI.TouchableOpacity>
        </UI.Box>
        )
      }else{
        return(
          <UI.Box style={OperationBtn}>
            <UI.TouchableOpacity style={IconBtn}  onPress={() => modifierIncDecBtn(item, cartQuantity,modifierQuantity,"decrement")}>
              {
                cartQuantity === 1 ? ( DeleteIconSource ? (<Image source={{ uri: DeleteIconSource}} style={AddCartIcons} />) :(<Image source={require('@/assets/images/icons/Trash_Icon3x.png')} style={AddCartIcons}/>))
                : (RemoveIconSource ? (<Image source={{ uri: RemoveIconSource}} style={AddCartIcons} />) : (<Image source={require('@/assets/images/icons/Minus_Icon3x.png')} style={AddCartIcons}/>))
              }
            </UI.TouchableOpacity>
            <UI.Text style={QuantityTxt}>{cartQuantity}</UI.Text>
            <UI.TouchableOpacity  style={IconBtn} onPress={() => modifierIncDecBtn(item, cartQuantity,modifierQuantity,"increment")}>
                 { AddIconSource ? <Image source={{ uri: AddIconSource}} style={AddCartIcons} /> : <Image source={require('@/assets/images/icons/Plus_Icon3x.png')} style={AddCartIcons}/> }
            </UI.TouchableOpacity>
          </UI.Box>
        )
      }
    }

    return (
      <>
        {renderAddCartUi()}
      </>
    );
  };

  return (
    <UI.CbBox id="MenuorderContainer" pageId={'MenuOrder'} style={styles.mainContainer}>
    <UI.CbBox id="MainHeaderContainer" pageId={'MenuOrder'} Conditionalstyle={isRecentOrderOpen ? {marginTop:6}:{marginVertical: 6}} styles={[styles.mainHeaderContainer,isRecentOrderOpen ? {marginTop:6}:{marginVertical: 6}]}>
      {
        !isRecentOrderOpen && <UI.cbSearchbox id="ItemSearch"   onSearch={setSearchQuery}  pageId={'MenuOrder'} onSearchActivate={() => handleChangeState()} isRecentOrderOpen={isRecentOrderOpen && true}/>
      }
      {!isSearchActive && (
        <UI.TouchableOpacity style={[styles.recentOrderContainer]} onPress={() => navigateToScreen(props, "Recentorders", true)}>
          <UI.CbBox id="RecentOrderBox" pageId={'MenuOrder'} style={styles.recentOrderBox}>
             <UI.CbText id="ROText" pageId={'MenuOrder'}  style={styles.recentOrderTxt}>Recent Order</UI.CbText>    
          </UI.CbBox>  
          <UI.CbImage id="RoNavIcon" pageId={'MenuOrder'} imageJsx={<Image source={require('@/assets/images/icons/RONav.png')} style={styles.dropdownIcon}/>}/>        
        </UI.TouchableOpacity>
      )}
    </UI.CbBox>
     

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