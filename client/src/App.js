import './App.css';
import { Component } from 'react'
import Navbar from './components/layout/Navigation/Navbar'
import SignupPage from './components/Signup/Signup'
import LoginPage from './components/Login/Login'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthService from './services/auth.service';
import CartService from "./services/cart.service";
import Home from './components/Home/Home'
import SneakerList from './components/Sneakers/List';
import SneakerDetails from './components/Sneakers/Details';
import Cart from './components/Cart/Cart';
import Profile from './components/Profile/Profile'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loggedUser: undefined,
      productsQuantity: 0,
      cart: undefined
    }

    this.authService = new AuthService()
    this.cartService = new CartService()
  }

  componentDidMount() {
    this.authService.isloggedin()
      .then(response => {
        this.storeUser(response.data)
        this.storeCart(response.data._id)
      })
      .catch(err => this.storeUser(null))
  }

  storeCart = (userId) => {
    this.cartService.getCart(userId)
      .then(response => {
          this.setState({cart: response.data})
          this.storeProductsQuantity(response.data.products.length)
      })
      .catch(err => console.log(err))
  }

  removeCartItem = (userId, productId) => {
    this.cartService.removeProduct(userId, productId)
        .then(response => {
          console.log("removing......",response.data)
            this.setState({cart: response.data})
            this.storeProductsQuantity(response.data.products.length)
        })
        .catch(err => console.log(err))
  }

  addCartItem = (userId, productId) => {
    this.cartService.addProduct(userId, productId)
      .then(response => {
        console.log("adding......",response.data)
        this.setState({cart: response.data})
        this.storeProductsQuantity(response.data.products.length)
      })
      .catch(err => console.log(err))
  }

  storeUser = (user) => {
    this.setState({ loggedUser: user, productsQuantity: user?.products?.length })
  }

  storeProductsQuantity = (quantity) => {
    this.setState({productsQuantity: quantity})
  }

  render() {
    return (
      <div className="App">
        <Navbar productsQuantity={this.state.productsQuantity} storeUser={this.storeUser} loggedUser={this.state.loggedUser} />
        <Switch>
          <Route path='/' exact render={() => <Home /> } />
          <Route path='/sneakers' exact render={() => <SneakerList />}/>
          <Route path='/sneakers/:id' exact render={(props) => <SneakerDetails {...props} loggedUser={this.state.loggedUser} addCartItem={this.addCartItem}  />}/>
          {this.state.loggedUser ?
              <>
                <Route path='/cart' exact render={(props) => <Cart loggedUser={this.state.loggedUser} storeUser={this.storeUser} cart={this.state.cart} removeCartItem={this.removeCartItem} storeProductsQuantity={this.storeProductsQuantity}/>}/>
                <Route path='/profile' exact render={(props) => <Profile storeUser={this.storeUser} loggedUser={this.state.loggedUser}/>}/>
              </>
              :
              <>
                <Route path="/signup" render={(props) => <SignupPage {...props} storeUser={this.storeUser} />} />
                <Route path="/login" render={(props) => <LoginPage {...props} storeUser={this.storeUser} />} />
              </>
            }
        </Switch>
      </div>
    )
  }
}

export default App;
