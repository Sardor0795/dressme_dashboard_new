import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Products from "../components/Products/Products";
import Shops from "../components/Shops/Shops";
import Error from "../components/Error/Error";
import NavbarForSetting from "../components/Navbar/NavbarForSetting";
import ReviewDetail from "../components/Reviews/ReviewDetails/ReviewDetail";
import Reviews from "../components/Reviews/Reviews";
import AddShop from "../components/AddShop/Shops";
import ProductsPageTwo from "../components/Products/AddingProductPageTwo/ProductsPageTwo";
import MarketStore from "../components/MarketStore";
import AddLocation from "../components/MarketStore/AddMarket/AddLocation/AddLocation";
import Clothes from "../components/Clothes/Clothes";

export default function RouterList() {
  return (
    <div>
      <NavbarForSetting />
      <Routes>
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<ProductsPageTwo />} />
        {/* <Route path="/products_nextpage" element={<ProductsPageTwo />} /> */}
        <Route path="/store" element={<MarketStore />} />
        <Route path="/store/location-add" element={<AddLocation />} />
        <Route path="/clothes" element={<Clothes />} />

        {/* <Route path="/addshop" element={<AddShop />} /> */}
        <Route path="/review-details/:id" element={<ReviewDetail />} />
        <Route path="/" element={<Navigate to={"/reviews"} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
