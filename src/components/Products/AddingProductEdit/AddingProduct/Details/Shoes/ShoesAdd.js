import React, { useContext, useEffect, useState } from "react";
import { DeleteIcon, LineIcon, StarLabel } from "../../../../../../assets/icons";
import { Checkbox, List, Popover, Select, Switch } from "antd";
import { dressMainData } from "../../../../../../hook/ContextTeam";

function ShoesAdd({ stateList, colorsList, ColorModal, DeleteSize, onDeleteId, checkColor, handleGetSizeCheckedList }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [state, setState] = useState({
        minFootLength: null,
        maxFootLength: null,
        minSize: null,
        ageNum: null,
        priceNum: null,
        salePercent: null,
        salePrice: null,
        quantityNum: null,
        isCheckValid: false,
        // ------
        onConcel: false,
        // ---save
        saveBtnDisable: false
    })
    const SelectedNumber = 4

    const [checked, setChecked] = useState([]);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
    useEffect(() => {
        if (state?.salePercent > 0) {
            const sale = state?.priceNum?.split(",")?.join("") * (100 - state?.salePercent) / 100
            const formattedValue = parseInt(sale).toLocaleString()
            setState({ ...state, salePrice: formattedValue })
        } else {
            setState({ ...state, salePrice: '' })
        }
    }, [state?.salePercent || state?.priceNum])
    useEffect(() => {
        if (stateList?.category_id == SelectedNumber) {
            // setState({
            //     ...state,
            //     quantityNum: stateList?.amount || null,
            //     priceNum: Number(stateList?.price)?.toLocaleString(),
            //     minFootLength: stateList?.min_foot_length || null,
            //     maxFootLength: stateList?.max_foot_length || null,
            //     minSize: stateList?.wear_size || null,
            //     ageNum: stateList?.age || null,
            //     salePercent: stateList?.discount_percent || null,
            //     salePrice: stateList?.discount_price || null,
            // })
        }

    }, [stateList])
    // console.log(stateList?.sizeGetList[0]?.discount_price, " stateList?.sizeGetList[0]?.discountPrice");
    const handleSendDetail = (e) => {
        setState({ ...state, isCheckValid: true })
        // if (state?.minSize && state?.priceNum && state?.quantityNum) {
        //     handleCallBack({
        //         footWearSize: state?.minSize,
        //         minFootLength: state?.minFootLength,
        //         maxFootLength: state?.maxFootLength,
        //         amount: state?.quantityNum,
        //         age: state?.ageNum,
        //         price: state?.priceNum?.split(",")?.join(""),
        //         discountPercent: state?.salePercent,
        //         discountPrice: state?.salePrice?.split(",")?.join(""),

        //     })
        //     setDressInfo({ ...dressInfo, ProductFilterType: SelectedNumber })
        //     setState({ ...state, isCheckValid: false, onConcel: true })
        // }


    }

    const handleChangePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')
        // Remove any existing commas from the input
        const sanitizedValue = result.replace(/,/g, '');

        // Format the number with commas
        const formattedValue = Number(sanitizedValue).toLocaleString()

        setState({ ...state, priceNum: formattedValue, saveBtnDisable: true });
    };
    const handleChangeSalePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')
        // Remove any existing commas from the input
        const sanitizedValue = result.replace(/,/g, '');

        // Format the number with commas
        const formattedValue = Number(sanitizedValue).toLocaleString()

        setState({ ...state, salePrice: formattedValue, saveBtnDisable: true });
    };
    const handleChangePercent = (event) => {
        const { value } = event.target
        if (value >= 0 && value < 100) {
            setState({ ...state, salePercent: value, saveBtnDisable: true });
        }
    };

    useEffect(() => {
        if (stateList?.sizes?.length) {
            setIndeterminate(checked.length && checked.length !== stateList?.sizes?.length);
            setCheckAll(checked.length === stateList?.sizes?.length);
            handleGetSizeCheckedList(checked)
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

    return (
        <div className={`w-full ${SelectedNumber == stateList?.category_id ? "" : "hidden"}  h-fitoverflow-hidden  my-2`}>
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
                                            <div className="relative w-full flex gap-x-10 px-3 pt-5">
                                                <div className="w-fit flex flex-col">
                                                    <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                                        Размер
                                                        <span className="ml-[5px]">
                                                            <StarLabel />
                                                        </span>
                                                    </p>
                                                    <div className="w-[58px] flex items-center justify-between gap-x-1">
                                                        <div className="flex flex-col">
                                                            <input
                                                                type="number"
                                                                className={`inputStyle outline-none w-full text-start h-[40px] ${state?.isCheckValid && !state?.minSize ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-3  rounded-lg   font-AeonikProRegular `}
                                                                value={item?.wear_size}
                                                                onChange={(e) => setState({ ...state, minSize: e.target.value, saveBtnDisable: true })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-fit flex flex-col">
                                                    <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                                        Длина Стопы
                                                        <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                                                    </p>
                                                    <div className="flex items-center gap-x-1">
                                                        <div className="flex flex-col">
                                                            <input
                                                                type="number"
                                                                className="inputStyle outline-none w-[60px] h-[40px] text-center border border-borderColor px-3  rounded-lg   font-AeonikProRegular "
                                                                placeholder="Мин"
                                                                value={item?.min_foot_length}
                                                                onChange={(e) => setState({ ...state, minFootLength: e.target.value, saveBtnDisable: true })}
                                                            />
                                                        </div>
                                                        <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                                        <div className="flex flex-col">
                                                            <input
                                                                type="number"
                                                                className="inputStyle outline-none w-[60px] h-[40px] text-center border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                                                                placeholder="Макс"
                                                                value={item?.max_foot_length}
                                                                onChange={(e) => setState({ ...state, maxFootLength: e.target.value, saveBtnDisable: true })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="w-fit flex flex-col md:ml-5">
                                                    <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                                        Количество
                                                        <span className="ml-[5px]">
                                                            <StarLabel />
                                                        </span>
                                                    </p>
                                                    <div className="flex items-start justify-between ">
                                                        <input
                                                            type="number"
                                                            className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-5  rounded-lg  font-AeonikProRegular `}
                                                            value={item?.amount}
                                                            onChange={(e) => setState({ ...state, quantityNum: e.target.value, saveBtnDisable: true })}
                                                        />
                                                    </div>
                                                </div>
                                                <div onClick={() => {
                                                    DeleteSize()
                                                    onDeleteId()
                                                }}
                                                    className="absolute right-2 cursor-pointer active:scale-95	active:opacity-70 text-[#a2a2a2] hover:text-textRedColor transition-colors duration-[0.2s] ease-linear">
                                                    <DeleteIcon width={30} />
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
                                                                type="number"
                                                                className="inputStyle w-[58px] h-[40px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none "
                                                                placeholder=""
                                                                value={item?.age}
                                                                onChange={(e) => setState({ ...state, ageNum: e.target.value, saveBtnDisable: true })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="w-full md:w-[55%]">
                                                        <div className="flex items-center mb-2 ll:mb-[10px] ">
                                                            <label
                                                                htmlFor=""
                                                                className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                                                                Цена
                                                            </label>
                                                            <span className="ml-[5px]">
                                                                <StarLabel />
                                                            </span>
                                                        </div>
                                                        <label htmlFor="priceShoes" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.priceNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-3 py-[6px] rounded-lg text-xs `}>
                                                            <input
                                                                type="text"
                                                                id="priceShoes"
                                                                placeholder="0"
                                                                className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                                                value={item?.price}
                                                                onChange={handleChangePrice}
                                                            />
                                                            <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                                                сум
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="w-fit flex flex-col items-start">
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
                                                                <div className="w-full h-10 flex items-center justify-center bg-white border border-borderColor rounded-lg px-[10px] md:px-3 py-[8px]">
                                                                    <input
                                                                        type="number"
                                                                        placeholder="0"
                                                                        className="inputStyle w-[70%] font-AeonikProMedium text-center outline-none "
                                                                        value={item?.discount_percent}
                                                                        onChange={handleChangePercent}
                                                                    />
                                                                    <span className="text-textLightColor ml-2">%</span>
                                                                </div>
                                                            </div>
                                                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                                            <div className="w-[60%] md:w-[75%] flex items-center">
                                                                <label htmlFor="salePrice" className="w-full h-[40px] flex items-center justify-between bg-white border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="0"
                                                                        id="salePrice"
                                                                        className="inputStyle w-[75%] select-none font-AeonikProMedium outline-none "
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

        </div>
    );
}
export default React.memo(ShoesAdd)
