const mongoose = require('mongoose')

const leavesModel = new mongoose.Schema({
  name: String,
  designation: String,
  startdate: { type: Date },
  enddate: { type: Date },
  reason: String,
  status: String,
  attachment: String
})

module.exports = mongoose.model('leaves', leavesModel)
