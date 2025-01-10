"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const userroute_1 = __importDefault(require("./routes/userroute"));
const patientrecordroute_1 = __importDefault(require("./routes/patientrecordroute"));
const patientrecordroute_2 = __importDefault(require("./routes/patientrecordroute"));
const room_1 = __importDefault(require("./routes/room"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use("/user", userroute_1.default);
app.use("/patient", patientrecordroute_1.default);
app.use("/patientRecord", patientrecordroute_2.default);
app.use("/room", room_1.default);
(0, database_1.default)();
app.listen(3000 || process.env.PORT, () => {
    console.log("server started on port 3000");
});
