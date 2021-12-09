import React from 'react'
import CartService from "../../services/cart.service";
import { Table } from "react-bootstrap";
import AuthService from '../../services/auth.service';


class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: [],
            productsQuantity: ''
        }

        this.cartService = new CartService()
        this.authService = new AuthService()
    }

    componentDidMount() {
        this.authService.isloggedin()
        .then(response => {
            this.props.storeUser(response.data)
            return this.cartService
            .getCart(this.props.loggedUser._id)
        })
        .then(response => {
            this.setState({cart: response.data, productsQuantity: 2})
            this.setState({productsQuantity: response.data[0].products.length})
            this.props.storeProductsQuantity(this.state.productsQuantity)
        })
        .catch(err => this.props.storeUser(null))

    }
    
    render(){
        let totalBeforeTax = 0;

        return(
            <>

            {this.state.cart.length === 0 ?
                <h1>Loading...</h1>
                :
                <Table>
                    <thead>
                        <tr><th>Product</th><th>Colorway</th><th>Price</th></tr>
                    </thead>
                    <tbody>
                        
                        {this.state.cart[0].products.map((product, key) => {
                            totalBeforeTax+=product.retailPrice
                            return <tr key={key}>
                                <td>{product.name}</td>
                                <td>{product.colorway}</td>
                                <td>${product.retailPrice}</td>
                            </tr>
                        })}
                        <tr><td></td><td></td><td>${totalBeforeTax} <strong>subtotal</strong></td></tr>
                        <tr><td></td><td></td><td>${totalBeforeTax*0.21} <strong>taxes (21%)</strong></td></tr>
                        <tr><td></td><td></td><td><strong>${totalBeforeTax+totalBeforeTax*0.21} TOTAL</strong></td></tr>
                    </tbody>
                </Table>
            }
            </>
        )
    }
    
}


export default Cart