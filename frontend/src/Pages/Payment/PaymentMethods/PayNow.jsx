import React, { useContext } from "react";
import { UserContext } from "../../Context/context";
import URL from "../../../server";

const PayNow = ({ setProcessing, states, setFailed, setConfirm, cod }) => {
  const { user } = useContext(UserContext);
  const { state, payment_method, address } = states;
  const buyHandler = async (state1) => {
    try {
      const response = await fetch(URL + "orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          product_id: state1.id,
          customer_name: address.name,
          total_amount: state1.price,
          shipping_address: address.shipping_address,
          payment_method: payment_method,
        }),
      });
      if (response.ok) {
        if (cod) {
          setConfirm({ success: true });
        } else {
          setProcessing(true);
        }
      } else {
        if (cod) {
          setConfirm({ failed: true });
        } else {
          setFailed(true);
        }
      }
    } catch (err) {
      console.log("Error in adding order", err);
    }
  };
  const orderHandler = () => {
    {
      if (state.id) {
        buyHandler(state);
      } else if (state.cartcheck) {
        state.cartcheck.map((item) => {
          buyHandler(item);
        });
      }
    }
  };
  return (
    <button
      onClick={() => {
        orderHandler();
      }}
    >
      {cod ? "Confirm" : "Pay Now"}
    </button>
  );
};

export default PayNow;
