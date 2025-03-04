require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.DB_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); // Exit process if unable to connect
  }
};

connectToDatabase();

require("./app");
