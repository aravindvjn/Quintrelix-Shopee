import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import URL from "../../server";
import { UserContext } from "../Context/Context";
import FetchingComponent from "../../components/FetchingComponent/FetchingComponent";

const ElectronicsSlider = ({ name }) => {
  const [products, setProducts] = useState();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await fetch(URL + "category",
           {
          method: "GET",
          credentials: "include",
        }
      )
          .then((response) => response.json())
          .then((data) => {
            setProducts(() => {
              return data.filter((product) => {
                return product.type === name;
              });
            });
          });
      } catch (err) {
        console.log("Error in Fetching Data");
      }
    };
    fetchProducts();
  }, []);
  if (!products) {
    return <FetchingComponent />;
  }

  return (
    <div className="electronics-slider">
      <Link
        to={name === "Electronics" ? "/electronics" : "/fashion"}
        style={{ textDecoration: "none", color: "black" }}
      >
        <h4>{name}</h4>
      </Link>
      <div>
        {products &&
          products.map((product) => {
            return (
              <Link
                key={product.id}
                to={"/category"}
                state={product.idname}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div key={product.id} className="electronics-scroller">
                  <div>
                    <img src={product.image} alt="" />
                    <p>{product.name}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default ElectronicsSlider;
