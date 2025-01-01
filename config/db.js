import mongoose from "mongoose";
const uri = 'mongodb://127.0.0.1:27017/fooddatabase';





// 2) set connection

export const connectdb = async () => {
    try {
      await mongoose.connect(uri)
      console.log("Database connected successfully.");
    } catch (err) {
      console.error("Database connection error:", err);
    }
  };