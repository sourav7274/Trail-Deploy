const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    imgUrl: String,
    name: String,
    isFav: Boolean,
    info: String,
    calories: Number,
    carbohydrates: Number,
    protein: Number,
    fatUn: Number
})

const imgCard = mongoose.model("imgCard",cardSchema)

module.exports = imgCard