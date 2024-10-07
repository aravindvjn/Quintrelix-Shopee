import React from "react";
import { Link } from "react-router-dom";

const UnAuth = () => {
  return (
    <div className="center" style={{flexDirection:'column',height:'100vh'}}>
      <h1>403 - Unauthorized</h1>
      <p>Sorry, you do not have permission to access this page.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default UnAuth;
