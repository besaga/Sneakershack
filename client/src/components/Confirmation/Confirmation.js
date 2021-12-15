import React, { Component } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { Link } from 'react-router-dom';
import InvoiceService from "../../services/invoice.service";
import './Confirmation.css';

class Confirmation extends Component {
  constructor(props) {
    super(props)

    this.state = {
        invoice: undefined
    }
    this.invoiceService = new InvoiceService()
  }

  componentDidMount() {
    this.invoiceService.getInvoice(this.props.match.params.invoiceId)
      .then(response => {
        this.setState({invoice: response.data})
      })
      .catch(err => console.log(err))
  }

  
  render() {
    const invoice = this.state.invoice;

    return (
      <Container className="confirmation-container">
        {this.state.invoice && <Row>
          <div>
            <Col>
                <h1>SneakerHack</h1>
                <p>Your sneakers store</p>
            </Col>
            <Col>
                {/* <p>Date: {`${date.getDay()} / ${date.getMonth()} / ${date.getYear()}`}</p> */}
            </Col>
            <Table>
                <thead>
                    <tr><th>Product</th><th>Colorway</th><th>Price</th></tr>
                </thead>
                <tbody>
                    {invoice.products.map((product, key) => {
                        return <tr key={key}>
                            <td>{product.name}</td>
                            <td>{product.colorway}</td>
                            <td>€{product.retailPrice}</td>
                        </tr>
                    })}
                    <tr><td></td><td></td><td>{invoice.subtotal}€<strong> subtotal</strong></td></tr>
                    <tr><td></td><td></td><td>{invoice.taxes}€<strong> taxes (21%)</strong></td></tr>
                    <tr><td></td><td></td><td>{invoice.total}€<strong> TOTAL</strong></td></tr>
                </tbody>
            </Table>
          </div>
          <Link className="button-name" to="/sneakers">Return to sneakers list</Link>
        </Row> }
      </Container>
    )
  }
}

export default Confirmation
