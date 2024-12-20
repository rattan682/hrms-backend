const mongoose = require('mongoose')
const candidateModel = new mongoose.Schema({
  srnumber: {
    type: Number,
    unique: true
  },
  c_name: String,
  c_email: String,
  c_phone: Number,
  c_position: String,
  c_status: String,
  c_experience: String,
  c_resume: String
})

candidateSchema.pre('save', async function (next) {
  if (this.isNew) {
    try {
      const lastCandidate = await mongoose
        .model('candidate')
        .findOne({})
        .sort({ srnumber: -1 })
        .exec()

      this.srnumber = lastCandidate ? lastCandidate.srnumber + 1 : 1
    } catch (error) {
      return next(error)
    }
  }
  next()
})

module.exports = mongoose.model('candidate', candidateModel)
