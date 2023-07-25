import React, { useState } from "react";
import { SearchIcon } from "../../../../assets/icons";
import { Popover } from "antd";
import { BiChevronDown } from "react-icons/bi";

export default function FilterSearch() {
  const [state, setState] = useState({
    openwear: false,
    openPrice: false,
    textToColor: false,
  });

  // ----------------Wear state management----------------------------

  const handleOpenChangeWear = (newOpen) => {
    setState({ ...state, openwear: newOpen });
  };

  const handleWearValue = (value) => {
    setState({ ...state, openwear: false });
  };

  const wearList = [
    { id: 1, type: "All Clothing types" },
    { id: 2, type: "Headwear" },
    { id: 3, type: "Outwear" },
    { id: 4, type: "Underwear" },
    { id: 5, type: "Legwear" },
    { id: 6, type: "Accessory" },
  ];
  const contentWear = (
    <div className="w-[220px] h-fit m-0 p-0">
      {wearList.map((data) => {
        return <div className="w-full h-20 border border-red-500"></div>;
      })}
    </div>
  );

  // ----------------------Price State Management----------------------

  return (
    <div className="w-full border-b border-lightBorderColor flex justify-between py-6">
      <div className="w-fit  flex items-center">
        <span>Подробнее о товаре</span>
      </div>
      <div className="w-fit flex gap-x-[30px]  ">
        <Popover
          open={state?.openwear}
          onOpenChange={handleOpenChangeWear}
          className="w-[244px] h-10 overflow-hidden cursor-pointer border border-lightBorderColor flex items-center justify-between px-[10px] rounded-[12px] "
          trigger="click"
          options={["Hide"]}
          placement="bottom"
          content={contentWear}
        >
          <p className="text-textLightColor text-sm not-italic font-AeonikProMedium">
            Фильтр рейтинг
          </p>
          <span>
            <BiChevronDown
              size={20}
              style={{ color: "#c2c2c2" }}
              className={`${
                state?.openwear ? "rotate-[-180deg]" : ""
              } duration-200`}
            />
          </span>
        </Popover>
        <div className="w-[350px]  h-10 overflow-hidden border border-lightBorderColor flex items-center px-[10px] rounded-[12px]">
          <input
            type="text"
            className="w-full h-full  outline-0	"
            placeholder="Поиск"
          />
          <button>
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
