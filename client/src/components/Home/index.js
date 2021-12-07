import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar';
import './../../App.css'



const Home = (props) => {

  

  return (

    <>
      {/* <SearchBar products={props.products} update={updateProducts}></SearchBar> */}
      <div className= "contenedor">
          <Link className="centrado" to={'/sneakers'}>Comprar</Link>
      </div>
    </>
  )
}

export default Home

