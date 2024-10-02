import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="container">
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
          <div className="col mb-3 footer-links-div">
            <h5>Quick Links</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link id="not-link" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link id="not-link" to={"/electronics"}>
                  Electronics
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link id="not-link" to={"/fashion"}>
                  Fashion
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link id="not-link" to={"/cart"}>
                  Cart
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link id="not-link" to={"/orders"}>
                  Orders
                </Link>
              </li>
            </ul>
          </div>
         
        </footer>
        <p>©{new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Footer;
