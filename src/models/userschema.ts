import { Schema, model, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface BaseUser {
  email: string;
  password: string;
  role: "doctor" | "patient";
}

interface UserDocument extends BaseUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["doctor", "patient"] },
  },
  { discriminatorKey: "role", timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Add method for password comparison
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Base User Model
const UserModel: Model<UserDocument> = model<UserDocument>("User", userSchema);

export { UserModel };
