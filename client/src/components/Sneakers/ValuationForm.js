import ValuationService from "../../services/valuation.service";
import React, { Component } from "react";
import { Container, Row, Form, Button } from "react-bootstrap";

class ValuationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      comment: "",
      productId: this.props.productId,
      comments: []
    };

    this.valuationService = new ValuationService();
  }

  componentDidMount() {
    this.valuationService.getAllValuations(this.props.productId)
      .then(response => {
        this.setState({comments: response.data})
      })
      .catch(err => console.log(err))
  }

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.valuationService.createReview(this.state)
      .then(response => {
        this.setState({comments: this.state.comments.push(response.data)})
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Container>
        <Row>  
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Puntuación</Form.Label>
              <Form.Select
                onChange={this.handleChange}
                value={this.state.rating}
                name="rating"
              >
                <option>Select your rating</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Escribe un comentario</Form.Label>
              <Form.Control
                onChange={this.handleChange}
                value={this.state.comment}
                name="comment"
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>

        <hr />

        <Row>
          { this.state.comments.map((valuation, key) => {
              return (<div key={key}>
                  <p>User: <strong>{valuation.userId?.firstName}</strong> | Rating: <strong>{valuation.rating}</strong></p>
                  <p>Comment: {valuation.comment}</p>
                  <hr />
              </div>)
          })}
    
        </Row>  
      </Container>
    );
  }
}

export default ValuationForm;
