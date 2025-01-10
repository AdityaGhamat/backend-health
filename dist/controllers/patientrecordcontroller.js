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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatientRecord = exports.updatePatientRecord = exports.getDoctorPatientRecords = exports.getPatientRecords = exports.createPatientRecord = void 0;
const patientrecordschema_1 = require("../models/patientrecordschema");
// Create a new patient record
const createPatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { patientId, doctorId, visitDate, medicalHistory, symptoms, diagnosis, treatment, prescribedMedication, nextVisitDate, } = req.body;
        const newPatientRecord = new patientrecordschema_1.PatientRecordModel({
            patientId,
            doctorId,
            visitDate,
            medicalHistory,
            symptoms,
            diagnosis,
            treatment,
            prescribedMedication,
            nextVisitDate,
        });
        yield newPatientRecord.save();
        res.status(201).json({
            message: "Patient record created successfully",
            patientRecord: newPatientRecord,
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to create patient record",
            details: error.message,
        });
    }
});
exports.createPatientRecord = createPatientRecord;
// Get records by patientId
const getPatientRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.params;
    try {
        const patientRecords = yield patientrecordschema_1.PatientRecordModel.find({ patientId });
        if (!patientRecords || patientRecords.length === 0) {
            res.status(404).json({ error: "No records found for this patient" });
        }
        res.status(200).json({
            message: "Patient records fetched successfully",
            records: patientRecords,
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to fetch patient records",
            details: error.message,
        });
    }
});
exports.getPatientRecords = getPatientRecords;
// Get records by doctorId
const getDoctorPatientRecords = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId } = req.params;
    try {
        const doctorRecords = yield patientrecordschema_1.PatientRecordModel.find({ doctorId });
        if (!doctorRecords || doctorRecords.length === 0) {
            res.status(404).json({ error: "No records found for this doctor" });
        }
        res.status(200).json({
            message: "Doctor's patient records fetched successfully",
            records: doctorRecords,
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to fetch doctor's patient records",
            details: error.message,
        });
    }
});
exports.getDoctorPatientRecords = getDoctorPatientRecords;
// Update a patient record
const updatePatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recordId } = req.params;
    const updateData = req.body;
    try {
        const updatedRecord = yield patientrecordschema_1.PatientRecordModel.findByIdAndUpdate(recordId, updateData, { new: true });
        if (!updatedRecord) {
            res.status(404).json({ error: "Record not found" });
        }
        res.status(200).json({
            message: "Patient record updated successfully",
            record: updatedRecord,
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
// Delete a patient record
const deletePatientRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recordId } = req.params;
    try {
        const deletedRecord = yield patientrecordschema_1.PatientRecordModel.findByIdAndDelete(recordId);
        if (!deletedRecord) {
            res.status(404).json({ error: "Record not found" });
        }
        res.status(200).json({
            message: "Patient record deleted successfully",
            record: deletedRecord,
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
