import mongoose from "mongoose";
import { UserInputError } from "apollo-server-express";
import { Patients, HistologyReport, PathologyReport } from "../models";

export default {
  Query: {
    patients: (root, args, context, info) => {
      return Patients.find({});
    },
    patient: async (root, { MRNNumber }, context, info) => {
      const invalid_input = MRNNumber.length === 0;
      if (invalid_input) {
        throw new UserInputError("Invalid MRNNumber provided");
      }

      const patient = await Patients.findOne({
        mRNNumber: MRNNumber,
      });

      return patient;
    },
  },
  Mutation: {
    addPatient: async (root, { CreatePatientInput }, context, info) => {
      const invalid_input = CreatePatientInput === null;
      if (invalid_input) {
        throw new UserInputError("Invalid input");
      }

      const patient_existed = await Patients.findOne({
        mRNNumber: CreatePatientInput.patientDemographics.mRNNumber,
      });
      if (patient_existed) {
        throw new UserInputError("Unable to create existing patient");
      }

      const doc = new Patients({
        mRNNumber: CreatePatientInput.patientDemographics.mRNNumber,
        ...CreatePatientInput,
      });
      const new_patient = await doc.save();
      return {
        id: new_patient.id,
        ...new_patient._doc,
      };
    },
    deletePatient: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid patient id`);
      }
      const patient = Patients.findById(id);
      if (patient) {
        Patients.findByIdAndRemove(id, () => {});
        return "patient deleted.";
      } else {
        throw new UserInputError(`${id} not found!`);
      }
    },
    updatePatient: (root, { UpdatePatientInput }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(UpdatePatientInput.id)) {
        throw new UserInputError(`${args.id} is not a valid patient id`);
      }
      const filter = { _id: UpdatePatientInput.id };
      const update = { ...UpdatePatientInput };

      const doc = Patients.findByIdAndUpdate(filter, update, { new: true });

      return doc;
    },
  },
  patient: {
    // pathologyReport(root, args, context, info) {
    //   return PathologyReport.find({ patientID: root.id });
    // },
    // histologyReport(root, args, context, info) {
    //   return HistologyReport.find({ patientID: root.id });
    // },
  },
};
