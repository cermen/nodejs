const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    articleId: {
        type: Number,
        required: true,
        unique: true
    }, 
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model("Comment", commentSchema);