const router = require("express").Router()
const Cart = require("../models/Cart.model")
const Invoice = require("../models/Invoice.model")




router.post("/:userId", (req, res) => {
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
                taxes: taxes.toFixed(2),
                total: (subtotal + taxes).toFixed(2)
            })
                .then(invoice => {
                    res.status(200).json(invoice)
                })
                .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
})

router.get("/all/:userId", (req, res)=>{
    const {userId} = req.params
    Invoice.find({userId: userId})
        .then(invoices => res.status(200).json(invoices))
        .catch(err => res.status(500).json(err))
})

router.get("/:invoiceId", (req, res)=>{
    const {invoiceId} = req.params
    Invoice.findOne({_id: invoiceId})
        .then(invoice => res.status(200).json(invoice))
        .catch(err => res.status(500).json(err))
})


module.exports = router
