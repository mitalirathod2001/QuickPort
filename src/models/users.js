const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },

    phone: {
        type: Number,
        required:true,
        unique: true
    },

    email: {
        type: String,
        required:true,
        unique: true
    },

    password: {
        type: String,
        required:true
    }

    
})

const UsersModel = new mongoose.model("users", userSchema)

exports.User = UsersModel;