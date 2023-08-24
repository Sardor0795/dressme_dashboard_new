import React, { useEffect } from "react";
import { DatePicker, Space } from "antd";
import { SearchIcon } from "../../../assets/icons";
import MarketList from "./MarketList";
import { Link } from "react-router-dom";
import MobileHumburgerMenu from "../../Navbar/mobileHamburgerMenu/MobileMenu";

const { RangePicker } = DatePicker;

export default function MyMarket() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <div className="w-full h-full  py-1">
      <div className="w-full pt-6 pb-6 md:pb-4 md:py-4 md:border-b border-lightBorderColor block ">
        <div>
          <MobileHumburgerMenu />
        </div>
        <div className="w-full flex items-center justify-center md:hidden">
          <span className="text-2xl not-italic font-AeonikProMedium">
            Все магазины
          </span>
        </div>
        <div className="flex items-center justify-between border-t md:border-0 border-borderColor md:mt-0 md:pt-0 mt-10 pt-4">
          <section className="hidden md:block">
            <p className="text-black text-2xl not-italic font-AeonikProMedium">
              Все магазины{" "}
            </p>
          </section>
          <Link
            to="/"
            className="md:hidden text-weatherWinterColor text-xs not-italic font-AeonikProMedium"
          >
            Создать новый магазин
          </Link>
          <section className="w-fit flex items-center gap-x-[15px]">
            <form className=" md:w-[400px] h-10 overflow-hidden border border-lightBorderColor flex items-center px-[10px] rounded-lg">
              <input
                type="text"
                name="s"
                className="w-full h-full  outline-0 sm:block hidden	"
                placeholder="Поиск"
              />
              <button>
                <SearchIcon />
              </button>
            </form>
            <section className="mobileDate md:flex items-center gap-x-[30px] hidden">
              <Space direction="vertical" size={12}>
                <RangePicker placeholder={["от", "до"]} />
              </Space>
            </section>
          </section>
        </div>
      </div>
      <div className="h-fit py-7  w-full md:flex items-center justify-end hidden">
        <button className="w-fit h-[42px] active:scale-95 rounded-lg flex items-center px-[10px] bg-weatherWinterColor text-white text-base not-italic font-AeonikProMedium">
          Создать новый магазин
        </button>
      </div>
      <div className=" w-full">
        <MarketList />
      </div>
    </div>
  );
}
