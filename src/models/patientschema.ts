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
  name: { type: String },
  location: { type: String },
  age: { type: Number },
  bloodGroup: { type: String },
  contact: { type: String },
  roomId: { type: String, default: null },
});

// Discriminator for Patient
const PatientModel = UserModel.discriminator<Patient>("Patient", patientSchema);

export { PatientModel };
