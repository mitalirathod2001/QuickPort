const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    requesterName: {
        type: String,
        required:true
    },

    requesterEmail: {
        type: String,
        required:true
    },

    requesterMob: {
        type: Number,
        required:true
    },

    weight: {
        type: Number,
        required:true
    },

    value: {
        type: Number,
        required:true
    },

    pickupName: {
        type: String,
        required:true
    },

    pickupMob: {
        type: Number,
        required:true
    },

    pickupAddress: {
        type: String,
        required:true
    },

    deliveryName: {
        type: String,
        required:true
    },

    deliveryMob: {
        type: Number,
        required:true
    },

    deliveryAddress: {
        type: String,
        required:true
    },

    status: {
        type: String,
        required:true
    }

    
})

const OrdersModel = new mongoose.model("orders", orderSchema)

exports.Order = OrdersModel;