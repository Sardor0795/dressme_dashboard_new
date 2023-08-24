import React, { useContext, useState } from "react";
import ReviewStore from "./ReviewStore/ReviewStore";
import ReviewWear from "./ReviewWear/ReviewWear";
import { Space, DatePicker } from "antd";
import {
  CheckTrue,
  SearchIcon,
  StarIcon,
  StarOutlineIcon,
} from "../../../assets/icons";
import { dressMainData } from "../../../hook/ContextTeam";
import NoReviewProduct from "../NoReview/NoReview";
const { RangePicker } = DatePicker;
export default function ReviewStoreWear() {
  const [storeOrWear, setStoreOrWear] = useState(false);
  const [dressInfo, setDressInfo] = useContext(dressMainData);

  return (
    <div className="w-full h-fit">
      {/* filter */}
      <div className="w-full hidden md:block pt-6 pb-4 md:py-4 md:border-b border-lightBorderColor">
        <div className="flex items-center justify-between">
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
      <div className="my-[30px] w-full flex justify-center items-center">
        <div className="w-full md:w-fit h-[44px] bg-lightBorderColor flex items-center justify-center rounded-lg overflow-hidden">
        <button
            onClick={() => setStoreOrWear(false)}
            className={`w-[260px] ${
              !storeOrWear
                ? "text-textBlueColor border rounded-lg border-textBlueColor"
                : "text-black"
            } h-full flex items-center justify-center text-sm md:text-base not-italic font-AeonikProMedium`}
          >
            Одежда (6)
          </button>
          <button
            onClick={() => setStoreOrWear(true)}
            className={`w-[260px] ${
              storeOrWear
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
