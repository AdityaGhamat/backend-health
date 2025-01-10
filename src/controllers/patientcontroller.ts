import { Request, Response } from "express";
import { PatientModel } from "../models/patientschema"; // Assuming the PatientModel is in the 'models' folder
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const patientSignup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if the patient already exists by email
  const existingPatient = await PatientModel.findOne({ email });
  if (existingPatient) {
    res.status(400).json({ error: "Patient already exists with this email!" });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new patient document
  const newPatient = new PatientModel({
    email,
    password: hashedPassword,
  });

  // Save the new patient to the database
  await newPatient.save();

  // Return a success message with the new patient's information (excluding password)
  const { password: _, ...patientData } = newPatient.toObject();
  res.status(201).json({
    message: "Patient signup successful!",
    patient: patientData,
  });
};
// Create Patient Controller
export const createPatient = async (req: Request, res: Response) => {
  const {
    email,
    password,
    name,
    contact,
    location,
    bloodGroup,
    age,
    subsidyPercentage,
    isRuralArea,
    ...otherDetails
  } = req.body;

  try {
    // Check if the email is already in use
    const existingPatient = await PatientModel.findOne({ email });
    if (existingPatient) {
      res.status(400).json({ error: "Email is already registered" });
      return;
    }

    // Create a new patient
    const newPatient = new PatientModel({
      email,
      password,
      role: "patient",
      name,
      contact,
      location,
      bloodGroup,
      age,
      subsidyPercentage,
      isRuralArea,
      isRegistered: false, // Default value
      ...otherDetails,
    });

    // Save the new patient to the database
    await newPatient.save();

    // Generate a JWT token for the new patient
    const token = jwt.sign(
      { userId: newPatient._id, role: "patient" },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" }
    );

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
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to create patient",
      details: error.message,
    });
  }
};

// Get Patient Record by ID
export const getPatientRecord = async (req: Request, res: Response) => {
  const patientId = req.params.patientId;

  try {
    const patient = await PatientModel.findById(patientId);
    if (!patient) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }

    res.status(200).json(patient);
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to fetch patient record",
      details: error.message,
    });
  }
};

// Update Patient Record by ID
export const updatePatientRecord = async (req: Request, res: Response) => {
  const patientId = req.params.patientId;
  const updatedDetails = req.body;

  try {
    const patient = await PatientModel.findById(patientId);
    if (!patient) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }

    // Update the patient's details
    Object.assign(patient, updatedDetails);

    await patient.save();
    res.status(200).json({
      message: "Patient record updated successfully",
      patient,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to update patient record",
      details: error.message,
    });
  }
};

// Delete Patient Record by ID
export const deletePatientRecord = async (req: Request, res: Response) => {
  const patientId = req.params.patientId;

  try {
    const patient = await PatientModel.findById(patientId);
    if (!patient) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }

    // Use deleteOne instead of remove
    await patient.deleteOne();
    res.status(200).json({
      message: "Patient record deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to delete patient record",
      details: error.message,
    });
  }
};
