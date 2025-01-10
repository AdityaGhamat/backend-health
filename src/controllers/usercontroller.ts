import { Request, Response } from "express";
import { DoctorModel } from "../models/doctorschema";
import { PatientModel } from "../models/patientschema";
import { UserModel } from "../models/userschema";
import jwt from "jsonwebtoken";

// Signup Controller
export const signup = async (req: Request, res: Response) => {
  const { email, password, role, name, contact, ...otherDetails } = req.body;

  try {
    // Check if the email is already in use
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: "Email is already registered" });
      return;
    }

    // Create a new user (Doctor or Patient)
    let newUser;
    if (role === "doctor") {
      newUser = new DoctorModel({
        email,
        password,
        role,
        name,
        contact,
        ...otherDetails,
      });
    } else if (role === "patient") {
      newUser = new PatientModel({
        email,
        password,
        role,
        name,
        contact,
        ...otherDetails,
      });
    } else {
      res.status(400).json({ error: "Invalid role provided" });
      return;
    }

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token for the new user
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" }
    );

    // Send response with success message, JWT token, and user details
    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        email: newUser.email,
        role: newUser.role,
        _id: newUser._id,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to signup",
      details: error.message,
    });
  }
};

// Login Controller
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "User not found" });
      return;
    }

    // Compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ error: "Invalid password" });
      return;
    }

    // Generate a JWT token for the user
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1h" }
    );

    // Send response with JWT token and user details
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        email: user.email,
        role: user.role,
        _id: user._id,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to login",
      details: error.message,
    });
  }
};

// Get Doctor Record by ID
export const getDoctorRecord = async (req: Request, res: Response) => {
  const doctorId = req.params.doctorId;

  try {
    const doctor = await DoctorModel.findById(doctorId);
    if (!doctor) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }

    res.status(200).json(doctor);
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to fetch doctor",
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
      error: "Failed to fetch patient",
      details: error.message,
    });
  }
};
