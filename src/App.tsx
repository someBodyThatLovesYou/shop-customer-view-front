import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext, AuthContextType } from "./authContext";
import Navbar from "./Navbar";
import BodyMain from "./ShopBody";
import ProductPage from "./ProductPage";
import CategoryPage from "./CategoryPage";
import FOURoFOUR from "./PageNotFound";
import Login from "./Login";
import SignUp from "./SignUp";
import Shopping_Cart from "./cart";
import Profile from "./profile";
import SubCategory from "./SubCategory";
import CheckOutPage from "./CheckOutPage";
import SearchPage from "./Search";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextType;
  console.log(isAuthenticated);

  const BASE = import.meta.env.VITE_DEPLOY_BASE_ORIGIN
  console.log(BASE)

  return (
    <Router>
      <Routes>
        <Route
          path={`/${BASE}/`}
          element={
            <>
              <Navbar />
              <BodyMain />
            </>
          }
        />
        <Route
          path={`/${BASE}/products/:id`}
          element={
            <>
              <Navbar />
              <ProductPage />
            </>
          }
        />
        <Route
          path={`/${BASE}/category/:id`}
          element={
            <>
              <Navbar />
              <CategoryPage />
            </>
          }
        />
        <Route
          path={`/${BASE}/Profile/:id`}
          element={
            isAuthenticated ? (
              <>
                <Profile />
              </>
            ) : (
              <>
                <Login />
              </>
            )
          }
        ></Route>
        <Route
          path={`/${BASE}/Cart/:id`}
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Shopping_Cart />
              </>
            ) : (
              <>
                <Login />
              </>
            )
          }
        ></Route>
        <Route
          path={`/${BASE}/Login`}
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path={`/${BASE}/SignUp`}
          element={
            <>
              <Navbar />
              <SignUp />
            </>
          }
        />
        <Route
          path={`/${BASE}/Search`}
          element={
            <>
              <Navbar />
              <SearchPage />
            </>
          }
        />
        <Route
          path={`/${BASE}/subCategory/:id`}
          element={
            <>
              <Navbar />
              <SubCategory />
            </>
          }
        />
        <Route
          path={`/${BASE}/Cart/CheckOut`}
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <CheckOutPage />
              </>
            ) : (
              <>
                <Login />
              </>
            )
          }
        />
        <Route path="*" element={<FOURoFOUR />} />
      </Routes>
    </Router>
  );
};

export default App;
