import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/Q-shopee.png'
import './Components.css'

const Header = ({admin}) => {
  return (
    <div>
      <nav className="py-2 bg-body-tertiary border-bottom">
        <div className="container d-flex flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item">
              <Link to={'/'}
                href="#"
                className="nav-link link-body-emphasis px-2 active"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/electronics'} className="nav-link link-body-emphasis px-2" state={"Electronics"}>
                Electronics
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/fashion'} className="nav-link link-body-emphasis px-2" state={"Fashion"}>
                Fashion
              </Link>
            </li>
            <li className="nav-item">
              <Link to={'/orders'} className="nav-link link-body-emphasis px-2">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to={admin? '/admin/add-products':'/profile'} className="nav-link link-body-emphasis px-2">
                {admin? 'Add Products':'Profile'}
              </Link>
            </li>
          </ul>
          <ul className="nav">
            <li className="nav-item">
              <Link href="#" className="nav-link link-body-emphasis px-2">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#" className="nav-link link-body-emphasis px-2">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <header className="py-3 mb-4 border-bottom">
        <div className="container d-flex flex-wrap justify-content-center">
          <Link
            to={"/"}
            className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none"
          >
            <img className="Q-logo" src={logo} alt="" />
          </Link>
          <form className="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
        </div>
      </header>
    </div>
  );
};

export default Header;
