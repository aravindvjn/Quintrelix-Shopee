import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../assets/Q-shopee.png'
import './Components.css'
import { UserContext } from "../Pages/Context/context";
import { authURL } from "../server";

const Header = ({admin}) => {
  const {user,setUser} = useContext(UserContext)
const history = useNavigate()
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
              <Link to={admin? '/customize':'/cart'} className="nav-link link-body-emphasis px-2">
              {admin? 'Customize':'Cart'}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={admin? '/admin/add-products':'/orders'} className="nav-link link-body-emphasis px-2">
                {admin? 'Add Products':'Orders'}
              </Link>
            </li>
          </ul>
          <ul className="nav">
            <li className="nav-item">
             {user? <Link to={'/profile'} className="nav-link link-body-emphasis px-2" style={{
              backgroundColor:"gold",
              borderRadius:"7px",
              padding:'3px',
              transform:'translateY(4px)'
             }}>{user.username}</Link>:  <Link to={'/login'} className="nav-link link-body-emphasis px-2">
                Login
              </Link>}
            </li>
            <li className="nav-item" onClick={async()=>{
              if(user){
                try{
                  const response = await fetch(authURL+"logout/")
                  console.log("response")
                  if(response.ok){
                    history("/")
                    console.log("OK")
                    setUser('')
                  }else{
                    history("/")
                  }
                }catch(err){
                  console.log("Error in logout",err)
                }
              }
            }}>
              <Link to={user?"/logout":'/signup'}  className="nav-link link-body-emphasis px-2">
                {user?"Logout" :"Sign up "}
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
