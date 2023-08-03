import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BgSelectSkin } from "../../assets/icons";
import { Select } from "antd";

export default function Shops() {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <div className="w-full px-4 md:px-[100px] mt-6 md:mt-12">
      <div className="text-center mb-6 md:mb-[50px] text-5 md:text-[35px] font-AeonikProMedium">
        Создать магазин
      </div>
      <div className="relative w-full h-[200px] md:h-[360px] border-2 border-dashed flex items-center justify-center rounded-lg mb-[69px] md:mb-20">
        <Link to="#" className="flex items-center justify-center">
          <span className="text-sm font-AeonikProMedium border-b border-textBlueColor text-textBlueColor mr-[5px]">
            выберите облошка
          </span>
          <BgSelectSkin />
        </Link>
        <div className="absolute -bottom-11 md:bottom-[-64px] bg-white left-[30px] md:left-10 w-[90px] h-[90px] md:w-[130px] md:h-[130px] flex items-center justify-center text-center rounded-full border border-dashed">
          <Link
            to="#"
            className="text-[11px] md:text-sm font-AeonikProMedium text-textBlueColor p-3"
          >
            выберите Логотип
          </Link>
        </div>
      </div>
      <form
        action="#"
        className="w-full flex flex-col items-center justify-between mb-10"
      >
        <div className="w-full flex flex-col md:flex-row items-center justify-between mb-10 md:mb-[60px] gap-x-10">
          <div className="w-full md:w-3/5 mb-[26px] md:mb-0">
            <div className="w-full flex items-center justify-between gap-x-[15px] md:gap-x-[30px] mb-5">
              <label
                htmlFor="shopName"
                className="w-[35%] md:w-[20%] text-xs md:text-base text-mobileTextColor font-AeonikProRegular"
              >
                Название магазина
              </label>
              <input
                type="text"
                name="shopName"
                id="shopName"
                placeholder="Введите название магазина"
                className="w-[65%] md:w-[80%] border border-borderColor2 outline-none px-[15px] py-3 md:py-3 rounded-lg text-xs md:text-base font-AeonikProRegular"
              />
            </div>
            <div className="w-full flex items-center justify-between gap-x-[15px] md:gap-x-[30px] mb-5">
              <label
                htmlFor="shopName"
                className="w-[35%] md:w-[20%] text-xs md:text-base text-mobileTextColor font-AeonikProRegular"
              >
                Пол
              </label>
              <div className="w-[65%] md:w-[80%] md:border border-borderColor2 outline-none rounded-lg text-base gap-x-1 md:gap-x-0 flex items-center justify-between">
                <button className="w-1/3 text-xs md:text-base font-AeonikProRegular border rounded-lg px-2 py-[10px] md:px-[15px] md:py-3">
                  Мужской
                </button>
                <button className="w-1/3 text-xs md:text-base font-AeonikProRegular border rounded-lg px-2 py-[10px] md:px-[15px] md:py-3">
                  Женский
                </button>
                <button className="w-1/3 text-xs md:text-base font-AeonikProRegular border rounded-lg px-2 py-[10px] md:px-[15px] md:py-3">
                  Унисекс
                </button>
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-x-[15px] md:gap-x-[30px] mb-5">
              <label
                htmlFor="shopName"
                className="w-[35%] md:w-[20%] text-xs md:text-base text-mobileTextColor font-AeonikProRegular"
              >
                Город
              </label>
              <Select
                className="rounded-lg w-[65%] md:w-[80%] h-11 md:h-10"
                showSearch
                placeholder="Выберите город"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                size="large"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "Tashkent",
                    label: "Tashkent",
                  },
                  {
                    value: "Samarkand",
                    label: "Samarkand",
                  },
                  {
                    value: "Bukhara",
                    label: "Bukhara",
                  },
                  {
                    value: "Andijan",
                    label: "Andijan",
                  },
                  {
                    value: "Qarshi",
                    label: "Qarshi",
                  },
                  {
                    value: "Nukus",
                    label: "Nukus",
                  },
                  {
                    value: "Navoi",
                    label: "Navoi",
                  },
                  {
                    value: "Termez",
                    label: "Termez",
                  },
                  {
                    value: "Namangan",
                    label: "Namangan",
                  },
                  {
                    value: "Fergana",
                    label: "Fergana",
                  },
                  {
                    value: "Karakalpakstan",
                    label: "Karakalpakstan",
                  },
                ]}
              />
            </div>
            <div className="w-full flex items-center justify-between gap-x-[15px] md:gap-x-[30px] ">
              <label
                htmlFor="shopName"
                className="w-[35%] md:w-[20%] text-xs md:text-base text-mobileTextColor font-AeonikProRegular"
              >
                Метод доставки
              </label>
              <div className="w-[65%] md:w-[80%] flex items-center justify-between outline-none rounded-lg gap-x-1 md:gap-x-[14px]">
                <button className="group w-[28%] md:w-1/4 active:scale-95 focus:bg-textBlueColor font-AeonikProRegular border border-borderColor2 rounded-lg py-2 md:px-[15px] md:py-3">
                  <span className="group-focus:text-white text-xs md:text-base">
                    Такси
                  </span>
                </button>
                <button className="group w-[72%] md:w-3/4 active:scale-95 group-focus:text-white focus:bg-textBlueColor text-base font-AeonikProRegular border border-borderColor2 rounded-lg py-2 md:px-[15px] md:py-3">
                  <span className="group-focus:text-white text-xs md:text-base">
                    Собственная доставка
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/5">
            <div className="block md:hidden mb-3">
              <span className="text-sm mr-2 font-AeonikProRegular">
                Описание магазина
              </span>
              <span className="text-xs font-AeonikProRegular text-borderGrayColor">
                (не обезательно)
              </span>
            </div>
            <textarea
              name="storeDescription"
              id="storeDescription"
              className="w-full h-[100px] text-[11px] md:text-[13px] md:h-[255px] bg-bgColor border border-borderColor2 outline-none rounded-lg p-3 md:resize-none"
              placeholder="Пишите здесь..."
            ></textarea>
          </div>
        </div>

        <Link
          className="inline-block px-[100px] py-[15px] bg-textBlueColor text-white rounded-lg active:scale-95"
          to={"/addshop"}
        >
          Зарегистрироваться
        </Link>
      </form>
    </div>
  );
}
