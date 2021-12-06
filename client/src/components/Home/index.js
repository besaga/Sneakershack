import React from 'react'
import Zapatillas from './images/zapatillas.jpeg'
import { Link } from 'react-router-dom'


const Home = () => {

  

  return (
    <div>
      
         <img src={Zapatillas} />
         <Link to={'/sneakers'}>Comprar</Link>
         
    </div>

  )
}

export default Home