"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRecordModel = void 0;
const mongoose_1 = require("mongoose");
const patientRecordSchema = new mongoose_1.Schema({
    patientId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Doctor", required: true },
    visitDate: { type: Date, required: true },
    medicalHistory: { type: String, required: true },
    symptoms: { type: String, required: true },
    diagnosis: { type: String, required: true },
    treatment: { type: String, required: true },
    prescribedMedication: { type: String, required: true },
    nextVisitDate: { type: Date }, // Optional field
});
const PatientRecordModel = (0, mongoose_1.model)("PatientRecord", patientRecordSchema);
exports.PatientRecordModel = PatientRecordModel;
