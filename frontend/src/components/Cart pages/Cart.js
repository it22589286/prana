import React from "react";
import PropTypes from "prop-types"; 

export default function Cart({ cartItems }) {
  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <div>
              <p>Name: {item.name}</p>
              <p>Item Code: {item.itemcode}</p>
              <p>Count: {item.count}</p>
              <p>Price: ${item.price}</p>
              <p>Colour: {item.colour}</p>
              <img src={`http://localhost:3000/images/${item.image}`} alt={item.name} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Prop types validation
Cart.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.object).isRequired, 
};
