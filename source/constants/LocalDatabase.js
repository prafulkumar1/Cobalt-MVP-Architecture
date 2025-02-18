import React, { useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseAsync('Config.db');

const createTable = async () => {
  (await db).execAsync(`
    CREATE TABLE IF NOT EXISTS Config (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      key TEXT UNIQUE, 
      value TEXT
    );
  `);
};

const saveConfig = async (key,value) => {
  console.log(value,"---1");
   (await db).execAsync(`INSERT INTO Config (key, value) VALUES ('${key}', '${value}'); `);
   
};

const clearConfig= async () =>{
  (await db).execAsync(`DELETE FROM Config; `);
}


const getConfig = async (key)=>{
 const req=(await db);
  const getvValue = await req.getFirstAsync(`SELECT value FROM Config WHERE key ='${key}';`);
  // const parsedData= JSON.parse(result);
  console.log("===>>",getvValue)
  return getvValue

}



export { createTable,saveConfig, getConfig,clearConfig};