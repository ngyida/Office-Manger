const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const tutorialsRoutes = require("./routes.js");
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

db.connect();
  
