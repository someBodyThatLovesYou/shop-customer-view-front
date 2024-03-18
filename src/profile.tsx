import React, { useContext } from "react";
import { AuthContext, AuthContextType } from "./authContext";
import './Profile.css'

const profile = () => {
  const { isAuthenticated, setIsAuthenticated, customer, setCustomer } =
    useContext(AuthContext) as AuthContextType;

  return (
    <div className="container">
      <div>Profile</div>
      <div className="">{customer.name}</div>
      <div className="">{customer.email}</div>
      <div className="">{customer.phone}</div>
      <button onClick={() => setIsAuthenticated(false)}>log out</button>
      <div className="PP-profile-label">
        <img src={`data:image/png;base64,${customer.image}`} alt="prof" />
      </div>
    </div>
  );
};

export default profile;
