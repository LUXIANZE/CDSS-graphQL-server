import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    patients: [patient!]!
    patient(MRNNumber: String!): patient
  }

  extend type Mutation {
    addPatient(CreatePatientInput: createPatientInput!): patient!
    deletePatient(id: ID!): String!
    updatePatient(UpdatePatientInput: updatePatientInput!): patient!
  }

  input createPatientInput {
    ic: String!
    name: String!
    patientDemographics: patientDemographicsInput
    pastMedicalHistory: pastMedicalHistoryInput
    socialAndFamilyHistory: socialAndFamilyHistoryInput
    colonoscopyHistory: colonoscopyHistoryInput
    endoscopyReport: endoscopyReportInput
    histologyReport: histologyReporttInput
  }

  input updatePatientInput {
    id: ID!
    ic: String!
    name: String!
    patientDemographics: patientDemographicsInput
    pastMedicalHistory: pastMedicalHistoryInput
    socialAndFamilyHistory: socialAndFamilyHistoryInput
    colonoscopyHistory: colonoscopyHistoryInput
    endoscopyReport: endoscopyReportInput
    histologyReport: histologyReporttInput
  }

  input patientDemographicsInput {
    mRNNumber: String
    dateOfBirth: String
    gender: String
    race: String
    bMI: String
  }

  input pastMedicalHistoryInput {
    hypertension: Boolean
    ischaemicHeartDisease: Boolean
    heartFailure: Boolean
    cvaOrStroke: Boolean
    copd: Boolean
    iddm: Boolean
    niddm: Boolean
  }

  input socialAndFamilyHistoryInput {
    isSmoker: String
    alcoholConsumption: String
    familyCRCHistory: String
  }

  input colonoscopyHistoryInput {
    priorColonoscopy: Boolean
    noOfPriorColonoscopy: Int
    isNormal: String
    abnormalities: String
  }

  input endoscopyReportInput {
    date: String
    qualityOfPreparation: String
    locationOfPolyps: String
    noOfPolyps: String
    sizeOfLargestPolyp: String
    polypectomyComplete: Boolean
    piecemalResection: Boolean
  }

  input histologyReporttInput {
    polypType: String
    sizeOfLargestPolyp: Float
    villousArchitecture: Boolean
    highGradeDysplasia: Boolean
  }

  type patient {
    id: ID!
    ic: String!
    mRNNumber: String
    name: String!
    patientDemographics: patientDemographics
    pastMedicalHistory: pastMedicalHistory
    socialAndFamilyHistory: socialAndFamilyHistory
    colonoscopyHistory: colonoscopyHistory
    endoscopyReport: endoscopyReport
    histologyReport: histologyReportt
    createdAt: String!
  }

  type patientDemographics {
    mRNNumber: String
    dateOfBirth: String
    gender: String
    race: String
    bMI: String
  }

  type pastMedicalHistory {
    hypertension: Boolean
    ischaemicHeartDisease: Boolean
    heartFailure: Boolean
    cvaOrStroke: Boolean
    copd: Boolean
    iddm: Boolean
    niddm: Boolean
  }

  type socialAndFamilyHistory {
    isSmoker: String
    alcoholConsumption: String
    familyCRCHistory: String
  }

  type colonoscopyHistory {
    priorColonoscopy: Boolean
    noOfPriorColonoscopy: Int
    isNormal: String
    abnormalities: String
  }

  type endoscopyReport {
    date: String
    qualityOfPreparation: String
    locationOfPolyps: String
    noOfPolyps: String
    sizeOfLargestPolyp: String
    polypectomyComplete: Boolean
    piecemalResection: Boolean
  }

  type histologyReportt {
    polypType: String
    sizeOfLargestPolyp: Float
    villousArchitecture: Boolean
    highGradeDysplasia: Boolean
  }
`;
