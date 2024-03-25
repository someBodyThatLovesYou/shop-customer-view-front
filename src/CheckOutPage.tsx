import { useState, useEffect, useContext } from "react";
import { AuthContext, AuthContextType } from "./authContext";
import "./CheckOutPage.css";
import CreditCard from "./assets/thumbnail/credit-card.png";

const CheckOutPage = () => {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const { customer } = useContext(AuthContext) as AuthContextType;

  // billing page
  const [isBPage, setBPage] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
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
    } catch (error) {
      setCOError(error.message);
    }
  };

  // ending page (showing)
  const [isSPage, setSPage] = useState(false);
  const [showingMessage, setShowingMessage] = useState("");
  const [SError, setSError] = useState();

  // Rating and comment page
  // const [isRCPage, setRCPage] = useState(false);
  // const [RCMessage, setRCMessage] = useState("");
  // const [RCError, setRCError] = useState();

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
      setSPage(true);

      sendInLocationMethod();
    }
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
                    <div>Address line 1</div>
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
                      Address line 2 <span>(optional)</span>
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
                          <button
                            type="submit"
                            disabled={!isAllPaymentFilled()}
                          >
                            go
                          </button>
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
            {isSPage && (
              <>
                <div className="Showing-form-label">
                  kjafsdj
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* rating and comment page */}
      {/* <div className="costainer RC-page">
        {RCError && (
          <div>
            <p>
              <span className="text-danger">Error: </span>
              {RCError}
            </p>
          </div>
        )}
      </div> */}
    </>
  );
};

export default CheckOutPage;
