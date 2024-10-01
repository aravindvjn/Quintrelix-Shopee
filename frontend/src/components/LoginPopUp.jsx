import React from "react";
import LoginButton from "./LoginButton";
import CloseIcon from "@mui/icons-material/Close";
const LoginPopUp = ({ setPopUP }) => {
  return (
    <div className="center login-pop-up">
      <div className="center">
        <CloseIcon
          fontSize="small"
          className="close-login"
          onClick={() => {
            setPopUP(false);
          }}
        />
        <h5 style={{ marginBottom: "30px" }}> Please Login First</h5>
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPopUp;
