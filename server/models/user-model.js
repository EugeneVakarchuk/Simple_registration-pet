const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isEmailActivated: { type: Boolean, default: false },
  emailActivationLink: { type: String },
})

module.exports = model('User', UserSchema);