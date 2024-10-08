import React, { useState } from "react";
import "./OrderSuccessFull.css";
import { useNavigate } from "react-router-dom";
const OrderSuccessFull = ({ failed }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  setTimeout(() => {
    setLoading(true);
  }, 3000);
  setTimeout(() => {
    navigate("/orders");
  }, 5000);
  return (
    <div
      className="processing-parent"
      onClick={() => {
        if (loading) {
          navigate("/orders");
        }
      }}
    >
      <div className="order-successfull">
        <div className="order">
          {loading ? (
            <h3 style={{ color: `${failed ? "red" : "rgb(0, 165, 0)"}` }}>
              {failed ? "Failed" : "Order Placed Successfully!"}
            </h3>
          ) : (
            <h3 style={{ color: "blue" }}>Order Placing...</h3>
          )}
        </div>
        <div className="loading-bar">
          <div
            className="progress"
            style={{ background: `${loading && !failed ? "green" : "blue"}` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessFull;
