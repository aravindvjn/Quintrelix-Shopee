import React, { useState } from "react";
import OrderSuccessFull from "../OrderSuccessFull/OrderSuccessFull";

const Processing = ({ message, setProcessing }) => {
  const [success, setSuccess] = useState(false);
  const [orderSucc,setOrderSucc] = useState(false)
  setTimeout(() => {
    setSuccess(true);
  }, 2000);
if(orderSucc){
    return <OrderSuccessFull />
}

  return (
    <div className="processing-parent">
      <div className="center processing">
        {!success ? (
          <div>
            <div className="spinner"></div>
            <h3>Processing {message} Payment</h3>
          </div>
        ) : (
          <div style={{textAlign:'center',gap:'5px',padding:'50px 20px'}}>
            <h3 style={{ color: " rgb(0, 165, 0)" }}>Payment Successful!</h3>
            <p>Your UPI payment was processed successfully.</p>
            <button className="btn btn-primary" onClick={()=>{
                setOrderSucc(true)
            }} >OK</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Processing;
