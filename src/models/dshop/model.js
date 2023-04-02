const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title : {
        type: String,
        required : [true, "title is required"]
    },
    price : {
        type: Number,
        required: [true, "price is required"]
    },
    desc : {
        type: String,
        required: [true, "desc is required"]
    },
    image : {
        type: String,
        required: [true, "image is required"]
    },
}, {collection: 'product'});

const Product = mongoose.model("Product", ProductSchema);
module.exports = {Product, ProductSchema};

