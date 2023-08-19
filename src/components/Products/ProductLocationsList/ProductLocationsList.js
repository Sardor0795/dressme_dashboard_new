import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import LocationItem from "./LocationItem/LocationItem";
import {
  AddIconsCircle,
  AddLocationIcon,
  DeleteIcon,
  SearchIcon,
} from "../../../assets/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { Space, DatePicker } from "antd";
// import { SearchIcon } from "../../assets/icons";
import { AiOutlineLeft } from "react-icons/ai";

const { RangePicker } = DatePicker;
export default function LocationClothesCity() {
  // const { id } = useParams();
  // const NewId = id.replace(":", "");

  let NewId = "Hadra";

  const [data, setData] = useState([
    {
      id: 1,
      index: 1,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#4FB459]",
      state: "Одобренный",
    },
    {
      id: 2,
      index: 2,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
    },
    {
      id: 3,
      index: 3,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#FF4747]",
      state: "Отказанный",
    },
    {
      id: 4,
      index: 1,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
    },
    {
      id: 5,
      index: 2,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
    },
    {
      id: 6,
      index: 3,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
    },
  ]);

  const [someChecked, setSomeChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  let checkIndicator = allChecked ? "allNotCheck" : "allCheck";

  const onCheck = (id) => {
    if (id === "allCheck") {
      let newArr = data.map((item) => {
        return { ...item, isCheck: true };
      });
      setData(newArr);
    } else if (id === "allNotCheck") {
      let newArr = data.map((item) => {
        return { ...item, isCheck: false };
      });
      setData(newArr);
    } else {
      let newArr = data.map((item) => {
        return item.id === id ? { ...item, isCheck: !item.isCheck } : item;
      });
      setData(newArr);
    }
  };

  useEffect(() => {
    let newData = data.filter((item) => item.isCheck === true);
    if (newData.length) {
      setSomeChecked(true);
    } else {
      setSomeChecked(false);
    }
  }, [data]);
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-end items-center md:justify-between border-b border-borderColor py-4">
        <section className="hidden md:flex">
          <button
            button
            onClick={() => {
              navigate(-1);
            }}
            className="w-8 h-8 flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
          >
            <AiOutlineLeft />
          </button>
          <p className="text-black text-2xl not-italic font-AeonikProMedium ml-[30px]">
            Одежда{" "}
          </p>
        </section>
        <section className="w-fit flex items-center gap-x-[15px]">
          <form className="max-w-[400px] w-[100%] h-10 overflow-hidden border border-lightBorderColor flex items-center px-[10px] rounded-lg">
            <input
              type="text"
              name="s"
              className="w-full h-full  outline-0	"
              placeholder="Поиск"
            />
            <button>
              <SearchIcon />
            </button>
          </form>
          <section className="mobileDate flex items-center gap-x-[30px]">
            <Space direction="vertical" size={12}>
              <RangePicker placeholder={["от", "до"]} />
            </Space>
          </section>
        </section>
      </div>
      <div>
        <div className="flex items-center justify-center py-7 relative w-full">
          <p className="text-xl font-AeonikProMedium absolute left-0">
            Общее количество: 6
          </p>
          <p className="text-textBlueColor text-2xl not-italic font-AeonikProMedium">
            Nike Store Official Dealer
          </p>
          <div className="w-fit flex items-center absolute right-0">
            <div className="mr-6 font-AeonikProRegular text-lg text-mobileTextColor">
              Выбранные
            </div>
            <button
              className={`pr-3 border-r-[2px] border-addLocBorderRight flex items-center font-AeonikProRegular text-lg text-addLocationTextcolor  ${
                someChecked
                  ? "opacity-100 active:translate-y-[2px]"
                  : "opacity-30 cursor-not-allowed"
              }`}
            >
              <span className="mr-[5px]">
                <AddLocationIcon width={20} />
              </span>
              Добавить в локацию
            </button>
            <button
              className={`pl-3 flex items-center font-AeonikProRegular text-lg text-deleteColor ${
                someChecked
                  ? "opacity-100 active:translate-y-[2px]"
                  : "opacity-30 cursor-not-allowed"
              }`}
            >
              <span className="mr-[5px]">
                <DeleteIcon width={20} />
              </span>
              Удалить
            </button>
          </div>
        </div>

        <div className="flex justify-end items-center md:justify-between mx-auto pb-6">
          <section className="hidden md:flex items-center">
            <div
              className="cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder
                 bg-white flex items-center justify-center rounded mr-[8px]"
            >
              <span
                className={`${
                  allChecked ? "flex items-center justify-center" : "hidden"
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
            <p className="text-black text-2xl not-italic font-AeonikProMedium mr-[20px]">
              Юнусабад (3)
            </p>
            <Link
              to="/products/add-wear"
              className="active:translate-y-[2px] flex items-center gap-x-[4px]"
            >
              <span>
                <AddIconsCircle />
              </span>
              <span className="text-addWearColorText text-base not-italic font-AeonikProMedium">
                Добавить одежду
              </span>
            </Link>
          </section>

          <div className="flex">
            <span className="mr-[10px] text-base font-AeonikProMedium text-mobileTextColor">
              Выбрать все
            </span>
            <div
              onClick={() => {
                onCheck(checkIndicator);
                setAllChecked(!allChecked);
              }}
              className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
                allChecked
                  ? "bg-[#007DCA] border-[#007DCA]"
                  : "bg-white border-checkboxBorder"
              } flex items-center justify-center rounded mr-[8px]`}
            >
              <span
                className={`${
                  allChecked ? "flex items-center justify-center" : "hidden"
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
          </div>
        </div>

        <div className="mx-auto font-AeonikProRegular text-[16px]">
          <div className="mb-[10px] flex items-center text-tableTextTitle">
            <div className="min-w-[24px] min-h-[24px] bg-white  mr-[8px]"></div>

            <div className="border-lightBorderColor border rounded-[12px] bg-lightBgColor pl-[30px] py-[8px] flex items-center gap-x-[5px] w-full">
              <div className="w-[45px]">No:</div>
              <div className="mr-[75px]">Фото</div>
              <div className="flex w-full">
                <div className="w-[18%]">Наименование товара</div>
                <div className="w-[12%]">Артикул</div>
                <div className="w-[11%]">Тип</div>
                <div className="w-[10%]">Дата</div>
                <div className="w-[14%]">Статус</div>
                <div className="w-[12%]">Цена товара</div>
                <div className="w-[15%]"></div>
                <div className="w-[9%] text-center">Добавить</div>
                <div className="w-[9%] text-center">Удалить</div>
              </div>
            </div>
          </div>

          <div className="mb-[10px] flex flex-col gap-y-[10px] items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
            {data.map((data, i) => {
              if (i === 2) {
                return (
                  <>
                    <LocationItem data={data} click={onCheck} />

                    <div className="flex items-center justify-start my-[30px] w-full">
                      <section className="hidden md:flex items-center">
                        <div
                          className="cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder
                 bg-white flex items-center justify-center rounded mr-[8px]"
                        >
                          <span
                            className={`${
                              allChecked
                                ? "flex items-center justify-center"
                                : "hidden"
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
                        <p className="text-black mr-5 text-2xl not-italic font-AeonikProMedium">
                          Мирзо улугбек (3)
                        </p>
                        <Link
                          to="/products/add-wear"
                          className=" flex items-center gap-x-[4px]"
                        >
                          <span>
                            <AddIconsCircle />
                          </span>
                          <span className="text-addWearColorText text-base not-italic font-AeonikProMedium">
                            Добавить одежду
                          </span>
                        </Link>
                      </section>
                    </div>
                  </>
                );
              }
              return <LocationItem data={data} click={onCheck} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
