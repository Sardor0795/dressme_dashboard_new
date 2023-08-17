import React from "react";
import { Outlet } from "react-router-dom";
import { Space, DatePicker } from "antd";
import { SearchIcon } from "../../assets/icons";

const { RangePicker } = DatePicker;
export default function Products() {
  return (
    <main className="products w-full px-4 md:px-10 md:py-5">
      <div className="flex justify-end items-center md:justify-between border-b border-borderColor py-4">
        <section className="hidden md:block">
          <p className="text-black text-2xl not-italic font-AeonikProMedium">
            Одежда{" "}
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
              <RangePicker placeholder={["от", "до"]} />
            </Space>
          </section>
        </div>
      </div>
      <Outlet />{" "}
    </main>
  );
}
