import React from 'react'
import CartService from "../../services/cart.service";
import InvoiceService from "../../services/invoice.service";
import { Button, Table } from "react-bootstrap";
import NodemailerService from '../../services/nodemailer.service';
import "./Cart.css";

class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.cartService = new CartService()
        this.invoiceService = new InvoiceService()
        this.nodemailerService = new NodemailerService()
    }

    handlePurchase = () => {
        this.invoiceService.confirmPurchase(this.props.loggedUser._id)
            .then(response => {
                console.log("RESPONSE", response)
                const invoice = response.data
                this.cartService.emptyCart(this.props.loggedUser._id)
                    .then(response => {
                        return this.nodemailerService.sendEmail(invoice._id)
                    })
                    .then(res => {
                        console.log(res.data)
                        window.location = `/confirmation/${invoice._id}`
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }

    render() {
        let totalBeforeTax = 0;
        return (
            <>
                {!this.props.cart || this.props.cart.products.length === 0
                    ? <h1 className='text'>No tienes elementos en tu carrito...</h1>
                    : <>
                        <Button variant="dark" Click={() => this.props.emptyCart(this.props.loggedUser._id)}>Empty cart</Button>
                        <Table>
                            <thead>
                                <tr><th>Product</th><th>Colorway</th><th>Price</th><th></th></tr>
                            </thead>
                            <tbody>
                                {this.props.cart.products.map((product, key) => {
                                    totalBeforeTax += product.retailPrice
                                    return <tr key={key}>
                                        <td>{product.name}</td>
                                        <td>{product.colorway}</td>
                                        <td>€{product.retailPrice}</td>
                                        <td><Button variant="dark" onClick={() => this.props.removeCartItem(this.props.loggedUser._id, product._id)}>X</Button></td>
                                    </tr>
                                })}
                                <tr><td></td><td></td><td>{totalBeforeTax}€<strong> subtotal</strong></td><td></td></tr>
                                <tr><td></td><td></td><td>{(totalBeforeTax * 0.21).toFixed(2)}€<strong> taxes (21%)</strong></td><td></td></tr>
                                <tr><td></td><td></td><td>{(totalBeforeTax + totalBeforeTax * 0.21).toFixed(2)}€<strong>TOTAL</strong></td><td></td></tr>
                            </tbody>
                        </Table>
                        <Button variant="dark" onClick={this.handlePurchase}>Confirm and pay</Button>
                    </>
                }
            </>
        )
    }
}

export default Cart
















