import React, { useEffect } from "react";
import { DatePicker, Space } from "antd";
import { CalendarIcons, SearchIcon } from "../../../assets/icons";
import MarketList from "./MarketList";
import { Link } from "react-router-dom";
import MobileHumburgerMenu from "../../Navbar/mobileHamburgerMenu/MobileMenu";

const { RangePicker } = DatePicker;

export default function MyMarket() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <div className="w-full h-full  py-1 px-4 md:px-0">
      <div className="w-full pt-6 pb-6 md:pb-4 md:py-4 md:border-b border-lightBorderColor block ">
        <div className="w-full flex items-center justify-center md:hidden">
          <button className="absolute left-4 ">
            <MobileHumburgerMenu />
          </button>
          <span className="text-2xl not-italic font-AeonikProMedium">
            Все магазины
          </span>
        </div>
        <div className="flex items-center justify-between border-t md:border-0 border-borderColor md:mt-0 md:pt-0 mt-3 pt-3">
          <section className="hidden md:block">
            <p className="text-black text-2xl not-italic font-AeonikProMedium">
              Все магазины{" "}
            </p>
          </section>

          <section className="w-full md:w-fit flex items-center justify-between md:justify-static gap-x-6 md:gap-x-[15px]">
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
        </div>
      </div>
      <div className="h-fit py-7  w-full md:flex items-center justify-end hidden">
        <button className="w-fit h-[42px] active:scale-95 rounded-lg flex items-center px-[10px] bg-weatherWinterColor text-white text-base not-italic font-AeonikProMedium">
          Создать новый магазин
        </button>
      </div>
      <div className=" w-full">
        <MarketList />
      </div>
    </div>
  );
}
