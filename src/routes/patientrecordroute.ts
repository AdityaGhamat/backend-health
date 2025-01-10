import express from "express";
import {
  createPatientRecord,
  getPatientRecords,
  getDoctorPatientRecords,
  updatePatientRecord,
  deletePatientRecord,
} from "../controllers/patientrecordcontroller";

const router = express.Router();

// Create a new patient record
router.post("/records", createPatientRecord);

// Get all patient records for a specific patientId
router.get("/records/:patientId", getPatientRecords);

// Get all records of a specific doctorId (doctor's consultations with patients)
router.get("/records/doctor/:doctorId", getDoctorPatientRecords);

// Update a specific patient record by recordId
router.put("/records/:recordId", updatePatientRecord);

// Delete a specific patient record by recordId
router.delete("/records/:recordId", deletePatientRecord);

export default router;
