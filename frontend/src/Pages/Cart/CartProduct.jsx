import React from "react";

const CartProduct = ({ id, name, category, image, price, description,cart,setTotal }) => {
   
  return <div className="cart-product-parent">
    <div><input type="checkbox"/></div>
    <div><img src={image} alt={name} /></div>
    <div>{name}</div>
    <div>
        <div><strong>Rs.{price}</strong></div>
        <div>Qty:{cart.quantity}</div>
    </div>
  </div>;
};

export default CartProduct;
