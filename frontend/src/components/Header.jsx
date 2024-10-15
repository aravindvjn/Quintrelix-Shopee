import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/Qshopee.png";
import "./Components.css";
import { UserContext } from "../Pages/Context/Context";
import { authURL } from "../server";
import Search from "./Search/Search";
import Notice from "./Notice/Notice";
import WarningIcon from "@mui/icons-material/Warning";
const Header = () => {
  const { user, setUser } = useContext(UserContext);
  let admin;
  if (user) {
    admin = user.admin;
  }
  const location = useLocation();
  const [notice, setNotice] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await fetch(authURL + "api/user", {
          method: "GET",
          credentials: "include",
        });
        const data = await result.json();
        console.log("Header user",data)
        if (data) {
          setUser(data);
        } else {
          // setUser(false);
        }
        console.log("user in header", user, data);
      } catch (err) {
        console.error("Error in fetching User details");
      }
    };
    fetchUser();
    window.addEventListener("beforeunload", () => {
      localStorage.clear();
    });
    const messageShown = localStorage.getItem("message");
    if (!messageShown) {
      setNotice(true);
      localStorage.setItem("message", "true");
    }
  }, [location.pathname]);
  const history = useNavigate();
  return (
    <div className="header-parent">
      {notice && <Notice setNotice={setNotice} />}
      <nav className="py-2 bg-body-tertiary border-bottom">
        <div className="container d-flex flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item">
              <Link
                to={"/"}
                href="#"
                className="nav-link link-body-emphasis px-2 active"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/electronics"}
                className="nav-link link-body-emphasis px-2"
                state={"Electronics"}
              >
                Electronics
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={"/fashion"}
                className="nav-link link-body-emphasis px-2"
                state={"Fashion"}
              >
                Fashion
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={admin ? "/customize" : "/cart"}
                className="nav-link link-body-emphasis px-2"
              >
                {admin ? "Customize" : "Cart"}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to={admin ? "/admin/add-products" : "/orders"}
                className="nav-link link-body-emphasis px-2"
              >
                {admin ? "Add Products" : "Orders"}
              </Link>
            </li>
          </ul>
          <ul className="nav">
            <li className="nav-item">
              {user ? (
                <div className="header-account">
                  <Link
                    to={"/profile"}
                    className="nav-link link-body-emphasis px-2"
                    style={{
                      backgroundColor: "gold",
                      borderRadius: "7px",
                      padding: "3px",
                      textAlign: "center",
                      transform: "translateY(4px)",
                    }}
                  >
                    {user.username}
                  </Link>
                  <p className="your-account">Your account</p>
                </div>
              ) : (
                <Link
                  to={"/login"}
                  className="nav-link link-body-emphasis px-2"
                >
                  Login
                </Link>
              )}
            </li>
            {admin && (
              <li>
                <Link
                  to={"/admin/orders"}
                  className="nav-link link-body-emphasis px-2"
                >
                  Orders
                </Link>
              </li>
            )}
            <li
              className="nav-item nav-link link-body-emphasis px-2"
              onClick={async () => {
                if (user) {
                  try {
                    const response = await fetch(authURL + "logout/", {
                      method: "GET",
                      credentials: "include",
                    });
                    if (response.ok) {
                      history("/");
                      setUser("");
                    } else {
                      history("/");
                    }
                  } catch (err) {
                    console.log("Error in logout", err);
                  }
                } else {
                  history("/signup");
                }
              }}
            >
              {user ? "Logout" : "Sign up "}
            </li>
          </ul>
        </div>
      </nav>
      <header className="py-3 mb-4 border-bottom display-hide">
        <div className="container d-flex flex-wrap justify-content-center">
          <Link
            to={"/"}
            className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none"
          >
            <img className="Q-logo" src={logo} alt="" />
          </Link>
          <Search />
        </div>
      </header>
    </div>
  );
};

export default Header;
