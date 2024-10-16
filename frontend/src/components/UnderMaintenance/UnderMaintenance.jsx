import React from "react";
import "./UnderMaintenance.css";
const UnderMaintenance = () => {
  return (
    <div className="undermaintenance">
      <div class="container">
        <h1>We'll Be Back Soon</h1>
        <p>
          Our website is currently undergoing scheduled maintenance. We
          appreciate your patience and will be back shortly.
        </p>
        <div class="loader"></div>
        <div class="footer">Thank you for your understanding.</div>
      </div>
    </div>
  );
};

export default UnderMaintenance;
