import React from 'react'
import CartService from "../../services/cart.service";
import { Table } from "react-bootstrap";


class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.cartService = new CartService()
    }

    render(){
        let totalBeforeTax = 0;
        console.log("-----cart",this.props.cart)
        return(
            <>
            {!this.props.cart || this.props.cart.products.length === 0
                ? <h1>No tienes elementos en tu carrito...</h1>
                : <Table>
                    <thead>
                        <tr><th>Product</th><th>Colorway</th><th>Price</th><th></th></tr>
                    </thead>
                    <tbody>
                        {this.props.cart.products.map((product, key) => {
                            totalBeforeTax+=product.retailPrice
                            return <tr key={key}>
                                <td>{product.name}</td>
                                <td>{product.colorway}</td>
                                <td>${product.retailPrice}</td>
                                <td><button onClick={() => this.props.removeCartItem(this.props.loggedUser._id, product._id)}>X</button></td>
                            </tr>
                        })}
                        <tr><td></td><td></td><td>${totalBeforeTax} <strong>subtotal</strong></td><td></td></tr>
                        <tr><td></td><td></td><td>${totalBeforeTax*0.21} <strong>taxes (21%)</strong></td><td></td></tr>
                        <tr><td></td><td></td><td><strong>${totalBeforeTax+totalBeforeTax*0.21} TOTAL</strong></td><td></td></tr>
                    </tbody>
                </Table>
            }
            </>
        )
    }
}

export default Cart