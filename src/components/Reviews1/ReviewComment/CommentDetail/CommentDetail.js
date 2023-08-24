import React from "react";
import { deliveryIcon, man, nike, woman } from "../../../../assets";
import { StarIcon } from "../../../../assets/icons";

export default function CommentDetail() {
  return (
    <div className="w-full h-full ">
      <div className="md:h-11"></div>
      <div className="h-full w-full ">
        <div className="w-full md:h-[120px] flex items-center gap-x-5">
          <button className="w-20 h-20 md:h-[120px] md:w-[120px] flex items-center justify-center rounded-full md:rounded-[20px] border border-lightBorderColor">
            <img src={nike} alt="" />
          </button>
          <div className="flex flex-col">
            <span className="text-tableTextTitle2 text-sm md:text-2xl not-italic font-AeonikProMedium">
              Nike store official Dealer
            </span>
            <div className="flex md:hidden items-center mt-[5px]">
              <div className="flex md:hidden items-center mr-[5px] md:mr-[6px]">
                <StarIcon width={14} height={14}/>
                <StarIcon width={14} height={14}/>
                <StarIcon width={14} height={14}/>
                <StarIcon width={14} height={14}/>
                <StarIcon width={14} height={14}/>
              </div>
              <div className="flex items-center not-italic font-AeonikProRegular leading-4 text-right text-gray-500 md:ml-1 text-[12px] mt-[2px] md:mt-[3px] md:text-sm">
                <p className="font-AeonikProMedium text-black mr-[5px]">
                  5.0
                </p>
                <p className="text-setTexOpacity font-AeonikProRegular">
                  (859 votes) <span className="ml-[7px] md:ml-[10px]">|</span>{" "}
                </p>
                <p className="font-AeonikProRegular ml-[7px] md:ml-[10px] text-setTexOpacity">
                  4937 orders
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
        {/* Описание магазина */}
        <div className="w-full  md:pt-[30px]">
          <div className="w-full flex flex-col gap-y-[10px]">
            <span className="text-tableTextTitle2 text-lg not-italic font-AeonikProRegular">
              Описание магазина
            </span>
            <div className="w-full h-[154px] rounded-lg border border-lightBorderColor bg-bgColor py-3 px-4">
              <span className="text-gray-700 text-base not-italic font-AeonikProRegular">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
