import { Request, Response } from "express";
import { DoctorModel } from "../models/doctorschema";
import { PatientModel } from "../models/patientschema";
import { generateRoomId } from "../lib/room";

const updateDoctorAndPatientRoomId = async (req: Request, res: Response) => {
  const { doctorId, patientId } = req.body;

  if (!doctorId && !patientId) {
    res.status(400).json({
      error: "Either doctorId or patientId must be provided.",
    });
  }

  const session = await DoctorModel.startSession();
  session.startTransaction();

  try {
    const roomId = generateRoomId(doctorId, patientId);

    const doctorUpdate = await DoctorModel.findOneAndUpdate(
      { _id: doctorId },
      { roomId: roomId },
      { new: true, session }
    );

    if (!doctorUpdate) {
      throw new Error("Doctor not found");
    }

    const patientUpdate = await PatientModel.findOneAndUpdate(
      { _id: patientId },
      { roomId: roomId },
      { new: true, session }
    );

    if (!patientUpdate) {
      throw new Error("Patient not found");
    }

    await session.commitTransaction();
    session.endSession();

    const videoLink = `http://localhost:5173/video-chat/${roomId}`;

    res.status(200).json({
      message: "Doctor and Patient room IDs updated successfully",
      roomId,
      videoLink,
      doctor: doctorUpdate,
      patient: patientUpdate,
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      error: "Failed to update Doctor and Patient room IDs",
      details: error.message,
    });
  }
};
export const doctorJoinRoom = async (req: Request, res: Response) => {
  const { doctorId } = req.params;

  try {
    const doctor = await DoctorModel.findById(doctorId);

    if (!doctor) {
      res.status(404).json({
        error: "Doctor not found",
      });
    }

    const roomId = doctor!.roomId;

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
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to fetch Doctor's room",
      details: error.message,
    });
  }
};

export { updateDoctorAndPatientRoomId };
