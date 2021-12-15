import React, { Component} from 'react'
import './SearchBar.css'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ""
        }
    }

    handleChange = (e) => {
        let input = e.currentTarget.value.toLowerCase()
        this.setState({
            text: input
        })
        this.props.refreshSneakers(this.state.text)
      }

    render() {
        return (
            <div>
                <input className="search-bar" type="search" onChange={this.handleChange} value={this.state.text} name="text" placeholder='  Search by brand' />
            </div>
        )
    }
}

export default SearchBar

