
import React, { useState } from "react";
import { CloseAnswer, LineIcon, StarLabel } from "../../../../../assets/icons";
import AllSizeListForWear from "../../../../../hook/AllSizeListForWear/AllSizeListForWear";

const CategoriesMobileDropUp = ({ onClick, title }) => {

  const categoriesList = [
    { id: 1, category: "Головные уборы" },
    { id: 2, category: "Верхняя одежда" },
    { id: 3, category: "Аксессуары" },
    { id: 4, category: "Обувь" },
    { id: 5, category: "Нижняя одежда" },
  ];

  return (
    <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
      <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4 mb-6">
        <p className="text-xl font-AeonikProMedium">Выберите категорию</p>
        <button onClick={onClick}>
          <CloseAnswer colors={"#000"} />
        </button>
      </section>
      <section className="w-full h-[500px] px-4 flex flex-col flex-nowrap">
        <div className="w-full flex flex-row flex-wrap gap-y-[10px] gap-x-[10px] mb-4">
          {categoriesList.map((data) => {
            return (
              <button key={data?.id} className="w-fit h-fit focus:bg-textBlueColor focus:text-white p-[10px] border border-textBlueColor text-textBlueColor rounded-lg text-[13px] font-AeonikProMedium">
                {data.category}
              </button>
            );
          })}
        </div>
        <div className="w-full h-[400px] overflow-auto VerticelScroll flex flex-col items-center  px-4 border border-borderColor rounded-xl p-5">
          {/* 1 */}
          <div className="w-full flex items-center justify-between mb-[15px] gap-x-[10px]">
            <div className="w-[40%] flex flex-col">
              <div className="flex items-center text-sm font-AeonikProMedium text-mobileTextColor">
                Цена
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              <div className="w-full flex items-center mt-[7px]">
                <div className="w-full flex flex-col">
                  <input
                    type="text"
                    className="inputStyle w-full h-[38px] border border-borderColor px-2 rounded-lg   outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
            <div className="w-[60%] flex flex-col">
              <div className="text-sm font-AeonikProMedium text-mobileTextColor">
                Скидка
                <span className="text-[10px] font-AeonikProMedium text-[#b5b5b5] ml-[5px]">(не обезательно)</span>
              </div>
              <div className="w-full flex items-center mt-[7px]">
                <div className="w-full flex items-center">
                  <div className="w-[35%] h-[38px] flex items-center justify-between border border-borderColor pl-2 rounded-lg">
                    <input
                      type="text"
                      className=" inputStyle w-[50%]  outline-none"
                      placeholder="0"
                    />
                    <span className="w-[40%] text-[13px] text-[#b5b5b5] pt-1 font-AeonikProRegular">%</span>
                  </div>
                  <span className="mx-[5px]"><LineIcon /></span>
                  <div className="w-[65%] h-[38px] px-2 flex items-center justify-between border border-borderColor rounded-lg  ">
                    <input
                      type="text"
                      className="w-[62%] inputStyle  outline-none"
                      placeholder="0"
                    />
                    <span className="w-[30%] text-xs text-[#b5b5b5] font-AeonikProRegular">сум</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 1 */}
          <div className="w-full flex items-center justify-between mb-[15px]">
            <div className="w-fit flex flex-col">
              <p className="text-sm font-AeonikProMedium text-mobileTextColor">
                Обхват Груди
                <span className="text-[13px] font-AeonikProMedium text-[#b5b5b5] ml-[5px]">(см)</span>
              </p>
              <div className="w-full flex items-center mt-[7px]">
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-2 rounded-lg  font-AeonikProRegular  outline-none"
                    placeholder="Мин"
                  />
                </div>
                <span className="mx-[5px]"><LineIcon /></span>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-2 rounded-lg  font-AeonikProRegular  outline-none"
                    placeholder="Макс"
                  />
                </div>
              </div>
            </div>
            <div className="w-fit flex flex-col">
              <p className="text-sm font-AeonikProMedium text-mobileTextColor">
                Размер
              </p>
              <div className="w-full flex items-center mt-[7px]">
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-2 rounded-lg   outline-none font-AeonikProRegular "
                    placeholder="Мин"
                  />
                </div>
                <span className="mx-[5px]"><LineIcon /></span>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-2 rounded-lg  font-AeonikProRegular  outline-none"
                    placeholder="Макс"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="w-full flex items-center justify-between mb-[15px]">
            <div className="w-fit flex flex-col">
              <p className="text-sm font-AeonikProMedium text-mobileTextColor">
                Обхват Талии
                <span className="text-[13px] font-AeonikProMedium text-[#b5b5b5] ml-[5px]">(см)</span>
              </p>
              <div className="w-full flex items-center mt-[7px]">
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-2 rounded-lg  font-AeonikProRegular  outline-none"
                    placeholder="Мин"
                  />
                </div>
                <span className="mx-[5px]"><LineIcon /></span>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-2 rounded-lg  font-AeonikProRegular  outline-none"
                    placeholder="Макс"
                  />
                </div>
              </div>
            </div>
            <div className="w-fit flex flex-col">
              <p className="text-sm font-AeonikProMedium text-mobileTextColor">
                Обхват Бедер
                <span className="text-[13px] font-AeonikProMedium text-[#b5b5b5] ml-[5px]">(см)</span>
              </p>
              <div className="w-full flex items-center mt-[7px]">
                <div className="flex flex-col">
                  <input
                    type="text"
                    className=" inputStyle w-[60px] h-[38px] text-center border border-borderColor px-2 rounded-lg  font-AeonikProRegular  outline-none"
                    placeholder="Мин"
                  />
                </div>
                <span className="mx-[5px]"><LineIcon /></span>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-2 rounded-lg  font-AeonikProRegular  outline-none"
                    placeholder="Макс"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="w-full flex items-center justify-between">
            <div className="w-fit flex flex-col gap-y-2">
              <p className="text-sm font-AeonikProMedium text-mobileTextColor">
                Буквенный Размер
                <span className="text-[13px] font-AeonikProMedium text-[#b5b5b5] ml-[5px]">(см)</span>
              </p>
              <AllSizeListForWear />
            </div>
          </div>
          {/* 4 */}
          <div className="w-full flex items-center justify-between mt-[14px] md:mt-0">
            <div className="w-full flex flex-col">
              <div className="text-sm font-AeonikProMedium text-mobileTextColor mb-2">
                Количество
              </div>
              <div className="w-full flex items-center  gap-x-[10px]">
                <button className="w-2/5 border border-borderColor rounded-lg py-[8px] bg-[#e5e5e5] active:scale-95">-</button>
                <button className="w-1/5 border border-borderColor rounded-lg py-[8px]">1</button>
                <button className="w-2/5 border border-borderColor rounded-lg py-[8px] bg-[#e5e5e5] active:scale-95">+</button>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={onClick}
          className="w-full flex items-center justify-between gap-x-3 my-10">
          <button className="w-[45%] h-[38px] text-base font-AeonikProMedium border border-textBlueColor rounded-md text-textBlueColor active:scale-95">Отмена</button>
          <button className="w-[55%] h-[38px] active:scale-95 text-base font-AeonikProMedium bg-textBlueColor text-white  focus:bg-textBlueColor focus:text-white border border-textBlueColor rounded-md ">Готово</button>
        </div>
      </section>
    </div>
  );
};

export default React.memo(CategoriesMobileDropUp);
