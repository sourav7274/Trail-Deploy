const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  marks: {
    type:Number,
    default:0
  },
  attendance: {
    type:Number,
    default: 0
  },
  grade: String,
});

const Student = mongoose.model("Student", studentSchema);


module.exports = { Student };