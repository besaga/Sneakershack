import React, { Component } from "react";
import { Form, Row, Col, Container, Button, Table, Modal } from "react-bootstrap";
import ProfileService from "../../services/profile.service";
import InvoiceService from "../../services/invoice.service";
import { Link, Redirect } from "react-router-dom";
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: undefined,
        invoices: [],
        saved: false
    };
    this.profileService = new ProfileService();
    this.invoiceService = new InvoiceService();
  }

  componentWillMount() {
    this.profileService.getProfile(this.props.loggedUser._id)
        .then(response => this.setState({user: response.data.user}))
        .catch(err => console.log(err))

    this.invoiceService.getAllInvoices(this.props.loggedUser._id)
      .then(response => this.setState({invoices: response.data}))
      .catch(err => console.log(err))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.profileService
      .editProfile(this.props.loggedUser._id, this.state.user)
      .then((response) => {
        this.props.storeUser(this.state.user)
        this.setState({saved: true})
      })
      .catch((err) => console.log(err));
  };

  handleInputChange = (e, address) => {
    if (address === true) {
        const { name, value } = e.currentTarget;

        this.setState((prevState) => ({
            user: {
                address: {
                    ...prevState.address,
                    [name]: value
                }
            }
        }))
    }

    const { name, value } = e.currentTarget;
    this.setState({ user: {[name]: value }});
  };

  handleClose = () => {
    this.setState({ saved: false });
  }

  render() {
    return this.props.loggedUser ? (
      <Container className="conteiner-profile">
        <Row>
          <Col md={4}>
            <h2>User data</h2>
            <Modal show={this.state.saved} onHide={this.handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Congratulations</Modal.Title>
                </Modal.Header>
                <Modal.Body>The changes have been saved</Modal.Body>
                <Modal.Footer>
                <Link className="button-name" to="/sneakers">Go to sneakers</Link>
                <Button variant="dark" onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={this.handleInputChange} name="email" plaintext readOnly value={this.state?.user?.email}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control onChange={this.handleInputChange} name="password" required type="password" placeholder="Password"/>
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Fist name</Form.Label>
                      <Form.Control name="firstName" onChange={this.handleInputChange} type="text" placeholder="John" value={this.state?.user?.firstName}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Last name</Form.Label>
                      <Form.Control onChange={this.handleInputChange} name="lastName" type="text" placeholder="Smith" value={this.state?.user?.lastName}/>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Street</Form.Label>
                    <Form.Control onChange={(e) => this.handleInputChange(e, true)} name="street" type="text" placeholder="Elm Street" value={this.state?.user?.address?.street}/>
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Number street</Form.Label>
                        <Form.Control onChange={(e) => this.handleInputChange(e, true)} name="numberStreet" type="text" placeholder="11" value={this.state?.user?.address?.numberStreet}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Floor</Form.Label>
                        <Form.Control onChange={(e) => this.handleInputChange(e, true)} name="floor" type="text" placeholder="1º A" value={this.state?.user?.address?.floor}/>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Postal Code</Form.Label>
                        <Form.Control onChange={(e) => this.handleInputChange(e, true)} name="cp" type="text" placeholder="28050" value={this.state?.user?.address?.cp}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name="phoneNumber" type="tel" placeholder="657676767" value={this.state?.user?.phoneNumber}/>
                    </Form.Group>    
                  </Col>
                </Row>
                <Col>
                    <Button variant="dark" type="submit">Submit</Button>
                </Col>    
            </Form>
          </Col>
          <Col md={8}>
            <h2>Your Invoices</h2>
            <Table>
              <thead>
                <th>Invoice number</th>
                <th># items</th>
                <th>Date</th>
                <th>Amount</th>
              </thead>
              <tbody>
              {this.state.invoices.length && this.state.invoices.map((inv, key) => {
                return (
                  <tr key={key}>
                    <td><Link className="button-name" to={`/confirmation/${inv._id}`}>{inv._id}</Link></td><td>{inv.products.length}</td><td>{inv.createdAt}</td><td>{inv.total}€</td>
                  </tr>
                )
              })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    ) : (
      <Redirect to="/"></Redirect>
    );
  }
}

export default Profile;
