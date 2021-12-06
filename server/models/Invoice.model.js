const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const salesSchema = new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            //unique: true?
        },
        cartId:[{
            type: Schema.Types.ObjectId,
            ref: 'Cart',
        }],
        date:{ type: Date, required: true },
        totalPrice:{ type: Number }
    },

    {
        timestamps: true
    }
);

const Sales = mongoose.model('Sales', salesSchema );

module.exports = Sneaker;