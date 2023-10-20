import { Routes, Route } from 'react-router-dom';
import ProductListing from './Components/ProductListing';
import ErrorPage from './Components/ErrorPage';
import Navbar from './Components/Navbar';
import {products} from "./Data/products";
import Cart from './Components/Cart';
import ViewProduct from './Components/ViewProduct';
import TestComp from './Components/TestComp';
import { useState } from 'react';
function App() {
  const [search, setSearch] = useState('');
  const [count, setCount] = useState(0);
  const [cartitems, setCartItems] = useState([]);
  const [wishList, setWishList] = useState([]);
  const handleAddToCart = (id) => {
    const productToAdd = products.find(product => product.id == id);

    //add the items anyhow
    setCartItems([...cartitems, productToAdd]);

  };

  const handleViewItem = () => {
    console.log(`handle view item is triggered`);
  };

  //dynamic sort functionality
  const dynamicsort = (property, order='asc') => {
    var sort_order = 1;
    if(order === "desc") {
        sort_order = -1;
    }

    return function (a, b){

        // a should come before b in the sorted order
        if(a[property] < b[property]){
                return -1 * sort_order;

        // a should come after b in the sorted order
        }else if(a[property] > b[property]){
                return 1 * sort_order;

        // a and b are the same
        }else{
                return 0;
        }
    }
}
  return (
    <>
    <Navbar cartItems={cartitems} />
      <Routes>
        <Route path="/" element={
        <ProductListing 
          search={search}
          setSearch={setSearch}
          count={count}
          setCount = {setCount}
          cartitems={cartitems}
          setCartItems={setCartItems}
          handleAddToCart={handleAddToCart}
          handleViewItem={handleViewItem}
          products={products}
          dynamicsort={dynamicsort}
        />} />
        <Route path="/details">
          <Route path=':id' element={
          <ViewProduct 
            products={products}
            cartItems={cartitems}
            setCartItems={setCartItems}
            handleAddToCart={handleAddToCart}
          />} />
         </Route>
        <Route path='/cart' element={
        <Cart 
          products={products}
          cartItems={cartitems}
          setCartItems={setCartItems}
          dynamicsort={dynamicsort}
          wishList={wishList}
          setWishList={setWishList}
        /> } />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
