/** @format */

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// 檢查 MongoDB URI
if (!MONGODB_URI) {
  throw new Error('Define the MONGODB_URI environmental variable');
}

// 檢查 MongoDB DB
if (!MONGODB_DB) {
  throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  // 檢查快取
  if (cachedClient && cachedDb) {
    // 從 cache 讀取
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // 設定連線
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // 連線
  let client = new MongoClient(MONGODB_URI, opts);
  await client.connect();
  let db = client.db(MONGODB_DB);

  //儲存快取
  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}
