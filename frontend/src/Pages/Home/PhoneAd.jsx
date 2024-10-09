import React, { useEffect, useState } from "react";
import URL from "../../server";

const PhoneAd = () => {

    const [fetchBanner, setFetchBanner] = useState();
    const loadingImage =
      "https://cdn.dribbble.com/users/1053052/screenshots/3600670/_____.gif";
    const [image, setImage] = useState(1);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const results = await fetch(URL+ "banner")
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              return data;
            });
          setFetchBanner(results[3]);
        } catch (err) {
          console.error("Error in fetching data at Home.jsx", err);
        }
      };
      fetchData();
    }, []);
    const style1={backgroundImage:`url(${fetchBanner? fetchBanner.image : loadingImage})`,backgroundSize:'cover',borderRadius:'10px'}
  return (
    <div className="phone-ad-parent">
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary" style={style1} >
        <div className="col-md-6 p-lg-5 mx-auto my-5" >
          <h1 className="display-3 fw-bold" style={{color:'white'}}>Designed for engineers</h1>
          <h3 className="fw-normal mb-3" style={{color:'white'}}>
            Build anything you want with Aperture
          </h3>
          <div className="d-flex gap-3 justify-content-center lead fw-normal">
            <a  style={{color:'white'}} href="#">
              Learn more
            </a>
            <a className="icon-link" style={{color:'white'}} href="#">
              Buy
            </a>
          </div>
        </div>
        <div className="product-device shadow-sm d-none d-md-block"></div>
        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>
    </div>
  );
};

export default PhoneAd;
