import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import StoreListModal from "./StoreListModal";
import {
  AddLocationIcon,
  BgNoImgIcon,
  DeleteIcon,
} from "../../../../../assets/icons";

export default function LocationItem({ data, click, index }) {
  const [openStoreList, setOpenStoreList] = useState(false);

  const storeToggle = React.useCallback(() => setOpenStoreList(false), []);

  const navigate = useNavigate();
  const goProductDetailEdit = (id) => {
    navigate(`/locations-store/edit-detail/:${id}`);
  };
  return (
    <div className="flex items-center w-full">
      {openStoreList && <StoreListModal onClick={storeToggle} />}
      <div
        onClick={() => {
          click(data?.id);
        }}
        className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
          data?.isCheck
            ? "bg-[#007DCA] border-[#007DCA]"
            : "bg-white border-checkboxBorder"
        } flex items-center justify-center rounded mr-[8px]`}
      >
        <span
          className={`${
            data?.isCheck ? "flex items-center justify-center" : "hidden"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="13"
            viewBox="0 0 11 13"
            fill="none"
          >
            <path
              d="M1 9.5L5.88235 11L10 1"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </span>
      </div>
      <div className="border-lightBorderColor border rounded-[12px] bg-white pl-[30px] py-[8px] flex items-center gap-x-[5px] w-full">
        <div className="w-[40px]">{data?.id}</div>
        <div className="mr-[55px] flex items-center justify-center min-w-[60px] min-h-[60px] border border-lightBorderColor rounded-[12px] bg-lightBgColor">
          <BgNoImgIcon />
        </div>
        <div className="flex w-full items-center">
          <div className="w-[18%] text-weatherWinterColor">
            <span className="max-w-[169px] inline-block">
              Спортивная мужская кроссовка Nike RUN
            </span>
          </div>
          <div className="text-tableTextTitle2 w-[12%]">BAA-00004</div>
          <div className="text-tableTextTitle2 w-[11%]">Футболка</div>
          <div className="w-[10%]">15-08-2023</div>
          <div className="w-[14%]">
            <div
              className={`w-fit text-white text-base font-AeonikProRegular py-[5px] px-[8px] rounded-full ${data?.bgColor} `}
            >
              {data?.state}
            </div>
          </div>
          <div className="w-[12%]">452 000 сумара</div>
          <button
            onClick={() => goProductDetailEdit(data?.id)}
            className="text-[18px] text-weatherWinterColor w-[15%] text-center"
          >
            Подробнее
          </button>
          <button
            onClick={
              data?.state === "Одобренный" ? () => setOpenStoreList(true) : null
            }
            className={`${
              data?.state === "Одобренный"
                ? "active:translate-y-[2px]"
                : "cursor-not-allowed"
            }  w-[9%] flex justify-center`}
          >
            <span>
              <AddLocationIcon
                color={data?.state !== "Одобренный" ? "disabled" : null}
                width={30}
              />
            </span>
          </button>
          <button
            className={`${
              data?.state === "Одобренный"
                ? "active:translate-y-[2px]"
                : "cursor-not-allowed"
            }  w-[9%] flex justify-center`}
          >
            <span>
              <DeleteIcon
                color={data?.state !== "Одобренный" ? "disabled" : null}
                width={30}
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
