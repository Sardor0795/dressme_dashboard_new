import React from "react";
import { CloseAnswer, LineIcon } from "../../../../../../../assets/icons";

const CategoriesMobileDropUp = ({ onClick, title }) => {

  return (
    <div className="max-w-[440px] w-[100%] h-[90vh] mx-auto bg-white shadow-navMenuShadov border border-red-500 p-4   overflow-hidden  rounded-t-[12px]">
      <section className=" w-full bg-btnBgColor flex items-center  justify-end ">
        <button onClick={onClick}>
          <CloseAnswer colors={"#000"} />
        </button>
      </section>
      <div className="flex items-center justify-between mt-6 border-b border-borderColor pb-4">
        <div className="flex items-center gap-x-2">
          <span className="w-5 h-5 border border-borderColor rounded-lg"></span>
          <span className="text-gray-900 text-sm not-italic font-AeonikProMedium">Выбрать все</span>
        </div>
        <div className="flex items-center">    <span className="text-blue-600 text-sm not-italic hover:underline font-AeonikProMedium">Добавить выбранные к цвету</span>    </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <button className="h-[35px] flex items-center justify-center px-[10px] text-textBlueColor focus:text-white border border-textBlueColor focus:bg-textBlueColor bg-white rounded-lg text-xs not-italic font-AeonikProMedium">Верхняя одежда</button>
        <button className="h-[35px] flex items-center justify-center px-[10px] text-textBlueColor focus:text-white border border-textBlueColor focus:bg-textBlueColor bg-white rounded-lg text-xs not-italic font-AeonikProMedium">Все размеры</button>
        <button className="h-[35px] flex items-center justify-center px-[10px] text-textBlueColor focus:text-white border border-textBlueColor focus:bg-textBlueColor bg-white rounded-lg text-xs not-italic font-AeonikProMedium">Добавить размер</button>
      </div>
      <section className="w-full h-[500px] px-4 flex flex-col flex-nowrap">



      </section>
    </div>
  );
};

export default React.memo(CategoriesMobileDropUp);
