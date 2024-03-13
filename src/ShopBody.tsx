import React from "react";
import MainThumbnail from "./main_thumbnail";
import ProductMainFetch from "./ProductList";
import CategoryMainFetch from "./CategoryList";
// import PeopleFetcher from './People_fetch'

const ShopBody = () => {
  return (
    <>
      <MainThumbnail />
      <div className="container main-prod-sec mt-5 rounded-5">
        <div className="row rounded">
          <CategoryMainFetch />
          <ProductMainFetch />
        </div>
      </div>
      {/* <PeopleFetcher /> */}
    </>
  );
};

export default ShopBody;
