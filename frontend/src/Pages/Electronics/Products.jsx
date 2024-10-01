import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/context";
import URL from "../../server";
import LoginPopUp from "../../components/LoginPopUp";
const Products = ({
  id,
  name,
  category,
  image,
  price,
  description,
  cartItems,
  setRefresh,
  refresh,
  setPopUP
}) => {
  const { user } = useContext(UserContext);
  console.log("cart", cartItems);
  console.log("user", user);
  const removeFromCartHandler = async () => {
  if(!user){
    setPopUP(true)
  }else{
    try {
      const response = await fetch(URL + "cart/" + user.id + "/" + id, {
        method: "DELETE",
      });
      if (response.ok) {
        setRefresh(!refresh);
        alert("Removed from cart");
      } else {
        alert("Failed to Remove");
      }
    } catch (err) {
      console.log("Error in add to Cart", err);
    }
  }
  };
  const addToCartHandler = async () => {
    if (!user) {
      setPopUP(true)
    } else {
      try {
        const response = await fetch(URL + "cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
            productId: id,
            quantity: 1,
          }),
        });
        if (response.ok) {
          setRefresh(!refresh);
          alert("added to cart");
        } else {
          alert("Failed to add");
        }
      } catch (err) {
        console.log("Error in add to Cart", err);
      }
    }
  };
  const buyHandler=()=>{
    if(!user){
      setPopUP(true)
    }
  }
  return (
    <div className="products-on-category-single">
      <div>
        <img src={image} height="300px" alt={name} />
      </div>
      <div>
        <h5>{name}</h5>
        <p>{category}</p>
        <p>{description}</p>
        <h6>Rs. {price}</h6>
        <div className="products-buttons">
          {cartItems ? (
            <button onClick={removeFromCartHandler}>Remove from Cart</button>
          ) : (
            <button onClick={addToCartHandler}>Add to Cart</button>
          )}
          <button onClick={buyHandler}>Buy</button>
        </div>
      </div>
    </div>
  );
};

export default Products;
