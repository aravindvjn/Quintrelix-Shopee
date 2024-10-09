import React, { useEffect, useRef, useState } from "react";

const PaymentMethod = ({
  setRefresh,
  content,
  setSelected,
  defaultPayment,
}) => {
  const input = useRef();

  const checkIt = () => {
    if (input.current.checked) {
      setSelected(content);
    } 
    setRefresh((prev) => !prev);
  };
  useEffect(() => {
    checkIt();
  }, []);
  return (
    <div
      className="single-address payment-method-parent"
      style={{ paddingLeft: "20px", fontSize: "18px" }}
    >
      <div className="payment-method">
        {defaultPayment ? (
          <input
            type="radio"
            name="single-payment"
            ref={input}
            onClick={checkIt}
            defaultChecked
          />
        ) : (
          <input
            type="radio"
            name="single-payment"
            ref={input}
            onClick={checkIt}
          />
        )}
      </div>
      <p style={{ paddingTop: "5px" }}>{content}</p>
    </div>
  );
};

export default PaymentMethod;
