import React, { Suspense, useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Error from "../components/Error/Error";
import { dressMainData } from "../hook/ContextTeam";
// --------------------------MarketStore=----------------
import MarketStore from "../components/MarketStore";
import MyMarket from "../components/MarketStore/MyMarket/MyMarket";
import MarketEdit from "../components/MarketStore/Market_Edit/MarketEdit";
import AddStore from "../components/MarketStore/AddMarket/AddStore/AddStore";
// import AddLocation from "../components/MarketStore/AddMarket/AddLocation/AddLocation";
// --------------------------Products=----------------
import Products from "../components/Products/Products";
import ProductsPageOne from "../components/Products/AddingProductPageOne/ProductsPageOne";
import NoLocationProduct from "../components/Products/NoLocationsProduct/NoLocationsProduct";
import ProductLocationsList from "../components/Products/ProductLocationsList/ProductLocationsList";
// --------------------------MarketLocations--------------
import NoLocations from "../components/MarketLocations/NoLocations/NoLocations";
import MarketLocations from "../components/MarketLocations";
import LocationList from "../components/MarketLocations/Locations/LocationList/LocationList";
import LocationMapCity from "../components/MarketLocations/Locations/LocationMapsCity/LocationMapCity";
import LocationClothesCity from "../components/MarketLocations/Locations/LocationClothes/LocationClothesCity";
import ProductEditDetailLocation from "../components/MarketLocations/Locations/ProductEditInLocation/AddingProductPageOne/ProductEditDetailLocation";
import ProductEditTitleLocation from "../components/MarketLocations/Locations/ProductEditInLocation/AddingProductPageTwo/ProductEditTitleLocation";
import MarketIsCheck from "../components/MarketLocations/MarketIsCheck/MarketIsCheck";
// -------------------Reviews1----------
import Reviews1 from "../components/Reviews1";
import ReviewComment from "../components/Reviews1/ReviewComment/ReviewStoreComment";
import ReviewStoreWear from "../components/Reviews1/ReviewDetail/ReviewStoreWear";
import ReviewWearComment from "../components/Reviews1/ReviewWearComment/ReviewWearComment";
// -------------------Authentication----------
import { EditProfilePage } from "../components/Authentication/UserProfile/ProfileEditPage/EditProfilePage";
import SignUpSeller from "../components/Authentication/SellerAuthentication/SignUp/SignUpSeller";
import SignInSeller from "../components/Authentication/SellerAuthentication/SignIn/SignInSeller";
import ForgotPasswordSeller from "../components/Authentication/SellerAuthentication/forgotPassword/ForgotPasswordSeller";
import ResetPasswordSeller from "../components/Authentication/SellerAuthentication/ResetPasswordSeller/ResetPasswordSeller";
import MailVerfySeller from "../components/Authentication/SellerAuthentication/MailVerfy/MailVerfySeller";
import { useQuery } from "@tanstack/react-query";
import LocationAddById from "../components/MarketLocations/Locations/LocationAddById/LocationAddById";
import MarketIsStoreCheck from "../components/MarketStore/MarketIsStoreCheck/MarketIsStoreCheck";
import LoadingForSeller from "../components/Loading/LoadingFor";
import LocationsByIdShow from "../components/MarketStore/LocationsById/LocationsById";
import ProductIsCheck from "../components/Products/ProductIsCheck/ProductIsCheck";
import ProductEditPage from "../components/Products/AddingProductEdit/ProductsEditPage";

// -------------------------Location---------------------
// const MarketLocations = React.lazy(() => import("../components/MarketLocations"));
// const LocationList = React.lazy(() => import("../components/MarketLocations/Locations/LocationList/LocationList"));
// const LocationMapCity = React.lazy(() => import("../components/MarketLocations/Locations/LocationMapsCity/LocationMapCity"));
// const LocationClothesCity = React.lazy(() => import("../components/MarketLocations/Locations/LocationClothes/LocationClothesCity"));
// const ProductEditDetailLocation = React.lazy(() => import("../components/MarketLocations/Locations/ProductEditInLocation/AddingProductPageOne/ProductEditDetailLocation"));
// const ProductEditTitleLocation = React.lazy(() => import("../components/MarketLocations/Locations/ProductEditInLocation/AddingProductPageTwo/ProductEditTitleLocation"));
// const MarketIsCheck = React.lazy(() => import("../components/MarketLocations/MarketIsCheck/MarketIsCheck"));

export default function RouterList() {

  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const location = useLocation();
  const [locationWindow, setLocationWindow] = useState("");
  useEffect(() => {
    setLocationWindow(location.pathname);
  }, [location.pathname, dressInfo?.isAuthen]);

  return (
    <div className="w-full h-full">
      {/* <NavbarForSetting /> */}
      <Routes>
        {/* ---------------------<Authentification>------------------------- */}
        <Route path={"/edit-profile"} element={<EditProfilePage />} />
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
          <Route index element={<MarketIsStoreCheck />} />
          <Route path="/store/market-add" element={<AddStore />} />
          <Route path="/store/market-list" element={<MyMarket />} />
          <Route path="/store/market-list/:id" element={<MarketEdit />} />
          <Route path="/store/locations/shop/:id" element={<LocationsByIdShow />} />
        </Route>

        {/* ---------------------<Locations>------------------------- */}

        <Route path="/locations-store" element={<MarketStore />}>
          <Route index element={<MarketIsCheck />} />
          <Route path="/locations-store/:id" element={<LocationAddById />} />
          <Route path="/locations-store/list" element={<LocationList />} />
          <Route path="/locations-store/city/:id" element={<LocationMapCity />} />
          <Route path="/locations-store/wears/:id" element={<LocationClothesCity />} />
          {/* <Route path="/locations-store/wears/:id" element={<MarketLocations />} /> */}
          <Route path="/locations-store/edit-detail/:id" element={<ProductEditDetailLocation />} />
          <Route path="/locations-store/edit-title/:id" element={<ProductEditTitleLocation />} />
        </Route>



        {/* ---------------------<LocationsProduct>------------------------- */}
        <Route path="/products" element={<Products />}>
          {dressInfo?.isCheckPoructList?.length !== 0 ?
            <Route path="/products" element={<Navigate to={"/products/location"} />} />
            : <Route index element={<ProductIsCheck />} />}

          <Route path="/products/location/:id" element={<ProductEditPage />} />
          <Route path="/products/location" element={<ProductLocationsList />} />
          <Route path="/products/location/add/:id" element={<ProductsPageOne />} />
        </Route>

        <Route path="/" element={<Navigate to={"/signup-seller"} />} />

        <Route path={"/signup-seller"} element={<SignUpSeller />} />
        <Route path={"/login-seller"} element={<SignInSeller />} />
        <Route path={"/forgot-password-seller"} element={<ForgotPasswordSeller />} />
        <Route path={"/reset-password-seller/:id"} element={<ResetPasswordSeller />} />
        <Route path={"/mail-verify-seller/:id"} element={<MailVerfySeller />} />
        <Route path="*" element={<Error colors="text-[#007DCA]" />} />


        {/* <Route path="*" element={<Error colors="text-[#d50000]" />} /> */}

      </Routes>

    </div>
  );
}
