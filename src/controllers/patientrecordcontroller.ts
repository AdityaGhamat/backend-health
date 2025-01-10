import { Request, Response } from "express";
import { PatientRecordModel } from "../models/patientrecordschema";

// Create a new patient record
const createPatientRecord = async (req: Request, res: Response) => {
  try {
    const {
      patientId,
      doctorId,
      visitDate,
      medicalHistory,
      symptoms,
      diagnosis,
      treatment,
      prescribedMedication,
      nextVisitDate,
    } = req.body;

    const newPatientRecord = new PatientRecordModel({
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

    await newPatientRecord.save();

    res.status(201).json({
      message: "Patient record created successfully",
      patientRecord: newPatientRecord,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to create patient record",
      details: error.message,
    });
  }
};

// Get records by patientId
const getPatientRecords = async (req: Request, res: Response) => {
  const { patientId } = req.params;

  try {
    const patientRecords = await PatientRecordModel.find({ patientId });

    if (!patientRecords || patientRecords.length === 0) {
      res.status(404).json({ error: "No records found for this patient" });
    }

    res.status(200).json({
      message: "Patient records fetched successfully",
      records: patientRecords,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to fetch patient records",
      details: error.message,
    });
  }
};

// Get records by doctorId
const getDoctorPatientRecords = async (req: Request, res: Response) => {
  const { doctorId } = req.params;

  try {
    const doctorRecords = await PatientRecordModel.find({ doctorId });

    if (!doctorRecords || doctorRecords.length === 0) {
      res.status(404).json({ error: "No records found for this doctor" });
    }

    res.status(200).json({
      message: "Doctor's patient records fetched successfully",
      records: doctorRecords,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to fetch doctor's patient records",
      details: error.message,
    });
  }
};

// Update a patient record
const updatePatientRecord = async (req: Request, res: Response) => {
  const { recordId } = req.params;
  const updateData = req.body;

  try {
    const updatedRecord = await PatientRecordModel.findByIdAndUpdate(
      recordId,
      updateData,
      { new: true }
    );

    if (!updatedRecord) {
      res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({
      message: "Patient record updated successfully",
      record: updatedRecord,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to update patient record",
      details: error.message,
    });
  }
};

// Delete a patient record
const deletePatientRecord = async (req: Request, res: Response) => {
  const { recordId } = req.params;

  try {
    const deletedRecord = await PatientRecordModel.findByIdAndDelete(recordId);

    if (!deletedRecord) {
      res.status(404).json({ error: "Record not found" });
    }

    res.status(200).json({
      message: "Patient record deleted successfully",
      record: deletedRecord,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to delete patient record",
      details: error.message,
    });
  }
};

export {
  createPatientRecord,
  getPatientRecords,
  getDoctorPatientRecords,
  updatePatientRecord,
  deletePatientRecord,
};
