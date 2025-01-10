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
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  consultationFee: { type: Number, required: true },
  yearsOfExperience: { type: Number, required: true },
  isActive: { type: Boolean, required: true, default: true },
  roomId: { type: String, default: null },
});

// Discriminator for Doctor
const DoctorModel = UserModel.discriminator<Doctor>("Doctor", doctorSchema);

export { DoctorModel };
