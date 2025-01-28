import * as UI from "@/components/cobalt/importUI";
import {
  useFormContext,
} from "@/components/cobalt/event";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import {  ChevronLeftIcon,ChevronRightIcon} from '@/components/ui/icon';
import { Icon } from '@/components/ui/icon';
import { useMenuOrderLogic } from "@/source/controller/menuOrder/menuOrder";

const pageId = "MenuOrder";
export default function MenuOrderScreen() {
  let pageConfigJson = global.appConfigJsonArray.find(
    (item) => item.PageId === pageId
  );

  global.controlsConfigJson =
    pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];
    const configItems = global.controlsConfigJson?.reduce((acc, item) => {
      if (["mealTypeLabel", "timeLabel", "mealTypeBtn", "tapBarBtn"].includes(item.id)) {
        acc[item.id] = item;
      }
      return acc;
    }, {});
    
    const { mealTypeLabel, timeLabel, mealTypeBtn, tapBarBtn } = configItems;
  
  const {menuOrderData,setMealCategory,setMealType,isCategoryEmpty} = useFormContext();
  const {categoryRef, scrollToLast,scrollToFirst} = useMenuOrderLogic()

  const renderMealTypeList = (mealTypeItem) => {
    return (
     <UI.Box style={styles.mealTypeContainer}>
       <UI.TouchableOpacity
         activeOpacity={0.6}
         style={[mealTypeItem.IsSelect===1 ? [styles.activeMenuType,{backgroundColor:mealTypeBtn?.activeBackgroundColor?mealTypeBtn.activeBackgroundColor : "#00C6FF",borderRadius:mealTypeBtn?.borderRadius?mealTypeBtn?.borderRadius: 5}]:styles.inactiveMenuType]}
         onPress={() => setMealType(mealTypeItem.MealPeriod_Id)}
       >
         <UI.Text style={[mealTypeLabel?.styles ? mealTypeLabel?.styles : styles.mealTypeLabel,{color:mealTypeItem.IsSelect===1?"#ffffff":"#717171"}]}>
           {mealTypeItem.MealPeriod_Name?.toUpperCase()}
         </UI.Text>
         <UI.Text style={[timeLabel?.styles? timeLabel?.styles : styles.timeDurationTxt,{color:mealTypeItem.IsSelect===1?"#fff":"#717171"}]}>
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
          {
            categoryItem.IsSelect ===1 &&
            <UI.Box style={[tapBarBtn?.styles ? tapBarBtn?.styles : styles.bottomStyle]} />
          }
        </UI.TouchableOpacity>
      </UI.Box>
    );
  }

  const renderCategoryMainList = () => {
    if (!isCategoryEmpty) {
      return (
        <>
          <UI.Box style={styles.subCategoryContainer}>
            {menuOrderData &&
              menuOrderData.MenuItems?.map((mealCategory) => {
                if (mealCategory.IsSelect === 1) {
                  const categories = mealCategory?.Categories || [];
                  const categoryCount = categories.length;
                  return (
                    <>
                      <UI.TouchableOpacity
                        style={styles.backWardIcon}
                        onPress={scrollToFirst}
                      >
                        <Icon as={ChevronLeftIcon} color="#5773a2" size="xl" />
                      </UI.TouchableOpacity>
                      <UI.ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryListContainer}
                        ref={categoryRef}
                      >
                        {categories.map((items) => renderMenuCategoryList(items))}
                      </UI.ScrollView>
                      {categoryCount > 3 && (
                        <UI.TouchableOpacity
                          style={styles.forwardIcon}
                          onPress={scrollToLast}
                        >
                          <Icon as={ChevronRightIcon} color="#5773a2" size="xl" />
                        </UI.TouchableOpacity>
                      )}
                    </>
                  );
                }
              })}
          </UI.Box>
          <UI.ScrollView contentContainerStyle={styles.scrollContent}>
            <UI.cbCategoryList />
          </UI.ScrollView>
        </>
      )
    } else {
      return (
        <UI.Box style={styles.emptyListContainer}>
          <UI.Text style={styles.emptyMealTxt}>No meal available</UI.Text>
        </UI.Box>
      )
    }
  }

  return (
    <UI.Box style={styles.mainContainer}>
      <UI.ScrollView
        horizontal={false}
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topContainer}
      >
        {menuOrderData &&
          menuOrderData.MenuItems?.map((item) => {
            return renderMealTypeList(item, setMealType);
          })}
      </UI.ScrollView>

      {renderCategoryMainList()}
    </UI.Box>
  );
}

const styles = UI.StyleSheet.create({
  mealTypeContainer:{flexDirection:"row",justifyContent:"center",alignItems:"center"},
  mainContainer:{paddingTop:responsiveHeight(5),backgroundColor:"#fff"},
  scrollContent: {
    backgroundColor:"#fff",
    paddingHorizontal:responsiveWidth(2),
    paddingTop:responsiveHeight(2)
  },
  categoryText: {
    padding:2,
    fontSize: 16,
    fontWeight: "bold",
    color: "#4B5154",
  },
  mealTypeLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomStyle: {
    width: "100%",
    borderRadius: 4,
    borderWidth: 3,
    borderColor: "#00c6ff",
    marginTop: 5,
    position:"absolute",
    bottom:0,
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
    alignSelf: "center",
    width: responsiveWidth(30),
    height: responsiveHeight(4.5),
    marginHorizontal:5
  },
  inactiveMenuType: {
    backgroundColor: "#ECECEC",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: responsiveWidth(30),
    height: responsiveHeight(4.5),
    alignSelf: "center",
    borderRadius: 5,
    opacity: 0.8,
    marginHorizontal:5
  },
  timeDurationTxt: {
    fontSize: 10,
    fontWeight: "600",
    fontStyle: "italic",
    marginTop: -2
  },
  topContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor:"#0000002B",
    borderWidth:1
  },
  categoryListContainer: {
    flexDirection: "row",
    height: responsiveHeight(4.2),
    paddingTop:responsiveHeight(0.6)
  },
  subCategoryContainer: {
    flexDirection: "row", alignItems: "center", width: "100%", alignSelf: "center", borderColor: "#0000002B",
    borderWidth: 1,
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
    fontStyle:"italic"
  }
});