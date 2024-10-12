import React from "react";
import "./FetchingComponent.css";
const FetchingComponent = () => {
  return (
    <div>
      <div className="skeleton-container">
        <div className="skeleton skeleton-header"></div>
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-line"></div>
      </div>
    </div>
  );
};

export default FetchingComponent;
