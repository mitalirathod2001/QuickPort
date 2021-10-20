const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },

    email: {
        type: String,
        required:true
    },

    message: {
        type: String,
        required:true
    }

    
})

const MessagesModel = new mongoose.model("messages", messageSchema)

exports.Message = MessagesModel;