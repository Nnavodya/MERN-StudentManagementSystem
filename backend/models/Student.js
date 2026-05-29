const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({

  studentId: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String,
    required: true
  },

  age: {
    type: Number,
    required: true
  },

  gender: {
    type: String,
    required: true
  },

  course: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }

}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;