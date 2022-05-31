const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    passwordCheck: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);
