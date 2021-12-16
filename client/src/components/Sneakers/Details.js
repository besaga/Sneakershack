import React, { Component } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import SneakerService from "./../../services/sneaker.service";
import { Link } from "react-router-dom";
import CartService from "../../services/cart.service";
import ValuationService from "../../services/valuation.service";
import "./Sneakers.css";
import ValuationForm from "./ValuationForm";
import BuyModal from "./../Cart/Modal";

class SneakerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sneaker: undefined,
      purchase: false,
      comments: []
    };
    this.service = new SneakerService();
    this.cartService = new CartService();
    this.valuationService = new ValuationService();
  }

  componentDidMount() {
    this.service
      .getOneSneaker(this.props.match.params.id)
      .then((response) => {
        this.setState({ sneaker: response.data });
        return this.valuationService.getAllValuations(this.state.sneaker._id)
      })
      .then(response => {
        this.setState({comments: response.data})
      })
      .catch(err => console.log(err))
  }

  refreshValuations = () => {
    this.valuationService.getAllValuations(this.state.sneaker._id)
    .then(response => this.setState({comments: response.data}))
  }

  handleClick = (userId, productId) => {
    this.props.addCartItem(userId, productId);
    this.setState({ purchase: true });
  };

  handleClose = () => {
    this.setState({ purchase: false });
  };

  render() {
    const { sneaker } = this.state;

    return (
      <Container>
        {sneaker && (
          <Row>
            <Col md={6}>
              <img src={sneaker.image.thumbnail} alt={sneaker.name} />
              <div>
                <ValuationForm comments={this.state.comments} productId={this.state.sneaker._id} refreshValuations={this.refreshValuations}/>
              </div>
            </Col>

            <Col id="text-col" md={6}>
              <article>
                <h2>
                  {sneaker.name} | {sneaker.brand}
                </h2>
                <p>{sneaker.name} </p>
                <p>Ref: {sneaker.sku}</p>
                <p>Color: {sneaker.colorway}</p>
                <p>Price: {sneaker.retailPrice}€</p>
                <p>Market Price: {sneaker.estimatedMarketValue}€</p>
                <p>{sneaker.story}</p>
                <div className="comprar">
                  <Link className="button-name" to={"/sneakers"}>
                    Volver a Zapatillas
                  </Link>
                  {this.props.loggedUser ? (
                    <Button variant="dark" onClick={() => this.handleClick(this.props.loggedUser._id, sneaker._id)}
                      className="button-name">Comprar
                    </Button>
                  ) : (
                    <Link className="button-name" to="/login">Login para comprar</Link>
                  )}
                  
                    <BuyModal show={this.state.purchase} handleClose={this.handleClose} />


                </div>
              </article>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

export default SneakerDetails;
