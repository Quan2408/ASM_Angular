import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/AngularASM");
    console.log("connect db success");
  } catch (error) {
    console.log(error);
  }
};
