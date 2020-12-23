import mongoose from "mongoose";

const patientsSchema = new mongoose.Schema(
  {
    ic: String,
    mRNNumber: String,
    name: String,
    patientDemographics: {
      mRNNumber: String,
      dateOfBirth: String,
      gender: String,
      race: String,
      bMI: String,
    },
    pastMedicalHistory: {
      hypertension: Boolean,
      ischaemicHeartDisease: Boolean,
      heartFailure: Boolean,
      cvaOrStroke: Boolean,
      copd: Boolean,
      iddm: Boolean,
      niddm: Boolean,
    },
    colonoscopyHistory: {
      priorColonoscopy: Boolean,
      noOfPriorColonoscopy: Number,
      isNormal: String,
      abnormalities: String,
    },
    endoscopyReport: {
      date: String,
      qualityOfPreparation: String,
      locationOfPolyps: String,
      noOfPolyps: String,
      sizeOfLargestPolyp: String,
      polypectomyComplete: Boolean,
      piecemalResection: Boolean,
    },
    histologyReport: {
      polypType: String,
      sizeOfLargestPolyp: Number,
      villousArchitecture: Boolean,
      highGradeDysplasia: Boolean,
    },
    createdAt: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Patients", patientsSchema);
