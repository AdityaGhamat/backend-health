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
exports.createRoom = exports.generateRoomId = void 0;
const generateRoomId = (doctorId, patientId) => {
    const timestamp = Date.now();
    let roomId = "";
    if (doctorId && patientId) {
        roomId = `room-${doctorId}-${patientId}-${timestamp}`;
    }
    else if (doctorId) {
        roomId = `room-${doctorId}-${timestamp}`;
    }
    else if (patientId) {
        roomId = `room-${patientId}-${timestamp}`;
    }
    else {
        throw new Error("Either doctorId or patientId must be provided.");
    }
    return roomId;
};
exports.generateRoomId = generateRoomId;
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { doctorId, patientId } = req.body;
        if (!doctorId && !patientId) {
            res.status(400).json({
                error: "Either doctorId or patientId must be provided.",
            });
        }
        const roomId = (0, exports.generateRoomId)(doctorId, patientId);
        res.status(200).json({
            message: "Room created successfully",
            roomId,
            videoLink: `http://localhost:5173/video-chat/${roomId}`,
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Failed to create room",
            details: error.message,
        });
    }
});
exports.createRoom = createRoom;
