import React, { useEffect, useState } from "react";

import { Outlet, Link } from "react-router-dom";
import { DatePicker, Space } from "antd";
import { SearchIcon } from "../../assets/icons";

const { RangePicker } = DatePicker;

export default function MarketStore() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className=" md:px-10 py-1 mb-10">
      <Outlet />
    </div>
    // <div>{!addStore ? <MyMarket /> : <AddStore onClick={toggleAdd} />}</div>
  );
}
