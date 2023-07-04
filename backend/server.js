const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect to mongoDB!");
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

app.listen(PORT, () => {
  console.log(`Server Listening at ${PORT}`);
  connect();
});
