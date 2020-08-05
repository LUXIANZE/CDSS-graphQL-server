import mongoose from 'mongoose'
import { UserInputError } from 'apollo-server-express'
import { Clinicians, Patients } from '../models'

export default {
  Query: {
    clinicians: (root, args, context, info) => {
      return Clinicians.find({})
    },
    clinician: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid clinician id`)
      }

      return Clinicians.findById(id)
    }
  },
  Mutation: {
    addClinician: (root, args, context, info) => {
      return Clinicians.create(args)
    },
    deleteClinician: (root, { id }, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new UserInputError(`${id} is not a valid clinician id`)
      }
      const clinician = Clinicians.findById(id)
      if (clinician) {
        Clinicians.findByIdAndRemove(id, (err) => { console.log(err) })
        return 'clinician deleted.'
      } else {
        throw new UserInputError(`${id} not found!`)
      }
    }
  },
  Clinician: {
    patients (root, args, context, info) {
      return Patients.find({ assignedClinician: root.id })
    }
  }
}
