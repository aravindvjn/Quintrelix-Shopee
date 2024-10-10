import React, { useEffect, useState } from "react";
import { authURL } from "../../../server";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
const EditUserName = ({ user, setEditUserName }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(authURL + "api/user-name-edit/" + user.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({fullname : username}),
      });
      if (response.ok) {
        alert("Success,Please Login Again");
        navigate("/login")
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error("Error in updating username");
    }
  };
  useEffect(() => {
    setUsername(user.username);
  }, []);
  return (
    <div className="login-pop-up center">
      <form onSubmit={submitHandler} className="edit-username-form">
        <CloseIcon
          fontSize="small"
          id="edit-username-close"
          onClick={() => setEditUserName(false)}
        />
        <p>Change User Name</p>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditUserName;
