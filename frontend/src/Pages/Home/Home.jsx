import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PhoneAd from "./PhoneAd";
import AdSlider from "./AdSlider";
import "./Home.css";
import ElectronicsSlider from "./ElectronicsSlider";
import URL from "../../server";
import { UserContext } from "../Context/context";

const Home = ({ admin }) => {
  const [fetchCategory, setFetchCategory] = useState();
  const {cartItems,setCartItems,user} = useContext(UserContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await fetch(URL + "/category/phone")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          });
        console.log("category", results);
        setFetchCategory(results);
      } catch (err) {
        console.error("Error in fetching data at Home.jsx", err);
      }
    };
    fetchData();
    const fetchCart = async () => {
      const cartResult = await fetch(URL + "cart/" + user.id);
      const cartdata = await cartResult.json();
      console.log("cart data", cartdata);
      const fetchAllProducts = async () => {
        const result = await fetch(URL);
        const data = await result.json();
        console.log("data", data);
        setCartItems(() => {
          return data.filter((singleData) => {
            return cartdata.some((cart) => cart.product_id === singleData.id);
          });
        });
      };
      fetchAllProducts();
    };
    fetchCart();
  }, []);
  return (
    <div>
      <Header admin={admin} />
      <AdSlider />
      <ElectronicsSlider name={"Electronics"} />
      <PhoneAd />
      <ElectronicsSlider name={"Fashion"} />
      <Footer />
    </div>
  );
};

export default Home;
