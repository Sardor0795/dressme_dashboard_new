import React, { useEffect, useState } from "react";
// import { CommentTitle } from "./CommentTitle/CommentTitle";
import CommentDetail from "./CommentDetail/CommentDetail";

import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../hook/useHttp";
import CommentTitle from "./CommentTitle/CommentTitle";
import { useTranslation } from "react-i18next";
import { BackBtn } from "../../backBtn/backBtn";
import LoadingForSeller from "../../Loading/LoadingFor";

export default function ReviewComment() {
  const { request } = useHttp();
  const navigate = useNavigate();
  const [state, setState] = useState({
    openwear: false,
    locationListId: "",
    locationIsCheck: false,
    loading: true,
    searchComment: "",
    gender_id: null,
  });

  const { t } = useTranslation("reviews");

  const { id } = useParams();
  const newId = id?.replace(":", "");

  const { refetch, isLoading } = useQuery(
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full h-[100vh] px-4 md:px-10">
      <div className="w-full flex justify-between md:border-b border-lightBorderColor pt-6 md:py-6">
        <div className="w-full md:w-fit flex items-center justify-between md:justify-start">
          <BackBtn />
          <span className="block text-tableTextTitle2 text-xl md:text-2xl not-italic font-AeonikProMedium ml-[30px]">
            {t("more_details_of_product")}
          </span>
          <div></div>
        </div>
      </div>
      {isLoading ? (
        <LoadingForSeller />
      ) : (
        <div className="relative w-full flex flex-col md:flex-row gap-x-[70px] mt-6">
          <div className="w-full md:w-[35%]">
            <CommentDetail state={state} />
          </div>

          <div className="w-full md:w-[calc(70%-40px)] ">
            <CommentTitle titleStore={state} handleRefetch={refetch} />
          </div>
        </div>)}
    </div>
  );
}
