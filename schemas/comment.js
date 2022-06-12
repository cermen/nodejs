const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    articleId: Number,
    commentId: Number,
    author: String,
    content: String,
}, { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);