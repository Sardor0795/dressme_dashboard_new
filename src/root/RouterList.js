import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Error from "../components/Error/Error";
import { dressMainData } from "../hook/ContextTeam";
// --------------------------MarketStore=----------------
import MarketStore from "../components/MarketStore";
import MyMarket from "../components/MarketStore/MyMarket/MyMarket";
import MarketEdit from "../components/MarketStore/Market_Edit/MarketEdit";
import AddStore from "../components/MarketStore/AddMarket/AddStore/AddStore";
import AddLocation from "../components/MarketStore/AddMarket/AddLocation/AddLocation";
// --------------------------Products=----------------
import Products from "../components/Products/Products";
import ProductsPageOne from "../components/Products/AddingProductPageOne/ProductsPageOne";
import ProductsPageTwo from "../components/Products/AddingProductPageTwo/ProductsPageTwo";
import NoLocationProduct from "../components/Products/NoLocationsProduct/NoLocationsProduct";
import ProductLocationsList from "../components/Products/ProductLocationsList/ProductLocationsList";
// --------------------------MarketLocations--------------
import MarketLocations from "../components/MarketLocations";
import NoLocations from "../components/MarketLocations/NoLocations/NoLocations";
import LocationList from "../components/MarketLocations/Locations/LocationList/LocationList";
import LocationMapCity from "../components/MarketLocations/Locations/LocationMapsCity/LocationMapCity";
import LocationClothesCity from "../components/MarketLocations/Locations/LocationClothes/LocationClothesCity";
import ProductEditDetailLocation from "../components/MarketLocations/Locations/ProductEditInLocation/AddingProductPageOne/ProductEditDetailLocation";
import ProductEditTitleLocation from "../components/MarketLocations/Locations/ProductEditInLocation/AddingProductPageTwo/ProductEditTitleLocation";
// -------------------Reviews1----------
import Reviews1 from "../components/Reviews1";
import ReviewComment from "../components/Reviews1/ReviewComment/ReviewComment";
import ReviewStoreWear from "../components/Reviews1/ReviewDetail/ReviewStoreWear";
import ReviewWearComment from "../components/Reviews1/ReviewWearComment/ReviewWearComment";
// -------------------Authentication----------
import { EditProfilePage } from "../components/Authentication/UserProfile/ProfileEditPage/EditProfilePage";
import { UserProfile } from "../components/Authentication/UserProfile/ProfilePage/UserProfile";
import SignUpSeller from "../components/Authentication/SellerAuthentication/SignUp/SignUpSeller";
import SignInSeller from "../components/Authentication/SellerAuthentication/SignIn/SignInSeller";
import ForgotPasswordSeller from "../components/Authentication/SellerAuthentication/forgotPassword/ForgotPasswordSeller";
import ResetPasswordSeller from "../components/Authentication/SellerAuthentication/ResetPasswordSeller/ResetPasswordSeller";
import MailVerfySeller from "../components/Authentication/SellerAuthentication/MailVerfy/MailVerfySeller";

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
      {
        dressInfo?.AccessTokenSeller?.length !== 0 ?
          <Routes>
            {/* ---------------------<Authentification>------------------------- */}
            <Route path={"/sign-up"} element={<UserProfile />} />
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
            {/* <Route path="/review-details/:id" element={<ReviewDetail />} /> */}

            {/* {!dressInfo?.isAuthen ? (
              locationWindow !== "/edit-profile" ? (
                <Route path="/" element={<Navigate to={"/edit-profile"} />} />
              ) : (
                <Route path="/" element={<Navigate to={"/edit-profile"} />} />
              )
            ) : (
              <Route path="/" element={<Navigate to={"/edit-profile"} />} />
            )} */}

            <Route path="/" element={<Navigate to={"/edit-profile"} />} />

            <Route path="*" element={<Error colors="text-[#007DCA]" />} />
          </Routes>
          :
          <Routes>
            <Route path={"/signup-seller"} element={<SignUpSeller />} />
            <Route path={"/login-seller"} element={<SignInSeller />} />
            <Route path={"/forgot-password-seller"} element={<ForgotPasswordSeller />} />
            <Route path={"/reset-password-seller/:id"} element={<ResetPasswordSeller />} />
            <Route path={"/mail-verify-seller/:id"} element={<MailVerfySeller />} />
            <Route path="*" element={<Error colors="text-[#d50000]" />} />

            <Route path="/" element={<Navigate to={"/signup-seller"} />} />
          </Routes>
      }
    </div>
  );
}
