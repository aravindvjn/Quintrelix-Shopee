import React, { useContext, useEffect, useState } from "react";
import "./TrackInfo.css";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import CartLoginWarning from "../Cart/CartLoginWarning";
import Footer from "../../components/Footer";
import { UserContext } from "../Context/Context";
const TrackInfo = () => {
  const {user} = useContext(UserContext)
  const location = useLocation();
  const [dateShow, setDateShow] = useState();
  const [show, setShow] = useState(true);
  const { state } = location;
  const { order_date } = location.state.order;
  const [activePoints, setActivePoints] = useState(Array(5).fill(false));
  useEffect(() => {
    const dateFetch = () => {
      const dateObject = new Date(state.order.order_date);
      dateObject.setDate(dateObject.getDate() + 5);
      const formattedDate = dateObject.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      });
      setDateShow(formattedDate);
    };
    dateFetch();
    const today = new Date();
    const input = new Date(order_date);
    const timeDifference = today - input;
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    const points = Array(5).fill(false);
    if (daysDifference > 5) {
      points.fill(true);
      setShow(false)
    } else if (daysDifference > 5) {
      points[0] = true;
      points[1] = true;
      points[2] = true;
      points[3] = true;
    } else if (daysDifference > 3) {
      points[0] = true;
      points[1] = true;
      points[2] = true;
    } else if (daysDifference > 1) {
      points[0] = true;
      points[1] = true;
    } else if (daysDifference > 0) {
      points[0] = true;
    }
    setActivePoints(points);
  }, []);

  if (!user) {
    return (
      <>
        <Header />
        <CartLoginWarning
          message={"Login to see the items you added previously"}
        />
        <Footer />
      </>
    );
  }
  return (
    <div>
      <Header />
      <div className="track-info-parent">
        <div>
          <h3>Track Your Package</h3>
          {activePoints.map((isActive, index) => (
            <div key={index} className="tracking-item">
              <div className={`tracking-point ${isActive ? "active" : ""}`} />
              <div className="tracking-label">
                {index === 0 && "Order Confirmation"}
                {index === 1 && "Packaging"}
                {index === 2 && "Shipping"}
                {index === 3 && "Out for Delivery"}
                {index === 4 && "Delivered"}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="track-info-parent">
       {show ?  <h5><em>Expected Date :</em> {dateShow}</h5> : <h5><em>Delivered on :</em> {dateShow}</h5>}
      </div>
    </div>
  );
};

export default TrackInfo;
