const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema(
    {
        //el usuario es un unico genera mongo un id por el que se le reconoce
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        // lo metemos en un array porque puede comprar varias zapatillas
        products:[{
            type: Schema.Types.ObjectId,
            ref: 'Sneaker'
        }]
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model('Cart', cartSchema );

module.exports = Cart;