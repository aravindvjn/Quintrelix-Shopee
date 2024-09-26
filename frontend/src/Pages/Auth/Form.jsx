import React, { useState } from "react";
import { authURL } from "../../server";

const Form = ({ input, handleChange, setInput }) => {
  const [message, setMessage] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if( input.password.length<8){
            setMessage("Must have more than 8 charactors")
            return
        }
        if (input.password !== input.cpassword) {
          setMessage("Password does not match");
        } else {
          console.log(input);
          
          const sendData= async()=>{
            try{
                const response = await fetch(authURL, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(input),
                  });
                  console.log("res",response)
                  if(response.status===400){
                    setMessage("mail exists")
                    return;
                  }
                  if(response.ok){
                    console.log("sucess")
                    setInput({ fullName: "", email: "", password: "" ,cpassword:"" });
                  }
            }catch(err){
                console.log("error in register",err)
            }
          }
          sendData();
        }
      }}
    >
      {message && <center>{message}</center>}

      <label htmlFor="fullName">Full Name</label>
      <input
        type="text"
        name="fullName"
        className="auth-inputs"
        value={input.fullName}
        onChange={handleChange}
      />
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        className="auth-inputs"
        value={input.email}
        onChange={handleChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        className="auth-inputs"
        value={input.password}
        onChange={handleChange}
      />
      <label htmlFor="cpassword"> Confirm Password</label>
      <input
        type="password"
        name="cpassword"
        className="auth-inputs"
        value={input.cpassword}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
