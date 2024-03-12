import React, { useEffect, useState } from "react";
// import { CommentTitle } from "./CommentTitle/CommentTitle";
import CommentDetail from "./CommentDetail/CommentDetail";
import {
  CheckTrue,
  GoBackIcons,
  SearchIcon,
  StarIcon,
  StarOutlineIcon,
} from "../../../assets/icons";
import { Popover } from "antd";
import { BiChevronDown } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../hook/useHttp";
import CommentTitle from "./CommentTitle/CommentTitle";
import { useTranslation } from "react-i18next";

export default function ReviewComment() {
  const { request } = useHttp();
  const navigate = useNavigate();
  const [state, setState] = useState({
    openwear: false,
    locationListId: "",
    locationIsCheck: false,
    loading: true,
  });

  const { t } = useTranslation("reviews")

  const { id } = useParams();
  const newId = id?.replace(":", "");

  const { refetch } = useQuery(
    ["review_store_details"],
    () => {
      return request({ url: `/shops/${newId}`, token: true });
    },
    {
      onSuccess: (res) => {
        if (res) {
          setState({
            ...state,
            locationListId: res,
            locationIsCheck: res?.locations_exist,
            loading: false,
          });
        }
      },
      onError: (err) => {
        throw new Error(err || "something wrong");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  // ----------------Wear state management----------------------------
  const handleOpenChangeWear = (newOpen) => {
    setState({ ...state, openwear: newOpen });
  };

  const [filterStar, setFilterStar] = useState([
    { id: 1, checked: false, starValue: 5, starFree: 0, valueCount: 100 },
    { id: 2, checked: false, starValue: 4, starFree: 1, valueCount: 70 },
    { id: 3, checked: false, starValue: 3, starFree: 2, valueCount: 60 },
    { id: 4, checked: false, starValue: 2, starFree: 3, valueCount: 50 },
    { id: 5, checked: false, starValue: 1, starFree: 4, valueCount: 20 },
  ]);
  const handleFilterStar = (id) => {
    setFilterStar((current) => {
      return current.map((data) => {
        if (data?.id === id) {
          return { ...data, checked: !data?.checked };
        } else {
          return { ...data };
        }
      });
    });
  };
  const contentWear = (
    <div className="w-[220px] h-fit m-0 p-0">
      <div className="flex flex-col gap-y-3">
        {filterStar.map((data) => {
          return (
            <div
              key={data?.id}
              onClick={() => handleFilterStar(data?.id)}
              className="w-full h-5 flex items-center cursor-pointer"
            >
              <button
                className={`h-4 w-4 rounded-[2px] overflow-hidden flex items-center justify-center  ${data?.checked
                  ? "border border-textBlueColor bg-textBlueColor"
                  : "border border-lightBorderColor"
                  }`}
              >
                {data?.checked ? <CheckTrue /> : null}
              </button>
              <article className="flex items-center ml-[10px]">
                <span className="text-gray-700 text-base not-italic font-AeonikProRegular">
                  {data?.starValue}
                </span>
                <span className="flex items-center ml-[5px] gap-x-[2px]">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </span>
                <span className="flex items-center  gap-x-[2px]">
                  <StarOutlineIcon />
                  <StarOutlineIcon />
                </span>
              </article>
              <p className="ml-[15px] text-gray-700 text-base not-italic font-AeonikProRegular">
                ({data?.valueCount})
              </p>
            </div>
          );
        })}
      </div>
      <div className="w-full pt-5 mt-5 border-t border-lightBorderColor flex items-center justify-between">
        <span
          onClick={() => setState({ ...state, openwear: false })}
          className="h-8 w-[49%]  text-base not-italic font-AeonikProMedium flex items-center justify-center cursor-pointer text-tableTextTitle2 hover:text-textBlueColor text-center"
        >
          {t("cancel")}
        </span>
        <span className="h-8 w-[1px] bg-lightBorderColor"></span>
        <span
          onClick={() => setState({ ...state, openwear: false })}
          className="h-8 w-[49%]  text-base not-italic font-AeonikProMedium flex items-center justify-center cursor-pointer text-tableTextTitle2 hover:text-textBlueColor text-center"
        >
          {t("ready")}
        </span>
      </div>
    </div>
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full h-[100vh] px-4 md:px-10">
      <div className="w-full flex justify-between md:border-b border-lightBorderColor pt-6 md:py-6">
        <div className="w-full md:w-fit flex items-center justify-center md:justify-start">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="w-8 h-8 flex absolute md:static left-2 items-center cursor-pointer justify-center md:border border-borderColor rounded-lg"
          >
            <GoBackIcons />
          </button>
          <span className="block text-tableTextTitle2 text-xl md:text-2xl not-italic font-AeonikProMedium ml-[30px]">
            {t("more_details_of_product")}
          </span>
        </div>
        <div className="w-fit hidden md:flex gap-x-[30px]  ">
          <Popover
            open={state?.openwear}
            onOpenChange={handleOpenChangeWear}
            className="w-[244px] h-10 overflow-hidden cursor-pointer border border-lightBorderColor flex items-center justify-between px-[10px] rounded-[12px] "
            trigger="click"
            options={["Hide"]}
            placement="bottom"
            content={contentWear}
          >
            <p className="text-textLightColor text-sm not-italic font-AeonikProRegular">
              {t("filter_rating")}
            </p>
            <span>
              <BiChevronDown
                size={20}
                style={{ color: "#c2c2c2" }}
                className={`${
                  state?.openwear ? "rotate-[-180deg]" : ""
                } duration-200`}
              />
            </span>
          </Popover>
          <div className="w-[350px]  h-10 overflow-hidden border border-lightBorderColor flex items-center  rounded-[12px]">
            <input
              type="text"
              className="w-full h-full px-[10px] outline-0	"
              placeholder={`${t("search")}`}
              name="s"
            />
            <button className="px-[10px] bg-lightBorderColor h-full flex items-center justify-center">
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="relative w-full flex flex-col md:flex-row gap-x-[70px] mt-6">
        <div className="w-full md:w-[35%]">
          <CommentDetail state={state} />
        </div>

        <div className="w-full md:w-[calc(70%-40px)] ">
          <CommentTitle titleStore={state} handleRefetch={refetch} />
        </div>
      </div>
    </div>
  );
}
