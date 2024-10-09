const { default: mongoose } = require("mongoose")

const studentSchema = new mongoose.Schema({
    studentId: String,
    studentName:  String,
    fatherGuidianName: String,
    class: String,
    emergencyContact: Number,
    studentProfileImageUrl: String,
    studentRegistration: String
})


const Student = mongoose.model('Student',studentSchema)

module.exports = Student;