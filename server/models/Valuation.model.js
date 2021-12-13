const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const valuationSchema = new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        productId:{
            type: Schema.Types.ObjectId,
            ref: 'Sneaker'
        },
        comment: String,
        rating: {
            type:Number,
            min:0,
            max:5
        }
    },
    {
        timestamps: true
    }
);

const Valuation = mongoose.model('Valuation', valuationSchema );

module.exports = Valuation;