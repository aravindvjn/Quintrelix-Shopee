import React, { useEffect, useState } from "react";
import URL, { authURL } from "../../server";
import defaultPic from "../../assets/default.jpg";
import FetchingComponent from "../../components/FetchingComponent/FetchingComponent";

const PhoneAd = () => {
  const [fetchPhoneAd, setFetchPhoneAd] = useState();
  const loadingImage = defaultPic;
  const [image, setImage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await fetch(authURL + "api/advertisement", {
          method: "GET",
          credentials: "include",
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          });
        setFetchPhoneAd(results[0]);
      } catch (err) {
        console.error("Error in fetching data at Home.jsx", err);
      }
    };
    fetchData();
  }, []);
  const style1 = {
    backgroundImage: `url(${fetchPhoneAd ? fetchPhoneAd.image : loadingImage})`,
    backgroundSize: "cover",
  };

  if (!fetchPhoneAd) {
    return <FetchingComponent />;
  }
  return (
    <div className="phone-ad-parent">
      <div
        className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary phone-ad-background"
        style={style1}
      >
        {fetchPhoneAd && (
          <div className="col-md-6 p-lg-5 mx-auto my-5">
            <h1 className="display-3 fw-bold" style={{ color: "white" }}>
              {fetchPhoneAd.heading}
            </h1>
            <h3 className="fw-normal mb-3" style={{ color: "white" }}>
              {fetchPhoneAd.subheading}
            </h3>
            <div className="d-flex gap-3 justify-content-center lead fw-normal">
              <a
                style={{ color: "white", textDecoration: "none" }}
                href={fetchPhoneAd.learnmore}
                target="_blank"
              >
                Learn more
              </a>
              <a
                className="icon-link"
                style={{ color: "white", textDecoration: "none" }}
                href={fetchPhoneAd.buylink}
                target="_blank"
              >
                Visit
              </a>
            </div>
          </div>
        )}
        <div className="product-device shadow-sm d-none d-md-block"></div>
        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>
    </div>
  );
};

export default PhoneAd;
