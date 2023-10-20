import React from "react";
import "../Style/Card.css";
import {Link} from 'react-router-dom';
import {linkStyle} from "../Style/buttonStyle";
const Card = ({ product,handleAddToCart }) => {
  return (
    <>
      
      <img src={product.img_src} alt="Product image" />
      <div className="details">
        <p id="name">{product.name}</p>
        <p id="s-desc">{product.short_desc}</p>
        <p id="l-desc">{product.long_desc}</p>
        <p id="price">Cost : <span >&#x20B9; {product.price} </span></p>
        <div className="button-container">
          <Link style={linkStyle} to={`/details/${product.id}`}>
              <button >View Item</button>
          </Link>
          <button onClick={() => handleAddToCart(product.id)}>Add To Cart</button>

        </div>
      </div>
        
    </>
  );
};

export default Card;
