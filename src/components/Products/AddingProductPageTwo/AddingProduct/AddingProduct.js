import React from "react";
import { Link } from "react-router-dom";
import { Select } from "antd";

export default function AddingProduct() {
  return (
    <div className="flex py-[40px] md:py-[50px] px-[40px]">
      <div className="hidden md:flex flex-col items-center justify-center mr-[50px]">
        <div className="text-[#007dca] text-2xl w-[45px] h-[45px] rounded-full flex items-center justify-center border-2 border-[#1e88e5] mb-[5px] font-AeonikProRegular">
          1
        </div>
        <div className="bg-[#1e88e5] h-[150px] w-[2px] mb-[5px]"></div>
        <div className="text-white bg-[#1e88e5] text-2xl w-[45px] h-[45px] rounded-full flex items-center justify-center border-2 border-[#1e88e5] mb-[5px] font-AeonikProRegular">
          2
        </div>
        <div className="bg-[#f2f2f2] w-[2px] flex-1"></div>
      </div>
      <div className="flex-1">
        <div>
          <div className="flex md:hidden mb-[15px] justify-end">
            <Link className="text-[#007DCA] text-[14px] border-b border-[#007dca] leading-none font-AeonikProRegular">
              Google переводчиком
            </Link>
          </div>
          <form
            className="flex flex-wrap md:flex-nowrap gap-[25px] md:gap-[40px]"
            action="#"
          >
            <div className="section1 border-b pb-[30px] md:rounded-lg md:p-5 w-full md:max-w-[490px] md:border border-[#f2f2f2] ">
              <div className="inputWrapper mb-[10px]">
                <div className="text-[#303030] mb-[5px] pr-[15px] w-fit text-base font-AeonikProMedium bg-[url('/src/assets/asterisc.png')] bg-right bg-no-repeat">
                  Название на русском
                </div>
                <div className="rounded-lg border border-[#e5e5e5] flex py-[10px] px-[5px]">
                  <input
                    className="flex-1 mr-[10px] w-[30px] ll:w-auto focus:outline-none font-AeonikProRegular"
                    type="text"
                  />
                  <button className="text-[#858585] text-xs rounded-[4px] bg-[#f0f0f0] active:translate-y-[2px] p-[5px] font-AeonikProMedium">
                    Копировать
                  </button>
                </div>
              </div>
              <div className="inputWrapper mb-[10px]">
                <div className="text-[#303030] mb-[5px] pr-[15px] w-fit text-base font-AeonikProMedium bg-[url('/src/assets/asterisc.png')] bg-right bg-no-repeat">
                  Название на узбекском
                </div>
                <div className="rounded-lg border border-[#e5e5e5] flex py-[10px] px-[5px]">
                  <input
                    className="flex-1 mr-[10px] w-[30px] ll:w-auto focus:outline-none font-AeonikProRegular"
                    type="text"
                  />
                  <button className="text-[#858585] text-xs rounded-[4px] bg-[#f0f0f0] active:translate-y-[2px] p-[5px] font-AeonikProMedium">
                    Копировать
                  </button>
                </div>
              </div>
              <div className="inputWrapper mb-[10px]">
                <div className="text-[#303030] mb-[5px] pr-[15px] w-fit text-base font-AeonikProMedium bg-[url('/src/assets/asterisc.png')] bg-right bg-no-repeat">
                  Название на узбекском
                </div>
                <div className="rounded-lg border border-[#e5e5e5] flex flex-col h-[120px] py-[10px] px-[5px]">
                  <textarea
                    className="block w-full text-[#666] text-sm resize-none bg-transparent flex-1 mb-[10px] outline-none font-AeonikProRegular"
                    name=""
                    id=""
                  ></textarea>
                  <div className="flex justify-end w-full">
                    <button className="text-[#858585] text-xs rounded-[4px] bg-[#f0f0f0] active:translate-y-[2px] p-[5px] font-AeonikProMedium">
                      Копировать
                    </button>
                  </div>
                </div>
              </div>
              <div className="inputWrapper">
                <div className="text-[#303030] mb-[5px] pr-[15px] w-fit text-base font-AeonikProMedium bg-[url('/src/assets/asterisc.png')] bg-right bg-no-repeat">
                  Описание на узбекском
                </div>
                <div className="rounded-lg  border border-[#ffb8b8] bg-[#fff6f6] flex column h-[120px]  py-[10px] px-[5px]">
                  <textarea
                    className="block w-full text-[#666] text-sm resize-none bg-transparent flex-1 mb-[10px] outline-none font-AeonikProRegular"
                    name=""
                    id=""
                  ></textarea>
                  <div className="hidden justify-end w-full">
                    <button className="text-[#858585] text-xs rounded-[4px] bg-[#f0f0f0] active:translate-y-[2px] p-[5px] font-AeonikProMedium">
                      Копировать
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2 */}

            <div className="w-full pb-[30px] md:border border-[#f2f2f2] flex flex-col md:rounded-lg md:p-5 flex-1">
              <div className="row mb-[17px] md:mb-[20px] block md:flex gap-[35px]">
                <div className="inputWrapper flex-1 mb-[10px]">
                  <div className="text-[#303030] mb-[5px] pr-[15px] w-fit text-base font-AeonikProMedium bg-[url('/src/assets/asterisc.png')] bg-right bg-no-repeat">
                    Качество на русском
                  </div>
                  <Select placeholder={"Выбрать"} style={{ width: "100%" }} />
                </div>
                <div className="inputWrapper flex-1 mb-[10px]">
                  <div className="text-[#303030] mb-[5px] pr-[15px] w-fit text-base font-AeonikProMedium bg-[url('/src/assets/asterisc.png')] bg-right bg-no-repeat">
                    Качество на узбекском
                  </div>
                  <Select placeholder={"Выбрать"} style={{ width: "100%" }} />
                </div>
              </div>
              <div className="row mb-[17px] md:mb-[20px] block md:flex gap-[35px]">
                <div className="inputWrapper flex-1 mb-[17px] md:mb-[10px]">
                  <div className="text-[#303030] mb-[5px] pr-[15px] w-fit text-base bg-no-repeat font-AeonikProMedium">
                    Состав на русском{" "}
                    <span className="text-sm ml-[5px] text-[#a1a1a1] font-AeonikProMedium">
                      (не обезательно)
                    </span>
                  </div>
                  <div className="rounded-lg border border-[#e5e5e5] flex py-[10px] px-[5px]">
                    <input
                      className="flex-1 mr-[10px] w-[30px] ll:w-auto focus:outline-none font-AeonikProRegular"
                      type="text"
                    />
                    <button className="text-[#858585] text-xs rounded-[4px] bg-[#f0f0f0] active:translate-y-[2px] p-[5px] font-AeonikProMedium">
                      Копировать
                    </button>
                  </div>
                  <div className="mt-[10px]">
                    <div className="flex items-center text-white w-fit px-2 py-[5px] text-[16px] rounded-[4px] font-AeonikProRegular bg-[#007dca]">
                      хлопок{" "}
                      <button className="bg-[url('/src/assets/x_icon.png')] bg-center active:translate-y-[2px] bg-no-repeat  w-4 h-4 rounded-full bg-white ml-[10px]"></button>
                    </div>
                  </div>
                </div>
                <div className="inputWrapper flex-1 mb-[10px]">
                  <div className="text-[#303030] mb-[5px] pr-[15px] w-fit text-base bg-no-repeat font-AeonikProMedium">
                    Состав на узбекском{" "}
                    <span className="notRecquired font-AeonikProMedium">
                      (не обезательно)
                    </span>
                  </div>
                  <div className="rounded-lg border border-[#e5e5e5] flex py-[10px] px-[5px]">
                    <input
                      className="flex-1 mr-[10px] w-[30px] ll:w-auto focus:outline-none font-AeonikProRegular"
                      type="text"
                    />
                    <button className="text-[#858585] text-xs rounded-[4px] bg-[#f0f0f0] active:translate-y-[2px] p-[5px] font-AeonikProMedium">
                      Копировать
                    </button>
                  </div>
                </div>
              </div>
              <div className="row mb-[30px] md:mb-[20px] block md:flex gap-[35px]">
                <div className="inputWrapper flex-1 mb-[10px]">
                  <div className="inputTitle text-[#303030] mb-[5px] pr-[15px] w-fit text-base font-AeonikProMedium">
                    Бренд <span className="notRecquired">(не обезательно)</span>
                  </div>
                  <Select
                    className="font-AeonikProMedium"
                    placeholder={"Выбрать"}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="inputWrapper flex-1 mb-[10px]"></div>
              </div>

              <div className="flex md:hidden items-center justify-center mb-[40px]">
                <div className="bg-[#e5e5e5] flex-1 h-[1px] "></div>
                <div className="w-4 h-4 rounded-full border border-[#007dca] flex items-center justify-center mr-[10px] ml-[10px]"></div>
                <div className="w-[50px] bg-[#007dca] h-[1px]"></div>
                <div className="w-4 h-4 rounded-full border border-[#007dca] flex items-center justify-center mr-[10px] ml-[10px]">
                  <span className="w-2 inline-block h-2 rounded-full bg-[#007dca]"></span>
                </div>
                <div className="bg-[#e5e5e5] flex-1 h-[1px]"></div>
              </div>

              <div className="flex justify-center md:justify-end gap-[20px] mt-auto">
                <button className="text-white p-[12px] active:translate-y-[2px] rounded-md bg-[#007dca] max-w-[130px] w-full font-AeonikProRegular">
                  Назад
                </button>
                <button className="text-white p-[12px] active:translate-y-[2px] rounded-md bg-[#007dca] max-w-[130px] w-full font-AeonikProRegular">
                  Добавить
                </button>
              </div>
            </div>
          </form>
          <div className="hidden md:block mt-[30px] font-AeonikProRegular">
            Воспользоваться
            <Link className="text-[#007dca] text-lg border-b border-[#007dca] ml-[10px] font-AeonikProRegular">
              Google переводчиком
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
