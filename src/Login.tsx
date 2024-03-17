import React, { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const Login = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState();

  const sendFormData = async (data) => {
    // console.log("form data sent");
    try {
      const response = await fetch(`${API_BASE_URL}/Lgin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendFormData(formData);
  };

  return (
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
      <button type="submit">Submit</button>
      {/* {message === "User exists" && <h1> user Exicts</h1>} */}
      {/* {message === "User does not exist" && (
        <h1> take ur ass and go for a nauthty sign up !</h1>
      )} */}
      {/* {error && <h2>Error: {error}</h2>} */}
    </form>
  );
};

export default Login;
