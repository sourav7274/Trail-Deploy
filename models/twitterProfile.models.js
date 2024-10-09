const mongoose = require('mongoose')

const TwitterSchema = new mongoose.Schema({
    profielPicUrl : String,
    fullName: String,
    userName: String,
    bio: String,
    companyName: String,
    location: String,
    portfoiioLink: String,
    handle: String,
    followerCount: Number,
    followingCount: Number,
    isOnline: Boolean
})

const Twitter = mongoose.model("Twitter",TwitterSchema)

module.exports = Twitter