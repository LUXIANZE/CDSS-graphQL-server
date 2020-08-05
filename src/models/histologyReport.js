import mongoose from 'mongoose'

const histologyReportSchema = new mongoose.Schema({
  title: String,
  content: String,
  patientID: String,
  createdAt: String
}, {
  timestamps: true
})

export default mongoose.model('HistologyReport', histologyReportSchema)
