import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { Patients, HistologyReport, PathologyReport } from '../models'

export default {
  Query: {
    patients: (root, args, context, info) => {
      return Patients.find({})
    },
    patient: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid patient id`)
      }

      return Patients.findById(id)
    }
  },
  Mutation: {
    addPatient: (root, args, context, info) => {
      return Patients.create(args)
    },
    deletePatient: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid patient id`)
      }
      const patient = Patients.findById(id)
      if (patient) {
        Patients.findByIdAndRemove(id, () => {})
        return 'patient deleted.'
      } else {
        throw new UserInputError(`${id} not found!`)
      }
    },
    updatePatient: (root, args, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(args.id)) {
        throw new UserInputError(`${args.id} is not a valid patient id`)
      }
      const filter = { _id: args.id }
      const update = { name: args.name, assignedClinician: args.assignedClinician, ic: args.ic }

      const doc = Patients.findByIdAndUpdate(filter, update, { new: true })

      return doc
    }
  },
  patient: {
    pathologyReport (root, args, context, info) {
      return PathologyReport.find({ patientID: root.id })
    },
    histologyReport (root, args, context, info) {
      return HistologyReport.find({ patientID: root.id })
    }
  }
}
