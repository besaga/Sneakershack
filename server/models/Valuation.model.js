const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const valuationSchema = new Schema(
    {
        // Varios usuarios pueden comentar una zapatilla
        userId:[{
            type: Schema.Types.ObjectId,
            ref: 'User',
            //unique: true?
        }],
        // La valoración se va areferir solo a una zapatilla
        products:{
            type: Schema.Types.ObjectId,
            ref: 'Sneaker'
        },
        comment: String,
        //stars:
    },
    {
        timestamps: true
    }
);

const Valuation = mongoose.model('Valuation', valuationSchema );

module.exports = Valuation;