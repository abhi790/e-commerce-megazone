import Card from "./Card";
import '../Style/ProductListing.css';
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import SortBy from "./SortBy";
import { useContext } from "react";
import { productsContext } from "../context/appContext";
const ProductListing = () => {
  const {handleAddToCart,products,dynamicsort,cartitems} = useContext(productsContext);
  
  // console.log(`productContext`,useContext(productsContext));
  const [sortBy, setSortBy] = useState("id");
  const [query, setQuery]  = useState('');
  const [filteredProduct, setFilteredProduct] = useState(products);
  // console.log(`1st statement`);

  useEffect(() =>  {
    const _filteredProduct = products.filter(product => product.name.toLowerCase().includes(query));

    setFilteredProduct(sortList(_filteredProduct,sortBy));
    // console.log(`sort by `, sortBy);
  }, [query,sortBy]);

  // console.log(`2nd statement`);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  }

  const sortList = (_filteredProduct, property) => {
    if(property.includes('1')){
      let sortDec = 'desc';
      //to chop the last character 1, it was just only to indicate that it is sortByDecreasing
      property = property.slice(0,sortBy.length -1);
      return _filteredProduct.sort(dynamicsort(property,sortDec));
    }
    return _filteredProduct.sort(dynamicsort(property));

  }

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    // console.log(`Inside handleSortByChange`);
  }

  const showProducts = () => {
    const result = filteredProduct.map((product) => {
      return (
        <>
        <div className="card">
          <Card
            key={Math.random()}
            product={product}
            cartitems={cartitems}
            handleAddToCart={handleAddToCart}
          />
        </div>
        </>
      );
    });
    return result;

  };


  // console.log(`3rd statement`);
  return (
    <>
    <div className="product-listing">
        <div className="heading"> <span>Product Listing Page</span></div>
        <p className="item-count">Found {filteredProduct.length} items</p>
        <SearchBox handleSearchChange={handleSearchChange}/>

        {/* Sort */}
        <SortBy handleSortByChange={handleSortByChange}/>

        {/* Filtering */}
        <div className="container">
          {showProducts()}
        </div>
    </div>
    </>
  );
};

export default ProductListing;
