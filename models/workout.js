const mongoose = require('mongoose')
const Schema = mongoose.Schema


const WorkoutSchema = new Schema({
  date: Date,
  description: String,
  conditions: {
    sleep: Number,
    nutrition: Number,
    stress: Number,
    dayOfCycle: Number,
    selfAssessmentBefore: Number,
    selfAssessmentAfter: Number
  },
  completed: Boolean,
  programId: String,
  userId: String
})


module.exports = mongoose.model('workout', WorkoutSchema)