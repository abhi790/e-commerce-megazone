import React from 'react'

const SaveForLater = ({product,handleMoveToCart,handleDelete}) => {
  
  return (
    <>
      <img src={product.img_src} alt="" />
      <div className="details">
        <p id="name">{product.name}</p>
        <p id="s-desc">{product.short_desc}</p>
        <p id="l-desc">{product.long_desc}</p>
        <p id="price">Cost : <span >&#x20B9; {product.price} </span></p>
        <div className="button-container">
          <button onClick={() => handleMoveToCart(product.id)}>Move To Cart</button>
          <button onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      </div>
    </>
  )
}

export default SaveForLater;