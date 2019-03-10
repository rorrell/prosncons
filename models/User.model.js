const mongoose = require('mongoose')
  helpers = require('../helpers/bcrypt.helper')

const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    set: v => helpers.encryptPasswordSync(v)
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('users', UserSchema)