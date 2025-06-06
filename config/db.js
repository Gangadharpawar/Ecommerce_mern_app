import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to Mongodb Database ${conn.connection.host}`);
  } catch (error) {
    console.log(`error in Mongodb ${error}`);
  }
};

export default connectDB;
