require('dotenv').config()
// Import essential libraries 
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const mongoose = require("mongoose");
const routes = require('./routes/index')

// Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/e_commerce";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Setup essential routes 
// router.get('/', function (req, res) {
//   res.status(200).send('holiiiiiiiiiiii')
// });

//add the router 
app.use(express.json());
app.use(require('./routes/index'));
app.listen(process.env.PORT || 3000);
console.log(`Running at Port ${process.env.PORT}`); 