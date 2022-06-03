const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    articleId: Number,
    author: String,
    date: Date,
    content: String,
});

commentSchema.virtual("commentId").get(function () {
    return this._id.toHexString();
});
commentSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("Comment", commentSchema);