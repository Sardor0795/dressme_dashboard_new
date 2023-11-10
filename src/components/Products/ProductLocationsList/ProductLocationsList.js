import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import LocationItem from "./LocationItem/LocationItem";
import {
  AddIconsCircle,
  AddLocationIcon,
  CalendarIcons,
  CheckIcons,
  DeleteIcon,
  GoBackIcons,
  SearchIcon,
} from "../../../assets/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { Space, DatePicker } from "antd";
// import { SearchIcon } from "../../assets/icons";
import { AiOutlineLeft } from "react-icons/ai";
import { wearImg } from "../../../assets";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../hook/useHttp";

const { RangePicker } = DatePicker;

export default function LocationClothesCity() {
  const { request } = useHttp()
  const [state, setState] = useState({
    productList: null
  })

  useQuery(["products"], () => {
    return request({ url: "/products", token: true });
  },
    {
      onSuccess: (res) => {
        setState({ ...state, productList: res?.products?.data })
        console.log(res, "nbuRes");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  console.log(state?.productList, "productList");
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


  // products
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-start items-center md:justify-between md:border-b border-borderColor py-4">
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
        <section className="w-full flex md:hidden">
          <div className="w-full flex items-center">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="absolute flex items-center justify-start cursor-pointer "
            >
              <GoBackIcons />
            </button>
            <p className="w-full text-center text-black text-2xl not-italic font-AeonikProMedium">
              Одежда
            </p>
          </div>
        </section>
        <section className="w-fit hidden md:flex items-center gap-x-[15px]">
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

      {/* Search Section For Mobile */}
      <div className="flex md:hidden items-center justify-between border-t md:border-0 border-borderColor pt-3 md:pt-0 md:mt-3">
        <section className="w-full md:w-fit flex items-center justify-between md:justify-static gap-x-6 md:gap-x-[15px]">
          <label
            htmlFor="searchStore"
            className="w-full md:max-w-[400px] h-10 overflow-hidden border  border-lightBorderColor flex items-center rounded-lg"
          >
            <input
              type="text"
              name="s"
              id="searchStore"
              className="w-full h-full outline-0 	pl-[10px]"
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
      </div>

      <div>
        {/* Up Title */}
        <div className="flex items-center justify-center py-7 relative w-full border-b border-borderColor md:border-none">
          <p className="hidden md:block text-xl font-AeonikProMedium absolute left-0">
            Общее количество: 6
          </p>
          <p className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
            Nike Store Official Dealer
          </p>
          <div className="w-full md:w-fit flex items-center justify-between absolute right-0">
            <div className="flex items-center md:mr-6 font-AeonikProRegular text-sm md:text-lg text-mobileTextColor">
              Выбранные <span className="block md:hidden font-AeonikProMedium">:</span>
            </div>
            <button
              className={`pr-3 border-r-[2px] border-addLocBorderRight flex items-center font-AeonikProRegular text-sm md:text-lg text-addLocationTextcolor  ${someChecked
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
              className={`pl-[6px] md:pl-3 flex items-center font-AeonikProRegular text-sm md:text-lg text-deleteColor ${someChecked
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
                className={`flex items-center rounded-[6px] md:rounded-lg justify-center min-w-[24px] min-h-[24px]  ${city1all
                  ? "bg-[#007DCA] border-[#007DCA]"
                  : "bg-white border border-[#f4a622]"
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

          <div className="w-full md:w-fit flex items-center justify-between md:justify-normal mt-4 md:mt-0 ">
            <p className="flex md:hidden text-sm font-AeonikProMedium">
              Общее количество: 6
            </p>
            <div
              onClick={() => {
                setArrayAllChecked(!arrayAllChecked);
              }}
              className=" cursor-pointer bg-white flex items-center gap-x-2"
            >
              <span className="md:mr-[10px] select-none text-sm md:text-base font-AeonikProMedium md:font-AeonikProMedium text-mobileTextColor">
                Выбрать все
              </span>
              <button
                type="button"
                className={`flex items-center rounded-[6px] md:rounded-lg justify-center min-w-[18px] min-h-[18px] md:min-w-[24px] md:min-h-[24px]  ${arrayAllChecked
                  ? "bg-[#007DCA] border-[#007DCA]"
                  : "bg-white border border-checkboxBorder"
                  }`}
              >
                {arrayAllChecked && <CheckIcons />}
              </button>
            </div>
          </div>
        </div>
        <div className="block md:hidden text-textBlueColor text-xl not-italic font-AeonikProMedium mb-6">
          Nike Store Official Dealer
        </div>

        <div className="mx-auto font-AeonikProRegular text-[16px]">

          <div className="mb-[10px] hidden md:flex items-center text-tableTextTitle">
            <div className="min-w-[24px] min-h-[24px] bg-white mr-[8px]"></div>

            <div className="border-lightBorderColor border rounded-[12px] bg-lightBgColor pl-[30px] py-[8px] flex items-center gap-x-[5px] w-full">
              <div className="w-[45px] text-[#3F6175] text-base not-italic font-AeonikProMedium">No:</div>
              <div className="mr-[75px] text-[#3F6175] text-base not-italic font-AeonikProMedium">Фото</div>
              <div className="flex w-full">
                <div className="w-[18%] text-[#3F6175] text-base not-italic font-AeonikProMedium">Наименование товара</div>
                <div className="w-[12%] text-[#3F6175] text-base not-italic font-AeonikProMedium">Артикул</div>
                <div className="w-[11%] text-[#3F6175] text-base not-italic font-AeonikProMedium">Тип</div>
                <div className="w-[10%] text-[#3F6175] text-base not-italic font-AeonikProMedium">Дата</div>
                <div className="w-[14%] text-[#3F6175] text-base not-italic font-AeonikProMedium">Статус</div>
                <div className="w-[12%] text-[#3F6175] text-base not-italic font-AeonikProMedium">Цена товара</div>
                <div className="w-[15%]"></div>
                <div className="w-[9%] text-center text-[#3F6175] text-base not-italic font-AeonikProMedium">Добавить</div>
                <div className="w-[9%] text-center text-[#3F6175] text-base not-italic font-AeonikProMedium">Удалить</div>
              </div>
            </div>
          </div>

          {/* City 1 */}
          <div className="mb-[10px] flex flex-col gap-y-[10px] items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
            <LocationItem data={state?.productList} click={onCheck1} />;
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
                    className={`flex items-center rounded-[6px] md:rounded-lg justify-center min-w-[24px] min-h-[24px]  ${city2all
                      ? "bg-[#007DCA] border-[#007DCA]"
                      : "bg-white border border-[#f4a622]"
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

              <LocationItem data={state?.productList} click={onCheck2} />;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
