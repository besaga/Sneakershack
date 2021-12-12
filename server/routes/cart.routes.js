const router = require("express").Router()
const Cart = require("../models/Cart.model")

router.get("/details/:userId", (req, res)=>{
    const {userId} = req.params
    Cart
    .findOne({userId: userId})
    .populate({
        path: 'products',
        model: 'Sneaker'
    })
    .then(cart => res.status(200).json(cart))
    .catch(err => err)
})

router.delete("/:userId", (req, res)=>{
    const {userId} = req.params
    Cart.findOne({userId: userId})
        .then(cart => {
            Cart.findByIdAndUpdate(cart.id, { products: [] }, {new : true})
                .then(updatedCart => res.status(200).json(updatedCart))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.put("/:userId/:productId", (req, res) => {
    const {userId, productId} = req.params
    Cart.findOne({userId: userId})
        .then(cart => {
            Cart.findByIdAndUpdate(cart.id, { $pull: { products: productId } }, {new : true})
                .populate({
                    path: 'products',
                    model: 'Sneaker'
                })
                .then(updatedCart => res.status(200).json(updatedCart))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})

router.post("/:userId/:productId", (req, res) => {
    const {userId, productId} = req.params
    Cart.find({userId: userId})
    .then(response => {
        if (response.length === 0) {
            Cart
            .create({userId})
            .then(response => {
                Cart.findByIdAndUpdate(response.id, { $push: { products: productId }}, {new : true})
                    .populate({
                        path: 'products',
                        model: 'Sneaker'
                    })
                    .then(response => res.json(response))
            })
        } else {
            Cart.findByIdAndUpdate(response[0].id, { $push: { products: productId } }, {new : true})
                .populate({
                    path: 'products',
                    model: 'Sneaker'
                })
                .then(response => {
                    res.json(response)
                })
                .catch(err => console.log(err))
        }
    })
    .catch(err => console.log(err))
})

module.exports = router
