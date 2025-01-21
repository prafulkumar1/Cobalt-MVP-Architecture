
//import { useLoginLogic } from '@/source/controller/login/login';
import * as UI from '@/components/cobalt/importUI';
import { v4 as uuidv4 } from 'uuid';
import { useFormContextProvider,useFormContext } from '@/components/cobalt/event';
import {  CheckIcon, ChevronDownIcon,ChevronUpIcon, CircleIcon, Icon } from '@/components/ui/icon';
//import { Icon } from 'lucide-react-native';


const pageId='FoodOrder';
export default function FoodOrderScreen() {

 let pageConfigJson = global.appConfigJsonArray.find(item => item.PageId === pageId);

 global.controlsConfigJson = pageConfigJson && pageConfigJson.Controlls ? pageConfigJson.Controlls : [];

  const {}= useFormContext();

  const foodOrderData = [
    {
      id: uuidv4(),
      meal_category: [
        {
          meal_type: "BREAKFAST",
          is_enable: false,
          time_duration: "06:30 am - 11:30 am",
          meal_type_category: [
            {
              id: uuidv4(),
              breakfast_recepies_category: "Appetizers",
              is_breakfast_recepies_category_selected: false,
              breakfast_recepies_list: [
                {
                  id: uuidv4(),
                  breakfast_sub_category_title: "Hot",
                  breakfast_sub_category_data: [
                    {
                      id: uuidv4(),
                      dish_title: "Dosa",
                      price: "$10.00",
                      dish_description: "A delicious and healthy option with fresh dosa",
                      is_subcategroy_item_open: false,
                      image: "https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?cs=srgb&dl=clouds-conifer-daylight-371589.jpg&fm=jpg",
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
              id: uuidv4(),
              lunch_recepies_category: "Appetizers",
              is_lunch_recepies_category_selected: true,
              lunch_recepies_list: [
                {
                  id: uuidv4(),
                  lunch_sub_category_title: "Hot",
                  lunch_sub_category_data: [
                    {
                      id: uuidv4(),
                      dish_title: "Seared Salmon Salad",
                      price: "$25.00",
                      dish_description: "A delicious and healthy option with fresh seared salmon salad",
                      is_subcategroy_item_open: true,
                      image: "https://images.pexels.com/photos/1049684/pexels-photo-1049684.jpeg?cs=srgb&dl=pexels-engin-akyurt-1049684.jpg&fm=jpg",
                      is_dish_available: true,
                    },
                    {
                      id: uuidv4(),
                      dish_title: "Coconut Shrimp",
                      price: "$45.00",
                      dish_description: "Crispy and golden shrimp coated in a delicious coconut batter, served with a tangy and sweet dipping sauce for the perfect tropical flavor.",
                      is_subcategroy_item_open: true,
                      image: "https://images.pexels.com/photos/1049684/pexels-photo-1049684.jpeg?cs=srgb&dl=pexels-engin-akyurt-1049684.jpg&fm=jpg",
                      is_dish_available: true,
                    }
                  ],
                },
              ],
            },
            {
              id: uuidv4(),
              lunch_recepies_category: "Entrees",
              is_lunch_recepies_category_selected: false,
              lunch_recepies_list: [
                {
                  id: uuidv4(),
                  lunch_sub_category_title: "Grilled",
                  lunch_sub_category_data: [
                    {
                      id: uuidv4(),
                      dish_title: "Grilled Chicken Breast",
                      price: "$30.00",
                      dish_description: "Perfectly grilled chicken served with a side of steamed vegetables.",
                      is_subcategroy_item_open: false,
                      image: "https://images.pexels.com/photos/1049684/pexels-photo-1049684.jpeg?cs=srgb&dl=pexels-engin-akyurt-1049684.jpg&fm=jpg",
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
              id: uuidv4(),
              dinner_recepies_category: "Desserts",
              is_dinner_recepies_category_selected: false,
              dinner_recepies_list: [
                {
                  id: uuidv4(),
                  dinner_sub_category_title: "Sweet Treats",
                  dinner_sub_category_data: [
                    {
                      id: uuidv4(),
                      dish_title: "Chocolate Lava Cake",
                      price: "$15.00",
                      dish_description: "A warm and rich chocolate cake with a gooey center.",
                      is_subcategroy_item_open: false,
                      image: "https://images.pexels.com/photos/410999/pexels-photo-410999.jpeg?cs=srgb&dl=pexels-pixabay-410999.jpg&fm=jpg",
                      is_dish_available: true,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      is_meal_category_required: true,
    },
  ];
  
  console.log(foodOrderData);
  

  return (
    
   <UI.ScrollView contentContainerStyle={styles.scrollContent}>
   </UI.ScrollView>    
  );
}

const styles = UI.StyleSheet.create({
 
  scrollContent: {
    padding: 20,
  },
  
});