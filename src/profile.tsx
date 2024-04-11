import React, { useState, useEffect } from "react";
import { AuthContext, AuthContextType } from "./authContext";
import "./Profile.css";
import ingagedOrder from "./assets/thumbnail/tracking.png";

const Profile = () => {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const BASE = import.meta.env.VITE_DEPLOY_BASE_ORIGIN

  const { setIsAuthenticated, customer, setCustomer } = React.useContext(
    AuthContext
  ) as AuthContextType;

  // const [loading, setLoading] = useState(true);

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

  const [profError, setProfError] = useState<string | undefined>();
  const [showMessage, setShowMessage] = useState("");

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
      const messageData = await response.json();
      if (messageData === "customer successfully updated") {
        setShowMessage("information successfully updated!");
      } else {
        setShowMessage("there is something wrong!");
      }
      if (!response.ok) {
        console.error("Failed to update profile");
      }
    } catch (error) {
      setProfError((error as Error).message);
    }
  };

  async function fetchCustomerProfile(custId : string) {
    try {
      const response = await fetch(`${API_BASE_URL}/customerProfile/${custId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const customerProfile = await response.json();
      // Extracting specific fields from the customerProfile object
      const { id, name, email, phone, registration_date, image } =
        customerProfile;
      console.log(id, name, email, phone, registration_date, image);

      // Update the customer state with the fetched data
      const CustomerData = {
        id: id, // Assuming this is the ID
        name: name, // Assuming this is the name
        email: email, // Assuming this is the email
        phone: phone, // Assuming this is the phone number
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

  const [orders, setOrders] = useState([
    { id: "", total_amount: "", status: "", date: "" },
  ]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | undefined>();
  const [isOrdersIngageEmpty, setIsOrdersIngageEmpty] = useState<boolean>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/ordersIngageCustomer/${customer.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (!data.length) {
          setIsOrdersIngageEmpty(true);
        } else {
          setIsOrdersIngageEmpty(false);
        }
        setOrders(data);
        setOrdersLoading(false);
      } catch (error) {
        setOrdersError((error as Error).message);
        setOrdersLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const [HistOrders, setHistOrders] = useState([
    { id: "", total_amount: "", status: "", date: "" },
  ]);
  const [HistOrdersLoading, setHistOrdersLoading] = useState(true);
  const [HistOrdersError, setHistOrdersError] = useState<string | undefined>();
  const [isOrdersHistEmpty, setIsOrdersHistEmpty] = useState<boolean>();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/ordersHistoryCustomer/${customer.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (!data.length) {
          setIsOrdersHistEmpty(true);
        } else {
          setIsOrdersHistEmpty(false);
        }
        setHistOrders(data);
        setHistOrdersLoading(false);
      } catch (error) {
        setHistOrdersError((error as Error).message);
        setHistOrdersLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const statusCheck = (status : string) => {
    if (status === "canceled") {
      return "text-danger";
    } else if (status === "completed") {
      return "text-success";
    } else if (status === "sent") {
      return "text-primary";
    } else {
      return "";
    }
  };

  const [ans, setAns] = useState([
    { cus_date: "", feedback: "", admin_name: "", ans_date: "", answer: "" },
  ]);
  const [ansLoading, setAnsLoading] = useState(true);
  const [ansError, setAnsError] = useState<string | undefined>();
  const [isAnsEmpty, setIsAnsEmpty] = useState<boolean>();

  useEffect(() => {
    const fetchAns = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/FeedAnsR/${customer.id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (!data.length) {
          setIsAnsEmpty(true);
        } else {
          setIsAnsEmpty(false);
        }
        setAns(data);
        setAnsLoading(false);
      } catch (error) {
        setAnsError((error as Error).message);
        setAnsLoading(false);
      }
    };

    fetchAns();
  }, []);

  const [alertShown, setAlertShown] = useState(false);

  return (
    <div className="page-label">
      <div className="page">
        <div className="sidebar">
          <a href={`/${BASE}/`} className="home">
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
        <div className="main position-relative">
          {isProfPage && profError && (
            <>
              <div className="container">
                <span className="text-danger">Error: </span> {profError}
              </div>
            </>
          )}
          {!profError && isProfPage && (
            <>
              <div className="profile-body">
                {/* notification body */}
                <div
                  className={`${
                    alertShown || "d-none"
                  } end-0 top-0 z-1 position-absolute py-2 pr-4 m-4 alert alert-primary fade-alert alert-dismissible`}
                  role="alert"
                >
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={() => setAlertShown(false)}
                  ></button>
                  <span>
                    <strong className="fs-4">{showMessage}</strong>
                  </span>
                </div>
                <form onSubmit={handleSubmit} className="PP-profile-label">
                  <div className="left flex-column">
                    <span className="align-self-start">Email</span>
                    <input
                      className="ms-5"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                  <div className="middle">
                    <div className="PP-img-label">
                      <span>Name</span>
                      <input
                        className="name-input-section"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                      />
                      <img src={image} alt="prof" />
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
                        placeholder="file"
                      />
                    </div>
                  </div>
                  <div className="right flex-column position-relative">
                    <span className="align-self-start">Phone</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone"
                    />
                    <button
                      className="position-absolute top-0 end-0 submit-button"
                      type="submit"
                      onClick={() => setAlertShown(true)}
                    >
                      <i className="fa-solid fa-check"></i> update
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

          {isIngagePage && ordersError && (
            <>
              <div className="container">
                <span className="text-danger">Error: </span> {ordersError}
              </div>
            </>
          )}
          {isIngagePage && ordersLoading && (
            <>
              <div className="container">
                <span className="text-danger">Loading .. </span>
              </div>
            </>
          )}
          {!ordersLoading && !ordersError && isIngagePage && (
            <div className="track-body">
              <h1>Track order</h1>
              <hr />
              {orders.map((order) => (
                <>
                  <div className="order-body">
                    <span className="text-capitalize text-warning">
                      <strong>{order.id}</strong>
                    </span>
                    <div className="total_amount">
                      <div className="total">
                        <span>total: </span>
                        {order.total_amount}
                      </div>
                    </div>
                    <div className="status">
                      <div>
                        <span>status: </span>
                        <i className={statusCheck(order.status)}>
                          {order.status}
                        </i>
                      </div>
                    </div>
                    <div className="date">
                      <p>{order.date}</p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          )}
          {isIngagePage && isOrdersIngageEmpty && (
            <div className="fs-1 position-absolute">
              <strong>EMPTY</strong>
            </div>
          )}

          {isHistPage && HistOrdersError && (
            <>
              <div className="container">
                <span className="text-danger">Error: </span> {HistOrdersError}
              </div>
            </>
          )}
          {isHistPage && HistOrdersLoading && (
            <>
              <div className="container">
                <span className="text-danger">Loading .. </span>
              </div>
            </>
          )}
          {!HistOrdersError && !HistOrdersLoading && isHistPage && (
            <>
              <div className="hist-body">
                <h1>Order history</h1>
                <hr />
                {HistOrders.map((order) => (
                  <>
                    <div className="order-body-history">
                      <span className="text-capitalize text-warning">
                        <strong>{order.id}</strong>
                      </span>
                      <div className="total_amount">
                        <div className="total">
                          {/* {"    "} */}
                          <span>total: </span>
                          {order.total_amount}
                        </div>
                      </div>
                      <div className="status">
                        <div>
                          <span>status: </span>
                          <i className={statusCheck(order.status)}>
                            {order.status}
                          </i>
                        </div>
                      </div>
                      <div className="date">
                        <p>{order.date}</p>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
          {isHistPage && isOrdersHistEmpty && (
            <div className="fs-1 position-absolute">
              <strong>EMPTY</strong>
            </div>
          )}

          {isAnsPage && ansError && (
            <>
              <div className="container">
                <span className="text-danger">Error: </span> {ansError}
              </div>
            </>
          )}
          {isAnsPage && ansLoading && (
            <>
              <div className="container">
                <span className="text-danger">Loading .. </span>
              </div>
            </>
          )}
          {!ansError && !ansLoading && isAnsPage && (
            <div className="ans-body">
              {ans.map((answer) => (
                <div className="answer">
                  <div className="top">
                    <div className="body">
                      <div className="top">
                        <span>{customer.name}</span>
                        <p>{answer.cus_date}</p>
                      </div>
                      <div className="bottom">{answer.feedback}</div>
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="top">
                      <span className="ms-3 text-primary">
                        {answer.admin_name}
                      </span>
                      <span className="adDate">{answer.ans_date}</span>
                    </div>
                    <div className="bottom">{answer.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {isAnsPage && isAnsEmpty && (
            <div className="fs-1 position-absolute">
              <strong>EMPTY</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
