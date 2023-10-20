import React from 'react'
import '../Style/SearchBox.css';
const SearchBox = ({handleSearchChange}) => {
  return (
    <>
        <div className="search">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          onChange={handleSearchChange}
        />
      </div>
    </>
  )
}

export default SearchBox;