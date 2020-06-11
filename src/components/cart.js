import React, { Component } from "react";

class Cart extends Component {
  constructor() {
    super();
    this.state = {
     commision:13,
     placeholder:{display:"block"}
    };
  }

  componentDidMount(){
      this.props.preloadItems.map((item)=>{
      this.props.items.push(item);
    })
  
  }
   

  render() {

    //check if an array is empty and set the style of placeholder
    const checkvisibility_placeholder = ()=>{
      if(Array.isArray(this.props.items) && this.props.items.length === 0)
      return {display:"block"}
      else 
      return {display:"none"}
    }

   const checkvisibility_list = ()=>{
    if(Array.isArray(this.props.items) && this.props.items.length === 0)
    return {display:"none"}
    else 
    return {display:"block"}
   }

    const removeItem = (item, array) => {
      const index = array.indexOf(item);
      if (index > -1) {
        array.splice(index, 1);
      }
      return array;
    };

    const sumItems = (array)=>{
      let sum = 0;
      for(let item of array){
        sum+=parseFloat(item.price*item.count)
      }
  
      return sum.toFixed(2);
    }

    const calculateTotal = ()=>{
      let price =sumItems(this.props.items);
      let commision = this.state.commision/100;
      let totalPrice = parseFloat(price) + (price*commision);
      return totalPrice.toFixed(2);
    }

    const handleDelete = (evt) => {
      let Product = evt.target.parentElement.parentElement.id.split(":");
      this.props.items.map((product) => {
        if (product.name === Product[1]) {
          if (product.count === 1) {
            removeItem(product, this.props.items);
          }
          product.count--;
        }
      });
      this.props.updateCart();
    };

    const handleDeleteAll = (evt) => {
      let Product = evt.target.parentElement.parentElement.id.split(":");
      this.props.items.map((product) => {
        if (product.name === Product[1]) {
          removeItem(product, this.props.items);
        }
      });
      this.props.updateCart();
    };
    return (
      <div className="cart-container">
        <div className="cart">
          <div className="cart-header"><h1>Cart</h1></div>
          <div className ="cart-body">
            <div className="placeholder" style ={checkvisibility_placeholder()}> 
            <h2>Nothings here !</h2>
            <img src="https://cdn2.iconfinder.com/data/icons/outline-web-application-1/20/cart-512.png" alt="empty-basket" />
            
            </div>
          <ul id="productList" style={checkvisibility_list()}>
            {this.props.items.map((item, index) => {
             
              let count = item.count;
              count <= 1 ? (count = ` `) : (count = `${count}x`);

              return (
                <li key={index} id={`product:${item.name}`} className="product">

              

                  <img src={item.image} alt={`${item}`} className="cartImg"></img>

                  {`${count} ${item.name} `}

              
                  <div className="buttons">
                    <span
                      role="img"
                      aria-label="dash"
                      className="deleteBtn"
                      onClick={handleDelete} > ➖ 
                      </span>
                    <span
                      role="img"
                      aria-label="X"
                      className="deleteBtn"
                      onClick={handleDeleteAll}> ❌ 
                      </span>
                      <span> {`${item.price}€  `}</span>
                  </div>
                </li>
              );
            })}
          </ul>
          </div>
         <div className="cart-footer">
           
          <div className="price-label">{`Price: ${sumItems(this.props.items)}€`}</div>
          <div className="commision-price-label">{`Commision: ${this.state.commision}%`}</div>
          <div className="total-price-label">{`Total: ${calculateTotal()}€`}</div>
          <button className="orderBtn">Order</button>
         </div>
       
        </div>
      </div>
    );
  }
}

export default Cart;
