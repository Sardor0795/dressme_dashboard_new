import React, { useEffect,} from "react";
import { deliveryIcon, man, woman } from "../../../../assets";
import { Rate } from "antd";
import { NoImg } from "../../../../assets/icons";


export default function CommentDetail({state}) {


  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full h-full ">
      {/* {state?.loading ? (
        <LoadingForSeller />
      ) : (
        <> */}
      <div className="md:h-11"></div>
      <div className="h-full w-full ">
        <div className="w-full md:h-[120px] flex items-center gap-x-5">
          <button className="w-20 h-20 md:h-[120px] md:w-[120px] flex items-center justify-center overflow-hidden rounded-full md:rounded-[20px] border border-lightBorderColor">
            <img
              src={state?.locationListId?.shop?.url_logo_photo || NoImg}
              alt=""
            />
            {/* {state?.locationListId?} */}
          </button>
          <div className="flex flex-col">
            <span className="text-tableTextTitle2 text-sm md:text-2xl not-italic font-AeonikProMedium">
              {state?.locationListId?.shop?.name || "noName"}
            </span>
            <div className="flex md:hidden items-center mt-[5px]">
              <div className="flex md:hidden items-center mr-[5px] md:mr-[6px]">
                <Rate
                  allowHalf
                  disabled
                  defaultValue={state?.locationListId?.overall_rating}
                />
              </div>
              <div className="flex items-center not-italic font-AeonikProRegular leading-4 text-right text-gray-500 md:ml-1 text-[12px] mt-[2px] md:mt-[3px] md:text-sm">
                <p className="font-AeonikProMedium text-black mr-[5px]">
                  {state?.locationListId?.shop?.overall_rating || "0"}
                </p>
                <p className="text-setTexOpacity font-AeonikProRegular">
                  ({state?.locationListId?.shop?.rated_users_count || "0"} votes){" "}
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
              {state?.locationListId?.shop?.delivery?.name_ru ||
                "NoDelivery"}
            </span>
          </div>
        </div>
      </div>
      {/* </>
      )} */}
    </div>
  );
}
