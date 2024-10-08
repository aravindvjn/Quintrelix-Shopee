import React, { useEffect, useState } from "react";
import "./TrackInfo.css";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
const TrackInfo = () => {
  const location = useLocation();
  const { order_date } = location.state.order;
  console.log(order_date);
  const [activePoints, setActivePoints] = useState(Array(5).fill(false));
  useEffect(() => {
    const dateObject = new Date(order_date);

    const points = Array(5).fill(false);
    if (dateObject.getDate() + 4 < new Date().getDate()) {
      points.fill(true);
    } else if ((dateObject.getDate() + 3) < new Date().getDate()) {
      points[0] = true;
      points[1] = true;
      points[2] = true;
      points[3] = true;
    } else if ((dateObject.getDate() + 2 )< new Date().getDate()) {
      points[0] = true;
      points[1] = true;
      points[2] = true;
    } else if ((dateObject.getDate() + 1) < new Date().getDate()) {
      points[0] = true;
      points[1] = true;
    } else if (dateObject.getDate() < new Date().getDate()) {
      points[0] = true;
    }
    setActivePoints(points);
  }, []);

  return (
    <div>
      <Header />
      <div className="track-info-parent">
        <div className="container">
          <h1>Track Your Package</h1>
          <div className="tracking-line">
            {activePoints.map((isActive, index) => (
              <div
                key={index}
                className={`tracking-point ${isActive ? "active" : ""}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackInfo;
