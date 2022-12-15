const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    postMessage: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Post", PostSchema);