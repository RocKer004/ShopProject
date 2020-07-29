import React, { useState, useReducer } from "react";
import Nav from "./components/nav";
import About from "./components/about";
import Shop from "./components/shop";
import Home from "./components/home";
import Recipe from "./components/recipe";
import { CartContext } from "./context/CartContext";
import { CartReducer } from "./Reducers/CartReducer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [items, dispatch] = useReducer(CartReducer, []);

  return (
    <Router>
      <div className="App">
        <Nav />
        <CartContext.Provider
          value={{
            items,
            dispatch,
          }}
        >
          <Switch>
            <Route path="/" exact component={Home} />{" "}
            <Route path="/about" component={About} />{" "}
            <Route path="/shop" exact component={Shop} />{" "}
            <Route path="/shop/:id" exact component={Recipe} />{" "}
          </Switch>{" "}
        </CartContext.Provider>{" "}
      </div>{" "}
    </Router>
  );
}

export default App;
