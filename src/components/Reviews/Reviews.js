import React from "react";
import { ProductImg } from "../../assets";
import { SearchIcon, StarIcon } from "../../assets/icons";
import { DatePicker, Space } from "antd";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="w-full h-full px-10 py-1 border border-red-500">
      <div className="w-full py-4 border-b border-lightBorderColor flex items-center justify-between">
        <section className="">
          <p className="text-black text-2xl not-italic font-AeonikProMedium">
            С возвращением, Абдулазиз!
          </p>
        </section>
        <section className="">
          <Space direction="vertical" size={12}>
            <RangePicker />
          </Space>
        </section>
      </div>
      {/* Table */}
      <div className="w-full h-fit mt-7">
        <div className="w-full h-[60px]">
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
            <li className="w-[15%] ">
              <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                Отзывы
              </span>
            </li>
            <li className="w-[15%] ">
              <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                Дата
              </span>
            </li>
            <li className="w-[30%] flex items-center justify-end ">
              <div className="max-w-[350px] w-[100%] h-10 overflow-hidden border border-lightBorderColor flex items-center px-[10px] rounded-[12px]">
                <input
                  type="text"
                  className="w-full h-full  outline-0	"
                  placeholder="Поиск"
                />
                <button>
                  <SearchIcon />
                </button>
              </div>{" "}
            </li>
          </ul>
        </div>
        {/* table product */}
        <div className="w-full h-full overflow-hidden border border-lightBorderColor bg-lightBgColor rounded-[12px]">
          {productList.map((data) => {
            return (
              <ul className="w-full h-[95px] overflow-hidden border-b  border-borderColor flex items-center justify-between ">
                <li className="w-[20%] pl-5 h-full flex items-center ">
                  <figure>
                    <img src={ProductImg} alt="" />
                  </figure>
                </li>
                <li className="w-[20%] h-full flex items-center ">
                  <span className="text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                    {data?.text}
                  </span>
                </li>
                <li className="w-[15%] h-full flex items-center  flex items-center">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </li>
                <li className="w-[15%] h-full flex items-center ">
                  <span className="text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                    {data?.dateSend}
                  </span>
                </li>
                <li className="w-[30%] h-full flex items-center justify-end pr-[50px]">
                  <button
                    onClick={() => goDetail(data?.id)}
                    className="text-textBlueColor border-b border-textBlueColor  text-base not-italic font-AeonikProMedium"
                  >
                    {data?.link}
                  </button>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
      Reviews
    </div>
  );
}
