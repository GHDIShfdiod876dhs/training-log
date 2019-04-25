const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProgramSchema = new Schema({
  name: String,
  description: String,
  startDate: Date,
  userId: String
})


module.exports = mongoose.model('program', ProgramSchema)