import React, { useContext, useEffect, useState } from "react";
import Header from "../../../components/Header";
import "./SingleProduct.css";
import { useLocation } from "react-router-dom";
import LoginPopUp from "../../../components/LoginPopUp";
import { UserContext } from "../../Context/context";
import URL from "../../../server";
import BuyFeature from "../BuyFeature/BuyFeature";
const SingleProduct = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const { id, name, category, image, price, description } = location.state;
  const [popUp, setPopUP] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(cartItems.includes(id));
  const [dateShow, setDateShow] = useState();
  const removeFromCartHandler = async () => {
    if (!user) {
      setPopUP(true);
    } else {
      try {
        const response = await fetch(URL + "cart/" + user.id + "/" + id, {
          method: "DELETE",
        });
        if (response.ok) {
          setToggleBtn(!toggleBtn);
          // alert("Removed from cart");
        } else {
          // alert("Failed to Remove");
        }
      } catch (err) {
        console.log("Error in add to Cart", err);
      }
    }
  };
  const addToCartHandler = async () => {
    if (!user) {
      setPopUP(true);
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
          setToggleBtn(!toggleBtn);
          // alert("added to cart");
        } else {
          // alert("Failed to add");
        }
      } catch (err) {
        console.log("Error in add to Cart", err);
      }
    }
  };

  useEffect(() => {
    console.log("Refreshed");
    const fetchCart = async () => {
      const cartResult = await fetch(URL + "cart/" + user.id);
      const cartdata = await cartResult.json();
      console.log("cart data", cartdata);
      const checkCartStatus = cartdata.filter((item) => {
        return item.product_id === id;
      });
      setToggleBtn(checkCartStatus.length > 0 ? true : false);
    };
    fetchCart();

    const dateFetch = () => {
      const dateObject = new Date();
      dateObject.setDate(dateObject.getDate() + 5);
      const formattedDate = dateObject.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      });
      setDateShow(formattedDate);
    };
    dateFetch();
  }, []);
  return (
    <div>
      <Header />
      {popUp && <LoginPopUp setPopUP={setPopUP} />}
      <div className="single-product-details center">
        <div>
          <img src={image} alt={name} />
        </div>
        <div>
          <h3>{name}</h3>
          <p>
            <strong>
              <em>{category}</em>
            </strong>
          </p>
          <p>{description}</p>
          <h4>{Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(price)}</h4>
          <div style={{marginBottom:'5px'}}>Free Delivery by <strong>{dateShow}</strong></div>
          <div className="products-buttons">
            {toggleBtn ? (
              <button onClick={removeFromCartHandler}>Remove from Cart</button>
            ) : (
              <button onClick={addToCartHandler}>Add to Cart</button>
            )}
            <BuyFeature setPopUP={setPopUP} {...location.state} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
