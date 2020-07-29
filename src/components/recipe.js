import React, { useState, useEffect } from "react";
import Cart from "./cart";

function Recipe({ match }) {
  let id = match.params.id;
  let parameters = id.split(`:`);
  const query = parameters[0];
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const APP_ID = `fa3dcf96`;
  const Application_key = `9a2698aa769bcf1ab308e839814bbbe6	`;
  const endpoint = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${Application_key}`;

  const getData = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    setData(data.hits[parameters[1]].recipe);
  };

  return (
    <div className="recipe-page">
      <div className="recipe">
        <div className="recipe-header">
          <h1> {data.label} </h1>{" "}
        </div>{" "}
        <div className="recipe-body">
          <img src={data.image} alt={data.image} />
          <p> {`Calories: ${data.calories}`} </p>{" "}
        </div>
      </div>{" "}
      <Cart />
    </div>
  );
}

export default Recipe;
