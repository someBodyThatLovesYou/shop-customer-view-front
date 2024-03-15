import React from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { id } = useParams()
  return (
    <>
      <div>CategoryPage</div>
      <div>this is: {id}</div>
    </>
  );
};

export default CategoryPage;
