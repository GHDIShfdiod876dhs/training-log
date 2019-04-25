const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CustomExerciseFieldSchema = new Schema({
  name: String,
  //datum: Number,
  exerciseId: String
})


module.exports = mongoose.model('customExerciseField', CustomExerciseFieldSchema)