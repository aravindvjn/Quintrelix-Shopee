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
  const {setCartItems,user} = useContext(UserContext)
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
