import React, { useContext, useEffect, useState } from "react";
import AllSizeListForWear from "../../../../../../hook/AllSizeListForWear/AllSizeListForWear";
import { LineIcon, StarLabel } from "../../../../../../assets/icons";
import { Popover, Select, Switch } from "antd";
import { dressMainData } from "../../../../../../hook/ContextTeam";

function HeadWearAdd({ title, typeId, handleCallBack }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);

    const [state, setState] = useState({
        minNum: "",
        maxNum: "",
        sizeCheck: false,
        quantityNum: "",
        ageNum: "",
        priceNum: "",
        salePercent: "",
        salePrice: "",
        isCheckValid: false,
        // ------
        onConcel: false,
        // ----
        toggleShow: false,
        isHasTypeId: false

    })
    const SelectedNumber = 1
    useEffect(() => {
        if (typeId == SelectedNumber) {
            setState({ ...state, isHasTypeId: true })
        } else {
            setState({ ...state, isHasTypeId: false })
        }
    }, [typeId])
    const onChangeSwitch = (checked) => {
        setState({ ...state, sizeCheck: checked })
    };
    // Hats

    const handleOpenPopver = (newOpen) => {
        setState({ ...state, toggleShow: newOpen })

    }
    const handleSendDetail = (e) => {
        setState({ ...state, isCheckValid: true })
        if (state?.quantityNum && state?.priceNum) {
            handleCallBack({
                minNum: state?.minNum,
                maxNum: state?.maxNum,
                sizeCheck: state?.sizeCheck,
                quantityNum: state?.quantityNum,
                ageNum: state?.ageNum,
                priceNum: state?.priceNum,
                salePercent: state?.salePercent,
                salePrice: state?.salePrice,
            })
            setDressInfo({ ...dressInfo, ProductFilterType: SelectedNumber })
            setState({ ...state, isCheckValid: false, onConcel: true, toggleShow: false })
        }

    }
    const cancelSendDetail = (e) => {
        setDressInfo({ ...dressInfo, ProductFilterType: null })
        setState({
            ...state,
            minNum: "",
            maxNum: "",
            sizeCheck: false,
            quantityNum: "",
            ageNum: "",
            priceNum: "",
            salePercent: "",
            salePrice: "",
            onConcel: false,
            toggleShow: false
        })
    }
    const contentHat = (
        <div className="w-[520px] h-fit">
            <div
                className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
            >
                <div className="w-full flex justify-center  gap-x-10 px-3 pt-5">
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">

                            Обхват головы
                            <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                            {/* <span className="ml-[5px]">
                                <StarLabel />
                            </span> */}
                        </p>
                        <div className="w-full flex items-center mt-[10px]">
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className={`inputStyle w-[55px] h-[38px] text-center border border-borderColor bg-white  px-2 rounded-lg   outline-none font-AeonikProRegular `}
                                    placeholder="Мин"
                                    value={state?.minNum}
                                    onChange={(e) => setState({ ...state, minNum: e.target.value })}
                                    required
                                />
                            </div>
                            <span className="mx-[5px]"><LineIcon /></span>
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className={`inputStyle w-[55px] h-[38px] text-center  border border-borderColor bg-white px-2 rounded-lg  font-AeonikProRegular  outline-none`}
                                    placeholder="Макс"
                                    value={state?.maxNum}
                                    onChange={(e) => setState({ ...state, maxNum: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center justify-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                            One Size
                            <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                            {/* <span className="ml-[5px]">
                                <StarLabel />
                            </span> */}
                        </p>
                        <div className="flex items-center justify-center mt-[10px]">
                            <Switch
                                className={`border border-borderColor bg-[#8B8B8B] `}
                                onChange={onChangeSwitch}
                                defaultChecked={state?.sizeCheck}
                            />
                        </div>
                    </div>
                    <div className="w-fit flex flex-col items-center">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                            Количество
                            <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="flex items-start justify-between mt-[10px]">
                            <input
                                type="text"
                                className={`inputStyle w-[60px] h-[38px] text-center  flex items-center justify-center outline-none px-1 ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   rounded-lg  font-AeonikProRegular `}
                                value={state?.quantityNum}
                                onChange={(e) => setState({ ...state, quantityNum: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-row px-3 gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mt-[15px]">
                    <div className="w-1/2 flex items-center gap-x-[25px]">
                        <div className="w-fit hidden md:flex flex-col items-start">
                            <div className="flex items-center justify-center  mb-2 ll:mb-[10px]">
                                <label
                                    htmlFor=""
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                    Возраст
                                </label>
                            </div>
                            <div className="w-full flex items-center">
                                <input
                                    type="text"
                                    className="inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none "
                                    placeholder="age"
                                    value={state?.ageNum}
                                    onChange={(e) => setState({ ...state, ageNum: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-[90%]">
                            <div className="flex items-center mb-2 ll:mb-[10px] ">
                                <label
                                    htmlFor=""
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                                    Цена
                                </label>
                                <span className="ml-[5px]">
                                    <StarLabel />
                                </span>
                            </div>
                            <label htmlFor="enterPrice" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.priceNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3 py-[6px] rounded-lg text-xs`}>
                                <input
                                    type="text"
                                    placeholder="0"
                                    id="enterPrice"
                                    className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                    value={state?.priceNum}
                                    onChange={(e) => setState({ ...state, priceNum: e.target.value })}
                                    required
                                />
                                <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                    сум
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col items-start">
                        <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                            <label
                                htmlFor=""
                                className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                                Скидка
                            </label>
                            <span className="font-AeonikProMedium text-[10px] md:text-[13px] text-textLightColor ml-[5px]">
                                (необязательно)
                            </span>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <div className="w-full flex items-center gap-x-1">
                                <div className="w-[40%] md:w-[72px] flex items-start">
                                    <div className="w-full h-10 flex items-center justify-center border border-borderColor rounded-lg px-[4px] md:px-1 py-[8px]">
                                        <input
                                            type="text"
                                            placeholder="0"
                                            className="inputStyle w-[70%] font-AeonikProMedium text-start outline-none flex items-center justify-center mx-auto"
                                            value={state?.salePercent}
                                            onChange={(e) => setState({ ...state, salePercent: e.target.value })}
                                        />
                                        <span className="text-textLightColor ml-1">%</span>
                                    </div>
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="w-[60%] md:w-[75%] flex items-center">
                                    <label htmlFor="salePrice" className="w-full h-[40px] flex items-center justify-between border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                                        <input
                                            type="text"
                                            placeholder="0"
                                            id="salePrice"
                                            className="inputStyle w-[75%] font-AeonikProMedium outline-none bg-transparent"
                                            value={state?.salePrice}
                                            onChange={(e) => setState({ ...state, salePrice: e.target.value })}
                                        />
                                        <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                            сум
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-fit  flex items-center justify-end gap-x-5">
                    {state?.onConcel && <button onClick={cancelSendDetail} className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1">
                        Отменить
                    </button>}
                    <button onClick={handleSendDetail} className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                        Готово
                    </button>
                </div>
            </div>
        </div >
    );
    return (
        <Popover
            open={state?.toggleShow}
            onOpenChange={handleOpenPopver}
            // className={`
            // ${dressInfo?.ProductFilterType ?
            //         dressInfo?.ProductFilterType == SelectedNumber ? "!bg-textBlueColor text-white" : "text-[#bababa]  border-[#bababa]"
            //         :
            //         toggle ? " !bg-textBlueColor text-white" : "text-textBlueColor focus:bg-textBlueColor focus:text-white hover:bg-textBlueColor hover:text-white border-textBlueColor"}
            //         group px-[15px] h-[38px]  border-[1.5px] select-none font-AeonikProMedium flex items-center justify-center text-sm cursor-pointer  rounded-lg transition duration-300
            // `}
            className={`
            ${dressInfo?.ProductFilterType || typeId ?
                    dressInfo?.ProductFilterType == SelectedNumber || state?.isHasTypeId && typeId ?
                        "!bg-textBlueColor text-white" :
                        "text-[#bababa]  border-[#bababa]" :
                    "text-textBlueColor focus:bg-textBlueColor focus:text-white hover:bg-textBlueColor hover:text-white border-textBlueColor"} 
                    group px-[15px] h-[38px]  border-[1.5px] select-none font-AeonikProMedium flex items-center justify-center text-sm cursor-pointer rounded-lg transition duration-300
                    `}
            trigger="click"
            options={["Hide"]}
            placement="bottom"
            content={dressInfo?.ProductFilterType || typeId ? dressInfo?.ProductFilterType == SelectedNumber || state?.isHasTypeId && typeId ? contentHat : null : contentHat}
        >
            {
                title?.filter(e => e?.id === SelectedNumber)?.map(item => {
                    return (
                        <span key={item?.id}>{item?.name_ru}</span>
                    )
                })
            }

        </Popover>
    );
}
export default React.memo(HeadWearAdd)
