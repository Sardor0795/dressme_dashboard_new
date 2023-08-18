import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Space, DatePicker } from "antd";
import { SearchIcon } from "../../assets/icons";
import { AiOutlineLeft } from "react-icons/ai";

const { RangePicker } = DatePicker;

export default function Products() {

  const navigate = useNavigate();
  
  return (
    <main className="products w-full px-4 md:px-10 md:py-5">
      <div className="flex justify-end items-center md:justify-between border-b border-borderColor py-4">
        <section className="hidden md:flex">
          <button button
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
      <Outlet />{" "}
    </main>
  );
}
