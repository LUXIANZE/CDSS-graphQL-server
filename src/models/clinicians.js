import mongoose from 'mongoose'

const cliniciansSchema = new mongoose.Schema({
  email: String,
  name: String,
  createdAt: String
}, {
  timestamps: true
})

export default mongoose.model('Clinicians', cliniciansSchema)
