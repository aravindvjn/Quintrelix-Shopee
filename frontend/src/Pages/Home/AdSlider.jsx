import React, { useEffect, useState } from "react";
import URL from "../../server";
import defaultPic from "../../assets/default.jpg";
import FetchingComponent from "../../components/FetchingComponent/FetchingComponent";
const AdSlider = () => {
  const [fetchBanner, setFetchBanner] = useState();
  const loadingImage = defaultPic;
  const [image, setImage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await fetch(URL + "banner",
           {
          method: "GET",
          credentials: "include",
        }
      )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            return data;
          });
        setFetchBanner(results);
      } catch (err) {
        console.error("Error in fetching data at Home.jsx", err);
      }
    };
    fetchData();
  }, []);
  if (!fetchBanner) {
    return <FetchingComponent />;
  }
  return (
    <div className="ad-slider-parent">
      <div className="bd-example m-0 border-0">
        <div
          id="carouselExampleIndicators"
          className="carousel slide pointer-event"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              id="carousel-indicators-button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className={image === 1 ? "active" : ""}
              aria-current="true"
              aria-label="Slide 1"
              fdprocessedid="jpnosm"
            ></button>
            <button
              id="carousel-indicators-button"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
              className={image === 2 ? "active" : ""}
              fdprocessedid="el68an"
            ></button>
            <button
              id="carousel-indicators-button"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              className={image === 3 ? "active" : ""}
              aria-label="Slide 3"
              fdprocessedid="sp1tjo"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className={`carousel-item ${image === 1 ? "active" : ""}`}>
              <img
                style={{ backgroundColor: "black" }}
                src={fetchBanner ? fetchBanner[0].image : loadingImage}
                className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width="800"
                height="400"
                role="img"
                aria-label="Placeholder: First slide"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              ></img>
            </div>
            <div className={`carousel-item ${image === 2 ? "active" : ""}`}>
              <img
                style={{ backgroundColor: "black" }}
                src={fetchBanner ? fetchBanner[1].image : loadingImage}
                className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width="800"
                height="400"
                role="img"
                aria-label="Placeholder: Second slide"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              ></img>
            </div>
            <div className={`carousel-item ${image === 3 ? "active" : ""}`}>
              <img
                style={{ backgroundColor: "black" }}
                src={fetchBanner ? fetchBanner[2].image : loadingImage}
                className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width="800"
                height="400"
                role="img"
                aria-label="Placeholder: Third slide"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              ></img>
            </div>
          </div>
          <button
            id="change-ad-slider-button"
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
            fdprocessedid="1bamp"
            onClick={() => {
              if (image > 1 && image <= 3) {
                setImage(image - 1);
              }
            }}
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            onClick={() => {
              if (image >= 1 && image < 3) {
                setImage(image + 1);
              }
            }}
            className="carousel-control-next"
            type="button"
            id="change-ad-slider-button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
            fdprocessedid="dd9c4l"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdSlider;
