import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
// import Error from "../components/Error/Error";
import { dressMainData } from "../hook/ContextTeam";
// --------------------------MarketStore=----------------
// import MarketStore from "../components/MarketStore";
// import MyMarket from "../components/MarketStore/MyMarket/MyMarket";
// import MarketEdit from "../components/MarketStore/Market_Edit/MarketEdit";
// import AddStore from "../components/MarketStore/AddMarket/AddStore/AddStore";
// import AddLocation from "../components/MarketStore/AddMarket/AddLocation/AddLocation";
// --------------------------Products=----------------
// import Products from "../components/Products/Products";
// import ProductsPageOne from "../components/Products/AddingProductPageOne/ProductsPageOne";
// import NoLocationProduct from "../components/Products/NoLocationsProduct/NoLocationsProduct";
// import ProductLocationsList from "../components/Products/ProductLocationsList/ProductLocationsList";
// --------------------------MarketLocations--------------
// import NoLocations from "../components/MarketLocations/NoLocations/NoLocations";
// import MarketLocations from "../components/MarketLocations";
// import LocationList from "../components/MarketLocations/Locations/LocationList/LocationList";
// import LocationMapCity from "../components/MarketLocations/Locations/LocationMapsCity/LocationMapCity";
// import LocationClothesCity from "../components/MarketLocations/Locations/LocationClothes/LocationClothesCity";
// import ProductEditDetailLocation from "../components/MarketLocations/Locations/ProductEditInLocation/AddingProductPageOne/ProductEditDetailLocation";
// import ProductEditTitleLocation from "../components/MarketLocations/Locations/ProductEditInLocation/AddingProductPageTwo/ProductEditTitleLocation";
// import MarketIsCheck from "../components/MarketLocations/MarketIsCheck/MarketIsCheck";
// -------------------Reviews1----------
// import Reviews1 from "../components/Reviews1";
// import ReviewComment from "../components/Reviews1/ReviewComment/ReviewStoreComment";
// import ReviewStoreWear from "../components/Reviews1/ReviewDetail/ReviewStoreWear";
// import ReviewWearComment from "../components/Reviews1/ReviewWearComment/ReviewWearComment";
// -------------------Authentication----------
// import { EditProfilePage } from "../components/Authentication/UserProfile/ProfileEditPage/EditProfilePage";
// import SignUpSeller from "../components/Authentication/SellerAuthentication/SignUp/SignUpSeller";
// import SignInSeller from "../components/Authentication/SellerAuthentication/SignIn/SignInSeller";
// import ForgotPasswordSeller from "../components/Authentication/SellerAuthentication/forgotPassword/ForgotPasswordSeller";
// import ResetPasswordSeller from "../components/Authentication/SellerAuthentication/ResetPasswordSeller/ResetPasswordSeller";
// import MailVerfySeller from "../components/Authentication/SellerAuthentication/MailVerfy/MailVerfySeller";
// import { useQuery } from "@tanstack/react-query";
// import LocationAddById from "../components/MarketLocations/Locations/LocationAddById/LocationAddById";
// import MarketIsStoreCheck from "../components/MarketStore/MarketIsStoreCheck/MarketIsStoreCheck";
// import LoadingForSeller from "../components/Loading/LoadingFor";
// import LocationsByIdShow from "../components/MarketStore/LocationsById/LocationsById";
// import ProductIsCheck from "../components/Products/ProductIsCheck/ProductIsCheck";
// import ProductEditPage from "../components/Products/AddingProductEdit/ProductsEditPage";
// import EditProfilePage from "../components/Authentication/UserProfile/ProfileEditPage/EditProfilePage";
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
const ProductIsCheck = lazy(() => import('../components/Products/ProductIsCheck/ProductIsCheck'));
const ProductEditPage = lazy(() => import('../components/Products/AddingProductEdit/ProductsEditPage'));
const ProductLocationsList = lazy(() => import('../components/Products/ProductLocationsList/ProductLocationsList'));
const ProductsPageOne = lazy(() => import('../components/Products/AddingProductPageOne/ProductsPageOne'));

