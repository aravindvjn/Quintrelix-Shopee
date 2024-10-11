import React from "react";
import Loading from "./Loading";
import "./Loading.css";
const GlobalLoading = () => {
  return (
    <div className="global-loading">
      <div>
      <span className="global-dot"></span>
        <span className="global-dot"></span>
        <span className="global-dot"></span>
        <span className="global-dot"></span>
        <span className="global-dot"></span>
      </div>
    </div>
  );
};

export default GlobalLoading;
