import ValuationService from "../../services/valuation.service";
import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class ValuationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      comment: "",
      product: this.props.product
    };

    this.valuationService = new ValuationService();
  }

  handleChange = (e) => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.valuationService.createReview(this.state)
      .then(response => {
        console.log(response.data)
      })
      .catch(err => console.log(err.response.data.message))
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Puntuación</Form.Label>
          <Form.Control
            onChange={this.handleChange}
            value={this.state.rating}
            name="rating"
            type="number"
            placeholder="name@example.com"
          />
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
    );
  }
}

export default ValuationForm;
