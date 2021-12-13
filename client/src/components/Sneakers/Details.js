import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import SneakerService from "./../../services/sneaker.service";
import { Link } from "react-router-dom";
import CartService from "../../services/cart.service";
import ValuationForm from "./ValuationForm";
import "./Sneakers.css";

class SneakerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sneaker: undefined,
      purchase: false,
    };
    this.service = new SneakerService();
    this.cartService = new CartService();
  }

  componentDidMount() {
    this.service
      .getOneSneaker(this.props.match.params.id)
      .then((response) => {
        this.setState({ sneaker: response.data });
      })
      .catch((err) => console.log(err));
  }

  handleClick = (userId, productId) => {
    this.props.addCartItem(userId, productId);
    this.setState({ purchase: true });
  };

  render() {
    const { sneaker } = this.state;

    return (
      <Container>
        {sneaker && (
          <Row>
            <Col md={6}>
              <img src={sneaker.image.thumbnail} alt={sneaker.name} />
            </Col>

            <Col md={6}>
              <article>
                <h2>
                  {sneaker.name} | {sneaker.brand}
                </h2>
                <p>{sneaker.name} </p>
                <p>{sneaker.sku}</p>
                <p>{sneaker.colorway}</p>
                <p>Precio: {sneaker.retailPrice}€</p>
                <p>Precio de mercado: {sneaker.estimatedMarketValue}€</p>
                <p>{sneaker.story}</p>
                <div className="comprar">
                  <Link className="button-name" to={"/sneakers"}>
                    Volver a Zapatillas
                  </Link>
                  {this.props.loggedUser ? (
                    <button
                      onClick={() =>
                        this.handleClick(this.props.loggedUser._id, sneaker._id)
                      }
                      className="centrado"
                    >
                      Comprar
                    </button>
                  ) : (
                    <Link to="/login">Login para comprar</Link>
                  )}
                  {this.state.purchase && (
                    <div>
                      Enhorabuena, tu producto se ha añaddo al carrito.
                      <Link to="/cart">Ir al carrito</Link>
                      <Link to="/sneakers">Seguir comprando</Link>
                    </div>
                  )}
                </div>
              </article>
              <ValuationForm product={this.state.sneaker._id} />
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

export default SneakerDetails;
