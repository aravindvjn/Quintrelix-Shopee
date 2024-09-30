import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
const Cart = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    console.log("Refreshed");
    const fetchCart = async () => {
      const cartResult = await fetch(URL + "cart/" + user.id);
      const cartdata = await cartResult.json();
      console.log("cart data", cartdata);
      const fetchAllProducts = async () => {
        const result = await fetch(URL);
        const data = await result.json();
        console.log("data", data);
        setCartItems(() => {
          return data.filter((singleData) => {
            return cartdata.some((cart) => cart.product_id === singleData.id);
          });
        });
      };
      fetchAllProducts();
    };
    fetchCart();
  }, []);
  if(!user){
    return <>
    <Header />
    <center>Please Login First</center></>
  }
  return (
    <>
      <Header />
      <div className="cart-parent">
        {cartItems &&
          cartItems.map((item) => {
            return (
              <div>
                <Products {...item} />
              </div>
            );
          })}
      </div>
    </>
  );
};
import "./Cart.css";
import Header from "../../components/Header";
import URL from "../../server";
import { UserContext } from "../Context/context";
import Products from "../Electronics/Products";
export default Cart;
