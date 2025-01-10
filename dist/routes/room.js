"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roomcontroller_1 = require("../controllers/roomcontroller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.put("/update-room-id", roomcontroller_1.updateDoctorAndPatientRoomId);
router.get("/join-room", roomcontroller_1.doctorJoinRoom);
exports.default = router;
