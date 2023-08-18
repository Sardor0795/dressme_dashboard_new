import React from "react";
import { MenuCloseIcons } from "../../../../../assets/icons";

export default function StoreListModal({ onClick }) {

  let data = []

  return (
    <div className="fixed inset-0 z-50 ">
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
              Выберите регион
            </p>
          </div>
          <div className="w-full px-[30px] py-[30px] flex flex-col gap-y-[10px]">
            <button className="w-full py-[10px] px-2 flex items-center justify-start rounded-[5px] hover:bg-LocationSelectBg focus:bg-LocationSelectBg">
              <div
                className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
                  data?.isCheck
                    ? "bg-[#007DCA] border-[#007DCA]"
                    : "bg-white border-checkboxBorder"
                } flex items-center justify-center rounded mr-[8px]`}
              >
                <span
                  className={`${
                    data?.isCheck
                      ? "flex items-center justify-center"
                      : "hidden"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="13"
                    viewBox="0 0 11 13"
                    fill="none"
                  >
                    <path
                      d="M1 9.5L5.88235 11L10 1"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
              </div>
              <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                Yunusobod
              </span>
            </button>
            <button className="w-full py-[10px] px-2 flex items-center justify-start rounded-[5px] hover:bg-LocationSelectBg focus:bg-LocationSelectBg">
              <div
                className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
                  data?.isCheck
                    ? "bg-[#007DCA] border-[#007DCA]"
                    : "bg-white border-checkboxBorder"
                } flex items-center justify-center rounded mr-[8px]`}
              >
                <span
                  className={`${
                    data?.isCheck
                      ? "flex items-center justify-center"
                      : "hidden"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="13"
                    viewBox="0 0 11 13"
                    fill="none"
                  >
                    <path
                      d="M1 9.5L5.88235 11L10 1"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
              </div>
              <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                Khadra
              </span>
            </button>
            <button className="w-full py-[10px] px-2 flex items-center justify-start rounded-[5px] hover:bg-LocationSelectBg focus:bg-LocationSelectBg">
              <div
                className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
                  data?.isCheck
                    ? "bg-[#007DCA] border-[#007DCA]"
                    : "bg-white border-checkboxBorder"
                } flex items-center justify-center rounded mr-[8px]`}
              >
                <span
                  className={`${
                    data?.isCheck
                      ? "flex items-center justify-center"
                      : "hidden"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="13"
                    viewBox="0 0 11 13"
                    fill="none"
                  >
                    <path
                      d="M1 9.5L5.88235 11L10 1"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
              </div>
              <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                Chilanzor
              </span>
            </button>
            <button className="w-full py-[10px] px-2 flex items-center justify-start rounded-[5px] hover:bg-LocationSelectBg focus:bg-LocationSelectBg">
              <div
                className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
                  data?.isCheck
                    ? "bg-[#007DCA] border-[#007DCA]"
                    : "bg-white border-checkboxBorder"
                } flex items-center justify-center rounded mr-[8px]`}
              >
                <span
                  className={`${
                    data?.isCheck
                      ? "flex items-center justify-center"
                      : "hidden"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="13"
                    viewBox="0 0 11 13"
                    fill="none"
                  >
                    <path
                      d="M1 9.5L5.88235 11L10 1"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                </span>
              </div>
              <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                Tashkent
              </span>
            </button>
          </div>
          <div className="w-full h-fit flex items-center justify-end p-5 border-t border-borderColor2">
            <button
              onClick={onClick}
              className="font-AeonikProMedium text-base text-textBlueColor capitalize mr-2"
            >
              Закрыть
            </button>
            <button
              onClick={onClick}
              className="font-AeonikProMedium text-base text-textBlueColor capitalize"
            >
              Подтвердить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
