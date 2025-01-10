import { Schema, model, Document } from "mongoose";

interface Medication {
  name: string;
  dosage: string;
  duration: string;
}

interface PatientRecord extends Document {
  patientId: Schema.Types.ObjectId;
  doctorId: Schema.Types.ObjectId;
  visitDate: Date;
  medicalHistory: string;
  symptoms: string;
  diagnosis: string;
  treatment: string;
  prescribedMedication: Medication[]; // Array of medication objects
  nextVisitDate: Date;
}

const patientRecordSchema = new Schema<PatientRecord>({
  patientId: { type: Schema.Types.ObjectId, ref: "Patient" },
  doctorId: { type: Schema.Types.ObjectId, ref: "Doctor" },
  visitDate: { type: Date },
  medicalHistory: { type: String },
  symptoms: { type: String },
  diagnosis: { type: String },
  treatment: { type: String },
  prescribedMedication: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      duration: { type: String, required: true },
    },
  ], // Array of medication objects
  nextVisitDate: { type: Date }, // Optional field
});

const PatientRecordModel = model<PatientRecord>(
  "PatientRecord",
  patientRecordSchema
);

export { PatientRecordModel };
