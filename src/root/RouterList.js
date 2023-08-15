import React, { useState } from "react";
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
import MarketLocations from "../components/MarketLocations";
import LocationList from "../components/MarketLocations/Locations/LocationList/LocationList";
import NoLocations from "../components/MarketLocations/NoLocations/NoLocations";
import LocationMapCity from "../components/MarketLocations/Locations/LocationMapsCity/LocationMapCity";
import LocationClothesCity from "../components/MarketLocations/Locations/LocationClothes/LocationClothesCity";
import NoLocationProduct from "../components/Products/NoLocationsProduct/NoLocationsProduct";
import ProductsPageOne from "../components/Products/AddingProductPageOne/ProductsPageOne";
import ProductLocationsList from "../components/Products/ProductLocationsList/ProductLocationsList";

export default function RouterList() {
  const [isItMarket, setIsItMarket] = useState(false);
  const [isLocations, setIsLocations] = useState(false);
  const [isLocationProduct, setIsLocationProduct] = useState(false);
  return (
    <div>
      <NavbarForSetting />
      <Routes>
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/products" element={<Products />} />

        {/* ---------------------<Store>------------------------- */}
        <Route path="/store" element={<MarketStore />}>
          {isItMarket ? (
            <Route index element={<AddStore />} />
          ) : (
            <Route index element={<MyMarket />} />
          )}
          <Route path="/store/market-add" element={<AddStore />} />
          <Route path="/store/market-list" element={<MyMarket />} />
          <Route path="/store/location-add" element={<AddLocation />} />
          <Route path="/store/list/:id" element={<MarketEdit />} />
        </Route>

        {/* ---------------------<Locations>------------------------- */}
        <Route path="/locations-store" element={<MarketLocations />}>
          {!isLocations ? (
            <Route index element={<LocationList />} />
          ) : (
            <Route index element={<NoLocations />} />
          )}
          <Route path="/locations-store/list" element={<LocationList />} />
          <Route
            path="/locations-store/city/:id"
            element={<LocationMapCity />}
          />
          <Route
            path="/locations-store/wears/:id"
            element={<LocationClothesCity />}
          />
        </Route>

        {/* ---------------------<LocationsProduct>------------------------- */}
        <Route path="/products" element={<Products />}>
          {isLocationProduct ? (
            <Route index element={<ProductsPageOne />} />
          ) : (
            <Route index element={<NoLocationProduct />} />
          )}
          <Route path="/products/location" element={<ProductLocationsList />} />
          <Route path="/products/add-wear" element={<ProductsPageOne />} />
          <Route path="/products/add-detail" element={<ProductsPageTwo />} />
        </Route>

        {/* <Route path="/store-location" element={<Clothes />} /> */}
        <Route path="/review-details/:id" element={<ReviewDetail />} />
        <Route path="/" element={<Navigate to={"/reviews"} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
