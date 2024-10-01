import React from "react";
import LoginButton from "./LoginButton";

const LoginPopUp = ({setPopUP}) => {
  return (
    <div className="center login-pop-up">
        <button className="btn btn-danger" onClick={()=>{
            setPopUP(false)
        }}>close</button>
      <div className="center" style={{ flexDirection: "column" }}>
        <h5> Please Login First</h5>
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPopUp;
