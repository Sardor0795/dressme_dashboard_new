import React, { useContext, useEffect, useState } from "react";
import { LineIcon, StarLabel } from "../../../../../../assets/icons";
import { Popover, Select, Switch } from "antd";
import { dressMainData } from "../../../../../../hook/ContextTeam";
import { Checkbox, Col, Row } from 'antd';
import { BiCheck, BiPlus } from "react-icons/bi";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const url = "https://api.dressme.uz/api/seller";

function AddSize({ handleCallBack, typeId, onRefetch, newProductId, colorListForTest, selectColorID, productsDataIdEdit }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);

    const [state, setState] = useState({
        minHeadGirth: null,
        maxHeadGirth: null,
        sizeCheck: false,
        // outWear
        minBreast: null,
        maxBreast: null,
        minSize: null,
        maxSize: null,
        minHeight: null,
        maxHeight: null,
        minHips: null,
        maxHips: null,
        // shoesWear
        minFootLength: null,
        maxFootLength: null,
        one_size: null,
        // Accessuar
        rowSize: null,
        colSize: null,
        //Universal
        quantityNum: null,
        ageNum: null,
        priceNum: null,
        salePercent: null,
        salePrice: null,
        sizeListCheck: null,
        selected: null,
        maxSizeShow: false,
        isCheckValid: false,
        // ------
        sendingLoader: false,

        // ------
        onConcel: false
    })
    useEffect(() => {
        setState({
            ...state,
            // Accessuary
            accessorySize: null,
            legnthAcc: null,
            widthAcc: null,
            accessoryLetterSize: null,
            // Shoes
            footWearSize: null,
            minFootLength: null,
            maxFootLength: null,
            // UnderWear
            minUnderwearWaistGirth: null,
            maxUnderwearWaistGirth: null,
            minUnderWearSize: null,
            maxUnderWearSize: null,
            minUnderWearHipGirth: null,
            maxUnderWearHipGirth: null,
            minHeight: null,
            maxHeight: null,
            underWearLetterSize: null,
            // OutWear
            minChestGirth: null,
            maxChestGirth: null,
            minOutWearSize: null,
            maxOutWearSize: null,
            minOutWearWaistGirth: null,
            maxOutWearWaistGirth: null,
            minOutWearHipGirth: null,
            maxOutWearHipGirth: null,
            outWearLetterSize: null,
            // HeadWear
            minHeadGirth: null,
            maxHeadGirth: null,
            sizeCheck: false,
            // All of Category
            amount: null,
            age: null,
            price: null,
            discountPercent: null,
            discountPrice: null,
            // ----
            isCheckValid: false,
            onConcel: false,
            selected: null,
        })
        handleCallBack()
    }, [productsDataIdEdit?.sizes])

    // console.log(productsDataIdEdit, "productsDataIdEdit");
    const [toggleShow, setToggleShow] = useState(false)
    const [decraseList, setDecraseList] = useState(false)
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
            { id: 11, action: true, name: "5XL" },
            { id: 12, action: true, name: "7XL" },
            { id: 13, action: true, name: "9XL" },
            { id: 14, action: true, name: "10XL" },
            { id: 15, action: true, name: "4XL" },
            { id: 16, action: true, name: "6XL" },
            { id: 17, action: true, name: "8XL" },
        ]
    }
    )

    const onChangeSwitch = (checked) => {
        setState({ ...state, sizeCheck: checked })
    };

    const handleOpenPopver = (newOpen) => {
        setToggleShow(newOpen)
    }

    const onHandleAddSize = async () => {
        setState({ ...state, isCheckValid: true, })
        if (state?.priceNum && state?.quantityNum) {
            setState({ ...state, sendingLoader: true })
            let form = new FormData();

            if (Number(typeId) === 1 && state?.priceNum && state?.quantityNum) {
                state?.sizeCheck && form.append("one_size", state?.sizeCheck ? 1 : 0);
                state?.minHeadGirth && form.append("min_head_girth", state?.minHeadGirth);
                state?.maxHeadGirth && form.append("max_head_girth", state?.maxHeadGirth);
                state?.salePercent && form.append("discount_percent", state?.salePercent);
                state?.salePrice && form.append("discount_price", state?.salePrice?.split(",")?.join(""));
                state?.ageNum && form.append("age", Number(state?.ageNum));
                form.append("amount", state?.quantityNum);
                form.append("price", state?.priceNum?.split(",")?.join(""));
                form.append("shop_location_id", newProductId);
                form.append("color_id", selectColorID);
            }
            if (Number(typeId) === 2 && state?.priceNum && state?.quantityNum && state?.minSize) {
                state?.sizeListCheck && form.append("outwear_letter_size", state?.sizeListCheck);
                state?.minSize && form.append("min_outwear_size", state?.minSize);
                state?.maxSize && form.append("max_outwear_size", state?.maxSize);
                state?.minBreast && form.append("min_chest_girth", state?.minBreast);
                state?.maxBreast && form.append("max_chest_girth", state?.maxBreast);
                state?.minWaist && form.append("min_outwear_waist_girth", state?.minWaist);
                state?.maxWaist && form.append("max_outwear_waist_girth", state?.maxWaist);
                state?.minHips && form.append("min_outwear_hip_girth", state?.minHips);
                state?.maxHips && form.append("max_outwear_hip_girth", state?.maxHips);
                state?.ageNum && form.append("age", Number(state?.ageNum));
                state?.salePercent && form.append("discount_percent", state?.salePercent);
                state?.salePrice && form.append("discount_price", state?.salePrice?.split(",")?.join(""));
                form.append("amount", state?.quantityNum);
                form.append("price", state?.priceNum?.split(",")?.join(""));
                form.append("shop_location_id", newProductId);
                form.append("color_id", selectColorID);
            }
            if (Number(typeId) === 3 && state?.priceNum && state?.quantityNum && state?.minSize) {
                state?.sizeListCheck && form.append("underwear_letter_size", state?.sizeListCheck);
                state?.minHeight && form.append("min_height", state?.minHeight);
                state?.maxHeight && form.append("max_height", state?.maxHeight);
                state?.minSize && form.append("min_underwear_size", state?.minSize);
                state?.maxSize && form.append("max_underwear_size", state?.maxSize);
                state?.minBreast && form.append("min_underwear_waist_girth", state?.minBreast);
                state?.maxBreast && form.append("max_underwear_waist_girth", state?.maxBreast);
                state?.minHips && form.append("min_underwear_hip_girth", state?.minHips);
                state?.maxHips && form.append("max_underwear_hip_girth", state?.maxHips);
                state?.ageNum && form.append("age", Number(state?.ageNum));
                state?.salePercent && form.append("discount_percent", state?.salePercent);
                state?.salePrice && form.append("discount_price", state?.salePrice?.split(",")?.join(""));
                form.append("amount", state?.quantityNum);
                form.append("price", state?.priceNum?.split(",")?.join(""));
                form.append("shop_location_id", newProductId);
                form.append("color_id", selectColorID);
            }
            if (Number(typeId) === 4 && state?.priceNum && state?.quantityNum && state?.one_size) {
                state?.minFootLength && form.append("min_foot_length", state?.minFootLength);
                state?.maxFootLength && form.append("max_foot_length", state?.maxFootLength);
                state?.ageNum && form.append("age", Number(state?.ageNum));
                state?.salePercent && form.append("discount_percent", state?.salePercent);//no R
                state?.salePrice && form.append("discount_price", state?.salePrice?.split(",")?.join(""));//no R
                form.append("footwear_size", state?.one_size);
                form.append("amount", state?.quantityNum);
                form.append("price", state?.priceNum?.split(",")?.join(""));
                form.append("shop_location_id", newProductId);
                form.append("color_id", selectColorID);
            }
            if (Number(typeId) === 5 && state?.priceNum && state?.quantityNum) {
                state?.sizeListCheck && form.append("accessory_letter_size", state?.sizeListCheck);
                state?.minSize && form.append("accessory_size", state?.minSize);
                state?.rowSize && form.append("length", state?.rowSize);
                state?.colSize && form.append("width", state?.colSize);
                state?.salePercent && form.append("discount_percent", state?.salePercent);//no R
                state?.salePrice && form.append("discount_price", state?.salePrice?.split(",")?.join(""));//no R
                state?.ageNum && form.append("age", Number(state?.ageNum));
                form.append("amount", state?.quantityNum);
                form.append("price", state?.priceNum?.split(",")?.join(""));
                form.append("shop_location_id", newProductId);
                form.append("color_id", selectColorID);
            }

            try {
                const res = await fetch(`${url}/products/${newProductId}/add-product-size`, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
                    },
                    body: form,
                });
                const res_1 = await res.json();
                if (res_1) {
                    if (res_1?.errors && res_1?.message) {
                        toast.error(`${res_1?.message}`, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        })
                        onRefetch()
                        setState({ ...state, isCheckValid: false, sendingLoader: false })
                    } else if (res_1?.message) {
                        toast.success(`${res_1?.message}`, {
                            position: "top-right",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        })
                        onRefetch()
                        setToggleShow(false)
                        setState({ ...state, isCheckValid: false, sendingLoader: false })
                    }
                }
            } catch (err) {
                toast.error(`${err}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                onRefetch()
                setState({ ...state, isCheckValid: false, sendingLoader: false })
                throw new Error(err?.message || "something wrong");
            }
        }
    }

    const handleSendDetail = (e) => {
        setState({ ...state, isCheckValid: true })
        if (Number(typeId) === 1 && state?.priceNum && state?.quantityNum) {
            setToggleShow(false)
            handleCallBack({
                minHeadGirth: state?.minHeadGirth,
                maxHeadGirth: state?.maxHeadGirth,
                sizeCheck: state?.sizeCheck,
                // All of Category
                amount: state?.quantityNum,
                age: state?.ageNum,
                price: state?.priceNum?.split(",")?.join(""),
                discountPercent: state?.salePercent,
                discountPrice: state?.salePrice?.split(",")?.join(""),
            })
        }
        if (Number(typeId) === 2 && state?.priceNum && state?.quantityNum && state?.minSize) {
            setToggleShow(false)
            handleCallBack({
                // OutWear
                minChestGirth: state?.minBreast,
                maxChestGirth: state?.maxBreast,
                minOutWearSize: state?.minSize,
                maxOutWearSize: state?.maxSize,
                minOutWearWaistGirth: state?.minWaist,
                maxOutWearWaistGirth: state?.maxWaist,
                minOutWearHipGirth: state?.minHips,
                maxOutWearHipGirth: state?.maxHips,
                outWearLetterSize: state?.sizeListCheck,
                // All of Category
                amount: state?.quantityNum,
                age: state?.ageNum,
                price: state?.priceNum?.split(",")?.join(""),
                discountPercent: state?.salePercent,
                discountPrice: state?.salePrice?.split(",")?.join(""),
            })
        }
        if (Number(typeId) === 3 && state?.priceNum && state?.quantityNum && state?.minSize) {
            setToggleShow(false)
            handleCallBack({
                // UnderWear
                minUnderwearWaistGirth: state?.minBreast,
                maxUnderwearWaistGirth: state?.maxBreast,
                minUnderWearSize: state?.minSize,
                maxUnderWearSize: state?.maxSize,
                minUnderWearHipGirth: state?.minHips,
                maxUnderWearHipGirth: state?.maxHips,
                minHeight: state?.minHeight,
                maxHeight: state?.maxHeight,
                underWearLetterSize: state?.sizeListCheck,
                // All of Category
                amount: state?.quantityNum,
                age: state?.ageNum,
                price: state?.priceNum?.split(",")?.join(""),
                discountPercent: state?.salePercent,
                discountPrice: state?.salePrice?.split(",")?.join(""),
            })
        }
        if (Number(typeId) === 4 && state?.priceNum && state?.quantityNum && state?.one_size) {
            setToggleShow(false)
            handleCallBack({
                // Shoes
                footWearSize: state?.one_size,
                minFootLength: state?.minFootLength,
                maxFootLength: state?.maxFootLength,
                // All of Category
                amount: state?.quantityNum,
                age: state?.ageNum,
                price: state?.priceNum?.split(",")?.join(""),
                discountPercent: state?.salePercent,
                discountPrice: state?.salePrice?.split(",")?.join(""),
            })
        }
        if (Number(typeId) === 5 && state?.priceNum && state?.quantityNum) {
            setToggleShow(false)
            handleCallBack({
                // Accessuary
                accessorySize: state?.minSize,
                legnthAcc: state?.rowSize,
                widthAcc: state?.colSize,
                accessoryLetterSize: state?.sizeListCheck,
                // All of Category
                amount: state?.quantityNum,
                age: state?.ageNum,
                price: state?.priceNum?.split(",")?.join(""),
                discountPercent: state?.salePercent,
                discountPrice: state?.salePrice?.split(",")?.join(""),
            })
        }
    }


    const handleChangePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')
        const sanitizedValue = result.replace(/,/g, '');
        const formattedValue = Number(sanitizedValue).toLocaleString()
        setState({ ...state, priceNum: formattedValue });
    };
    const handleChangeSalePrice = (event) => {

    };

    useEffect(() => {
        if (state?.salePercent > 0) {
            const sale = state?.priceNum?.split(",")?.join("") * (100 - state?.salePercent) / 100
            const formattedValue = parseInt(sale).toLocaleString()
            setState({ ...state, salePrice: formattedValue })
        } else {
            setState({ ...state, salePrice: '' })
        }
    }, [state?.salePercent, state?.priceNum])
    const handleChangePercent = (event) => {
        const { value } = event.target
        if (value >= 0 && value < 100) {
            setState({ ...state, salePercent: value });
        }
    };

    const AddSize = (
        <div className="w-[840px] h-fit">
            {Number(typeId) === 1 &&
                <div
                    className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
                >
                    <div className="w-full ">
                        {productsDataIdEdit?.colors?.filter(e => Number(e?.id) === Number(selectColorID))?.map((data, index) => {
                            return (
                                <div key={index} className={`flex justify-start items-center gap-x-2 px-3 ${data ? "" : "hidden"}`}>
                                    <span className="text-black text-base not-italic font-AeonikProRegular"> Цвет:</span>
                                    <div
                                        key={data?.id}
                                        style={{ background: `${data.hex}` }}
                                        className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${data?.id === 2 ? "border " : ""}`}
                                    >
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-full flex justify-start px-3  gap-x-10  pt-5 ">
                        <div className="w-fit flex flex-col">
                            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">

                                Обхват головы
                                <span className="text-sm text-textLightColor ml-[6px]">(см)</span>

                            </p>
                            <div className="w-full flex items-center mt-[10px]">
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        className={`inputStyle w-[55px] h-[38px] text-center border border-borderColor bg-white  px-2 rounded-lg   outline-none font-AeonikProRegular `}
                                        placeholder="Мин"
                                        name="minHeadGirth"
                                        value={state?.minHeadGirth}
                                        onChange={(e) => setState({ ...state, minHeadGirth: e.target.value })}
                                        required
                                    />
                                </div>
                                <span className="mx-[5px]"><LineIcon /></span>
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        name="maxHeadGirth"
                                        className={`inputStyle w-[55px] h-[38px] text-center  border border-borderColor bg-white px-2 rounded-lg  font-AeonikProRegular  outline-none`}
                                        placeholder="Макс"
                                        value={state?.maxHeadGirth}
                                        onChange={(e) => setState({ ...state, maxHeadGirth: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-fit flex flex-col">
                            <p className="flex items-center justify-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                                One Size
                                <span className="text-sm text-textLightColor ml-[6px]">(см)</span>

                            </p>
                            <div className="flex items-center justify-center mt-[10px]">
                                <Switch
                                    className={`border border-borderColor bg-[#8B8B8B] `}
                                    onChange={onChangeSwitch}
                                    checked={state?.sizeCheck}
                                // defaultChecked={state?.sizeCheck}
                                />
                            </div>
                        </div>
                        <div className="w-fit flex flex-col items-center">
                            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                                Количество
                                {/* <span className="text-sm text-textLightColor ml-[6px]">(см)</span> */}
                                <span className="ml-[5px]">
                                    <StarLabel />
                                </span>
                            </p>
                            <div className="flex items-start justify-between mt-[10px]">
                                <input
                                    type="number"
                                    name="quantityNum"
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
                                    <div
                                        className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                        Возраст
                                    </div>
                                </div>
                                <div className="w-full flex items-center">
                                    <input
                                        type="number"
                                        name="ageNum"
                                        className="inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none "
                                        placeholder="age"
                                        value={state?.ageNum}
                                        onChange={(e) => setState({ ...state, ageNum: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-[90%]">
                                <div className="flex items-center mb-2 ll:mb-[10px] ">
                                    <div
                                        className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                                        Цена
                                    </div>
                                    <span className="ml-[5px]">
                                        <StarLabel />
                                    </span>
                                </div>
                                <label htmlFor="enterPrice1" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.priceNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3 py-[6px] rounded-lg text-xs`}>
                                    <input
                                        type="text"
                                        placeholder="0"
                                        id="enterPrice1"
                                        name="priceNum"
                                        className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                        value={state?.priceNum}
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
                                <div
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                    Скидка
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-center">
                                <div className="w-full flex items-center gap-x-1">
                                    <div className="w-[40%] md:w-[72px] flex items-start">
                                        <div className={`w-full h-10 flex items-center justify-center border border-borderColor ${state?.priceNum?.split(",")?.join("") > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} rounded-lg px-[4px] md:px-1 py-[8px]`}>
                                            {state?.priceNum?.split(",")?.join("") > 0 ?
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    name="salePercent"
                                                    className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                    value={state?.salePercent}
                                                    onChange={handleChangePercent}
                                                />
                                                :
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    name="salePercent"
                                                    className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                    readOnly
                                                />}
                                            <span className="text-textLightColor ml-1">%</span>
                                        </div>
                                    </div>
                                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                    <div className="w-[60%] md:w-[75%] flex items-center">
                                        <label htmlFor="salePrice1" className={`w-full h-[40px] flex items-center justify-between  ${state?.priceNum?.split(",")?.join("") > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} border border-borderColor px-3 py-[6px] rounded-lg text-xs`}>
                                            <input
                                                type="text"
                                                placeholder="0"
                                                id="salePrice1"
                                                name="salePrice"
                                                className="inputStyle w-[75%] select-none font-AeonikProMedium outline-none bg-transparent"
                                                value={state?.salePrice}
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
                    <div className="w-full h-fit  flex items-center justify-end gap-x-5">

                        {colorListForTest?.includes(selectColorID) ?
                            <button onClick={onHandleAddSize} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                                {state?.sendingLoader ?
                                    <ClipLoader
                                        className="h-full py-[2px]"
                                        color={"#007DCA"}
                                        size={40}
                                        loading={true}
                                    /> : "Добавить"}
                            </button>
                            :
                            <button onClick={handleSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                                Готово
                            </button>
                        }
                    </div>
                </div>
            }
            {Number(typeId) === 2 &&
                <div
                    className={`w-full h-fit flex flex-col items-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
                >
                    <div className="w-full ">
                        {productsDataIdEdit?.colors?.filter(e => e?.id == selectColorID)?.map((data, index) => {
                            return (
                                <div key={index} className={`flex justify-start items-center gap-x-2 px-3 ${data ? "" : "hidden"}`}>
                                    <span className="text-black text-base not-italic font-AeonikProRegular"> Цвет:</span>
                                    <div
                                        key={data?.id}
                                        style={{ background: `${data.hex}` }}
                                        className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${data?.id === 2 ? "border " : ""}`}
                                    >
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-full flex  gap-x-10 px-3 pt-5">
                        <div className="w-[20%] flex flex-col">
                            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                Обхват Груди
                                <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                                {/* <span className="ml-[5px]">
                              <StarLabel />
                          </span> */}
                            </p>
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        className={`inputStyle outline-none w-[60px] text-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg  font-AeonikProRegular `}
                                        placeholder="Мин"
                                        name="minBreast"
                                        value={state?.minBreast}
                                        onChange={(e) => setState({ ...state, minBreast: e.target.value })}
                                    />
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        name="maxBreast"
                                        className={`inputStyle outline-none w-[60px] text-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg font-AeonikProRegular `}
                                        placeholder="Макс"
                                        value={state?.maxBreast}
                                        onChange={(e) => setState({ ...state, maxBreast: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-[20%] flex flex-col">
                            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                Размер
                                <span className="ml-[5px]">
                                    <StarLabel />
                                </span>
                            </p>
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        name="minSize"
                                        className={`inputStyle outline-none w-[60px] text-center h-[38px]  ${state?.isCheckValid && !state?.minSize ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3  rounded-lg font-AeonikProRegular `}
                                        placeholder="Мин"
                                        value={state?.minSize}
                                        onChange={(e) => setState({ ...state, minSize: e.target.value })}
                                    />
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="flex flex-col">
                                    {state?.maxSizeShow ? <input
                                        type="number"
                                        name="maxSize"
                                        className={`inputStyle outline-none w-[60px] text-center h-[38px] border border-borderColor bg-white px-3  rounded-lg font-AeonikProRegular `}
                                        placeholder="Макс"
                                        value={state?.maxSize}
                                        onChange={(e) => setState({ ...state, maxSize: e.target.value })}
                                    /> :
                                        <button onClick={() => setState({ ...state, maxSizeShow: true })} className="border border-borderColor bg-white  rounded-lg  w-[60px] text-center h-[38px] flex items-center justify-center">
                                            <BiPlus color="#007DCA" size={20} />
                                        </button>}
                                </div>
                            </div>
                        </div>
                        <div className="w-[53%] flex flex-col">
                            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                                Буквенный Размер

                            </p>

                            <div className='w-full '>
                                {/* -----------------Desktop--------------------- */}
                                <div className="w-full hidden md:flex flex-row">
                                    <div className="w-fit w-[222px]  h-[50px] grid grid-cols-4 gap-2 ">
                                        {sizeList.sizeList1.map((data) => {
                                            return (
                                                <div
                                                    key={data?.id}
                                                    className="flex "
                                                >
                                                    {data?.action &&
                                                        <label
                                                            htmlFor={data?.id}
                                                            className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={data?.id}
                                                                name="size_Outwear"
                                                                checked={data?.id === state?.selected}
                                                                onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                                value={data?.name}
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
                                    <div className={`w-fit w-[222px]  h-[50px] grid grid-cols-4  gap-2 ${decraseList ? "" : "items-end"} `}>
                                        {decraseList && sizeList.sizeList2.map((data) => {
                                            return (
                                                <div
                                                    key={data?.id}
                                                    className="flex "
                                                >

                                                    {data?.action &&
                                                        <label
                                                            htmlFor={data?.id}
                                                            className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={data?.id}
                                                                name="size_Outwear"
                                                                checked={data?.id === state?.selected}
                                                                onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                                value={data?.name}
                                                                className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                                            />
                                                            <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
                                                                {data?.name}
                                                            </span>
                                                        </label>}
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
                                                            htmlFor={data?.id}
                                                            className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={data?.id}
                                                                name="size_Outwear"
                                                                checked={data?.id === state?.selected}
                                                                onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                                value={data?.name}
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
                                                            htmlFor={data?.id}
                                                            className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={data?.id}
                                                                name="size_Outwear"
                                                                checked={data?.id === state?.selected}
                                                                onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                                value={data?.name}
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
                    </div>
                    <div className="w-full flex justify-start items-center gap-x-10 px-3 pt-5">
                        <div className="w-fit flex flex-col">
                            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                Обхват Талии
                                <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                                {/* <span className="ml-[5px]">
                              <StarLabel />
                          </span> */}
                            </p>
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        name="minWaist"
                                        className={`inputStyle outline-none w-[60px] h-[38px]  text-center border border-borderColor bg-white px-2 md:px-3  rounded-lg   font-AeonikProRegular `}
                                        placeholder="Мин"
                                        value={state?.minWaist}
                                        onChange={(e) => setState({ ...state, minWaist: e.target.value })}

                                    />
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        name="maxWaist"
                                        className={`inputStyle outline-none w-[60px] h-[38px]  text-center border border-borderColor bg-white px-2 md:px-3  rounded-lg  font-AeonikProRegular `}
                                        placeholder="Макс"
                                        value={state?.maxWaist}
                                        onChange={(e) => setState({ ...state, maxWaist: e.target.value })}

                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-fit flex flex-col">
                            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                Обхват Бедер
                            </p>
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        name="minHips"
                                        className="inputStyle outline-none w-[60px] h-[38px]  text-center border border-borderColor px-2 md:px-3  rounded-lg   font-AeonikProRegular "
                                        placeholder="Мин"
                                        value={state?.minHips}
                                        onChange={(e) => setState({ ...state, minHips: e.target.value })}
                                    />
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        name="maxHips"
                                        className="inputStyle outline-none w-[60px] h-[38px] text-center border border-borderColor px-2 md:px-3  rounded-lg  font-AeonikProRegular "
                                        placeholder="Макс"
                                        value={state?.maxHips}
                                        onChange={(e) => setState({ ...state, maxHips: e.target.value })}
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
                                    name="quantityNum"
                                    className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-5  rounded-lg  font-AeonikProRegular `}
                                    value={state?.quantityNum}
                                    onChange={(e) => setState({ ...state, quantityNum: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row px-3 gap-x-[11px] md:pt-5 md:gap-x-[20px] mb-[15px]">
                        <div className="w-fit flex items-center gap-x-[25px]">
                            <div className="w-fit hidden md:flex flex-col items-start">
                                <div className="flex items-center justify-center ">
                                    <div
                                        className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                                        Возраст
                                    </div>
                                </div>
                                <div className="w-fit flex items-center">
                                    <input
                                        type="number"
                                        name="ageNum"
                                        className="inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg   outline-none"
                                        placeholder=""
                                        value={state?.ageNum}
                                        onChange={(e) => setState({ ...state, ageNum: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-[55%]">
                                <div className="flex items-center mb-2 ll:mb-[10px] ">
                                    <span
                                        className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                        Цена
                                    </span>
                                    <span className="ml-[5px]">
                                        <StarLabel />
                                    </span>
                                </div>
                                <label htmlFor="priceOutWear" className={`w-full h-[40px] flex items-center  ${state?.isCheckValid && !state?.priceNum ? " border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3 py-[6px] rounded-lg text-xs`}>
                                    <input
                                        type="text"
                                        placeholder="0"
                                        id="priceOutWear"
                                        name="priceNum"
                                        className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent "
                                        value={state?.priceNum}
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
                                <div
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                                    Скидка
                                </div>

                            </div>
                            <div className="w-full flex items-center justify-center">
                                <div className="w-full flex items-center gap-x-1">
                                    <div className="w-[40%] md:w-[72px] flex items-start">
                                        <div className={`w-full h-10 flex items-center justify-center border border-borderColor ${state?.priceNum?.split(",")?.join("") > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} rounded-lg px-[4px] md:px-1 py-[8px]`}>
                                            {state?.priceNum?.split(",")?.join("") > 0 ?
                                                <input
                                                    type="number"
                                                    name="salePercent"
                                                    placeholder="0"
                                                    className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                    value={state?.salePercent}
                                                    onChange={handleChangePercent}
                                                />
                                                :
                                                <input
                                                    type="number"
                                                    name="salePercent"
                                                    placeholder="0"
                                                    className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                    readOnly
                                                />}
                                            <span className="text-textLightColor ml-1">%</span>
                                        </div>
                                    </div>
                                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                    <div className="w-[60%] md:w-[75%] flex items-center">
                                        <label htmlFor="salePrice2" className={`w-full h-[40px] flex items-center justify-between  ${state?.priceNum?.split(",")?.join("") > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} border border-borderColor px-3 py-[6px] rounded-lg text-xs`}>
                                            <input
                                                type="text"
                                                placeholder="0"
                                                id="salePrice2"
                                                name="salePrice"
                                                className="inputStyle w-[75%] select-none font-AeonikProMedium outline-none bg-transparent"
                                                value={state?.salePrice}
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

                    <div className="w-full h-fit  flex items-center justify-end gap-x-5">

                        {colorListForTest?.includes(selectColorID) ?
                            <button onClick={onHandleAddSize} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                                {state?.sendingLoader ?
                                    <ClipLoader
                                        className="h-full py-[2px]"
                                        color={"#007DCA"}
                                        size={40}
                                        loading={true}
                                    /> : "Добавить"}
                            </button>
                            :
                            <button onClick={handleSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                                Готово
                            </button>
                        }
                    </div>
                </div>
            }
            {Number(typeId) === 3 &&
                <div
                    className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
                >
                    <div className="w-full ">
                        {productsDataIdEdit?.colors?.filter(e => e?.id == selectColorID)?.map((data, index) => {
                            return (
                                <div key={index} className={`flex justify-start items-center gap-x-2 px-3 ${data ? "" : "hidden"}`}>
                                    <span className="text-black text-base not-italic font-AeonikProRegular"> Цвет:</span>
                                    <div
                                        key={data?.id}
                                        style={{ background: `${data.hex}` }}
                                        className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${data?.id === 2 ? "border " : ""}`}
                                    >
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-full flex gap-x-10 px-3 pt-5">
                        <div className="w-fit flex flex-col">
                            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                Обхват Талии
                                <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                                {/* <span className="ml-[5px]">
                                 <StarLabel />
                             </span> */}
                            </p>
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        name="minBreast"
                                        className={`inputStyle outline-none w-[60px] h-[38px] text-center border border-borderColor bg-white  px-3  rounded-lg   font-AeonikProRegular `}
                                        placeholder="Мин"
                                        value={state?.minBreast}
                                        onChange={(e) => setState({ ...state, minBreast: e.target.value })}
                                    />
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        name="maxBreast"
                                        className={`inputStyle outline-none w-[60px] h-[38px] text-center border border-borderColor bg-white  px-3  rounded-lg  font-AeonikProRegular `}
                                        placeholder="Макс"
                                        value={state?.maxBreast}
                                        onChange={(e) => setState({ ...state, maxBreast: e.target.value })}
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
                                            type="number"
                                            name="minSize"
                                            className={`inputStyle outline-none w-[60px] text-center h-[38px] ${state?.isCheckValid && !state?.minSize ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}  px-3  rounded-lg   font-AeonikProRegular `}
                                            placeholder="Мин"
                                            value={state?.minSize}
                                            onChange={(e) => setState({ ...state, minSize: e.target.value })}
                                        />
                                    </div>
                                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                    <div className="flex flex-col">
                                        {state?.maxSizeShow ? <input
                                            type="number"
                                            name="maxSize"
                                            className={`inputStyle outline-none w-[60px] text-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg  font-AeonikProRegular `}
                                            placeholder="Макс"
                                            value={state?.maxSize}
                                            onChange={(e) => setState({ ...state, maxSize: e.target.value })}
                                        /> :
                                            <button onClick={() => setState({ ...state, maxSizeShow: true })} className="border border-borderColor bg-white  rounded-lg  w-[60px] text-center h-[38px] flex items-center justify-center">
                                                <BiPlus color="#007DCA" size={20} />
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[53%] flex flex-col">
                            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                                Буквенный Размер
                            </p>

                            <div className='w-full '>
                                {/* -----------------Desktop--------------------- */}
                                <div className="w-full hidden md:flex flex-row">
                                    <div className="w-fit w-[222px]  h-[50px] grid grid-cols-4 gap-2 ">
                                        {sizeList.sizeList1.map((data) => {
                                            return (
                                                <div
                                                    key={data?.id}
                                                    className="flex "
                                                >

                                                    {data?.action &&
                                                        <label
                                                            htmlFor={data?.id}
                                                            className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={data?.id}
                                                                name="size_Outwear"
                                                                checked={data?.id === state?.selected}
                                                                onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                                value={data?.name}
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
                                    <div className={`w-fit w-[222px]  h-[50px] grid grid-cols-4  gap-2 ${decraseList ? "" : "items-end"} `}>
                                        {decraseList && sizeList.sizeList2.map((data) => {
                                            return (
                                                <div
                                                    key={data?.id}
                                                    className="flex "
                                                >

                                                    {data?.action && <label
                                                        htmlFor={data?.id}
                                                        className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={data?.id}
                                                            name="size_Outwear"
                                                            checked={data?.id === state?.selected}
                                                            onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                            value={data?.name}
                                                            className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                                        />
                                                        <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
                                                            {data?.name}
                                                        </span>
                                                    </label>}
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
                                                            htmlFor={data?.id}
                                                            className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={data?.id}
                                                                name="size_Outwear"
                                                                checked={data?.id === state?.selected}
                                                                onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                                value={data?.name}
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
                                                            htmlFor={data?.id}
                                                            className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={data?.id}
                                                                name="size_Outwear"
                                                                checked={data?.id === state?.selected}
                                                                onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                                value={data?.name}
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
                                                            htmlFor={data?.id}
                                                            className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={data?.id}
                                                                name="size_Outwear"
                                                                checked={data?.id === state?.selected}
                                                                onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                                value={data?.name}
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
                    </div>
                    <div className="w-full flex gap-x-10 px-3 pt-5">
                        <div className="w-fit flex flex-col">
                            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                Размер Бедер
                                {/* <span className="ml-[5px]">
                                 <StarLabel />
                             </span> */}
                            </p>
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        name="minHips"
                                        className={`inputStyle outline-none w-[60px] h-[38px] text-center  border border-borderColor bg-white  px-3  rounded-lg   font-AeonikProRegular `}
                                        placeholder="Мин"
                                        value={state?.minHips}
                                        onChange={(e) => setState({ ...state, minHips: e.target.value })}
                                    />
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        name="maxHips"
                                        className={`inputStyle outline-none w-[60px] h-[38px] text-center border border-borderColor bg-white  px-3  rounded-lg  font-AeonikProRegular `}
                                        placeholder="Макс"
                                        value={state?.maxHips}
                                        onChange={(e) => setState({ ...state, maxHips: e.target.value })}
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
                                            type="number"
                                            name="minHeight"
                                            className={`inputStyle outline-none w-[60px] text-center h-[38px] border border-borderColor bg-white px-3  rounded-lg   font-AeonikProRegular `}
                                            placeholder="Мин"
                                            value={state?.minHeight}
                                            onChange={(e) => setState({ ...state, minHeight: e.target.value })}
                                        />
                                    </div>
                                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                    <div className="flex flex-col">
                                        <input
                                            type="number"
                                            name="maxHeight"
                                            className={`inputStyle outline-none w-[60px] text-center h-[38px] border border-borderColor bg-white px-3  rounded-lg  font-AeonikProRegular `}
                                            placeholder="Макс"
                                            value={state?.maxHeight}
                                            onChange={(e) => setState({ ...state, maxHeight: e.target.value })}
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
                                    type="number"
                                    name="quantityNum"
                                    className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-3  rounded-lg  font-AeonikProRegular `}
                                    value={state?.quantityNum}
                                    onChange={(e) => setState({ ...state, quantityNum: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row px-3 pt-5 gap-x-[11px] md:gap-x-[20px] mb-[15px]">
                        <div className="w-fit flex items-center gap-x-[25px]">
                            <div className="w-fit hidden md:flex flex-col items-start">
                                <div className="flex items-center justify-center  mb-2 ll:mb-[10px]">
                                    <div
                                        className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                        Возраст
                                    </div>
                                </div>
                                <div className="w-fit flex items-center">
                                    <input
                                        type="number"
                                        name="ageNum"
                                        className=" inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none"
                                        placeholder=""
                                        value={state?.ageNum}
                                        onChange={(e) => setState({ ...state, ageNum: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-[55%]">
                                <div className="flex items-center  mb-2 ll:mb-[10px]">
                                    <div
                                        className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                        Цена
                                    </div>
                                    <span className="ml-[5px]">
                                        <StarLabel />
                                    </span>
                                </div>
                                <label htmlFor="priceNum" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.priceNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}  px-3 py-[6px] rounded-lg text-xs`}>
                                    <input
                                        type="text"
                                        placeholder="0"
                                        id="priceNum"
                                        className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                        value={state?.priceNum}
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
                                <div
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">

                                    Скидка
                                </div>

                            </div>
                            <div className="w-full flex items-center justify-center">
                                <div className="w-full flex items-center gap-x-1">
                                    <div className="w-[40%] md:w-[72px] flex items-start">
                                        <div className={`w-full h-10 flex items-center justify-center border border-borderColor ${state?.priceNum?.split(",")?.join("") > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} rounded-lg px-[4px] md:px-1 py-[8px]`}>
                                            {state?.priceNum?.split(",")?.join("") > 0 ?
                                                <input
                                                    type="number"
                                                    name="salePercent"
                                                    placeholder="0"
                                                    className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                    value={state?.salePercent}
                                                    onChange={handleChangePercent}
                                                />
                                                :
                                                <input
                                                    type="number"
                                                    name="salePercent"
                                                    placeholder="0"
                                                    className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                    readOnly
                                                />}
                                            <span className="text-textLightColor ml-1">%</span>
                                        </div>
                                    </div>
                                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                    <div className="w-[60%] md:w-[75%] flex items-center">
                                        <label htmlFor="salePrice3" className={`w-full h-[40px] flex items-center justify-between  ${state?.priceNum?.split(",")?.join("") > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} border border-borderColor px-3 py-[6px] rounded-lg text-xs`}>
                                            <input
                                                type="text"
                                                placeholder="0"
                                                id="salePrice3"
                                                name="salePrice"
                                                className="inputStyle w-[75%] select-none font-AeonikProMedium outline-none bg-transparent"
                                                value={state?.salePrice}
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
                    <div className="w-full h-fit flex items-center justify-end gap-x-5">

                        {colorListForTest?.includes(selectColorID) ?
                            <button onClick={onHandleAddSize} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                                {state?.sendingLoader ?
                                    <ClipLoader
                                        className="h-full py-[2px]"
                                        color={"#007DCA"}
                                        size={40}
                                        loading={true}
                                    /> : "Добавить"}
                            </button>
                            :
                            <button onClick={handleSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                                Готово
                            </button>
                        }
                    </div>
                </div>
            }
            {Number(typeId) === 4 &&
                <div
                    className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
                >
                    <div className="w-full ">
                        {productsDataIdEdit?.colors?.filter(e => e?.id == selectColorID)?.map((data, index) => {
                            return (
                                <div key={index} className={`flex justify-start items-center gap-x-2 px-3 ${data ? "" : "hidden"}`}>
                                    <span className="text-black text-base not-italic font-AeonikProRegular"> Цвет:</span>
                                    <div
                                        key={data?.id}
                                        style={{ background: `${data.hex}` }}
                                        className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${data?.id === 2 ? "border " : ""}`}
                                    >
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-full flex gap-x-10 px-3 pt-5">
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
                                        name="one_size"
                                        className={`inputStyle outline-none w-full text-start h-[40px] ${state?.isCheckValid && !state?.one_size ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-3  rounded-lg   font-AeonikProRegular `}
                                        value={state?.one_size}
                                        onChange={(e) => setState({ ...state, one_size: e.target.value })}
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
                                        name="minFootLength"
                                        className="inputStyle outline-none w-[60px] h-[40px] text-center border border-borderColor px-3  rounded-lg   font-AeonikProRegular "
                                        placeholder="Мин"
                                        value={state?.minFootLength}
                                        onChange={(e) => setState({ ...state, minFootLength: e.target.value })}
                                    />
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        name="maxFootLength"
                                        className="inputStyle outline-none w-[60px] h-[40px] text-center border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                                        placeholder="Макс"
                                        value={state?.maxFootLength}
                                        onChange={(e) => setState({ ...state, maxFootLength: e.target.value })}
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
                                    name="quantityNum"
                                    className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-5  rounded-lg  font-AeonikProRegular `}
                                    value={state?.quantityNum}
                                    onChange={(e) => setState({ ...state, quantityNum: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row px-3 pt-5 gap-x-[11px] md:gap-x-[20px] mb-[15px]">
                        <div className="w-fit flex items-center gap-x-[25px]">
                            <div className="w-fit hidden md:flex flex-col items-start">
                                <div className="flex items-center justify-center  mb-2 ll:mb-[10px]">
                                    <div
                                        className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                        Возраст
                                    </div>
                                </div>
                                <div className="w-fit flex items-center">
                                    <input
                                        type="number"
                                        name="ageNum"
                                        className="inputStyle w-[58px] h-[40px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none "
                                        placeholder=""
                                        value={state?.ageNum}
                                        onChange={(e) => setState({ ...state, ageNum: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-[55%]">
                                <div className="flex items-center mb-2 ll:mb-[10px] ">
                                    <div
                                        className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                        Цена
                                    </div>
                                    <span className="ml-[5px]">
                                        <StarLabel />
                                    </span>
                                </div>
                                <label htmlFor="priceShoes" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.priceNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-3 py-[6px] rounded-lg text-xs `}>
                                    <input
                                        type="text"
                                        id="priceShoes"
                                        placeholder="0"
                                        name="priceNum"
                                        className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                        value={state?.priceNum}
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
                                <div
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                    Скидка
                                </div>

                            </div>
                            <div className="w-full flex items-center justify-center">
                                <div className="w-full flex items-center gap-x-1">
                                    <div className="w-[40%] md:w-[72px] flex items-start">
                                        <div className={`w-full h-10 flex items-center justify-center border border-borderColor ${state?.priceNum?.split(",")?.join("") > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} rounded-lg px-[4px] md:px-1 py-[8px]`}>
                                            {state?.priceNum?.split(",")?.join("") > 0 ?
                                                <input
                                                    type="number"
                                                    name="salePercent"
                                                    placeholder="0"
                                                    className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                    value={state?.salePercent}
                                                    onChange={handleChangePercent}
                                                />
                                                :
                                                <input
                                                    type="number"
                                                    name="salePercent"
                                                    placeholder="0"
                                                    className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                    readOnly
                                                />}
                                            <span className="text-textLightColor ml-1">%</span>
                                        </div>
                                    </div>
                                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                    <div className="w-[60%] md:w-[75%] flex items-center">
                                        <label htmlFor="salePrice4" className={`w-full h-[40px] flex items-center justify-between  ${state?.priceNum?.split(",")?.join("") > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} border border-borderColor px-3 py-[6px] rounded-lg text-xs`}>
                                            <input
                                                type="text"
                                                placeholder="0"
                                                id="salePrice4"
                                                name="salePrice"
                                                className="inputStyle w-[75%] select-none font-AeonikProMedium outline-none bg-transparent"
                                                value={state?.salePrice}
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
                    <div className="w-full h-fit flex items-center justify-end gap-x-5">
                        {colorListForTest?.includes(selectColorID) ?
                            <button onClick={onHandleAddSize} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                                {state?.sendingLoader ?
                                    <ClipLoader
                                        className="h-full py-[2px]"
                                        color={"#007DCA"}
                                        size={40}
                                        loading={true}
                                    /> : "Добавить"}
                            </button>
                            :
                            <button onClick={handleSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                                Готово
                            </button>
                        }
                    </div>
                </div>
            }
            {Number(typeId) === 5 &&
                <div
                    className={`w-full h-fit flex flex-col cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
                >
                    <div className="w-full ">
                        {productsDataIdEdit?.colors?.filter(e => e?.id == selectColorID)?.map((data, index) => {
                            return (
                                <div key={index} className={`flex justify-start items-center gap-x-2 px-3 ${data ? "" : "hidden"}`}>
                                    <span className="text-black text-base not-italic font-AeonikProRegular"> Цвет:</span>
                                    <div
                                        key={data?.id}
                                        style={{ background: `${data.hex}` }}
                                        className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${data?.id === 2 ? "border " : ""}`}
                                    >
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="w-full flex gap-x-10 px-3 pt-5">
                        <div className="w-fit flex flex-col">
                            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                Размер{" "}
                                <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                            </p>
                            <div className="w-[83px] flex items-center justify-between gap-x-1">
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        name="one_size"
                                        className="inputStyle outline-none w-full text-start h-[38px] border border-borderColor px-3 rounded-lg  font-AeonikProRegular "
                                        value={state?.one_size}
                                        onChange={(e) => setState({ ...state, one_size: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-[80%] flex flex-col">
                            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                                Буквенный Размер
                            </p>
                            <div className='w-full '>
                                {/* -----------------Desktop--------------------- */}
                                <div className="w-full hidden md:flex flex-row">
                                    <div className="w-fit w-[222px]  h-[50px] grid grid-cols-4 gap-2 ">
                                        {sizeList.sizeList1.map((data) => {
                                            return (
                                                <div
                                                    key={data?.id}
                                                    className="flex "
                                                >

                                                    {data?.action &&
                                                        <label
                                                            htmlFor={data?.id}
                                                            className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={data?.id}
                                                                name="size_Outwear"
                                                                checked={data?.id === state?.selected}
                                                                onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                                value={data?.name}
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
                                    <div className={`w-fit w-[222px]  h-[50px] grid grid-cols-4  gap-2 ${decraseList ? "" : "items-end"} `}>
                                        {decraseList && sizeList.sizeList2.map((data) => {
                                            return (
                                                <div
                                                    key={data?.id}
                                                    className="flex "
                                                >

                                                    {data?.action &&

                                                        <label
                                                            htmlFor="m_outwear"
                                                            className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id="m_outwear"
                                                                name="size_Outwear"
                                                                checked={data?.id === state?.selected}
                                                                onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                                value={data?.name}
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
                                                            htmlFor={data?.id}
                                                            className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={data?.id}
                                                                name="size_Outwear"
                                                                checked={data?.id === state?.selected}
                                                                onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                                value={data?.name}
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
                                                            htmlFor={data?.id}
                                                            className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                id={data?.id}
                                                                name="size_Outwear"
                                                                checked={data?.id === state?.selected}
                                                                onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                                value={data?.name}
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
                    </div>
                    <div className="w-full flex gap-x-10 px-3 pt-5">
                        <div className="w-[20%] flex flex-col">
                            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                Длина
                                <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                            </p>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        name="colSize"
                                        className="inputStyle outline-none w-full h-[40px] text-start border border-borderColor px-3 rounded-lg   font-AeonikProRegular "
                                        value={state?.colSize}
                                        onChange={(e) => setState({ ...state, colSize: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-[20%] flex flex-col">
                            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                Ширина
                            </p>
                            <div className="flex items-center justify-between gap-x-1">
                                <div className="flex flex-col">
                                    <input
                                        type="number"
                                        name="rowSize"
                                        className="inputStyle outline-none w-full h-[40px] text-start border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                                        value={state?.rowSize}
                                        onChange={(e) => setState({ ...state, rowSize: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-[60%] flex flex-col ml-auto">
                            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                Количество
                                <span className="ml-[5px]">
                                    <StarLabel />
                                </span>
                            </p>

                            <div className="flex items-start justify-between ">
                                <input
                                    type="number"
                                    name="quantityNum"
                                    className={`inputStyle outline-none w-[60px] h-[40px] text-center  ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}     px-3  rounded-lg  font-AeonikProRegular `}
                                    value={state?.quantityNum}
                                    onChange={(e) => setState({ ...state, quantityNum: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-row px-3 pt-5 gap-x-[11px] md:gap-x-[20px] mb-[15px]">
                        <div className="w-[45%] flex items-center gap-x-[25px]">
                            <div className="w-fit hidden md:flex flex-col items-start">
                                <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                                    <div
                                        className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                                        Возраст
                                    </div>
                                </div>
                                <div className="w-fit flex items-center">
                                    <input
                                        type="number"
                                        className="inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px] outline-none "
                                        placeholder=""
                                        name="ageNum"
                                        value={state?.ageNum}
                                        onChange={(e) => setState({ ...state, ageNum: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-[55%]">
                                <div className="flex items-center mb-2 ll:mb-[10px] ">
                                    <div
                                        className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                        Цена
                                    </div>
                                    <span className="ml-[5px]">
                                        <StarLabel />
                                    </span>
                                </div>
                                <label htmlFor="priceAccess" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.priceNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}    px-3 py-[6px] rounded-lg text-xs`}>
                                    <input
                                        type="text"
                                        placeholder="0"
                                        id="priceAccess"
                                        name="priceNum"
                                        className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                        value={state?.priceNum}
                                        onChange={handleChangePrice}
                                    />
                                    <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                        сум
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div className="w-[40%] flex flex-col items-start">
                            <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                                <div
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                                    Скидка
                                </div>

                            </div>
                            <div className="w-full flex items-center justify-center">
                                <div className="w-full flex items-center gap-x-1">
                                    <div className="w-[40%] md:w-[72px] flex items-start">
                                        <div className={`w-full h-10 flex items-center justify-center border border-borderColor ${state?.priceNum?.split(",")?.join("") > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} rounded-lg px-[4px] md:px-1 py-[8px]`}>
                                            {state?.priceNum?.split(",")?.join("") > 0 ?
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    name="salePercent"
                                                    className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                    value={state?.salePercent}
                                                    onChange={handleChangePercent}
                                                />
                                                :
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    name="salePercent"
                                                    className="inputStyle w-[70%] bg-transparent font-AeonikProMedium text-center outline-none flex items-center justify-center mx-auto"
                                                    readOnly
                                                />}
                                            <span className="text-textLightColor ml-1">%</span>
                                        </div>
                                    </div>
                                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                    <div className="w-[60%] md:w-[75%] flex items-center">
                                        <label htmlFor="salePrice5" className={`w-full h-[40px] flex items-center justify-between  ${state?.priceNum?.split(",")?.join("") > 0 ? "bg-white cursor-pointer" : "bg-[#f5f5f5] cursor-not-allowed"} border border-borderColor px-3 py-[6px] rounded-lg text-xs`}>
                                            <input
                                                type="text"
                                                placeholder="0"
                                                id="salePrice5"
                                                name="salePrice"
                                                className="inputStyle w-[75%] select-none font-AeonikProMedium outline-none bg-transparent"
                                                value={state?.salePrice}
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
                    <div className="w-full h-fit  flex items-center justify-end gap-x-5">

                        {colorListForTest?.includes(selectColorID) ?
                            <button onClick={onHandleAddSize} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                                {state?.sendingLoader ?
                                    <ClipLoader
                                        className="h-full py-[2px]"
                                        color={"#007DCA"}
                                        size={40}
                                        loading={true}
                                    /> : "Добавить"}
                            </button>
                            :
                            <button onClick={handleSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                                Готово
                            </button>
                        }
                    </div>
                </div>
            }
        </div>
    );
    return (
        <Popover
            open={toggleShow}
            onOpenChange={handleOpenPopver}
            className={`text-textBlueColor focus:bg-textBlueColor focus:text-white hover:bg-textBlueColor hover:text-white 
                    group px-[15px] h-[38px]   select-none font-AeonikProMedium flex items-center justify-center text-sm cursor-pointer rounded-lg transition duration-300
                    `}
            trigger="click"
            options={["Hide"]}
            placement="bottom"
            content={AddSize}
        >
            <span>Добавить размер</span>
        </Popover>
    );
}
export default React.memo(AddSize)
