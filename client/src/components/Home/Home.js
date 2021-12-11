import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import './Home.css'
import Image1 from './images/imagen-nike.jpeg'
import Image2 from './images/vans.jpeg'
import Image3 from './images/nike-air-force-manilla-street-shoot-shoes-wet-street-fashion-clothing-sneakers.jpeg'

const Home = (props) => {
  return (
    <Carousel className="carousel-images">
      <Carousel.Item>
        <img className="d-block w-100" src={Image1} alt="First slide"/>
        <Carousel.Caption>
          <div className= "contenedor">
              <Link className="centrado" to={'/sneakers'}>Comprar</Link>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Image2} alt="Second slide"/>
        <Carousel.Caption>
          <div className= "contenedor">
                <Link className="centrado" to={'/sneakers'}>Comprar</Link>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={Image3} alt="Third slide"/>
        <Carousel.Caption>
          <div className= "contenedor">
              <Link className="button-name" to={'/sneakers'}>Comprar</Link>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
      
  )
}

export default Home

