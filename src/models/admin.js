const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required:true,
        unique: true
    },

    password: {
        type: String,
        required:true
    }

    
})

const AdminModel = new mongoose.model("admin", adminSchema)

exports.Admin = AdminModel;