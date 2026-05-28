const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  }
}, { timestamps: true }); // adds createdAt and updatedAt automatically

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;