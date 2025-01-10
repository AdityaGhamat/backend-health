import express from "express";
import connectDatabase from "./config/database";
import userRoute from "./routes/userroute";
import patientRoute from "./routes/patientrecordroute";
import patientRecord from "./routes/patientrecordroute";
import roomroute from "./routes/room";
import dotenv from "dotenv";
import { createRoom } from "./lib/room";
dotenv.config();
const app = express();

app.use("/user", userRoute);
app.use("/patient", patientRoute);
app.use("/patientRecord", patientRecord);
app.use("/room", roomroute);
connectDatabase();
app.listen(3000 || process.env.PORT, () => {
  console.log("server started on port 3000");
});
