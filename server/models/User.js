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
    profile: {
        type: String
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
    workPosts: {
        type: Array
    }
})

module.exports = mongoose.model("User", UserSchema);