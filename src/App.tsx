import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import BodyMain from "./ShopBody";
import ProductPage from "./ProductPage";
import CategoryPage from "./CategoryPage";
import FOURoFOUR from "./PageNotFound";
import Login from "./Login";
import SignUp from "./SignUp";
import Shopping_Cart from "./cart";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customer, setCustomer] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    registration_date: "",
  });

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
                <div>Profile</div>
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
        <Route path="*" element={<FOURoFOUR />} />
      </Routes>
    </Router>
  );
};

export default App;
