// src/config/configLoader.js
import { postApiCall } from '@/source/utlis/api';
import { createTable, getConfig, saveConfig,getTableStructure,clearTable,clearConfig } from './LocalDatabase';


let appConfigJsonArray;
export const loadAppConfigurations = async () => {
  try {
    
    await createTable();
     await clearTable();
    // Call the API and save to the local database
    const AppConfigJsonData = await postApiCall("UI_CONFIGURATIONS", "GET_UI_CONFIGURATIONS", {});
    if (AppConfigJsonData?.statusCode === 200) {
      const configData = AppConfigJsonData?.response?.Data;
     await saveConfig(configData);     
    }
  } catch (error) {
    console.error("Error fetching configurations:", error);
  }
};


export const loadPageConfig = async (pageId,controlId) => {
  
  try {      
    const pageConfig = await getConfig(pageId); 
  const pageConfigJson = pageConfig.map((control) => {
    try {
      return JSON.parse(control.ControlJson);
    } catch (error) {
      console.error("Error parsing ControlJson:", error);
      return null; 
    }
  });
 
 const controlConfig= pageConfigJson.find((item) => item.id === controlId);
    return controlConfig;
  } catch (error) {
    console.error("Error fetching configurations:", error);
  }
};
