import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`MongoDB conncted: ${conn.connection.host}`.yellow.inverse);
  } catch (e) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }
};

export default connectDB;
