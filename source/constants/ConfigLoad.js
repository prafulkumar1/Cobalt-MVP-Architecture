// src/config/configLoader.js
import { postApiCall } from '@/source/utlis/api';
import { createTable, getConfig, saveConfig,getTableStructure,clearTable } from './LocalDatabase';


let appConfigJsonArray;
export const loadAppConfigurations = async () => {
  try {
    await clearTable();
    // Create the table
    await createTable();

    // Call the API and save to the local database
    const AppConfigJsonData = await postApiCall("UI_CONFIGURATIONS", "GET_UI_CONFIGURATIONS", {});
    if (AppConfigJsonData?.statusCode === 200) {
      const configData = AppConfigJsonData?.response?.Data;
           //console.log(JSON.stringify(configData));
     await saveConfig('AppConfigJson', configData);    
     appConfigJsonArray = await getConfig('AppConfigJson');
      console.log("App Config Loaded and Stored Locally:", appConfigJsonArray);      
    }
  } catch (error) {
    console.error("Error fetching configurations:", error);
  }
};


export const loadPageConfig = async (pageId) => {
  try {   
    let pagejson = appConfigJsonArray?.find(item => item.PageId === pageId);
    const pageConfigJson = pagejson.Controls.map((control) => {
      try {
        return JSON.parse(control.ControlJson);
      } catch (error) {
        console.error("Error parsing ControlJson:", error);
        return null; // Return null if parsing fails
      }
    });
    return pageConfigJson;
  } catch (error) {
    console.error("Error fetching configurations:", error);
  }
};
