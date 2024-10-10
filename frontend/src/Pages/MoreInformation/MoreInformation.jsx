import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import "./MoreInformation.css";
import { useLocation } from "react-router-dom";
import CartLoginWarning from "../Cart/CartLoginWarning";
import Footer from "../../components/Footer";
import { UserContext } from "../Context/context";
const MoreInformation = () => {
  const location = useLocation();
  const { state } = location;
  const {user} =useContext(UserContext)
  const [dateShow, setDateShow] = useState();
  useEffect(() => {
    const dateFetch = () => {
      const dateObject = new Date(state.order.order_date);
      dateObject.setDate(dateObject.getDate());
      const formattedDate = dateObject.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      });
      setDateShow(formattedDate);
    };
    dateFetch();
  });
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
    <div>
      <Header />
      <div className="more-information">
        {state && (
          <>
            <h2>
              <em>Order Informations</em>
            </h2>
            <div className="product">
              <div className="product-name">
                <h5>
                  <em>Product Details</em>
                </h5>
              </div>
              <div className="product-description">
                <img src={state.image} alt={state.name} />
                <h4>{state.name}</h4>
                <p>
                  <em>{state.category}</em>
                </p>
                <p>{state.description}</p>
                <p style={{fontSize:'17px',fontWeight:'bold'}}>{dateShow}</p>
                <h4>
                  {Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(state.price)}
                </h4>
              </div>
            </div>
            <div className="product">
              <div className="product-name">
                <h5>
                  <em>Address Details</em>
                </h5>
              </div>
              <div className="product-description">
                <h4 style={{ fontWeight: "400" }}>
                  {state.order.customer_name}
                </h4>
                <p>{state.order.shipping_address}</p>
                <p
                  style={{
                    fontSize: "19px",
                    fontWeight: "600",
                    color: "green",
                  }}
                >
                  {state.order.payment_method}
                </p>
                <p>
                  Payment Status :{" "}
                  <span
                    style={{
                      fontWeight: "700",
                      color: `${
                        state.order.payment_method === "Cash on Delivery"
                          ? "red"
                          : "green"
                      }`,
                    }}
                  >
                    {state.order.payment_method === "Cash on Delivery"
                      ? " Pending"
                      : " Successful"}
                  </span>
                </p>
                <p>Order Status : <strong><em>{state.order.status}</em></strong></p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoreInformation;
