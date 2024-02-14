import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { dressMainData } from "../hook/ContextTeam";
import LoadingForSeller from "../components/Loading/LoadingFor";
import EditProfilePage from "../components/Authentication/UserProfile/ProfileEditPage/EditProfilePage";
import SignInSeller from "../components/Authentication/SellerAuthentication/SignIn/SignInSeller";
import Sidebar from "../components/Sidebar/Sidebar";
// ---------------------Product----------------
import ProductIsCheck from "../components/Products/ProductIsCheck/ProductIsCheck";
import ProductEditPage from "../components/Products/AddingProductEdit/ProductsEditPage";
import ProductLocationsList from "../components/Products/ProductLocationsList/ProductLocationsList";
import ProductsPageOne from "../components/Products/AddingProductPageOne/ProductsPageOne";

// ---------------------Review-------------------------
const Reviews1 = lazy(() => import('../components/Reviews1'));
const ReviewStoreWear = lazy(() => import('../components/Reviews1/ReviewDetail/ReviewStoreWear'));
const ReviewComment = lazy(() => import('../components/Reviews1/ReviewComment/ReviewStoreComment'));
const ReviewWearComment = lazy(() => import('../components/Reviews1/ReviewWearComment/ReviewWearComment'));

// --------------------MarketStore-----------------------
const MarketStore = lazy(() => import('../components/MarketStore'));
const MarketIsStoreCheck = lazy(() => import('../components/MarketStore/MarketIsStoreCheck/MarketIsStoreCheck'));
const AddStore = lazy(() => import('../components/MarketStore/AddMarket/AddStore/AddStore'));
const MyMarket = lazy(() => import('../components/MarketStore/MyMarket/MyMarket'));
const MarketEdit = lazy(() => import('../components/MarketStore/Market_Edit/MarketEdit'));
const LocationsByIdShow = lazy(() => import('../components/MarketStore/LocationsById/LocationsById'));

// ------------------------Location----------------------------
// const MarketStore = lazy(() => import('../components/MarketStore'));
const MarketIsCheck = lazy(() => import('../components/MarketLocations/MarketIsCheck/MarketIsCheck'));
const LocationAddById = lazy(() => import('../components/MarketLocations/Locations/LocationAddById/LocationAddById'));
const LocationList = lazy(() => import('../components/MarketLocations/Locations/LocationList/LocationList'));
const LocationMapCity = lazy(() => import('../components/MarketLocations/Locations/LocationMapsCity/LocationMapCity'));
const LocationClothesCity = lazy(() => import('../components/MarketLocations/Locations/LocationClothes/LocationClothesCity'));

// -------------------------Product-----------------------------
const Products = lazy(() => import('../components/Products/Products'));
// const ProductIsCheck = lazy(() => import('../components/Products/ProductIsCheck/ProductIsCheck'));
// const ProductEditPage = lazy(() => import('../components/Products/AddingProductEdit/ProductsEditPage'));
// const ProductLocationsList = lazy(() => import('../components/Products/ProductLocationsList/ProductLocationsList'));
// const ProductsPageOne = lazy(() => import('../components/Products/AddingProductPageOne/ProductsPageOne'));

