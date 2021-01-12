import mongoose from "mongoose";

const decisionSupportSchema = new mongoose.Schema(
  {
    staffId: String,
    mRNNumber: String,
    decision: String,
    isOverride: Boolean,
    overridePeriod: String,
    reason: String,
    createdAt: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DecisionSupport", decisionSupportSchema);
