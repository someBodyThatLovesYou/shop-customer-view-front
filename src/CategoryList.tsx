import React, { useState, useEffect } from "react";
import "./CategoryList.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/Pcategories");
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
        <a
          // href="#"
          href={`/category/${category.name}`}
          className="category-div my-4 py-4 rounded-4 bg-light"
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
