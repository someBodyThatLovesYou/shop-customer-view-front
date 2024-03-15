import React, { useEffect, useState } from "react";
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [ProductLoading, setProductLoading] = useState(true);
  const [ProductError, setProductError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/products");
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
      {products.map((product) => (
        // intire body for each products
        <a
          href={`/products/${product.product_id}`}
          className="container bg-light rounded-4 product-div"
          key={product.product_id}
          onClick={() => handleProductClick(product.product_id)}
        >
          <div className="img-label"><img src={`data:image/jpeg;base64,${product.image}`} alt={product.name} className="product-img rounded-4 p-1" /></div>
          <div className="text-part">
            <h2>{product.name}</h2>
            <h6>{product.description}</h6>
          </div>
        </a>
      ))}
    </div>
  );
}

export default ProductList;
