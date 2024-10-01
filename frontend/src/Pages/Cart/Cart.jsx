import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
const Cart = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [total,setTotal] = useState(0)
  useEffect(() => {
    console.log("Refreshed");
    const fetchCart = async () => {
      const cartResult = await fetch(URL + "cart/" + user.id);
      const cartdata = await cartResult.json();
      console.log("cart data", cartdata);
      setCart(cartdata);
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
  if (!user) {
    return (
      <>
        <Header />
       <CartLoginWarning />
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="cart-parent">
        {cartItems &&
          cartItems.map((item, index) => {
            return (
              <div>
                <CartProduct key={item.id} {...item} cart={cart[index]} setTotal={setTotal} />
                <hr />
              </div>
            );
          })}
          {cartItems.length>0&& <p>Total : {total}</p>}
      </div>
    </>
  );
};
import "./Cart.css";
import Header from "../../components/Header";
import URL from "../../server";
import { UserContext } from "../Context/context";
import Products from "../Electronics/Products";
import CartProduct from "./CartProduct";
import CartLoginWarning from "./CartLoginWarning";
export default Cart;
