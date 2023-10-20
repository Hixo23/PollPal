import * as mongoose from "mongoose";

let isConnected = false;
export const connectToDataBase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect("mongodb://localhost:27017", {
      dbName: "test",
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
