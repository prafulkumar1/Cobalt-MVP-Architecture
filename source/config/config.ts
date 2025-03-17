// import AsyncStorage from "@react-native-async-storage/async-storage"
// import { useEffect, useState } from "react"

// const [baseUri, setBaseUri] = useState<string>("")

// const getBaseUrl = async () => {
//     try {
//         let url = await AsyncStorage.getItem("baseUrl")
//         if (url !== null) {
//             setBaseUri(url)
//         }
//     } catch (error) {
//         console.log(JSON.stringify(error))
//     }
// }

// useEffect(() => {
//     // getBaseUrl()
// }, [])
// https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.CobaltDev/api/MobileOrdering/MO_Getprofitcenters   ---->>> BA Dev
export const baseURL = "https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.EngDev/api/"

export const endpoints = {
    UI_CONFIGURATIONS:{
        GET_UI_CONFIGURATIONS:"MobileOrdering/MO_GetControlsInfo"
    },
    PROFIT_CENTER: {
        GET_PROFIT_CENTERS: "MobileOrdering/MO_GetProfitCenters"
    },
    MENU_ORDER:{
        GET_MENU_ORDER_LIST:"MobileOrdering/MO_GetMenuItems",
        GET_MENU_ORDER_STATUS:"MobileOrdering/MO_GetItemStatus"
    },
    ITEM_MODIFIERS:{
        GET_ITEM_MODIFIERS:"MobileOrdering/MO_GetItemModifiers",
    },
    CART:{
        GET_CART_CONFIG:"MobileOrdering/MO_GetCartConfig",
        GET_CART_PRICE:"MobileOrdering/MO_GetCartPrice",
        PLACE_ORDER:"MobileOrdering/MO_SaveOrder",
    },
    RECENT_ORDERS:{
        GET_RECENT_ORDERS: "MobileOrdering/MO_getrecentorders"
    },
    FAVORITES:{
        GET_FAVORITES :"MobileOrdering/MO_getfavouriteitems",
        SAVE_FAVORITES:"MobileOrdering/MO_SaveFavourites"
    }
}
