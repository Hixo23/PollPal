import * as mongoose from "mongoose";

let isConnected = false;
export const connectToDataBase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(
      "mongodb+srv://hixo:G9kmpIAcg2u5bYzs@dashboard.di3tiv5.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "test",
      },
    );
    isConnected = true;
  } catch (error) {}
};
