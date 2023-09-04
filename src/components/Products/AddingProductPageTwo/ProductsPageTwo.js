import React, { useEffect } from "react";
import ProductsPageTop from "./ProductsPageTop/ProductsPageTop";
import AddingProduct from "./AddingProduct/AddingProduct";
import { Space, DatePicker } from 'antd'
import { GoBackIcons } from "../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

const { RangePicker } = DatePicker;
export default function ProductsPageTwo() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative w-full pt-6 pb-4 px-4 md:px-0 md:py-4 md:border-b border-lightBorderColor block">

        <div className="flex  items-center md:justify-between">
          <section className=" w-full md:w-fit  flex justify-center md:justify-start">
            <button
              button
              onClick={() => {
                navigate(-1);
              }}
              className="w-8 h-8 hidden md:flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
            >
              <AiOutlineLeft />
            </button>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="  md:hidden absolute left-0 flex items-center cursor-pointer "
            >
              <GoBackIcons />
            </button>
            <p className="text-black text-[20px] ll:text-2xl not-italic font-AeonikProMedium md:ml-[30px]">
              Добавить одежду
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
    // <div className="w-full max-w-[1540px] mx-auto">
    //   <div className="w-full">
    //     <AddingProduct />
    //   </div>
    // </div>
  );
}
