import React, { useEffect, useState } from "react";
import { ProductImg } from "../../../../assets";
import {
  CheckTrue,
  SearchIcon,
  StarIcon,
  StarOutlineIcon,
} from "../../../../assets/icons";
import { DatePicker, Space, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";

const { RangePicker } = DatePicker;
export default function ReviewWear() {
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
  ];
  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`/reviews/review/comment-wear/${id}`);
  };
  const [state, setState] = useState({
    openwear: false,
  });

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
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full h-full md:px-10 py-1">
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
        <div className="w-full h-full border-lightBorderColor md:bg-lightBgColor md:rounded-xl overflow-auto VerticelScroll">
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
      {/* <div className="hidden md:block">Reviews</div> */}
    </div>
  );
}
