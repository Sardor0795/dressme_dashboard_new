import React, { useEffect, useState } from "react";
import AddStore from "./AddMarket/AddStore/AddStore";
import MyMarket from "./MyMarket/MyMarket";
import { Outlet } from "react-router-dom";
import { DatePicker, Space, Popover } from "antd";
import { SearchIcon } from "../../assets/icons";

const { RangePicker } = DatePicker;

export default function MarketStore() {
  const [marketAdded, setMarketAdded] = useState(null);
  const [addStore, setAddStore] = useState(false);
  const [myMarket, setMyMarket] = useState(true);
  // ----------------AddStore---------------------
  const toggleAdd = React.useCallback(() => setAddStore(true), []);
  // -------------------------------------
  // ----------------AddLocation---------------------
  const toggleLocation = React.useCallback(() => setMyMarket(false), []);
  // -------------------------------------
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const [marketList, setMarketList] = useState([]);

  return (
    <div className="px-10 py-1">
      <div className="w-full pt-6 pb-4 md:py-4 md:border-b border-lightBorderColor block">
        <div className="flex justify-end items-center md:justify-between">
          <section className="hidden md:block">
            <p className="text-black text-2xl not-italic font-AeonikProMedium">
              Все магазины{" "}
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
                <RangePicker />
              </Space>
            </section>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
    // <div>{!addStore ? <MyMarket /> : <AddStore onClick={toggleAdd} />}</div>
  );
}
