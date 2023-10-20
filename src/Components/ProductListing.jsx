import Card from "./Card";
import '../Style/ProductListing.css';
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import SortBy from "./SortBy";
const ProductListing = ({
    search,
    setSearch,
    count,
    setCount,
    handleAddToCart,
    handleViewItem,
    products,
    cartitems,
    setCartItems, dynamicsort}) => {
  const [sortBy, setSortBy] = useState("id");
  const [query, setQuery]  = useState('');
  const [filteredProduct, setFilteredProduct] = useState(products);
  console.log(`1st statement`);
  
  useEffect(() =>  {
    console.log(`Inside useEffect`);
    const _filteredProduct = products.filter(product => product.name.toLowerCase().includes(query));
    
    setFilteredProduct(sortList(_filteredProduct,sortBy));
    // console.log(`sort by `, sortBy);
  }, [query,sortBy]);
  
  console.log(`2nd statement`);

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
    console.log(`Inside handleSortByChange`);
  }

  const showProducts = () => {
    const result = filteredProduct.map((product) => {
      return (
        <>
        <div className="card">
          <Card
            key={Math.random()}
            product={product}
            handleAddToCart={handleAddToCart}
            handleViewItem={handleViewItem}
          />
        </div>
        </>
      );
    });
    return result;

  };


  console.log(`3rd statement`);
  return (
    <>
    {console.log(`Inside rendering`)}
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
