import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SneakerService from '../../services/sneaker.service'
import { Container, Row, Col, Card, Button} from "react-bootstrap";
import SearchBar from '../SearchBar/SearchBar';
import './Sneakers.css'
import { BsCartPlusFill, BsInfoCircleFill } from "react-icons/bs"
import BuyModal from "./../Cart/Modal";


class SneakerList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sneakers: [],
      initialSneakers: [],
      purchase: false
    }
    this.service = new SneakerService()
  }
  componentDidMount = () => {
      this.service.getAllSneakers()
      .then(response => {
        this.setState({sneakers: response.data})
        this.setState({initialSneakers: response.data})
      })
  }

  refreshSneakers = (text) => {
    let preparedText = text.toLowerCase().trim()
    if (!preparedText) {
      this.setState({sneakers: this.state.initialSneakers})
    } else {
      let filteredProducts = this.state.initialSneakers.filter(
        sneaker => {
          let sneakerText = `${sneaker.brand} ${sneaker.name}`.toLowerCase()
          return (sneakerText.includes(preparedText))
        })
      this.setState({
        sneakers: filteredProducts
      })
    }
  }

  handleBuyClick = (userId, sneakerId) => {
    this.props.addCartItem(userId, sneakerId)
    this.setState({purchase: true})
  }

  handleClose = () => {
    this.setState({ purchase: false });
  }

  render() {
    return (
       <Container id="card-sneakers">
        <Col md={12} >
          <Row>
          <SearchBar refreshSneakers={this.refreshSneakers} />
          {this.state.sneakers.map((elm, key) => {
            return (
              <Card style={{ width: '18rem' }} className="card-sneakers">
                <Link className="list-card-bg" as='a' to={`/sneakers/${elm._id}`}>
                  <Card.Img variant="top" src={elm.image.thumbnail} alt={elm.name} />
                </Link>
                <Card.Body>
                  <Card.Title id="cardTitle" >{elm.brand} | {elm.name}</Card.Title>
                  <Row>
                    <Col className="list-card-price"><strong>{elm.retailPrice}€</strong></Col>
                    <Col>                         
                      {
                        this.props.loggedUser && <Button 
                            onClick={() => this.handleBuyClick(this.props.loggedUser._id, elm._id)}
                            variant="light"
                            className="list-buy-button">
                            <BsCartPlusFill />
                          </Button>
                      }
                      <Link className="list-info-button btn btn-light" as='a' to={`/sneakers/${elm._id}`}>
                          <BsInfoCircleFill />
                      </Link> 
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              )
            })
            }
            </Row>
          </Col>
          <BuyModal show={this.state.purchase} handleClose={this.handleClose} removeSneakersLink={true} />
        </Container>
    )
  }
}
export default SneakerList