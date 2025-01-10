import mongoose from "mongoose";
import serverconfig from "./serverconfig";
async function connectDatabase() {
  try {
    if (!serverconfig.DATABASE_URL) {
      throw new Error("Database url is not provided");
    }
    mongoose
      .connect(serverconfig.DATABASE_URL)
      .then(() => console.log("databse is connected"))
      .catch((e) => {
        throw new Error("Failed to connect to database");
      });
  } catch (error: any) {
    throw new Error(error);
  }
}
export default connectDatabase;
