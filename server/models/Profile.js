
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
    },
    bio: {
        type: String
    },
    experience: {
        type: String
    }
});

module.exports = mongoose.model("Profile", ProfileSchema);