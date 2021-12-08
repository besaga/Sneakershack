import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SneakerService from "./../../services/sneaker.service";
import { Link } from 'react-router-dom'
import CartService from "../../services/cart.service";


class SneakerDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sneaker: undefined //metemos todo el objeto sneaker y así no hay que detallar los campos y no hay que hacer nada si cambia el modelo
    }

    this.service = new SneakerService()
    this.cartService = new CartService()
  }

  componentDidMount() {

    this.service.getOneSneaker(this.props.match.params.id)
      .then(response => {
        this.setState({ sneaker: response.data })
      })
      .catch(err => console.log(err))
  }

  handleClick(userId) {
    this.cartService.addProduct(userId, this.props.match.params.id)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }

  render() {
    const { sneaker } = this.state

    return (
      <Container>
        {sneaker && <Row>
          <Col md={6}>
            <img src={sneaker.image.thumbnail} alt={sneaker.name} />
            {/* esta imagen podría ser clicable para agrandar y mostrar el sneaker.image.original */}
          </Col>

          <Col md={6}>

            <article>
                <h2>{sneaker.name} | {sneaker.brand}</h2>
                <p>{sneaker.name} </p>
                <p>{sneaker.sku}</p>
                <p>{sneaker.colorway}</p>
                <p>Precio: {sneaker.retailPrice}€</p>
                <p>Precio de mercado: {sneaker.estimatedMarketValue}€</p>
                <p>{sneaker.story}</p>
                <div className= "comprar">
                   <Link className="centrado" to={'/'}>Comprar</Link>
                   <Link onClick={() => this.handleClick(this.props.loggedUser._id)} className="centrado" to={'/cart'}>Zapatillas</Link>
               </div>
             
            </article>
          </Col>
        </Row> }
      </Container>
    )
  }
}

export default SneakerDetails
