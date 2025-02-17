import * as UI from "@/components/cobalt/importUI";
import {
  useFormContext,
} from "@/components/cobalt/event";
import { Icon } from '@/components/ui/icon';
import { useMenuOrderLogic } from "@/source/controller/menuOrder/menuOrder";
import { Image } from "react-native";
import { navigateToScreen } from '@/source/constants/Navigations'
import { RecentOrderData } from "@/source/constants/commonData";
import {ChevronRightIcon,ChevronDownIcon } from '@/components/ui/icon';
import { styles } from "@/source/styles/MenuOrder";
import CbLoader from "@/components/cobalt/cobaltLoader";
import {  useRef } from "react";

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

  const {menuLoading, menuOrderData, setMealCategory, setMealType, isCategoryEmpty, isSearchActive, handleChangeState,cartData,addedModifierCartData } = useFormContext();

  const { isRecentOrderOpen,openRecentOrder,errorMessage,loading,mealPeriods,categoryData,selectedCategory,flatListRef ,handleViewableItemsChanged,setSelectedCategory} = useMenuOrderLogic(props)
  const categoryRefs = useRef({});

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
  
  const renderMenuCategoryList = (item) => {
    return (
      <UI.Box>
        <UI.TouchableOpacity
          style={styles.categoryBtn}
          activeOpacity={0.6}
          // onPress={() => setMealCategory(item,mealPeriodId)}
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
      console.log(visibleCategoryId,"-->@")
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

        <UI.ScrollView style={{marginBottom:200,marginTop:20}}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        >
          {selectedCategory.map((category) => {
            return (
              <UI.FlatList
              onLayout={(e) => handleLayout(category.Category_ID, e)}
              keyExtractor={(submenu) => submenu.SubMenu_ID}
                data={category.submenus}
                renderItem={({ item }) => {
                  return (
                    <>
                      <UI.Text style={{fontSize:20,color:"black",fontWeight:"bold"}}>{item.SubMenu_Name}</UI.Text>
                      <UI.FlatList
                        data={item.items}
                        keyExtractor={(item) => item.Item_ID}
                        renderItem={(tools) => {
                          return (
                            <UI.Box style={{marginTop:20,borderWidth:1}}>
                              <UI.Text>{tools.item.Item_Name}</UI.Text>
                              <UI.Text>{"shdvjvdaksdvkajv"}</UI.Text>
                              <UI.Text>{tools.item.Price}</UI.Text>
                              <UI.Text>{tools.item.ImageUrl}</UI.Text>
                            </UI.Box>
                          );
                        }}
                      />
                    </>
                  );
                }}
              />
            );
          })}
        </UI.ScrollView>
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

