import axios from "axios";
import { baseURL, endpoints } from "../config/config";
 
const api = axios.create({
    baseURL,
});
api.interceptors.request.use((request) => {
  console.log("Starting Request", request.url);
  return request;
});
 
api.interceptors.response.use((response) => {
  console.log("Response:", response.data);
  return response;
});
export default api;

export const postApiCall = async (screenName:string,endpoint:string, params:any) => {
    try {
     let responseData  = await api.post(`${baseURL}/${endpoints[screenName][endpoint]}`,params,
        {
          headers: {
            "Content-Type": "application/json",
            token: "",
          },
        }
      )
      return {
        response:responseData.data,
        statusCode:responseData.status,
        statusText:responseData.statusText
      }
    } catch (error) {
      console.log(JSON.stringify(error))
    }
}
 
//No sonar
// const response = await api.get(endpoints, {
//   headers: {
//     "Content-Type": "application/json",
//     token: userToken,
//   },
// });
 
 
// const response = await api.post(endpoints,{},
//        {
//          headers: {
//            "Content-Type": "application/json",
//            token: userToken,
//          },
//        }
//      );
 
//No sonar
//  const response = await api.put(endpoints + id, {},
//    {
//      headers: {
//        "Content-Type": "application/json",
//        token: userToken,
//      },
//    }
//  );
 
//No sonar
//   const response = await api.delete(
//     endpoints + id,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         token: userToken,
//       },
//     }
//   );