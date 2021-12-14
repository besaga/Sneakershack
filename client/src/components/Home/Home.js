import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import './Home.css'
import Image1 from './images/imagen-nike.jpeg'
import Image2 from './images/vansta.webp'
import Image3 from './images/vansskate.webp'

const Home = (props) => {
  return (   
    <Carousel className="tiovivo">
      <Carousel.Item>
        <img className="d-block w-100" src={Image1} alt="First slide"/>
        <Carousel.Caption>
          <Link className="centrado css-button-arrow--sand" to={'/sneakers'}>Comprar</Link>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className={"d-block w-100"} src={Image2} alt="Second slide"/>
        <Carousel.Caption>
          <Link className="centrado css-button-arrow--sand" to={'/sneakers'}>Comprar</Link>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Image3} alt="Third slide"/>
        <Carousel.Caption>
          <Link className="centrado css-button-arrow--sand" variant="light" to={'/sneakers'}>Comprar</Link>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

  )
}

export default Home

