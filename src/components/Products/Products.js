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
      <Outlet />{" "}
    </main>
  );
}
