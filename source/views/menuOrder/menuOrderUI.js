import * as UI from "@/components/cobalt/importUI";
import {
  useFormContext,
} from "@/components/cobalt/event";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Icon } from '@/components/ui/icon';
import { useMenuOrderLogic } from "@/source/controller/menuOrder/menuOrder";
import { Image, Platform } from "react-native";
import { navigateToScreen } from '@/source/constants/Navigations'
import { RecentOrderData } from "@/source/constants/commonData";
import {ChevronRightIcon,ChevronLeftIcon,ChevronDownIcon,AddIcon } from '@/components/ui/icon';

const pageId = "MenuOrder";
export default function MenuOrderScreen(props) {
  let pageConfigJson = global.appConfigJsonArray.find(
    (item) => item.PageId === pageId
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

  const { menuOrderData, setMealCategory, setMealType, isCategoryEmpty, isSearchActive, handleChangeState,cartData } = useFormContext();
  const { categoryRef, scrollToLast, scrollToFirst,isRecentOrderOpen,openRecentOrder } = useMenuOrderLogic()

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
  
  const renderMenuCategoryList = (categoryItem) => {
    return (
      <UI.Box>
        <UI.TouchableOpacity
          style={styles.categoryBtn}
          activeOpacity={0.6}
          onPress={() => setMealCategory(categoryItem.Category_Id)}
        >
          <UI.Text style={styles.categoryText}>
            {categoryItem.Category_Name?.toUpperCase()}
          </UI.Text>
          {categoryItem.IsSelect === 1 && (
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
    if (!isCategoryEmpty) {
      return (
        <UI.Box style={styles.mainBoxContainer}>
          <UI.Box style={styles.subCategoryContainer}>
            {menuOrderData &&
              menuOrderData.MenuItems?.map((mealCategory) => {
                if (mealCategory.IsSelect === 1) {
                  const categories = mealCategory?.Categories || [];
                  const categoryCount = categories.length;
                  return (
                    <>
                      <UI.ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryListContainer}
                        ref={categoryRef}
                      >
                        {categories.map((items) =>
                          renderMenuCategoryList(items)
                        )}
                      </UI.ScrollView>
                    </>
                  );
                }
              })}
          </UI.Box>
          <UI.ScrollView contentContainerStyle={styles.scrollContent}>
            <UI.cbCategoryList />
          </UI.ScrollView>
        </UI.Box>
      )
    } else {
      return (
        <UI.Box style={styles.emptyListContainer}>
          <UI.Text style={styles.emptyMealTxt}>No items available</UI.Text>
        </UI.Box>
      )
    }
  }

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
              <UI.CbAddToCartButton mealItemDetails={{}} style={{ padding: responsiveWidth(0.6) }} />
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

  return (
    <UI.Box style={styles.mainContainer}>
      <UI.Box style={[styles.mainHeaderContainer,isRecentOrderOpen ? {marginTop:6}:{marginVertical: 6}]}>
        {
          !isRecentOrderOpen && <UI.cbSearchbox onSearchActivate={() => handleChangeState()} />
        }
        {!isSearchActive && (
          <UI.TouchableOpacity style={[styles.recentOrderContainer,{width:isRecentOrderOpen?"100%":"90%"}]} onPress={() => openRecentOrder()}>

            <UI.Box style={styles.recentOrderBox}>
              <UI.TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <UI.CbImage imageJsx={<Image alt='image' source={require('@/assets/images/icons/ROCart.png')} />} />
              </UI.TouchableOpacity>
              <UI.Text style={styles.recentOrderTxt}>
                Recent Orders
              </UI.Text>
            </UI.Box>

            <UI.TouchableOpacity style={styles.rightIconBtn} onPress={() => openRecentOrder()}>
              <Icon as={isRecentOrderOpen ? ChevronDownIcon:ChevronRightIcon} />
            </UI.TouchableOpacity>
          </UI.TouchableOpacity>
        )}
      </UI.Box>
      {
        isRecentOrderOpen && <OnRecentOrderPress /> 
      }
      <UI.Box
        style={styles.topContainer}
      >
        {menuOrderData &&
          menuOrderData.MenuItems?.map((item) => {
            return renderMealTypeList(item, setMealType);
          })}
      </UI.Box>
      {renderCategoryMainList()}
      {
        cartData && cartData.length >0 && <UI.CbFloatingButton props={props}/>
      }
      
    </UI.Box>
  );
}

const styles = UI.StyleSheet.create({
  mainHeaderContainer:{ display: "flex", flexDirection: "row" },
  recentOrderContainer:{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginLeft: 4, borderBottom: 1, backgroundColor: "#fff", height: 31, alignItems: "center", },
  mealTypeContainer:{flexDirection:"row",justifyContent:"center",alignItems:"center"},
  mainContainer:{flex:1,backgroundColor:"#ECECEC"},
  scrollContent: {
    paddingTop:responsiveHeight(0.2),
    paddingBottom:responsiveHeight(10)
  },
  categoryText: {
    padding:2,
    fontSize: 18,
    color: "#4B5154",
    fontFamily:"SourceSansPro_Bold"
  },
  mealTypeLabel: {
    fontSize: 18,
    fontFamily:"SourceSansPro_Bold"
  },
  bottomStyle: {
    width: "100%",
    borderRadius: 4,
    borderWidth: 3,
    borderColor: "#00c6ff",
    marginTop:6,
  },
  categoryBtn: {
    flex: 1,
    cursor: "pointer",
    marginRight:responsiveWidth(6)
  },
  activeMenuType: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: responsiveWidth(30),
    height: Platform.OS === "android"?responsiveHeight(5):responsiveHeight(5),
    marginHorizontal:5
  },
  inactiveMenuType: {
    backgroundColor: "#ECECEC",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: responsiveWidth(30),
    height: Platform.OS === "android"?responsiveHeight(5):responsiveHeight(5.5),
    alignSelf: "center",
    borderRadius: 5,
    opacity: 0.8,
    marginHorizontal:5
  },
  timeDurationTxt: {
    fontSize: 10,
    marginTop: -5,
    fontFamily:"SourceSansPro_SemiBoldItalic"
  },
  topContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    alignSelf:"center",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation:1,
    backgroundColor:"#fff",
    marginBottom:4
  },
  categoryListContainer: {
    flexDirection: "row",
    height: Platform.OS === "android" ?responsiveHeight(5):responsiveHeight(5.5),
    paddingTop:responsiveHeight(1.2),
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  subCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    paddingHorizontal:10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation:10,
    backgroundColor:"#fff",
  },
  forwardIcon:{marginLeft:10},
  backWardIcon:{marginRight:10},
  emptyListContainer:{
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
    height:responsiveHeight(10)
  },
  emptyMealTxt:{
    fontFamily:"SourceSansPro_SemiBoldItalic"
  },
  mainBoxContainer: { flex: 1, backgroundColor: "#fff", paddingBottom: responsiveHeight(6) },
  recentOrderTxt: { fontSize: 16, fontFamily:"SourceSansPro_SemiBold", lineHeight: 20, marginLeft: 8 },
  rightIconBtn: { right: 10 },
  recentOrderBox: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginLeft: 10 },
  recentOrderImage:{width: 120, height: 60, borderRadius: 10},
  recentOrderName:{fontSize: 12, color: "#4B5154", width: 85},
  seeAllRecentOrders:{fontSize: 16, color: "#26BAE2", width: "100%", textAlign: "center", fontStyle: "italic", fontWeight: "Semibold", paddingVertical: 11},
recentContainer:{paddingLeft: 8, backgroundColor: "#FFFFFF",paddingTop:10},
recentMainList:{ flexDirection: "row", justifyContent: "space-between", paddingTop: 5 },
addItemToCartBtn:{
  width:20,
  height:20,
  borderWidth:1,
  borderColor:"#5773A2",
  borderRadius:5,
  justifyContent:"center",
  alignItems:"center"
}
});