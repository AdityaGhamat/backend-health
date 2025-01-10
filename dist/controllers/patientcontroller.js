"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatientRecord = exports.updatePatientRecord = exports.getPatientRecord = exports.createPatient = void 0;
const patientschema_1 = require("../models/patientschema"); // Assuming the PatientModel is in the 'models' folder
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Create Patient Controller
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { email, password, name, contact, location, bloodGroup, age, subsidyPercentage, isRuralArea } = _a, otherDetails = __rest(_a, ["email", "password", "name", "contact", "location", "bloodGroup", "age", "subsidyPercentage", "isRuralArea"]);
    try {
        // Check if the email is already in use
        const existingPatient = yield patientschema_1.PatientModel.findOne({ email });
        if (existingPatient) {
            res.status(400).json({ error: "Email is already registered" });
            return;
        }
        // Create a new patient
        const newPatient = new patientschema_1.PatientModel(Object.assign({ email,
            password, role: "patient", name,
            contact,
            location,
            bloodGroup,
            age,
            subsidyPercentage,
            isRuralArea, isRegistered: false }, otherDetails));
        // Save the new patient to the database
        yield newPatient.save();
        // Generate a JWT token for the new patient
        const token = jsonwebtoken_1.default.sign({ userId: newPatient._id, role: "patient" }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        // Send response with success message, JWT token, and user details
        res.status(201).json({
            message: "Patient created successfully",
            token,
            patient: {
                email: newPatient.email,
                role: newPatient.role,
                _id: newPatient._id,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to create patient",
            details: error.message,
        });
    }
});
exports.createPatient = createPatient;
// Get Patient Record by ID
const getPatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.params.patientId;
    try {
        const patient = yield patientschema_1.PatientModel.findById(patientId);
        if (!patient) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }
        res.status(200).json(patient);
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to fetch patient record",
            details: error.message,
        });
    }
});
exports.getPatientRecord = getPatientRecord;
// Update Patient Record by ID
const updatePatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.params.patientId;
    const updatedDetails = req.body;
    try {
        const patient = yield patientschema_1.PatientModel.findById(patientId);
        if (!patient) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }
        // Update the patient's details
        Object.assign(patient, updatedDetails);
        yield patient.save();
        res.status(200).json({
            message: "Patient record updated successfully",
            patient,
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to update patient record",
            details: error.message,
        });
    }
});
exports.updatePatientRecord = updatePatientRecord;
// Delete Patient Record by ID
const deletePatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patientId = req.params.patientId;
    try {
        const patient = yield patientschema_1.PatientModel.findById(patientId);
        if (!patient) {
            res.status(404).json({ error: "Patient not found" });
            return;
        }
        // Use deleteOne instead of remove
        yield patient.deleteOne();
        res.status(200).json({
            message: "Patient record deleted successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to delete patient record",
            details: error.message,
        });
    }
});
exports.deletePatientRecord = deletePatientRecord;
