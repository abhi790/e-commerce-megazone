import React, { useContext, useEffect, useState } from 'react'
import '../Style/ProductListing.css';
import SortBy from './SortBy';
import SaveForLater from './SaveForLater';
import {cartContext} from '../context/appContext';
const Cart = () => {
  const [sortBy, setSortBy] = useState('id');
  const {cartitems, setCartItems,dynamicsort,wishList, setWishList} = useContext(cartContext);
  useEffect(() =>  {
    setCartItems(sortList(cartitems,sortBy));
  }, []);


  const handleRemoveItem = (id) => {
    //filtered products except selected item to remove
    const _filteredList = cartitems.filter(product => product.id !== id);
    setCartItems(_filteredList);
  }

  const handleBuyNow = (id) => {
    let product = cartitems.find(item => item.id === id);

      if(window.confirm(`Are you sure you want to buy ${product.name} ?`)){
        const products = cartitems.filter(item => item.id !== id);
        alert(`Buy Succeed`);
        setCartItems(products);
      }
      else
        alert(`Products cancelled successfully`);
    }

  const handleSaveForLater = (id) => {
    const _finalCartItems = cartitems.filter(product => product.id !== id);
    const _productToSaveForLater = cartitems.find(product => product.id === id);
    setCartItems(_finalCartItems);
    const _updatedSaveForLater = [...wishList,_productToSaveForLater];
    setWishList(_updatedSaveForLater);
  }

  const handleCheckout = () => {

    
    if(cartitems.length !== 0){
      if(window.confirm("Are you sure you want to checkout all product?")){
        alert(`checkout completed`);
        setCartItems([]);
      }
      else
      alert(`Products cancelled successfully`)
      return;
    }
    alert(`Nothing to checkout`);

  }

  const showAllItems = () => {
    const result = 
    
    <div className="container">
      {cartitems.map(product => showProduct(product))}
    </div>
    return result;
  }

  const noProductFound = (value)=>{
    return <h1 style={{textAlign:'center', marginTop:'2rem', textTransform:'uppercase'}}>YOUR {value} IS EMPTY</h1>
  }

  const showProduct = (product) => {
    const result = <>
      <div className="card">
      <img src={product.img_src} alt='' />
      <div className="details">
        <p id="name">{product.name}</p>
        <p id="s-desc">{product.short_desc}</p>
        <p id="l-desc">{product.long_desc}</p>
        <p id="price">Cost : <span >&#x20B9; {product.price} </span></p>
        <div className="button-container">
          <button onClick={() => handleRemoveItem(product.id)}>Remove item</button>
          <button onClick={() => handleBuyNow(product.id)}>Buy Item</button>
          <button onClick={() => handleSaveForLater(product.id)}>Save for later</button>
        </div>
      </div>
      </div>
    </>;

    return result;
  }

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    setCartItems(sortList(cartitems,e.target.value));
  }

  const sortList = (cartitems, property) => {
    if(property.includes('1')){
      let sortDec = 'desc';
      //to chop the last character 1, it was just only to indicate that it is sortByDecreasing
      property = property.slice(0,property.length -1);
      return cartitems.sort(dynamicsort(property,sortDec));
    }
    return cartitems.sort(dynamicsort(property));
   

  }

  const calculatePrice = () => {
    let count = 0;
    cartitems.map(item => count += item.price)

    return count;
  }

  const handleMoveToCart = (id) => {
    //item to move
    const _moveToCartItem = wishList.find(product => product.id === id);
    const _finalWishList = wishList.filter(product => product.id !== id);

    setWishList(_finalWishList);
    setCartItems((cartitems) => [...cartitems, _moveToCartItem]);
    // setcartitems(sortList(cartitems,sortBy));
  }

  const handleDelete = (id) => {
    const _itemToDelete = wishList.find(product => product.id === id);
    alert(`Are you sure want to delete ${_itemToDelete.name}`);
    const _finalWishList = wishList.filter(product => product.id !== id);
    setWishList(_finalWishList);
  }

  const showSaveForLater = () => {
    const result = wishList.map((product) => {
      return (
        <>
        <div className="card">
          <SaveForLater
              key={Math.random()}
              product={product}
              handleMoveToCart={handleMoveToCart}
              handleDelete={handleDelete}
            />
        </div>
        </>
      );
    });
    return result;
  };


  return (
    <>
        <div className="cart-list">
          <div className="cart-container">
              <h1 style={{textAlign:'center',marginBottom:'2rem',fontSize:'3rem',textTransform:'uppercase'}}>Cart</h1>
              {<p className="item-count">{cartitems.length} {cartitems.length === 1 || cartitems.length === 0 ? "Item" : "Items"} </p>}
              <SortBy handleSortByChange={handleSortByChange}/>
              {cartitems.length !== 0 ? showAllItems() : noProductFound("Cart")}
              <div className="subtotal-container">
                <p id='subtotal'>Sub Total : <span >&#x20B9; {calculatePrice()} </span> </p>
                <button id='checkout' onClick={handleCheckout}>Checkout</button>
              </div>
          </div>

        </div>
        <br /><br />
        <div className="save-later">
          <h1 style={{textAlign:'center',marginBottom:'2rem',fontSize:'3rem',textTransform:'uppercase'}}>Save For Later</h1>
          <div className="container">
            {wishList.length === 0 ? noProductFound("Wishlist") : showSaveForLater()}
          </div>
        </div>
    </>
  )
}

export default Cart;

