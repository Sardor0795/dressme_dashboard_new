import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import LocationItem from "./LocationItem/LocationItem";
import {
  AddIconsCircle,
  AddLocationIcon,
  CheckIcons,
  DeleteIcon,
  SearchIcon,
} from "../../../assets/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { Space, DatePicker } from "antd";
// import { SearchIcon } from "../../assets/icons";
import { AiOutlineLeft } from "react-icons/ai";

const { RangePicker } = DatePicker;
export default function LocationClothesCity() {
  const [city1, setCity1] = useState([
    {
      id: 1,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#4FB459]",
      state: "Одобренный",
    },
    {
      id: 2,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
    },
    {
      id: 3,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#FF4747]",
      state: "Отказанный",
    },
    {
      id: 4,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
    },
    {
      id: 5,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
    },
    {
      id: 6,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
    },
  ]);
  const [city1all, setCity1all] = useState(false);

  const [city2, setCity2] = useState([
    {
      id: 1,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#4FB459]",
      state: "Одобренный",
    },
    {
      id: 2,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Одобренный",
    },
    {
      id: 3,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#FF4747]",
      state: "Отказанный",
    },
    {
      id: 4,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Отказанный",
    },
    {
      id: 5,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
    },
    {
      id: 6,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
    },
  ]);
  const [city2all, setCity2all] = useState(false);

  const [arrayAllChecked, setArrayAllChecked] = useState(false);

  const [someChecked, setSomeChecked] = useState(false);

  // ---------------------------------------
  // Alohida alohida checked qilish
  const onCheck1 = (id) => {
    let newArr = city1.map((item) => {
      return item.id === id ? { ...item, isCheck: !item.isCheck } : item;
    });
    setCity1(newArr);
    setSomeChecked(true);
  };
  const onCheck2 = (id) => {
    let newArr = city2.map((item) => {
      return item.id === id ? { ...item, isCheck: !item.isCheck } : item;
    });
    setCity2(newArr);
    setSomeChecked(true);
  };

  // ------------------------------------
  // City buyicha checked qilish
  const City1Checked = () => {
    if (!city1all) {
      let city1Array = city1.map((item) => {
        return { ...item, isCheck: true };
      });
      setCity1(city1Array);
      setSomeChecked(true);
    } else if (city1all) {
      let city1Array = city1.map((item) => {
        return { ...item, isCheck: false };
      });
      setCity1(city1Array);
    }
  };
  const City2Checked = () => {
    if (!city2all) {
      let city2Array = city2.map((item) => {
        return { ...item, isCheck: true };
      });
      setCity2(city2Array);
      setSomeChecked(true);
    } else if (city2all) {
      let city2Array = city2.map((item) => {
        return { ...item, isCheck: false };
      });
      setCity2(city2Array);
    }
  };

  // this effect for all check
  useEffect(() => {
    if (arrayAllChecked) {
      setCity1all(true);
      setCity2all(true);
      // array1
      let city2Array = city2.map((item) => {
        return { ...item, isCheck: true };
      });
      setCity2(city2Array);
      // array2
      let city1Array = city1.map((item) => {
        return { ...item, isCheck: true };
      });
      setCity1(city1Array);
      setSomeChecked(true);
    }
    if (!arrayAllChecked) {
      setCity1all(false);
      setCity2all(false);
      // array1
      let city2Array = city2.map((item) => {
        return { ...item, isCheck: false };
      });
      setCity2(city2Array);
      // array2
      let city1Array = city1.map((item) => {
        return { ...item, isCheck: false };
      });
      setCity1(city1Array);
      setSomeChecked(false);
    }
  }, [arrayAllChecked]);

  // Checks whether an element is even
  // useEffect(() => {
  //   if (city1all && city2all) {
  //     setArrayAllChecked(false);
  //   } else {
  //     setArrayAllChecked(true);
  //   }
  //   // const even = (element) => element.isCheck == true;
  //   // setSomeCheckedCity1(city1.some(even));
  //   // setSomeCheckedCity2(city2.some(even));
  // }, [arrayAllChecked]);

  // Checks whether an element is even
  // const even = (element) => element.isCheck == true;
  // setSomeChecked(city1.some(even));
  // setSomeChecked(city1.some(even));

  const navigate = useNavigate();

  return (
    <div>
      {/* navbar */}
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
        {/* Up Title */}
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
              onClick={() => {
                setCity1all(!city1all);
                City1Checked();
              }}
              className=" cursor-pointer bg-white flex items-center gap-x-2"
            >
              <button
                type="button"
                className={`flex items-center rounded  justify-center min-w-[24px] min-h-[24px]  ${
                  city1all
                    ? "bg-[#007DCA] border-[#007DCA]"
                    : "bg-white border border-checkboxBorder"
                }`}
              >
                <CheckIcons />
              </button>
              <p className="text-black text-2xl not-italic font-AeonikProMedium mr-[20px]">
                Юнусабад (6)
              </p>
            </div>
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
            <div
              onClick={() => {
                setArrayAllChecked(!arrayAllChecked);
              }}
              className=" cursor-pointer bg-white flex items-center gap-x-2"
            >
              <span className="mr-[10px] select-none text-base font-AeonikProMedium text-mobileTextColor">
                Выбрать все
              </span>
              <button
                type="button"
                className={`flex items-center rounded  justify-center min-w-[24px] min-h-[24px]  ${
                  arrayAllChecked
                    ? "bg-[#007DCA] border-[#007DCA]"
                    : "bg-white border border-checkboxBorder"
                }`}
              >
                {arrayAllChecked && <CheckIcons />}
              </button>
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
          {/* City 1 */}
          <div className="mb-[10px] flex flex-col gap-y-[10px] items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
            {city1.map((data, i) => {
              return <LocationItem data={data} click={onCheck1} />;
            })}
          </div>
          {/* City 2 */}
          <div className=" mt-10">
            <div className="flex items-center justify-start my-[30px] w-full">
              <section className="hidden md:flex items-center">
                <div
                  onClick={() => {
                    setCity2all(!city2all);
                    City2Checked();
                  }}
                  className=" cursor-pointer bg-white flex items-center gap-x-2"
                >
                  <button
                    type="button"
                    className={`flex items-center rounded  justify-center min-w-[24px] min-h-[24px]  ${
                      city2all
                        ? "bg-[#007DCA] border-[#007DCA]"
                        : "bg-white border border-checkboxBorder"
                    }`}
                  >
                    <CheckIcons />
                  </button>
                  <p className="text-black text-2xl not-italic font-AeonikProMedium mr-[20px]">
                    Mirzo Ulug'bek (6)
                  </p>
                </div>
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
            <div className="mb-[10px] flex flex-col gap-y-[10px] items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
              {city2.map((data, i) => {
                return <LocationItem data={data} click={onCheck2} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
