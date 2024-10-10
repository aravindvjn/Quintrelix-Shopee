import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { authURL } from "../../../server";
import { useNavigate } from "react-router-dom";
import Warning from "../../../components/FeatureComponents/Warning/Warning";

const EditEmailAndPass = ({ user, setEdit }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    newPass: "",
    cNewPass: "",
    oldPass: "",
  });
  const [warning, setWarning] = useState("");
  const changeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (input.newPass.length < 8) {
        setWarning("Password must be at least 8 characters long.");
      } else if (input.cNewPass !== input.newPass) {
        setWarning("Both passwords must match.");
      } else if (input.cNewPass === input.newPass) {
        setWarning("");
        const response = await fetch(
          authURL + "api/user-pass-edit/" + user.id,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(input),
          }
        );
        if (response.ok) {
          alert("Success,Please Login Again");
          navigate("/login");
        } else {
          const failedRes = await response.json();
          if (failedRes.message) {
            if (failedRes.message === "Invalid password") {
              setWarning("Incorrect current password.");
            }
          }
        }
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.error("Failed to change the password", err);
    }
  };
  useEffect(() => {}, [warning]);
  return (
    <div>
      <div className="login-pop-up center">
        {warning && <Warning message={warning} />}
        <form onSubmit={submitHandler} className="edit-username-form">
          <CloseIcon
            fontSize="small"
            id="edit-username-close"
            onClick={() => setEdit(false)}
          />
          <label>Current Password</label>
          <input
            type="password"
            name="oldPass"
            value={input.oldPass}
            onChange={changeHandler}
          />
          <label>New Password</label>
          <input
            type="password"
            name="newPass"
            value={input.newPass}
            onChange={changeHandler}
          />
          <label>Confirm New Password</label>
          <input
            type="password"
            name="cNewPass"
            value={input.cNewPass}
            onChange={changeHandler}
          />
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEmailAndPass;
