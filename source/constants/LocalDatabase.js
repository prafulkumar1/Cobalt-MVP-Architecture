import React from 'react';
import * as SQLite from 'expo-sqlite';

let db;

const createTable = async () => {
  db = await SQLite.openDatabaseAsync('Config.db');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS Config (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      key TEXT UNIQUE, 
      JsonValue TEXT
    );
  `);
};

const saveConfig = async (key, value) => {
  const jsonString = JSON.stringify(value);
  try {
    (await db).execAsync(
      `INSERT INTO Config (key, JsonValue) VALUES ('${key}', '${jsonString}');`,
    );
  } catch (error) {
    console.error('Error saving config:', error);
  }
};

const getConfig = async (key) => {
  try {
    const result = await (await db).getFirstAsync(
      `SELECT JsonValue FROM Config WHERE key = '${key}';`,
    );
    if (result?.JsonValue) {
      const parsedValue = JSON.parse(result.JsonValue);
      return parsedValue;
    }
    return null;
  } catch (error) {
    console.error('Error getting config:', error);
    return null;
  }
};




const getTableStructure = async () => {
  try {
    const result = await db.getAllAsync(
      `SELECT sql FROM sqlite_master WHERE type='table' AND name='Config';`
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
    await db.execAsync(`DELETE FROM Config;`);
    console.log('All records from "Config" table deleted successfully.');
  } catch (error) {
    console.error('Error deleting data from table:', error);
  }
};


// const clearConfig = async () => {
//   try {
//     await db.execAsync(`DELETE FROM Config;`);
//     console.log('All config entries cleared.');
//   } catch (error) {
//     console.error('Error clearing config:', error);
//   }
// };

export { createTable, saveConfig, getConfig,getTableStructure,clearTable };
