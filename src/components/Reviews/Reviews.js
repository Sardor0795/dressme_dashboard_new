import React, { useState } from "react";
import { ProductImg } from "../../assets";
import {
  CheckTrue,
  SearchIcon,
  StarIcon,
  StarOutlineIcon,
} from "../../assets/icons";
import { DatePicker, Space, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";

const { RangePicker } = DatePicker;
export default function Reviews() {
  const productList = [
    {
      id: 1,
      text: "Nike store official Dealer",
      starCount: 5,
      dateSend: "19 февраля 2023 г.",
      link: "Подробнее",
    },
    {
      id: 2,
      text: "Nike store official Dealer",
      starCount: 5,
      dateSend: "19 февраля 2023 г.",
      link: "Подробнее",
    },
    {
      id: 3,
      text: "Nike store official Dealer",
      starCount: 5,
      dateSend: "19 февраля 2023 г.",
      link: "Подробнее",
    },
    {
      id: 4,
      text: "Nike store official Dealer",
      starCount: 5,
      dateSend: "19 февраля 2023 г.",
      link: "Подробнее",
    },
    {
      id: 5,
      text: "Nike store official Dealer",
      starCount: 5,
      dateSend: "19 февраля 2023 г.",
      link: "Подробнее",
    },
    {
      id: 6,
      text: "Nike store official Dealer",
      starCount: 5,
      dateSend: "19 февраля 2023 г.",
      link: "Подробнее",
    },
    {
      id: 7,
      text: "Nike store official Dealer",
      starCount: 5,
      dateSend: "19 февраля 2023 г.",
      link: "Подробнее",
    },
  ];
  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`/review-details/:${id}`);
  };
  const [state, setState] = useState({
    openwear: false,
  });

  const handleOpenChangeWear = (newOpen) => {
    setState({ ...state, openwear: newOpen });
  };
  const [filterStar, setFilterStar] = useState([
    { id: 1, checked: false, starValue: 5, starFree: 0, valueCount: 100 },
    { id: 2, checked: false, starValue: 4, starFree: 1, valueCount: 70 },
    { id: 3, checked: false, starValue: 3, starFree: 2, valueCount: 60 },
    { id: 4, checked: false, starValue: 2, starFree: 3, valueCount: 50 },
    { id: 5, checked: false, starValue: 1, starFree: 4, valueCount: 20 },
  ]);
  const handleFilterStar = (id) => {
    setFilterStar((current) => {
      return current.map((data) => {
        if (data?.id === id) {
          return { ...data, checked: !data?.checked };
        } else {
          return { ...data };
        }
      });
    });
  };
  const contentWear = (
    <div className="w-[220px] h-fit m-0 p-0">
      <div className="flex flex-col gap-y-3">
        {filterStar.map((data) => {
          return (
            <div
              key={data?.id}
              onClick={() => handleFilterStar(data?.id)}
              className="w-full h-5 flex items-center cursor-pointer"
            >
              <button
                className={`h-4 w-4 rounded-[2px] overflow-hidden flex items-center justify-center  ${
                  data?.checked
                    ? "border border-textBlueColor bg-textBlueColor"
                    : "border border-lightBorderColor"
                }`}
              >
                {data?.checked ? <CheckTrue /> : null}
              </button>
              <article className="flex items-center ml-[10px]">
                <span className="text-gray-700 text-base not-italic font-AeonikProRegular">
                  {data?.starValue}
                </span>
                <span className="flex items-center ml-[5px] gap-x-[2px]">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </span>
                <span className="flex items-center  gap-x-[2px]">
                  <StarOutlineIcon />
                  <StarOutlineIcon />
                </span>
              </article>
              <p className="ml-[15px] text-gray-700 text-base not-italic font-AeonikProRegular">
                ({data?.valueCount})
              </p>
            </div>
          );
        })}
      </div>
      <div className="w-full pt-5 mt-5 border-t border-lightBorderColor flex items-center justify-between">
        <span
          onClick={() => setState({ ...state, openwear: false })}
          className="h-8 w-[49%]  text-base not-italic font-AeonikProMedium flex items-center justify-center cursor-pointer text-tableTextTitle2 hover:text-textBlueColor text-center"
        >
          Отмена
        </span>
        <span className="h-8 w-[1px] bg-lightBorderColor"></span>
        <span
          onClick={() => setState({ ...state, openwear: false })}
          className="h-8 w-[49%]  text-base not-italic font-AeonikProMedium flex items-center justify-center cursor-pointer text-tableTextTitle2 hover:text-textBlueColor text-center"
        >
          Готово
        </span>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full px-4 md:px-10 py-1">
      <div className="w-full pt-6 pb-4 md:py-4 md:border-b border-lightBorderColor block">
        <div className="flex justify-end items-center md:justify-between">
          <section className="hidden md:block">
            <p className="text-black text-2xl not-italic font-AeonikProMedium">
              С возвращением, Абдулазиз!
            </p>
          </section>
          <section className="mobileDate flex items-center gap-x-[30px]">
            <Popover
              open={state?.openwear}
              onOpenChange={handleOpenChangeWear}
              className="hidden md:flex items-center justify-between w-[244px] h-10 overflow-hidden cursor-pointer border border-lightBorderColor px-[10px] rounded-lg "
              trigger="click"
              options={["Hide"]}
              placement="bottom"
              content={contentWear}
            >
              <p className="text-textLightColor text-sm not-italic font-AeonikProMedium">
                Фильтр рейтинг
              </p>
              <span>
                <BiChevronDown
                  size={20}
                  style={{ color: "#c2c2c2" }}
                  className={`${
                    state?.openwear ? "rotate-[-180deg]" : ""
                  } duration-200`}
                />
              </span>
            </Popover>
            <Space direction="vertical" size={12}>
              <RangePicker />
            </Space>
          </section>
        </div>
        <section className="flex md:hidden pt-6">
          <p className="text-black text-2xl not-italic font-AeonikProMedium">
            С возвращением, Абдулазиз!
          </p>
        </section>
      </div>
      {/* Table */}
      <div className="w-full h-fit md:mt-7">
        <div className="w-full mb-[10px] hidden md:block">
          <ul className="w-full h-full  flex items-center justify-between ">
            <li className="w-[20%] pl-5 ">
              <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                Изображение
              </span>
            </li>
            <li className="w-[20%] ">
              <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                Наименование товара
              </span>
            </li>
            <li className="w-[20%] ">
              <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                Отзывы
              </span>
            </li>
            <li className="w-[20%] ">
              <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                Дата
              </span>
            </li>
            <li className="w-[20%] flex items-center justify-end ">
              <div className="max-w-[350px] w-[100%] h-10 overflow-hidden border border-lightBorderColor flex items-center px-[10px] rounded-lg">
                <input
                  type="text"
                  className="w-full h-full  outline-0	"
                  placeholder="Поиск"
                />
                <button>
                  <SearchIcon />
                </button>
              </div>
            </li>
          </ul>
        </div>
        {/* table product */}
        <div className="w-full h-full border-lightBorderColor md:bg-lightBgColor md:rounded-xl overflow-auto">
          {productList.map((data) => {
            return (
              <ul
                key={data?.id}
                className="w-full p-2 md:px-0 md:py-5 overflow-hidden border md:border-b border-borderColor flex items-center mb-[6px] md:mb-0 gap-x-5 md:gap-x-0 rounded-xl md:rounded-none md:first:rounded-t-xl md:last:rounded-b-xl bg-lightBgColor"
              >
                <li className="w-[20%] md:pl-5 h-fit flex items-center ">
                  <figure>
                    <img src={ProductImg} alt="" />
                  </figure>
                </li>
                <div className="w-[80%] flex flex-col md:flex-row md:items-center ml-auto">
                  <li className="md:w-[25%] h-full flex items-center">
                    <span className="block md:hidden text-[13px] font-AeonikProMedium mr-[10px]">
                      Имя товара
                    </span>
                    <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium">
                      {data?.text}
                    </span>
                  </li>
                  <li className="md:w-[25%] h-full flex items-center">
                    <span className="block md:hidden text-[13px] font-AeonikProMedium mr-[10px]">
                      Отзывы
                    </span>
                    <div className="flex items-center">
                      <StarIcon className="" />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </div>
                  </li>
                  <li className="md:w-[20%] h-full flex items-center ">
                    <span className="block md:hidden text-[13px] font-AeonikProMedium mr-[10px]">
                      Дата
                    </span>
                    <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium ">
                      {data?.dateSend}
                    </span>
                  </li>
                  <li className="md:w-[20%] h-full flex items-center justify-end pr-1 md:pr-[50px] md:ml-auto">
                    <button
                      onClick={() => goDetail(data?.id)}
                      className="text-textBlueColor border-b border-textBlueColor text-[11px] md:text-base not-italic font-AeonikProMedium ml-auto"
                    >
                      {data?.link}
                    </button>
                  </li>
                </div>
              </ul>
            );
          })}
        </div>
      </div>
      <div className="hidden md:block">Reviews</div>
    </div>
  );
}
