const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect to mongoDB!");
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

app.listen(process.env.PORT, () => {
  console.log(`Server Listening at ${process.env.PORT}`);
  connect()
});
