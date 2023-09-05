import React, { useEffect } from "react";
import AddingProduct from "./AddingProduct/AddingProduct";
import { useNavigate } from "react-router-dom";
import { DatePicker, Space, Popover } from "antd";
import { AiOutlineLeft } from "react-icons/ai";

import { GoBackIcons, SearchIcon } from "../../../../../assets/icons";
const { RangePicker } = DatePicker;
export default function ProductEditDetailLocation() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-full pt-6 pb-4 px-4 md:px-0 md:py-4 md:border-b border-lightBorderColor block">
        <div className="md:hidden flex items-center justify-center">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="  md:hidden absolute left-2 flex items-center cursor-pointer justify-center "
          >
            <GoBackIcons />
          </button>
          <p className="text-black text-[20px] ll:text-2xl not-italic font-AeonikProMedium md:ml-[30px]">
            Изменить одежду{" "}
          </p>
        </div>{" "}
        <div className="flex  items-center md:justify-between">
          <section className="w-full md:w-fit hidden md:flex justify-center md:justify-start">
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
