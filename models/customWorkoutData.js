const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CustomWorkoutDataSchema = new Schema({
  name: String,
  datum: Number,
  workoutId: String
})


module.exports = mongoose.model('customWorkoutData', CustomWorkoutDataSchema)