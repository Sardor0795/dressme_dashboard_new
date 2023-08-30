import React, { useEffect } from "react";
import AddingProduct from "./AddingProduct/AddingProduct";
import { AiOutlineLeft } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { DatePicker, Space, Popover } from "antd";
import { GoBackIcons, SearchIcon } from "../../../../../assets/icons";
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
        <div className="md:hidden flex ">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="  md:hidden flex items-center cursor-pointer justify-center "
          >
            <GoBackIcons />
          </button>
        </div>{" "}
        <div className="flex  items-center md:justify-between">
          <section className="w-full md:w-fit  flex justify-center md:justify-start">
            <button
              button
              onClick={() => {
                navigate(-1);
              }}
              className="w-8 h-8 hidden md:flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
            >
              <AiOutlineLeft />
            </button>
            <p className="text-black text-[20px] ll:text-2xl not-italic font-AeonikProMedium md:ml-[30px]">
              Изменить одежду{" "}
            </p>
          </section>
          <div className="w-fit flex items-center hidden md:flex ">
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
