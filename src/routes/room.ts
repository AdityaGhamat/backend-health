import {
  updateDoctorAndPatientRoomId,
  doctorJoinRoom,
} from "../controllers/roomcontroller";
import { Router } from "express";

const router = Router();

router.put("/update-room-id", updateDoctorAndPatientRoomId);
router.get("/join-room", doctorJoinRoom);

export default router;
