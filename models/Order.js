const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.ObjectId,
        ref: 'Users',
        required: true
    },
    products: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                default: 1,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            imageURLs: [{
                type: String,
            }]
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'delivered', 'cancelled'],
        default: 'pending'
    },
    address: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone:{
            type:String,
            required:true
        },
        line1:{
            type:String,
            required:true
        },
        pincode: {
            type:Number,
            required:true
        }
    }
}, {timestamps: true})

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;