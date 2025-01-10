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
exports.updateDoctorAndPatientRoomId = exports.doctorJoinRoom = void 0;
const doctorschema_1 = require("../models/doctorschema");
const patientschema_1 = require("../models/patientschema");
const room_1 = require("../lib/room");
const updateDoctorAndPatientRoomId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId, patientId } = req.body;
    if (!doctorId && !patientId) {
        res.status(400).json({
            error: "Either doctorId or patientId must be provided.",
        });
    }
    const session = yield doctorschema_1.DoctorModel.startSession();
    session.startTransaction();
    try {
        const roomId = (0, room_1.generateRoomId)(doctorId, patientId);
        const doctorUpdate = yield doctorschema_1.DoctorModel.findOneAndUpdate({ _id: doctorId }, { roomId: roomId }, { new: true, session });
        if (!doctorUpdate) {
            throw new Error("Doctor not found");
        }
        const patientUpdate = yield patientschema_1.PatientModel.findOneAndUpdate({ _id: patientId }, { roomId: roomId }, { new: true, session });
        if (!patientUpdate) {
            throw new Error("Patient not found");
        }
        yield session.commitTransaction();
        session.endSession();
        const videoLink = `http://localhost:5173/video-chat/${roomId}`;
        res.status(200).json({
            message: "Doctor and Patient room IDs updated successfully",
            roomId,
            videoLink,
            doctor: doctorUpdate,
            patient: patientUpdate,
        });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        res.status(500).json({
            error: "Failed to update Doctor and Patient room IDs",
            details: error.message,
        });
    }
});
exports.updateDoctorAndPatientRoomId = updateDoctorAndPatientRoomId;
const doctorJoinRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { doctorId } = req.params;
    try {
        const doctor = yield doctorschema_1.DoctorModel.findById(doctorId);
        if (!doctor) {
            res.status(404).json({
                error: "Doctor not found",
            });
        }
        const roomId = doctor.roomId;
        if (!roomId) {
            res.status(400).json({
                error: "Doctor does not have a room ID assigned",
            });
        }
        const videoLink = `http://localhost:5173/video-chat/${roomId}`;
        res.status(200).json({
            message: "Doctor can join the room",
            roomId,
            videoLink,
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to fetch Doctor's room",
            details: error.message,
        });
    }
});
exports.doctorJoinRoom = doctorJoinRoom;
