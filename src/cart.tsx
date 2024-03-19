import React, { useEffect, useState, useContext } from "react";
import { AuthContext, AuthContextType } from "./authContext";
import "./Cart.css";

const ShoppingCart = () => {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [empty, setIsempty] = useState(true);

  const { customer } = useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cart/${customer.id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (!data.length) {
          setIsempty(true); // Set isempty to false if no items are fetched
        } else {
          setCartItems(data);
          setIsempty(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (customer.id) {
      fetchCartItems();
    }
  }, [customer.id, API_BASE_URL]);

  const increaseQuantity = async (event, id) => {
    event.preventDefault();
    event.stopPropagation();

    // Find the item in the cartItems array
    const itemIndex = cartItems.findIndex((item) => item.cart_id === id);

    // Increase the quantity by 1
    const updatedQuantity = cartItems[itemIndex].quantity + 1;
    console.log(`IN: ${updatedQuantity}`);

    // Update the item in the cartItems array
    const updatedCartItems = [...cartItems];
    updatedCartItems[itemIndex].quantity = updatedQuantity;
    setCartItems(updatedCartItems);

    // Send the updated quantity to the backend
    await updateCartItemQuantity(updatedQuantity, id);
  };

  const decreaseQuantity = async (event, id) => {
    event.preventDefault();
    event.stopPropagation();

    // Find the item in the cartItems array
    const itemIndex = cartItems.findIndex((item) => item.cart_id === id);

    // Decrease the quantity by 1
    const updatedQuantity = cartItems[itemIndex].quantity - 1;
    console.log(`DE: ${updatedQuantity}`);

    // Update the item in the cartItems array
    const updatedCartItems = [...cartItems];
    updatedCartItems[itemIndex].quantity = updatedQuantity;
    setCartItems(updatedCartItems);

    // Send the updated quantity to the backend
    await updateCartItemQuantity(updatedQuantity, id);
  };

  const updateCartItemQuantity = async (quantity, cartId) => {
    // Send a request to the backend to update the quantity
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: cartId,
          quantity: quantity,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart item quantity");
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row gap-5 mt-5">
          {empty && <h1>EMPTY</h1>}
          <div className="items-section col-7 rounded">
            {cartItems.map((item) => (
              <>
                {item.quantity !== 0 &&
                  <a
                  // key={item.cart_id}
                  href={`/products/${item.product_id}`}
                  className="cart-item rounded-4"
                >
                  <div className="left ps-3">
                    <div className="product-img-label rounded">
                      <img
                        className="product-img rounded-5"
                        src={`data:image/jpeg;base64,${item.product_image}`}
                        alt="product_image"
                      ></img>
                    </div>
                    <div className="name-section ps-4 pt-3">
                      <h2>
                        <strong>{item.product_name}</strong>
                      </h2>
                    </div>
                  </div>
                  <div className="right">
                    <div className="price-section">
                      <h5>
                        <strong></strong>
                        {item.product_price} $
                      </h5>
                    </div>
                    <div className="quantity-section">
                      <div className="middle-section">
                        <strong>{item.quantity}</strong>
                      </div>
                      <div className="body">
                        <div className="increase-label">
                          <button
                            onClick={(event) =>
                              increaseQuantity(event, item.cart_id)
                            }
                            className="increase"
                          >
                            <i className="fa-sharp fa-solid fa-plus"></i>
                          </button>
                        </div>
                        <div className="decrease-label">
                          <button
                            onClick={(event) =>
                              decreaseQuantity(event, item.cart_id)
                            }
                            disabled={item.quantity === 0}
                            className="decrease"
                          >
                            <i className="fa-sharp fa-solid fa-minus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
                }
              </>
            ))}
          </div>
          {!empty && (
            <>
              <div className="info-section col-4 bg-danger rounded-5">right</div>
            </>
          )}
        </div>

        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
      </div>
    </>
  );
};

export default ShoppingCart;
