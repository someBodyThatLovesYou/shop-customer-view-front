import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductPage.css";
import thumbnail from "./assets/thumbnail/orange-product.jpg";


const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const ProductPage = () => {
  const { id } = useParams();
  // product
  const [product, setProduct] = useState([]);
  const [ProductLoading, setProductLoading] = useState(true);
  const [ProductError, setProductError] = useState(null);
  // Category Name
  // const [CN, setCN] = useState([]);
  // const [CNLoading, setCNLoading] = useState(true);
  // const [CNError, setCNError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/product/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProduct(data);
        setProductLoading(false);
      } catch (error) {
        setProductError(error.message);
        setProductLoading(false);
      }
    };
    fetchProduct();

    // const fetchCN = async () => {
    //   try {
    //     const response = await fetch(
    //       `${API_BASE_URL}/category/${product.category_id}`
    //     );
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const data = await response.json();
    //     setCN(data);
    //     setCNLoading(false);
    //   } catch (error) {
    //     setCNError(error.message);
    //     setCNLoading(false);
    //   }
    // };
    // fetchCN();
    
  }, []);

  console.log(API_BASE_URL)
  return (
    <>
      <div className="ULTIMA-BD">
        <div className="container mt-2">
          <div className="sec-top">
            <div className="thumbnail rounded-5">
              {/* <img className="rounded-5" src={thumbnail} alt="" /> */}
              <div className="product-details-text">
                <h1>
                  <strong>Product Details</strong>
                </h1>
              </div>
            </div>
            <div className="product-part m-auto rounded-5">
              {ProductLoading && (
                <h4 className="container text-success">
                  Getting Product Loading...
                </h4>
              )}
              {ProductError && (
                <h5 className="container">
                  <h6 className="text-danger">ERROR WHILE GETTING PRODUCTS </h6>
                  : {ProductError}
                </h5>
              )}
              <div className="Nm-Dscp-sec">
                {/* name & description */}
                <h1>
                  <strong>{product.name}</strong>
                </h1>
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
                {/* {CNLoading && (
                  <h6 className="container text-success">
                    Getting category Loading...
                  </h6>
                )}
                {CNError && (
                  <h5 className="container">
                    <h6 className="text-danger">
                      ERROR WHILE GETTING CATEGORY{" "}
                    </h6>
                    : {CNError}
                  </h5>
                )} */}
                {/* {CN && CN.name && <h3>{CN.name}</h3> } */}
                <div className="order_btn">
                  <button>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
