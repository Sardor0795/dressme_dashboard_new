import React from 'react'
import { useNavigate } from "react-router-dom";
import { CloseAnswer } from "../../../../assets/icons";

const ClothingTypesAnimationPage = ({ onClick, title }) => {
  
  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`/product/:${id}`);
  };
  const clothingTypesList = [
    // 
  ];
  return (
    <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
      <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
        <p className="text-xl font-AeonikProMedium">Раздел одежды</p>
        <button onClick={onClick}>
          <CloseAnswer colors={"#000"}/>
        </button>
      </section>
      <section className="w-full h-fit px-4 flex flex-col items-center">
        <action className="w-full h-[110px] flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
          {clothingTypesList.map((data) => {
            return (
                <></>
            );
          })}
        </action>
        <action className="w-full flex items-center justify-between gap-x-3 mb-10">
          <button className="w-[45%] h-[38px] text-base font-AeonikProMedium focus:bg-textBlueColor focus:text-white border border-textBlueColor rounded-md text-textBlueColor">Отмена</button>
          <button className="w-[55%] h-[38px] text-base font-AeonikProMedium focus:bg-textBlueColor focus:text-white border border-textBlueColor rounded-md text-textBlueColor">Готово</button>
        </action>
      </section>
    </div>
  );
};

export default React.memo(ClothingTypesAnimationPage);


