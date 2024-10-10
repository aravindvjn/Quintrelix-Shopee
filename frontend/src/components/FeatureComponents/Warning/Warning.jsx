import React from "react";
import "./Warning.css";
const Warning = ({ message }) => {
  return (
    <div className="warning-parent-div">
      {message}
    </div>
  );
};

export default Warning;
