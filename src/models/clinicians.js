import mongoose from "mongoose";

const cliniciansSchema = new mongoose.Schema(
  {
    name: String,
    staffId: String,
    password: String,
    role: String,
    createdAt: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Clinicians", cliniciansSchema);
