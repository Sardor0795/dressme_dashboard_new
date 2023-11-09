import React, { useContext, useEffect, useState } from "react";
import ReviewStore from "./ReviewStore/ReviewStore";
import ReviewWear from "./ReviewWear/ReviewWear";
import { SearchIcon } from "../../../assets/icons";
import { dressMainData } from "../../../hook/ContextTeam";
import NoReviewProduct from "../NoReview/NoReview";
import MobileHumburgerMenu from "../../Navbar/mobileHamburgerMenu/MobileMenu";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../hook/useHttp";
import LoadingForSeller from "../../Loading/LoadingFor";

export default function ReviewStoreWear() {
  const { request } = useHttp();
  const [loading, setLoading] = useState(true);
  const [storeOrWear, setStoreOrWear] = useState(false);
  const [reviewsStore, setReviewsStore] = useState();
  const [reviewsProduct, setReviewsProduct] = useState();
  const [dressInfo, setDressInfo] = useContext(dressMainData);

  // -------------  GET ALL SHOPS LENGTH --------------
  useQuery(
    ["get_revies_all_store"],
    () => {
      return request({ url: "/shops", token: true });
    },
    {
      onSuccess: (res) => {
        setLoading(false);
        setReviewsStore(res.shops.data.length);
        console.log(res.shops.data.length, "Store");
      },
      onError: (err) => {
        setLoading(false);
        console.log(err, "err getAll Shops");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  // -------------  GET ALL PRODUCTS LENGTH --------------
  useQuery(
    ["get_revies_all_products"],
    () => {
      return request({ url: "/products", token: true });
    },
    {
      onSuccess: (res) => {
        if (res.products) {
          setLoading(false);
          setReviewsProduct(res.products.data.length);
          console.log(res.products.data.length, "Products");
        }
      },
      onError: (err) => {
        setLoading(false);
        console.log(err, "err getAll Products");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <>
      {loading ? (
        <LoadingForSeller />
      ) : (
        <div className="w-full h-fit">
          {/* filter */}
          <div className="w-full block pb-4 md:py-4 md:border-b border-lightBorderColor">
            <div className="w-full md:py-0 py-6 border-lightBorderColor ">
              <div className="w-full flex items-center justify-center md:justify-start">
                <button className="absolute left-4 ">
                  <MobileHumburgerMenu />
                </button>
                <span className="text-2xl not-italic font-AeonikProMedium">
                  Отзывы
                </span>
              </div>
              <div className="flex items-center justify-between border-t md:border-0 border-borderColor md:mt-0 md:pt-0 mt-3 pt-3">
                <section className="w-full  flex items-center justify-between gap-x-[15px]">
                  <label
                    htmlFor="searchStore"
                    className="w-full md:max-w-[400px] h-10 flex md:hidden items-center overflow-hidden border  border-lightBorderColor  rounded-lg"
                  >
                    <input
                      type="text"
                      name="s"
                      id="searchStore"
                      className="w-full h-full outline-0 px-[10px]"
                      placeholder="Поиск"
                    />
                    <span className="px-[10px] bg-lightBorderColor h-full flex items-center justify-center">
                      <SearchIcon />
                    </span>
                  </label>
                </section>
              </div>
            </div>
          </div>
          <div className="mb-[30px] md:my-[30px] w-full flex justify-center items-center">
            <div className="w-fit h-[44px] bg-lightBorderColor flex items-center justify-center rounded-lg overflow-hidden">
              <button
                onClick={() => setStoreOrWear(false)}
                className={`w-[260px] ${
                  !storeOrWear
                    ? "text-textBlueColor border rounded-lg border-textBlueColor"
                    : "text-black"
                } h-full flex items-center justify-center text-sm md:text-base not-italic font-AeonikProMedium`}
              >
                Одежда ({reviewsProduct})
              </button>
              <button
                onClick={() => setStoreOrWear(true)}
                className={`w-[260px] ${
                  storeOrWear
                    ? "text-textBlueColor border rounded-lg border-textBlueColor"
                    : "text-black"
                } h-full flex items-center justify-center text-sm md:text-base not-italic font-AeonikProMedium`}
              >
                Магазины ({reviewsStore})
              </button>
            </div>
          </div>
          <div>
            {dressInfo?.isItPorduct ? (
              storeOrWear ? (
                <ReviewStore />
              ) : (
                <ReviewWear />
              )
            ) : (
              <NoReviewProduct />
            )}
          </div>
        </div>
      )}
    </>
  );
}
