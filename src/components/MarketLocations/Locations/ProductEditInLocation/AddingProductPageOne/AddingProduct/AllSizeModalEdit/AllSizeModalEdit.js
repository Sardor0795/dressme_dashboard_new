import React, { useState } from "react";
import { MenuCloseIcons, StarLabel } from "../../../../../../../assets/icons";
import { ColourCard } from "../../../../../../../assets";

function AllSizeModalEdit({ onClick, modalOpenColor, colorGroup }) {
  const [decraseList, setDecraseList] = useState(false);
  const [decraseList2, setDecraseList2] = useState(false);

  const [sizeList, setSizeList] = useState({
    sizeList1: [
      { id: 1, action: true, name: "XXS" },
      { id: 2, action: true, name: "XS" },
      { id: 3, action: true, name: "S" },
      { id: 4, action: true, name: "M" },
      { id: 5, action: true, name: "L" },
      { id: 6, action: true, name: "XL" },
      { id: 7, action: true, name: "2XL" },
      { id: 8, action: true, name: "3XL" },
    ],
    sizeList2: [
      { id: 1, action: true, name: "5X" },
      { id: 2, action: true, name: "7X" },
      { id: 3, action: true, name: "9X" },
      { id: 4, action: true, name: "10X" },
      { id: 5, action: true, name: "4X" },
      { id: 6, action: true, name: "6X" },
      { id: 7, action: true, name: "8X" },

    ]
  }
  )
  // --------------------------------------------------------
  // green black red inputРазмер Талии
  return (
    <div className="w-full md:w-[780px]  h-fit bg-white md:rounded-lg bg-white md:py-5 px-2 ls:px-3 ll:px-5 py-[6px] ls:py-2 ll:py-[10px] md:px-4 ">
      <div className="w-full flex items-center justify-between md:pl-7 ">
        <button type="button" onClick={modalOpenColor} className="flex items-center gap-x-1 border border-borderColor p-1 rounded-lg">
          <img src={ColourCard} alt="" />
          <span className="text-black text-[14px] ls:text-md not-italic font-AeonikProRegular">
            Фильт цвет
          </span>
        </button>
        <button className="md:flex hidden" type="button " onClick={onClick}>
          <MenuCloseIcons colors={"#000"} />
        </button>
        <label className="md:hidden flex items-center border border-borderColor rounded-lg overflow-hidden">
          <input type="checkbox" className="w-[20px] h-[20px] rounded-lg" />
        </label>
      </div>
      <div className="hidden md:flex items-center pl-7 mt-2 ">
        <div className="w-fit flex items-center gap-x-2">
          <span className="text-black text-md not-italic font-AeonikProRegular">Выбранный цвет:</span>
          {colorGroup.map((data) => {
            return (
              <>
                {data?.action && (
                  <button
                    className={`w-[22px] h-[22px] rounded-full bg-${data?.colors}`}
                  ></button>
                )}
              </>
            );
          })}
          <span className="w-[18px] h-[18px] flex items-center mt-[2px]"><MenuCloseIcons colors={"#007dca"} /></span>
        </div>

      </div>
      {/* All Cards */}
      <div className="md:h-[694px] h-fit overflow-auto flex flex-col gap-y-2 mt-4 md:mt-6 AllSizeModalScroll md:py-1">
        {/* Cards */}
        <div className="w-full flex items-center gap-x-[6px]  ">
          <div className="w-fit md:flex hidden items-center justify-center">
            <button className="w-[22px] h-[22px] border border-borderColor rounded-lg">
            </button>{" "}
          </div>
          <div className="w-full ">
            <div className="md:flex hidden items-center justify-between mb-[10px]">
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
            {/* <div className="w-full border md:  rounded-lg md:p-3 pb-4"> */}
            <div className="w-full md:border border-borderColor  rounded-lg md:p-3 pb-4">

              {/* For Price Mobile*/}
              <div className="w-full flex  md:hidden gap-x-1 ls:gap-x-[10px]   ">

                <div className="w-fit flex flex-col ">
                  <p className="flex items-center text-[12px] ll:text-[14px]  text-mobileTextColor mb-2 ll:mb-[10px]  font-AeonikProRegular">
                    Цена{" "}
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </p>
                  <label className="w-[95px] xs:w-[120px]  flex h-[35px] md:h-[38px] border border-borderColor rounded-lg overflow-hidden flex items-center">
                    <input
                      type="text"
                      placeholder="Цена"
                      value={"1300000"}
                      className="inputStyle w-full   pl-1 xs:pl-2 h-full rounded-lg  font-AeonikProRegular  outline-none"
                    />
                    <span className="text-textLightColor text-[12px] not-italic font-AeonikProRegular pr-1 xs:pr-2">
                      сум
                    </span>
                  </label>
                </div>
                <div className="w-fit flex flex-col ">
                  <div className="flex items-center text-base text-mobileTextColor mb-2">
                    <span className="flex  text-[12px] ll:text-[14px]  text-mobileTextColor   font-AeonikProRegular">
                      Скидка{" "}
                      <span className="text-textLightColor text-[8px] ls:text-[10px]  ml-1 not-italic font-AeonikProRegular">
                        (не обезательно)
                      </span>
                    </span>

                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <input
                        type="text"
                        value={"13 %"}
                        className="inputStyle w-[40px] xs:w-[60px] h-[35px] md:h-[38px] border border-borderColor pl-1 xs:pl-2  rounded-lg  font-AeonikProRegular  outline-none"
                        placeholder=""
                      />
                    </div>
                    <span className=" w-2 h-[1px] border border-borderColor overflow-hidden text-borderColor mx-1">

                    </span>
                    <label className="w-[95px] xs:w-[120px]  flex h-[35px] md:h-[38px] rounded-lg overflow-hidden border border-borderColor flex items-center">
                      <input
                        type="text"
                        value="1 300 000"
                        className="inputStyle w-full   pl-1 xs:pl-2 h-full rounded-lg  font-AeonikProRegular  outline-none"
                      />
                      <span className="text-textLightColor text-[12px] not-italic font-AeonikProRegular pr-1 xs:pr-2">
                        сум
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              {/* For size */}
              <div
                className={`w-full h-fit flex md:flex-row flex-col mt-[15px] md:mt-0  justify-between not-italic cursor-pointer font-AeonikProMedium text-md leading-4 text-center `}
              >
                <div className="w-full md:w-[42%] flex flex-wrap justify-between gap-[15px] ll:gap-6 ">
                  <div className="w-[45%] flex flex-col ">
                    <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                      Размер
                      <span className="ml-[5px] hidden md:flex ">
                        <StarLabel />
                      </span>
                    </p>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <input
                          type="text"
                          className="inputStyle w-[50px] ll:w-[60px] ll:w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3 flex items-center justify-center rounded-lg   font-AeonikProRegular outline-none"
                          placeholder="Мин"
                          value={"18"}
                        />
                      </div>
                      <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>

                      <div className="flex flex-col">
                        <input
                          type="text"
                          className="inputStyle w-[50px] ll:w-[60px] ll:w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3 flex items-center justify-center rounded-lg  font-AeonikProRegular outline-none"
                          placeholder="Макс"
                          value={"19"}

                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[45%] flex flex-col ">
                    <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                      Размер Груди
                      <span className="ml-[5px] hidden md:flex">
                        <StarLabel />
                      </span>
                    </p>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <input
                          type="text"
                          className="inputStyle w-[50px] ll:w-[60px] ll:w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3 rounded-lg   font-AeonikProRegular  outline-none"
                          placeholder="Мин"
                          value="11"
                        />
                      </div>
                      <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>

                      <div className="flex flex-col">
                        <input
                          type="text"
                          className="inputStyle w-[50px] ll:w-[60px] ll:w-[60px]  text-center h-[35px] md:h-[38px] border border-borderColor px-3 rounded-lg  font-AeonikProRegular  outline-none"
                          placeholder="Макс"
                          value="11"

                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[45%] flex flex-col ">
                    <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                      Размер Талии
                      <span className="ml-[5px] hidden md:flex">
                        <StarLabel />
                      </span>
                    </p>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <input
                          type="text"
                          className="inputStyle w-[50px] ll:w-[60px] ll:w-[60px] h-[35px] md:h-[38px] text-center border border-borderColor px-3 rounded-lg   font-AeonikProRegular  outline-none"
                          placeholder="Мин"
                          value={"5"}
                        />
                      </div>
                      <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>

                      <div className="flex flex-col">
                        <input
                          type="text"
                          className="inputStyle w-[50px] ll:w-[60px] ll:w-[60px] h-[35px] md:h-[38px] text-center border border-borderColor px-3 rounded-lg  font-AeonikProRegular  outline-none"
                          placeholder="Макс" value={"9"}

                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-[45%] flex flex-col ">
                    <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                      Размер Бедер
                    </p>
                    <div className="flex items-center">
                      <div className="flex flex-col">
                        <input
                          type="text"
                          className="inputStyle w-[50px] ll:w-[60px] h-[35px] md:h-[38px] text-center border border-borderColor px-3 rounded-lg   font-AeonikProRegular  outline-none"
                          placeholder="Мин" value={"7"}

                        />
                      </div>
                      <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>

                      <div className="flex flex-col">
                        <input
                          type="text"
                          className="inputStyle w-[50px] ll:w-[60px] h-[35px] md:h-[38px] text-center border border-borderColor px-3 rounded-lg  font-AeonikProRegular  outline-none"
                          placeholder="Макс" value={"8"}

                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-[55%] flex flex-col gap-y-[10px]  md:mt-0 mt-[15px] ">
                  <div className="w-full">
                    <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                      Буквенный Размер
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </p>
                    <div className="w-full flex">
                      <div className="w-[222px] h-[50px]  grid grid-cols-4 gap-2 ">
                        {sizeList.sizeList1.map((data) => {
                          return (
                            <div
                              key={data?.id}
                              className="flex "
                            >
                              {
                                data?.action &&
                                <label
                                  htmlFor="m_outwear"
                                  className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    id="m_outwear"
                                    name="size_Outwear"
                                    value="M"
                                    className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                  />
                                  <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] xs:text-[13px] not-italic font-AeonikProMedium">
                                    {data?.name}
                                  </span>
                                </label>
                              }
                            </div>
                          );
                        })}
                      </div>
                      <div className="w-[222px] h-[50px]  grid grid-cols-4 gap-2 items-end">
                        {decraseList && sizeList.sizeList2.map((data) => {
                          return (
                            <div
                              key={data?.id}
                              className="flex "
                            >
                              {
                                data?.action &&
                                <label
                                  htmlFor="m_outwear"
                                  className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                >
                                  <input
                                    type="checkbox"
                                    id="m_outwear"
                                    name="size_Outwear"
                                    value="M"
                                    className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                  />
                                  <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] xs:text-[13px] not-italic font-AeonikProMedium">
                                    {data?.name}
                                  </span>
                                </label>
                              }
                            </div>
                          );
                        })}

                        <button
                          type="button"
                          onClick={() => {
                            setDecraseList(!decraseList)
                          }}
                          className="text-textBlueColor select-none text-[10px] ls:text-[12px] ll:text-xs not-italic font-AeonikProMedium cursor-pointer"
                        >
                          {decraseList ? "Меньше" : "Больше"}
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* device */}
                  <div className="w-full hidden md:flex flex-col ">
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
                          className="inputStyle flex items-center justify-center w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3  rounded-lg  font-AeonikProRegular  outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  {/* Mobile */}
                  <div className="flex items-center justify-between md:hidden mt-1">
                    <div className="w-fit flex flex-col ">
                      <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                        Возраст{" "}
                      </p>
                      <div className="flex flex-col items-center">
                        <input
                          type="text"
                          value={1}
                          className="inputStyle flex items-center justify-center w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3 rounded-lg font-AeonikProRegular  outline-none"
                        />
                      </div>
                    </div>
                    <div className="  flex md:hidden justify-center flex-col gap-x-[10px] text-base not-italic font-AeonikProMedium">
                      <p className="flex text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                        Цвет:{" "}
                      </p>
                      {colorGroup.map((data) => {
                        return (
                          <div className="flex items-center">
                            {data?.action && (
                              <button
                                className={`rounded-[15px]  text-white px-[15px]  whitespace-nowrap flex items-center justify-center text-[14px] ll:text-md  not-italic font-AeonikProRegular bg-${data?.colors}`}
                              >{data?.colorName}</button>
                            )}

                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-center md:hidden  ">
                    <div className="flex items-center justify-center">
                      <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                        Количество{" "}
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center w-full justify-between">
                      <button className="w-[90px] ll:w-[120px] h-[35px] md:h-[38px] bg-lightBgColor border border-borderColor rounded-lg flex items-center justify-center text-black text-2xl active:scale-95  active:opacity-70 not-italic font-AeonikProMedium">-</button>
                      <button className="w-[40px] ll:w-[60px] h-[35px] md:h-[38px] border border-borderColor rounded-lg flex items-center justify-center text-black text-base not-italic font-AeonikProMedium">2</button>
                      <button className="w-[90px] ll:w-[120px] h-[35px] md:h-[38px]  bg-lightBgColor border border-borderColor rounded-lg flex items-center justify-center text-black text-2xl  not-italic font-AeonikProMedium">+</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* For Price Desktop*/}
              <div className="w-full hidden md:flex gap-x-5   mt-[15px]">
                <div className="w-fit flex flex-col ">
                  <p className="flex text-mobileTextColor text-base not-italic font-AeonikProMedium mb-[10px]">
                    Возраст{" "}
                  </p>
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      value={1}
                      className="inputStyle flex items-center justify-center w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3  rounded-lg  font-AeonikProRegular  outline-none"
                    />
                  </div>
                </div>

                <div className="w-fit hidden md:flex  flex-col ">
                  <p className="flex text-mobileTextColor text-base not-italic font-AeonikProMedium mb-[10px]">
                    Цена{" "}
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </p>
                  <label className="w-[210] rounded-lg overflow-hidden flex h-[35px] md:h-[38px] border border-borderColor flex items-center">
                    <input
                      type="text"
                      placeholder="Цена"
                      className="inputStyle flex items-center justify-center w-full   px-3 h-full  font-AeonikProRegular outline-none"
                    />
                    <span className="text-gray-600 text-base not-italic font-AeonikProRegular pr-3">
                      сум
                    </span>
                  </label>
                </div>
                <div className="w-fit hidden md:flex flex-col ">
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
                        type="text"
                        value={"13 %"}
                        className="inputStyle flex items-center justify-center w-[60px] px-3 rounded-lg  h-[35px] md:h-[38px] border border-borderColor rounded-lg font-AeonikProRegular  outline-none"
                        placeholder=""
                      />
                    </div>
                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]">

                    </span>
                    <label className="w-[210]  rounded-lg overflow-hidden flex h-[35px] md:h-[38px] border border-borderColor flex items-center">
                      <input
                        type="text"
                        value="1 300 000"
                        className="inputStyle flex items-center w-full   px-3 h-full rounded-lg font-AeonikProRegular  outline-none"
                      />
                      <span className="text-gray-600 text-base not-italic font-AeonikProRegular pr-3">
                        сум
                      </span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-between   mt-5">
                {" "}
                <div className=" flex items-center gap-x-[10px] text-base not-italic font-AeonikProMedium">
                  <span className="text-gray-800 text-base not-italic font-AeonikProRegular">Цвет:</span>
                  {colorGroup.map((data) => {
                    return (
                      <>
                        {data?.action && (
                          <button
                            className={`h-[22px] rounded-[15px] text-white px-3  flex items-center justify-center text-md not-italic font-AeonikProRegular bg-${data?.colors}`}
                          >{data?.colorName}</button>
                        )}

                      </>
                    );
                  })}
                </div>
                <button className="text-blue-600 text-base not-italic font-AeonikProMedium">
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Cards */}
        <div className="w-full flex items-center gap-x-[6px]  border-t md:border-0 pt-4 md:pt-0 mt-5 md:mt-0 border-borderColor">
          <div className="w-fit md:flex hidden items-center justify-center">
            <button className="w-[22px] h-[22px] border border-borderColor rounded-lg">
            </button>{" "}
          </div>
          <div className="w-full md:border border-borderColor  rounded-lg md:p-3 pb-4">
            {/* For Price Mobile*/}
            <div className="w-full flex  md:hidden gap-x-1 ls:gap-x-[10px]   ">

              <div className="w-fit flex flex-col ">
                <p className="flex items-center text-[12px] ll:text-[14px]  text-mobileTextColor mb-2 ll:mb-[10px]  font-AeonikProRegular">
                  Цена{" "}
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </p>
                <label className="w-[95px] xs:w-[120px]  flex h-[35px] md:h-[38px] border border-borderColor rounded-lg overflow-hidden flex items-center">
                  <input
                    type="text"
                    placeholder="Цена"
                    value={"1300000"}
                    className="inputStyle flex items-center w-full   pl-1 xs:pl-2 h-full rounded-lg  font-AeonikProRegular  outline-none"
                  />
                  <span className="text-textLightColor text-[12px] not-italic font-AeonikProRegular pr-1 xs:pr-2">
                    сум
                  </span>
                </label>
              </div>
              <div className="w-fit flex flex-col ">
                <div className="flex items-center text-base text-mobileTextColor mb-2">
                  <span className="flex  text-[12px] ll:text-[14px]  text-mobileTextColor   font-AeonikProRegular">
                    Скидка{" "}
                    <span className="text-textLightColor text-[8px] ls:text-[10px]  ml-1 not-italic font-AeonikProRegular">
                      (не обезательно)
                    </span>
                  </span>

                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <input
                      type="text"
                      value={"13 %"}
                      className="inputStyle flex items-center  w-[40px] xs:w-[60px] h-[35px] md:h-[38px] border border-borderColor pl-1 xs:pl-2  rounded-lg font-AeonikProRegular  outline-none"
                      placeholder=""
                    />
                  </div>
                  <span className=" w-2 h-[1px] border border-borderColor overflow-hidden text-borderColor mx-1">

                  </span>
                  <label className="w-[95px] xs:w-[120px]  flex h-[35px] md:h-[38px] rounded-lg overflow-hidden border border-borderColor flex items-center">
                    <input
                      type="text"
                      value="1 300 000"
                      className="inputStyle flex items-center justify-center w-full   pl-1 xs:pl-2 h-full rounded-lg font-AeonikProRegular  outline-none"
                    />
                    <span className="text-textLightColor text-[12px] not-italic font-AeonikProRegular pr-1 xs:pr-2">
                      сум
                    </span>
                  </label>
                </div>
              </div>
            </div>
            {/* For size */}
            <div
              className={`w-full h-fit flex md:flex-row flex-col mt-[15px] md:mt-0  justify-between not-italic cursor-pointer font-AeonikProMedium text-md leading-4 text-center `}
            >
              <div className="w-full md:w-[42%] flex flex-wrap justify-between gap-[15px] ll:gap-6 ">

                <div className="w-[45%] flex flex-col ">
                  <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                    Размер
                    <span className="ml-[5px] hidden md:flex ">
                      <StarLabel />
                    </span>
                  </p>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <input
                        type="text"
                        className="inputStyle flex items-center justify-center w-[50px] ll:w-[60px] ll:w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3  rounded-lg  font-AeonikProRegular  outline-none"
                        placeholder="Мин"
                        value={"18"}
                      />
                    </div>
                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]">

                    </span>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        className="inputStyle flex items-center justify-center w-[50px] ll:w-[60px] ll:w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3  rounded-lg font-AeonikProRegular  outline-none"
                        placeholder="Макс"
                        value={"19"}

                      />
                    </div>
                  </div>
                </div>
                <div className="w-[45%] flex flex-col ">
                  <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                    Размер Груди
                    <span className="ml-[5px] hidden md:flex">
                      <StarLabel />
                    </span>
                  </p>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <input
                        type="text"
                        className="inputStyle flex items-center justify-center w-[50px] ll:w-[60px] ll:w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3  rounded-lg  font-AeonikProRegular  outline-none"
                        placeholder="Мин"
                        value="11"
                      />
                    </div>
                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]">

                    </span>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        className="inputStyle flex items-center justify-center w-[50px] ll:w-[60px] ll:w-[60px]  text-center h-[35px] md:h-[38px] border border-borderColor px-3  rounded-lg font-AeonikProRegular  outline-none"
                        placeholder="Макс"
                        value="11"

                      />
                    </div>
                  </div>
                </div>
                <div className="w-[45%] flex flex-col ">
                  <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                    Размер Талии
                    <span className="ml-[5px] hidden md:flex">
                      <StarLabel />
                    </span>
                  </p>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <input
                        type="text"
                        className="inputStyle flex items-center justify-center w-[50px] ll:w-[60px] ll:w-[60px] h-[35px] md:h-[38px] text-center border border-borderColor px-3 rounded-lg  font-AeonikProRegular  outline-none"
                        placeholder="Мин"
                        value={"5"}
                      />
                    </div>
                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]">

                    </span>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        className="inputStyle flex items-center justify-center w-[50px] ll:w-[60px] ll:w-[60px] h-[35px] md:h-[38px] text-center border border-borderColor px-3 rounded-lg font-AeonikProRegular  outline-none"
                        placeholder="Макс" value={"9"}

                      />
                    </div>
                  </div>
                </div>
                <div className="w-[45%] flex flex-col ">
                  <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                    Размер Бедер
                  </p>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <input
                        type="text"
                        className=" inputStyle flex items-center justify-center w-[50px] ll:w-[60px] h-[35px] md:h-[38px] text-center border border-borderColor px-3 rounded-lg   font-AeonikProRegular  outline-none"
                        placeholder="Мин" value={"7"}

                      />
                    </div>
                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        className=" inputStyle flex items-center justify-center w-[50px] ll:w-[60px] h-[35px] md:h-[38px] text-center border border-borderColor px-3 rounded-lg  font-AeonikProRegular  outline-none"
                        placeholder="Макс" value={"8"}

                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[55%] flex flex-col gap-y-[10px]  md:mt-0 mt-[15px] ">
                <div className="w-full">
                  <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                    Буквенный Размер
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </p>
                  <div className="w-full flex  ">
                    <div className="w-[222px] h-[50px]  grid grid-cols-4 gap-2 ">
                      {sizeList.sizeList1.map((data) => {
                        return (
                          <div
                            key={data?.id}
                            className="flex "
                          >
                            {
                              data?.action &&
                              <label
                                htmlFor="m_outwear"
                                className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  id="m_outwear"
                                  name="size_Outwear"
                                  value="M"
                                  className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                />
                                <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] xs:text-[13px] not-italic font-AeonikProMedium">
                                  {data?.name}
                                </span>
                              </label>
                            }
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-[222px] h-[50px]  grid grid-cols-4 gap-2 items-end">
                      {decraseList2 && sizeList.sizeList2.map((data) => {
                        return (
                          <div
                            key={data?.id}
                            className="flex "
                          >
                            {
                              data?.action &&
                              <label
                                htmlFor="m_outwear"
                                className="flex w-[40px] ll:w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  id="m_outwear"
                                  name="size_Outwear"
                                  value="M"
                                  className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                />
                                <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] xs:text-[13px] not-italic font-AeonikProMedium">
                                  {data?.name}
                                </span>
                              </label>
                            }
                          </div>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() => {
                          setDecraseList2(!decraseList2)
                        }}
                        className="text-textBlueColor select-none text-[10px] ls:text-[12px] ll:text-xs not-italic font-AeonikProMedium cursor-pointer"
                      >
                        {decraseList2 ? "Меньше" : "Больше"}
                      </button>
                    </div>
                  </div>
                </div>
                {/* device */}
                <div className="w-full hidden md:flex flex-col ">
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
                        className="inputStyle flex items-center w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3  rounded-lg font-AeonikProRegular  outline-none"
                      />
                    </div>
                  </div>
                </div>
                {/* Mobile */}
                <div className="flex items-center justify-between md:hidden mt-1">
                  <div className="w-fit flex flex-col ">
                    <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                      Возраст{" "}
                    </p>
                    <div className="flex flex-col items-center">
                      <input
                        type="text"
                        value={1}
                        className="inputStyle flex items-center justify-center w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3  rounded-lg font-AeonikProRegular  outline-none"
                      />
                    </div>
                  </div>
                  <div className="  flex md:hidden justify-center flex-col gap-x-[10px] text-base not-italic font-AeonikProMedium">
                    <p className="flex text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                      Цвет:{" "}
                    </p>
                    {colorGroup.map((data) => {
                      return (
                        <div className="flex items-center">
                          {data?.action && (
                            <button
                              className={`rounded-[15px]  text-white px-[15px]  whitespace-nowrap flex items-center justify-center text-[14px] ll:text-md  not-italic font-AeonikProRegular bg-${data?.colors}`}
                            >{data?.colorName}</button>
                          )}

                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="w-full flex flex-col items-center md:hidden  ">
                  <div className="flex items-center justify-center">
                    <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                      Количество{" "}
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center w-full justify-between">
                    <button className="w-[90px] ll:w-[120px] h-[35px] md:h-[38px] bg-lightBgColor border border-borderColor rounded-lg flex items-center justify-center text-black text-2xl active:scale-95  active:opacity-70 not-italic font-AeonikProMedium">-</button>
                    <button className="w-[40px] ll:w-[60px] h-[35px] md:h-[38px] border border-borderColor rounded-lg flex items-center justify-center text-black text-base not-italic font-AeonikProMedium">2</button>
                    <button className="w-[90px] ll:w-[120px] h-[35px] md:h-[38px]  bg-lightBgColor border border-borderColor rounded-lg flex items-center justify-center text-black text-2xl  not-italic font-AeonikProMedium">+</button>
                  </div>
                </div>
              </div>
            </div>
            {/* For Price Desktop*/}
            <div className="w-full hidden md:flex gap-x-5   mt-[15px]">
              <div className="w-fit flex flex-col ">
                <p className="flex text-mobileTextColor text-base not-italic font-AeonikProMedium mb-[10px]">
                  Возраст{" "}
                </p>
                <div className="flex flex-col items-center">
                  <input
                    type="text"
                    value={1}
                    className="inputStyle flex items-center justify-center w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3 rounded-lg   font-AeonikProRegular  outline-none"
                  />
                </div>
              </div>

              <div className="w-fit hidden md:flex  flex-col ">
                <p className="flex text-mobileTextColor text-base not-italic font-AeonikProMedium mb-[10px]">
                  Цена{" "}
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </p>
                <label className="w-[210]  flex h-[35px] md:h-[38px] border border-borderColor flex items-center">
                  <input
                    type="text"
                    placeholder="Цена"
                    className=" inputStyle flex items-center  w-full   px-3 h-full rounded-lg  font-AeonikProRegular  outline-none"
                  />
                  <span className="text-gray-600 text-base not-italic font-AeonikProRegular pr-3">
                    сум
                  </span>
                </label>
              </div>
              <div className="w-fit hidden md:flex flex-col ">
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
                      type="text"
                      value={"13 %"}
                      className="inputStyle flex items-center justify-center w-[60px] px-3  h-[35px] md:h-[38px] border border-borderColor px-3  rounded-lg  font-AeonikProRegular  outline-none"
                      placeholder=""
                    />
                  </div>
                  <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]">

                  </span>
                  <label className="w-[210]  flex h-[35px] md:h-[38px] border border-borderColor flex items-center">
                    <input
                      type="text"
                      value="1 300 000"
                      className="inputStyle flex items-center  w-full px-3 h-full rounded-lg  font-AeonikProRegular  outline-none"
                    />
                    <span className="text-gray-600 text-base not-italic font-AeonikProRegular pr-3">
                      сум
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-between   mt-5">
              {" "}
              <div className=" flex items-center gap-x-[10px] text-base not-italic font-AeonikProMedium">
                <span className="text-gray-800 text-base not-italic font-AeonikProRegular">Цвет:</span>
                {colorGroup.map((data) => {
                  return (
                    <>
                      {data?.action && (
                        <button
                          className={`h-[22px] rounded-[15px] text-white px-3  flex items-center justify-center text-md not-italic font-AeonikProRegular bg-${data?.colors}`}
                        >{data?.colorName}</button>
                      )}

                    </>
                  );
                })}
              </div>
              <button className="text-blue-600 text-base not-italic font-AeonikProMedium">
                Сохранить
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
export default React.memo(AllSizeModalEdit);

