import React, { useContext, useEffect, useState } from "react";
import ReviewStore from "./ReviewStore/ReviewStore";
import ReviewWear from "./ReviewWear/ReviewWear";
import { SearchIcon } from "../../../assets/icons";
import { dressMainData } from "../../../hook/ContextTeam";
import MobileHumburgerMenu from "../../Navbar/mobileHamburgerMenu/MobileMenu";
import { HelperData } from "../../../hook/HelperDataStore";

export default function ReviewStoreWear() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [helperDatainform] = useContext(HelperData);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full h-full">
      {/* FILTER */}
      <div className="w-full h-full px-4 md:px-10 py-1">
        <div className="w-full block pb-4 md:py-4 md:border-b border-lightBorderColor">
          <div className="w-full md:py-0 py-6 border-lightBorderColor ">
            <div className="w-full flex items-center justify-center md:justify-start">
              <div className="absolute left-4 ">
                <MobileHumburgerMenu />
              </div>
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
              onClick={() => {
                setDressInfo({ ...dressInfo, showSelectedButton: "products" });
              }}
              className={`w-[260px] ${dressInfo?.showSelectedButton === "products"
                ? "text-textBlueColor border rounded-lg border-textBlueColor"
                : "text-black"
                } h-full flex items-center justify-center text-sm md:text-base not-italic font-AeonikProMedium`}
            >
              Товары
              {dressInfo?.getReviewProduct?.data?.length?.rated_users_count > 1 ? (dressInfo?.getReviewProduct) : null}
            </button>
            <button
              onClick={() => {
                setDressInfo({ ...dressInfo, showSelectedButton: "shops" });
              }}
              className={`w-[260px] ${dressInfo?.showSelectedButton === "shops"
                ? "text-textBlueColor border rounded-lg border-textBlueColor"
                : "text-black"
                } h-full flex items-center justify-center text-sm md:text-base not-italic font-AeonikProMedium`}
            >
              Магазины
              {helperDatainform?.shopsList?.shops?.data?.length?.rated_users_count > 1 ? (helperDatainform?.shopsList?.shops) : null}
            </button>
          </div>
        </div>
      </div>
      <div>
        {dressInfo?.showSelectedButton === "shops" ? (
          <ReviewStore />
        ) : (
          <ReviewWear />
        )
        }
      </div>
    </div>
  );
}
