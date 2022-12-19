const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    Friends: [
        String
        // username: {type: String, default: ''}
    ],
    sentRequests: {
        type: Array,
    },
    receivedRequests: {
        type: Array,
    },
    Followers: {
        type: Array
    },
    Following: {
        type: Array
    },
    profile: {
        type: Object
    },     
    workPosts: {
        type: Array
    }
})

module.exports = mongoose.model("User", UserSchema);