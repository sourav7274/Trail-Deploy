const mongoose = require('mongoose')

const productCardSchema = new mongoose.Schema({
    name: String,
    info: String,
    color: [{
        type: String,
        enum: ['Blue','Red','Green','Japan','Black']
    }],
    size: [{
        type: Number,
        enum: [7,8,9,10,11]
    }],
    isAddedToCart: {
        type: Boolean,
        default: false
    },
    price: Number
})

const product = mongoose.model('Product',productCardSchema)

module.exports = product
