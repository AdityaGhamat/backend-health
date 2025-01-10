import { BaseUser } from "./userschema";
import { UserModel } from "./userschema";
import { Schema } from "mongoose";
interface Doctor extends BaseUser {
  name: string;
  specialization: string;
  phoneNumber: string;
  consultationFee: number;
  yearsOfExperience: number;
  isActive: boolean;
  roomId?: string;
}

const doctorSchema = new Schema<Doctor>({
  name: { type: String },
  specialization: { type: String },
  phoneNumber: { type: String },
  consultationFee: { type: Number },
  yearsOfExperience: { type: Number },
  isActive: { type: Boolean, default: true },
  roomId: { type: String, default: null },
});

// Discriminator for Doctor
const DoctorModel = UserModel.discriminator<Doctor>("Doctor", doctorSchema);

export { DoctorModel };
