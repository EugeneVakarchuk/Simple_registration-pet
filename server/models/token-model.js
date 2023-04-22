const { Schema, model } = require('mongoose');

// Token schema. User type taken from user model by 'User' key.
const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
})

module.exports = model('Token', TokenSchema);