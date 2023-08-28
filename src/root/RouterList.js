import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Products from "../components/Products/Products";
import Error from "../components/Error/Error";
import NavbarForSetting from "../components/Navbar/NavbarForSetting";
import ReviewDetail from "../components/Reviews/ReviewDetails/ReviewDetail";
import ProductsPageTwo from "../components/Products/AddingProductPageTwo/ProductsPageTwo";
import MarketStore from "../components/MarketStore";
import AddLocation from "../components/MarketStore/AddMarket/AddLocation/AddLocation";
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
import { dressMainData } from "../hook/ContextTeam";
import ProductEditDetailLocation from "../components/MarketLocations/Locations/ProductEditInLocation/AddingProductPageOne/ProductEditDetailLocation";
import ProductEditTitleLocation from "../components/MarketLocations/Locations/ProductEditInLocation/AddingProductPageTwo/ProductEditTitleLocation";
import Reviews1 from "../components/Reviews1";
import ReviewStoreWear from "../components/Reviews1/ReviewDetail/ReviewStoreWear";
import ReviewComment from "../components/Reviews1/ReviewComment/ReviewComment";
import ReviewWearComment from "../components/Reviews1/ReviewWearComment/ReviewWearComment";
import { SignUp } from "../components/Authentication/Sign_Up/SignUp";
import { ProfilePage } from "../components/Authentication/ProfilePage/ProfilePage";

export default function RouterList() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const location = useLocation();
  const [locationWindow, setLocationWindow] = useState("");

  useEffect(() => {
    setLocationWindow(location.pathname);
  }, [location.pathname, dressInfo?.isAuthen]);
  return (
    <div>
      {/* <NavbarForSetting /> */}

      <Routes>
        {/* ---------------------<Authentification>------------------------- */}

        <Route path={"/sign-up"} element={<SignUp />} />
        <Route path={"/edit-profile"} element={<ProfilePage />} />
        {/* ---------------------<Store>------------------------- */}
        <Route path="/reviews" element={<Reviews1 />}>
          <Route index element={<ReviewStoreWear />} />
          <Route path={"review/store-wear"} element={<ReviewStoreWear />} />
          <Route
            path={"review/comment-store/:id"}
            element={<ReviewComment />}
          />
          <Route
            path={"review/comment-wear/:id"}
            element={<ReviewWearComment />}
          />
        </Route>

        {/* ---------------------<Store>------------------------- */}
        <Route path="/store" element={<MarketStore />}>
          {dressInfo?.isItPorduct ? (
            <Route index element={<MyMarket />} />
          ) : (
            <Route index element={<AddStore />} />
          )}
          <Route path="/store/market-add" element={<AddStore />} />
          <Route path="/store/market-list" element={<MyMarket />} />
          <Route path="/store/location-add" element={<AddLocation />} />
          <Route path="/store/list/:id" element={<MarketEdit />} />
        </Route>

        {/* ---------------------<Locations>------------------------- */}
        <Route path="/locations-store" element={<MarketLocations />}>
          {dressInfo?.isItPorduct ? (
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
          <Route
            path="/locations-store/edit-detail/:id"
            element={<ProductEditDetailLocation />}
          />
          <Route
            path="/locations-store/edit-title/:id"
            element={<ProductEditTitleLocation />}
          />
        </Route>

        {/* ---------------------<LocationsProduct>------------------------- */}
        <Route path="/products" element={<Products />}>
          {dressInfo?.isItPorduct ? (
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

        {!dressInfo?.isAuthen ? (
          locationWindow !== "/profile" ? (
            <Route path="/" element={<Navigate to={"/profile"} />} />
          ) : (
            <Route path="/" element={<Navigate to={"/profile"} />} />
          )
        ) : (
          <Route path="/" element={<Navigate to={"/reviews"} />} />
        )}

        {/* {dressInfo?.isAuthen ? (
          <Route path="/" element={<Navigate to={"/reviews"} />} />
        ) : (
          <Route path="/" element={<Navigate to={"/profile"} />} />
        )} */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
