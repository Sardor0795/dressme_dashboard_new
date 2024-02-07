import React, { useState } from "react";
import AllSizeModalEdit from "./AllSizeModalEdit/AllSizeModalEdit";
import { CheckIconsCircle, CloseAnswer, StarLabel } from "../../../../../../assets/icons";

const CategoriesMobileDropUp = ({ onClick1, onClick2, colorGroup, modalOpenColor }) => {
  // console.log(onClick1, "onClick1");
  // console.log(onClick2, "onClick2");
  // console.log(modalOpenColor, "modalOpenColor");

  const AddSizeWear = () => {
    const [decraseList, setDecraseList] = useState(false);

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
    })
    // input
    return (
      <div className=" h-fit overflow-auto flex flex-col pt-4 gap-y-2 AllSizeModalScroll ">
        <div className="w-full flex items-center gap-x-[6px] px-2  border-borderColor">
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
                <label htmlFor="price" className="w-[95px] xs:w-[120px]  flex h-[35px] md:h-[38px] border border-borderColor rounded-lg overflow-hidden flex items-center">
                  <input
                    type="text"
                    name="price"
                    placeholder="Цена"
                    value={"1300000"}
                    className="inputStyle w-full   pl-1 xs:pl-2 h-full rounded-lg font-AeonikProRegular  outline-none"
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
                      name="price"
                      value={"13 %"}
                      className="inputStyle w-[40px] xs:w-[60px] h-[35px] md:h-[38px] border border-borderColor pl-1 xs:pl-2  rounded-lg  font-AeonikProRegular  outline-none"
                      placeholder=""
                    />
                  </div>
                  <span className=" w-2 h-[1px] border border-borderColor overflow-hidden text-borderColor mx-1">

                  </span>
                  <label htmlFor="price1" className="w-[95px] xs:w-[120px]  flex h-[35px] md:h-[38px] rounded-lg overflow-hidden border border-borderColor flex items-center">
                    <input
                      type="text"
                      value="1 300 000"
                      name="price1"
                      className="inputStyle w-full   pl-1 xs:pl-2 h-full rounded-lg font-AeonikProRegular  outline-none"
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
              <div className="w-full md:w-1/2 flex flex-wrap justify-between gap-[15px] ll:gap-6 ">
                <div className="w-[45%] flex flex-col ">
                  <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                    Обхват Талии
                    <span className="ml-[5px] hidden md:flex">
                      <StarLabel />
                    </span>
                  </p>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="price"
                        className="inputStyle w-[50px] ll:w-[60px] ll:w-[60px] h-[35px] md:h-[38px]  text-center border border-borderColor px-3  rounded-lg   font-AeonikProRegular  outline-none"
                        placeholder="Мин"
                        value={"5"}
                      />
                    </div>
                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="price"
                        className="inputStyle w-[50px] ll:w-[60px] ll:w-[60px] h-[35px] md:h-[38px] text-center border border-borderColor px-3  rounded-lg  font-AeonikProRegular  outline-none"
                        placeholder="Макс" value={"9"}

                      />
                    </div>
                  </div>
                </div>
                <div className="w-[45%] flex flex-col ">
                  <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                    Размер
                    <span className="ml-[5px] hidden md:flex ">
                      <StarLabel />
                    </span>
                  </p>
                  <div className="flex items-center ">
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="price"
                        className="inputStyle w-[50px] ll:w-[60px] ll:w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3  rounded-lg   font-AeonikProRegular  outline-none"
                        placeholder="Мин"
                        value={"18"}
                      />
                    </div>
                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="price"
                        className="inputStyle w-[50px] ll:w-[60px] ll:w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3  rounded-lg  font-AeonikProRegular  outline-none"
                        placeholder="Макс"
                        value={"19"}

                      />
                    </div>
                  </div>
                </div>
                <div className="w-[45%] flex flex-col ">
                  <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                    Обхват Груди
                    <span className="ml-[5px] hidden md:flex">
                      <StarLabel />
                    </span>
                  </p>
                  <div className="flex items-center ">
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="price"
                        className="inputStyle w-[50px] ll:w-[60px] ll:w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3  rounded-lg   font-AeonikProRegular  outline-none"
                        placeholder="Мин"
                        value="11"
                      />
                    </div>
                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="price"
                        className="inputStyle w-[50px] ll:w-[60px] ll:w-[60px]  text-center h-[35px] md:h-[38px] border border-borderColor px-3  rounded-lg  font-AeonikProRegular  outline-none"
                        placeholder="Макс"
                        value="11"

                      />
                    </div>
                  </div>
                </div>

                <div className="w-[45%] flex flex-col ">
                  <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                    Обхват Бедер
                  </p>
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="price"
                        className="inputStyle w-[50px] ll:w-[60px] h-[35px] md:h-[38px] text-center border border-borderColor px-3  rounded-lg   font-AeonikProRegular  outline-none"
                        placeholder="Мин" value={"7"}

                      />
                    </div>
                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        name="price"
                        className="inputStyle w-[50px] ll:w-[60px] h-[35px] md:h-[38px] text-center border border-borderColor px-3  rounded-lg  font-AeonikProRegular  outline-none"
                        placeholder="Макс" value={"8"}

                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-[47%] flex flex-col gap-y-[10px]  md:mt-0 mt-[15px] ">
                <div className="w-full">
                  <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                    Буквенный Размер
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </p>
                  <div className='w-full border border-red-500 '>
                    {/* -----------------Desktop--------------------- */}
                    <div className="w-full hidden md:flex flex-row">
                      <div className="w-fit w-[222px]  h-[50px] grid grid-cols-4 gap-2 ">
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
                                  <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
                                    {data?.name}
                                  </span>
                                </label>
                              }
                            </div>
                          );
                        })}

                      </div>
                      <div className="w-fit w-[222px]  h-[50px] grid grid-cols-4  gap-2 items-end">
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
                                  <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
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
                    {/* -----------------Mobile--------------------- */}
                    <div className="w-full flex md:flex-row flex-col md:hidden">
                      <div className="w-fit md:w-[222px]  md:h-[50px] flex md:block flex-wrap md:grid md:grid-cols-4 gap-1 md:gap-2 ">
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
                                  <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
                                    {data?.name}
                                  </span>
                                </label>
                              }
                            </div>
                          );
                        })}
                        {/* <span className="flex flex-wrap "> */}
                        {decraseList && sizeList.sizeList2.map((data) => {
                          return (
                            <div
                              key={data?.id}
                              className="flex  md:hidden"
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
                                  <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
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
                          className=" md:hidden text-textBlueColor select-none text-[10px] ls:text-[12px] ll:text-md not-italic font-AeonikProMedium cursor-pointer"
                        >
                          {decraseList ? "Меньше" : "Больше"}
                        </button>
                        {/* </span> */}
                      </div>
                      <div className="w-fit md:w-[222px]  h-[50px] hidden md:block flex-wrap  md:grid md:grid-cols-4gap-1 md:gap-2 items-end">
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
                                  <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
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
                        name="price"
                        value={1}
                        className="inputStyle w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3 rounded-lg  font-AeonikProRegular  outline-none"
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
                        name="price"
                        value={1}
                        className="inputStyle w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3  rounded-lg font-AeonikProRegular  outline-none"
                      />
                    </div>
                  </div>
                  <div className="  flex md:hidden justify-center flex-col gap-x-[10px] text-base not-italic font-AeonikProMedium">
                    <p className="flex text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                      Цвет:{" "}
                    </p>
                    {colorGroup?.map((data, index) => {
                      return (
                        <div key={index} className="flex items-center">
                          {data?.action && (
                            <button
                              className={`rounded-[15px] pt-1 text-white px-[15px]  whitespace-nowrap flex items-center justify-center text-[14px] ll:text-md  not-italic font-AeonikProRegular bg-${data?.colors}`}
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
                    name="price"
                    value={1}
                    className="inputStyle w-[60px] text-center h-[35px] md:h-[38px] border border-borderColor px-3 rounded-lg  font-AeonikProRegular  outline-none"
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
                <label htmlFor="price2" className="w-[210]  flex h-[35px] md:h-[38px] border border-borderColor flex items-center">
                  <input
                    type="text"
                    placeholder="Цена"
                    name="price2"
                    className="inputStyle  w-full px-2 md:px-3 h-full rounded-lg font-AeonikProRegular  outline-none"
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
                      type="number"
                      name="price"
                      value={"13 %"}
                      className="inputStyle  w-[60px] px-3  h-[35px] md:h-[38px] border border-borderColor px-3rounded-lg  font-AeonikProRegular  outline-none"
                      placeholder=""
                    />
                  </div>
                  <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                  <label htmlFor="price3" className="w-[210]  flex h-[35px] md:h-[38px] border border-borderColor flex items-center">
                    <input
                      type="number"
                      value="1 300 000"
                      name="price3"
                      className="inputStyle w-full  px-2 md:px-3 h-full rounded-lg font-AeonikProRegular  outline-none"
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
                {colorGroup.map((data, index) => {
                  return (
                    <div key={index} >
                      {data?.action && (
                        <button
                          className={`h-[22px] rounded-[15px] text-white px-3  flex items-center justify-center text-md not-italic font-AeonikProRegular bg-${data?.colors}`}
                        >{data?.colorName}</button>
                      )}

                    </div>
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
    )
  }

  const OuterWear = () => {
    const [outerList, setOuterList] = useState([
      { id: 1, isActive: true, text: "Спортивный" },
      { id: 2, isActive: false, text: "Деловая" },
      { id: 3, isActive: false, text: "Рабочая" },
      { id: 4, isActive: false, text: "Домашняя" },
      { id: 6, isActive: false, text: "Рабочая" },
      { id: 7, isActive: false, text: "Деловая" },
      { id: 8, isActive: false, text: "Спортивный" },
    ])
    const outerIdClicked = (eId) => {
      setOuterList(current => {
        return current.map(items => {
          if (items.id == eId) {
            return { ...items, isActive: !items?.isActive }
          } else {
            return { ...items }
          }
        })
      })
    }
    return (
      <div className="w-full h-fit  flex flex-col px-2">
        {
          outerList.map(items => {
            return (
              <button
                onClick={() => outerIdClicked(items?.id)}
                key={items?.id}
                type="button"
                className="w-full h-[44px] hover:bg-lightBorderColor flex items-center justify-between border-b border-borderColor">
                <p className="text-gray-800 text-base not-italic font-AeonikProRegular">{items?.text}</p>
                <span>
                  {items?.isActive && <CheckIconsCircle />}
                </span>
              </button>
            )
          })
        }
      </div>
    )
  }


  const [alldata, setAllData] = useState([
    { id: 1, action: false, BtnText: "Верхняя одежда", values: <OuterWear /> },
    { id: 2, action: true, BtnText: "Все размеры", values: <AllSizeModalEdit /> },
    { id: 3, action: false, BtnText: "Добавить размер", values: <AddSizeWear /> },

  ])
  const activeBtn = (eId) => {
    setAllData(current => {
      return current.map(items => {
        if (items.id == eId) {
          return { ...items, action: true }
        } else {
          return { ...items, action: false }
        }
      })
    })
  }
  return (
    <div className=" w-[100%] h-[90vh] mx-auto bg-white shadow-navMenuShadov  p-4   overflow-hidden  rounded-t-[12px]">
      {/* <div className="max-w-[440px] w-[100%] h-[90vh] mx-auto bg-white shadow-navMenuShadov  p-4   overflow-hidden  rounded-t-[12px]"> */}
      <section className=" w-full bg-btnBgColor flex items-center  justify-end ">
        <button onClick={onClick1}>
          <CloseAnswer colors={"#000"} />
        </button>
      </section>
      <div className="flex items-center justify-between mt-6 border-b border-borderColor pb-4">
        <div className="flex items-center gap-x-2">
          <span className="w-5 h-5 border border-borderColor rounded-lg"></span>
          <span className="text-gray-900 text-[12px] ls:text-sm not-italic font-AeonikProMedium">Выбрать все</span>
        </div>
        <div className="flex items-center">
          <span className="text-blue-600 text-[12px] ls:text-sm not-italic hover:underline font-AeonikProMedium">Добавить выбранные к цвету</span>    </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        {alldata?.map(data => {
          return (
            <button
              key={data?.BtnText}
              onClick={() => activeBtn(data?.id)}
              className={`h-8 ll:h-[35px] flex items-center justify-center px-1 ll:px-[10px] 
               ${data?.action ? "text-white border border-textBlueColor bg-textBlueColor" : "text-textBlueColor bg-white  border border-textBlueColor"}   rounded-lg text-[10px] ls:text-[12px] ll:text-xs not-italic font-AeonikProMedium`}>
              {data?.BtnText}
            </button>
          )
        })}
      </div>



      {alldata?.map((item, index) => {
        return (
          item?.action &&
          <section key={index} className="w-full h-[65%] overflow-auto AllSizeModalScroll flex flex-col flex-nowrap rounded-lg border border-borderColor mt-6">
            {item?.values}
          </section>

        )
      })}


      <action className="w-full flex items-center justify-between gap-x-3  mt-10 ">
        <button
          // onClick={onClick}
          className="w-[45%] h-[38px] text-base flex items-center font-AeonikProMedium bg-white text-textBlueColor hover:bg-textBlueColor hover:text-white justify-center border border-textBlueColor rounded-md active:scale-95"
        >
          Отмена
        </button>
        <button className="w-[45%] h-[38px] text-base flex items-center font-AeonikProMedium bg-white text-textBlueColor hover:bg-textBlueColor hover:text-white justify-center border border-textBlueColor rounded-md active:scale-95">
          Готово
        </button>
      </action>
    </div>
  );
};

export default React.memo(CategoriesMobileDropUp);
