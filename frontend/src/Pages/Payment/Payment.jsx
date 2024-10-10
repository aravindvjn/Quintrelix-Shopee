import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import Card from "./PaymentMethods/Card";
import UPI from "./PaymentMethods/UPI";
import "./Payment.css";
import { UserContext } from "../Context/context";
import OrderSuccessFull from "./OrderSuccessFull/OrderSuccessFull";
import COD from "./PaymentMethods/COD";
import Header from "../../components/Header";
import CartLoginWarning from "../Cart/CartLoginWarning";
import Footer from "../../components/Footer";
const Payment = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { payment_method } = location.state;
  const method = payment_method;

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
