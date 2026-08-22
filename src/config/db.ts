import mongoose from "mongoose";
import crypto from 'crypto';

if (!globalThis.crypto) {
  // @ts-ignore
  globalThis.crypto = crypto;
}
export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/sha2ty");
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;