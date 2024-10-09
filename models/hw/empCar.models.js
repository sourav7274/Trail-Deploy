const mongoose = require("mongoose")

const empCardSchema = new mongoose.Schema({
    idNo: Number,
    dob: String,
    mail: String,
    telNo: String,
    address: String
})

const EmpPassCard = mongoose.model('EmpPassCard',empCardSchema)

module.exports = EmpPassCard
