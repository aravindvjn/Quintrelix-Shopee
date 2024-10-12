import React from "react";
import "./ProductFetching.css";
const ProductFetching = () => {
  return (
    <div>
      <div className="skeleton-container products-on-category-single skeleton-product-fetch">
        <div className="skeleton skeleton-header"></div>
        <div className="skeleton-product">
          <div className="skeleton skeleton-line"></div>
          <div className="skeleton skeleton-line"></div>
          <div className="skeleton skeleton-line"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductFetching;
