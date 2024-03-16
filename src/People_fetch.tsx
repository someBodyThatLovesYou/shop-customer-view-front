import React, { useState, useEffect } from "react";
import "./productFetcherStyle.css";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const DataFetcher = () => {
  const [productsData, setproductsData] = useState(null);
  const [productsLoading, setproductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/main`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setproductsData(data);
        setproductsLoading(false);
      } catch (error) {
        setProductsError(error.message);
        setproductsLoading(false);
      }
    };

    fetchData();
  }, []);

  // (NOT FOR EVER, * this will be a full page error in future *
  if (productsLoading)
    return <div className="container text-success">Loading...</div>;
  if (productsError)
    return (
      <div className="container">
        {/* <span className="text-danger">ERROR WHILE GETTING PEOPLE </span>:{" "} */}
        <span className="text-danger alert">ERROR WHILE GETTING PEOPLE </span>:{" "}
        {productsError}
      </div>
    );
  // .. )

  return (
    <div className="container products-section">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {productsData.map((people, index) => (
        <div
          key={index}
          // onClick={sendProductName(people.name)}
          className="container mb-2 cursor-pointer product"
        >
          <div className="">{people.name}</div>
          <div className="">{people.age}</div>
        </div>
      ))}
    </div>
  );
};

export default DataFetcher;
