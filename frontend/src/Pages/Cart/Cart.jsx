import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import "./Cart.css";
import Header from "../../components/Header";
import URL from "../../server";
import { UserContext } from "../Context/context";
import Products from "../Electronics/Products";
import CartProduct from "./CartProduct";
import CartLoginWarning from "./CartLoginWarning";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [total, setTotal] = useState({});
  const [popUp, setPopUP] = useState(false);
  const navigate = useNavigate();
  const cartOrderHandler = () => {
    const cartcheckArray = Object.entries(total).filter(
      ([key, value]) => value !== 0
    );
    const cartcheckHelper = cartcheckArray.map((item) => item[0]);
    console.log("heslo",cart)
    const cartcheckHelp = cart.filter((cartI)=>{
      return cartcheckHelper.some((item)=>{
        return item == cartI.id;
      })
    })
    console.log("helo",cartcheckHelp)
    const cartcheck = cartItems.filter((pro)=>{
      return cartcheckHelp.some((item)=>{
        return pro.id === item.product_id;
      })
    })
    console.log("the pro",cartcheck)
    if (cartcheck.length > 0) {
      navigate("/buy-product", {
        state: {
          id:false,
          cartcheck,
        },
      });
    }
  };
  useEffect(() => {
    console.log("Refreshed");
  console.log("check",cartItems)

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
    if (user) {
      fetchCart();
    }
  }, [refresh]);
  if (!user) {
    return (
      <>
        <Header />
        <CartLoginWarning
          message={"Login to see the items you added previously"}
        />
        <Footer />
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
                  item={item}
                  cart={cart.find((obj) => {
                    return obj.product_id === item.id;
                  })}
                  index={index}
                  setRefresh={setRefresh}
                  setTotal={setTotal}
                />
                <hr />
              </div>
            );
          })}
        <div id="cart-total">
          {cartItems.length > 0 ? (
            <p>
              Total :{" "}
              {Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(
                Object.values(total).reduce((acc, val) => acc + val, 0)
              )}
            </p>
          ) : (
            <p
              className="center"
              style={{ fontWeight: "normal", fontSize: "15px" }}
            >
              No Carts Available
            </p>
          )}
          {cartItems.length > 0 &&
            Object.values(total).reduce((acc, val) => acc + val, 0) > 0 && (
              <button onClick={cartOrderHandler} className="btn btn-warning">
                Order Now
              </button>
            )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
