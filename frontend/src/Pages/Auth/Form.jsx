import React, { useContext, useState } from "react";
import { authURL } from "../../server";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/context";
import QLogo from '../../assets/Q-Shopee.png'

const Form = ({ input, handleChange, setInput, page }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (page === "signup") {
          if (input.password.length < 8) {
            setMessage("Must have more than 8 charactors");
            return;
          }
          if (input.password !== input.cpassword) {
            setMessage("Password does not match");
          } else {
            console.log(input);
            const sendData = async () => {
              try {
                const response = await fetch(authURL + "register/", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(input),
                });
                if (response.status === 400) {
                  setMessage("mail exists");
                  return;
                }
                if (response.ok) {
                  const data = await response.json();
                  console.log("user data", data);
                  setUser(data);
                  setInput({
                    fullName: "",
                    email: "",
                    password: "",
                    cpassword: "",
                  });
                  navigate("/");
                }
              } catch (err) {
                console.log("error in register", err);
              }
            };
            sendData();
          }
        } else if (page === "login") {
          const sendLoginData = async () => {
            try {
              const response = await fetch(authURL + "login/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(input),
              });
              console.log("response",response)
              if (response.status === 400) {
                setMessage("Invalid email or password");
                return;
              }
              if (response.ok) {
                const data = await response.json();
                console.log("user data", data);
                setUser(data);
                setInput({
                  fullName: "",
                  email: "",
                  password: "",
                  cpassword: "",
                });
                navigate("/");
              }
            } catch (err) {
              console.log("Error in login", err);
            }
          };

          sendLoginData();
        }
      }}
    >
      <img id='logo' src={QLogo} alt="" />
      {message && <center>{message}</center>}

      {page === "signup" && (
        <>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            className="auth-inputs"
            value={input.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />
        </>
      )}
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        className="auth-inputs"
        value={input.email}
        onChange={handleChange}
        placeholder="Email"

      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        className="auth-inputs"
        value={input.password}
        onChange={handleChange}
        placeholder="Password"

      />
      {page === "signup" && (
        <>
          <label htmlFor="cpassword"> Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            className="auth-inputs"
            value={input.cpassword}
            onChange={handleChange}
            placeholder="Confirm Password"

          />
        </>
      )}
      <button type="submit">Submit</button>
      {page === "signup" ? (
        <p>
          Already Have An Account?
          <strong
            onClick={() => {
              navigate("/login");
            }}
          >
            Log In
          </strong>
        </p>
      ) : (
        <p>
          Doesnot Have An Account?
          <strong
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </strong>
        </p>
      )}
    </form>
  );
};

export default Form;
