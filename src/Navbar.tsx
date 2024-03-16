import React from "react";
import "./navbar.css";
import Logo from "/icons8-stellarium-logo.svg";

const header = () => {
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
            <input type="search" placeholder="Search In Products .." />
          </div>
        </div>
        <div className="navHeader-right-sec d-flex justify-content-center align-items-center">
          <div className="navHeader-item cart-shopping-item">
            <a 
              // href={`/Cart/${userName}`} 
              href="/Cart" 
              data-tooltip="cart shopping"  
            >
              <i className="fa-duotone fa-cart-shopping"></i>
            </a>
          </div>
          {/* if user loged in, then show this; else remove it completely from dom */}
          <div className="navHeader-item profile-item">
            <a 
              // href={`/Profile/${userName}`} 
              href="/Profile" 
              data-tooltip="profile page"
            >
              <div className="rounded-circle profile-label">prf</div>
            </a>
          </div>
          <a 
            // href={`/LoginSignUp/${userName}`} 
            href="/LoginSignUp" 
            className="navHeader-item login-signup"
          >
            Login / SignUp
          </a>
        </div>
      </header>
    </>
  );
};

export default header;
