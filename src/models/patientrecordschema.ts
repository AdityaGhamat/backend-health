import { Schema, model, Document } from "mongoose";

// Define the schema for Patient's medical history or records
interface PatientRecord {
  patientId: Schema.Types.ObjectId;
  doctorId: Schema.Types.ObjectId;
  visitDate: Date;
  medicalHistory: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  prescribedMedication: string;
  nextVisitDate?: Date; // Optional next visit date
}

const patientRecordSchema = new Schema<PatientRecord>({
  patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
  doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
  visitDate: { type: Date, required: true },
  medicalHistory: { type: String, required: true },
  symptoms: { type: String, required: true },
  diagnosis: { type: String, required: true },
  treatment: { type: String, required: true },
  prescribedMedication: { type: String, required: true },
  nextVisitDate: { type: Date }, // Optional field
});

const PatientRecordModel = model<PatientRecord>(
  "PatientRecord",
  patientRecordSchema
);

export { PatientRecordModel };
