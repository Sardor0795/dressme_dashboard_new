import React, { useEffect, useContext, useState } from "react";
import { deliveryIcon, man, woman } from "../../../../assets";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Rate } from "antd";
import axios from "axios";
import LoadingForSeller from "../../../Loading/LoadingFor";
import { SellerRefresh } from "../../../../hook/SellerRefreshToken";
import { HelperData } from "../../../../hook/HelperDataStore";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../language/LanguageItem";
import { ShopList } from "../../../../hook/ShopList";
import { dressMainData } from "../../../../hook/ContextTeam";
import axiosInstance from "../../../Authentication/AxiosIntance";
const { REACT_APP_BASE_URL } = process.env;

const ReviewStore = () => {
  const [sellerRefreshToken] = useContext(SellerRefresh);
  const [helperDatainform, setHelperDatainform] = useContext(HelperData);
  const [shopList, setShopList] = useContext(ShopList);
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [state, setState] = useState({
    isShops: false,
  });
  const { t } = useTranslation("reviews");
  const [languageDetector] = useContext(LanguageDetectorDress);

  // // ------------GET  Has Magazin ?-----------------
  const fetchData = async (customHeaders) => {
    try {
      const response = await axiosInstance.get("/shops", {
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
    "Content-type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`, // Add other headers as needed
  };
  const { isLoading } = useQuery(
    ["seller_shops_list_review"],
    () => fetchData(customHeaders),
    {
      onSuccess: (data) => {
        if (data?.status >= 200 && data?.status < 300) {
          setShopList(data?.data);
        }
      },
      onError: (error) => {
        throw new Error(error || "something wrong");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  // ------------GET METHOD delivery-method-----------------
  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const data = await axios.get(`${REACT_APP_BASE_URL}/delivery-method`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
          },
        });
        if (data?.status >= 200 && data?.status < 300) {
          setHelperDatainform({
            ...helperDatainform,
            deliveryList: data?.data?.delivery_methods,
          });
        }
      } catch (error) {}
    };
    if (!helperDatainform?.deliveryList) {
      fetchDelivery();
    }
  }, []);
  useEffect(() => {
    if (shopList?.shops?.some((data) => data?.overall_rating > 0)) {
      setState({ ...state, isShops: true });
    }
  }, [shopList?.shops]);
  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`/reviews/review/comment-store/${id}`);
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
        <div className="w-full h-full px-4 md:px-10 py-1 flex flex-col gap-y-[30px]">
          {shopList?.shops?.length > 0 && state?.isShops > 0 ? (
            shopList?.shops
              ?.filter((e) => Number(e?.overall_rating) > 0)
              ?.map((data, i) => {
                return (
                  <div
                    key={data?.id}
                    className="w-full h-fit md:h-[100px] flex flex-col md:flex-auto justify-between items-center mx-auto border border-borderColor px-[15px] md:pr-10 rounded-lg py-5 md:py-0"
                  >
                    <action className="w-full flex md:hidden items-center justify-between">
                      <span className="w-1/2 h-[1px] bg-borderColor"></span>
                      <span className="text-[#d2d2d2] text-base font-AeonikProRegular mx-[10px]">
                        0{data.id}
                      </span>
                      <span className="w-1/2 h-[1px] bg-borderColor"></span>
                    </action>
                    <action className="w-full flex items-center justify-between md:-mt-3">
                      <section className="w-full md:w-[40%] overflow-auto flex items-center pb-[15px] md:pb-0 border-b border-borderColor md:border-none">
                        <div className="hidden md:flex items-center justify-center pr-7 pl-5 text-xl font-AeonikProRegular">
                          {i + 1}
                        </div>
                        <figure className="overflow-hidden max-w-[75px] md:max-w-[120px] max-h-[75px] md:max-h-[120px] min-w-[75px] md:min-w-[120px] min-h-[75px] md:min-h-[120px] rounded-full border border-searchBgColor flex items-center justify-center bg-white">
                          <img
                            className="w-full h-full object-cover"
                            src={data?.url_logo_photo}
                            alt=""
                          />
                        </figure>
                        <div className="w-full md:w-[60%] flex flex-col ml-[8px] md:ml-8">
                          <p className="block md:hidden break-all text-sm md:text-xl font-AeonikProMedium mb-[5px] md:mb-3">
                            {data?.name || null}
                          </p>
                          <p className="relative md:block hidden max-h-[56px] mb-[5px] overflow-hidden w-full break-all md:pr-4 text-[13px] md:w-[250px] ls:text-[14px] xs:text-xl md:text-lg font-AeonikProMedium">
                            {data?.name || null}
                            <span className="absolute right-[16px] top-[28px] w-full block linearGr h-[28px]"></span>
                          </p>
                          <div className="flex items-center">
                            <div className="flex items-center mr-[5px] md:mr-[6px]">
                              <Rate
                                disabled
                                allowHalf
                                count={1}
                                defaultValue={1}
                              />
                            </div>
                            <div className="flex items-center not-italic font-AeonikProRegular leading-4 text-right text-gray-500 md:ml-1 text-[12px] mt-[2px] md:mt-[3px] md:text-sm">
                              <p className="font-AeonikProMedium text-black mr-[5px]">
                                {data.overall_rating ? data.overall_rating : 0}
                              </p>
                              <p className="text-setTexOpacity font-AeonikProRegular">
                                ({" "}
                                {data.rated_users_count
                                  ? data.rated_users_count
                                  : 0}{" "}
                                {t("votes")} ){" "}
                              </p>
                            </div>
                          </div>
                        </div>
                      </section>
                      <section className="hidden w-[15%] md:flex items-center gap-x-1">
                        {data?.gender?.id === 1 || data?.gender?.id === 3 ? (
                          <div className="w-12 h-12 rounded-lg border border-borderColor flex items-center justify-center">
                            <img src={man} alt="" />
                          </div>
                        ) : null}

                        {data?.gender?.id === 2 || data?.gender?.id === 3 ? (
                          <div className="w-12 h-12 rounded-lg border border-borderColor flex items-center justify-center">
                            <img src={woman} alt="" />
                          </div>
                        ) : null}
                      </section>
                      <section className="h-[36px] ll:h-12 px-1 ls:px-[10px] md:w-[20%] ll:px-5 active:opacity-70 border border-borderColor rounded-lg hidden md:flex items-center justify-center gap-x-1 ll:gap-x-3">
                        <img src={deliveryIcon} alt="" />
                        {helperDatainform?.deliveryList
                          ?.filter((e) => e.id == data?.delivery_id)
                          ?.map((item) => {
                            return (
                              <span
                                key={item?.id}
                                className="text-tableTextTitle2 text-[11px] ls:text-[12px] ll:text-[14px] xs:text-base not-italic font-AeonikProRegular ll:font-AeonikProMedium"
                              >
                                {languageDetector?.typeLang === "ru" &&
                                  item?.name_ru}
                                {languageDetector?.typeLang === "uz" &&
                                  item?.name_uz}
                              </span>
                            );
                          })}
                      </section>
                      <section className="hidden w-[15%] md:flex items-center justify-center gap-x-[50px]">
                        <p
                          onClick={() => goDetail(data?.id)}
                          className="text-textBlueColor cursor-pointer  text-base not-italic font-AeonikProMedium hover:underline"
                        >
                          {t("more_details")}
                        </p>
                      </section>
                    </action>
                    <action className="w-full flex md:hidden items-center gap-x-1 mt-3">
                      <div className="w-9 h-9 rounded-lg border border-borderColor bg-lightBgColor flex items-center justify-center">
                        <img src={man} alt="" />
                      </div>
                      <div className="w-9 h-9 rounded-lg border border-borderColor bg-lightBgColor flex items-center justify-center">
                        <img src={woman} alt="" />
                      </div>
                      <div className="flex items-center h-9 ml-auto bg-lightBgColor px-[10px] active:opacity-70 border border-borderColor rounded-lg gap-x-3">
                        <img src={deliveryIcon} alt="" />
                        <span className="text-tableTextTitle2 text-[13px] md:text-base not-italic font-AeonikProMedium">
                          {t("own_delivery")}
                        </span>
                      </div>
                    </action>
                    <button
                      onClick={() =>
                        navigate(`review/comment-store/${data?.id}`)
                      }
                      className="w-full md:hidden flex items-center justify-center active:scale-95 h-8 text-textBlueColor bg-[#E8F5FD] rounded-lg mt-6 text-[13px] font-AeonikProMedium"
                    >
                      {t("more_details")}
                    </button>
                  </div>
                );
              })
          ) : (
            <div className="w-full  h-[50vh] md:h-[70vh] flex items-center justify-center text-lg md:text-2xl font-medium">
              {t("no_reviews")}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default ReviewStore;
