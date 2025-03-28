import axios from "axios";
import { baseURL, endpoints } from "../config/config";
import * as DeviceInfo from 'expo-device';
import { isPlatformAndroid } from "../constants/Matrices";
 
const api = axios.create({
    baseURL,
});
api.interceptors.request.use((request) => {
  console.log("Starting Request", request.url);
  return request;
});
 
api.interceptors.response.use((response) => {
  console.log("Response:", JSON.stringify(response.data));
  return response;
});
export default api;

export const postApiCall = async (screenName: string, endpoint: string, params: any) => {
  try {
    const commonParams = {
      "DeviceInfo": [
          {
              "Browser": "iPadOS",
              "DeviceType": 1,
              "HostName": "183.82.116.84.actcorp.in",
              "OSVersion": "17.6.1",
              "OriginatingIP": "183.82.116.84",
              "SessionID": "iedtpmh83f860p0daqq75bhf76kbmmlt",
              "SourcePortNo": "50189"
          }
      ],
      "ID": "57987FB5-35B6-4025-8D94-31076D833A56",
      "IsAdmin": "0",
      "MemberID": "57987FB5-35B6-4025-8D94-31076D833A56",
      "ParentID": "78F8EE9D-CF86-441D-86F8-29F8B9161B9F",
      "Role": "Full Access",
      "UserId": "1438",
      "UserName": "Abraham, Mr. James",
      //  "Location_Id": "1F2E7D4E-2C13-4B19-845E-1FC7ED532BBF",
      // "MealPeriod_Id": "16855B79-8BC7-4CE7-A24A-F56F60A979F8"
  }
    const finalParams = { ...commonParams, ...params };
 
    let responseData = await api.post(
      `${baseURL}${endpoints[screenName][endpoint]}`,
      finalParams,
      {
        headers: {
          "Content-Type": "application/json",
          token: "",
        },
      }
    );
 
    return {
      response: responseData.data,
      statusCode: responseData.status,
      statusText: responseData.statusText,
    };
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