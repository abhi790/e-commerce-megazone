import { Routes, Route } from 'react-router-dom';
import ProductListing from './Components/ProductListing';
import ErrorPage from './Components/ErrorPage';
import Navbar from './Components/Navbar';
import {products} from "./Data/products";
import Cart from './Components/Cart';
import ViewProduct from './Components/ViewProduct';
import { useState } from 'react';
import { productsContext,cartContext,viewProductContext } from './context/appContext';
import {Link} from 'react-router-dom';
import {linkStyle} from "./Style/buttonStyle";

function App() {

  const [count, setCount] = useState(0);
  const [cartitems, setCartItems] = useState([]);
  const [wishList, setWishList] = useState([]);
  const handleAddToCart = (id) => {
    const productToAdd = products.find(product => product.id === id);

    //add the items anyhow
    setCartItems([...cartitems, productToAdd]);
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

const showGotoCart = () => {
  return (
  <Link style={linkStyle} to={`/cart`}>
    <button style={{marginLeft:'1.5rem',backgroundColor:"green",color:"white"}}>Go to Cart</button>
  </Link>
  )
}

const showAddToCart = (id) => {
  return (
    <button onClick={() => handleAddToCart(id)}>Add To Cart</button>
  )
}

const isProductPresent = (product) => {
  // console.log(`Inside isProductPresent function`);
  if(cartitems.find(item => item.id === product.id)){
    return true;
  }
  return false;
}
  return (
    <>
    <Navbar cartItems={cartitems} />
      <Routes>
        <Route path="/" element={
        <productsContext.Provider value={{showAddToCart, showGotoCart,count,setCount,cartitems,isProductPresent,setCartItems,handleAddToCart,products, dynamicsort}}>
          <ProductListing  />
        </productsContext.Provider>
      }/>
        <Route path="/details">
          <Route path=':id' element={
          <viewProductContext.Provider value={{products, handleAddToCart,isProductPresent,showAddToCart,showGotoCart}}  >
                <ViewProduct />
          </viewProductContext.Provider>
              }
          />
         </Route>

        <Route path='/cart' element={
        <cartContext.Provider value={{cartitems,setCartItems,dynamicsort,wishList,setWishList}}>
          <Cart />
        </cartContext.Provider>
         } />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
