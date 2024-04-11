import React, { useState, useEffect } from "react";
// import { AuthContext, AuthContextType } from "./authContext";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const BASE = import.meta.env.VITE_DEPLOY_BASE_ORIGIN

const SignUp = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [file, setFile] = useState<File | null>(null);

  // const { customer, setCustomer } =
  //   React.useContext(AuthContext) as AuthContextType;

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (target.name === "image") {
      setFile(target.files ? target.files[0] : null);
    } else {
      setFormData({ ...formData, [target.name]: target.value });
    }
  };

  useEffect(() => {
    if (message === "User registered successfully") {
      navigate(`/${BASE}/Login`);
    }
  }, [message, navigate]);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
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
          console.error((error as Error).message);
          setError((error as Error).message);
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
        console.error((error as Error).message);
        setError((error as Error).message);
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
            <div className="signUp-form-button-label">
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
        {message === "User already exists" && <h1> User already exists</h1>}
        {message === "User registered successfully" && (
          <h1> User registered successfully !</h1>
        )}
        {error === "Network response was not ok" && (
          <h2>Error: User already exist</h2>
        )}
      </div>
    </div>
  );
};

export default SignUp;
