const mongoose = require('mongoose')

const reciepeSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    author:{
        type:String,
        required: true
    },
    difficulty:{
        type:"String",
        enums:(['Easy', 'Intermediate', 'Difficult'])
    },
    prepTime:{
        type:Number,
        required: true
    },
    cookTime:{
        type:Number,
        required: true
    },
    ingredients:[""],
    instructions:[""],
    imageUrl:{
        type: String,
        required:true
    } 
    },
    {
        timestamps:true
    }
)

const Recipe = mongoose.model("Recipe",reciepeSchema)

module.exports = Recipe