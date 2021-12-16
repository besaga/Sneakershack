import React from 'react'
import CartService from "../../services/cart.service";
import InvoiceService from "../../services/invoice.service";
import { Button, Table , Row, Col, Container} from "react-bootstrap";
import NodemailerService from '../../services/nodemailer.service';
import "./Cart.css";
import { BsTrash } from "react-icons/bs"

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
                const invoice = response.data
                this.cartService.emptyCart(this.props.loggedUser._id)
                    .then(res => {
                        this.nodemailerService.sendEmail(invoice._id)
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
                    ? <h1 className='cart-empty'>No tienes elementos en tu carrito...</h1>
                    : <Container>
                        <Row className='cart-list'>
                            <Table>
                                <thead>
                                    <tr><th>Product</th><th>Colorway</th><th>Price</th><th></th></tr>
                                </thead>
                                <tbody>
                                    {this.props.cart.products.map((product, key) => {
                                        totalBeforeTax = product.retailPrice
                                        return <tr key={key}>
                                            <td><img className="thumbnail" src={product.image.thumbnail} />{product.name}</td>
                                            <td>{product.colorway}</td>
                                            <td>€{product.retailPrice}</td>
                                            <td><Button variant="danger" onClick={() => this.props.removeCartItem(this.props.loggedUser._id, product._id)}><BsTrash /></Button></td>
                                        </tr>
                                    })}
                                    <tr><td></td><td></td><td>{totalBeforeTax}€<strong> subtotal</strong></td><td></td></tr>
                                    <tr><td></td><td></td><td>{(totalBeforeTax * 0.21).toFixed(2)}€<strong> taxes (21%)</strong></td><td></td></tr>
                                    <tr><td></td><td></td><td>{((totalBeforeTax * 0.21)+totalBeforeTax).toFixed(2)}€<strong>TOTAL</strong></td><td></td></tr>
                                </tbody>
                            </Table>
                        </Row>    
                        <Row>
                            <Col md={2}>
                                <Button variant="danger" onClick={() => this.props.emptyCart(this.props.loggedUser._id)}>Empty cart</Button>
                            </Col>
                            <Col md={{ span: 2, offset: 8 }}>
                                <Button variant="success" onClick={this.handlePurchase}>Confirm and pay</Button>
                            </Col>
                        </Row>
                    </Container>
                }
            </>
        )
    }
}

export default Cart
















