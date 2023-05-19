const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const tutorialsRoutes = require("./routes.js");
const { initCollection } = require('./controller.js');
const db = require('./db');
require('dotenv').config()

const app = express()
const PORT = process.env.PORT
const corsOptions = {
  origin: process.env.ORIGIN
}

app.use(bodyParser.json());
app.use(cors(corsOptions))
app.use("/tutorials", tutorialsRoutes);

const start = async () => {
  await db.connect();
  await initCollection(db.getCollection());
  await app.listen(PORT, () => console.log(`Server running on port ${PORT}`))  
}

start();
