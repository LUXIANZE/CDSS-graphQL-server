import mongoose from 'mongoose'

const patientsSchema = new mongoose.Schema({
  ic: String,
  name: String,
  assignedClinician: String,
  createdAt: String
}, {
  timestamps: true
})

export default mongoose.model('Patients', patientsSchema)
