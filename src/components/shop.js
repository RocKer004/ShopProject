import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Recipedisplay from "./RecipeDisplay";
import Cart from "./cart";
import Sortfield from "./Sortfield";
import { CartContext } from "../context/CartContext";
import useLocalStorage from "../Hooks/useLocalStorage";

const Shop = () => {
  const [Data, setData] = useState([]);
  const [query, setQuery] = useState("Chicken");
  const Cartcont = useContext(CartContext);
  const [savedItems, setSavedItems] = useLocalStorage("products", []);

  //const [searchContent, setSearchContent] = useState("");

  useEffect(() => {
    getData(query);
  }, []);

  useEffect(() => {
    setSavedItems(Cartcont.items);
  }, [Cartcont.items]);

  const getData = async (query) => {
    const APP_ID = `fa3dcf96`;
    const Application_key = `9a2698aa769bcf1ab308e839814bbbe6	`;
    const endpoint = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${Application_key}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    setData(data.hits);
  };

  const addtoCart = (e) => {
    let Item = e.target.id;
    let RandomPrice = (Math.random() * 20 + 1).toFixed(2);
    let Image = e.target.dataset.image;
    let newItem = [{ name: Item, count: 1, price: RandomPrice, image: Image }];
    let condition = false;

    Cartcont.items.map((item) => {
      if (item[0].name === Item) {
        item[0].count++;
        condition = true;
        Cartcont.dispatch({ type: "REFRESH" });
      }
    });
    if (!condition) {
      Cartcont.dispatch({ type: "ADD_ITEM", value: newItem });

      setSavedItems(() => Cartcont.items);
    }
  };

  const search = (e) => {
    e.preventDefault();
    let textValue = document.querySelector(`.searchField`).value;
    getData(textValue);
  };

  return (
    <div className="shop">
      <div className="shop-body">
        <div className="header-img"></div>
        <form onSubmit={search} className="searchForm">
          <input className="searchField" type="text" />
          <button type="Submit" className="searchButton">
            Search
          </button>
        </form>

        <div className="shopList">
          <Sortfield Data={Data} />

          {Data.map((recipe, index) => (
            <div style={{ position: "relative" }} key={index}>
              <div
                className="addbtn"
                id={`${recipe.recipe.label}`}
                onClick={addtoCart}
                data-image={recipe.recipe.image}
              >
                +
              </div>

              <Link to={`/shop/${query}:${index}`} className="shopLink">
                <Recipedisplay
                  name={recipe.recipe.label}
                  image={recipe.recipe.image}
                  healthLabels={recipe.recipe.healthLabels}
                  source={recipe.recipe.source}
                  dietLabels={recipe.recipe.dietLabels}
                  calories={recipe.recipe.calories}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Cart />
    </div>
  );
};

export default Shop;
