import uuid from "react-native-uuid";

export const foodOrderData = 
{
  "ResponseCode": "Success",
  "ResponseMessage": "",
  "MenuItems": [
    {
      "MealPeriod_Name": "Breakfast",
      "MealPeriod_Id": "MP102",
      "IsSelect": 0,
      "IsEnabled": 1,
      "Time": "06:00 AM - 10:30 AM",
      "Categories": []
    },
    {
      "MealPeriod_Name": "Lunch",
      "MealPeriod_Id": "MP101",
      "IsSelect": 1,
      "IsEnabled": 1,
      "Time": "12:00 PM - 04:30 PM",
      "Categories": [
        {
          "Category_Name": "Appetizers",
          "Category_Id": "C201",
          "IsSelect": 1,
          "Submenu": [
            {
              "Submenu_Name": "Hot",
              "Submenu_Id": "SM301",
              "Items": [
                {
                  "Item_Name": "Seared Salmon Salad",
                  "Item_Id": "I301",
                  "Description": "Savor the delicious Green salad Savor the delicious Green salad Savor the delicious Green salad Savor the delicious Green salad.",
                  "Price": 25.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 0
                },
                {
                  "Item_Name": "Coconut Shrimp",
                  "Item_Id": "I302",
                  "Description": "These coconut shrimp are dipped... A creamy guacamole served with crispy tortilla chips A creamy guacamole served with crispy tortilla chips A creamy guacamole served with crispy tortilla chips",
                  "Price": 45.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 1
                }
              ]
            },
            {
              "Submenu_Name": "Cold",
              "Submenu_Id": "SM302",
              "Items": [
                {
                  "Item_Name": "Caprese Salad",
                  "Item_Id": "I303",
                  "Description": "Fresh mozzarella, tomatoes, and basil.",
                  "Price": 18.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 1
                },
                {
                  "Item_Name": "Guacamole with Chips",
                  "Item_Id": "I304",
                  "Description": "A creamy guacamole served with crispy tortilla chips.",
                  "Price": 12.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 1
                }
              ]
            }
          ]
        },
        {
          "Category_Name": "Salads",
          "Category_Id": "C202",
          "IsSelect": 0,
          "Submenu": [
            {
              "Submenu_Name": "Fresh",
              "Submenu_Id": "SM303",
              "Items": [
                {
                  "Item_Name": "Caesar Salad",
                  "Item_Id": "I305",
                  "Description": "A classic Caesar with crisp romaine lettuce.",
                  "Price": 15.00,
                  "Image": "https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M=",
                  "IsAvailable": 1
                },
                {
                  "Item_Name": "Greek Salad",
                  "Item_Id": "I306",
                  "Description": "Mixed greens with feta, olives, and dressing.",
                  "Price": 18.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlfJWSz_pT9LgXvU37bHgwIpsmC3HLmIEu60h0nlVTN-MCBC0e9RNEeu-pqE-M9BhmdrY&usqp=CAU",
                  "IsAvailable": 1
                }
              ]
            },
            {
              "Submenu_Name": "Warm",
              "Submenu_Id": "SM304",
              "Items": [
                {
                  "Item_Name": "Warm Quinoa Salad",
                  "Item_Id": "I307",
                  "Description": "A mix of quinoa, roasted veggies, and a light vinaigrette.",
                  "Price": 20.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpptIUMlnioDZxSpnLnIST_qJAC_Bw9synOLrks2ZYitcUyEUbb5Le7uVDrj5yiYiFWY8&usqp=CAU",
                  "IsAvailable": 1
                },
                {
                  "Item_Name": "Grilled Chicken Salad",
                  "Item_Id": "I308",
                  "Description": "Grilled chicken, mixed greens, and light dressing.",
                  "Price": 22.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 1
                }
              ]
            }
          ]
        },
        {
          "Category_Name": "Entrees",
          "Category_Id": "C203",
          "IsSelect": 0,
          "Submenu": [
            {
              "Submenu_Name": "Grilled",
              "Submenu_Id": "SM305",
              "Items": [
                {
                  "Item_Name": "Grilled Chicken Breast",
                  "Item_Id": "I309",
                  "Description": "Tender grilled chicken breast with spices.",
                  "Price": 22.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 1
                },
                {
                  "Item_Name": "Grilled Steak",
                  "Item_Id": "I310",
                  "Description": "Juicy grilled steak, seasoned perfectly.",
                  "Price": 30.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpptIUMlnioDZxSpnLnIST_qJAC_Bw9synOLrks2ZYitcUyEUbb5Le7uVDrj5yiYiFWY8&usqp=CAU",
                  "IsAvailable": 1
                }
              ]
            },
            {
              "Submenu_Name": "Vegetarian",
              "Submenu_Id": "SM306",
              "Items": [
                {
                  "Item_Name": "Vegetable Stir-Fry",
                  "Item_Id": "I311",
                  "Description": "A medley of vegetables stir-fried in a soy sauce.",
                  "Price": 20.00,
                  "Image": "https://media.gettyimages.com/id/1457889029/photo/group-of-food-with-high-content-of-dietary-fiber-arranged-side-by-side.jpg?s=612x612&w=gi&k=20&c=YiNatAP0CzFSalhnkzSUFyy6XpVhBe3WSnRpu1W3pV4=",
                  "IsAvailable": 1
                },
                {
                  "Item_Name": "Grilled Tofu",
                  "Item_Id": "I312",
                  "Description": "Grilled tofu served with sautéed vegetables.",
                  "Price": 18.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpptIUMlnioDZxSpnLnIST_qJAC_Bw9synOLrks2ZYitcUyEUbb5Le7uVDrj5yiYiFWY8&usqp=CAU",
                  "IsAvailable": 1
                }
              ]
            }
          ]
        },
      ]
    },
    {
      "MealPeriod_Name": "Dinner",
      "MealPeriod_Id": "MP103",
      "IsSelect": 0,
      "IsEnabled": 1,
      "Time": "05:00 PM - 09:30 PM",
      "Categories": [
        {
          "Category_Name": "Coconut",
          "Category_Id": "C2013",
          "IsSelect": 1,
          "Submenu": [
            {
              "Submenu_Name": "Normal",
              "Submenu_Id": "SM301",
              "Items": [
                {
                  "Item_Name": "Seared Salmon Salad",
                  "Item_Id": "I301",
                  "Description": "Savor the delicious Green salad.",
                  "Price": 25.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 1
                },
                {
                  "Item_Name": "Coconut Shrimp",
                  "Item_Id": "I302",
                  "Description": "These coconut shrimp are dipped...",
                  "Price": 45.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 1
                }
              ]
            },
            {
              "Submenu_Name": "Cold",
              "Submenu_Id": "SM302",
              "Items": [
                {
                  "Item_Name": "Caprese Salad",
                  "Item_Id": "I303",
                  "Description": "Fresh mozzarella, tomatoes, and basil.",
                  "Price": 18.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 0
                },
                {
                  "Item_Name": "Guacamole with Chips",
                  "Item_Id": "I304",
                  "Description": "A creamy guacamole served with crispy tortilla chips A creamy guacamole served with crispy tortilla chips A creamy guacamole served with crispy tortilla chips A creamy guacamole served with crispy tortilla chips A creamy guacamole served with crispy tortilla chips.",
                  "Price": 12.00,
                  "Image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyFtIGM3jyStp1h0rD-HPwSRfqmMvBVBtXTtjX7MbaAtnjx3TIMAZs6bT0BdMrBB0nRL8&usqp=CAU",
                  "IsAvailable": 1
                }
              ]
            }
          ]
        },
       ]
    }
  ]
}