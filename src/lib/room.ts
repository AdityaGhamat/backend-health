import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const generateRoomId = (
  doctorId: string | null,
  patientId: string | null
): string => {
  const timestamp = Date.now();
  let roomId = "";

  if (doctorId && patientId) {
    roomId = `room-${doctorId}-${patientId}-${timestamp}`;
  } else if (doctorId) {
    roomId = `room-${doctorId}-${timestamp}`;
  } else if (patientId) {
    roomId = `room-${patientId}-${timestamp}`;
  } else {
    throw new Error("Either doctorId or patientId must be provided.");
  }

  return roomId;
};

const createRoom = async (req: Request, res: Response) => {
  try {
    const { doctorId, patientId } = req.body;
    if (!doctorId && !patientId) {
      res.status(400).json({
        error: "Either doctorId or patientId must be provided.",
      });
    }
    const roomId = generateRoomId(doctorId, patientId);
    res.status(200).json({
      message: "Room created successfully",
      roomId,
      videoLink: `http://localhost:5173/video-chat/${roomId}`,
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Failed to create room",
      details: error.message,
    });
  }
};

export { createRoom };
