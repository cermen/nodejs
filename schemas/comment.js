const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    articleId: {
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

commentSchema.virtual("commentId").get(function () {
    return this._id.toHexString();
});
commentSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("Comment", commentSchema);