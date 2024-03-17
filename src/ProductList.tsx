import React, { useEffect, useState } from "react";
import "./ProductList.css";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [ProductLoading, setProductLoading] = useState(true);
  const [ProductError, setProductError] = useState(null);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
        setProductLoading(false);
      } catch (error) {
        setProductError(error.message);
        setProductLoading(false);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="container product-container col-9 rounded-4">
      {ProductLoading && (
        <div className="container text-success">
          Getting Products Loading...
        </div>
      )}
      {ProductError && (
        <div className="container">
          <span className="text-danger">ERROR WHILE GETTING PRODUCTS </span>:{" "}
          {ProductError}
        </div>
      )}
        {/* intire body for each products */}
      {products.map((product) => (
        <a
          href={`/products/${product.product_id}`}
          className="container bg-light rounded-4 product-div"
          key={product.product_id}
        >
          <div className="img-label rounded-4"><img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} className="product-img rounded-5 p-1" /></div>
          <div className="text-part">
            <h2>{product.name}</h2>
            <h6>{product.description}</h6>
            <p><strong><center>{product.price}$</center></strong></p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default ProductList;
