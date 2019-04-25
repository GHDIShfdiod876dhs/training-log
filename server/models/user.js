const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
  name: String,
  passwordHash: String,
  preferences: {}
})


module.exports = mongoose.model('user', UserSchema)
