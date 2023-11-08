import React, { useEffect, useState } from "react";
import { deliveryIcon, man, nike, woman } from "../../../../assets";
import { StarIcon } from "../../../../assets/icons";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../../hook/useHttp";
import { Rate } from "antd";

export default function CommentDetail() {
  const { request } = useHttp();
  const [storeDetails, setStoreDetails] = useState();

  // ------------GET Has Reviews-STORE-Details ?-----------------
  useQuery(
    ["review_store_details"],
    () => {
      return request({ url: `/shops`, token: true });
    },
    {
      onSuccess: (res) => {
        if (res) {
          setStoreDetails(res.shops.data);
          // console.log(res.shops.data, "Review-Store-Details");
          // setCommentRatings(res.products.data.ratings)
        }
      },
      onError: (err) => {
        console.log(err, "ERR-IN-STORE-COMMENTS");
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
    <div className="w-full h-full ">
      <div className="md:h-11"></div>
      {storeDetails?.map((data) => {
        return (
          <div key={data.id} className="h-full w-full ">
            <div className="w-full md:h-[120px] flex items-center gap-x-5">
              <button className="w-20 h-20 md:h-[120px] md:w-[120px] flex items-center justify-center rounded-full md:rounded-[20px] border border-lightBorderColor">
                <img src={nike} alt="" />
              </button>
              <div className="flex flex-col">
                <span className="text-tableTextTitle2 text-sm md:text-2xl not-italic font-AeonikProMedium">
                  {data?.name}
                </span>
                <div className="flex md:hidden items-center mt-[5px]">
                  <div className="flex md:hidden items-center mr-[5px] md:mr-[6px]">
                    <Rate allowHalf disabled defaultValue={data?.overall_rating} />
                  </div>
                  <div className="flex items-center not-italic font-AeonikProRegular leading-4 text-right text-gray-500 md:ml-1 text-[12px] mt-[2px] md:mt-[3px] md:text-sm">
                    <p className="font-AeonikProMedium text-black mr-[5px]">
                      {data?.overall_rating ? data?.overall_rating : 0}
                    </p>
                    <p className="text-setTexOpacity font-AeonikProRegular">
                      ({data?.rated_users_count} votes){" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between md:justify-normal mt-[15px] md:mt-[30px] gap-x-5 md:border-b border-lightBorderColor pb-6 md:pb-10">
              <div className="flex items-center gap-x-1">
                <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-borderColor bg-lightBgColor md:bg-white">
                  <img src={man} alt="" />
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-lg border border-borderColor bg-lightBgColor md:bg-white">
                  <img src={woman} alt="" />
                </div>
              </div>
              <div className="h-12 flex items-center px-5 active:opacity-70 border border-borderColor bg-lightBgColor md:bg-white rounded-lg gap-x-3">
                <img src={deliveryIcon} alt="" />
                <span className="text-tableTextTitle2 text-[13px] md:text-base not-italic font-AeonikProMedium">
                  Собственная доставка
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
