import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authURL } from "../../server";
import { UserContext } from "../Context/Context";
import Header from "../../components/Header";
import CartLoginWarning from "../Cart/CartLoginWarning";
import Footer from "../../components/Footer";

const AddAddressForm = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
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
    console.log(location.state ? location.state.id : " ");
    try {
      const response = await fetch(
        authURL + "api/user/address/" + location.state.id,

        {
          method: location.state.id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            user_id: user.id,
            name: input.lastName
              ? input.firstName + " " + input.lastName
              : input.firstName,
            address: input.address,
            state: input.state,
            country: input.country,
            postal_code: input.postal_code,
            phone_number: input.phone_number,
          }),
        }
      );
      if (response.ok) {
        if (location.state.buyPage) {
          navigate("/buy-product", {
            state: location.state.state,
          });
        } else {
          navigate("/account/addresses");
        }
      } else {
        alert("Failed");
      }
    } catch (err) {
      console.log("Error in adding product", err);
    }
  };

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const results = await fetch(
          authURL + "api/user/address/" + user.id + "/" + location.state.id,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await results.json();
        if (data.length > 0) {
          setInput({
            firstName: data[0].name,
            address: data[0].address,
            state: data[0].state,
            country: data[0].country,
            postal_code: data[0].postal_code,
            phone_number: data[0].phone_number,
          });
        }
      } catch (err) {
        console.log("Error in fetching address");
      }
    };
    if (location.state.id) {
      fetchAddressData();
    }
  }, []);

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
            value={input.firstName}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={inputHandler}
            value={input.lastName}
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
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddressForm;
