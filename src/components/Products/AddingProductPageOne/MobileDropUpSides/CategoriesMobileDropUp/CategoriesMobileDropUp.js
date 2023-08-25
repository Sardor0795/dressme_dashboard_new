
import React from "react";
import { CloseAnswer, LineIcon, StarLabel } from "../../../../../assets/icons";

const CategoriesMobileDropUp = ({ onClick, title }) => {
  
  const categoriesList = [
    {id:1, category:"Головные уборы"},
    {id:2, category:"Верхняя одежда"},
    {id:3, category:"Аксессуары"},
    {id:4, category:"Обувь"},
    {id:5, category:"Нижняя одежда"},
  ];

  return (
    <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
      <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4 mb-6">
        <p className="text-xl font-AeonikProMedium">Выберите категорию</p>
        <button onClick={onClick}>
          <CloseAnswer colors={"#000"}/>
        </button>
      </section>
      <section className="w-full h-[500px] px-4 flex flex-col flex-nowrap">
        <action className="w-full flex flex-row flex-wrap gap-y-[10px] gap-x-[10px] mb-4">
          {categoriesList.map((data) => {
            return (
              <button className="w-fit h-fit focus:bg-textBlueColor focus:text-white p-[10px] border border-textBlueColor text-textBlueColor rounded-lg text-[13px] font-AeonikProMedium">
                {data.category}
              </button>
            );
          })}
        </action>
        <action className="w-full h-[400px] overflow-auto flex flex-col items-center  px-4 border border-borderColor rounded-xl p-5">
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
                      type="number"
                      className="w-full h-[38px] border border-borderColor px-[15px] py-3 rounded-lg text-[11px] [&::-webkit-inner-spin-button]:appearance-none outline-none"
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
                  <div className="w-[35%] h-[38px] flex items-center justify-between border border-borderColor pl-3 py-3 rounded-lg">
                    <input
                      type="number"
                      className="w-[50%] text-[11px] [&::-webkit-inner-spin-button]:appearance-none outline-none"
                      placeholder="0"
                    />
                    <span className="w-[40%] text-[13px] text-[#b5b5b5] pt-1 font-AeonikProRegular">%</span>
                  </div>
                  <span className="mx-[5px]"><LineIcon /></span>
                  <div className="w-[65%] h-[38px] px-3 flex items-center justify-between border border-borderColor rounded-lg text-[11px] ">
                  <input
                      type="number"
                      className="w-[62%] text-[11px] [&::-webkit-inner-spin-button]:appearance-none outline-none"
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
                Размер Груди 
                <span className="text-[13px] font-AeonikProMedium text-[#b5b5b5] ml-[5px]">(см)</span>
              </p>
              <div className="w-full flex items-center mt-[7px]">
                <div className="flex flex-col">
                    <input
                      type="number"
                      className="w-[60px] h-[38px] text-center border border-borderColor px-[15px] py-3 rounded-lg text-[11px] [&::-webkit-inner-spin-button]:appearance-none outline-none"
                      placeholder="Мин"
                    />
                </div>
                <span className="mx-[5px]"><LineIcon /></span>
                <div className="flex flex-col">
                    <input
                      type="number"
                      className="w-[60px] h-[38px] text-center border border-borderColor px-[15px] py-3 rounded-lg text-[11px] font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
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
                      type="number"
                      className="w-[60px] h-[38px] text-center border border-borderColor px-[15px] py-3 rounded-lg text-[11px] [&::-webkit-inner-spin-button]:appearance-none outline-none"
                      placeholder="Мин"
                    />
                </div>
                <span className="mx-[5px]"><LineIcon /></span>
                <div className="flex flex-col">
                    <input
                      type="number"
                      className="w-[60px] h-[38px] text-center border border-borderColor px-[15px] py-3 rounded-lg text-[11px] font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
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
                Размер Талии
                <span className="text-[13px] font-AeonikProMedium text-[#b5b5b5] ml-[5px]">(см)</span>
              </p>
              <div className="w-full flex items-center mt-[7px]">
                <div className="flex flex-col">
                    <input
                      type="number"
                      className="w-[60px] h-[38px] text-center border border-borderColor px-[15px] py-3 rounded-lg text-[11px] [&::-webkit-inner-spin-button]:appearance-none outline-none"
                      placeholder="Мин"
                    />
                </div>
                <span className="mx-[5px]"><LineIcon /></span>
                <div className="flex flex-col">
                    <input
                      type="number"
                      className="w-[60px] h-[38px] text-center border border-borderColor px-[15px] py-3 rounded-lg text-[11px] font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                      placeholder="Макс"
                    />
                </div>
              </div>
            </div>
            <div className="w-fit flex flex-col">
              <p className="text-sm font-AeonikProMedium text-mobileTextColor">
                Размер Бедер
                <span className="text-[13px] font-AeonikProMedium text-[#b5b5b5] ml-[5px]">(см)</span>
              </p>
              <div className="w-full flex items-center mt-[7px]">
                <div className="flex flex-col">
                    <input
                      type="number"
                      className="w-[60px] h-[38px] text-center border border-borderColor px-[15px] py-3 rounded-lg text-[11px] [&::-webkit-inner-spin-button]:appearance-none outline-none"
                      placeholder="Мин"
                    />
                </div>
                <span className="mx-[5px]"><LineIcon /></span>
                <div className="flex flex-col">
                    <input
                      type="number"
                      className="w-[60px] h-[38px] text-center border border-borderColor px-[15px] py-3 rounded-lg text-[11px] font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                      placeholder="Макс"
                    />
                </div>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="w-full flex items-center justify-between">
            <div className="w-fit flex flex-col">
              <p className="text-sm font-AeonikProMedium text-mobileTextColor">
                Буквенный Размер
                <span className="text-[13px] font-AeonikProMedium text-[#b5b5b5] ml-[5px]">(см)</span>
              </p>
              <div className="w-full flex items-center mt-[7px]">
                <div className="w-full flex items-start flex-wrap gap-x-[9px] gap-y-3 mb-[10px]">
                    <div className="flex justify-center items-center">
                        <input type="radio" id="xxs_outwear" name="size_Outwear" value="XXS" className="w-[18px] h-[18px]"/>
                        <label
                          htmlFor="xxs_outwear"
                          className="text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer">
                          XXS
                        </label>
                    </div>
                    <div className="flex justify-center items-center">
                        <input type="radio" id="xs_outwear" name="size_Outwear" value="XS" className="w-[18px] h-[18px]" />
                        <label
                        htmlFor="xs_outwear"
                        className="text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer" >
                        XS
                        </label>
                    </div>
                    <div className="flex justify-center items-center">
                        <input type="radio" id="s_outwear" name="size_Outwear" value="S" className="w-[18px] h-[18px]" />
                        <label
                        htmlFor="s_outwear"
                        className="text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer" >
                        S
                        </label>
                    </div>
                    <div className="flex justify-center items-center">
                        <input type="radio" id="m_outwear" name="size_Outwear" value="M" className="w-[18px] h-[18px]" />
                        <label
                          htmlFor="m_outwear"
                          className="text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mt-[2px] cursor-pointer">
                          M
                        </label>
                    </div>
                    <div className="flex items-center justify-center">
                        <input type="radio" id="l_outwear" name="size_Outwear" value="L" className="w-[18px] h-[18px]" />
                        <label
                        htmlFor="l_outwear"
                        className="text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor pr-[10px] mt-[2px] cursor-pointer" >
                          L
                        </label>
                    </div>
                    <div className="flex items-center justify-center">
                        <input type="radio" id="xl_outwear" name="size_Outwear" value="XL" className="w-[18px] h-[18px]" />
                        <label
                        htmlFor="xl_outwear"
                        className="text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor pr-[10px] mt-[2px] cursor-pointer" >
                          XL
                        </label>
                    </div>
                    <div className="flex items-center justify-center">
                        <input type="radio" id="two_xl_outwear" name="size_Outwear" value="2XL" className="w-[18px] h-[18px]"/>
                        <label
                        htmlFor="two_xl_outwear"
                        className="text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer" >
                        2XL
                        </label>
                    </div>
                    <div className="flex items-center justify-center">
                      <input type="radio" id="three_xl_outwear" name="size_Outwear" value="3XL" className="w-[18px] h-[18px]" />
                      <label
                        htmlFor="three_xl_outwear"
                        className="text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mt-[2px] cursor-pointer">
                          3XL
                      </label>
                    </div>

                    <div className="flex justify-center items-center">
                        <input type="radio" id="four_xl_outwear" name="size_Outwear" value="4XL" className="w-[18px] h-[18px]"/>
                        <label
                          htmlFor="four_xl_outwear"
                          className="text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer">
                          4XL
                        </label>
                    </div>
                    <div className="flex justify-center items-center">
                        <input type="radio" id="five_xl_outwear" name="size_Outwear" value="5XL" className="w-[18px] h-[18px]"/>
                        <label
                          htmlFor="five_xl_outwear"
                          className="text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer">
                          5XL
                        </label>
                    </div>
                    <div className="flex justify-center items-center">
                        <input type="radio" id="six_xl_outwear" name="size_Outwear" value="6XL" className="w-[18px] h-[18px]" />
                        <label
                        htmlFor="six_xl_outwear"
                        className="text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer" >
                        6XL
                        </label>
                    </div>
                    <div className="flex justify-center items-center">
                        <input type="radio" id="seven_xl_outwear" name="size_Outwear" value="7XL" className="w-[18px] h-[18px]" />
                        <label
                        htmlFor="seven_xl_outwear"
                        className="text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer" >
                        7XL
                        </label>
                    </div>
                    <div className="flex justify-center items-center">
                        <input type="radio" id="eight_xl_outwear" name="size_Outwear" value="8XL" className="w-[18px] h-[18px]" />
                        <label
                          htmlFor="eight_xl_outwear"
                          className="text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mt-[2px] cursor-pointer">
                          8XL
                        </label>
                    </div>
                    <div className="flex items-center justify-center">
                        <input type="radio" id="nine_xl_outwear" name="size_Outwear" value="9XL" className="w-[18px] h-[18px]" />
                        <label
                        htmlFor="nine_xl_outwear"
                        className="text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor pr-[10px] mt-[2px] cursor-pointer" >
                          9XL
                        </label>
                    </div>
                    <div className="flex items-center justify-center">
                        <input type="radio" id="ten_xl_outwear" name="size_Outwear" value="10XL" className="w-[18px] h-[18px]" />
                        <label
                        htmlFor="ten_xl_outwear"
                        className="text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor pr-[10px] mt-[2px] cursor-pointer" >
                          10XL
                        </label>
                    </div>
                    <div className="flex items-center justify-center">
                    <button className="flex items-start justify-start text-[13px] font-AeonikProMedium ml-[4px] text-textBlueColor mt-[3px]">
                      Меньше
                    </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
          {/* 4 */}
          <div className="w-full flex items-center justify-between">
            <div className="w-full flex flex-col">
              <div className="text-sm font-AeonikProMedium text-mobileTextColor mb-2">
                Количество
              </div>
              <div className="w-full flex items-center mt-[7px] gap-x-[10px]">
                  <button className="w-2/5 border border-borderColor rounded-lg py-[8px] bg-[#e5e5e5] active:scale-95">-</button>
                  <button className="w-1/5 border border-borderColor rounded-lg py-[8px]">1</button>
                  <button className="w-2/5 border border-borderColor rounded-lg py-[8px] bg-[#e5e5e5] active:scale-95">+</button>
              </div>
            </div>
          </div>
        </action>
        <action 
          onClick={onClick}
          className="w-full flex items-center justify-between gap-x-3 my-10">
          <button className="w-[45%] h-[38px] text-base font-AeonikProMedium border border-textBlueColor rounded-md text-textBlueColor active:scale-95">Отмена</button>
          <button className="w-[55%] h-[38px] active:scale-95 text-base font-AeonikProMedium bg-textBlueColor text-white  focus:bg-textBlueColor focus:text-white border border-textBlueColor rounded-md ">Готово</button>
        </action>
      </section>
    </div>
  );
};

export default React.memo(CategoriesMobileDropUp);
