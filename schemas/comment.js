const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    commentId: {
        type: Number,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Comment", commentSchema);