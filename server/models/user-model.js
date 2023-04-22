const { Schema, model } = require('mongoose');

// User schema. All filed is reqired.  
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
})

module.exports = model('User', UserSchema);