const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cookie-parser");

const userRoutes = require("./routes/userRoute");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);

// Error MIddlewares
app.use(errorHandler);
app.use(notFound);

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
