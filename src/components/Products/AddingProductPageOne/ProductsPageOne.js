import React from "react";
import ProductsPageTop from "./ProductsPageTop/ProductsPageTop";
import AddingProduct from "./AddingProduct/AddingProduct";

export default function ProductsPageOne() {
  return (
    <div className="w-full max-w-[1540px] mx-auto">
      {/* <div className='w-full'>
          <ProductsPageTop />
        </div> */}
      <div className="w-full">
        <AddingProduct />
      </div>
    </div>
  );
}
