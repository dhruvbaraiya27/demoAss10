const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Company name is required']
  },
  jobTitle: {
    type: String,
    required: [true, 'Job title is required']
  },
  description: {
    type: String,
    required: [true, 'Job description is required']
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required']
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);