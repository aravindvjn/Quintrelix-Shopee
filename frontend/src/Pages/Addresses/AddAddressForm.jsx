import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authURL } from "../../server";
import { UserContext } from "../Context/context";
import Header from "../../components/Header";
import CartLoginWarning from "../Cart/CartLoginWarning";
import Footer from "../../components/Footer";

const AddAddressForm = () => {
  const { user } = useContext(UserContext);
  const [input, setInput] = useState({});
  const navigate = useNavigate();
  const inputHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const response = await fetch(authURL + "api/user/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id:user.id,
          name:input.firstName +' '+ input.lastName,
          address:input.address,
          state:input.state,
          country:input.country,
          postal_code:input.postal_code,
          phone_number:input.phone_number,
        }),
      });
      if(response.ok){
        navigate('/')
      }else{
        alert("Failed")
      }
    } catch (err) {
      console.log("Error in adding product", err);
    }
  }; 
if (!user) {
    return (
      <div>
        <CartLoginWarning />
        <Footer />
      </div>
    );
  }
  return (
    <div className="add-address-parent">
      <div className="add-address-div">
        <form onSubmit={(e) => submitHandler(e)}>
          <h5>ADD ADDRESSES</h5>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            required
            onChange={inputHandler}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            onChange={inputHandler}
            value={input.name}
          />
          <h5 style={{ transform: "translateY(20px)", margin: "30px 0px" }}>
            DELIVERY ADDRESS
          </h5>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            required
            onChange={inputHandler}
            value={input.address}
          />
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            required
            onChange={inputHandler}
            value={input.state}
          />
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            required
            onChange={inputHandler}
            value={input.country}
          />
          <label htmlFor="postal_code">Postal Code</label>
          <input
            type="text"
            name="postal_code"
            required
            onChange={inputHandler}
            value={input.postal_code}
          />
          <label htmlFor="phone_number">Mobile Phone</label>
          <input
            type="number"
            name="phone_number"
            required
            onChange={inputHandler}
            value={input.phone_number}
          />
          <button style={{ margin: "30px 0px" }} className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddressForm;
