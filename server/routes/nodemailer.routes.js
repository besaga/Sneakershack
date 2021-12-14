const router = require("express").Router();
const transporter = require("../config/nodemailer.config")
const Invoice = require("../models/Invoice.model")

router.post('/bill/:invoiceId', (req, res, next) => {

    const { invoiceId } = req.params

    Invoice
        .findById(invoiceId)
        .populate("userId")
        .then(invoice => {
            const email = invoice.userId.email;
            const products = invoice.products;
            const subject = 'La factura de tu compra';
            const message = 'Esta es la factura de compra';
            const { total, taxes, subtotal } = invoice;
            let productsHTML = ""

            products.forEach(product => {
                productsHTML += `
                    <tr>
                        <td>${product.name}</td>
                        <td>€${product.retailPrice}</td>
                    </tr>
                `

            })

            res.json(`
                        <table>
                            <thead>
                                <tr><th>Product</th><th>Colorway</th><th>Price</th><th></th></tr>
                            </thead>
                            <tbody>
                                ${productsHTML}
                                <tr><td></td><td></td><td>${subtotal}€<strong> subtotal</strong></td><td></td></tr>
                                <tr><td></td><td></td><td>${taxes}€<strong> taxes (21%)</strong></td><td></td></tr>
                                <tr><td></td><td></td><td>${total}€<strong>TOTAL</strong></td><td></td></tr>
                            </tbody>
                        </table>
                        `)

            transporter.sendMail({
                from: '"Sneackerhack" <frediybego@gmail.com>',
                to: `${email}`,
                subject: `${subject}`,
                text: `${message}`,
                html: `
                        <table>
                            <thead>
                                <tr><th>Product</th><th>Colorway</th><th>Price</th><th></th></tr>
                            </thead>
                            <tbody>
                                ${productsHTML}
                                <tr><td></td><td></td><td>${subtotal}€<strong> subtotal</strong></td><td></td></tr>
                                <tr><td></td><td></td><td>${taxes}€<strong> taxes (21%)</strong></td><td></td></tr>
                                <tr><td></td><td></td><td>${total}€<strong>TOTAL</strong></td><td></td></tr>
                            </tbody>
                        </table>
                        `
            })
        })
})


module.exports = router;
