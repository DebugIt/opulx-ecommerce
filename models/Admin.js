const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verificationStatus: {
        type: String,
        default: "NOT ACTIVE"
    }
}, {timestamps: true})

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin