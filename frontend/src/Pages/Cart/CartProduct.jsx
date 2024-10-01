import React, { useEffect, useRef, useState } from "react";
import Add from "@mui/icons-material/AddBoxOutlined";
import Minus from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import URL from "../../server";
const CartProduct = ({
  id,
  name,
  category,
  image,
  price,
  description,
  cart,
  setTotal,
  setRefresh
}) => {
  const check = useRef();
  const checkClick = () => {
    if (check.current.checked) {
      setTotal((prev) => {
        return prev + cart.quantity * price;
      });
    } else {
      setTotal((prev) => {
        return prev - cart.quantity * price;
      });
    }
  };
  const increaseQty = async () => {
    updateQty('increase')
  };
  const decreaseQty = () => {
    updateQty('decrease')
  };
  const updateQty = async (operation) => {
    try {
      const response = await fetch(URL + "cart/" + cart.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operation: operation,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("qty updated");
        setRefresh(prev=>!prev);
      } else {
        alert("Failed to update qty");
      }
    } catch (err) {
      console.log("err in updating", err);
    }
  };
  return (
    <div className="cart-product-parent">
      <div>
        <input ref={check} type="checkbox" onClick={checkClick} />
      </div>
      <div>
        <img src={image} alt={name} />
      </div>
      <div>{name}</div>
      <div>
        <div>
          <strong>Rs.{price}</strong>
        </div>
        <div>
          <Minus
            fontSize="small"
            onClick={decreaseQty}
            style={{ cursor: "pointer" }}
          />
          Qty:{cart.quantity}
          <Add
            fontSize="small"
            onClick={increaseQty}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
