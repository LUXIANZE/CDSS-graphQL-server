import mongoose from "mongoose";
import { UserInputError } from "apollo-server-express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { validateRegisterInput, validateLoginInput } from "../utils/validator";
import { Clinicians, Patients } from "../models";
import { ENCRYPTION_SALT, SECRET_KEY } from "../config";
import CLINICIANS from "../constants/clinicians";

const generateToken = (clinician) => {
  return jwt.sign(
    {
      id: clinician.id,
      staffId: clinician.staffId,
      username: clinician.name,
    },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
};

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

      const token = generateToken(created_clinician);

      return {
        name: created_clinician.name,
        staffId: created_clinician.staffId,
        id: created_clinician.id,
        createdAt: created_clinician.createdAt,
        role: created_clinician.role,
        patients: [],
        token: token,
      };
    },
    login: async (root, { staffId, password }, context, info) => {
      const valid_input = validateLoginInput(staffId, password);
      if (!valid_input) {
        throw new UserInputError("Errors in login input");
      }

      const clinician = await Clinicians.findOne({ staffId });
      if (!clinician) throw new Exception("User not found");

      const match = await bcrypt.compare(password, clinician.password);
      if (!match) throw new Exception("Invalid Password");

      const token = generateToken(clinician);

      return {
        name: clinician.name,
        staffId: clinician.staffId,
        id: clinician.id,
        createdAt: clinician.createdAt,
        role: clinician.role,
        patients: [],
        token: token,
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
    updateClinician: async (root, { staffId, role }, context, info) => {
      const isValidStaffId = staffId.trim().length > 0;
      const isValidRole =
        role.includes(CLINICIANS.ADMIN) || role.includes(CLINICIANS.BASE);

      if (!isValidStaffId || !isValidRole) {
        return new UserInputError(`${staffId} or ${role} not found!`);
      }

      let doc = await Clinicians.findOneAndUpdate(
        { staffId: staffId },
        { role: role },
        {
          new: true,
        }
      );

      return doc;
    },
  },
  Clinician: {
    patients(root, args, context, info) {
      return Patients.find({ assignedClinician: root.id });
    },
  },
};
