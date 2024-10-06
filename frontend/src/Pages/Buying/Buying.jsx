import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import "./Buying.css";
import PaymentMethod from "./PaymentMethod";
import Address from "../Addresses/Address";
import { useLocation } from "react-router-dom";
import DeliveryProduct from "./DeliveryProduct";
import CartLoginWarning from "../Cart/CartLoginWarning";
import { UserContext } from "../Context/context";
import URL from "../../server";

const Buying = () => {
  const [selected, setSelected] = useState("Cash on Delivery");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log("selected", selected);
    console.log("selected Address", selectedAddress);
    console.log("state", location.state);
  }, [refresh, selectedAddress]);

  if (!user) {
    return (
      <div>
        <Header />
        <CartLoginWarning />
      </div>
    );
  }
  const buyHandler = async () => {
    try {
      const response = await fetch(URL + "orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          product_id: location.state.id,
          customer_name: selectedAddress.name,
          total_amount: location.state.price,
          shipping_address: selectedAddress.shipping_address,
          payment_method: selected,
        }),
      });
      if (response.ok) {
        alert("Placed Order");
      } else {
        alert("Failed to place order");
      }
    } catch (err) {
      console.log("Error in adding order", err);
    }
  };
  const orderHandler = () => {
    if (selected == "" || selectedAddress == "") {
      alert("Fill Everything");
    } else {
      buyHandler();
    }
  };
  return (
    <div className="mb-5 pb-5">
      <Header />
      <div className="buying-parent ">
        <h3>Order Now</h3>
        <DeliveryProduct {...location.state} />
        <h4>Select a payment method</h4>
        <PaymentMethod
          setRefresh={setRefresh}
          content={"Cash on Delivery"}
          setSelected={setSelected}
          defaultPayment={true}
        />
        <PaymentMethod
          setRefresh={setRefresh}
          content={"Google Pay"}
          setSelected={setSelected}
        />
        <PaymentMethod
          setRefresh={setRefresh}
          content={"PhonePe"}
          setSelected={setSelected}
        />
        <PaymentMethod
          setRefresh={setRefresh}
          content={"Paytm"}
          setSelected={setSelected}
        />
        <PaymentMethod
          setRefresh={setRefresh}
          content={"Credit & Debit Card"}
          setSelected={setSelected}
        />
      </div>
      <hr />
      <div className="address-parent">
        <h4>Select a delivery address</h4>
      </div>
      <Address
        buyPage={true}
        setSelectedAddress={setSelectedAddress}
        product={location.state}
      />
      <div className="address-parent">
        <button className="btn btn-warning" onClick={orderHandler}>
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Buying;
