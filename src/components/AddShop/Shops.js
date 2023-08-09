import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BgSelectSkin } from "../../assets/icons";
import { Select } from "antd";

export default function AddShop() {
  return (
    <div className="w-full max-w-[920px] mx-auto px-4 md:px-[100px] mt-6 md:mt-12">
      <div className="my-4">
        <div className="text-center mb-6 md:mb-[50px] text-5 md:text-[35px] font-AeonikProMedium">
          Добавить локацию магазина
        </div>

        <div className="map">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1IFDOAXA009j9bU8x_h6QYVVN7Ws&hl=en_US&ehbc=2E312F"
            width="100%"
            height="480"
          ></iframe>
        </div>

        <div className="flex mt-[10px] gap-[25px] mb-[25px]">
          <div className="relative w-full h-[130px] border-2 border-dashed flex items-center justify-center rounded-lg mb-[69px] md:mb-20">
            <Link to="#" className="flex items-center justify-center">
              <span className="text-sm font-AeonikProMedium border-b border-textBlueColor text-textBlueColor mr-[5px]">
                Фото локации
              </span>
            </Link>
          </div>
          <div className="relative w-full h-[130px] border-2 border-dashed flex items-center justify-center rounded-lg mb-[69px] md:mb-20">
            <Link to="#" className="flex items-center justify-center">
              <span className="text-sm font-AeonikProMedium border-b border-textBlueColor text-textBlueColor mr-[5px]">
              Второе фото локации ?
              </span>
            </Link>
          </div>
          <div className="relative w-full h-[130px] border-2 border-dashed flex items-center justify-center rounded-lg mb-[69px] md:mb-20">
            <Link to="#" className="flex items-center justify-center">
              <span className="text-sm font-AeonikProMedium border-b border-textBlueColor text-textBlueColor mr-[5px]">
              Третье фото локации ?
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
