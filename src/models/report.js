import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    mRNNumber: String,
    report: String,
    date: String,
  },
  { collection: "reports" }
);

export default mongoose.model("Collection", reportSchema);
