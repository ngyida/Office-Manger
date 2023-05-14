const MongoClient = require("mongodb").MongoClient;

let db;

exports.connect = () => {
    const uri = "mongodb+srv://myserver_cluster:naV9SfDVZp7FT2nu@cluster0.uqbipnr.mongodb.net/?retryWrites=true&w=majority"
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