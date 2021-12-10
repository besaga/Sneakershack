const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sneakerSchema = new Schema(
    {
        sku: { 
            type: String, 
            unique: true, 
            required: true
        },
        name: { 
            type: String, 
            unique: true, 
            required: true},
        colorway: String,
        size:{
            type:Number,
            min:35,
            max:47
        },
        gender: String,
        retailPrice: { 
            type: Number,
            required:true 
        },
        estimatedMarketValue: Number,
        realaseYear: Number,
        story: String,
        image: {
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