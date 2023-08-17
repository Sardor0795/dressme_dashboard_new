import React from "react";
import { deliveryIcon, man, nike, woman } from "../../../../assets";

export default function CommentDetail() {
  return (
    <div className="w-full h-full ">
      <div className="h-11"></div>
      <div className="h-full  w-full ">
        <div className="w-full h-[120px]  flex items-center gap-x-5">
          <button className="h-[120px] w-[120px] flex items-center justify-center rounded-[20px] border border-lightBorderColor">
            <img src={nike} alt="" />
          </button>
          <span className="text-tableTextTitle2 text-2xl not-italic font-AeonikProMedium">
            Nike store official Dealer
          </span>
        </div>
        <div className="flex items-center mt-[30px] gap-x-5 border-b border-lightBorderColor pb-10">
          {" "}
          <div className="flex items-center gap-x-1">
            <div className="w-12 h-12 rounded-lg border border-borderColor flex items-center justify-center">
              <img src={man} alt="" />
            </div>
            <div className="w-12 h-12 rounded-lg border border-borderColor flex items-center justify-center">
              <img src={woman} alt="" />
            </div>
          </div>
          <div>
            <div className="h-12 px-5 active:opacity-70 border border-borderColor rounded-lg flex items-center gap-x-3">
              <img src={deliveryIcon} alt="" />
              <span className="text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                Собственная доставка
              </span>
            </div>
          </div>
        </div>
        {/* Описание магазина */}
        <div className="w-full  pt-[30px]">
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
