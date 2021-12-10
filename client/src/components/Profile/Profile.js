import React, { Component } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import ProfileService from "../../services/profile.service";
import { Redirect } from "react-router-dom";
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.loggedUser.email, // ver con Sara porqué aparece el email y luego casca al refrescar
      password: "",
      newPassword: "",
      firstName: "",
      lastName: "",
      address: {
        street: "",
        numberStreet: "",
        floor: "",
        cp: 0,
      },
      phoneNumber: this.props.loggedUser.phoneNumber,
    };
    this.profileService = new ProfileService();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.profileService
      .editProfile(this.props.loggedUser._id, this.state)
      .then((response) => {
        <Redirect to="/"></Redirect>
      })
      .catch((err) => console.log(err));
  };

  handleInputChange = (e, address) => {
    if (address === true) {
        const { name, value } = e.currentTarget;

        this.setState((prevState) => ({
            address: {
                ...prevState.address,
                [name]: value
            }
        }))
    }

    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    return this.props.loggedUser ? (
      <Container className="form-style ">
        <Row>
          <Form onSubmit={this.handleSubmit}>
                <Col md={12}>
                    <Form.Group as={Row} className="mb-7">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="email" plaintext readOnly value={this.state.email}/>
                    </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group as={Row}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={this.handleInputChange} name="password" required type="password" placeholder="Password"/>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group as={Row}>
                  <Form.Label>Fist name</Form.Label>
                  <Form.Control name="firstName" onChange={this.handleInputChange} type="text" placeholder="John" value={this.state.firstName}/>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group as={Row}>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control onChange={this.handleInputChange} name="lastName" type="text" placeholder="Smith" value={this.state.lastName}/>
                </Form.Group>
              </Col>
            <Col md={12}>
            <Form.Group as={Row}>
              <Form.Label>Phone</Form.Label>
                <Form.Control onChange={this.handleInputChange} name="phoneNumber" type="tel" placeholder="657676767" value={this.state.phoneNumber}/>
            </Form.Group>
             </Col>
             <Col md={12}>
            <Form.Group as={Row}>
              <Form.Label>Street</Form.Label>
                <Form.Control onChange={(e) => this.handleInputChange(e, true)} name="street" type="text" placeholder="Elm Street" value={this.state.address.street ? this.state.address.street : null}/>
            </Form.Group>
            </Col>
            <Col md={12}>
            <Form.Group as={Row}>
              <Form.Label>Number street</Form.Label>
                <Form.Control onChange={(e) => this.handleInputChange(e, true)} name="numberStreet" type="text" placeholder="11" value={this.state.address.numberStreet ? this.state.address.numberStreet : null}/>
            </Form.Group>
            </Col>
            <Col md={12}>
            <Form.Group as={Row}>
              <Form.Label>Floor</Form.Label>
                <Form.Control onChange={(e) => this.handleInputChange(e, true)} name="floor" type="text" placeholder="1º A" value={this.state.address.floor ? this.state.address.floor : null}/>
            </Form.Group>
            </Col>
            <Col md={12}>
            <Form.Group as={Row}>
              <Form.Label>Postal Code</Form.Label>
                <Form.Control onChange={(e) => this.handleInputChange(e, true)} name="cp" type="text" placeholder="28050" value={this.state.address.cp ? this.state.address.cp : null}/>
            </Form.Group>
            </Col>
           
            <Button type="submit">Submit</Button>
          </Form>
        </Row>
      </Container>
    ) : (
      <Redirect to="/"></Redirect>
    );
  }
}

export default Profile;
