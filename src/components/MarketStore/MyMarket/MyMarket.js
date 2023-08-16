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
      <div className="h-fit py-7  w-full flex items-center justify-end">
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
