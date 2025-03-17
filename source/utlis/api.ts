import axios from "axios";
import { baseURL, endpoints } from "../config/config";
import * as DeviceInfo from 'expo-device';
 
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
      "MemberID": "09071",
      "ID": "128EF3F3-A7F1-4278-A99E-6C53F5B3B047",
      "ParentID": "78F8EE9D-CF86-441D-86F8-29F8B9161B9F",
      "DeviceInfo": [
        {
          "DeviceType": DeviceInfo.deviceType,
          "OSVersion": DeviceInfo.osVersion,
          "OriginatingIP": "183.82.116.84",
          "SessionID": "iedtpmh83f860p0daqq75bhf76kbmmlt",
          "Browser": DeviceInfo.osName,
          "HostName": "183.82.116.84.actcorp.in",
          "SourcePortNo": "50189"
        }
      ],
      "IsAdmin": "0",
      "UserName": "Henry, aa Luther",
      "Role": "Full Access",
      "UserId": "9837",
    };
    const finalParams = { ...commonParams, ...params };
    console.log('Params', commonParams);

    let responseData = await api.post(
      `${baseURL}/${endpoints[screenName][endpoint]}`,
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