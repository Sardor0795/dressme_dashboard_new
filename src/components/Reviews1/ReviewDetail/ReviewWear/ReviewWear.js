import React, { useContext, useEffect, useState } from "react";
import { SearchIcon } from "../../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../../hook/useHttp";
import { Rate } from "antd";
import LoadingForSeller from "../../../Loading/LoadingFor";
import axios from "axios";
import { dressMainData } from "../../../../hook/ContextTeam";
import { SellerRefresh } from "../../../../hook/SellerRefreshToken";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../language/LanguageItem";
const { REACT_APP_BASE_URL } = process.env;

export default function ReviewWear() {

  const navigate = useNavigate();

  // ------------GET  Has Reviews ?-----------------
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [sellerRefreshToken] = useContext(SellerRefresh)

  const { t } = useTranslation("reviews");
  const [languageDetector] = useContext(LanguageDetectorDress);

  // // ------------GET  Has Magazin ?-----------------
  const fetchData = async (customHeaders) => {
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}/products`, {
        headers: customHeaders,
      });
      const status = response.status;
      const data = response.data;

      return { data, status };
    } catch (error) {
      const status = error.response ? error.response.status : null;
      return { error, status };
    }
  };

  const customHeaders = {
    'Content-type': 'application/json; charset=UTF-8',
    "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,    // Add other headers as needed
  };
  const { isLoading } = useQuery(['seller_product_list_review'], () => fetchData(customHeaders), {
    onSuccess: (data) => {
      if (data?.status >= 200 && data?.status < 300) {
        setDressInfo({ ...dressInfo, getReviewProduct: data?.data?.products?.data })
      }
      if (data?.status === 401) {
        sellerRefreshToken()
      }
    },
    onError: (error) => {
      if (error?.response?.status === 401) {
        sellerRefreshToken()

      }
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const goDetail = (id) => {
    navigate(`/reviews/review/comment-wear/${id}`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="relative">
      {isLoading ? (
        <div className="h-full w-full">
          <LoadingForSeller />
        </div>
      ) : (
        <div className="w-full h-full px-4 md:px-10 py-1">
          {/* {
          dressInfo?.getReviewProduct?.length > 0 &&
          dressInfo?.getReviewProduct?.rated_users_count > 0 ? ( */}
          <div className="w-full h-fit md:mt-7">
            <div className="w-full mb-[10px] hidden md:block">
              <ul className="w-full h-full  flex items-center justify-between ">
                <li className="w-[20%] pl-5 ">
                  <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                    {t("image")}
                  </span>
                </li>
                <li className="w-[20%] ">
                  <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                    {t("name_of_product")}
                  </span>
                </li>
                <li className="w-[20%] ">
                  <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                    {t("reviews")}
                  </span>
                </li>
                <li className="w-[20%] ">
                  <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                    {t("date")}
                  </span>
                </li>
                <li className="w-[20%] flex items-center justify-end ">
                  <div className="max-w-[350px] w-[100%] h-10 overflow-hidden border border-lightBorderColor flex items-center rounded-lg">
                    <input
                      type="text"
                      name="s"
                      className="w-full h-full px-[10px] outline-0	"
                      placeholder={`${t("search")}`}
                    />
                    <button className="px-[10px] bg-lightBorderColor h-full flex items-center justify-center">
                      <SearchIcon />
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            {/* table product */}
            <div className="w-full h-full border-lightBorderColor md:bg-lightBgColor md:rounded-xl overflow-auto VerticelScroll">
              {dressInfo?.getReviewProduct?.map((data) => {
                console.log(data,"data");
                console.log(
                  dressInfo?.getReviewProduct,
                  "dressInfo?.getReviewProduct"
                );
                return (
                  <ul
                    key={data?.id}
                    className="w-full p-2 md:px-0 md:py-5 overflow-hidden border md:border-b border-borderColor flex items-center mb-[6px] md:mb-0 gap-x-5 md:gap-x-0 rounded-xl md:rounded-none md:first:rounded-t-xl md:last:rounded-b-xl bg-lightBgColor"
                  >
                    <li className="w-[80px] h-[75px] md:w-[20%] md:h-fit md:pl-5 flex items-center ">
                      {data?.photos.length > 1
                        ? data?.photos?.map((item, index) =>
                            index === 0 ? (
                              <figure
                                key={index}
                                className="w-full h-full md:w-[200px] md:h-[100px] rounded-lg overflow-hidden border border-lightBorderColor"
                              >
                                <img
                                  className="w-full h-full object-contain"
                                  src={item.url_photo}
                                  alt=""
                                />
                              </figure>
                            ) : null
                          )
                        : data?.photos?.map((item) => {
                            return (
                              <figure
                                key={item.id}
                                className="w-full h-full md:w-[200px] md:h-[100px] rounded-lg overflow-hidden border border-lightBorderColor"
                              >
                                <img
                                  className="w-full h-full object-contain"
                                  src={item?.url_photo}
                                  alt=""
                                />
                              </figure>
                            );
                          })}
                    </li>
                    <div className="w-[80%] flex flex-col md:flex-row md:items-center ml-auto">
                      <li className="md:w-[25%] h-full flex items-center">
                        <span className="block md:hidden text-[13px] font-AeonikProMedium mr-[10px]">
                          {t("name_product")}
                        </span>
                        <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium">
                          {languageDetector?.typeLang === "ru" && data?.name_ru}
                          {languageDetector?.typeLang === "uz" && data?.name_ru}
                        </span>
                      </li>
                      <li className="md:w-[25%] h-full flex items-center">
                        <span className="block md:hidden text-[13px] font-AeonikProMedium mr-[10px]">
                          {t("reviews")}
                        </span>
                        <div className="flex items-center">
                          <Rate
                            disabled
                            allowHalf
                            defaultValue={data?.overall_rating}
                          />
                        </div>
                      </li>
                      <li className="md:w-[20%] h-full flex items-center ">
                        <span className="block md:hidden text-[13px] font-AeonikProMedium mr-[10px]">
                          {t("date")}
                        </span>
                        <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium ">
                          {data?.created_at}
                        </span>
                      </li>
                      <li className="md:w-[20%] h-full flex items-center justify-end pr-1 md:pr-[50px] md:ml-auto">
                        <button
                          onClick={() => goDetail(data?.id)}
                          className="text-textBlueColor border-b border-textBlueColor text-[11px] md:text-base not-italic font-AeonikProMedium ml-auto"
                        >
                          {t("more_details")}
                        </button>
                      </li>
                    </div>
                  </ul>
                );
              })}
            </div>
          </div>
          {/* ) : (
            <div className="w-full h-[50vh]  md:h-[70vh] flex items-center justify-center text-lg md:text-2xl font-medium">
              {t("no_reviews")}
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}
