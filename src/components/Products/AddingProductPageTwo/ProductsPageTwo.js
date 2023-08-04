import React from "react";
import ProductsPageTop from "./ProductsPageTop/ProductsPageTop";
import AddingProduct from "./AddingProduct/AddingProduct";

export default function ProductsPageTwo() {
  return (
    <div className="w-full">
      <div className="w-full px-[40px] pt-[33px]">
        <ProductsPageTop />
      </div>
      <div className="w-full">
        <AddingProduct />
      </div>
    </div>
  );
}
