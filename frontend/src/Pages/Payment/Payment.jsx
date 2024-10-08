import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Card from "./PaymentMethods/Card";
import UPI from "./PaymentMethods/UPI";
import "./Payment.css";
import { UserContext } from "../Context/context";
import OrderSuccessFull from "./OrderSuccessFull/OrderSuccessFull";
import COD from "./PaymentMethods/COD";
const Payment = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  console.log(location);
  const { payment_method } = location.state;
  const method = payment_method;
  if (method === "Cash on Delivery") {
    return (
      <div>
        <COD address={location.state.address} state={location.state} />
      </div>
    );
  }
  if (method === "Credit & Debit Card") {
    return (
      <div>
        <Card state={location.state} />
      </div>
    );
  }
  return (
    <div>
      <UPI state={location.state} />
    </div>
  );
};

export default Payment;
