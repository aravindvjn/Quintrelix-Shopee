import React from "react";

const AdSlider = () => {
  return (
    <div>
      <div className="bd-example m-0 border-0">
        <div
          id="carouselExampleIndicators"
          className="carousel slide pointer-event"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
              fdprocessedid="jpnosm"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
              fdprocessedid="el68an"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
              fdprocessedid="sp1tjo"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img style={{backgroundColor:'black'}}
                className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width="800"
                height="400"
                role="img"
                aria-label="Placeholder: First slide"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              ></img>
            </div>
            <div className="carousel-item">
              <img
                className="bd-placeholder-img bd-placeholder-img-lg d-block w-100"
                width="800"
                height="400"
                role="img"
                aria-label="Placeholder: Second slide"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              ></img>
            </div>
            <div className="carousel-item">
              <img
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
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
            fdprocessedid="1bamp"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
            fdprocessedid="dd9c4l"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdSlider;
