"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientrecordcontroller_1 = require("../controllers/patientrecordcontroller");
const router = express_1.default.Router();
// Create a new patient record
router.post("/records", patientrecordcontroller_1.createPatientRecord);
// Get all patient records for a specific patientId
router.get("/records/:patientId", patientrecordcontroller_1.getPatientRecords);
// Get all records of a specific doctorId (doctor's consultations with patients)
router.get("/records/doctor/:doctorId", patientrecordcontroller_1.getDoctorPatientRecords);
// Update a specific patient record by recordId
router.put("/records/:recordId", patientrecordcontroller_1.updatePatientRecord);
// Delete a specific patient record by recordId
router.delete("/records/:recordId", patientrecordcontroller_1.deletePatientRecord);
exports.default = router;
