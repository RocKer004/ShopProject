import React, { Component} from "react";
import { Link } from "react-router-dom";
import Recipedisplay from "./RecipeDisplay";
import Cart from "./cart";
import Sortfield from "./Sortfield"

class Shop extends Component {
  constructor() {
    super();
    this.state = {
      Data: [],
      items: [],
      query: "Chicken",
      searchContent: " "
    };
  }

   componentDidMount() {
    this.getData(this.state.query);
  }
  
  async getData (query){
    const APP_ID = `fa3dcf96`;
    const Application_key = `9a2698aa769bcf1ab308e839814bbbe6	`;
    const endpoint = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${Application_key}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    this.setState({ Data: data.hits });
    console.log("Data fetched")
  }

  componentDidUpdate(){
    
    let strigified = JSON.stringify(this.state.items);
    localStorage.setItem("products",strigified);
    
  }

  addtoCart = (e) => {
    let Item = e.target.id;
    let RandomPrice = (Math.random()*20+1).toFixed(2);
    let Image = e.target.dataset.image;
    let newItem = [{ name: Item, count: 1, price:RandomPrice, image:Image }];
    let condition = false;

    this.state.items.map((item) => {
      if (item.name === Item) {
        item.count++;
        condition = true;
      }
    });

    if (condition === true) 
    this.setState(this.state);
    else 
    this.setState({ items: this.state.items.concat(newItem) });
  };

    updateCart = () => {
    this.setState(this.state);
  };

  

  render() {



    const  search = e => {
      e.preventDefault();
      let textValue = document.querySelector(`.searchField`).value;
      this.getData(textValue) }
  
    return (
      <div className="shop">
        <div className="shop-body">
          <div className="header-img"></div>
          <form onSubmit={search} className="searchForm">
      <input className="searchField" type="text" />
      <button type="Submit"  className="searchButton" >Search</button>
      </form>
          <div className="shopList">
            <Sortfield Data={this.state.Data}  updateCart={this.updateCart}  />
           
         
            {this.state.Data.map((recipe, index) => (
              <div style={{ position: "relative" }} key={index}>
                <div
                  className="addbtn"
                  id={`${recipe.recipe.label}`}
                  onClick={this.addtoCart} data-image={recipe.recipe.image}>+ 
                  </div>

                <Link
                  to={`/shop/${this.state.query}:${index}`}
                  className="shopLink"
                > 

                  <Recipedisplay
                    name={recipe.recipe.label}
                    image={recipe.recipe.image}
                    healthLabels={recipe.recipe.healthLabels}
                    source={recipe.recipe.source}
                    dietLabels={recipe.recipe.dietLabels}
                    calories = {recipe.recipe.calories}
                  />
                </Link>
              </div>
            ))}
           
          </div>
        </div>
        <Cart
          items={this.state.items}
          preloadItems = {JSON.parse(localStorage.getItem("products"))}
          updateCart={this.updateCart}
        />
      </div>
    );
  }
}

export default Shop;
