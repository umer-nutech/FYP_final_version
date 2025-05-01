import mongoose from "mongoose";
import colors from "colors"; // Import the colors library

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`.bgMagenta.white); // Correct usage of colors
  } catch (error) {
    console.log(`Error in MongoDB ${error}`.red.white); // Correct usage of colors
  }
};

export default connectDB;
