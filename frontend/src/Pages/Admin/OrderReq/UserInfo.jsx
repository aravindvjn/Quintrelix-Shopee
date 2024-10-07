import React, { useEffect, useState } from "react";
import URL, { authURL } from "../../../server";

const UserInfo = ({ setInfo, info }) => {
  const [user, setUser] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
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
          <div>
            <h5>Name : {user.fullname}</h5>
            <h6>Email : {user.email}</h6>
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
