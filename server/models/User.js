const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userID : {
        type: String,
        require: true,
        unique: true
    },
    password : {
        type: String,
        require: true
    }
}, { timestamps: true })

const UserModel = mongoose.model("users", UserSchema)
module.exports = UserModel