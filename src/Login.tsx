import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext, AuthContextType } from "./authContext";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, customer, setCustomer } =
    useContext(AuthContext) as AuthContextType;

    const navigate = useNavigate(); // Get the navigate function


  const [message, setMessage] = useState("");
  const [error, setError] = useState();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data sent");

    try {
      const response = await fetch(`${API_BASE_URL}/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const RD = await response.json();
      setMessage(RD.message); // Assuming the response has a 'message' field
      message === "User exists" && setIsAuthenticated(true);
      const CustomerData = {
        id: RD.id, // Assuming this is the ID
        name: RD.name, // Assuming this is the name
        email: RD.email, // Assuming this is the email
        phone: RD.phone, // Assuming this is the phone number
        registration_date: RD.date, // Assuming this is the registration date
        image: RD.image,
      };
      setCustomer(CustomerData);
      message && console.log(isAuthenticated);
      message === "User exists" && navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="phone number"
            required
          />
          <button type="submit">Login</button>
          {/* {message === "User exists" && <h1> user Exicts</h1>} */}
          {/* {message === "User does not exist" && (
                <h1> take ur ass and go for a nauthty sign up !</h1>
              )} */}
          {/* {error && <h2>Error: {error}</h2>} */}
        </form>
        <a href="/SignUp">Sign Up</a>
        {error && <h2>Error: {error}</h2>}
        {/* if error was equal to 'network responce was not ok', then in a notife, say 'user or Phone incorrect' */}
      </div>
    </>
  );
};

export default Login;
