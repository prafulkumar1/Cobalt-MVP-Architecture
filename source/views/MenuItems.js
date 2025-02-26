import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

const jsonData = [
    { MealPeriod_Name: "Breakfast", MealPeriod_Id: "MP102", IsEnabled: 0, Time: "06:00 AM - 10:30 AM" },
    { MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101", IsEnabled: 1, Time: "12:00 PM - 04:30 PM" },
    { MealPeriod_Name: "Dinner", MealPeriod_Id: "MP103", IsEnabled: 1, Time: "05:00 PM - 09:30 PM" },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        IsEnabled: 1, Time: "06:00 AM - 10:30 AM",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Seared Salmon Salad", Item_Id: "I301",
        Description: "Savor the delicious Green salad.", Price: 25.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        IsEnabled: 1, Time: "06:00 AM - 10:30 AM",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Seared Salmon Salad", Item_Id: "I301",
        Description: "Savor the delicious Green salad.", Price: 25.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Seared Salmon Salad", Item_Id: "I301",
        Description: "Savor the delicious Green salad.", Price: 25.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Seared Salmon Salad", Item_Id: "I301",
        Description: "Savor the delicious Green salad.", Price: 25.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Coconut Shrimp", Item_Id: "I302",
        Description: "These coconut shrimp are dipped...", Price: 45.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Seared Salmon Salad", Item_Id: "I301",
        Description: "Savor the delicious Green salad.", Price: 25.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Coconut Shrimp", Item_Id: "I302",
        Description: "These coconut shrimp are dipped...", Price: 45.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Seared Salmon Salad", Item_Id: "I301",
        Description: "Savor the delicious Green salad.", Price: 25.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Coconut Shrimp", Item_Id: "I302",
        Description: "These coconut shrimp are dipped...", Price: 45.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Seared Salmon Salad", Item_Id: "I301",
        Description: "Savor the delicious Green salad.", Price: 25.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Coconut Shrimp", Item_Id: "I302",
        Description: "These coconut shrimp are dipped...", Price: 45.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "COLD", Submenu_Id: "SM301",
        Item_Name: "Seared Salmon Salad", Item_Id: "I301",
        Description: "Savor the delicious Green salad.", Price: 25.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "COLD", Submenu_Id: "SM301",
        Item_Name: "Seared Salmon Salad", Item_Id: "I301",
        Description: "Savor the delicious Green salad.", Price: 25.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "COLD", Submenu_Id: "SM301",
        Item_Name: "Seared Salmon Salad", Item_Id: "I301",
        Description: "Savor the delicious Green salad.", Price: 25.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "COLD", Submenu_Id: "SM301",
        Item_Name: "Seared Salmon Salad", Item_Id: "I301",
        Description: "Savor the delicious Green salad.", Price: 25.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "COLD", Submenu_Id: "SM301",
        Item_Name: "Seared Salmon Salad", Item_Id: "I301",
        Description: "Savor the delicious Green salad.", Price: 25.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "COLD", Submenu_Id: "SM301",
        Item_Name: "Seared Salmon Salad", Item_Id: "I301",
        Description: "Savor the delicious Green salad.", Price: 25.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Coconut Shrimp", Item_Id: "I302",
        Description: "These coconut shrimp are dipped...", Price: 45.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Salads", Category_Id: "C202",
        Submenu_Name: "Fresh", Submenu_Id: "SM303",
        Item_Name: "Caesar Salad", Item_Id: "I305",
        Description: "A classic Caesar with crisp romaine lettuce.", Price: 15.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Coconut Shrimp", Item_Id: "I302",
        Description: "These coconut shrimp are dipped...", Price: 45.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Salads", Category_Id: "C202",
        Submenu_Name: "Fresh", Submenu_Id: "SM303",
        Item_Name: "Caesar Salad", Item_Id: "I305",
        Description: "A classic Caesar with crisp romaine lettuce.", Price: 15.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Coconut Shrimp", Item_Id: "I302",
        Description: "These coconut shrimp are dipped...", Price: 45.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Salads", Category_Id: "C202",
        Submenu_Name: "Fresh", Submenu_Id: "SM303",
        Item_Name: "Caesar Salad", Item_Id: "I305",
        Description: "A classic Caesar with crisp romaine lettuce.", Price: 15.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Coconut Shrimp", Item_Id: "I302",
        Description: "These coconut shrimp are dipped...", Price: 45.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Salads", Category_Id: "C202",
        Submenu_Name: "Fresh", Submenu_Id: "SM303",
        Item_Name: "Caesar Salad", Item_Id: "I305",
        Description: "A classic Caesar with crisp romaine lettuce.", Price: 15.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Coconut Shrimp", Item_Id: "I302",
        Description: "These coconut shrimp are dipped...", Price: 45.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Salads", Category_Id: "C202",
        Submenu_Name: "Fresh", Submenu_Id: "SM303",
        Item_Name: "Caesar Salad", Item_Id: "I305",
        Description: "A classic Caesar with crisp romaine lettuce.", Price: 15.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Coconut Shrimp", Item_Id: "I302",
        Description: "These coconut shrimp are dipped...", Price: 45.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Food", Category_Id: "C202",
        Submenu_Name: "Fresh", Submenu_Id: "SM303",
        Item_Name: "Caesar Salad", Item_Id: "I305",
        Description: "A classic Caesar with crisp romaine lettuce.", Price: 15.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Appetizers", Category_Id: "C201",
        Submenu_Name: "Hot", Submenu_Id: "SM301",
        Item_Name: "Coconut Shrimp", Item_Id: "I302",
        Description: "These coconut shrimp are dipped...", Price: 45.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    },
    {
        MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
        Category_Name: "Salads", Category_Id: "C202",
        Submenu_Name: "Fresh", Submenu_Id: "SM303",
        Item_Name: "Caesar Salad", Item_Id: "I305",
        Description: "A classic Caesar with crisp romaine lettuce.", Price: 15.0,
        Image: "https://via.placeholder.com/100", IsAvailable: 1
    }
];

