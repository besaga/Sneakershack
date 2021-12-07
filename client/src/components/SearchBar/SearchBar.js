import React, { Component } from 'react'

class SearchBar extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sneakers:[]
        }
    }

    handleChange = (e) => {

        "/sneakers?name=textoDeLaBarra"

        // let input = e.currentTarget.value.toLowerCase()
    
        // let filteredProducts = this.props.sneakers.filter(sneaker => sneaker.name.toLowerCase().includes(input))
    
        // this.props.sneakers(filteredProducts);
      }

    render() {
        return (
            <div>
                <input type="search" onChange={this.handleChange} value={this.state.name} name="name" />
            </div>
        )
    }
}

export default SearchBar
