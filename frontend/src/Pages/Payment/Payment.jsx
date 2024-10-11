import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import "./Payment.css";
import { UserContext } from "../Context/Context";
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
        <COD
          address={location.state.address}
          state={location.state}
          cod={true}
        />
      </div>
    );
  }
  return (
    <div>
      <COD address={location.state.address} state={location.state} />
    </div>
  );
  return;
};

export default Payment;
