import express from "express";
import connectDatabase from "./config/database";
import userRoute from "./routes/userroute";
import patientRoute from "./routes/patientroute";
import patientRecord from "./routes/patientrecordroute";
import roomroute from "./routes/room";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/patient", patientRoute);
app.use("/patientRecord", patientRecord);
app.use("/room", roomroute);
const port = process.env.PORT || 3000;
connectDatabase();
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
