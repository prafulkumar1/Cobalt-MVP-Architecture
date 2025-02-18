// src/config/configLoader.js
import { postApiCall } from '@/source/utlis/api';
import { createTable, getConfig, saveConfig, clearConfig } from './LocalDatabase';

export const loadAppConfigurations = async () => {
  try {
    // Create the table
    createTable();

    // Call the API and save to the local database
    const AppConfigJsonData = await postApiCall("UI_CONFIGURATIONS", "GET_UI_CONFIGURATIONS", {});
    if (AppConfigJsonData?.statusCode === 200) {
      const configData = AppConfigJsonData?.response?.Data;
            await clearConfig();
      // Save the configuration to the database
     await saveConfig('AppConfigJson', configData);

      // Retrieve the saved configuration
      const result = await getConfig('AppConfigJson');
      console.log("App Config Loaded and Stored Locally:", result,"");
    }
  } catch (error) {
    console.error("Error fetching configurations:", error);
  }
};
