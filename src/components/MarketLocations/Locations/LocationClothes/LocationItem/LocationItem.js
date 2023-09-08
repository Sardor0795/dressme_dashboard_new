import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import StoreListModal from "./StoreListModal";
import {
  AddLocationIcon,
  BgNoImgIcon,
  CheckIcons,
  DeleteIcon,
} from "../../../../../assets/icons";
import { pdpImg, wearImg } from "../../../../../assets";

export default function LocationItem({ data, click, index }) {
  const [openStoreList, setOpenStoreList] = useState(false);

  const [toggleMobileMenu, setToggleMobileMenu] = useState(true);

  const storeToggle = React.useCallback(() => setOpenStoreList(false), []);

  const navigate = useNavigate();
  const goProductDetailEdit = (id) => {
    navigate(`/locations-store/edit-detail/:${id}`);
  };

  const goMapCity = (id) => {
    navigate(`/locations-store/city/:${id}`);
  };
  const goMapWear = (id) => {
    navigate(`/locations-store/wears/:${id}`);
  };

  return (
    <div className="flex items-center w-full">
      {openStoreList && <StoreListModal onClick={storeToggle} />}

      <div
        onClick={() => {
          click(data?.id);
        }}
        className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${data?.isCheck
          ? "bg-[#007DCA] border-[#007DCA]"
          : "bg-white border-checkboxBorder"
          } hidden md:flex items-center justify-center rounded mr-[8px]`}
      >
        <span
          className={`${data?.isCheck ? "flex items-center justify-center" : "hidden"
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

      <div className="hidden border-lightBorderColor border rounded-[12px] bg-white pl-[30px] py-[8px] md:flex items-center gap-x-[5px] w-full">
        <div className="w-[40px]">{data?.id}</div>
        <div className="mr-[55px] flex items-center justify-center min-w-[60px] min-h-[60px] border border-lightBorderColor rounded-[12px] bg-lightBgColor">
          <BgNoImgIcon />
        </div>
        <div className="flex w-full items-center text-[13px]">
          <div className="w-[18%] text-weatherWinterColor">
            <span className="max-w-[169px] inline-block text-base not-italic font-AeonikProMedium">
              Спортивная мужская кроссовка Nike RUN
            </span>
          </div>
          <div className="text-tableTextTitle2 text-base not-italic font-AeonikProMedium w-[12%]">BAA-00004</div>
          <div className="text-tableTextTitle2 text-base not-italic font-AeonikProMedium w-[11%]">Футболка</div>
          <div className="w-[10%] text-tableTextTitle2 text-base not-italic font-AeonikProMedium">15-08-2023</div>
          <div className="w-[14%]">
            <div
              className={`w-[113px] text-center text-white font-AeonikProRegular py-[5px] px-[8px] rounded-full ${data?.bgColor} `}
            >
              {data?.state}
            </div>
          </div>
          <div className="w-[12%] text-tableTextTitle2 text-base not-italic font-AeonikProMedium">452 000 сум</div>
          <button
            onClick={() => goProductDetailEdit(data?.id)}
            className="text-textBlueColor text-center hover:underline text-[11px] md:text-base not-italic font-AeonikProMedium w-[15%] "
          >
            Подробнее
          </button>
          <button className="w-[9%] flex justify-center cursor-auto">
            <span
              onClick={() => setOpenStoreList(true)}
              className="cursor-pointer active:translate-y-[2px] text-[#D2D2D2] hover:text-[#F4A622] transition-colors duration-[0.2s] ease-linear"
            >
              <AddLocationIcon width={30} />
            </span>
          </button>
          <button className="w-[9%] flex justify-center cursor-auto">
            <span className="cursor-pointer active:translate-y-[2px] text-[#D2D2D2] hover:text-[#FF4747] transition-colors duration-[0.2s] ease-linear">
              <DeleteIcon width={30} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile */}

      <div className="border rounded-xl border-[##F2F2F2] p-[10px] mb-3 md:hidden w-full text-[13px]">
        <div className="mb-2">
          <div className="w-full md:w-fit flex items-center justify-between text-xl font-AeonikProRegular ">
            <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
            <span className="text-checkboxBorder">0{data.id}</span>
            <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
          </div>
        </div>

        <div className="mb-3 h-[148px]">
          <figure className="w-full h-full rounded-lg overflow-hidden">
            <img className="w-[100%] h-[100%] object-top	object-cover" src={wearImg} alt="" />
          </figure>
        </div>

        <div className="mb-3">
          <div className="w-full flex items-center  border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-[10px] py-[5px] text-[#3F6175] font-AeonikProMedium text-[13px] gap-x-[10px] mb-[8px]">
            <div className="w-[40%] flex items-center">Имя товара</div>
            <div className="w-[30%] flex items-center">Статус</div>
            <div className="w-[30%] flex items-center">Цена товара</div>
          </div>

          <div className="w-full px-[10px] gap-x-[10px] py-[5px] flex text-[#2C2C2C] font-AeonikProMedium text-[13px] ">

            <div className="relative w-[40%] overflow-hidden h-[60px] text-justify text-[#007DCA] not-italic font-AeonikProRegular text-[11px] ls:text-[12px] flex ">
              <div className="absolute ToogleOff left-0 w-full h-full z-[10] top-0"></div>
              {data?.name}
            </div>
            <div
              className={`w-[30%] font-AeonikProRegular  leading-none flex  justify-center text-white ${data.bgColor} rounded-lg  h-fit px-[5px] py-[4px]`}
            >
              {data?.state}
            </div>
            <div className="w-[30%]"> {data?.money} сум </div>
          </div>
        </div>

        <div
          className={`mb-3 overflow-hidden ${toggleMobileMenu ? "hidden" : "block"
            }`}
        >
          <div className="w-full flex items-center  border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-[10px] py-[5px] text-[#3F6175] font-AeonikProMedium text-[13px] gap-x-[10px] mb-[8px]">
            <div className="w-[21%] flex items-center">Артикул</div>
            <div className="w-[24%] flex items-center">Тип</div>
            <div className="w-[25%] flex items-center">Дата</div>
            <div className="w-[30%] flex items-center">Цена товара</div>
          </div>

          <div className="w-full px-[10px] gap-x-[10px] py-[5px] flex text-[#2C2C2C] font-AeonikProMedium text-[13px] items-center">
            <div className="w-[21%] not-italic font-AeonikProRegular text-[11px] ls:text-[12px] flex items-center">BAA-00004</div>
            <div className="w-[24%] not-italic font-AeonikProRegular text-[11px] ls:text-[12px] flex items-center">Футболка</div>
            <div className="w-[25%] not-italic font-AeonikProRegular text-[11px] ls:text-[12px] flex items-center"> 15-08-2023 </div>
            <div className="w-[30%] not-italic font-AeonikProRegular text-[11px] ls:text-[12px] flex items-center"> {data?.money} сум </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 gap-x-[15px] ">
          <button
            onClick={() => goMapWear(data?.city)}
            className="text-[#ED7925] bg-[#FDF1E8] text-center w-[50%] py-2 rounded-lg text-[13px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
          >
            Добавить в локацию
          </button>
          <button
            onClick={() => goProductDetailEdit(data?.city)}
            className="text-[#007DCA] bg-[#E8F5FD] text-center w-[50%] py-2 rounded-lg text-[13px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
          >
            Подробнее
          </button>
        </div>

        <div className="w-full flex items-center justify-between mt-[18px]">
          <div
            className="flex items-center text-[13px] leading-none cursor-pointer select-none"
            onClick={() => {
              click(data?.id);
            }}
          >
            <div
              className={`cursor-pointer min-w-[18px] min-h-[18px] border text-[#8C8C8C] border-checkboxBorder ${data?.isCheck
                ? "bg-[#007DCA] border-[#007DCA]"
                : "bg-white border-checkboxBorder"
                } flex items-center justify-center rounded mr-[5px]`}
            >
              <span
                className={`${data?.isCheck ? "flex items-center justify-center" : "hidden"
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="10"
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
            Выбрать
          </div>

          <button
            to="#"
            onClick={() => setToggleMobileMenu(!toggleMobileMenu)}
            className="text-textBlueColor text-[14px] font-AeonikProMedium"
          >
            {toggleMobileMenu ? "Больше..." : "Меньше..."}
          </button>
          <button className="text-red-600 text-[13px] font-AeonikProMedium active:translate-y-[2px]">
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
