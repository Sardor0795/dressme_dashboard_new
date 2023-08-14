import React, { useState } from 'react'
import { CloseAnswer, SearchIcon } from "../../../../../assets/icons";

const ClothingTypesAnimationPage = ({ onClick, title }) => {

  const clothingTypesList = [
    { id: 1, name:"Повседневный" },
    { id: 2, name:"Студенческий" },
    { id: 3, name:"Бизнес" },
    { id: 4, name:"Классический" },
    { id: 6, name:"Спортивный" },
    { id: 7, name:"Традиционный" },
    { id: 8, name:"Мусульманский" },
    { id: 9, name:"Военный" },
    { id: 10, name:"Комиксный" },
    { id: 11, name:"Путешествие" },
    { id: 12, name:"Детский" },
    { id: 13, name:"Домашний" },
    { id: 14, name:"Музыкальный" },
    { id: 15, name:"Медицинский" },
  ];
  
  return (
    <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
      <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
        <p className="text-xl font-AeonikProMedium">Раздел одежды</p>
        <button onClick={onClick}>
          <CloseAnswer colors={"#000"}/>
        </button>
      </section>
      <section className="w-full h-[445px] px-4 flex flex-col items-center">
        <action className="w-full h-fit flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
            <form className='w-full flex flex-col items-center'>
                
                <div className='w-full h-[34px] flex items-center justify-between rounded-lg border border-borderColor mb-[26px] text-[11px] px-3'>
                    <input type="text" name='clothingTypes' placeholder='Искать раздел' className='w-full pr-3 outline-none' />
                    <SearchIcon />
                </div>
                <div className='w-full h-[260px] overflow-auto'> 
                  {clothingTypesList.map((data) => {
                      return (
                          <div key={data.id} className='w-full overflow-scroll flex items-center justify-start border-b border-borderColor pb-[10px] mb-4 text-base font-AeonikProRegular'>
                              {data.name}
                          </div>
                      );
                  })}
                </div>
          </form>
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

export default React.memo(ClothingTypesAnimationPage);


