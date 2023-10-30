import * as mongoose from "mongoose";

let isConnected = false;
export const connectToDataBase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URL as string, {
      dbName: "test",
    });
    isConnected = true;
  } catch (error) {}
};
