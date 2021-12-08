import axios from 'axios'

class CartService {
  constructor() {
    this.app = axios.create({
      baseURL: 'http://localhost:5005/api/cart'
    })
  }

  addProduct = (userId, productId) => this.app.post(`/${userId}/${productId}`)
  
}

export default CartService