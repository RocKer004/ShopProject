import React from 'react';
import Nav from './components/nav'
import About from './components/about'
import Shop from './components/shop'
import Home from './components/home'
import Recipe from './components/recipe'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
 <div className="App">
    <Nav/>
    <Switch>
    <Route path="/" exact component={Home}/>
    <Route path="/about" component={About}/>
    <Route path="/shop" exact component={Shop}/>
    <Route path="/shop/:id" exact component={Recipe}/>
    </Switch>
    </div>
    </Router>
    
  );
}

export default App;
