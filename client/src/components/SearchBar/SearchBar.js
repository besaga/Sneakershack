import React, { Component} from 'react'

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
                <input type="search" onChange={this.handleChange} value={this.state.text} name="text" />
            </div>
        )
    }
}

export default SearchBar

