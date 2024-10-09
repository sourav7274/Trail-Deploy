const mongoose = require('mongoose')
require("dotenv").config()

const mongoUrl = process.env.MONGODB


const initialDatabase = async () => {
  await  mongoose.connect(mongoUrl).then(() => {
        console.log("Connected to DB")
    }).catch((error) => console.log("Error connecting to database",error))
}

module.exports = {initialDatabase}
