const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    bankName: String,
    cardNumber: Number,
    validity: String,
    name: String,
    type: String
})

const BankCC = mongoose.model('BankCC',cardSchema)

module.exports = BankCC