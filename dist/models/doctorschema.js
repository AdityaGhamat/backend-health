"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorModel = void 0;
const userschema_1 = require("./userschema");
const mongoose_1 = require("mongoose");
const doctorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    specialization: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    consultationFee: { type: Number, required: true },
    yearsOfExperience: { type: Number, required: true },
    isActive: { type: Boolean, required: true, default: true },
    roomId: { type: String, default: null },
});
// Discriminator for Doctor
const DoctorModel = userschema_1.UserModel.discriminator("Doctor", doctorSchema);
exports.DoctorModel = DoctorModel;
