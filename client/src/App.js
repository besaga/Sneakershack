import './App.css';
import { Component } from 'react'
import Navbar from './components/layout/Navigation/Navbar'
import SignupPage from './components/Signup/Signup'
import LoginPage from './components/Login/Login'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthService from './services/auth.service';
import Home from './components/Home/Home'
import SneakerList from './components/Sneakers/List';
import SneakerDetails from './components/Sneakers/Details';
import Cart from './components/Cart/Cart';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loggedUser: undefined
    }

    this.authService = new AuthService()
  }

  componentDidMount() {
    this.authService.isloggedin()
      .then(response => this.storeUser(response.data))
      .catch(err => this.storeUser(null))
  }

  storeUser = (user) => {
    this.setState({ loggedUser: user })
  }


  render() {
    return (
      <div className="App">
        <Navbar storeUser={this.storeUser} loggedUser={this.state.loggedUser} /> 
        <Switch>
            <Route path='/' exact render={() => <Home /> } />
            <Route path='/sneakers' exact render={() => <SneakerList />}/>
            <Route path='/sneakers/:id' exact render={(props) => <SneakerDetails loggedUser={this.state.loggedUser} {...props} />}/>
            <Route path='/cart' exact render={(props) => <Cart/>}/>
            {this.state.loggedUser ?
                <Redirect to="/" />
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
