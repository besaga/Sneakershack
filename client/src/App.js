import './App.css';
import { Component } from 'react'
import Navbar from './components/layout/Navigation/Navbar'
import SignupPage from './components/Signup'
import LoginPage from './components/Login'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthService from './services/auth.service';

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
            <Route path='/' exact render={() => <h1>Holax</h1> } />
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
