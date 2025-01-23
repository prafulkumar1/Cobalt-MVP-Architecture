import * as UI from "@/components/cobalt/importUI";
import {
  useFormContextProvider,
  useFormContext,
} from "@/components/cobalt/event";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CircleIcon,
  Icon,
} from "@/components/ui/icon";
import {  TouchableOpacity } from "react-native";
import { foodOrderData } from "@/source/constants/commonData";

const pageId = "MenuOrder";
export default function MenuOrderScreen() {
  let pageConfigJson = global.appConfigJsonArray.find(
    (item) => item.PageId === pageId
  );

  global.controlsConfigJson =
    pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];

  const {} = useFormContext();



  const renderMenuCategoryList = ({item,index}) =>{
        return (
      <UI.Box>
        <TouchableOpacity
          style={styles.categoryBtn}
          activeOpacity={0.6}
        >
          <UI.Text style={styles.categoryText}>
            {item.recepies_category?.toUpperCase()}
          </UI.Text>
          {
            item.is_recepies_category_selected && 
            <UI.Box style={styles.bottomStyle}/>
          }
          </TouchableOpacity>
      </UI.Box>
    );
  }
  const renderMealTypeList = ({item}) => {
     return (
      <UI.Box>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[item.is_enable ? styles.activeMenuType:styles.inactiveMenuType]}
        >
          <UI.Text style={[styles.mealTypeTxt,{color:item.is_enable?"#fff":"#000"}]}>
            {item.meal_type}
          </UI.Text>
          <UI.Text style={[styles.timeDurationTxt,{color:item.is_enable?"#fff":"#000"}]}>
            {item.time_duration}
          </UI.Text>
          </TouchableOpacity>
      </UI.Box>
    );
  }
  const renderListItem = ({ item, index }) => {
    return (
      <UI.cbFlatList
        flatlistData={item.meal_category}
        children={(mealList) => renderMealTypeList(mealList)}
        horizontal={true}
        contentContainerStyle={styles.categoryBottomContainer}
      />
    )
  };
  return (
      <UI.ScrollView contentContainerStyle={styles.scrollContent}>
        <UI.cbFlatList
          flatlistData={foodOrderData}
          children={renderListItem}
          horizontal={false}
          contentContainerStyle={styles.categoryBottomContainer}
        />
      {
        foodOrderData?.map((items) => {
          return items.meal_category?.map((mealCategory) => {
            if(mealCategory.is_enable){
              return (
                <UI.cbFlatList
                   flatlistData={mealCategory.meal_type_category}
                   children={renderMenuCategoryList}
                   horizontal={true}
                   contentContainerStyle={styles.subCategoryContainer}
                 />
             )
            }
          })
        })
      }
        {
        foodOrderData?.map((items) => {
          return items.meal_category.map((mealCategory) => {
            if(mealCategory.is_enable){
              return mealCategory.meal_type_category.map((categoryList) => {
                if(categoryList.is_recepies_category_selected){
                  return  (
                    <UI.Box style={{padding:15}}>
                      <UI.cbAccordion AccordionData={categoryList.recepies_list} />
                    </UI.Box>
                  )
                }
              })
            }
          })
        })
      }
    </UI.ScrollView>
  );
}

const styles = UI.StyleSheet.create({
  scrollContent: {
    paddingTop: 60,
    backgroundColor:"#fff",
  },
  categoryText: {
    padding: 2,
    fontSize: 14,
    fontWeight: "600",
    color: "#4b5154",
  },
  mealTypeTxt:{
    padding: 4,
    fontSize: 14,
    fontWeight: "bold",
  },
  categoryBottomContainer:{
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  subCategoryContainer:{
    width:"100%",
    marginTop:10
  },
  bottomStyle:{
    width:"100%",
    backgroundColor:"#00c6ff",
    height:4,
    borderRadius:3
  },
  categoryBtn:{
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical:6,
    cursor:"pointer"
  },
  activeMenuType:{
    backgroundColor: "#00c6ff",
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
    paddingHorizontal: 22,
    paddingVertical:2,
    alignSelf:"center",
    marginHorizontal:5,
    borderRadius:5
  },
  inactiveMenuType:{
    backgroundColor: "#ececec",
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
    paddingHorizontal: 22,
    paddingVertical:2,
    alignSelf:"center",
    marginHorizontal:5,
    borderRadius:5,
    opacity:0.5
  },
  timeDurationTxt:{
    fontSize: 10,
    fontWeight: "600",
    fontStyle:"italic",
    marginTop:-10
  }
});