import React, { useState } from "react";
import { MenuCloseIcons, StarLabel } from "../../../../../../../assets/icons";
import { ColourCard } from "../../../../../../../assets";
import AllSizeListForWear from "../../../../../../../hook/AllSizeListForWear/AllSizeListForWear";
import AccessoriesAdd from "../../../Details/Accessories/AccessoriesAdd";
import HeadWearAdd from "../../../Details/HeadWear/HeadWearAdd";
import OutWearAdd from "../../../Details/OutWear/OutWearAdd";
import ShoesAdd from "../../../Details/Shoes/ShoesAdd";
import UnderAddWear from "../../../Details/UnderAddWear/UnderAddWear";

function AllSizeModalEdit({ onClick, colorGroup, colorSelect, stateList, sizeOfColor }) {
  // console.log(onClick, "onClick");
  // console.log(colorGroup, "colorGroup");
  // console.log(colorSelect, "colorSelect");
  console.log(stateList?.category_Id, "stateList");

  // --------------------------------------------------------
  // green black red inputРазмер Талии
  return (
    <div className="w-full md:w-[780px]  h-fit bg-white md:rounded-lg bg-white md:py-5 px-2 ls:px-3 ll:px-5 py-[6px] ls:py-2 ll:py-[10px] md:px-4 ">
      <div className="w-full flex items-center justify-between md:pl-7 ">
        <button type="button" className="flex items-center gap-x-1 border border-borderColor p-1 rounded-lg">
          <img src={ColourCard} alt="" />
          <span className="text-black text-[14px] ls:text-md not-italic font-AeonikProRegular">
            Фильт цвет
          </span>
        </button>
        <button className="md:flex hidden" type="button " onClick={onClick}>
          <MenuCloseIcons colors={"#000"} />
        </button>
        <label className="md:hidden flex items-center border border-borderColor rounded-lg overflow-hidden">
          <input type="checkbox" className="w-[20px] h-[20px] rounded-lg" />
        </label>
      </div>
      <div className="hidden md:flex items-center pl-7 mt-2 ">
        <div className="w-fit flex items-center gap-x-2">
          <span className="text-black text-md not-italic font-AeonikProRegular"> Цвет:</span>
          {colorGroup?.filter(e => colorSelect?.includes(e?.id))?.map((data) => {
            return (
              <div key={data?.id} style={{ background: `${data.hex}` }}
                className={`w-[22px] h-[22px] rounded-full `}
              >
                <span
                  className={`w-[22px] h-[22px] rounded-full `}
                ></span>
              </div>
            );
          })}
          {/* <span className="w-[18px] h-[18px] flex items-center mt-[2px]"><MenuCloseIcons colors={"#007dca"} /></span> */}
        </div>

      </div>
      {/* All Cards */}
      <div className="md:h-[694px]  overflow-hidden h-500 border border-red-500 md:mt-6">
        <div className="w-full h-full overflow-auto VerticelScroll  flex flex-col gap-y-2 border border-green-500  md:py-1 mb-5">


          <div className="md:flex hidden items-center justify-between mb-[10px] border border-red-500">
            <button className="flex items-center gap-x-[5px]">
              <span className="w-[22px] h-[22px] border border-borderColor rounded-lg"></span>
              <span className="text-gray-900 text-base not-italic font-AeonikProMedium">
                Выбрать все
              </span>
            </button>
            <span className="text-textBlueColor hover:underline text-base not-italic font-AeonikProMedium">
              Добавить выбранные к цвету
            </span>
          </div>

          {/* Filter Area */}
          <div className="w-full h-full overflow-auto VerticelScroll">

            <AccessoriesAdd typeId={stateList?.category_Id} sizeOfColor={sizeOfColor} colorGroup={colorGroup} colorSelect={colorSelect} />
            <HeadWearAdd typeId={stateList?.category_Id} sizeOfColor={sizeOfColor} colorGroup={colorGroup} colorSelect={colorSelect} />
            <OutWearAdd typeId={stateList?.category_Id} sizeOfColor={sizeOfColor} colorGroup={colorGroup} colorSelect={colorSelect} />
            <ShoesAdd typeId={stateList?.category_Id} sizeOfColor={sizeOfColor} colorGroup={colorGroup} colorSelect={colorSelect} />
            <UnderAddWear typeId={stateList?.category_Id} sizeOfColor={sizeOfColor} colorGroup={colorGroup} colorSelect={colorSelect} />

          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(AllSizeModalEdit);