export default function MenuItems() {
    const [mealPeriods, setMealPeriods] = useState([]);
    const [selectedMealPeriod, setSelectedMealPeriod] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [submenus, setSubmenus] = useState([]);
    const [selectedSubmenu, setSelectedSubmenu] = useState(null);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        const uniqueMealPeriods = [...new Set(jsonData.filter(item => item.MealPeriod_Id).map(item => item.MealPeriod_Name))];
        setMealPeriods(uniqueMealPeriods);
        setSelectedMealPeriod(uniqueMealPeriods[0]);
    }, []);

    useEffect(() => {
        if (selectedMealPeriod) {
            const filteredCategories = [...new Set(jsonData
                .filter(item => item.MealPeriod_Name === selectedMealPeriod)
                .map(item => item.Category_Name)
            )];
            setCategories(filteredCategories);
            setSelectedCategory(filteredCategories[0]);
        }
    }, [selectedMealPeriod]);

    useEffect(() => {
        if (selectedCategory) {
            const filteredSubmenus = [...new Set(jsonData
                .filter(item => item.Category_Name === selectedCategory)
                .map(item => item.Submenu_Name)
            )];
            setSubmenus(filteredSubmenus);
            setSelectedSubmenu(filteredSubmenus[0]);
        }
    }, [selectedCategory]);

    useEffect(() => {
        if (selectedCategory && selectedSubmenu) {
            const filteredItems = jsonData.filter(
                item => item.Category_Name === selectedCategory && item.Submenu_Name === selectedSubmenu
            );
            setMenuItems(filteredItems);
        }
    }, [selectedCategory, selectedSubmenu]);

    const handleScrollEnd = () => {
        const submenuIndex = submenus.indexOf(selectedSubmenu);
        if (submenuIndex < submenus.length - 1) {
            setSelectedSubmenu(submenus[submenuIndex + 1]);
        } else {
            const categoryIndex = categories.indexOf(selectedCategory);
            if (categoryIndex < categories.length - 1) {
                setSelectedCategory(categories[categoryIndex + 1]);
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* Meal Periods */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mealPeriodContainer}>
                {mealPeriods.map((period, index) => (
                    <TouchableOpacity key={index} onPress={() => setSelectedMealPeriod(period)}>
                        <Text style={[styles.mealPeriod, selectedMealPeriod === period && styles.selectedMealPeriod]}>
                            {period}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Categories */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
                {categories.map((category, index) => (
                    <TouchableOpacity key={index} onPress={() => setSelectedCategory(category)}>
                        <Text style={[styles.category, selectedCategory === category && styles.selectedCategory]}>
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Submenus */}
            <ScrollView  showsHorizontalScrollIndicator={false} style={styles.submenuContainer}>
                {submenus.map((submenu, index) => (
                    <TouchableOpacity key={index} onPress={() => setSelectedSubmenu(submenu)}>
                        <Text style={[styles.submenu, selectedSubmenu === submenu && styles.selectedSubmenu]}>
                            {submenu}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Menu Items */}
            <FlatList
                data={menuItems}
                keyExtractor={(item) => item.Item_Id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={{ uri: item.Image }} style={styles.image} />
                        <View style={styles.details}>
                            <Text style={styles.title}>{item.Item_Name}</Text>
                            <Text>{item.Description}</Text>
                            <Text style={styles.price}>${item.Price.toFixed(2)}</Text>
                        </View>
                    </View>
                )}
                onEndReached={handleScrollEnd}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: "#fff" },
    mealPeriodContainer: { flexDirection: "row", marginBottom: 10 },
    mealPeriod: { padding: 10, fontSize: 16, color: "gray" },
    selectedMealPeriod: { color: "blue", fontWeight: "bold", borderBottomWidth: 2, borderBottomColor: "blue" },
    categoryContainer: { flexDirection: "row", marginBottom: 10 },
    category: { padding: 10, fontSize: 16, color: "gray" },
    selectedCategory: { color: "blue", fontWeight: "bold", borderBottomWidth: 2, borderBottomColor: "blue" },
    submenuContainer: { flexDirection: "row", marginBottom: 10 },
    submenu: { padding: 10, fontSize: 14, color: "gray" },
    selectedSubmenu: { color: "blue", fontWeight: "bold", borderBottomWidth: 2, borderBottomColor: "blue" },
    item: { flexDirection: "row", alignItems: "center", marginVertical: 10, padding: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 10 },
    image: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
    details: { flex: 1 },
    title: { fontSize: 16, fontWeight: "bold" },
    price: { fontSize: 16, fontWeight: "bold", color: "green" }
});

// import React, { useState, useEffect } from "react";
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

// const jsonData = [
//     { MealPeriod_Name: "Breakfast", MealPeriod_Id: "MP102", IsEnabled: 1, Time: "06:00 AM - 10:30 AM" },
//     { MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101", IsEnabled: 1, Time: "12:00 PM - 04:30 PM" },
//     { MealPeriod_Name: "Dinner", MealPeriod_Id: "MP103", IsEnabled: 1, Time: "05:00 PM - 09:30 PM" },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Seared Salmon Salad", Item_Id: "I301",
//         Description: "Savor the delicious Green salad.", Price: 25.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Seared Salmon Salad", Item_Id: "I301",
//         Description: "Savor the delicious Green salad.", Price: 25.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Seared Salmon Salad", Item_Id: "I301",
//         Description: "Savor the delicious Green salad.", Price: 25.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Seared Salmon Salad", Item_Id: "I301",
//         Description: "Savor the delicious Green salad.", Price: 25.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Coconut Shrimp", Item_Id: "I302",
//         Description: "These coconut shrimp are dipped...", Price: 45.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Seared Salmon Salad", Item_Id: "I301",
//         Description: "Savor the delicious Green salad.", Price: 25.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Coconut Shrimp", Item_Id: "I302",
//         Description: "These coconut shrimp are dipped...", Price: 45.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Seared Salmon Salad", Item_Id: "I301",
//         Description: "Savor the delicious Green salad.", Price: 25.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Coconut Shrimp", Item_Id: "I302",
//         Description: "These coconut shrimp are dipped...", Price: 45.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Seared Salmon Salad", Item_Id: "I301",
//         Description: "Savor the delicious Green salad.", Price: 25.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Coconut Shrimp", Item_Id: "I302",
//         Description: "These coconut shrimp are dipped...", Price: 45.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "COLD", Submenu_Id: "SM301",
//         Item_Name: "Seared Salmon Salad", Item_Id: "I301",
//         Description: "Savor the delicious Green salad.", Price: 25.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "COLD", Submenu_Id: "SM301",
//         Item_Name: "Seared Salmon Salad", Item_Id: "I301",
//         Description: "Savor the delicious Green salad.", Price: 25.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "COLD", Submenu_Id: "SM301",
//         Item_Name: "Seared Salmon Salad", Item_Id: "I301",
//         Description: "Savor the delicious Green salad.", Price: 25.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "COLD", Submenu_Id: "SM301",
//         Item_Name: "Seared Salmon Salad", Item_Id: "I301",
//         Description: "Savor the delicious Green salad.", Price: 25.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "COLD", Submenu_Id: "SM301",
//         Item_Name: "Seared Salmon Salad", Item_Id: "I301",
//         Description: "Savor the delicious Green salad.", Price: 25.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "COLD", Submenu_Id: "SM301",
//         Item_Name: "Seared Salmon Salad", Item_Id: "I301",
//         Description: "Savor the delicious Green salad.", Price: 25.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Coconut Shrimp", Item_Id: "I302",
//         Description: "These coconut shrimp are dipped...", Price: 45.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Salads", Category_Id: "C202",
//         Submenu_Name: "Fresh", Submenu_Id: "SM303",
//         Item_Name: "Caesar Salad", Item_Id: "I305",
//         Description: "A classic Caesar with crisp romaine lettuce.", Price: 15.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Coconut Shrimp", Item_Id: "I302",
//         Description: "These coconut shrimp are dipped...", Price: 45.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Salads", Category_Id: "C202",
//         Submenu_Name: "Fresh", Submenu_Id: "SM303",
//         Item_Name: "Caesar Salad", Item_Id: "I305",
//         Description: "A classic Caesar with crisp romaine lettuce.", Price: 15.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Coconut Shrimp", Item_Id: "I302",
//         Description: "These coconut shrimp are dipped...", Price: 45.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Salads", Category_Id: "C202",
//         Submenu_Name: "Fresh", Submenu_Id: "SM303",
//         Item_Name: "Caesar Salad", Item_Id: "I305",
//         Description: "A classic Caesar with crisp romaine lettuce.", Price: 15.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Coconut Shrimp", Item_Id: "I302",
//         Description: "These coconut shrimp are dipped...", Price: 45.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Salads", Category_Id: "C202",
//         Submenu_Name: "Fresh", Submenu_Id: "SM303",
//         Item_Name: "Caesar Salad", Item_Id: "I305",
//         Description: "A classic Caesar with crisp romaine lettuce.", Price: 15.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Coconut Shrimp", Item_Id: "I302",
//         Description: "These coconut shrimp are dipped...", Price: 45.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Salads", Category_Id: "C202",
//         Submenu_Name: "Fresh", Submenu_Id: "SM303",
//         Item_Name: "Caesar Salad", Item_Id: "I305",
//         Description: "A classic Caesar with crisp romaine lettuce.", Price: 15.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Coconut Shrimp", Item_Id: "I302",
//         Description: "These coconut shrimp are dipped...", Price: 45.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Food", Category_Id: "C202",
//         Submenu_Name: "Fresh", Submenu_Id: "SM303",
//         Item_Name: "Caesar Salad", Item_Id: "I305",
//         Description: "A classic Caesar with crisp romaine lettuce.", Price: 15.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Appetizers", Category_Id: "C201",
//         Submenu_Name: "Hot", Submenu_Id: "SM301",
//         Item_Name: "Coconut Shrimp", Item_Id: "I302",
//         Description: "These coconut shrimp are dipped...", Price: 45.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     },
//     {
//         MealPeriod_Name: "Lunch", MealPeriod_Id: "MP101",
//         Category_Name: "Salads", Category_Id: "C202",
//         Submenu_Name: "Fresh", Submenu_Id: "SM303",
//         Item_Name: "Caesar Salad", Item_Id: "I305",
//         Description: "A classic Caesar with crisp romaine lettuce.", Price: 15.0,
//         Image: "https://via.placeholder.com/100", IsAvailable: 1
//     }
// ];

// export default function MenuItems() {
//   const [mealPeriods, setMealPeriods] = useState([]);
//   const [selectedMealPeriod, setSelectedMealPeriod] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [submenus, setSubmenus] = useState([]);
//   const [selectedSubmenu, setSelectedSubmenu] = useState(null);
//   const [menuItems, setMenuItems] = useState([]);
//   const [expandedSubmenus, setExpandedSubmenus] = useState({});

//   useEffect(() => {
//     const uniqueMealPeriods = [...new Set(jsonData.filter(item => item.MealPeriod_Id).map(item => item.MealPeriod_Name))];
//     setMealPeriods(uniqueMealPeriods);
//     setSelectedMealPeriod(uniqueMealPeriods[0]);
//   }, []);

//   useEffect(() => {
//     if (selectedMealPeriod) {
//       const filteredCategories = [...new Set(jsonData
//         .filter(item => item.MealPeriod_Name === selectedMealPeriod)
//         .map(item => item.Category_Name)
//       )];
//       setCategories(filteredCategories);
//       setSelectedCategory(filteredCategories[0]);
//     }
//   }, [selectedMealPeriod]);

//   useEffect(() => {
//     if (selectedCategory) {
//       const filteredSubmenus = [...new Set(jsonData
//         .filter(item => item.Category_Name === selectedCategory)
//         .map(item => item.Submenu_Name)
//       )];
//       setSubmenus(filteredSubmenus);
//       setSelectedSubmenu(filteredSubmenus[0]);
//     }
//   }, [selectedCategory]);

//   useEffect(() => {
//     if (selectedCategory && selectedSubmenu) {
//       const filteredItems = jsonData.filter(
//         item => item.Category_Name === selectedCategory && item.Submenu_Name === selectedSubmenu
//       );
//       setMenuItems(filteredItems);
//     }
//   }, [selectedCategory, selectedSubmenu]);

//   const handleSubmenuToggle = (submenu) => {
//     setExpandedSubmenus(prevState => ({
//       ...prevState,
//       [submenu]: !prevState[submenu]
//     }));
//   };

//   const handleScrollEnd = () => {
//     const submenuIndex = submenus.indexOf(selectedSubmenu);
//     if (submenuIndex < submenus.length - 1) {
//       setSelectedSubmenu(submenus[submenuIndex + 1]);
//     } else {
//       const categoryIndex = categories.indexOf(selectedCategory);
//       if (categoryIndex < categories.length - 1) {
//         setSelectedCategory(categories[categoryIndex + 1]);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Meal Periods */}
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mealPeriodContainer}>
//         {mealPeriods.map((period, index) => (
//           <TouchableOpacity key={index} onPress={() => setSelectedMealPeriod(period)}>
//             <Text style={[styles.mealPeriod, selectedMealPeriod === period && styles.selectedMealPeriod]}>
//               {period}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* Categories */}
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
//         {categories.map((category, index) => (
//           <TouchableOpacity key={index} onPress={() => setSelectedCategory(category)}>
//             <Text style={[styles.category, selectedCategory === category && styles.selectedCategory]}>
//               {category}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

      {/* Collapsible Submenus */}
    //   <ScrollView showsHorizontalScrollIndicator={false} style={styles.submenuContainer}>
    //     {submenus.map((submenu, index) => (
    //       <View key={index}>
    //         <TouchableOpacity onPress={() => handleSubmenuToggle(submenu)}>
    //           <Text style={[styles.submenu, selectedSubmenu === submenu && styles.selectedSubmenu]}>
    //             {submenu}
    //           </Text>
    //         </TouchableOpacity>
    //         {expandedSubmenus[submenu] && (
    //           <View style={styles.submenuItems}>
    //             <FlatList
    //               data={jsonData.filter(item => item.Submenu_Name === submenu && item.Category_Name === selectedCategory)}
    //               keyExtractor={item => item.Item_Id}
    //               renderItem={({ item }) => (
    //                 <View style={styles.item}>
    //                   <Image source={{ uri: item.Image }} style={styles.image} />
    //                   <View style={styles.details}>
    //                     <Text style={styles.title}>{item.Item_Name}</Text>
    //                     <Text>{item.Description}</Text>
    //                     <Text style={styles.price}>${item.Price.toFixed(2)}</Text>
    //                   </View>
    //                 </View>
    //               )}
    //             />
    //           </View>
    //         )}
    //       </View>
    //     ))}
    //  </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 10, backgroundColor: "#fff" },
//   mealPeriodContainer: { flexDirection: "row", marginBottom: 10 },
//   mealPeriod: { padding: 10, fontSize: 16, color: "gray" },
//   selectedMealPeriod: { color: "blue", fontWeight: "bold", borderBottomWidth: 2, borderBottomColor: "blue" },
//   categoryContainer: { flexDirection: "row", marginBottom: 10 },
//   category: { padding: 10, fontSize: 16, color: "gray" },
//   selectedCategory: { color: "blue", fontWeight: "bold", borderBottomWidth: 2, borderBottomColor: "blue" },
//   submenuContainer: { marginBottom: 10 },
//   submenu: { padding: 10, fontSize: 14, color: "gray" },
//   selectedSubmenu: { color: "blue", fontWeight: "bold", borderBottomWidth: 2, borderBottomColor: "blue" },
//   submenuItems: { paddingLeft: 20 },
//   item: { flexDirection: "row", alignItems: "center", marginVertical: 10, padding: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 10 },
//   image: { width: 60, height: 60, borderRadius: 10, marginRight: 10 },
//   details: { flex: 1 },
//   title: { fontSize: 16, fontWeight: "bold" },
//   price: { fontSize: 16, fontWeight: "bold", color: "green" }
// });
