import { BaseUser } from "./userschema";
import { UserModel } from "./userschema";
import { Schema } from "mongoose";
interface Patient extends BaseUser {
  name: string;
  location: string;
  age: number;
  bloodGroup: string;
  contact: string;
  roomId?: string;
}

const patientSchema = new Schema<Patient>({
  name: { type: String, required: true },
  location: { type: String, required: true },
  age: { type: Number, required: true },
  bloodGroup: { type: String, required: true },
  contact: { type: String, required: true },
  roomId: { type: String, default: null },
});

// Discriminator for Patient
const PatientModel = UserModel.discriminator<Patient>("Patient", patientSchema);

export { PatientModel };
