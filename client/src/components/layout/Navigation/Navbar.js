import React from 'react'
import './Navbar.css'
import { Navbar, Nav, Container, Col, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AuthService from '../../../services/auth.service'
import Logo from './images/eleven-one-logo.png'


const authService = new AuthService()

const Navigation = ({ loggedUser, storeUser, productsQuantity }) => {
  const logout = () => {
    authService.logout()
      .then(response => storeUser(null))
      .catch(err => console.log(err))
  }

  return (
   <Navbar bg="light" variant="light">
      <Container>
        <Col>
          <Nav.Link as={Link} to="/" ><img className="logito" src={ Logo } /></Nav.Link>
        </Col>  
        <Col>
          <Nav className="me-auto nav-position navigation-arrow">
          <Nav.Link  as={Link} to="/sneakers">Shop</Nav.Link>
          {loggedUser ?
              <>
                <Nav.Link as={Link} to="/profile">User profile</Nav.Link>
                <Nav.Link as={Link} to="/cart">Tu Carrito <Badge pill bg="secondary">{productsQuantity}</Badge></Nav.Link>
                <Nav.Link as={"span"} onClick={logout}>logout</Nav.Link>
              </>
            :
              <>
                <Nav.Link as={Link} to="/signup">Registro</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
          }
          </Nav>
        </Col>  
      </Container>
    </Navbar>
  )
}

export default Navigation

      