import { useState, useEffect, useContext } from "react";
import { AuthContext, AuthContextType } from "./authContext";
import CreditCard from "./assets/thumbnail/credit-card.png";
import "./CheckOutPage.css";
import "./Invoice.css";
import "./RC.css";
import Rating from "./Rating"; // Import the Rating component
import { useNavigate } from "react-router-dom";

const CheckOutPage = () => {
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const { customer } = useContext(AuthContext) as AuthContextType;
  const [isOnline, setIsOnline] = useState(true);

  // billing page
  const [isBPage, setBPage] = useState(true);
  const BhandleChange = (e) => {
    setBFormData({ ...BformData, [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsOnline(!isChecked);
    if (isChecked) {
      setIsOnline(false);
      // setBFormData({ ...BformData, method: "in_location" });
    } else {
      setIsOnline(true);
      // setBFormData({ ...BformData, method: "" });
    }
  };
  const [BformData, setBFormData] = useState({
    customerId: customer.id,
    customerName: customer.name,
    city: "",
    country: "",
    state: "",
    postalCode: "",
    addressLineOne: "",
    addressLineTwo: "",
    status: "pending",
  });

  const [orderId, setOrderId] = useState();

  // check out page
  const [isCOPage, setCheckOutPage] = useState(false);
  const [COMessage, setCOMessage] = useState("");
  const [COError, setCOError] = useState();

  const COhandleSubmit = async (e) => {
    e.preventDefault();
    console.log("data sent");

    try {
      const response = await fetch(`${API_BASE_URL}/COOSF`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(BformData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setCOMessage(data.message);
      // Directly use data.order_id instead of relying on state update
      const orderIdFromResponse = data.order_id;
      setOrderId(orderIdFromResponse);
      // Pass orderIdFromResponse to fetch_COI
      fetch_COI(orderIdFromResponse);
    } catch (error) {
      setCOError(error.message);
    }

    if (isAllPaymentFilled()) {
      setSPage(true);
      setCheckOutPage(false);
      // console.log(orderId);
    }
  };

  // ending page (showing)
  const [isSPage, setSPage] = useState(false);
  const [showingMessage, setShowingMessage] = useState("");
  const [SError, setSError] = useState();
  const [SInfo, setSInfo] = useState([]);
  const [totalCost, setTotalCost] = useState();
  const [invoiceDate, setInvoiceDate] = useState();

  // Rating and comment page
  const [isRCPage, setRCPage] = useState(false);
  const [RCMessage, setRCMessage] = useState("");
  const [RCError, setRCError] = useState();
  const [CRformData, setCRformData] = useState({
    customerId: customer.id,
    rate: 0,
    comment: "",
  });

  const handleCRchange = (e) => {
    const { name, value } = e.target;
    setCRformData({ ...CRformData, [name]: value });

    // setCRformData({ ...CRformData, [e.target.name]: e.target.value });
  };

  const fetch_COI = async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/Invoice/${orderId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const invoiceData = data[0];
      setTotalCost(invoiceData.total_amount);
      setInvoiceDate(invoiceData.date);
    } catch (error) {
      setSError(error.message);
    }
  };

  const [cardNumber, setCardNumber] = useState("");
  const CardNumberHandleChageCombined = (e) => {
    let value = e.target.value;
    value = value.replace(/\D+/g, "");
    value = value.replace(/(\d{4})/g, "$1 ").trim();
    setCardNumber(value);
    // setCOFormData({ ...COformData, [e.target.name]: e.target.value})
  };

  const [CVVCard, setCVVCard] = useState("");
  const CVVCardhandleChangeCombined = (e) => {
    let value = e.target.value;
    // Remove all non-numeric characters
    value = value.replace(/\D+/g, "");
    // Limit the input to 4 digits
    if (value.length > 3) {
      value = value.slice(0, 3);
    }
    // Add a space after every 4 digits
    value = value.replace(/(\d{4})/g, "$1 ").trim();
    setCVVCard(value);
    // setCOFormData({ ...COformData, [e.target.name]: e.target.value})
  };

  const areAllFieldsFilled = () => {
    return (
      BformData.city &&
      BformData.country &&
      BformData.state &&
      BformData.postalCode &&
      BformData.addressLineOne
    );
  };

  const isAllPaymentFilled = () => {
    return cardNumber && CVVCard;
  };

  const BillingHandleNextClicker = () => {
    if (isOnline) {
      setCheckOutPage(true);
      setBPage(false);
      console.log("Navigating to Check Out page");
    } else {
      const sendInLocationMethod = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/COOSF`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(BformData),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          console.log(data.message);
        } catch (error) {
          console.log(error.message);
        }
      };
      setBPage(false);
      setRCPage(true);

      sendInLocationMethod();
    }
  };

  const handleInvoiceNexeClick = () => {
    setSPage(false);
    setRCPage(true);
  };

  const sendRaCinfo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/RaC`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CRformData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setRCMessage(data.message);
      if (RCMessage === "success") {
        console.log("SUCCESS");
      }
    } catch (error) {
      setRCError(error.message);
    }
  };

  const RCdisableHandle = () => {
    return CRformData.rate !== 0 && CRformData.comment;
  };

  const handleRCsubmit = () => {
    sendRaCinfo();
    navigate(`/Cart/${customer.name}`);
  };

  return (
    <>
      {/* billing page */}
      <div className="container billing-Page">
        {
          /* !isRCPage && !isCOPage && !isSPage && */ isBPage && (
            <>
              <div className="billing-form-label">
                <form className="billing-form">
                  <div className="header">
                    <h2>
                      <strong>Billing details</strong>
                    </h2>
                  </div>
                  <div className="form-items">
                    <div>City</div>
                    <input
                      type="text"
                      name="city"
                      value={BformData.city}
                      onChange={BhandleChange}
                      placeholder="city in here"
                      required
                    />
                  </div>
                  <div className="form-items">
                    <div>Country</div>
                    <input
                      type="text"
                      name="country"
                      value={BformData.country}
                      onChange={BhandleChange}
                      placeholder="country in here"
                      required
                    />
                  </div>
                  <div className="form-items">
                    <div>State</div>
                    <input
                      type="text"
                      name="state"
                      value={BformData.state}
                      onChange={BhandleChange}
                      placeholder="state in here"
                      required
                    />
                  </div>
                  <div className="form-items">
                    <div>Postal code</div>
                    <input
                      type="number"
                      name="postalCode"
                      value={BformData.postalCode}
                      onChange={BhandleChange}
                      placeholder="postal code in here"
                      required
                    />
                  </div>
                  <div className="form-items">
                    <div>First address</div>
                    <input
                      type="text"
                      name="addressLineOne"
                      value={BformData.addressLineOne}
                      onChange={BhandleChange}
                      placeholder="first address in here"
                      required
                      maxLength={255}
                    />
                  </div>
                  <div className="form-items">
                    <div>
                      Second address <span>(optional)</span>
                    </div>
                    <input
                      type="text"
                      name="addressLineTwo"
                      value={BformData.addressLineTwo}
                      onChange={BhandleChange}
                      placeholder="second address in here if you want"
                      maxLength={255}
                    />
                  </div>
                  <div className="form-items method-check-box">
                    <span className="title-method">
                      Payment method <span>(empty if online)</span>
                    </span>
                    <input
                      type="checkbox"
                      className="form-check"
                      name="method"
                      // value={BformData.method}
                      checked={!isOnline}
                      onChange={handleCheckboxChange}
                      placeholder="payment method"
                    />
                  </div>
                  <div className="next-stage-button-label">
                    <button
                      className="next-stage-button"
                      onClick={BillingHandleNextClicker}
                      disabled={!areAllFieldsFilled()} // Disable the button if not all fields are filled
                    >
                      Next <i className="fa-solid fa-caret-right"></i>
                    </button>
                  </div>
                </form>
              </div>
            </>
          )
        }
      </div>

      {/* check out page */}
      <div className="container CO-page">
        {COError && (
          <div>
            <p>
              <span className="text-danger">Error: </span>
              {COError}
            </p>
          </div>
        )}
        {!COError && (
          <>
            {
              /* !isRCPage && !isBPage && !isSPage && */ isCOPage &&
                isOnline && (
                  <>
                    <div className="CheckOut-form-label">
                      <div className="left">
                        <img src={CreditCard} alt="" />
                      </div>
                      <div className="right">
                        <form
                          className="CheckOut-form"
                          onSubmit={COhandleSubmit}
                        >
                          <div className="form-item title">
                            <strong>Bank</strong>
                          </div>
                          <div className="form-item Card-number">
                            <input
                              type="text"
                              placeholder="1233 1233 1231 1231"
                              onChange={CardNumberHandleChageCombined}
                              value={cardNumber}
                              maxLength={19}
                            />
                          </div>
                          <div className="form-item CVV">
                            <span className="text-success CVV-text">
                              <strong>CVV </strong>
                            </span>
                            <input
                              type="text"
                              placeholder="123"
                              min={0}
                              onChange={CVVCardhandleChangeCombined}
                              value={CVVCard}
                            />
                          </div>
                          <div className="button-COsubmit">
                            <button
                              type="submit"
                              disabled={!isAllPaymentFilled()}
                            >
                              <i className="fa-solid fa-caret-right"></i>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </>
                )
            }
          </>
        )}
      </div>

      {/* showing page */}
      <div className="container S-page">
        {SError && (
          <div>
            <p>
              <span className="text-danger">Error: </span>
              {SError}
            </p>
          </div>
        )}
        {!SError && (
          <>
            {isSPage && isOnline && (
              <>
                <div className="Showing-section-label">
                  <div className="Showing-section">
                    <div className="top rounded-5">
                      <div className="body">
                        <div className="icon">
                          <div className="back-tick">
                            <div className="tick">
                              <i className="fa-sharp fa-solid fa-check"></i>
                            </div>
                          </div>
                        </div>
                        <div className="content">
                          <p>Payment Success!</p>
                          <h1>
                            <span>$ {totalCost}</span>
                          </h1>
                        </div>
                      </div>
                    </div>

                    <div className="middle rounded-5">
                      <div className="body">
                        <div className="up">
                          <div className="">
                            <h4>Payment Details</h4>
                          </div>
                        </div>
                        <div className="middle-content-section">
                          <div className="its-rowing">
                            <span>Order Number</span>
                            <div>{orderId}</div>
                          </div>
                          <div className="its-rowing">
                            <span>Payment Status</span>
                            <div>
                              <span className="success-detail-background">
                                <i className="fa-sharp fa-solid fa-check"></i>
                              </span>{" "}
                              Success
                            </div>
                          </div>
                          <div className="its-rowing">
                            <span>Payment Time</span>
                            <div>{invoiceDate}</div>
                          </div>
                          <div className="total-pay-bottom">
                            <span>Total Payment</span>
                            <h4>$ {totalCost}</h4>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bottom rounded-5">
                      <div className="content">
                        <button
                          onClick={handleInvoiceNexeClick}
                          className="rounded-5"
                        >
                          <i className="fa-sharp fa-light fa-caret-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* rating and comment page */}
      <div className="costainer RC-page">
        {RCError && (
          <div>
            <p>
              <span className="text-danger">Error: </span>
              {RCError}
            </p>
          </div>
        )}
        {!RCError && (
          <>
            {isRCPage && (
              <>
                <div className="RateAndComment-form-label">
                  <form className="RateAndComment-form">
                    <div className="RC-form-item comment-section">
                      <textarea
                        name="comment"
                        onChange={handleCRchange}
                        value={CRformData.comment}
                        placeholder="comment .."
                      />
                    </div>

                    <Rating
                      value={CRformData.rate}
                      onChange={(newRating) =>
                        setCRformData({ ...CRformData, rate: newRating })
                      }
                    />

                    <div className="label-buttons">
                      <a href={`/Cart/${customer.name}`}>NO</a>
                      <button
                        onClick={handleRCsubmit}
                        disabled={!RCdisableHandle()}
                        className="button-RC-form-subm"
                        type="submit"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CheckOutPage;
