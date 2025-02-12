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
export const baseURL = "https://cobaltportal.mycobaltsoftware.com/cssi.cobalt.member.wrapper.EngDev/api/"

export const endpoints = {
    PROFIT_CENTER: {
        GET_PROFIT_CENTERS: "MobileOrdering/MO_GetProfitCenters"
    },
    MENU_ORDER:{
        GET_MENU_ORDER_LIST:"MobileOrdering/MO_GetMenuItems",
        GET_MENU_ORDER_STATUS:"MobileOrdering/MO_GetItemStatus"
    }
}
