
const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    handyman: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Profile", ProfileSchema);