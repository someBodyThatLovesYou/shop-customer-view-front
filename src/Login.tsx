import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "./authContext";
import "./Login.css";
import rightThumbnail from "./assets/thumbnail/login.webp";

const Login = () => {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
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

  useEffect(() => {
    if (message === "User exists" && isAuthenticated) {
      navigate("/");
    }
  }, [message, navigate, isAuthenticated]);

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
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-web-page">
      <div className="container login-intire-page">
        <div className="login-body bg-light">
          <div className="login-form-section">
            <div className="form">
              <form className="login-form-body" onSubmit={handleSubmit}>
                <h1 className="login-form-title">Welcome back 👋</h1>
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
                  placeholder="Phone"
                  required
                />
                <button type="submit">
                  <strong>Log In</strong>
                </button>
                <h6 className="login-form-sign-up">
                  <span className="d-h-a-a">Dont have an account?</span>
                  <a href="/SignUp">Sign Up</a>
                </h6>
              </form>
            </div>
          </div>
          <div className="login-image-section">
            <div className="login-image-label">
              <img src={rightThumbnail} alt="thumbnail" />
            </div>
          </div>
        </div>

        {/* {message === "User exists" && <h1> user Exicts</h1>} */}
        {/* {message === "User does not exist" && (
                <h1> take ur ass and go for a nauthty sign up !</h1>
              )} */}
        {/* {error && <p>Error: {error}</p>} */}
      </div>
    </div>
  );
};

export default Login;
