import { Link, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import LocationItem from "./LocationItem/LocationItem";
import {
  AddIconsCircle,
  AddLocationIcon,
  CalendarIcons,
  DeleteIcon,
  SearchIcon,
} from "../../../../assets/icons";
import { AiOutlineLeft } from "react-icons/ai";

import { DatePicker, Space, Popover } from "antd";
const { RangePicker } = DatePicker;
export default function LocationClothesCity() {
  // const { id } = useParams();
  // const NewId = id.replace(":", "");
  const navigate = useNavigate();

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

  return (
    <div className=" px-4 md:px-0 ">
      <div className="w-full pt-6 pb-4 md:py-4 md:border-b border-lightBorderColor block ">
        <div className="block md:flex justify-start items-center md:justify-between">
          <section className="flex">
            <button
              button
              onClick={() => {
                navigate(-1);
              }}
              className="w-8 h-8 flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
            >
              <AiOutlineLeft />
            </button>
            <p className="text-black text-2xl not-italic font-AeonikProMedium ml-[30px] hidden md:block">
              Одежда
            </p>
          </section>

          <section className="mt-[25px] pt-[25px] border-t border-[#F2F2F2] w-full md:hidden flex items-center justify-between md:justify-static gap-x-6 md:gap-x-[15px]">
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

          <div className="w-fit  items-center gap-x-[15px] hidden md:flex">
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
          </div>
        </div>
      </div>

      <div className="mt-[10px] md:mt-[35px] flex justify-end items-center md:justify-between mx-auto pb-6">
        <section className="hidden md:flex gap-x-4">
          <p className="text-black text-2xl not-italic font-AeonikProMedium">
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
        <div className="w-full md:w-fit flex items-center border-b md:border-b-0 border-[#F2F2F2] pb-[25px] md:pb-0">
          <div className="mr-auto md:mr-6 font-AeonikProRegular text-sm md:text-lg text-mobileTextColor">
            Выбранные
          </div>
          <button
            className={`pr-3 border-r-[2px] border-addLocBorderRight flex items-center font-AeonikProRegular text-sm md:text-lg text-addLocationTextcolor  ${
              someChecked
                ? "opacity-100 active:translate-y-[2px]"
                : "opacity-30 cursor-not-allowed"
            }`}
          >
            <span className="mr-[5px] hidden md:block">
              <AddLocationIcon width={20} />
            </span>
            <span className="mr-[5px] block md:hidden">
              <AddLocationIcon width={16} />
            </span>
            Добавить в локацию
          </button>
          <button
            className={`pl-3 flex items-center font-AeonikProRegular text-sm md:text-lg text-deleteColor ${
              someChecked
                ? "opacity-100 active:translate-y-[2px]"
                : "opacity-30 cursor-not-allowed"
            }`}
          >
            <span className="mr-[5px] hidden md:block">
              <DeleteIcon width={20} />
            </span>
            <span className="mr-[5px] block md:hidden">
              <DeleteIcon width={16} />
            </span>
            Удалить
          </button>
        </div>
      </div>

      <div className="mx-auto font-AeonikProRegular text-[16px]">
        <div className="mb-[10px] flex items-center text-tableTextTitle">
          <div
            onClick={() => {
              onCheck(checkIndicator);
              setAllChecked(!allChecked);
            }}
            className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
              allChecked
                ? "bg-[#007DCA] border-[#007DCA]"
                : "bg-white border-checkboxBorder"
            } hidden md:flex items-center justify-center rounded mr-[8px]`}
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

          <div className="w-full md:hidden">
            <div className="flex md:hidden justify-end w-full mb-[25px]">
              Выбрать все
              <div
                onClick={() => {
                  onCheck(checkIndicator);
                  setAllChecked(!allChecked);
                }}
                className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
                  allChecked
                    ? "bg-[#007DCA] border-[#007DCA]"
                    : "bg-white border-checkboxBorder"
                } flex items-center justify-center rounded ml-[8px]`}
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

            <div className="w-full md:hidden">
              <section className="flex md:hidden gap-x-4">
                <p className="text-black text-[18px] not-italic font-AeonikProMedium mr-auto">
                  Юнусабад (6)
                </p>
                <Link
                  to="/products/add-wear"
                  className="active:translate-y-[2px] flex items-center gap-x-[4px]"
                >
                  <span className="text-addWearColorText text-[13px] not-italic font-AeonikProMedium">
                    Добавить одежду
                  </span>
                  <span>
                    <AddIconsCircle size={16} />
                  </span>
                </Link>
              </section>
            </div>
          </div>

          <div className="hidden border-lightBorderColor border rounded-[12px] bg-lightBgColor pl-[30px] py-[8px] md:flex items-center gap-x-[5px] w-full">
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
            return <LocationItem data={data} click={onCheck} />;
          })}
        </div>
      </div>
    </div>
  );
}
