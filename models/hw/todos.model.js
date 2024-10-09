const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description: String,
    priority: ['Low', 'Medium', 'High'],
    dueData: String,
    completed: Boolean,
    tags:[""],
    createdAt:Date,
    updatedAt: Date,
    },
)

const Todo = mongoose.model("Todo",todoSchema)

module.exports = Todo