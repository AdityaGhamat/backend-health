import { Router } from "express";
import {
  getPatientRecord,
  updatePatientRecord,
  deletePatientRecord,
} from "../controllers/patientcontroller"; // Update the path as per your project structure

const router = Router();

// Create Patient Record

// Get Patient Record by ID
router.get("/patients/:patientId", getPatientRecord);

// Update Patient Record by ID
router.put("/patients/:patientId", updatePatientRecord);

// Delete Patient Record by ID
router.delete("/patients/:patientId", deletePatientRecord);

export default router;
