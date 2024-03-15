import React from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  return (
    <>
      <p>product page</p>
      <div>hello: {id}</div>
    </>
  );
};

export default ProductPage;
