import React from 'react'
import { useParams,Link } from 'react-router-dom';
import {linkStyle} from '../Style/buttonStyle';
const ViewProduct = ({products, cartItems,setCartItems,handleAddToCart}) => {
    const {id} = useParams();
    const product = products.find(product => product.id == id);

    const showProducts = () => {
        const result = <>
            <div className="container" >
                
        <div className="details" key={Math.random()}>
            <p id="name">{product.id} - {product.name}</p>
            <p id="s-desc">{product.short_desc}</p>
            <p id="l-desc">{product.long_desc}</p>
            <p id="price">Salary : <span >$ {product.price} </span></p>
            <div className="button-container">
                <Link style={linkStyle} to='/'>
                    <button >Back</button>
                </Link>
                <button onClick={() => handleAddToCart(product.id)}>Add To Cart</button>
            </div>
        </div>
        <div className="image">
          <img src={product.img_src} alt="Product image" />
        </div>
      </div>
        </>;
        return result;
    }
    const showHeading = () => {
        return <h1>Detail page for the product with id : {product.id}</h1>
    }

    const noProductFound = ()=>{
        return <h1 style={{textAlign:'center'}}>No product Found for the id : {id}</h1>
    }
    

  return (
    <div>
        {product ? showHeading() : null}
        {product ? showProducts() : noProductFound()}
    </div>
  )
}

export default ViewProduct;