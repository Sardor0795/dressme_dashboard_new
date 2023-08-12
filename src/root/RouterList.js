import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Products from "../components/Products/Products";
// import Shops from "../components/Shops/Shops";
import Error from "../components/Error/Error";
import NavbarForSetting from "../components/Navbar/NavbarForSetting";
import ReviewDetail from "../components/Reviews/ReviewDetails/ReviewDetail";
import Reviews from "../components/Reviews/Reviews";
// import AddShop from "../components/AddShop/Shops";
import ProductsPageTwo from "../components/Products/AddingProductPageTwo/ProductsPageTwo";
import MarketStore from "../components/MarketStore";
import AddLocation from "../components/MarketStore/AddMarket/AddLocation/AddLocation";
import Clothes from "../components/Clothes/Clothes";
import MarketEdit from "../components/MarketStore/Market_Edit/MarketEdit";
import AddStore from "../components/MarketStore/AddMarket/AddStore/AddStore";
import MyMarket from "../components/MarketStore/MyMarket/MyMarket";

export default function RouterList() {
  return (
    <div>
      <NavbarForSetting />
      <Routes>
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<ProductsPageTwo />} />
        {/* ---------------------Store------------------------- */}
        <Route path="/store" element={<MarketStore />} />
        <Route path="/store/location-add" element={<AddLocation />} />
        <Route path="/store/market-add" element={<AddStore />} />
        <Route path="/store/market-list" element={<MyMarket />} />

        {/* <Route path="/store/list" element={<AddLocation />} /> */}
        <Route path="/store/list/:id" element={<MarketEdit />} />

        {/* ---------------------Store------------------------- */}

        <Route path="/store-location" element={<Clothes />} />
        <Route path="/review-details/:id" element={<ReviewDetail />} />
        <Route path="/" element={<Navigate to={"/reviews"} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
