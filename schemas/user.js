const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    nickname: String,
    password: String,
});
UserSchema.virtual("userId").get(function () {
    return this._id.toHexString();
});
UserSchema.set("toJSON", {
    virtuals: true,
});

// const userSchema = new mongoose.Schema({
//     nickname: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     }
// });

module.exports = mongoose.model("User", userSchema);
