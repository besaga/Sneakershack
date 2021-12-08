import React from 'react'


class Cart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            products: [],
            retailPrice: "",
            quantity: 0
        }
    }
render(){
    return(
        <>
            <h1>Tu carrito de la compra</h1>
            {/* <td>
                <div>
                    <span>{this.props.name}</span>
                </div>
            </td>
            <td>
                <input type= "number" value={this.props.count} onChange={this.props.handleCountChange}></input>
            </td>
            <td>
                {this.props.retailPrice}
            </td> */}
        </>
    )
}

}

export default Cart