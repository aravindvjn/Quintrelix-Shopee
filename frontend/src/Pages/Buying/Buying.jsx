import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import "./Buying.css";
import PaymentMethod from "./PaymentMethod";
import Address from "../Addresses/Address";
import { useLocation, useNavigate } from "react-router-dom";
import DeliveryProduct from "./DeliveryProduct";
import CartLoginWarning from "../Cart/CartLoginWarning";
import { UserContext } from "../Context/context";
import URL from "../../server";

const Buying = () => {
  const [selected, setSelected] = useState("Cash on Delivery");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [refresh, setRefresh] = useState(false);
  const location = useLocation(0);
  const navigate = useNavigate();
  let totalPrice = 0;
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


  return (
    <div className="mb-5 pb-5">
      <Header />
      <div className="buying-parent ">
        <h3>Order Now</h3>
        {location.state.id && <DeliveryProduct {...location.state} />}
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {location.state.cartcheck &&
            location.state.cartcheck.map((item) => {
              return <DeliveryProduct {...item} />;
            })}
        </div>
        {location.state.cartcheck &&
          location.state.cartcheck.length > 1 &&
          location.state.cartcheck.map((item) => {
            totalPrice = totalPrice + Number(item.price);
            console.log(totalPrice);
          })}
        {totalPrice !== 0 && (
          <div style={{ display: "flex", marginBottom: "50px" }} className="buying-total-price">
            <h3>Total : </h3>
            <h2 style={{ color: "red", marginLeft: "10px" }}>
              {Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(totalPrice)}
            </h2>
          </div>
        )}
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
        <button
          className="btn btn-warning"
          onClick={() => {
            if (selected == "" || selectedAddress == "") {
              alert("Fill Everything");
            } else {
              navigate("/buy-product/payment", {
                state: {
                  state: location.state,
                  payment_method: selected,
                  address: selectedAddress,
                },
              });
            }
          }}
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Buying;
