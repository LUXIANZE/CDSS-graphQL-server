import mongoose from "mongoose";

const decisionSupportSchema = new mongoose.Schema(
  {
    staffId: String,
    mRNNumber: String,
    decision: String,
    isOverride: Boolean,
    reason: String,
    createdAt: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DecisionSupport", decisionSupportSchema);
