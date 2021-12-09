import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SneakerService from '../../services/sneaker.service'
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from '../SearchBar/SearchBar';



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
        console.log(response.data)
        this.setState({sneakers:response.data})
        this.setState({initialSneakers: response.data})
      })
  }

  refreshSneakers = (text) => {
      const sneakersCopy = [...this.state.initialSneakers]
      console.log(sneakersCopy)
      let filteredProducts = sneakersCopy.filter(sneaker => sneaker.name.toLowerCase().includes(text.toLowerCase()))
      this.setState({
        sneakers: filteredProducts
      })

  }

  render() {
    return (
        <Container>
          <Row>
          <SearchBar refreshSneakers={this.refreshSneakers} />
          {this.state.sneakers.map((elm, key) => {
            return (
                <Col md={4} key={key}>
                    <Link as='a' to={`/sneakers/${elm._id}`}>
                        <img src={elm.image.thumbnail} alt={elm.name} />
                        <p>{elm.brand} | {elm.name}</p>
                    </Link>
                </Col>
            )
          })
          }
          </Row>
        </Container>
    )
  }
}
export default SneakerList