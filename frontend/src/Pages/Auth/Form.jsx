import React, { useContext, useEffect, useState } from "react";
import { authURL } from "../../server";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/Context";
import QLogo from "../../assets/Qshopee.png";
import Warning from "../../components/FeatureComponents/Warning/Warning";

const Form = ({ input, handleChange, setInput, page }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  return (
    <form className="auth-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (page === "signup") {
          if (input.password.length < 8) {
            setMessage("Password must be at least 8 characters long.");
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
                  setMessage("User already exists");
                  return;
                }
                if (response.ok) {
                  const data = await response.json();
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
              if (response.status === 400) {
                setMessage("Invalid email or password");
                return;
              }
              if (response.ok) {
                const data = await response.json();
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
      <img id="logo" src={QLogo} alt="" />
      {message && <Warning message={message} />}

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
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        className="auth-inputs"
        value={input.password}
        onChange={handleChange}
        placeholder="Password"
        required
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
      <button className="btn btn-success" style={{color:'black'}} type="submit">Submit</button>
      {page === "signup" ? (
        <p>
          Already Have An Account?
          <strong
            onClick={() => {
              setInput({
                fullName: "",
                email: "",
                password: "",
              });
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
              setInput({
                fullName: "",
                email: "",
                password: "",
              });
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
