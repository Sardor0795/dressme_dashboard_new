import React, { useContext, useEffect, useState } from "react";
import ReviewStore from "./ReviewStore/ReviewStore";
import ReviewWear from "./ReviewWear/ReviewWear";
import { SearchIcon } from "../../../assets/icons";
import { dressMainData } from "../../../hook/ContextTeam";
import MobileHumburgerMenu from "../../Navbar/mobileHamburgerMenu/MobileMenu";
import { HelperData } from "../../../hook/HelperDataStore";
import { useTranslation } from "react-i18next";
import { ShopList } from "../../../hook/ShopList";

export default function ReviewStoreWear() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [shopList, setShopList] = useContext(ShopList);
  const [state, setState] = useState({
    searchComment: "",
  });

  const { t } = useTranslation("reviews");

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full h-full  ">
      {/* FILTER */}
      <div className="w-full h-full px-4 md:px-10 py-1 ">
        <div className="w-full block pb-4 md:py-4 md:border-b border-lightBorderColor">
          <div className="w-full md:py-0 py-6 border-lightBorderColor ">
            <div className="w-full flex items-center justify-center md:justify-start">
              <div className="absolute left-4 ">
                <MobileHumburgerMenu />
              </div>
              <span className="text-2xl not-italic font-AeonikProMedium">
                {t("reviews")}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-[30px] md:my-[30px] w-full flex justify-center items-center">
          <div className="w-fit h-[44px] bg-lightBorderColor flex items-center justify-center rounded-lg overflow-hidden">
            <button
              onClick={() => {
                setDressInfo({ ...dressInfo, showSelectedButton: "products" });
              }}
              className={`w-[260px] ${
                dressInfo?.showSelectedButton === "products"
                  ? "text-textBlueColor border rounded-lg border-textBlueColor"
                  : "text-black"
              } h-full flex items-center justify-center text-sm md:text-base not-italic font-AeonikProMedium`}
            >
              {t("products")}
              {dressInfo?.getReviewProduct?.data?.length?.rated_users_count > 1
                ? dressInfo?.getReviewProduct
                : null}
            </button>
            <button
              onClick={() => {
                setDressInfo({ ...dressInfo, showSelectedButton: "shops" });
              }}
              className={`w-[260px] ${
                dressInfo?.showSelectedButton === "shops"
                  ? "text-textBlueColor border rounded-lg border-textBlueColor"
                  : "text-black"
              } h-full flex items-center justify-center text-sm md:text-base not-italic font-AeonikProMedium`}
            >
              {t("shops")}
              {shopList?.shops?.data?.length?.rated_users_count > 1
                ? shopList?.shops
                : null}
            </button>
          </div>
        </div>
      </div>
      <div>
        {dressInfo?.showSelectedButton === "shops" ? (
          <ReviewStore />
        ) : (
          <ReviewWear />
        )}
      </div>
    </div>
  );
}
