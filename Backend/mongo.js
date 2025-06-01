// mongo.js
const { MongoClient } = require('mongodb');

// Vendos URL-në e MongoDB nga Mongo Atlas (ose nga .env)
const uri = process.env.MONGODB_URI || "mongodb+srv://webmuzik:ubt123@cluster0.p0uyd.mongodb.net/databazalab2?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  if (db) return db; // nëse lidhja ekziston, e kthen

  try {
    await client.connect();
    db = client.db('databazalab2'); // vendos emrin e databazës që krijove në Atlas
    console.log("MongoDB u lidh me sukses!");
    return db;
  } catch (error) {
    console.error("Gabim gjatë lidhjes me MongoDB:", error);
    throw error;
  }
}

module.exports = { connectToDatabase };
