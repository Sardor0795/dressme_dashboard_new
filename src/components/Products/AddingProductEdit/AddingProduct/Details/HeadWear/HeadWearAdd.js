import React, { useContext, useEffect, useState } from "react";
import AllSizeListForWear from "../../../../../../hook/AllSizeListForWear/AllSizeListForWear";
import { DeleteIcon, LineIcon, MenuCloseIcons, StarLabel } from "../../../../../../assets/icons";
import { Checkbox, List, Popover, Select, Switch } from "antd";
import { dressMainData } from "../../../../../../hook/ContextTeam";

function HeadWearAdd({ stateList, colorsList, ColorModal, DeleteSize, checkColor }) {
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
    const [checked, setChecked] = useState([]);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
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
        // if (stateList?.category_id == SelectedNumber) {
        //     setState({
        //         ...state,
        //         minHeadGirth: stateList?.min_head_girth || null,
        //         maxHeadGirth: stateList?.max_head_girth || null,
        //         sizeCheck: stateList?.one_size || null,
        //         amount: stateList?.amount || null,
        //         age: stateList?.age || null,
        //         price: Number(stateList?.price)?.toLocaleString(),
        //         discountPercent: stateList?.discount_percent || null,
        //         discountPrice: stateList?.discount_price || null,

        //     })
        // }

    }, [stateList])



    const onChangeSwitch = (id) => {
        setState({ ...state, sizeCheck: id, saveBtnDisable: true })
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
    useEffect(() => {
        if (stateList?.sizes?.length) {
            setIndeterminate(checked.length && checked.length !== stateList?.sizes?.length);
            setCheckAll(checked.length === stateList?.sizes?.length);
            // handleGetCheckAll(checked, locationId)
        }
    }, [checked]);

    const onCheckAllChange = (e) => {
        setChecked(e.target.checked ? stateList?.sizes?.map((item) => item.id) : []);
        setCheckAll(e.target.checked);
    };
    useEffect(() => {
        setChecked([])
        setIndeterminate(false)
        setCheckAll(false)
    }, [checkColor])
    // console.log(checkColor, "checkColor");

    return (
        <div className={`w-full ${SelectedNumber == stateList?.category_id ? "" : "hidden"}  h-fit overflow-hidden  my-2`}>
            <div className="flex items-center justify-between">
                <div className="w-fit cursor-pointer bg-white flex items-center gap-x-2">
                    <Checkbox
                        defaultChecked={indeterminate}
                        onChange={onCheckAllChange}
                        checked={checkAll}
                        style={{ width: "26px", height: "26px" }}
                        className={`idCheck flex items-center rounded-[6px] overflow-hidden border border-[#f4a622]   justify-center !min-w-[24px] !min-h-[24px] `}>
                    </Checkbox>
                    <p className="text-black text-base not-italic flex items-center font-AeonikProMedium mr-[20px]">
                        Выбрать все
                    </p>
                </div>
                {checked?.length ?
                    <button type="button" onClick={ColorModal} className="text-textBlueColor hover:underline text-base not-italic font-AeonikProMedium">
                        Добавить к цвету
                    </button>
                    :
                    <span className="text-[#b5b5b5]  text-base not-italic font-AeonikProMedium">
                        Добавить к цвету
                    </span>
                }
            </div>
            <div className="w-full h-[640px] VerticelScroll overflow-auto ">
                <Checkbox.Group
                    style={{ width: "100%" }}
                    value={checked}
                    onChange={(checkedValues) => {
                        setChecked(checkedValues);
                    }} >
                    <List
                        itemLayout="horizontal"
                        dataSource={stateList?.sizes}
                        className="w-full">
                        {stateList?.sizes?.filter(e => e?.product_color_id == checkColor)?.map((item, index) => {

                            return (
                                <List.Item className="w-full "
                                >
                                    <div className="flex items-center gap-x-1">
                                        <div className="flex items-center h-full">
                                            <Checkbox value={item?.id} checked={checked} />
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
                                                                value={item?.min_head_girth}
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
                                                                value={item?.min_head_girth}
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
                                                            checked={item?.one_size == 1 ? true : false}
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
                                                            value={item?.amount}
                                                            onChange={(e) => setState({ ...state, amount: e.target.value, saveBtnDisable: true })}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    onClick={DeleteSize}
                                                    className="absolute right-2 cursor-pointer active:scale-95	active:opacity-70 text-[#a2a2a2] hover:text-textRedColor transition-colors duration-[0.2s] ease-linear">
                                                    <DeleteIcon
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
                                                                value={item?.age}
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

                                                                value={item?.price}
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
                                                                        value={item?.discount_percent}
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
                                                                        value={item?.discount_price}
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
                                                    {colorsList.filter(e => e?.pivot?.id == item?.product_color_id)?.map((data) => {
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
                                    </div>
                                </List.Item>
                            )
                        })}
                    </List>
                </Checkbox.Group>
            </div>
        </div >
    );
}
export default React.memo(HeadWearAdd)
