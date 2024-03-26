import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./authContext";
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

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <BodyMain />
            </>
          }
        />
        <Route
          path="/products/:id"
          element={
            <>
              <Navbar />
              <ProductPage />
            </>
          }
        />
        <Route
          path="/category/:id"
          element={
            <>
              <Navbar />
              <CategoryPage />
            </>
          }
        />
        <Route
          path="/Profile/:id"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Profile />
              </>
            ) : (
              <>
                <Navbar />
                <Login />
              </>
            )
          }
        ></Route>
        <Route
          path="/Cart/:id"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Shopping_Cart />
              </>
            ) : (
              <>
                <Navbar />
                <Login />
              </>
            )
          }
        ></Route>
        <Route
          path="/Login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          path="/SignUp"
          element={
            <>
              <Navbar />
              <SignUp />
            </>
          }
        />
        <Route
          path="/Search"
          element={
            <>
              <Navbar />
              <SearchPage />
            </>
          }
        />
        <Route
          path="/subCategory/:id"
          element={
            <>
              <Navbar />
              <SubCategory />
            </>
          }
        />
        <Route
          path="/Cart/CheckOut"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <CheckOutPage />
              </>
            ) : (
              <>
                <Navbar />
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
