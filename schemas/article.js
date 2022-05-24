const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    articleId: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    content: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Article", articleSchema);
