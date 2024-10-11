import React from "react";
import "./ProductFetching.css";
const ProductFetching = () => {
  return (
    <div>
      <div class="skeleton-container products-on-category-single skeleton-product-fetch">
        <div class="skeleton skeleton-header"></div>
        <div className="skeleton-product">
          <div class="skeleton skeleton-line"></div>
          <div class="skeleton skeleton-line"></div>
          <div class="skeleton skeleton-line"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductFetching;
