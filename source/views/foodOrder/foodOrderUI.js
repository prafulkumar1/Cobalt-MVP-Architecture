import * as UI from "@/components/cobalt/importUI";
import uuid from "react-native-uuid";
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
import { TouchableOpacity } from "react-native";

const pageId = "MenuOrder";
export default function MenuOrderScreen() {
  let pageConfigJson = global.appConfigJsonArray.find(
    (item) => item.PageId === pageId
  );

  global.controlsConfigJson =
    pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];

  const {} = useFormContext();

  const foodOrderData = [
    {
      id: uuid.v4(),
      meal_category: [
        {
          meal_type: "BREAKFAST",
          is_enable: false,
          time_duration: "06:30 am - 11:30 am",
          meal_type_category: [
            {
              id: uuid.v4(),
              breakfast_recepies_category: "Appetizers",
              is_recepies_category_selected: false,
              breakfast_recepies_list: [
                {
                  id: uuid.v4(),
                  breakfast_sub_category_title: "Hot",
                  breakfast_sub_category_data: [
                    {
                      id: uuid.v4(),
                      dish_title: "Dosa",
                      price: "$10.00",
                      dish_description:
                        "A delicious and healthy option with fresh dosa",
                      is_subcategroy_item_open: false,
                      image:
                        "https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?cs=srgb&dl=clouds-conifer-daylight-371589.jpg&fm=jpg",
                      is_dish_available: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          meal_type: "LUNCH",
          is_enable: true,
          time_duration: "12:00 pm - 4:30 pm",
          meal_type_category: [
            {
              id: uuid.v4(),
              lunch_recepies_category: "Appetizers",
              is_recepies_category_selected: true,
              lunch_recepies_list: [
                {
                  id: uuid.v4(),
                  lunch_sub_category_title: "Hot",
                  lunch_sub_category_data: [
                    {
                      id: uuid.v4(),
                      dish_title: "Seared Salmon Salad",
                      price: "$25.00",
                      dish_description:
                        "A delicious and healthy option with fresh seared salmon salad",
                      is_subcategroy_item_open: true,
                      image:
                        "https://images.pexels.com/photos/1049684/pexels-photo-1049684.jpeg?cs=srgb&dl=pexels-engin-akyurt-1049684.jpg&fm=jpg",
                      is_dish_available: true,
                    },
                    {
                      id: uuid.v4(),
                      dish_title: "Coconut Shrimp",
                      price: "$45.00",
                      dish_description:
                        "Crispy and golden shrimp coated in a delicious coconut batter, served with a tangy and sweet dipping sauce for the perfect tropical flavor.",
                      is_subcategroy_item_open: true,
                      image:
                        "https://images.pexels.com/photos/1049684/pexels-photo-1049684.jpeg?cs=srgb&dl=pexels-engin-akyurt-1049684.jpg&fm=jpg",
                      is_dish_available: true,
                    },
                  ],
                },
                {
                  id: uuid.v4(),
                  lunch_sub_category_title: "Cold",
                  lunch_sub_category_data: [
                    {
                      id: uuid.v4(),
                      dish_title: "Seared Salmon Salad",
                      price: "$25.00",
                      dish_description:
                        "A delicious and healthy option with fresh seared salmon salad",
                      is_subcategroy_item_open: true,
                      image:
                        "https://images.pexels.com/photos/1049684/pexels-photo-1049684.jpeg?cs=srgb&dl=pexels-engin-akyurt-1049684.jpg&fm=jpg",
                      is_dish_available: true,
                    },
                    {
                      id: uuid.v4(),
                      dish_title: "Coconut Shrimp",
                      price: "$45.00",
                      dish_description:
                        "Crispy and golden shrimp coated in a delicious coconut batter, served with a tangy and sweet dipping sauce for the perfect tropical flavor.",
                      is_subcategroy_item_open: true,
                      image:
                        "https://images.pexels.com/photos/1049684/pexels-photo-1049684.jpeg?cs=srgb&dl=pexels-engin-akyurt-1049684.jpg&fm=jpg",
                      is_dish_available: true,
                    },
                  ],
                },
                {
                  id: uuid.v4(),
                  lunch_sub_category_title: "Seafood",
                  lunch_sub_category_data: [
                    {
                      id: uuid.v4(),
                      dish_title: "Seared Salmon Salad",
                      price: "$25.00",
                      dish_description:
                        "A delicious and healthy option with fresh seared salmon salad",
                      is_subcategroy_item_open: true,
                      image:
                        "https://images.pexels.com/photos/1049684/pexels-photo-1049684.jpeg?cs=srgb&dl=pexels-engin-akyurt-1049684.jpg&fm=jpg",
                      is_dish_available: true,
                    },
                    {
                      id: uuid.v4(),
                      dish_title: "Coconut Shrimp",
                      price: "$45.00",
                      dish_description:
                        "Crispy and golden shrimp coated in a delicious coconut batter, served with a tangy and sweet dipping sauce for the perfect tropical flavor.",
                      is_subcategroy_item_open: true,
                      image:
                        "https://images.pexels.com/photos/1049684/pexels-photo-1049684.jpeg?cs=srgb&dl=pexels-engin-akyurt-1049684.jpg&fm=jpg",
                      is_dish_available: true,
                    },
                  ],
                },
              ],
            },
            {
              id: uuid.v4(),
              lunch_recepies_category: "Entrees",
              is_lunch_recepies_category_selected: false,
              lunch_recepies_list: [
                {
                  id: uuid.v4(),
                  lunch_sub_category_title: "Grilled",
                  lunch_sub_category_data: [
                    {
                      id: uuid.v4(),
                      dish_title: "Grilled Chicken Breast",
                      price: "$30.00",
                      dish_description:
                        "Perfectly grilled chicken served with a side of steamed vegetables.",
                      is_subcategroy_item_open: false,
                      image:
                        "https://images.pexels.com/photos/1049684/pexels-photo-1049684.jpeg?cs=srgb&dl=pexels-engin-akyurt-1049684.jpg&fm=jpg",
                      is_dish_available: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          meal_type: "DINNER",
          is_enable: false,
          time_duration: "7:30 pm - 11:30 pm",
          meal_type_category: [
            {
              id: uuid.v4(),
              dinner_recepies_category: "Desserts",
              is_recepies_category_selected: false,
            },
          ],
        },
      ],
      is_meal_category_required: true,
    },
  ];

  const renderMenuCategoryList = ({item,index}) =>{
        return (
      <UI.Box>
        <TouchableOpacity
          style={styles.categoryBtn}
          activeOpacity={0.6}
        >
          <UI.Text style={styles.categoryText}>
            {item.lunch_recepies_category.toUpperCase()}
          </UI.Text>
          {
            item.is_recepies_category_selected && 
            <UI.Box style={styles.bottomStyle}/>
          }
          </TouchableOpacity>
      </UI.Box>
    );
  }
  const renderMealTypeList = ({item,index}) => {
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
        children={(mealList) => renderMealTypeList(mealList, item.meal_category.length - 1)}
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
        foodOrderData?.map((items, index) => {
          return items.meal_category.map((mealCategory) => {
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
        foodOrderData?.map((items, index) => {
          return items.meal_category.map((mealCategory) => {
            if(mealCategory.is_enable){
              return mealCategory.meal_type_category.map((categoryList) => {
                if(categoryList.is_recepies_category_selected){
                  console.log(JSON.stringify(categoryList.lunch_recepies_list),"===n")
                  return  (
                    <UI.Box style={{padding:15}}>
                      <UI.cbAccordion AccordionData={categoryList.lunch_recepies_list} />
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
    borderEndColor: "red",
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
    paddingHorizontal: 16,
    paddingVertical:2,
    alignSelf:"center",
    marginHorizontal:5,
    borderRadius:5
  },
  inactiveMenuType:{
    backgroundColor: "#fff",
    justifyContent:"center",
    alignItems:"center",
    alignSelf:"center",
    paddingHorizontal: 16,
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