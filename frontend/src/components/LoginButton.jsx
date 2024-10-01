import React from "react";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
    const location = useNavigate()
  return (
    <button
      className="btn btn-warning"
      onClick={() => {
        location("/login");
      }}
    >
      Login
    </button>
  );
};

export default LoginButton;
