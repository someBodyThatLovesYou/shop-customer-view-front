import React, { useState } from "react";
import { AuthContext, AuthContextType } from "./authContext";
import "./SignUp.css";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState();
  const [file, setFile] = useState(null);

  // const { customer, setCustomer } =
  //   React.useContext(AuthContext) as AuthContextType;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    image: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFile(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        formData.image = base64data;

        try {
          const response = await fetch(`${API_BASE_URL}/SignUp`, {
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
          setMessage(RD.message);
        } catch (error) {
          setError(error.message);
        }
      };
    } else {
      try {
        const response = await fetch(`${API_BASE_URL}/SignUp`, {
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
        setMessage(RD.message);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="signUp-intire-page">
      <div className="container signUp-intire-body bg-red">
        <div className="signUp-form-body">
          <form className="SignUp-form" onSubmit={handleSubmit}>
            <h1>
              Register{" "}
              <span className="SignUp-form-regist-prank">its free.</span>
            </h1>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email"
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
              <input
                type="file"
                name="image"
                className="form-control"
                onChange={handleChange}
                placeholder="Upload Image"
              />
            <div className="signUp-form-button-label"><button type="submit">Sign Up</button></div>
            {message === "User already exists" && <h1> User already exists</h1>}
            {message === "User registered successfully" && (
              <h1> User registered successfully !</h1>
            )}
            {error && <h2>Error: {error}</h2>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
