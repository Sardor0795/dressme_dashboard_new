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
import PickerOfFilter from "../../../hook/DatePickerOfFilter/DatePickerOfFilter";
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

        <div className="w-full md:py-0 py-6 border-lightBorderColor ">
          <div className="w-full  md:hidden flex items-center justify-center">
            <button className="absolute left-4 ">
              <MobileHumburgerMenu />
            </button>
            <span className="text-2xl not-italic font-AeonikProMedium">
              Отзывы
            </span>
          </div>
          <div className="flex items-center justify-between border-t md:border-0 border-borderColor md:mt-0 md:pt-0 mt-3 pt-3">
            <section className="w-full  flex items-center justify-between gap-x-[15px]">
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
              <div className="w-fit">
                <PickerOfFilter />
              </div>
            </section>
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
