import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProcessingFailed = ({message}) => {
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate()
    setTimeout(() => {
      setSuccess(true);
    }, 3000);
  return (
    <div className="processing-parent">
      <div className="center processing">
        {!success ? (
          <div>
            <div className="spinner"></div>
            <h3>Processing {message} Payment</h3>
          </div>
        ) : (
          <div
            style={{ textAlign: "center", gap: "5px", padding: "50px 20px" }}
          >
            <h3 style={{ color: "red" }}>Payment Failed!</h3>
            <p>Your UPI payment was failed,<br/>Please try again later.</p>
            <button
              className="btn btn-danger"
              onClick={() => {
                navigate('/')
              }}
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingFailed;
