import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Pages/Context/context";

const Footer = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <div className="container">
        <footer className="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5  border-top">
          <div className="col mb-3 footer-links-div" style={{marginBottom:'0px'}}>
            <h5>Quick Links</h5>
            <ul className="nav flex-column">
              {user && (
                <li className="nav-item mb-2">
                  <Link id="not-link" to={"/profile"}>
                    Your account
                  </Link>
                </li>
              )}
              <li className="nav-item mb-2">
                <Link id="not-link" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link id="not-link" to={"/electronics"}   state={"Electronics"}>
                  Electronics
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link id="not-link" to={"/fashion"}  state={"Fashion"}>
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
