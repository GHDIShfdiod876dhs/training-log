const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CustomSetDataSchema = new Schema({
  name: String,
  datum: Number,
  setId: String
})


module.exports = mongoose.model('customSetData', CustomSetDataSchema)
