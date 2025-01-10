"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientcontroller_1 = require("../controllers/patientcontroller"); // Update the path as per your project structure
const router = (0, express_1.Router)();
// Create Patient Record
// Get Patient Record by ID
router.get("/patients/:patientId", patientcontroller_1.getPatientRecord);
// Update Patient Record by ID
router.put("/patients/:patientId", patientcontroller_1.updatePatientRecord);
// Delete Patient Record by ID
router.delete("/patients/:patientId", patientcontroller_1.deletePatientRecord);
exports.default = router;
