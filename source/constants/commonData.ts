import uuid from "react-native-uuid";

export const foodOrderData = [
    {
      id: uuid.v4(),
      meal_category: [
        {
          meal_type: "BREAKFAST",
          is_enable: true,
          time_duration: "06:30 am - 11:30 am",
          meal_type_category: [
            {
              id: uuid.v4(),
              recepies_category: "Appetizers",
              is_recepies_category_selected: true,
              recepies_list: [
                {
                  id: uuid.v4(),
                  sub_category_title: "Hot",
                  sub_category_data: [
                    {
                      id: uuid.v4(),
                      dish_title: "Dosa",
                      price: "$10.00",
                      dish_description:
                        "A delicious and healthy option with fresh dosa",
                      is_subcategroy_item_open: true,
                      image:
                        "https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?cs=srgb&dl=clouds-conifer-daylight-371589.jpg&fm=jpg",
                      is_dish_available: true,
                      quantity:0
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          meal_type: "LUNCH",
          is_enable: false,
          time_duration: "12:00 pm - 4:30 pm",
          meal_type_category: [
            {
              id: uuid.v4(),
              recepies_category: "Appetizers",
              is_recepies_category_selected: true,
              recepies_list: [
                {
                  id: uuid.v4(),
                  sub_category_title: "Hot",
                  sub_category_data: [
                    {
                      id: uuid.v4(),
                      dish_title: "Seared Salmon Salad",
                      price: "$25.00",
                      dish_description:
                        "A delicious and healthy option with fresh seared salmon salad",
                      is_subcategroy_item_open: true,
                      image:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG4y1uW-q4EcAQh1bPosVy298hwEXazLNmiw&s",
                      is_dish_available: true,
                      quantity:0
                    },
                    {
                      id: uuid.v4(),
                      dish_title: "Coconut Shrimp",
                      price: "$45.00",
                      dish_description:
                        "Crispy and golden shrimp coated in a delicious coconut batter, served with a tangy and sweet dipping sauce for the perfect tropical flavor.",
                      is_subcategroy_item_open: true,
                      image:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvplXPaHMQ0UpdehnAJV644j3s5DumdtEnQ&s",
                      is_dish_available: true,
                      quantity:1
                    },
                    {
                      id: uuid.v4(),
                      dish_title: "Coconut Snap",
                      price: "$40.00",
                      dish_description:
                        "Crispy and golden shrimp coated in a delicious coconut batter, served with a tangy and sweet dipping sauce for the perfect tropical flavor.",
                      is_subcategroy_item_open: true,
                      image:
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmvplXPaHMQ0UpdehnAJV644j3s5DumdtEnQ&s",
                      is_dish_available: true,
                      quantity:6
                    },
                  ],
                },
                {
                  id: uuid.v4(),
                  sub_category_title: "Cold",
                  sub_category_data: [
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
                      quantity:0
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
                      quantity:0
                    },
                  ],
                },
                {
                  id: uuid.v4(),
                  sub_category_title: "Seafood",
                  sub_category_data: [
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
                      quantity:8
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
                      quantity:12
                    },
                  ],
                },
              ],
            },
            {
              id: uuid.v4(),
              recepies_category: "Entrees",
              is_lunch_recepies_category_selected: false,
              recepies_list: [
                {
                  id: uuid.v4(),
                  sub_category_title: "Grilled",
                  sub_category_data: [
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
                      quantity:0
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
              recepies_category: "Desserts",
              is_recepies_category_selected: true,
            },
          ],
        },
      ],
      is_meal_category_required: true,
    },
];