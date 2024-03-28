import { useEffect, useState, useRef } from "react";
import "./Search.css";

const Search = () => {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const searchInputRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(true);
  const [productError, setProductError] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  // fetching products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/searchProducts`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setProductError(error.message);
      } finally {
        setProductLoading(false);
      }
    };

    fetchProduct();
  }, []);

  // for focusing when page loades
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Function to filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="searchBar-label container">
        <input
          type="text"
          placeholder="Search in products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          ref={searchInputRef} // Attach the ref to the input element
        />
      </div>
      {productLoading ? (
        <div className="container">
          <h2 className="text-success">Loading...</h2>
        </div>
      ) : productError ? (
        <div className='container'>
          <h4 className="text-danger">Error: </h4>
          {productError}
        </div>
      ) : (
        <div className="product-container container col-12 rounded-4">
          {searchQuery &&
            filteredProducts.map((product) => (
              <a
                href={`/products/${product.product_id}`}
                className="container bg-light rounded-4 product-div"
                key={product.product_id}
              >
                <div className="img-label rounded-4">
                  <img
                    src={`data:image/jpeg;base64,${product.image}`}
                    alt={product.name}
                    className="product-img rounded-5 p-1"
                  />
                </div>
                <div className="text-part">
                  <h2>{product.name}</h2>
                  <h6>{product.description}</h6>
                  <p>
                    <strong>{product.price}$</strong>
                  </p>
                </div>
              </a>
            ))}
        </div>
      )}
    </>
  );
};

export default Search;
