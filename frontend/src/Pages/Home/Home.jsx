import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PhoneAd from "./PhoneAd";
import AdSlider from "./AdSlider";
import "./Home.css";
import ElectronicsSlider from "./ElectronicsSlider";
import URL from "../../server";
import { UserContext } from "../Context/Context";
import Notice from "../../components/Notice/Notice";
import GlobalLoading from "../../components/Loading/GlobalLoading";

const Home = ({ admin }) => {
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
