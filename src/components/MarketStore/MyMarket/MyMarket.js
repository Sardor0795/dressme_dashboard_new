import React from "react";
import { DatePicker, Space, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { SearchIcon } from "../../../assets/icons";
import MarketList from "./MarketList";
const { RangePicker } = DatePicker;

export default function MyMarket() {
  return (
    <div className="w-full h-full px-4 md:px-10 py-1">
      <div className="w-full pt-6 pb-4 md:py-4 md:border-b border-lightBorderColor block">
        <div className="flex justify-end items-center md:justify-between">
          <section className="hidden md:block">
            <p className="text-black text-2xl not-italic font-AeonikProMedium">
              Все магазины{" "}
            </p>
          </section>
          <div className="w-fit flex items-center gap-x-[15px]">
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
                <RangePicker />
              </Space>
            </section>
          </div>
        </div>
      </div>
      <div className="h-fit py-7 border border-red-500 w-full flex items-center justify-end">
        <button className="w-fit h-[42px] rounded-lg flex items-center px-[10px] bg-weatherWinterColor text-white text-base not-italic font-AeonikProMedium">
          Создать новый магазин
        </button>
      </div>
      <div>
        <MarketList />
      </div>
    </div>
  );
}
