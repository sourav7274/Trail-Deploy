const mongoose = require('mongoose')

const smartphoneSchema = new mongoose.Schema({
    brand:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    releaseYear: {
        type: Number,
        required: true
    },
    operatingSystem: String,
    displaySize: String,
    Storage: String,
    Ram: String,
    cameraSpecs: {
        megaPixel: {
            type: String,
            required: true
        },
        lensType: {
            type: String,
            required: true
        },
        features: [String] 
    },
    batteryCapacity: String,
    connectivity:[""],
    price: Number,
    colorsAvailable:[""],
    features:[""]
    },
    {
        timestamps: true
    }
)

const Smartphone = mongoose.model("Smartphone",smartphoneSchema)

module.exports = Smartphone