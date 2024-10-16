import React from "react";
import "./UnderMaintenance.css";
const UnderMaintenance = () => {
  return (
    <div className="undermaintenance">
      <div className="container">
        <h1>We'll Be Back Soon</h1>
        <p>
          Our website is currently undergoing scheduled maintenance. We
          appreciate your patience and will be back shortly.
        </p>
        <div className="loader"></div>
        <div className="footer">Thank you for your understanding.</div>
      </div>
    </div>
  );
};

export default UnderMaintenance;
