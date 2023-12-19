import React, { useContext, useEffect, useState } from "react";
import AllSizeListForWear from "../../../../../../hook/AllSizeListForWear/AllSizeListForWear";
import { DeleteIcon, LineIcon, MenuCloseIcons, StarLabel } from "../../../../../../assets/icons";
import { Checkbox, Popover, Select, Switch } from "antd";
import { dressMainData } from "../../../../../../hook/ContextTeam";

function HeadWearAdd({ stateList, colorsList }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);

    const [state, setState] = useState({
        minHeadGirth: null,
        maxHeadGirth: null,
        sizeCheck: false,
        amount: null,
        age: null,
        price: null,
        discountPercent: null,
        discountPrice: null,
        isCheckValid: false,
        // ------
        onConcel: false,
        // ----
        isHasTypeId: false,
        // ---save
        saveBtnDisable: false,
        // Size Delete Modal
        sizeDeleteModal: false,

    })
    // console.log(stateList, "stateList--Head");
    // console.log(state?.saveBtnDisable, "saveBtnDisable");
    const SelectedNumber = 1
    useEffect(() => {
        if (state?.discountPercent > 0) {
            const sale = state?.price?.split(",")?.join("") * (100 - state?.discountPercent) / 100
            const formattedValue = parseInt(sale).toLocaleString()
            setState({ ...state, discountPrice: formattedValue })
        } else {
            setState({ ...state, discountPrice: '' })
        }
    }, [state?.discountPercent || state?.price])

    // console.log(state?.discountPercent, state?.price, "state?.discountPercent || state?.price");
    useEffect(() => {
        if (stateList?.category_id == SelectedNumber) {
            setState({
                ...state,
                minHeadGirth: stateList?.min_head_girth || null,
                maxHeadGirth: stateList?.max_head_girth || null,
                sizeCheck: stateList?.one_size || null,
                amount: stateList?.amount || null,
                age: stateList?.age || null,
                price: Number(stateList?.price)?.toLocaleString(),
                discountPercent: stateList?.discount_percent || null,
                discountPrice: stateList?.discount_price || null,

            })
        }

    }, [stateList])



    const onChangeSwitch = (checked) => {
        setState({ ...state, sizeCheck: checked, saveBtnDisable: true })
    };



    const handleSendDetail = (e) => {
        setState({ ...state, isCheckValid: true })
        // if (state?.amount && state?.price) {
        //     handleCallBack({
        //         minHeadGirth: state?.minHeadGirth,
        //         maxHeadGirth: state?.maxHeadGirth,
        //         oneSize: state?.sizeCheck,
        //         amount: state?.amount,
        //         age: state?.age,
        //         price: state?.price?.split(",")?.join(""),
        //         discountPercent: state?.discountPercent,
        //         discountPrice: state?.discountPrice?.split(",")?.join(""),
        //         // category_Id: SelectedNumber,

        //     })
        //     setDressInfo({ ...dressInfo, ProductFilterType: SelectedNumber })
        //     setState({ ...state, isCheckValid: false, onConcel: true, })
        // }

    }
    const cancelSendDetail = (e) => {
        setDressInfo({ ...dressInfo, ProductFilterType: null })
        setState({
            ...state,
            minHeadGirth: '',
            maxHeadGirth: '',
            sizeCheck: false,
            amount: '',
            age: '',
            price: '',
            discountPercent: '',
            discountPrice: '',
            onConcel: false,
            toggleShow: false
        })
        // handleCallBack()
    }

    const handleChangePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')
        const sanitizedValue = result.replace(/,/g, '');
        const formattedValue = Number(sanitizedValue).toLocaleString()
        setState({ ...state, price: formattedValue, saveBtnDisable: true });
    };
    const handleChangeSalePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')
        const sanitizedValue = result.replace(/,/g, '');
        const formattedValue = Number(sanitizedValue).toLocaleString()
        setState({ ...state, discountPrice: formattedValue, saveBtnDisable: true });
    };
    const handleChangePercent = (event) => {
        const { value } = event.target
        if (value >= 0 && value < 100) {
            setState({ ...state, discountPercent: value, saveBtnDisable: true });
        }
    };


    return (
        <div className={`w-full ${SelectedNumber == stateList?.category_id ? "flex items-center gap-x-1" : "hidden"}  h-fitoverflow-hidden  my-2`}>
            {/* <section
                onClick={() => { setState({ ...state, sizeDeleteModal: false }) }}
                className={`fixed inset-0 z-[222] duration-200 w-full h-[100vh] bg-black opacity-50 ${state?.sizeDeleteModal ? "" : "hidden"}`}
            ></section>
            <section
                className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[223] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.sizeDeleteModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
                    }`}
            >
                <button
                    onClick={() => setState({ ...state, sizeDeleteModal: false })}
                    type="button"
                    className="absolute  right-3 top-3 w-5 h-5 ">
                    <MenuCloseIcons
                        className="w-full h-full"
                        colors={"#a1a1a1"} />
                </button>
                
                <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
                    <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
                        <span className="cursor-pointer active:translate-y-[2px] text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                            <DeleteIcon width={30} />
                        </span>
                    </span>
                    <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
                        Вы уверены?
                    </span>
                </div>
                <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">

                    <button
                        onClick={() => setState({ ...state, sizeDeleteModal: false })}
                        type="button"
                        className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
                        Oтмена
                    </button>
                    <button
                        onClick={() => setState({ ...state, sizeDeleteModal: false })}
                        type="button"
                        className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
                        Удалить из адреса</button>
                </div>
            </section> */}
            <div className="flex items-center h-full">
                <Checkbox />
            </div>
            <div
                className={`w-full h-fit flex flex-col items-center justify-center border border-borderColor  rounded-lg  not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
            >
                <div className="relative w-full flex justify-start px-3  gap-x-10  pt-5 ">
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
                                    type="number"
                                    className={`inputStyle w-[55px] h-[38px] text-center border border-borderColor bg-white  px-2 rounded-lg   outline-none font-AeonikProRegular `}
                                    placeholder="Мин"
                                    value={state?.minHeadGirth}
                                    onChange={(e) => setState({ ...state, minHeadGirth: e.target.value, saveBtnDisable: true })}
                                    required
                                />
                            </div>
                            <span className="mx-[5px]"><LineIcon /></span>
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    className={`inputStyle w-[55px] h-[38px] text-center  border border-borderColor bg-white px-2 rounded-lg  font-AeonikProRegular  outline-none`}
                                    placeholder="Макс"
                                    value={state?.maxHeadGirth}
                                    onChange={(e) => setState({ ...state, maxHeadGirth: e.target.value, saveBtnDisable: true })}
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
                                checked={state?.sizeCheck == 1 ? true : false}
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
                                type="number"
                                className={`inputStyle w-[60px] h-[38px] text-center  flex items-center justify-center outline-none px-1 ${state?.isCheckValid && !state?.amount ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   rounded-lg  font-AeonikProRegular `}
                                value={state?.amount}
                                onChange={(e) => setState({ ...state, amount: e.target.value, saveBtnDisable: true })}
                                required
                            />
                        </div>
                    </div>
                    <div className="absolute right-2 cursor-pointer active:scale-95	active:opacity-70 text-[#a2a2a2] hover:text-textRedColor transition-colors duration-[0.2s] ease-linear">
                        <DeleteIcon
                            onClick={() => setState({ ...state, sizeDeleteModal: true })}
                            width={30} />
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
                                    type="number"
                                    className="inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none "
                                    placeholder="age"
                                    value={state?.age}
                                    onChange={(e) => setState({ ...state, age: e.target.value, saveBtnDisable: true })}
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
                            <label htmlFor="enterPrice" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.price ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3 py-[6px] rounded-lg text-xs`}>
                                <input
                                    type="text"
                                    placeholder="0"
                                    id="enterPrice"
                                    className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"

                                    value={state?.price}
                                    onChange={handleChangePrice}
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

                        </div>
                        <div className="w-full flex items-center justify-center">
                            <div className="w-full flex items-center gap-x-1">
                                <div className="w-[40%] md:w-[72px] flex items-start">
                                    <div className="w-full h-10 flex items-center justify-center border border-borderColor rounded-lg px-[4px] md:px-1 py-[8px]">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="inputStyle w-[70%] text-center  font-AeonikProMedium  outline-none flex items-center justify-center mx-auto"
                                            value={state?.discountPercent}
                                            onChange={handleChangePercent}
                                        />
                                        <span className="text-textLightColor ml-1">%</span>
                                    </div>
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="w-[60%] md:w-[75%] flex items-center">
                                    <label htmlFor="discountPrice" className="w-full h-[40px] flex items-center justify-between border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                                        <input
                                            type="text"
                                            placeholder="0"
                                            id="discountPrice"
                                            className="inputStyle w-[75%] select-none font-AeonikProMedium outline-none bg-transparent"
                                            value={state?.discountPrice}
                                            onChange={handleChangeSalePrice}
                                            readOnly
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
                <div className="w-full h-fit  flex items-center justify-between px-3">

                    <span className="text-gray-800 text-base flex items-center not-italic font-AeonikProRegular">
                        Цвет:
                        {colorsList.filter(e => e?.pivot?.id == stateList?.product_color_id)?.map((data) => {
                            console.log(data, "data-color");
                            return (
                                <div key={data?.id} style={{ background: `${data.hex}` }}
                                    className={`border border-black ${Number(data?.id) === 2 ? "border border-black text-black" : "text-white"} rounded-[15px] ml-3  px-[15px]  whitespace-nowrap flex items-center justify-center text-[14px] ll:text-md  not-italic font-AeonikProRegular`}
                                >
                                    <span >{data?.name_ru} </span>
                                </div>
                            );
                        })}
                    </span>
                    <button
                        type="button"
                        className={`w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg ${state?.saveBtnDisable ? "text-textBlueColor" : "text-[#b5b5b5]"}  px-3 py-2 font-AeonikProMedium pr-1`}>
                        Сохранить
                    </button>
                </div>
            </div>
        </div >
    );
}
export default React.memo(HeadWearAdd)
