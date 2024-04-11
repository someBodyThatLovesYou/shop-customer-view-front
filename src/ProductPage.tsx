import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext, AuthContextType } from "./authContext";
import "./ProductPage.css";
// import thumbnail from "./assets/thumbnail/orange-product.jpg";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const BASE = import.meta.env.DEPLOY_BASE_ORIGIN

const ProductPage = () => {
  const { id } = useParams();

  const { isAuthenticated, customer } = React.useContext(
    AuthContext
  ) as AuthContextType;

  // product
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
  });
  const [isProduct, setIsproduct] = useState(false);
  const [ProductLoading, setProductLoading] = useState(true);
  const [ProductError, setProductError] = useState<string | undefined>();
  // Category Name
  // const [CN, setCN] = useState([]);
  // const [CNLoading, setCNLoading] = useState(true);
  // const [CNError, setCNError] = useState(null);

  // product and category name fetch
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/getProductDetail/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
        setIsproduct(true);
        setProductLoading(false);
      } catch (error) {
        setProductError((error as Error).message);
        setProductLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleAddToCart = () => {
    fetch(`${API_BASE_URL}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: id,
        quantity: 1,
        customer_id: customer.id,
        // updated_at: new Date().toISOString(), // Current timestamp
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Access the 'message' from the response
        console.log(data.message); // Outputs: 'Item added to cart'
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="ULTIMA-BD">
        <div className="container mt-2">
          <div className="sec-top">
            <div className="thumbnail rounded-5">
              <div className="product-details-text">
                <h1>
                  <strong>Product Details</strong>
                </h1>
              </div>
            </div>
            {/* intire product_body */}
            {isProduct && (
              <div className="product-part m-auto rounded-5">
                <div className="Nm-Dscp-sec">
                  <p>
                    <strong>{product.name}</strong>
                  </p>
                  <div className="desc">
                    <h6>{product.description}</h6>
                  </div>
                </div>
                <div className="image-prc-sec">
                  <div className="img-label">
                    <img
                      src={`data:image/jpeg;base64,${product.image}`}
                      alt={product.name}
                      className="product-img rounded-circle"
                    />
                    <center>
                      <h3>
                        <strong>{product.price}$</strong>
                      </h3>
                    </center>
                  </div>
                </div>
                <div className="Cnm-ordr">
                  {isAuthenticated ? (
                    <div className="order_btn">
                      <button
                        name="Add_to_cart"
                        onClick={() => handleAddToCart()}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ) : (
                    <div className="redirect-sign-label">
                      <a href={`/${BASE}/Login`}>click to sign in or up first</a>
                    </div>
                  )}
                </div>
              </div>
            )}
            {ProductLoading && (
              <h4 className="container text-success">
                Getting Product Loading...
              </h4>
            )}
            {ProductError && (
              <h5 className="container">
                <h6 className="text-danger">ERROR WHILE GETTING PRODUCTS </h6>:{" "}
                {ProductError}
              </h5>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
