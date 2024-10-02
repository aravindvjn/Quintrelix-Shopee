import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/context";
import URL from "../../server";
import LoginPopUp from "../../components/LoginPopUp";
import SingleProduct from "./SingleProduct/SingleProduct";
import { Link, useNavigate } from "react-router-dom";
const Products = (props) => {
  const {
    id,
    name,
    category,
    image,
    price,
    description,
    cartItems,
    setRefresh,
    refresh,
    setShowDetail,
  } = props;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  console.log("cart", cartItems);
  console.log("user", user);
  const [screenListen, setScreenListen] = useState(
    window.outerWidth > 576 ? 200 : 100
  );
  window.addEventListener("resize", () => {
    setScreenListen(window.outerWidth > 576 ? 200 : 100);
  });
  return (
    <>
      <div
        className="products-on-category-single"
        onClick={() =>
          navigate("/show-product", {
            state: {
              id,
              name,
              category,
              image,
              price,
              description,
              cartItems,
            },
          })
        }
      >
        <div>
          <img src={image} alt={name} />
        </div>
        <div>
          {name.length < 60 ? (
            <h5>{name}</h5>
          ) : (
            <h5>
              {name.slice(0, 60)}
              <strong>...</strong>
            </h5>
          )}
          <p className="category-em">
            <em>{category}</em>
          </p>
          {description.length < screenListen ? (
            <p>{description}</p>
          ) : (
            <p>
              {description.slice(0, screenListen)}
              <strong>...</strong>
            </p>
          )}
          <h6>Rs. {price}</h6>
        </div>
      </div>
      <hr className="product-hr-line" />
    </>
  );
};

export default Products;
