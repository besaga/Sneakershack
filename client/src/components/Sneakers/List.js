import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SneakerService from '../../services/sneaker.service'
import { Container, Row, Col, Card} from "react-bootstrap";
import SearchBar from '../SearchBar/SearchBar';
import './Sneakers.css'




class SneakerList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sneakers: [],
      initialSneakers: []
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

  render() {
    return (
       <Container id="card-sneakers">
        <Col md={12} >
          <Row>
          <SearchBar refreshSneakers={this.refreshSneakers} />
          {this.state.sneakers.map((elm, key) => {
            return (
              <Card style={{ width: '18rem' }} className="card-sneakers">
                <Link className="button-name" as='a' to={`/sneakers/${elm._id}`}>
                  <Card.Img variant="top" src={elm.image.thumbnail} alt={elm.name} />
                </Link>
                <Card.Body>
                  <Card.Title>{elm.brand} | {elm.name}</Card.Title>
                  <Card.Text>
                    {elm.retailPrice}€
                  </Card.Text>
                </Card.Body>
              </Card>
              )
            })
            }
            </Row>
          </Col>
        </Container>
    )
  }
}
export default SneakerList