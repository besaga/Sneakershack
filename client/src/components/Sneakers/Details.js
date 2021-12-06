import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import SneakerService from "./../../services/sneaker.service";

class SneakerDetails extends Component {
  constructor() {
    super()

    this.state = {
      sneaker: undefined //metemos todo el objeto sneaker y así no hay que detallar los campos y no hay que hacer nada si cambia el modelo
    }

    this.service = new SneakerService()
  }

  componentDidMount() {
    const id = this.props.match.params.id

    this.service.getOneSneaker(id)
      .then(response => {
        this.setState({ sneaker: response.data })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { sneaker } = this.state

    return (
      <Container>
        <h1>Detalles</h1>
        {sneaker && <Row>
          <Col md="6">
            <article>
                <h2>{sneaker.brand} | {sneaker.name}</h2>
                <p>{sneaker.story}</p>
                {/* Aquí hay que mter los datos de la zapatilla que queramos */}
            </article>
          </Col>
          <Col md={4}>
            <img src={sneaker.image.small} alt={sneaker.name} />
            {/* esta imagen podría ser clicable para agrandar y mostrar el sneaker.image.original */}
          </Col>
        </Row> }
      </Container>
    )
  }
}

export default SneakerDetails