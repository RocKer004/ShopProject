import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const [commission] = useState(13);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    let preloadItems = JSON.parse(localStorage.getItem("products"));

    if (preloadItems !== null) {
      cartContext.dispatch({ type: "LOAD_ITEMS", value: preloadItems });
    }
  }, []);

  const sumItems = (array) => {
    let sum = 0;
    for (let item of array) {
      sum += parseFloat(item[0].price * item[0].count);
    }
    return sum.toFixed(2);
  };

  const calculateTotal = () => {
    let price = sumItems(cartContext.items);
    let Commission = commission / 100;
    let totalPrice = parseFloat(price) + price * Commission;
    return totalPrice.toFixed(2);
  };

  const handleDelete = (evt) => {
    let Product = evt.target.parentElement.parentElement.id.split(":");
    cartContext.items.map((product) => {
      if (product[0].name === Product[1]) {
        if (product[0].count === 1) {
          cartContext.dispatch({ type: "REMOVE_ITEM", value: product });
        } else {
          product[0].count--;
          cartContext.dispatch({ type: "REFRESH" });
        }
      }
    });
  };

  const handleDeleteAll = (evt) => {
    let Product = evt.target.parentElement.parentElement.id.split(":");
    cartContext.items.map((product) => {
      if (product[0].name === Product[1]) {
        cartContext.dispatch({ type: "REMOVE_ITEM", value: product });
      }
    });
  };
  return (
    <div className="cart-container">
      <div className="cart">
        <div className="cart-header">
          <h1>Cart</h1>
        </div>
        <div className="cart-body">
          {cartContext.items.length === 0 && (
            <div className="placeholder" style={{ display: "block" }}>
              <h2>Nothings here !</h2>
              <img
                src="https://cdn2.iconfinder.com/data/icons/outline-web-application-1/20/cart-512.png"
                alt="empty-basket"
              />
            </div>
          )}
          {cartContext.items.length !== 0 && (
            <ul id="productList" style={{ display: "block" }}>
              {cartContext.items.map((item, index) => {
                let count = item[0].count;
                count <= 1 ? (count = ` `) : (count = `${count}x`);

                return (
                  <li
                    key={index}
                    id={`product:${item[0].name}`}
                    className="product"
                  >
                    <img
                      src={item[0].image}
                      alt={`${item[0]}`}
                      className="cartImg"
                    ></img>

                    {`${count} ${item[0].name} `}

                    <div className="buttons">
                      <span
                        role="img"
                        aria-label="dash"
                        className="deleteBtn"
                        onClick={handleDelete}
                      >
                        {" "}
                        ➖
                      </span>
                      <span
                        role="img"
                        aria-label="X"
                        className="deleteBtn"
                        onClick={handleDeleteAll}
                      >
                        {" "}
                        ❌
                      </span>
                      <span> {`${item[0].price}€  `}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <div className="cart-footer">
          <div className="price-label">{`Price: ${sumItems(
            cartContext.items
          )}€`}</div>
          <div className="commision-price-label">{`Commision: ${commission}%`}</div>
          <div className="total-price-label">{`Total: ${calculateTotal()}€`}</div>
          <button className="orderBtn">Order</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
