import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import BodyMain from "./ShopBody";

const App = () => {
  return (
    <>
      <Navbar />
      <BodyMain />
    </>
  );
};

export default App;
