import React from "react";
import { MenuCloseIcons } from "../../../../../assets/icons";

export default function StoreListModal({ onClick }) {
  return (
    <div className="fixed inset-0 z-10 ">
      <div
        className="fixed cursor-pointer inset-0 w-full h-full bg-black opacity-40"
        onClick={onClick}
      ></div>
      <div className="flex items-center min-h-screen justify-center">
        <div className="relative w-[440px] py-[5px] min-h-[350px] rounded-[20px] bg-white overflow-hidden">
          <div className="absolute top-4 right-4 ">
            <button type="button" onClick={onClick}>
              <MenuCloseIcons colors={"#A5A5A5"} />
            </button>
          </div>
          <div className="w-full h-fit flex items-center justify-center py-5 border-b border-borderColor2">
            <p className="text-tableTextTitle2 text-2xl not-italic font-AeonikProRegular">
              Добавить локацию
            </p>
          </div>
          <div className="w-full px-[10px] py-[30px] flex flex-col gap-y-[10px]">
            <button className="w-full py-[10px] flex items-center justify-center rounded-[5px] hover:bg-LocationSelectBg focus:bg-LocationSelectBg">
              <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                {" "}
                Yunusobod
              </span>
            </button>
            <button className="w-full py-[10px] flex items-center justify-center rounded-[5px] hover:bg-LocationSelectBg focus:bg-LocationSelectBg">
              <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                {" "}
                Mirzo Ulug'bek
              </span>
            </button>
            <button className="w-full py-[10px] flex items-center justify-center rounded-[5px] hover:bg-LocationSelectBg focus:bg-LocationSelectBg">
              <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                {" "}
                Chilanzor
              </span>
            </button>
            <button className="w-full py-[10px] flex items-center justify-center rounded-[5px] hover:bg-LocationSelectBg focus:bg-LocationSelectBg">
              <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                {" "}
                Yashnabod
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
