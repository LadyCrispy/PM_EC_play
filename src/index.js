const express = require('express');
const app = express();
require('dotenv').config()
const mongoose = require("mongoose");

// Set up default mongoose connection
const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.json());

// Import all routes
app.use(require('./routes/index'));
app.listen(process.env.PORT || 3000);
console.log(`Running at Port ${process.env.PORT}`); 