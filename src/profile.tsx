import React, { useState, useEffect } from "react";
import { AuthContext, AuthContextType } from "./authContext";
import "./Profile.css";
import ingagedOrder from "./assets/thumbnail/tracking.png";

const Profile = () => {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const { setIsAuthenticated, customer, setCustomer } = React.useContext(
    AuthContext
  ) as AuthContextType;

  const [loading, setLoading] = useState(true);

  const [isProfPage, setProfPage] = useState(true);
  const [isIngagePage, setIngagePage] = useState<boolean>(false);
  const [isHistPage, setHistPage] = useState<boolean>(false);
  const [isAnsPage, setAnsPage] = useState<boolean>(false);
  const [email, setEmail] = useState(customer.email);
  const [name, setName] = useState(customer.name); // State for name
  const [phone, setPhone] = useState(customer.phone); // State for phone
  const [image, setImage] = useState(customer.image); // State for image

  const handleIngageClick = () => {
    setIngagePage(true);
    setProfPage(false);
    setHistPage(false);
    setAnsPage(false);
  };

  const handleHistoryClick = () => {
    setHistPage(true);
    setProfPage(false);
    setIngagePage(false);
    setAnsPage(false);
  };

  const handleAnswerClick = () => {
    setAnsPage(true);
    setProfPage(false);
    setIngagePage(false);
    setHistPage(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          // Clear the old image data by setting the image state to null or an empty string
          setImage("");

          // Directly set the image state with the base64 data
          setImage(reader.result);
          // Assuming formData is an object you have defined elsewhere in your component
          // formData.image = reader.result;
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      // Start reading the file as a Data URL
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${API_BASE_URL}/updateCustomer/${customer.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name, phone, image }),
        }
      );
      if (!response.ok) {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  async function fetchCustomerProfile(custId) {
    try {
      const response = await fetch(`${API_BASE_URL}/customerProfile/${custId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const customerProfile = await response.json();
      // Extracting specific fields from the customerProfile object
      const { id, name, email, phone_number, registration_date, image } =
        customerProfile;

      // Update the customer state with the fetched data
      const CustomerData = {
        id: id, // Assuming this is the ID
        name: name, // Assuming this is the name
        email: email, // Assuming this is the email
        phone: phone_number, // Assuming this is the phone number
        registration_date: registration_date, // Assuming this is the registration date
        image: image,
      };
      setCustomer(CustomerData);
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    }
  }
  useEffect(() => {
    if (customer.id) {
      fetchCustomerProfile(customer.id);
    }
  }, [customer.id]);

  useEffect(() => {
    setEmail(customer.email);
    setName(customer.name);
    setPhone(customer.phone);
    // Convert customer image to base64 and set it to the state
    setImage(customer.image);
  }, [customer]);

  return (
    <div className="page-label">
      <div className="page">
        <div className="sidebar">
          <a href="/" className="home">
            <i className="fa-solid fa-house"></i>
            <h6>home</h6>
          </a>
          <button className="ingaged-orders" onClick={handleIngageClick}>
            <img src={ingagedOrder} alt="" />
            <h6>track</h6>
          </button>
          <button className="order-history" onClick={handleHistoryClick}>
            <i className="fa-duotone fa-rectangle-history"></i>
            <h6>history</h6>
          </button>
          <button className="answers" onClick={handleAnswerClick}>
            <i className="fa-solid fa-comments"></i>
            <h6>answer</h6>
          </button>
          <span className="log-out-label">
            <button onClick={() => setIsAuthenticated(false)}>LogOut</button>
          </span>
        </div>
        <div className="main">
          {isProfPage && (
            <div className="profile-body position-relative">
              <form onSubmit={handleSubmit} className="PP-profile-label">
                <div className="left">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div className="middle">
                  <div className="PP-img-label">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                    />
                    <img src={image} alt="prof" />
                    {/* <button className="edit">
                      <i className="fa-solid fa-pen"></i>
                      {"  "}edit
                    </button> */}
                    <button
                      className="edit"
                      onClick={() =>
                        document.getElementById("imageInput")?.click()
                      }
                    >
                      <i className="fa-solid fa-pen"></i>
                      {"  "}edit
                    </button>
                    <input
                      type="file"
                      id="imageInput"
                      className="d-none"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="right">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                  />
                </div>
                <button className="position-absolute" type="submit">
                  UPDATE
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
