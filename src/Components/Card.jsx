import React, { useContext } from "react";
import "../Style/Card.css";
import {Link} from 'react-router-dom';
import {linkStyle} from "../Style/buttonStyle";
import { productsContext } from "../context/appContext";
const Card = ({ product,handleAddToCart,cartitems }) => {
  const {isProductPresent,showAddToCart,showGotoCart} = useContext(productsContext);
  // const showAddToCart = (id) => {
  //   return (
  //     <button onClick={() => handleAddToCart(id)}>Add To Cart</button>
  //   )
  // }

  // // const isProductPresent = (product, list) => {
  // //   console.log(`Inside isProductPresent function`);
  // //   if(list.find(item => item.id == product.id)){
  // //     return true;
  // //   }
  // //   return false;
  // // }
  
  // const showGotoCart = () => {
  //   return (
  //   <Link style={linkStyle} to={`/cart`}>
  //     <button style={{marginLeft:'1.5rem',backgroundColor:"green",color:"white"}}>Go to Cart</button>
  //   </Link>
  //   )
  // }


  return (
    <> 
      
      <img src={product.img_src}alt=""/>
      <div className="details">
        <p id="name">{product.name}</p>
        <p id="s-desc">{product.short_desc}</p>
        <p id="l-desc">{product.long_desc}</p>
        <p id="price">Cost : <span >&#x20B9; {product.price} </span></p>
        <div className="button-container">
          <Link style={linkStyle} to={`/details/${product.id}`}>
              <button >View Item</button>
          </Link>
         {isProductPresent(product) ? showGotoCart() : showAddToCart(product.id)}

        </div>
      </div>
        
    </>
  );
};

export default Card;
