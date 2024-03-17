import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import BodyMain from "./ShopBody";
import ProductPage from "./ProductPage";
import CategoryPage from "./CategoryPage";
import FOURoFOUR from "./PageNotFound";
import Login from "./Login";
import SignUp from "./SignUp";

const App = () => {
  // const [userName, setUserName] = useState('');
  // const [password, setPassword] = useState('');

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
              {/* <ProductPage userName={userName} password={password} /> */}
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
        <Route path="/Cart/:id" element={<div>Cart</div>} />
        <Route path="/Profile/:id" element={<div>Profile</div>} />
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
