import React from "react";
import { Outlet } from "react-router-dom";
import { SearchIcon } from "../../assets/icons";
import { DatePicker, Space, Popover } from "antd";

const { RangePicker } = DatePicker;

export default function MarketLocations() {
  return (
    <div className="px-10 py-1">
      <div className="w-full pt-6 pb-4 md:py-4 md:border-b border-lightBorderColor block">
        <div className="flex justify-end items-center md:justify-between">
          <section className="hidden md:block">
            <p className="text-black text-2xl not-italic font-AeonikProMedium">
              Все локации
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
                <RangePicker  placeholder={["от", "до"]}/>
              </Space>
            </section>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
