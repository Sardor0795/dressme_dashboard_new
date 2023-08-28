import React, { useEffect } from "react";
import AddingProduct from "./AddingProduct/AddingProduct";
import { AiOutlineLeft } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { DatePicker, Space, Popover } from "antd";
import { SearchIcon } from "../../../../../assets/icons";
const { RangePicker } = DatePicker;
export default function ProductEditTitleLocation() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-full pt-6 pb-4 md:py-4 md:border-b border-lightBorderColor block  px-4 md:px-0 ">
        <div className="flex justify-end items-center md:justify-between">
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
      </div>
      <div className="w-full max-w-[1540px] mx-auto">
        <div className="w-full">
          <AddingProduct />
        </div>
      </div>
    </div>
  );
}
