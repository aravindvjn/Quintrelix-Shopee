import React from 'react'
import Header from '../../components/Header'
import { useLocation } from 'react-router-dom'
import Products from '../Electronics/Products'

const SearchResult = () => {
    const location = useLocation()
    const products = location.state
  return (
    <div>
    <Header />
    {products.length === 0 && <center>No products available</center>}
    <div className="products-on-category">
      {products &&
        products.map((product) => {
          return (
            <Products
            {...product}
            />
          );
        })}
    </div>
  </div>
  )
}

export default SearchResult
