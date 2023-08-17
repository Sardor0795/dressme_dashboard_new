import React from "react";
import { Outlet } from "react-router-dom";
import { SearchIcon } from "../../assets/icons";
import { Space, DatePicker } from "antd";
const { RangePicker } = DatePicker;

export default function Reviews1() {
  return (
    <div className="w-full h-full px-4 md:px-10 py-1">
      <div className="w-full pt-6 pb-4 md:py-4 md:border-b border-lightBorderColor block">
        <div className="flex  items-center justify-between">
          <div className="max-w-[400px] w-[100%] h-10 overflow-hidden border border-lightBorderColor flex items-center px-[10px] rounded-lg">
            <input
              type="text"
              className="w-full h-full  outline-0	"
              placeholder="Поиск"
            />
            <button>
              <SearchIcon />
            </button>
          </div>
          <div>
            {" "}
            <Space direction="vertical" size={12}>
              <RangePicker />
            </Space>
          </div>
        </div>
      </div>
      <div>
        {" "}
        <Outlet />
      </div>{" "}
    </div>
  );
}
