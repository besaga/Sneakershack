import React from 'react'
import CartService from "../../services/cart.service";
import { Table} from "react-bootstrap";


class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: []
        }

        this.cartService = new CartService()
    }

    componentDidMount() {

        this.cartService
        .getCart(this.props.loggedUser._id)
        .then(response => this.setState({cart: response.data}))
        .catch(err => console.log(err))
      }
    
    render(){
        return(
            <>

            {this.state.cart.length === 0 ?
                <h1>Loading...</h1>
                :
                <>
                {this.state.cart[0].products.map(product => {
                    return <p>{product.name},{product.retailPrice},{product.colorway}</p>
                })}
                </>
            }
            </>
        )
    }
    
}


export default Cart