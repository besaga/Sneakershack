const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sneakerSchema = new Schema(
    {
        sku: String,
        name: String,
        colorway: String,
        gender: String,
        price: Number,
        estimatedMarketValue: Number,
        realaseYear: Number,
        story: String,
        image:{
            original : String,
            small:String,
            thumbnail:String,

        },
    },
    {
        timestamps: true
    }
);

const Sneaker = mongoose.model('Sneaker', sneakerSchema );

module.exports = Sneaker;