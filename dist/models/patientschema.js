"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientModel = void 0;
const userschema_1 = require("./userschema");
const mongoose_1 = require("mongoose");
const patientSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    age: { type: Number, required: true },
    bloodGroup: { type: String, required: true },
    contact: { type: String, required: true },
    roomId: { type: String, default: null },
});
// Discriminator for Patient
const PatientModel = userschema_1.UserModel.discriminator("Patient", patientSchema);
exports.PatientModel = PatientModel;
