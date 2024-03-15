import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import BodyMain from "./ShopBody";
import ProductPage from "./ProductPage";
import CategoryPage from './CategoryPage'
import FOURoFOUR from './PageNotFound'



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
          <Navbar />
          <BodyMain />
          </>
        } />
        <Route path="/products/:id" element={
          <>
          <Navbar />
          <ProductPage />
          </>
        } />
        <Route path="/category/:id" element={
          <>
          <Navbar />
          <CategoryPage />
          </>
        } />
        {/* <Route path="*" element={<FOURoFOUR />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