// -----------------------------Authentication-----------------
const EditProfilePage = lazy(() => import('../components/Authentication/UserProfile/ProfileEditPage/EditProfilePage'));
const SignUpSeller = lazy(() => import('../components/Authentication/SellerAuthentication/SignUp/SignUpSeller'));
const SignInSeller = lazy(() => import('../components/Authentication/SellerAuthentication/SignIn/SignInSeller'));
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
  // console.log(dressInfo?.isCheckPoructList?.length, "dressInfo?.isCheckPoructList?.length");
  return (
    <div className="w-full h-full">
      {/* <NavbarForSetting /> */}
      <Routes>
        {/* ---------------------<Authentification>------------------------- */}
        {/* ---------------------<Store>------------------------- */}
        {/* <Route path="/reviews" element={<Reviews1 />}>
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
        </Route> */}

        <Route path="/reviews" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Reviews1 />
          </Suspense>
        }>
          <Route index element={
            <Suspense fallback={<div>Loading...</div>}>
              <ReviewStoreWear />
            </Suspense>
          } />
          <Route path="review/store-wear" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ReviewStoreWear />
            </Suspense>
          } />
          <Route path="review/comment-store/:id" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ReviewComment />
            </Suspense>
          } />
          <Route path="review/comment-wear/:id" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ReviewWearComment />
            </Suspense>
          } />
        </Route>


        {/* ---------------------<Store>------------------------- */}
        {/* <Route path="/store" element={<MarketStore />}>
          <Route index element={<MarketIsStoreCheck />} />
          <Route path="/store/market-add" element={<AddStore />} />
          <Route path="/store/market-list" element={<MyMarket />} />
          <Route path="/store/market-list/:id" element={<MarketEdit />} />
          <Route path="/store/locations/shop/:id" element={<LocationsByIdShow />} />
        </Route> */}
        <Route path="/store" element={
          <Suspense fallback={<div>Loading...</div>}>
            <MarketStore />
          </Suspense>
        }>
          <Route index element={
            <Suspense fallback={<div>Loading...</div>}>
              <MarketIsStoreCheck />
            </Suspense>
          } />
          <Route path="/store/market-add" element={
            <Suspense fallback={<div>Loading...</div>}>
              <AddStore />
            </Suspense>
          } />
          <Route path="/store/market-list" element={
            <Suspense fallback={<div>Loading...</div>}>
              <MyMarket />
            </Suspense>
          } />
          <Route path="/store/market-list/:id" element={
            <Suspense fallback={<div>Loading...</div>}>
              <MarketEdit />
            </Suspense>
          } />
          <Route path="/store/locations/shop/:id" element={
            <Suspense fallback={<div>Loading...</div>}>
              <LocationsByIdShow />
            </Suspense>
          } />
        </Route>

        {/* ---------------------<Locations>------------------------- */}

        {/* <Route path="/locations-store" element={<MarketStore />}>
          <Route index element={<MarketIsCheck />} />
          <Route path="/locations-store/:id" element={<LocationAddById />} />
          <Route path="/locations-store/list" element={<LocationList />} />
          <Route path="/locations-store/city/:id" element={<LocationMapCity />} />
          <Route path="/locations-store/wears/:id" element={<LocationClothesCity />} />

        </Route> */}

        <Route path="/locations-store" element={
          <Suspense fallback={<div>Loading...</div>}>
            <MarketStore />
          </Suspense>
        }>
          <Route index element={
            <Suspense fallback={<div>Loading...</div>}>
              <MarketIsCheck />
            </Suspense>
          } />
          <Route path="/locations-store/:id" element={
            <Suspense fallback={<div>Loading...</div>}>
              <LocationAddById />
            </Suspense>
          } />
          <Route path="/locations-store/list" element={
            <Suspense fallback={<div>Loading...</div>}>
              <LocationList />
            </Suspense>
          } />
          <Route path="/locations-store/city/:id" element={
            <Suspense fallback={<div>Loading...</div>}>
              <LocationMapCity />
            </Suspense>
          } />
          <Route path="/locations-store/wears/:id" element={
            <Suspense fallback={<div>Loading...</div>}>
              <LocationClothesCity />
            </Suspense>
          } />
        </Route>



        {/* ---------------------<LocationsProduct>------------------------- */}
        {/* <Route path="/products" element={<Products />}>
          {dressInfo?.isCheckPoructList?.length >= 1 ?
            <Route path="/products" element={<Navigate to={"/products/location"} />} />
            :
            <Route index element={<ProductIsCheck />} />
          }

          <Route path="/products/location/:id" element={<ProductEditPage />} />
          <Route path="/products/location" element={<ProductLocationsList />} />
          <Route path="/products/location/add/:id" element={<ProductsPageOne />} />
        </Route> */}
        <Route path="/products" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Products />
          </Suspense>
        }>
          {dressInfo?.isCheckPoructList?.length >= 1 ?
            <Route path="/products" element={<Navigate to="/products/location" />} />
            :
            <Route index element={
              <Suspense fallback={<div>Loading...</div>}>
                <ProductIsCheck />
              </Suspense>
            } />
          }
          <Route path="/products/location/:id" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductEditPage />
            </Suspense>
          } />
          <Route path="/products/location" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductLocationsList />
            </Suspense>
          } />
          <Route path="/products/location/add/:id" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ProductsPageOne />
            </Suspense>
          } />
        </Route>

        {
          localStorage.getItem("DressmeUserToken") ?
            <Route path="/" element={<Navigate to={"/edit-profile"} />} />
            :
            <Route path="/" element={<Navigate to={"/login-seller"} />} />

        }

        {/* 
        <Route path={"/edit-profile"} element={<EditProfilePage />} />
        <Route path={"/signup-seller"} element={<SignUpSeller />} />
        <Route path={"/login-seller"} element={<SignInSeller />} />
        <Route path={"/forgot-password-seller"} element={<ForgotPasswordSeller />} />
        <Route path={"/reset-password-seller/:id"} element={<ResetPasswordSeller />} />
        <Route path={"/mail-verify-seller/:id"} element={<MailVerfySeller />} />
        <Route path="*" element={<Error colors="text-[#007DCA]" />} /> */}
        <Route path="/edit-profile" element={
          <Suspense fallback={<div>Loading...</div>}>
            <EditProfilePage />
          </Suspense>
        } />
        <Route path="/signup-seller" element={
          <Suspense fallback={<div>Loading...</div>}>
            <SignUpSeller />
          </Suspense>
        } />
        <Route path="/login-seller" element={
          <Suspense fallback={<div>Loading...</div>}>
            <SignInSeller />
          </Suspense>
        } />
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
