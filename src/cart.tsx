import { useEffect, useState, useContext } from "react";
import { AuthContext, AuthContextType } from "./authContext";
import "./Cart.css";

const ShoppingCart = () => {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const BASE = import.meta.env.DEPLOY_BASE_ORIGIN;

  const [cartItems, setCartItems] = useState([
    {
      cart_id: 0,
      product_id: "",
      product_image: "",
      product_name: "",
      product_price: 0,
      quantity: 0,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [empty, setIsempty] = useState<boolean>();

  // check out info like product_id and cart_id and so on
  // const [COinfo, setCOinfo] = useState([]);
  // const [itemQuantity, setItemQuantity] = useState();
  const [quantity, setQuantity] = useState<number>();
  const [totalCost, setTotalCost] = useState<number>();
  const [COIerror, setCOIerror] = useState<string | undefined>();
  const [COIloading, setCOIloading] = useState(true);

  const { customer } = useContext(AuthContext) as AuthContextType;

  // fetch Shopping cart items
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
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (customer.id) {
      fetchCartItems();
    }
  }, [customer.id, API_BASE_URL]);

  // fetch billing ALL infos
  useEffect(() => {
    const fetch_COI = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/COI/${customer.id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        // setCOinfo(data.items);
        setQuantity(data.quantity); // Set the total quantity to the state
        // setItemQuantity(data.item_count); // Set the item count to the state
        setTotalCost(data.total_price); // Set the total price to the state
      } catch (error) {
        setCOIerror((error as Error).message);
      } finally {
        setCOIloading(false);
      }
    };

    fetch_COI();
  }, [customer.id, API_BASE_URL]);

  const increaseQuantity = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
    price: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setQuantity((quantity || 0) + 1);
    setTotalCost((totalCost || 0) + price);

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

  const decreaseQuantity = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number,
    price: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setQuantity((quantity || 0) - 1);
    setTotalCost((totalCost || 0) - price);

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

  const updateCartItemQuantity = async (quantity: number, cartId: number) => {
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
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {!error &&
              !loading &&
              cartItems.map((item) => (
                <>
                  {item.quantity !== 0 && (
                    <a
                      // key={item.cart_id}
                      href={`/${BASE}/products/${item.product_id}`}
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
                                title="Increase"
                                onClick={(event) =>
                                  increaseQuantity(
                                    event,
                                    item.cart_id,
                                    item.product_price
                                  )
                                }
                                className="increase"
                              >
                                <i className="fa-sharp fa-solid fa-plus"></i>
                              </button>
                            </div>
                            <div className="decrease-label">
                              <button
                                title="Decrease"
                                onClick={(event) =>
                                  decreaseQuantity(
                                    event,
                                    item.cart_id,
                                    item.product_price
                                  )
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
                  )}
                </>
              ))}
          </div>
          {!empty && (
            <>
              <div className="info-section col-4 rounded-5">
                <div className="infos">
                  {COIerror && (
                    <p>
                      <span>{COIerror}</span>
                    </p>
                  )}
                  {COIloading && (
                    <p>
                      <span>Loading ..</span>
                    </p>
                  )}
                  {!COIloading && !COIerror && (
                    <>
                      <div className="cart-billig-icon">
                        <i className="fa-duotone fa-file-invoice-dollar"></i>
                      </div>
                      <p className="info-title-label">
                        <span className="info-title">Total quantity</span>{" "}
                        <span className="info-content">{quantity}</span>
                      </p>
                      <p className="info-title-label">
                        <span className="info-title">Total cost</span>{" "}
                        <span className="info-content">{totalCost}$</span>
                      </p>
                      <div className="chack-out-button-label">
                        <a href={`/${BASE}/CheckOut`} className="chack-out-button">
                          Check out
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ShoppingCart;
