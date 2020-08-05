import mongoose from 'mongoose'

const pathologyReportSchema = new mongoose.Schema({
  title: String,
  content: String,
  patientID: String,
  createdAt: String
}, {
  timestamps: true
})

export default mongoose.model('PathologyReport', pathologyReportSchema)
