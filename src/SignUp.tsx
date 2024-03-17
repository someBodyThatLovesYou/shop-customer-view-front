import React, { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setMessage(RD.message); // Assuming the response has a 'message' field
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
          <button type="submit">Sign Up</button>
          {/* {message === "User already exists" && <h1> User already exists</h1>} */}
          {/* {message === "User registered successfully" && (
        <h1> User registered successfully !</h1>
      )} */}
          {/* {error && <h2>Error: {error}</h2>} */}
        </form>
      </div>
    </>
  );
};

export default SignUp;
