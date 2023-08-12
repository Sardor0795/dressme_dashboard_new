import React from "react";
import { man, nike, woman } from "../../../assets";
import { StarIcon } from "../../../assets/icons";

const MarketList = () => {
  return (
    <div className="w-full h-[50vh] border border-red-500">
      <div className="w-full h-[100px] border border-borderColor rounded-lg flex items-center">
        <div className="flex items-center border border-black w-fit ">
          <figure className="w-[80px] md:w-[120px] h-[80px] md:h-[120px] md:left-[40px] rounded-full border border-searchBgColor flex items-center justify-center bg-white">
            <img src={nike} alt="" />
          </figure>
          <div className="flex flex-col ml-8 border border-red-500">
            <p className="text-xl font-AeonikProMedium mb-3">
              Nike Store Official Dealer
            </p>
            <div className="">
              <div className="flex items-center ">
                <div className="flex items-center  mr-[6px]">
                  <StarIcon />
                </div>
                <div className="not-italic font-AeonikProRegular text-[10px] ls:text-xs leading-4 text-right text-gray-500 md:ml-1 flex items-center text-sm">
                  <p className="font-AeonikProMedium text-black mr-1">5.0</p>
                  <p className="text-setTexOpacity font-AeonikProRegular">
                    (859 votes) <span className="ml-[10px]">|</span>{" "}
                  </p>
                  <p className="font-AeonikProRegular ml-[10px] text-setTexOpacity">
                    4937 orders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-1">
          <button className="w-12 h-12 rounded-lg border border-borderColor flex items-center justify-center">
            <img src={man} alt="" />
          </button>
          <button className="w-12 h-12 rounded-lg border border-borderColor flex items-center justify-center">
            <img src={woman} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default MarketList;
