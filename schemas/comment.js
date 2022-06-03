const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    articleId: Number,
    commentId: Number,
    author: String,
    date: Date,
    content: String,
});

module.exports = mongoose.model("Comment", commentSchema);