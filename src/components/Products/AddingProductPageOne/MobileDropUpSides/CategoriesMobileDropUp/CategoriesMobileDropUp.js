
import React from "react";
import { useNavigate } from "react-router-dom";
import { CloseAnswer, LineIcon } from "../../../../../assets/icons";

const CategoriesMobileDropUp = ({ onClick, title }) => {
  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`/product/:${id}`);
  };
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
                <div className="w-full flex items-start flex-wrap gap-x-[15px] gap-y-3 mb-[10px]">
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
          <div className="w-full flex items-center justify-between gap-x-3 my-10">
            <button className="w-[45%] h-[38px] text-base font-AeonikProMedium border border-textBlueColor rounded-md text-textBlueColor">Отмена</button>
            <button className="w-[55%] h-[38px] text-base font-AeonikProMedium bg-textBlueColor text-white  focus:bg-textBlueColor focus:text-white border border-textBlueColor rounded-md ">Готово</button>
          </div>
      </section>
    </div>
  );
};

export default React.memo(CategoriesMobileDropUp);
