const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User = model('User', userSchema);

module.exports = User;
