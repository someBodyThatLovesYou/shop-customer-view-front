import React, { useEffect, useState } from "react";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [ProductLoading, setProductLoading] = useState(true);
  const [ProductError, setProductError] = useState(null);
  const [PrpductimageUrl, setProductImageUrl] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://127.0.0.1/main/products");
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

    const fetchProductImage = async () => {
      const response = await fetch(
        `http://127.0.0.1/static/product_images/1.png`
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setProductImageUrl(url);
    };

    fetchProduct();
    fetchProductImage();
  }, []);

  return (
    <div className="container product-container col-9 bg-warning rounded-4">
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
      {products.map((product) => (
        <div className="container product-div" key={product.product_id}>
          <img src={PrpductimageUrl} alt="product image" />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
