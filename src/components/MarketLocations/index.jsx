import React from "react";
import { Outlet } from "react-router-dom";
import { SearchIcon } from "../../assets/icons";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

export default function MarketLocations() {
  return (
    <div className="px-[16px] md:px-10 py-1">
      <Outlet />
    </div>
  );
}
