import React, { useEffect, useState } from "react";
import URL, { authURL } from "../../../server";

const UserInfo = ({ setInfo, info }) => {
  const [user, setUser] = useState();
  const [products, setProducts] = useState();

  const [cutAddress, setCutAddress] = useState({ postal: null, phone: null });
  useEffect(() => {
    const phoneNumberMatch = info.address.shipping_address.match(
      /Phone Number : \s*(\d+)/
    );
    setCutAddress({
      phone: phoneNumberMatch ? phoneNumberMatch[1] : null,
    });

    const fetchUser = async () => {
      try {
        const results = await fetch(authURL + "api/user-data/" + info.id);
        const data = await results.json();
        if (data) {
          setUser(data);
          console.log(data);
        } else {
          console.log("No user found");
        }
      } catch (err) {
        console.log("Error in fetching user info");
      }
    };
    fetchUser();
    const fetchProducts = async () => {
      try {
        const results = await fetch(URL + info.product_id);
        const data = await results.json();
        if (data) {
          setProducts(data);
        } else {
          console.log("No user found");
        }
      } catch (err) {
        console.log("Error in fetching user info");
      }
    };
    fetchProducts();
    console.log(user);
  }, []);
  return (
    <div
      className="center login-pop-up"
      onClick={() => setInfo({ status: false })}
    >
      {user && products && (
        <div className="center user-product-info">
          <div className="w-100">
            <div
              className="w-100 p-0 user-info-username"
              style={{ textAlign: "end", lineHeight: "10px" }}
            >
              <p>username : {user.fullname}</p>
              <p>email : {user.email}</p>
            </div>
            <h4>
              <em>Delievery Address</em>
            </h4>
            <p className="m-0 user-info-customer">
              {info.address.customer_name}
            </p>
            {cutAddress.phone && <h6><em>{cutAddress.phone}</em></h6>}
            <p className="m-0">{info.address.shipping_address}</p>
          </div>

          <img src={products.image} alt={products.name} />
          <h5>{products.name}</h5>
          <p>
            <em>{products.category}</em>
          </p>
          <p>{products.description}</p>
          <h4>
            {Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(products.price)}
          </h4>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
