import React, { useContext, useEffect, useState } from "react";
import ReviewStore from "./ReviewStore/ReviewStore";
import ReviewWear from "./ReviewWear/ReviewWear";
import { Space, DatePicker } from "antd";
import {
  CalendarIcons,
  CheckTrue,
  SearchIcon,
  StarIcon,
  StarOutlineIcon,
} from "../../../assets/icons";
import { dressMainData } from "../../../hook/ContextTeam";
import NoReviewProduct from "../NoReview/NoReview";
import MobileHumburgerMenu from "../../Navbar/mobileHamburgerMenu/MobileMenu";
const { RangePicker } = DatePicker;
export default function ReviewStoreWear() {
  const [storeOrWear, setStoreOrWear] = useState(false);
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <div className="w-full h-fit">
      {/* filter */}
      <div className="w-full block pb-4 md:py-4 md:border-b border-lightBorderColor">

        <div className="w-full py-6 border-lightBorderColor block md:hidden">
          <div className="w-full flex items-center justify-center">
            <button className="absolute left-4 ">
              <MobileHumburgerMenu />
            </button>
            <span className="text-2xl not-italic font-AeonikProMedium">
              Отзывы
            </span>
          </div>
          <div className="flex items-center justify-between border-t md:border-0 border-borderColor md:mt-0 md:pt-0 mt-3 pt-3">
            <section className="w-full md:w-fit flex items-center justify-between md:justify-static gap-x-6 md:gap-x-[15px]">
              <label
                htmlFor="searchStore"
                className="w-full md:max-w-[400px] h-10 overflow-hidden border  border-lightBorderColor flex items-center rounded-lg"
              >
                <input
                  type="text"
                  name="s"
                  id="searchStore"
                  className="w-full h-full   outline-0 	pl-[10px]"
                  placeholder="Поиск"
                />
                <span className="pr-[10px]">
                  <SearchIcon />
                </span>
              </label>
              <section className=" flex items-center gap-x-[30px] ">
                <span>
                  <CalendarIcons />
                </span>
                <span className="hidden md:flex items-center">
                  <Space direction="vertical" size={12}>
                    <RangePicker className="" placeholder={["от", "до"]} />
                  </Space>
                </span>
              </section>
            </section>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-between">
          <div className="max-w-[400px] w-[100%] h-10 overflow-hidden border border-lightBorderColor flex items-center px-[10px] rounded-lg">
            <input
              type="text"
              className="w-full h-full outline-0	"
              placeholder="Поиск"
            />
            <button>
              <SearchIcon />
            </button>
          </div>
          <div>
            <Space direction="vertical" size={12}>
              <RangePicker placeholder={["от", "до"]} />
            </Space>
          </div>
        </div>

      </div>
      <div className="mb-[30px] md:my-[30px] w-full flex justify-center items-center">
        <div className="w-fit h-[44px] bg-lightBorderColor flex items-center justify-center rounded-lg overflow-hidden">
          <button
            onClick={() => setStoreOrWear(false)}
            className={`w-[260px] ${!storeOrWear
              ? "text-textBlueColor border rounded-lg border-textBlueColor"
              : "text-black"
              } h-full flex items-center justify-center text-sm md:text-base not-italic font-AeonikProMedium`}
          >
            Одежда (6)
          </button>
          <button
            onClick={() => setStoreOrWear(true)}
            className={`w-[260px] ${storeOrWear
              ? "text-textBlueColor border rounded-lg border-textBlueColor"
              : "text-black"
              } h-full flex items-center justify-center text-sm md:text-base not-italic font-AeonikProMedium`}
          >
            Магазины (2)
          </button>
        </div>
      </div>
      <div>
        {dressInfo?.isItPorduct ? (
          storeOrWear ? (
            <ReviewStore />
          ) : (
            <ReviewWear />
          )
        ) : (
          <NoReviewProduct />
        )}
      </div>
    </div>
  );
}
