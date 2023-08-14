import React from "react";
import { CloseAnswer } from "../../../../../assets/icons";

const ColorsMobileDropUp = ({ onClick, title }) => {
  
  const colorsList = [
    { id: 1, color: "bg-black", },
    { id: 2, color: "bg-white", },
    { id: 3, color: "bg-zinc-500", },
    { id: 4, color: "bg-amber-400", },
    { id: 5, color: "bg-purple-500", },
    { id: 6, color: "bg-amber-600", },
    { id: 7, color: "bg-green-700", },
    { id: 8, color: "bg-amber-600", },
    { id: 9, color: "bg-red-700", },
    { id: 10, color: "bg-purple-800", },
    { id: 11, color: "bg-blue-900", },
    { id: 12, color: "bg-yellow-900", },
  ];
  
  return (
    <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
      <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
        <p className="text-xl font-AeonikProMedium">Выберите цвет</p>
        <button onClick={onClick}>
          <CloseAnswer colors={"#000"}/>
        </button>
      </section>
      <section className="w-full h-fit px-4 flex flex-col items-center">
        <action className="w-full h-[110px] flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
          {colorsList.map((data) => {
            return (
              <div
                key={data?.id}
                className={`w-[35px] h-[35px] ${data.color} rounded-full border border-searchBgColor overflow-hidden cursor-pointer`}>
              </div>
            );
          })}
        </action>
        <action className="w-full flex items-center justify-between gap-x-3 mb-10">
          <button 
            onClick={onClick}
            className="w-[45%] h-[38px] text-base font-AeonikProMedium bg-white text-textBlueColor border border-textBlueColor rounded-md active:scale-95">Отмена</button>
          <button className="w-[55%] h-[38px] text-base font-AeonikProMedium bg-textBlueColor text-white border border-textBlueColor rounded-md active:scale-95">Готово</button>
        </action>
      </section>
    </div>
  );
};

export default React.memo(ColorsMobileDropUp);
