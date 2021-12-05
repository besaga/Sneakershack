const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sneakerSchema = new Schema(
    {
        sku: String,
        name: String,
        colorway: String,
        gender: String,
        price: Number,
        estimatrdMarketValue:Number,
        realaseYear:Number,
        story:String,
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

const Pena = mongoose.model('Pena', penaSchema);

module.exports = Pena;