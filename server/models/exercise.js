const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ExerciseSchema = new Schema({
  name: String,
  description: String,
  customFields: Array,
  userId: String
})


module.exports = mongoose.model('exercise', ExerciseSchema)
