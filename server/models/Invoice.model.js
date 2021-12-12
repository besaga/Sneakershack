const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceSchema = new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        products: { type: Array },
        subtotal:{ type: Number },
        taxes:{ type: Number },
        total:{ type: Number }
    },
    {
        timestamps: true
    }
);

const Invoice = mongoose.model('Invoice', InvoiceSchema );

module.exports = Invoice;