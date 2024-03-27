import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { dressMainData } from "../hook/ContextTeam";
import LoadingForSeller from "../components/Loading/LoadingFor";
import EditProfilePage from "../components/Authentication/UserProfile/ProfileEditPage/EditProfilePage";
import SignInSeller from "../components/Authentication/SellerAuthentication/SignIn/SignInSeller";
import SignUpSeller from '../components/Authentication/SellerAuthentication/SignUp/SignUpSeller';
import ForgotPasswordSeller from '../components/Authentication/SellerAuthentication/forgotPassword/ForgotPasswordSeller';
import ResetPasswordSeller from '../components/Authentication/SellerAuthentication/ResetPasswordSeller/ResetPasswordSeller';
import MailVerfySeller from '../components/Authentication/SellerAuthentication/MailVerfy/MailVerfySeller';
import Sidebar from "../components/Sidebar/Sidebar";
import Error from '../components/Error/Error';
// --------------------MarketStore-----------------------
import MarketIsStoreCheck from "../components/MarketStore/MarketIsStoreCheck/MarketIsStoreCheck";
import AddStore from "../components/MarketStore/AddMarket/AddStore/AddStore";
import MyMarket from "../components/MarketStore/MyMarket/MyMarket";
import MarketEdit from "../components/MarketStore/Market_Edit/MarketEdit";
import LocationsByIdShow from "../components/MarketStore/LocationsById/LocationsById";

// ---------------------Location----------------
import MarketIsLocationCheck from "../components/MarketLocations/MarketIsCheck/MarketIsLocationCheck";
import LocationAddById from "../components/MarketLocations/Locations/LocationAddById/LocationAddById";
import LocationList from "../components/MarketLocations/Locations/LocationList/LocationList";
import LocationMapCity from "../components/MarketLocations/Locations/LocationMapsCity/LocationMapCity";
import LocationClothesCity from "../components/MarketLocations/Locations/LocationClothes/LocationClothesCity";

// ---------------------Product----------------
import ProductIsCheck from "../components/Products/ProductIsCheck/ProductIsCheck";
import ProductEditPage from "../components/Products/AddingProductEdit/ProductsEditPage";
import ProductLocationsList from "../components/Products/ProductLocationsList/ProductLocationsList";
import ProductsPageOne from "../components/Products/AddingProductPageOne/ProductsPageOne";

// ---------------------Review-------------------------
import ReviewStoreWear from "../components/Reviews1/ReviewDetail/ReviewStoreWear";
import ReviewComment from "../components/Reviews1/ReviewComment/ReviewStoreComment";
import ReviewWearComment from "../components/Reviews1/ReviewWearComment/ReviewWearComment";
import { ShopLocationProductList } from "../hook/ShopLocationProductList";
import { ProtectedRoute } from "./protected-route";
// ---------------------Review-------------------------
const Reviews1 = lazy(() => import('../components/Reviews1'));

// --------------------MarketStore-----------------------
const MarketStore = lazy(() => import('../components/MarketStore'));

// ------------------------Location----------------------------
const MarketLocations = lazy(() => import('../components/MarketLocations'));

// -------------------------Product-----------------------------
const Products = lazy(() => import('../components/Products/Products'));

export default function RouterList() {
  const [shopLocationProductList, setShopLocationProductList] = useContext(ShopLocationProductList)

  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const location = useLocation();
  const [locationWindow, setLocationWindow] = useState("");
  useEffect(() => {
    setLocationWindow(location.pathname);
  }, [location.pathname, dressInfo?.isAuthen]);

  const isAuthenticated = localStorage.getItem("DressmeUserToken") ? localStorage.getItem("DressmeUserToken") : null;



  return (
    <div className="w-full h-full">
      <Routes>
        {/* ---------------------<Store>------------------------- */}

        <Route element={
          <ProtectedRoute>
            <Sidebar />
          </ProtectedRoute>
        }>
          <Route path={"/edit-profile"} element={<EditProfilePage />} />
          <Route path="/reviews" element={
            <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
              <Reviews1 />
            </Suspense>
          }>

            <Route index element={<ReviewStoreWear />} />
            <Route path="review/store-wear" element={<ReviewStoreWear />} />
            <Route path="review/comment-store/:id" element={<ReviewComment />} />
            <Route path="review/comment-wear/:id" element={<ReviewWearComment />} />
          </Route>
          {/* ---------------------<Store>------------------------- */}
          <Route path="/store" element={
            <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
              <MarketStore />
            </Suspense>
          }>
            <Route index element={<MarketIsStoreCheck />} />
            <Route path="/store/market-add" element={<AddStore />} />
            <Route path="/store/market-list" element={<MyMarket />} />
            <Route path="/store/market-list/:id" element={<MarketEdit />} />
            <Route path="/store/locations/shop/:id" element={<LocationsByIdShow />} />
          </Route>

          {/* ---------------------<Locations>------------------------- */}
          <Route path="/locations-store" element={
            <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
              <MarketLocations />
            </Suspense>
          }>
            <Route index element={<MarketIsLocationCheck />} />
            <Route path="/locations-store/:id" element={<LocationAddById />} />
            <Route path="/locations-store/list" element={<LocationList />} />
            <Route path="/locations-store/city/:id" element={<LocationMapCity />} />
            <Route path="/locations-store/wears/:id" element={<LocationClothesCity />} />
          </Route>
          {/* ---------------------<LocationsProduct>------------------------- */}
          {shopLocationProductList > 0
            ?
            <Route path="/products" element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <Products />
              </Suspense>
            }>
              <Route index element={<ProductLocationsList />} />
              <Route path="/products/location/:id" element={<ProductEditPage />} />
              <Route path="/products/location" element={<ProductLocationsList />} />
              <Route path="/products/location/add/:id" element={<ProductsPageOne />} />
            </Route> :
            <Route path="/products" element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <Products />
              </Suspense>
            }>
              <Route index element={<ProductIsCheck />} />
              <Route path="/products/location/:id" element={<ProductEditPage />} />
              <Route path="/products/location" element={<ProductLocationsList />} />
              <Route path="/products/location/add/:id" element={<ProductsPageOne />} />
            </Route>}

        </Route>



        <Route path={"/signup-seller"} element={<SignUpSeller />} />
        <Route path={"/login-seller"} element={<SignInSeller />} />
        <Route path={"/forgot-password-seller"} element={<ForgotPasswordSeller />} />
        <Route path={"/reset-password-seller/:id"} element={<ResetPasswordSeller />} />
        <Route path={"/mail-verify-seller/:id"} element={<MailVerfySeller />} />
        <Route path="*" element={<Error colors="text-[#007DCA]" />} />
        <Route path="/" element={
          isAuthenticated ? (
            <Navigate to="/edit-profile" />
          ) : (
            <Navigate to="/login-seller" />
          )} />
      </Routes>
    </div>
  );
}
