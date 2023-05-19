const MongoClient = require("mongodb").MongoClient;
require('dotenv').config()

let db = null;
let collection = null;

exports.connect = async () => {
    try {
        const uri = process.env.URI;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = await client.db('db0');
        collection = await db.collection("tutorials");
        console.log('Connected to database!');
    } catch (err) {
        console.error('Failed to connect to database:', err);
    }   
}

exports.getDb = () => db;

exports.getCollection = () => collection;