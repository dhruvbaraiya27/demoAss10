const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  type: {
    type: String,
    enum: ['employee', 'admin'],
    required: [true, 'User type is required']
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);