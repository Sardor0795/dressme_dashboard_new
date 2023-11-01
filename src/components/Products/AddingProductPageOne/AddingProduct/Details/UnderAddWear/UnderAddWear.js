import React from "react";
// import AllSizeListForWear from "../../../../../../hook/AllSizeListForWear/AllSizeListForWear";
import { LineIcon, StarLabel } from "../../../../../../assets/icons";
import { Popover, Select, Switch } from "antd";
import AllSizeListForWear from "../../../../../../hook/AllSizeListForWear/AllSizeListForWear";

function UnderAddWear({ title }) {
    // Shoes
    // Underwear bor Цена
    const contentUnderWear = (
        <div className="w-[840px] h-fit">
            <div
                className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
            >
                <div className="w-full flex gap-x-10 px-3 pt-5">
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Обхват Талии
                            <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="flex items-center">
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-3  rounded-lg   font-AeonikProRegular "
                                    placeholder="Мин"
                                />
                            </div>
                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                                    placeholder="Макс"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Размер
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="flex items-center justify-between gap-x-1">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        className="inputStyle w-[60px] text-center h-[38px] border border-borderColor px-3  rounded-lg   font-AeonikProRegular "
                                        placeholder="Мин"
                                    />
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        className="inputStyle w-[60px] text-center h-[38px] border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                                        placeholder="Макс"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[53%] flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                            Обхват Размер
                        </p>
                        <AllSizeListForWear />
                    </div>
                </div>
                <div className="w-full flex gap-x-10 px-3 pt-5">
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Размер Бедер
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="flex items-center">
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-3  rounded-lg   font-AeonikProRegular "
                                    placeholder="Мин"
                                />
                            </div>
                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                                    placeholder="Макс"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Рост
                        </p>
                        <div className="flex items-center justify-between gap-x-1">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        className="inputStyle w-[60px] text-center h-[38px] border border-borderColor px-3  rounded-lg   font-AeonikProRegular "
                                        placeholder="Мин"
                                    />
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        className="inputStyle w-[60px] text-center h-[38px] border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                                        placeholder="Макс"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col md:ml-[14px]">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Количество
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="flex items-start justify-between ">
                            <input
                                type="text"
                                className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-5  rounded-lg  font-AeonikProRegular "
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-row px-3 pt-5 gap-x-[11px] md:gap-x-[20px] mb-[15px]">
                    <div className="w-fit flex items-center gap-x-[25px]">
                        <div className="w-fit hidden md:flex flex-col items-start">
                            <div className="flex items-center justify-center  mb-2 ll:mb-[10px]">
                                <label
                                    htmlFor=""
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                                    Возраст
                                </label>
                                {/* <span className="ml-[5px]">
                  <StarLabel />
                </span> */}
                            </div>
                            <div className="w-fit flex items-center">
                                <input
                                    type="text"
                                    className=" inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none"
                                    placeholder=""
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-[55%]">
                            <div className="flex items-center  mb-2 ll:mb-[10px]">
                                <label
                                    htmlFor=""
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                                    Цена
                                </label>
                                <span className="ml-[5px]">
                                    <StarLabel />
                                </span>
                            </div>
                            <div className="w-full h-[40px] flex items-center border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                                <input
                                    type="text"
                                    placeholder="0"
                                    className="inputStyle w-[70%] font-AeonikProMedium outline-none"
                                />
                                <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                    сум
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col items-start">
                        <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                            <label
                                htmlFor=""
                                className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">

                                Скидка
                            </label>
                            <span className="font-AeonikProMedium text-[10px] md:text-[13px] text-textLightColor ml-[5px]">
                                (необязательно)
                            </span>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <div className="w-full flex items-center gap-x-1">
                                <div className="w-[40%] md:w-[72px] flex items-start">
                                    <div className="w-full h-10 flex items-center justify-center border border-borderColor rounded-lg px-[10px] md:px-3 py-[8px]">
                                        <input
                                            type="text"
                                            placeholder="0"
                                            className="inputStyle w-[70%] font-AeonikProMedium text-start outline-none "
                                        />
                                        <span className="text-textLightColor ml-2">%</span>
                                    </div>
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="w-[60%] md:w-[75%] flex items-center">
                                    <div className="w-full h-[40px] flex items-center justify-between border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                                        <input
                                            type="text"
                                            placeholder="0"
                                            className="inputStyle w-[75%] font-AeonikProMedium outline-none "
                                        />
                                        <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                            сум
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="w-full flex items-end justify-end text-lg text-textBlueColor font-AeonikProMedium pr-1">
                    готово
                </button>
            </div>
        </div>
    );
    return (
        <Popover
            // open={state?.openwear}
            // onOpenChange={handleOpenChangeWear}
            className="group px-[15px] h-[38px] border-textBlueColor text-textBlueColor border-[1.5px] font-AeonikProMedium flex items-center justify-center text-sm cursor-pointer active:scale-95  rounded-lg focus:bg-textBlueColor focus:text-white hover:bg-textBlueColor hover:text-white transition duration-300"
            trigger="click"
            options={["Hide"]}
            placement="bottom"
            content={contentUnderWear}
        >
            {
                title?.filter(e => e?.id === 3)?.map(item => {
                    return (
                        <span key={item?.id}>{item?.name_ru}</span>
                    )
                })
            }
        </Popover>
    );
}
export default React.memo(UnderAddWear)