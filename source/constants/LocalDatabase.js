import React from 'react';
import * as SQLite from 'expo-sqlite';

let db;

const createTable = async () => {
  db = await SQLite.openDatabaseAsync('Config.db');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS UIConfig (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        PageId TEXT,
        Controls TEXT
      );
  `);
};

const saveConfig = async (value) => {  
  try {
    for (const page of value) {
      const { PageId, Controls } = page;
      const controlsString = JSON.stringify(Controls);
      await (await db).execAsync(
        `INSERT INTO UIConfig (PageId, Controls) VALUES ('${PageId}', '${controlsString}');`,
      );
    }
    console.log("Config saved successfully!");
  } catch (error) {
    console.error('Error saving config:', error);
  }
};

const getConfig = async (pageId) => {
  db = await SQLite.openDatabaseAsync('Config.db');
  try {
    const result = await (await db).getFirstAsync(
      `SELECT Controls FROM UIConfig WHERE PageId = '${pageId}';`,
    );
    if (result?.Controls) {
      return JSON.parse(result.Controls);
    }
    return null;
  } catch (error) {
    console.error('Error getting config:', error);
    return null;
  }
};




const getTableStructure = async () => {
  try {
    const result = (await db).getAllAsync(
      `SELECT sql FROM sqlite_master WHERE type='table' AND name='UIConfig';`
    );
    if (result.length > 0) {
      console.log('Table Structure:', result[0].sql);
    } else {
      console.log('Table "Config" does not exist.');
    }
  } catch (error) {
    console.error('Error getting table structure:', error);
  }
};


const clearTable = async () => {
  try {
   await (await db).execAsync(`DELETE FROM UIConfig;`);
    console.log('All records from "Config" table deleted successfully.');
  } catch (error) {
    console.error('Error deleting data from table:', error);
  }
};


const clearConfig = async () => {
  try {
    await db.execAsync(`DELETE FROM UIConfig;`);
    console.log('All config entries cleared.');
  } catch (error) {
    console.error('Error clearing config:', error);
  }
};

export { createTable, saveConfig, getConfig,getTableStructure,clearTable,clearConfig };
