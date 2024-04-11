import React from "react";
import MainThumbnail from "./main_thumbnail";
import ProductMainFetch from "./ProductList";
import CategoryMainFetch from "./CategoryList";
import { AuthContext, AuthContextType } from "./authContext";

const ShopBody = () => {
  const { customer, isAuthenticated } = React.useContext(
    AuthContext
  ) as AuthContextType;
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  const [message, setMessage] = React.useState();
  const [orderHistoryId, setOrderHistoryId] = React.useState();
  const [orderId, setOrderId] = React.useState();
  const [newStatus, setNewStatus] = React.useState<string>();

  React.useEffect(() => {
    const fetchChangeStatus = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/updatedStatusOrder/${customer.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMessage(data.message);
        setOrderHistoryId(data.id);
        setOrderId(data.order_id);
        setNewStatus(data.status);

        // data.map((each) => {
        //   console.log("id: " + each.id + ";" + "status: " + each.status);
        // });
      } catch (error) {
        console.error((error as Error).message);
      }
    };

    if (isAuthenticated) {
      fetchChangeStatus();
    }

    const intervalId = setInterval(fetchChangeStatus, 5000);
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const [showAlert, setShowAlert] = React.useState(false);

  React.useEffect(() => {
    if (
      message !== "there is not any data for this customer !!" &&
      isAuthenticated
    ) {
      const timer = setTimeout(() => {
        setShowAlert(true); // Set showAlert to true after 700ms
      }, 700);
      return () => clearTimeout(timer); // Clear the timeout if the component unmounts
    }
  }, [message, isAuthenticated]);

  const statusCheck = (status: string) => {
    if (status === "canceled" || status === "canceled ") {
      return "text-danger";
    } else if (status === "completed") {
      return "text-success";
    } else if (status === "sent") {
      return "text-primary";
    } else {
      return "";
    }
  };

  const letAlertToBeShown = () => {
    // Check if this alert has been shown before
    if (message !== "there is not any data for this customer !!") {
      const alertShown = localStorage.getItem(`alert-${orderHistoryId}`);
      return (
        <div
          className={`${
            alertShown && "d-none"
          } end-0 position-fixed m-4 w-25 alert alert-primary fade-alert alert-dismissible`}
          role="alert"
        >
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() =>
              localStorage.setItem(`alert-${orderHistoryId}`, "shown")
            }
          ></button>
          <span>
            Status of order no.
            <strong className="text-danger">{orderId}</strong> changed to '
            <strong className={statusCheck(newStatus || "")}>{newStatus}</strong>'
          </span>
        </div>
      );
    }
  };

  return (
    <>
      <div className="container px-5">{showAlert && letAlertToBeShown()}</div>
      <MainThumbnail />
      <div className="container main-prod-sec mt-5 rounded-5">
        <div className="row rounded">
          <CategoryMainFetch />
          <ProductMainFetch />
        </div>
      </div>
    </>
  );
};
export default ShopBody;
