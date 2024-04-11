import { useEffect, useState /* , useContext */ } from "react";
// import { AuthContext, AuthContextType } from "./authContext";
import "./ProductList.css";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const BASE = import.meta.env.VITE_DEPLOY_BASE_ORIGIN

function ProductList() {
  const [products, setProducts] = useState([
    { id: "", name: "", image: "", description: "", price: "" },
  ]);
  const [ProductLoading, setProductLoading] = useState(true);
  const [ProductError, setProductError] = useState<string | undefined>();

  // const { isAuthenticated, setIsAuthenticated, customer, setCustomer } =
  //   useContext(AuthContext) as AuthContextType;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/AllProductsForCustomer`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
        setProductLoading(false);
      } catch (error) {
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
      {/* intire body for each products */}
      { !ProductError && !ProductLoading && products.map((product) => (
        <a
          href={`/${BASE}/products/${product.id}`}
          className="container bg-light rounded-4 product-div"
          key={product.id}
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
}

export default ProductList;
