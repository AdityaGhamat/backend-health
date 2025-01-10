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
exports.getPatientRecord = exports.getDoctorRecord = exports.login = exports.signup = void 0;
const doctorschema_1 = require("../models/doctorschema");
const patientschema_1 = require("../models/patientschema");
const userschema_1 = require("../models/userschema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Signup Controller
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { email, password, role, name, contact } = _a, otherDetails = __rest(_a, ["email", "password", "role", "name", "contact"]);
    try {
        // Check if the email is already in use
        const existingUser = yield userschema_1.UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: "Email is already registered" });
            return;
        }
        // Create a new user (Doctor or Patient)
        let newUser;
        if (role === "doctor") {
            newUser = new doctorschema_1.DoctorModel(Object.assign({ email,
                password,
                role,
                name,
                contact }, otherDetails));
        }
        else if (role === "patient") {
            newUser = new patientschema_1.PatientModel(Object.assign({ email,
                password,
                role,
                name,
                contact }, otherDetails));
        }
        else {
            res.status(400).json({ error: "Invalid role provided" });
            return;
        }
        // Save the new user to the database
        yield newUser.save();
        // Generate a JWT token for the new user
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id, role: newUser.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
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
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to signup",
            details: error.message,
        });
    }
});
exports.signup = signup;
// Login Controller
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Find the user by email
        const user = yield userschema_1.UserModel.findOne({ email });
        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }
        // Compare the password
        const isMatch = yield user.comparePassword(password);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid password" });
            return;
        }
        // Generate a JWT token for the user
        const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
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
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to login",
            details: error.message,
        });
    }
});
exports.login = login;
// Get Doctor Record by ID
const getDoctorRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorId = req.params.doctorId;
    try {
        const doctor = yield doctorschema_1.DoctorModel.findById(doctorId);
        if (!doctor) {
            res.status(404).json({ error: "Doctor not found" });
            return;
        }
        res.status(200).json(doctor);
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to fetch doctor",
            details: error.message,
        });
    }
});
exports.getDoctorRecord = getDoctorRecord;
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
            error: "Failed to fetch patient",
            details: error.message,
        });
    }
});
exports.getPatientRecord = getPatientRecord;
