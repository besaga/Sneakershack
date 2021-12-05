import './App.css';
import Navbar from './components/layout/Navigation/Navbar'
import { Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
     <Navbar /> 
     <Switch>
        <Route path='/' exact render={() => <h1>Holax</h1> } />
     </Switch>
    
    </div>
  );
}

export default App;
