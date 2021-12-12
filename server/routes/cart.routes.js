const router = require("express").Router()
const Cart = require("../models/Cart.model")
const Invoice = require("../models/Invoice.model")

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

router.get("/invoice/:invoiceId", (req, res)=>{
    const {invoiceId} = req.params
    Invoice.findOne({_id: invoiceId})
        .then(invoice => res.status(200).json(invoice))
        .catch(err => res.status(500).json(err))
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

router.post("/confirmation/:userId", (req, res) => {
    const {userId} = req.params
    Cart.findOne({userId: userId})
        .populate({
            path: 'products',
            model: 'Sneaker'
        })
        .then(cart => {
            const subtotal = cart.products.length > 1
                ? cart.products.reduce((previous, current) => previous.retailPrice + current.retailPrice)
                : cart.products[0].retailPrice;
            const taxes = subtotal + (subtotal * 0.21)
            const simplifiedProducts = cart.products.map((el) => {
                return {  
                    sku: el.sku,
                    brand: el.brand,
                    name: el.name,
                    retailPrice: el.retailPrice
                }
            })

            Invoice.create({
                userId: userId,
                products: simplifiedProducts,
                subtotal: subtotal,
                taxes: taxes,
                total: subtotal + taxes
            })
                .then(invoice => {
                    // enviar email aquí antes de mandar la respuesta
                    res.status(200).json(invoice)
                })
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
