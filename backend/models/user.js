const mongoose = require("mongoose");

const User = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select:false,
        },
        address: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
        },
        favourites: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Books",
            },
        ],
        cart: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Books",
            },
        ],
        orders: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Order",
            },
        ],
    },
    { timestamps: true }
);
module.exports = mongoose.model("User", User);