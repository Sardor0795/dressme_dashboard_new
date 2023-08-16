import React, { useState } from "react";
// import { ProductImg } from "../../assets";
import {
  CheckTrue,
  SearchIcon,
  StarIcon,
  StarOutlineIcon,
} from "../../../../assets/icons";
import { DatePicker, Space, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { ProductImg, wearImg } from "../../../../assets";

const { RangePicker } = DatePicker;
export default function LocationList() {
  const productList = [
    {
      id: 1,
      city: "Tashkent",
      address: "г. Ташкент, Чиланзарский район, квартал-7, д 45б (Катартал)",
      time: "10:00 - 20:00",
      wearLink: "Одежда",
      showMore: "Подробнее",
    },
    {
      id: 2,
      city: "Yunusobod",
      address: "г. Ташкент, Чиланзарский район, квартал-7, д 45б (Катартал)",
      time: "10:00 - 20:00",
      wearLink: "Одежда",
      showMore: "Подробнее",
    },
    {
      id: 3,
      city: "Mirzo Ulug'bek",
      address: "г. Ташкент, Чиланзарский район, квартал-7, д 45б (Катартал)",
      time: "10:00 - 20:00",
      wearLink: "Одежда",
      showMore: "Подробнее",
    },
    {
      id: 4,
      city: "Chilanzor",
      address: "г. Ташкент, Чиланзарский район, квартал-7, д 45б (Катартал)",
      time: "10:00 - 20:00",
      wearLink: "Одежда",
      showMore: "Подробнее",
    },
    {
      id: 5,
      city: "Mirabod",
      address: "г. Ташкент, Чиланзарский район, квартал-7, д 45б (Катартал)",
      time: "10:00 - 20:00",
      wearLink: "Одежда",
      showMore: "Подробнее",
    },
    {
      id: 6,
      city: "Yashnabod",
      address: "г. Ташкент, Чиланзарский район, квартал-7, д 45б (Катартал)",
      time: "10:00 - 20:00",
      wearLink: "Одежда",
      showMore: "Подробнее",
    },
  ];
  const navigate = useNavigate();
  const goMapCity = (id) => {
    navigate(`/locations-store/city/:${id}`);
  };
  const goMapWear = (id) => {
    navigate(`/locations-store/wears/:${id}`);
  };
  return (
    <div className="w-full h-full">
      <div className="mt-[16px]">
        <p className="text-black text-2xl not-italic font-AeonikProMedium my-4">
          Nike (6)
        </p>
      </div>
      {/* Table */}
      <div className="w-full h-fit">
        <div className="w-full mb-[10px] hidden md:block">
          <ul className="w-full h-full  flex items-center justify-between bg-lightBgColor border md:rounded-xl">
            <li className="w-[70px] pl-4 ">
              <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle2">
                No:
              </span>
            </li>
            <li className="w-[200px] pl-4 mr-[60px]">
              <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle2">
                Фото
              </span>
            </li>
            <div className="w-[calc(100%-230px)]  flex items-center justify-between">
              <li className="w-[15%] ">
                <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                  Регион{" "}
                </span>
              </li>
              <li className="w-[25%] ">
                <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                  Адрес
                </span>
              </li>
              <li className="w-[20%] text-center">
                <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                  Рабочее время
                </span>
              </li>
              <li className="w-[40%] flex items-center justify-end ">
                <button className="px-[30px] py-3 flex items-center rounded-lg active:scale-95  active:opacity-70 justify-center bg-weatherWinterColor">
                  <span className="text-sm  text-white not-italic font-AeonikProMedium">
                    Добавить локацию
                  </span>
                </button>
              </li>
            </div>
          </ul>
        </div>
        {/* table product */}
        <div className="w-full h-full  flex flex-col  md:rounded-xl overflow-auto rounded-xl border">
          {productList.map((data) => {
            return (
              <ul
                key={data?.id}
                className="w-full last:border-b-0  md:px-0 md:py-3 md:bg-lightBgColor overflow-hidden  md: flex items-center justify-between mb-[6px] md:mb-0 gap-x-5 md:gap-x-0 border-b  bg-lightBgColor"
              >
                <li className="w-[70px]  pl-4 flex items-center ">
                  {data?.id}
                </li>
                <li className="w-[200px] h-[100px] pl-4 flex items-center mr-[60px]">
                  <figure className="w-full h-full rounded-lg overflow-hidden">
                    <img className="w-[100%] h-[100%]" src={wearImg} alt="" />
                  </figure>
                </li>
                <div className="w-[calc(100%-230px)]   flex items-center justify-between">
                  <li className="md:w-[15%] h-full flex items-center ">
                    <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium">
                      {data?.city}
                    </span>
                  </li>
                  <li className="md:w-[25%] h-full flex items-center ">
                    <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium ">
                      {data?.address}
                    </span>{" "}
                  </li>
                  <li className="md:w-[20%] h-full flex items-center justify-center ">
                    <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium ">
                      {data?.time}
                    </span>
                  </li>
                  <li className="md:w-[20%] h-full flex items-center justify-center text-center">
                    <button
                      onClick={() => goMapWear(data?.city)}
                      className="text-textBlueColor text-center hover:underline text-[11px] md:text-base not-italic font-AeonikProMedium"
                    >
                      {data?.wearLink}
                    </button>
                  </li>
                  <li className="md:w-[20%] h-full flex items-center justify-center text-center">
                    <button
                      onClick={() => goMapCity(data?.city)}
                      className="text-textBlueColor text-center hover:underline text-[11px] md:text-base not-italic font-AeonikProMedium"
                    >
                      {data?.showMore}
                    </button>
                  </li>
                </div>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
}
