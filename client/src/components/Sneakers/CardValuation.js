import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from 'react-router-dom'
import ValuationService from "../../services/valuation.service";

class CardValuation extends Component {
  constructor(props) {
    super(props)

    this.state = {
        comment: ""
    }
    this.ValuationService = new ValuationService()
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
      <Container>
        {this.state.invoice && <Row>
          <div>
            
                <h1>SneakerHack</h1>
                <p>Your sneakers store</p>
                
                    {invoice.products.map((product, key) => {
                        return <tr key={key}>
                            <td>{product.name}</td>
                            <td>{product.colorway}</td>
                            <td>€{product.retailPrice}</td>
                        
            
          </div>
          <Link to="/sneakers">Return to sneakers list</Link>
      </Container>
    )
  }
}

export default ValuationService