const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CustomWorkoutFieldSchema = new Schema({
  name: String,
  //datum: Number,
  userId: String
})


module.exports = mongoose.model('customWorkoutField', CustomWorkoutFieldSchema)