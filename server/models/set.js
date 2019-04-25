const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SetSchema = new Schema({
  number: Number,
  reps: Number,
  weight: Number,
  time: Number,
  notes: String,
  exerciseId: String,
  userDefinedData: Array,
  completed: Boolean,
  workoutId: String
})


module.exports = mongoose.model('set', SetSchema)
