import { useState, useEffect /*  useContext */ } from "react";
import { useParams } from "react-router-dom";
// import { AuthContext, AuthContextType } from "./authContext";
import "./SubCategory.css";

const SubCategory = () => {
  const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const BASE = import.meta.env.DEPLOY_BASE_ORIGIN

  const { id } = useParams();
  const [products, setProducts] = useState([
    { id: "", product_id: "", image: "", name: "", description: "", price: "" },
  ]);
  const [ProductLoading, setProductLoading] = useState(true);
  const [ProductError, setProductError] = useState<string | undefined>();
  const [emt, setEmt] = useState<boolean>();

  // const { isAuthenticated, setIsAuthenticated, customer, setCustomer } =
  //   useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/subCategory/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        !data.length ? setEmt(true) : setProducts(data);
        setProductLoading(false);
      } catch (error) {
        console.error((error as Error).message);
        setProductError((error as Error).message);
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
      {emt && (
        <span className="fs-1 mt-5 px-5 text-center">
          or there isn't any product in this category or this isn't a child
          category
        </span>
      )}
      {/* intire body for each products */}
      {products.map((product) => (
        <a
          href={`/${BASE}/products/${product.id}`}
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
  );
};

export default SubCategory;
