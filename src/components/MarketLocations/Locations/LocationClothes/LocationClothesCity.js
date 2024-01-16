import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import LocationItem from "./LocationItem/LocationItem";
import {
  AddIconsCircle,
  AddLocationIcon,
  DeleteIcon,
  GoBackIcons,
  SearchIcon,
} from "../../../../assets/icons";
import { useQuery } from '@tanstack/react-query'

import { useHttp } from "../../../../hook/useHttp";

export default function LocationClothesCity() {
  const { request } = useHttp()
  const navigate = useNavigate();

  const [data, setData] = useState([
    {
      id: 1,
      index: 1,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#4FB459]",
      state: "Одобренный",
      money: "96000",
    },
    {
      id: 2,
      index: 2,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
      money: "96000",
    },
    {
      id: 3,
      index: 3,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#FF4747]",
      state: "Отказанный",
      money: "96000",
    },
    {
      id: 4,
      index: 1,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
      money: "96000",
    },
    {
      id: 5,
      index: 2,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
      money: "96000",
    },
    {
      id: 6,
      index: 3,
      name: "Кроссовка Nike RUN",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
      money: "96000",
    },
  ]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
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
  const { id } = useParams();
  const NewId = id.replace(":", "");
  // ------------GET  Has Magazin ?-----------------
  const [getListItem, setGetListItem] = useState()
  useQuery(["location_store_id"], () => {
    return request({ url: `/shops/locations/${NewId}/show-products-by-location`, token: true });
  },
    {
      onSuccess: (res) => {

        setGetListItem(res?.location)
        console.log(res?.location, "BURES");
      },
      onError: (err) => {
        // setState({ ...state, loading: false })
        console.log(err, "BU -- HOC -- Error");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className=" px-4 md:px-10  ">
      <div className="w-full pt-6 pb-4 md:py-4 md:border-b border-lightBorderColor block ">
        <div className="block md:flex justify-start items-center md:justify-between ">
          <div className=" flex items-center justify-center gap-x-2 ">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="h-8 w-8 md:static absolute left-0 flex items-center cursor-pointer justify-center rounded-lg md:border border-borderColor"
            >
              <GoBackIcons />
            </button>
            <div className="text-center flex items-center text-xl md:text-[24px] font-AeonikProMedium   md:ml-[30px]">
              Одежда
            </div>
          </div>{" "}


          <section className="mt-[25px] pt-[25px] md:mt-0 md:pt-0 md:border-0 border-t border-[#F2F2F2]  w-full md:w-fit  flex items-center md:justify-start justify-between  gap-x-[15px]">
            <label
              htmlFor="searchStore"
              className="w-full md:w-[400px] h-10 overflow-hidden border  border-lightBorderColor flex items-center rounded-lg"
            >
              <input
                type="text"
                name="s"
                id="searchStore"
                className="w-full h-full   outline-0 	pl-[10px]"
                placeholder="Поиск"
              />
              <span className="px-[10px] bg-lightBorderColor h-full flex items-center justify-center">
                <SearchIcon />
              </span>
            </label>
          </section>
        </div>
      </div>

      <div className="mt-[10px] md:mt-[35px] flex justify-end items-center md:justify-between mx-auto pb-6">
        <section className="hidden md:flex gap-x-4">
          <p className="text-black text-xl not-italic font-AeonikProMedium">
            {getListItem?.address}
            {getListItem?.products?.length > 1 &&
              <span>({getListItem?.products?.length})</span>}
          </p>
          <Link
            to="/products/add-wear"
            className="active:scale-95  active:opacity-70 flex items-center gap-x-[4px]"
          >
            <span>
              <AddIconsCircle />
            </span>
            <span className="text-addWearColorText text-[13px] not-italic font-AeonikProMedium">
              Добавить одежду
            </span>
          </Link>
        </section>
        <div className="w-full md:w-fit flex items-center border-b md:border-b-0 border-[#F2F2F2] pb-[25px] md:pb-0">
          <div className="mr-auto md:mr-6 font-AeonikProMedium text-[11px] ls:text-[12px] ll:text-sm md:text-lg text-mobileTextColor">
            Выбранные:
          </div>
          <button
            className={`w-fit pr-1 ll:pr-3 border-r-[2px] border-addLocBorderRight flex items-center justify-center font-AeonikProMedium text-[11px] ls:text-[12px] ll:text-sm md:text-lg ${someChecked
              ? "text-addLocationTextcolor active:scale-95  active:opacity-70"
              : "text-[#D2D2D2] cursor-not-allowed"
              }`}
          >
            <span className="mr-[3px] ll:mr-[5px] hidden md:block">
              <AddLocationIcon width={20} />
            </span>
            <span className="mr-[3px] ll:mr-[5px] block md:hidden">
              <AddLocationIcon width={16} />
            </span>
            Добавить в локацию
          </button>
          <button
            className={`pl-1 ll:pl-3 flex items-center font-AeonikProMedium text-[11px] ls:text-[12px] ll:text-sm md:text-lg  ${someChecked
              ? "text-deleteColor active:scale-95  active:opacity-70"
              : "text-[#D2D2D2] cursor-not-allowed"
              }`}
          >
            <span className="mr-[3px] ll:mr-[5px] hidden md:block">
              <DeleteIcon width={20} />
            </span>
            <span className="mr-[3px] ll:mr-[5px] block md:hidden">
              <DeleteIcon width={16} />
            </span>
            Удалить
          </button>
        </div>
      </div>

      <div className="mx-auto font-AeonikProRegular text-[16px]">
        <div className="mb-[10px] flex items-center text-tableTextTitle">

          <div className="w-full block  md:hidden ">
            <div className="flex items-center md:hidden justify-end w-full mb-[25px]">
              Выбрать все
              <div
                onClick={() => {
                  onCheck(checkIndicator);
                  setAllChecked(!allChecked);
                }}
                className={`cursor-pointer min-w-[18px] min-h-[18px] border border-checkboxBorder ${allChecked
                  ? "bg-[#007DCA] border-[#007DCA]"
                  : "bg-white border-checkboxBorder"
                  } flex items-center justify-center rounded ml-[8px]`}
              >
                <span
                  className={`${allChecked ? "flex items-center justify-center" : "hidden"
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
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="w-full ">
              <section className="flex md:hidden gap-x-4">
                <p className="text-black text-[18px] not-italic font-AeonikProMedium mr-auto">
                  Юнусабад (6)
                </p>
                <Link
                  to="/products/add-wear"
                  className="active:scale-95  active:opacity-70 flex items-center gap-x-[4px]"
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
        </div>

        <div className="mb-[10px] flex flex-col gap-y-[10px] items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
          <LocationItem data={getListItem} />;

        </div>
      </div>
    </div>
  );
}
