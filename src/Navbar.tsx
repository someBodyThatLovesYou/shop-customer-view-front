import {
  /*  React, */
  useContext,
  //  useState
} from "react";
import "./navbar.css";
import Logo from "/icons8-stellarium-logo.svg";
import { AuthContext, AuthContextType } from "./authContext";

const Navbar = () => {
  const { isAuthenticated, customer } = useContext(
    AuthContext
  ) as AuthContextType;

  const userName = isAuthenticated ? customer.name : "";

  return (
    <>
      <header className="navHeader rounded container text-dark">
        <div className="navHeader-item logo-item">
          <a href="/" data-tooltip="logo">
            <img src={Logo} alt="Logo" />
          </a>
        </div>
        <div className="navHeader-item search-item">
          <div className="search-bar">
            <a href={`/Search`}>Search In Products ..</a>
          </div>
        </div>
        <div className="navHeader-right-sec d-flex justify-content-center align-items-center">
          <div
            className={
              isAuthenticated
                ? `navHeader-item cart-shopping-item`
                : `navHeader-item cart-shopping-item d-none`
            }
          >
            <a href={`/Cart/${userName}`} data-tooltip="shopping cart">
              <i className="fa-duotone fa-cart-shopping"></i>
            </a>
          </div>
          <div
            className={
              isAuthenticated
                ? `navHeader-item profile-item`
                : `navHeader-item profile-item d-none`
            }
          >
            <a href={`/Profile/${userName}`} data-tooltip="profile page">
              <div className="rounded-circle profile-label">
                <img src={customer.image} alt="prof" />
              </div>
            </a>
          </div>
          <a href="/Login" className="navHeader-item login-signup">
            Login / SignUp
          </a>
        </div>
      </header>
    </>
  );
};

export default Navbar;
