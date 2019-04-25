const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ExerciseSchema = new Schema({
  name: String,
  description: String
})

const CustomFieldSchema = new Schema({
  name: String,
  datum: Number
})

const SetSchema = new Schema({
  exerciseName: String,
  number: Number,
  reps: Number,
  weight: Number,
  time: Number,
  userDefinedData: [CustomFieldSchema],
  notes: String
})

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
  sets: [SetSchema]
})

const UserSchema = new Schema({
  name: String,
  passwordHash: String,
  preferences: {},
  exercises: [ExerciseSchema],
  programs: [
    {
      name: String,
      description: String,
      startDate: Date,
      workouts: [WorkoutSchema]
    }
  ]
})

const User = mongoose.model('user', UserSchema)

module.exports = User