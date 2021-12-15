import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Card } from 'react-bootstrap'
import './Home.css'
import Image1 from './images/imagen-nike.jpeg'
import Image2 from './images/vansta.webp'
import Image3 from './images/vansskate.webp'
import logo from './images/eleven-one-logo.png'

const Home = (props) => {
  return ( 
    <>
      <Carousel className="tiovivo">
        <Carousel.Item>
          <img className="d-block w-100" src={Image1} alt="First slide"/>
        </Carousel.Item>
        <Carousel.Item>
          <img className={"d-block w-100"} src={Image2} alt="Second slide"/>
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block w-100" src={Image3} alt="Third slide"/>
        </Carousel.Item>
      </Carousel>
        <div className="overlay">
          <img src={logo} alt="Logotipo"></img>
          <Link id="button-name-home" to={'/sneakers'}>Shop</Link>
        </div>
      <Card>
        <Card.Body>
            <footer className="blockquote-footer">
                  <p title="Source Title">Made by Begoña Sánchez Gallardo & Analía Alejandra López </p>
            </footer>
        </Card.Body>
      </Card>
    </>  
  )
}

export default Home

