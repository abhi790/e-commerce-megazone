import React from 'react'

const SortBy = ({handleSortByChange}) => {
  return (
    <div className="sorting">
        <label htmlFor="sortby" >Sort By: </label>
        <select name="sortby" id="sortby" onChange={handleSortByChange}>
          <option value = "id">Id Increasing</option>
          <option value = "id1">Id descreasing </option>
          <option value = "name">Name Increasing</option>
          <option value = "name1">Name Decreasing</option>
          <option value = "price">Price Increasing</option>
          <option value = "price1">Price Decreasing</option>
        </select>
    </div>
  )
}

export default SortBy;