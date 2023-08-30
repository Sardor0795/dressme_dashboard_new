import React, { useState } from "react";
import { MenuCloseIcons, StarLabel } from "../../../../../../../assets/icons";
import { ColourCard } from "../../../../../../../assets";

export default function AllSizeModalEdit({ onClick, modalOpenColor }) {
  const [decraseList, setDecraseList] = useState(false);
  const [wearSizeList, setWearSizeList] = useState([
    { id: 1, action: false, name: "XXS" },
    { id: 2, action: false, name: "XS" },
    { id: 3, action: false, name: "S" },
    { id: 4, action: false, name: "M" },
    { id: 5, action: false, name: "5X" },
    { id: 6, action: false, name: "7X" },
    { id: 7, action: false, name: "9X" },

    { id: 8, action: false, name: "10X" },
    { id: 9, action: false, name: "L" },
    { id: 10, action: false, name: "XL" },
  ]);
  return (
    <div className="w-[670px] h-fit bg-white rounded-lg bg-white py-5 px-4">
      <div className="w-full flex items-center justify-between pl-7">
        <button type="button" onClick={modalOpenColor} className="flex items-center gap-x-1 border border-borderColor p-1 rounded-lg">
          <img src={ColourCard} alt="" />
          <span className="text-black text-sm not-italic font-AeonikProRegular">
            Фильт цвет
          </span>
        </button>
        <button type="button " onClick={onClick}>
          <MenuCloseIcons colors={"#000"} />
        </button>
      </div>
      {/* All Cards */}
      <div className="flex flex-col gap-y-2 mt-6">
        {/* Cards */}
        <div className="w-full flex items-center gap-x-[6px]  ">
          <div className="w-fit flex items-center justify-center">
            <button className="w-[22px] h-[22px] border border-borderColor rounded-lg">
              {/* <span className="w-[22px] h-[22px] border border-borderColor rounded-lg"></span> */}
            </button>{" "}
          </div>
          <div className="w-full ">
            <div className="flex items-center justify-between mb-[10px]">
              <button className="flex items-center gap-x-[5px]">
                <span className="w-[22px] h-[22px] border border-borderColor rounded-lg"></span>
                <span className="text-gray-900 text-base not-italic font-AeonikProMedium">
                  Выбрать все
                </span>
              </button>
              <span className="text-textBlueColor hover:underline text-base not-italic font-AeonikProMedium">
                Добавить выбранные к цвету
              </span>
            </div>
            <div className="w-full border border-borderColor  rounded-lg p-3 ">
              <action
                className={`w-full h-fit flex   justify-between not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center `}
              >
                <div className="w-1/2 flex flex-wrap justify-between gap-6 ">
                  <div className="w-[45%] flex flex-col ">
                    <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
                      Обхват Груди
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </p>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Мин"
                        />
                      </div>
                      <span className="rotate-90 text-borderColor mx-[9px]">
                        |
                      </span>
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Макс"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[45%] flex flex-col ">
                    <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
                      Размер
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </p>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Мин"
                        />
                      </div>
                      <span className="rotate-90 text-borderColor mx-[9px]">
                        |
                      </span>
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Макс"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[45%] flex flex-col ">
                    <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
                      Обхват Талии
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </p>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Мин"
                        />
                      </div>
                      <span className="rotate-90 text-borderColor mx-[9px]">
                        |
                      </span>
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Макс"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[45%] flex flex-col ">
                    <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
                      Обхват Бедер
                    </p>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Мин"
                        />
                      </div>
                      <span className="rotate-90 text-borderColor mx-[9px]">
                        |
                      </span>
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] h-[38px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Макс"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[47%] flex flex-col gap-y-[10px] ">
                  <div className="w-full">
                    <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
                      Буквенный Размер
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </p>
                    <div className="w-full flex flex-wrap gap-[8px] ">
                      {wearSizeList.map((data) => {
                        return (
                          <div
                            key={data?.id}
                            className="flex justify-center items-center"
                          >
                            <label
                              htmlFor="m_outwear"
                              className="text-[14px] flex gap-x-1 items-center font-AeonikProMedium text-textLightColor mt-[2px] cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                id="m_outwear"
                                name="size_Outwear"
                                value="M"
                                className="w-[18px] h-[18px]"
                              />
                              <span className="text-textLightColor select-none text-sm not-italic font-AeonikProMedium">
                                {data?.name}
                              </span>
                            </label>
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => setDecraseList(!decraseList)}
                        className="text-textBlueColor text-xs not-italic font-AeonikProMedium cursor-pointer"
                      >
                        {decraseList ? "Меньше" : "Больше"}
                      </button>
                    </div>
                  </div>
                  <div className="w-full flex flex-col ">
                    <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
                      Количество{" "}
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </p>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <input
                          type="text"
                          value={1}
                          className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </action>
              <div className="w-full flex gap-x-5  mt-[15px]">
                <div className="w-fit flex flex-col ">
                  <p className="flex text-mobileTextColor text-base not-italic font-AeonikProMedium mb-[10px]">
                    Возраст{" "}
                  </p>
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      value={1}
                      className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                    />
                  </div>
                </div>
                <div className="w-fit flex flex-col ">
                  <p className="flex text-mobileTextColor text-base not-italic font-AeonikProMedium mb-[10px]">
                    Цена{" "}
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </p>
                  <label className="w-[210]  flex h-[38px] border border-borderColor flex items-center">
                    <input
                      type="text"
                      placeholder="Цена"
                      className="w-full   px-3 h-full rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                    />
                    <span className="text-gray-600 text-base not-italic font-AeonikProRegular pr-3">
                      сум
                    </span>
                  </label>
                </div>
                <div className="w-fit flex flex-col ">
                  <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
                    <span className="flex text-mobileTextColor text-base not-italic font-AeonikProMedium">
                      Скидка{" "}
                      <span className="text-gray-600 text-[13px] ml-1 not-italic font-AeonikProMedium">
                        (не обезательно)
                      </span>
                    </span>

                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </p>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <input
                        type="number"
                        value={"13 %"}
                        className="w-[60px] px-3  h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                        placeholder=""
                      />
                    </div>
                    <span className="rotate-90 text-borderColor mx-[9px]">
                      |
                    </span>
                    <label className="w-[210]  flex h-[38px] border border-borderColor flex items-center">
                      <input
                        type="number"
                        value="1 300 000"
                        className="w-full   px-3 h-full rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                      />
                      <span className="text-gray-600 text-base not-italic font-AeonikProRegular pr-3">
                        сум
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end mt-5">
                {" "}
                <button className="text-blue-600 text-base not-italic font-AeonikProMedium">
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Cards */}
        <div className="w-full flex items-center gap-x-[6px]  ">
          <div className="w-fit flex items-center justify-center">
            <button className="w-[22px] h-[22px] border border-borderColor rounded-lg">
              {/* <span className="w-[22px] h-[22px] border border-borderColor rounded-lg"></span> */}
            </button>{" "}
          </div>
          <div className="w-full ">
            <div className="w-full border border-borderColor rounded-lg p-3 ">
              <action
                className={`w-full h-fit flex   justify-between not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center `}
              >
                <div className="w-1/2 flex flex-wrap justify-between gap-6 ">
                  <div className="w-[45%] flex flex-col ">
                    <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
                      Обхват Груди
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </p>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Мин"
                        />
                      </div>
                      <span className="rotate-90 text-borderColor mx-[9px]">
                        |
                      </span>
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Макс"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[45%] flex flex-col ">
                    <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
                      Размер
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </p>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Мин"
                        />
                      </div>
                      <span className="rotate-90 text-borderColor mx-[9px]">
                        |
                      </span>
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Макс"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[45%] flex flex-col ">
                    <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
                      Обхват Талии
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </p>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Мин"
                        />
                      </div>
                      <span className="rotate-90 text-borderColor mx-[9px]">
                        |
                      </span>
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Макс"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[45%] flex flex-col ">
                    <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
                      Обхват Бедер
                    </p>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Мин"
                        />
                      </div>
                      <span className="rotate-90 text-borderColor mx-[9px]">
                        |
                      </span>
                      <div className="flex flex-col">
                        <input
                          type="number"
                          className="w-[60px] h-[38px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                          placeholder="Макс"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[47%] flex flex-col gap-y-[10px] ">
                  <div className="w-full">
                    <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
                      Буквенный Размер
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </p>
                    <div className="w-full flex flex-wrap gap-[8px] ">
                      {wearSizeList.map((data) => {
                        return (
                          <div
                            key={data?.id}
                            className="flex justify-center items-center"
                          >
                            <label
                              htmlFor="m_outwear"
                              className="text-[14px] flex gap-x-1 items-center font-AeonikProMedium text-textLightColor mt-[2px] cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                id="m_outwear"
                                name="size_Outwear"
                                value="M"
                                className="w-[18px] h-[18px]"
                              />
                              <span className="text-textLightColor select-none text-sm not-italic font-AeonikProMedium">
                                {data?.name}
                              </span>
                            </label>
                          </div>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => setDecraseList(!decraseList)}
                        className="text-textBlueColor text-xs not-italic font-AeonikProMedium cursor-pointer"
                      >
                        {decraseList ? "Меньше" : "Больше"}
                      </button>
                    </div>
                  </div>
                  <div className="w-full flex flex-col ">
                    <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
                      Количество{" "}
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </p>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <input
                          type="text"
                          value={1}
                          className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </action>
              <div className="w-full flex gap-x-5  mt-[15px]">
                <div className="w-fit flex flex-col ">
                  <p className="flex text-mobileTextColor text-base not-italic font-AeonikProMedium mb-[10px]">
                    Возраст{" "}
                  </p>
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      value={1}
                      className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                    />
                  </div>
                </div>
                <div className="w-fit flex flex-col ">
                  <p className="flex text-mobileTextColor text-base not-italic font-AeonikProMedium mb-[10px]">
                    Цена{" "}
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </p>
                  <label className="w-[210]  flex h-[38px] border border-borderColor flex items-center">
                    <input
                      type="text"
                      placeholder="Цена"
                      className="w-full   px-3 h-full rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                    />
                    <span className="text-gray-600 text-base not-italic font-AeonikProRegular pr-3">
                      сум
                    </span>
                  </label>
                </div>
                <div className="w-fit flex flex-col ">
                  <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
                    <span className="flex text-mobileTextColor text-base not-italic font-AeonikProMedium">
                      Скидка{" "}
                      <span className="text-gray-600 text-[13px] ml-1 not-italic font-AeonikProMedium">
                        (не обезательно)
                      </span>
                    </span>

                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </p>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <input
                        type="number"
                        value={"13 %"}
                        className="w-[60px] px-3  h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                        placeholder=""
                      />
                    </div>
                    <span className="rotate-90 text-borderColor mx-[9px]">
                      |
                    </span>
                    <label className="w-[210]  flex h-[38px] border border-borderColor flex items-center">
                      <input
                        type="number"
                        value="1 300 000"
                        className="w-full   px-3 h-full rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                      />
                      <span className="text-gray-600 text-base not-italic font-AeonikProRegular pr-3">
                        сум
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end mt-5">
                {" "}
                <button className="text-blue-600 text-base not-italic font-AeonikProMedium">
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
