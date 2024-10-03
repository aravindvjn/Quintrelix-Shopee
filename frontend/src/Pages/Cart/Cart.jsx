import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
const Cart = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [refresh, setRefresh] = useState(false);
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
    // total.forEach((rs) => {
    //   setTotalPrice((prev) => prev + rs);
    // });
    console.log(totalPrice)
  }, [refresh]);
  if (!user) {
    return (
      <>
        <Header />
        <CartLoginWarning message={"Login to see the items you added previously"} />
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
                <CartProduct
                  key={item.id}
                  {...item}
                  cart={cart.find((obj) => {
                    return obj.product_id === item.id;
                  })}
                  index={index}
                  setTotalPrice={setTotalPrice}
                  totalPrice={totalPrice}
                  setRefresh={setRefresh}
                />
                <hr />
              </div>
            );
          })}
        {cartItems.length > 0 ? <p>Total :{totalPrice}</p> : <p className="center">No Carts Available</p>}
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
