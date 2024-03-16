import React, { useState, useEffect } from "react";
import "./CategoryList.css";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/Pcategories`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data);
        setCategoriesLoading(false);
      } catch (error) {
        setCategoriesError(error.message);
        setCategoriesLoading(false);
      }
    };
    fetchCategory();
  }, []);

  return (
    <div className="container category-container col-3 bg-opacity-25 rounded-4">
      {categoriesLoading && (
        <div className="container text-success">
          Getting Categories Loading...
        </div>
      )}
      {categoriesError && (
        <div className="container">
          <span className="text-danger">ERROR WHILE GETTING CATEGORIES </span>:{" "}
          {categoriesError}
        </div>
      )}
      {categories.map((category) => (
        // intire body for each category
        <a
          // href="#"
          href={`/category/${category.category_id}`}
          className="category-div my-4 rounded-4 bg-light"
          key={category.category_id}
        >
          <div className="name-img-part">
            <h4>{category.name}</h4>
            <img width={21} height={21} className="category-image" src={`data:image/png;base64,${category.image}`} alt="" />
          </div>
          {/* <p>{category.description}</p> */}
        </a>
      ))}
    </div>
  );
};

export default CategoryList;
