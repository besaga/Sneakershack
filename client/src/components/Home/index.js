import React from 'react'
import { Link } from 'react-router-dom'

import './../../App.css'



const Home = () => {

  

  return (
    <div className= "contenedor">
         <Link className="centrado" to={'/sneakers'}>Comprar</Link>
    </div>

  )
}

export default Home

