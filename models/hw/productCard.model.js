const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    rating: Number,
    features:[{
        type: String
    }],
    isFreeDelievery: Boolean,
    stock: Number
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product