import axios from 'axios'

class CartService {
  constructor() {
    this.app = axios.create({
      baseURL: `${process.env.REACT_APP_BASE_URL}/cart`
    })
  }
  
  addProduct = (userId, productId) => this.app.post(`/${userId}/${productId}`)
  removeProduct = (userId, productId) => this.app.put(`/${userId}/${productId}`)
  getCart = (userId) => this.app.get(`/details/${userId}`)
  emptyCart = (userId) => this.app.delete(`/${userId}`)
}

export default CartService