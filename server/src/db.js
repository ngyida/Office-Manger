const MongoClient = require("mongodb").MongoClient;
require('dotenv').config()

let db = null;

exports.connect = () => {
    const uri = process.env.URI
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect()
        .then(() => {
        db = client.db('db0');
        console.log('Connected to database!');
        })
        .catch(err => {
        console.error('Failed to connect to database:', err);
        });
}

exports.get = () => db;