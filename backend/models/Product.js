const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        // Product basic information
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        // Main category
        category: {
            type: String,
            required: true,
            enum: [
                "Fashion",
                "Accessories",
                "Electronics",
                "Beauty",
                "Home",
                "Footwear"
            ]
        },

        // Example:
        // Women, Men, Kids, Jewellery, Watches
        subcategory: {
            type: String,
            default: ""
        },

        // Example:
        // Saree, Kurti, Anarkali, Jeans, Earrings, Necklace
        type: {
            type: String,
            default: ""
        },

        // Men / Women / Kids / Unisex
        gender: {
            type: String,
            enum: [
                "Men",
                "Women",
                "Kids",
                "Unisex",
                ""
            ],
            default: ""
        },

        // Example:
        // Wedding, Party, Casual, Office, Daily Wear
        occasion: {
            type: String,
            default: ""
        },

        // Example:
        // Black, Red, Blue, Pink
        color: {
            type: String,
            default: ""
        },

        // Example:
        // XS, S, M, L, XL, XXL
        size: {
            type: [String],
            default: []
        },

        // Product price in Indian Rupees
        price: {
            type: Number,
            required: true,
            min: 0
        },

        // Product image
        image: {
            type: String,
            required: true
        },

        // Stock quantity
        stock: {
            type: Number,
            default: 10,
            min: 0
        },

        // Optional external shopping link
        externalUrl: {
            type: String,
            default: ""
        },

        // Example:
        // ShopEase / Flipkart / Meesho
        source: {
            type: String,
            default: "ShopEase"
        }
    },

    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Product",
    productSchema
);