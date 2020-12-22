import mongoose from "mongoose";
import { UserInputError } from "apollo-server-express";
import bcrypt from "bcrypt";

import { validateRegisterInput } from "../utils/validator";
import { Clinicians, Patients } from "../models";
import { ENCRYPTION_SALT } from "../config";
import CLINICIANS from "../constants/clinicians";

export default {
  Query: {
    clinicians: (root, args, context, info) => {
      return Clinicians.find({});
    },
    clinician: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid clinician id`);
      }

      return Clinicians.findById(id);
    },
  },
  Mutation: {
    addClinician: async (
      root,
      { registerInput: { name, staffId, password, confirmPassword } },
      context,
      info
    ) => {
      // Validate input
      const valid_input = validateRegisterInput(
        name,
        staffId,
        password,
        confirmPassword
      );

      // Proceed if input length are valid
      if (!valid_input) {
        throw new UserInputError("Errors in registration input");
      }

      // Check if clinician already registered
      const clinician = await Clinicians.findOne({ staffId: staffId });
      if (clinician) {
        throw new UserInputError("Clinician already have an account");
      }

      // Encrypt and Salt Password
      password = await bcrypt.hash(password, ENCRYPTION_SALT);

      // register clinicians
      let created_clinician = await Clinicians.create({
        name,
        staffId,
        password,
        role: CLINICIANS.BASE,
      });
      return {
        name: created_clinician.name,
        staffId: created_clinician.staffId,
        id: created_clinician.id,
        createdAt: created_clinician.createdAt,
        role: created_clinician.role,
        patients: [],
        token: "123",
      };
    },
    deleteClinician: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid clinician id`);
      }
      const clinician = Clinicians.findById(id);
      if (clinician) {
        Clinicians.findByIdAndRemove(id, (err) => {
          console.log(err);
        });
        return "clinician deleted.";
      } else {
        throw new UserInputError(`${id} not found!`);
      }
    },
  },
  Clinician: {
    patients(root, args, context, info) {
      return Patients.find({ assignedClinician: root.id });
    },
  },
};