// -----------------------------Authentication-----------------
// const EditProfilePage = lazy(() => import('../components/Authentication/UserProfile/ProfileEditPage/EditProfilePage'));
const SignUpSeller = lazy(() => import('../components/Authentication/SellerAuthentication/SignUp/SignUpSeller'));
// const SignInSeller = lazy(() => import('../components/Authentication/SellerAuthentication/SignIn/SignInSeller'));
const ForgotPasswordSeller = lazy(() => import('../components/Authentication/SellerAuthentication/forgotPassword/ForgotPasswordSeller'));
const ResetPasswordSeller = lazy(() => import('../components/Authentication/SellerAuthentication/ResetPasswordSeller/ResetPasswordSeller'));
const MailVerfySeller = lazy(() => import('../components/Authentication/SellerAuthentication/MailVerfy/MailVerfySeller'));
const Error = lazy(() => import('../components/Error/Error'));
export default function RouterList() {

  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const location = useLocation();
  const [locationWindow, setLocationWindow] = useState("");
  useEffect(() => {
    setLocationWindow(location.pathname);
  }, [location.pathname, dressInfo?.isAuthen]);
  return (
    <div className="w-full h-full">
      <Routes>
        {/* ---------------------<Store>------------------------- */}

        <Route element={<Sidebar />}>
          <Route path="/reviews" element={
            <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
              <Reviews1 />
            </Suspense>
          }>
            <Route index element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <ReviewStoreWear />
              </Suspense>
            } />
            <Route path="review/store-wear" element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <ReviewStoreWear />
              </Suspense>
            } />
            <Route path="review/comment-store/:id" element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <ReviewComment />
              </Suspense>
            } />
            <Route path="review/comment-wear/:id" element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <ReviewWearComment />
              </Suspense>
            } />
          </Route>
          {/* ---------------------<Store>------------------------- */}
          <Route path="/store" element={
            <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
              <MarketStore />
            </Suspense>
          }>
            <Route index element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <MarketIsStoreCheck />
              </Suspense>
            } />
            <Route path="/store/market-add" element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <AddStore />
              </Suspense>
            } />
            <Route path="/store/market-list" element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <MyMarket />
              </Suspense>
            } />
            <Route path="/store/market-list/:id" element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <MarketEdit />
              </Suspense>
            } />
            <Route path="/store/locations/shop/:id" element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <LocationsByIdShow />
              </Suspense>
            } />
          </Route>
          {/* ---------------------<Locations>------------------------- */}
          <Route path="/locations-store" element={
            <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
              <MarketStore />
            </Suspense>
          }>
            <Route index element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <MarketIsCheck />
              </Suspense>
            } />
            <Route path="/locations-store/:id" element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <LocationAddById />
              </Suspense>
            } />
            <Route path="/locations-store/list" element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <LocationList />
              </Suspense>
            } />
            <Route path="/locations-store/city/:id" element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <LocationMapCity />
              </Suspense>
            } />
            <Route path="/locations-store/wears/:id" element={
              <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
                <LocationClothesCity />
              </Suspense>
            } />
          </Route>
          {/* ---------------------<LocationsProduct>------------------------- */}
          <Route path="/products" element={
            <Suspense fallback={<div className="w-full h-full"><LoadingForSeller /></div>}>
              <Products />
            </Suspense>
          }>
            {dressInfo?.isCheckPoructList?.length >= 1 ?
              <Route path="/products" element={<Navigate to="/products/location" />} />
              :
              <Route index element={<ProductIsCheck />} />
            }
            <Route path="/products/location/:id" element={<ProductEditPage />} />
            <Route path="/products/location" element={<ProductLocationsList />} />
            <Route path="/products/location/add/:id" element={<ProductsPageOne />} />
          </Route>
          <Route path={"/edit-profile"} element={<EditProfilePage />} />
        </Route>


        <Route path="/signup-seller" element={
          <Suspense fallback={<div>Loading...</div>}>
            <SignUpSeller />
          </Suspense>
        } />
        <Route path={"/login-seller"} element={<SignInSeller />} />
        {/* <Route path="/login-seller" element={
          <Suspense fallback={<div>Loading...</div>}>
            <SignInSeller />
          </Suspense>
        } /> */}
        <Route path="/" element={<Navigate to={"/login-seller"} />} />
        <Route path="/forgot-password-seller" element={
          <Suspense fallback={<div>Loading...</div>}>
            <ForgotPasswordSeller />
          </Suspense>
        } />
        <Route path="/reset-password-seller/:id" element={
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPasswordSeller />
          </Suspense>
        } />
        <Route path="/mail-verify-seller/:id" element={
          <Suspense fallback={<div>Loading...</div>}>
            <MailVerfySeller />
          </Suspense>
        } />
        <Route path="*" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Error colors="text-[#007DCA]" />
          </Suspense>
        } />


        {/* <Route path="*" element={<Error colors="text-[#d50000]" />} /> */}

      </Routes>

    </div>
  );
}
