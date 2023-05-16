const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const tutorialsRoutes = require("./routes.js");
const db = require('./db');
require('dotenv').config()

const app = express()
const PORT = process.env.PORT
var corsOptions = {
  origin: process.env.ORIGIN
}

app.use(express.json())
app.use(bodyParser.json());
app.use(cors(corsOptions))
app.use("/tutorials", tutorialsRoutes);

// listen for request from local server
app.get('/hello-world', (req, res) => res.send('Hello World'))
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// connect to mongodb server
db.connect();
  
