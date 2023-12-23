import React, { useContext, useEffect, useState } from "react";
import { DeleteIcon, MenuCloseIcons, StarLabel } from "../../../../../../assets/icons";
import { List, Popover, Select, Switch } from "antd";
import { dressMainData } from "../../../../../../hook/ContextTeam";
import { Checkbox, Col, Row } from 'antd';
import { BiPlus } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
const url = "https://api.dressme.uz/api/seller";
function OutWearAdd({ stateList, colorsList, ColorModal, addNewColor, DeleteSize, onRefetch, onDeleteId, checkColor, pivotColorId, handleGetSizeCheckedList }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [state, setState] = useState({
        minBreast: null,
        maxBreast: null,
        minSize: null,
        maxSize: null,
        minWaist: null,
        maxWaist: null,
        minHips: null,
        maxHips: null,
        quantityNum: null,
        ageNum: null,
        priceNum: null,
        salePercent: null,
        salePrice: null,
        maxSizeShow: false,
        sizeListCheck: null,
        selected: null,
        isCheckValid: false,
        // ------
        onConcel: false,
        toggleShow: false,
        // ---save
        saveBtnDisable: false,
        // Size Edit Modal
        sizeEditModal: false,
        sendingLoader: false,
        editSizeId: null,

    })
    const [getSizesIds, setGetSizesIds] = useState([]);

    const [checked, setChecked] = useState([]);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);
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

    const SelectedNumber = 2
    useEffect(() => {
        if (state?.salePercent > 0) {
            const sale = state?.priceNum?.split(",")?.join("") * (100 - state?.salePercent) / 100
            const formattedValue = parseInt(sale).toLocaleString()
            setState({ ...state, salePrice: formattedValue })
        } else {
            setState({ ...state, salePrice: '' })
        }
    }, [state?.salePercent, state?.priceNum])

    function saveEditData() {
        setState({ ...state, sendingLoader: true })
        let form = new FormData();
        state?.sizeListCheck && form.append("outwear_letter_size", state?.sizeListCheck);
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
        form.append("min_outwear_size", state?.minSize);
        form.append("amount", state?.quantityNum);
        form.append("price", state?.priceNum?.split(",")?.join(""));
        form.append("shop_location_id", stateList?.locations[0]?.pivot?.shop_location_id);
        form.append("color_id", pivotColorId);
        form.append("product_id", Number(stateList?.locations[0]?.pivot?.product_id));
        return fetch(`${url}/products/${state?.editSizeId}/update-product-size`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
            },
            body: form,
        })
            .then(res => res?.json())
            .then(res => {
                if (res?.errors && res?.message) {
                    toast.error(`${res?.message}`, {
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
                    setState({ ...state, sendingLoader: false, sizeEditModal: false })
                } else if (res?.message) {
                    toast.success(`${res?.message}`, {
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
                    setState({ ...state, sendingLoader: false, sizeEditModal: false })
                } onRefetch()
            })
            .catch(err => {
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
                setState({ ...state, sendingLoader: false, sizeEditModal: false })
                throw new Error(err?.message || "something wrong");
            })


    }

    useEffect(() => {
        setState({
            ...state,
            quantityNum: stateList?.amount || null,
            priceNum: Number(stateList?.price)?.toLocaleString(),
            minBreast: stateList?.min_chest_girth || null,
            maxBreast: stateList?.max_chest_girth || null,
            minSize: stateList?.min_wear_size || null,
            maxSize: stateList?.max_wear_size || null,
            minWaist: stateList?.min_waist_girth || null,
            maxWaist: stateList?.max_waist_girth || null,
            minHips: stateList?.min_hip_girth || null,
            maxHips: stateList?.max_hip_girth || null,
            ageNum: stateList?.age || null,
            salePercent: stateList?.discount_percent || null,
            salePrice: stateList?.discount_price || null,
            sizeListCheck: stateList?.letter_size || null,
            productColorId: null,
            saveBtnDisable: false
        })
        stateList?.sizes?.filter(e => e?.id == state?.editSizeId)?.map(data => {
            setState({
                ...state,
                quantityNum: data?.amount || null,
                priceNum: Number(data?.price)?.toLocaleString(),
                minBreast: data?.min_chest_girth || null,
                maxBreast: data?.max_chest_girth || null,
                minSize: data?.min_wear_size || null,
                maxSize: data?.max_wear_size || null,
                minWaist: data?.min_waist_girth || null,
                maxWaist: data?.max_waist_girth || null,
                minHips: data?.min_hip_girth || null,
                maxHips: data?.max_hip_girth || null,
                ageNum: data?.age || null,
                salePercent: data?.discount_percent || null,
                salePrice: data?.discount_price || null,
                sizeListCheck: data?.letter_size || null,
                productColorId: data?.product_color_id || null,
            })
        })

    }, [state?.editSizeId, checkColor])

    const handleChangePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')
        const sanitizedValue = result.replace(/,/g, '');
        const formattedValue = Number(sanitizedValue).toLocaleString()
        setState({ ...state, priceNum: formattedValue, saveBtnDisable: true });
    };
    const handleChangeSalePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')
        const sanitizedValue = result.replace(/,/g, '');
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
        setGetSizesIds([])
        stateList?.sizes?.filter(e => e?.product_color_id == checkColor)?.map(item => {
            setGetSizesIds(getSizesIds => [...getSizesIds, item?.id])
        })
    }, [checkColor])
    useEffect(() => {
        if (stateList?.sizes?.length) {
            setIndeterminate(checked.length && checked.length !== getSizesIds?.length);
            setCheckAll(checked.length === getSizesIds?.length);
            handleGetSizeCheckedList(checked)
        }
    }, [checked]);

    const onCheckAllChange = (e) => {
        setChecked(e.target.checked ? stateList?.sizes?.filter(e => e?.product_color_id == checkColor)?.map((item) => item.id) : []);
        setCheckAll(e.target.checked);
    };
    useEffect(() => {
        setChecked([])
        setIndeterminate(false)
        setCheckAll(false)
    }, [checkColor])
    return (
        <div className={`w-full ${SelectedNumber == stateList?.category_id ? "" : "hidden"}  h-fitoverflow-hidden  my-2`}>
            <div>
                <section
                    onClick={() => {
                        setState({ ...state, sizeEditModal: false })
                    }}
                    className={`fixed inset-0 z-[222] duration-200 w-full h-[100vh] bg-black opacity-50 ${state?.sizeEditModal ? "" : "hidden"}`}
                ></section>
                <section
                    className={` max-w-[780px]  mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-2 py-3 rounded-t-lg md:rounded-b-lg z-[223] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.sizeEditModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"}`}>
                    <div className="flex justify-end">

                        <button
                            type="button"
                            onClick={() => setState({ ...state, sizeEditModal: false })}
                        // className="absolute border right-3 top-3 w-5 h-5 "
                        >
                            <MenuCloseIcons
                                className="w-full h-full "
                                colors={"#b2b2b2"} />
                        </button>
                    </div>
                    <div
                        className={`w-full h-fit flex flex-col items-center justify-center   rounded-lg  not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
                    >
                        <div className="relative w-full flex  gap-x-10 px-3 pt-5">
                            <div className="w-[20%] flex flex-col">
                                <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                    Обхват Груди
                                    <span className="text-sm text-textLightColor ml-[6px]">(см)</span>

                                </p>
                                <div className="flex items-center">
                                    <div className="flex flex-col">
                                        <input
                                            type="number"
                                            className={`inputStyle outline-none w-[60px] text-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg  font-AeonikProRegular `}
                                            placeholder="Мин"
                                            value={state?.minBreast}
                                            onChange={(e) => setState({ ...state, minBreast: e.target.value, saveBtnDisable: true })}
                                        />
                                    </div>
                                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                    <div className="flex flex-col">
                                        <input
                                            type="number"
                                            className={`inputStyle outline-none w-[60px] text-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg font-AeonikProRegular `}
                                            placeholder="Макс"
                                            value={state?.maxBreast}
                                            onChange={(e) => setState({ ...state, maxBreast: e.target.value, saveBtnDisable: true })}
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
                                            className={`inputStyle outline-none w-[60px] text-center h-[38px]  ${state?.isCheckValid && !state?.minSize ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3  rounded-lg font-AeonikProRegular `}
                                            placeholder="Мин"
                                            value={state?.minSize}
                                            onChange={(e) => setState({ ...state, minSize: e.target.value, saveBtnDisable: true })}
                                        />
                                    </div>
                                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                    <div className="flex flex-col">
                                        {state?.maxSizeShow || state?.maxSize ? <input
                                            type="number"
                                            className={`inputStyle outline-none w-[60px] text-center h-[38px] border border-borderColor bg-white px-3  rounded-lg font-AeonikProRegular `}
                                            placeholder="Макс"
                                            value={state?.maxSize}
                                            onChange={(e) => setState({ ...state, maxSize: e.target.value, saveBtnDisable: true })}
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
                                                                    checked={data?.name === state?.sizeListCheck}
                                                                    onChange={() => setState({ ...state, sizeListCheck: data?.name, sizeListCheck: data?.name, saveBtnDisable: true })}
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
                                                                    checked={data?.name === state?.sizeListCheck}
                                                                    onChange={() => setState({ ...state, sizeListCheck: data?.name, sizeListCheck: data?.name, saveBtnDisable: true })}
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
                                                                    checked={data?.name === state?.sizeListCheck}
                                                                    onChange={() => setState({ ...state, sizeListCheck: data?.name, sizeListCheck: data?.name, saveBtnDisable: true })}
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
                                                                    checked={data?.name === state?.sizeListCheck}
                                                                    onChange={() => setState({ ...state, sizeListCheck: data?.name, sizeListCheck: data?.name, saveBtnDisable: true })}
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
                                </p>
                                <div className="flex items-center">
                                    <div className="flex flex-col">
                                        <input
                                            type="number"
                                            className={`inputStyle outline-none w-[60px] h-[38px]  text-center border border-borderColor bg-white px-2 md:px-3  rounded-lg   font-AeonikProRegular `}
                                            placeholder="Мин"
                                            value={state?.minWaist}
                                            onChange={(e) => setState({ ...state, minWaist: e.target.value, saveBtnDisable: true })}

                                        />
                                    </div>
                                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                    <div className="flex flex-col">
                                        <input
                                            type="number"
                                            className={`inputStyle outline-none w-[60px] h-[38px]  text-center border border-borderColor bg-white px-2 md:px-3  rounded-lg  font-AeonikProRegular `}
                                            placeholder="Макс"
                                            value={state?.maxWaist}
                                            onChange={(e) => setState({ ...state, maxWaist: e.target.value, saveBtnDisable: true })}

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
                                            className="inputStyle outline-none w-[60px] h-[38px]  text-center border border-borderColor px-2 md:px-3  rounded-lg   font-AeonikProRegular "
                                            placeholder="Мин"
                                            value={state?.minHips}
                                            onChange={(e) => setState({ ...state, minHips: e.target.value, saveBtnDisable: true })}
                                        />
                                    </div>
                                    <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                    <div className="flex flex-col">
                                        <input
                                            type="number"
                                            className="inputStyle outline-none w-[60px] h-[38px] text-center border border-borderColor px-2 md:px-3  rounded-lg  font-AeonikProRegular "
                                            placeholder="Макс"
                                            value={state?.maxHips}
                                            onChange={(e) => setState({ ...state, maxHips: e.target.value, saveBtnDisable: true })}
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
                                        className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-2 text-center  rounded-lg  font-AeonikProRegular `}
                                        value={state?.quantityNum}
                                        onChange={(e) => setState({ ...state, quantityNum: e.target.value, saveBtnDisable: true })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-row px-3 gap-x-[11px] md:pt-5 md:gap-x-[20px] mb-[15px]">
                            <div className="w-fit flex items-center gap-x-[25px]">
                                <div className="w-fit hidden md:flex flex-col items-start">
                                    <div className="flex items-center justify-center ">
                                        <label
                                            htmlFor=""
                                            className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                            Возраст
                                        </label>
                                        {/* <span className="ml-[5px]">
              <StarLabel />
            </span> */}
                                    </div>
                                    <div className="w-fit flex items-center">
                                        <input
                                            type="number"
                                            className="inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg   outline-none"
                                            placeholder=""
                                            value={state?.ageNum}
                                            onChange={(e) => setState({ ...state, ageNum: e.target.value, saveBtnDisable: true })}
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
                                    <label
                                        htmlFor=""
                                        className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">

                                        Скидка
                                    </label>

                                </div>
                                <div className="w-full flex items-center justify-center">
                                    <div className="w-full flex items-center gap-x-1">
                                        <div className="w-[40%] md:w-[72px] flex items-start">
                                            <div className="w-full h-10 flex items-center  justify-center bg-white border border-borderColor rounded-lg px-[10px] md:px-3 py-[8px]">
                                                <input
                                                    type="number"
                                                    placeholder="0"
                                                    className="inputStyle w-[70%] font-AeonikProMedium text-center outline-none "
                                                    value={state?.salePercent}
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
                            <div className="w-full h-fit  flex items-center justify-between px-3">
                                <span className="text-gray-800 text-base flex items-center not-italic font-AeonikProRegular">
                                    Цвет:
                                    {colorsList.filter(e => e?.pivot?.id == state?.productColorId)?.map((data) => {
                                        return (
                                            <div key={data?.id} style={{ background: `${data.hex}` }}
                                                className={`border border-black ${Number(data?.id) === 2 ? "border border-black text-black" : "text-white"} rounded-[15px] ml-3  px-[15px]  whitespace-nowrap flex items-center justify-center text-[14px] ll:text-md  not-italic font-AeonikProRegular`}
                                            >
                                                <span >{data?.name_ru} </span>
                                            </div>
                                        );
                                    })}
                                </span>
                                {state?.saveBtnDisable ?
                                    <button
                                        onClick={() => saveEditData()}
                                        type="button"
                                        className={`w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-textBlueColor  px-3 py-2 font-AeonikProMedium pr-1`}>
                                        {state?.sendingLoader ?
                                            <ClipLoader
                                                className="h-full py-[2px]"
                                                color={"#007DCA"}
                                                size={40}
                                                loading={true}
                                            /> : "Сохранить"}
                                    </button> :
                                    <button
                                        type="button"
                                        className={`w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-[#b5b5b5]  px-3 py-2 font-AeonikProMedium pr-1`}>
                                        Сохранить
                                    </button>
                                }
                            </div>
                        </div>
                    </div >

                </section>
            </div>
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
                    <button type="button" onClick={ColorModal} className="text-textBlueColor flex items-center gap-x-1 hover:underline text-base not-italic font-AeonikProMedium">
                        <span> Добавить к цвету</span>
                        <div
                            style={{ background: `${addNewColor.hex}` }}
                            className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${addNewColor?.id === 2 ? "border " : ""}`}
                        >
                        </div>                                     </button>
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
                                <List.Item className="w-full " >
                                    <div className="flex items-center gap-x-1">
                                        <div className="flex items-center h-full">
                                            <Checkbox value={item?.id} checked={checked} />
                                        </div>
                                        <div
                                            className={`w-full h-fit flex flex-col items-center justify-center border border-borderColor  rounded-lg  not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
                                        >
                                            <div className="relative w-full flex  gap-x-10 px-3 pt-5">
                                                <div className="w-[20%] flex flex-col">
                                                    <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                                        Обхват Груди
                                                        <span className="text-sm text-textLightColor ml-[6px]">(см)</span>

                                                    </p>
                                                    <div className="flex items-center">
                                                        <div className="flex flex-col">
                                                            <input
                                                                type="number"
                                                                className={`inputStyle  cursor-default outline-none w-[60px] text-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg  font-AeonikProRegular `}
                                                                placeholder="Мин"
                                                                value={item?.min_chest_girth}
                                                                onChange={(e) => setState({ ...state, minBreast: e.target.value, saveBtnDisable: true })}
                                                            />
                                                        </div>
                                                        <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                                        <div className="flex flex-col">
                                                            <input
                                                                type="number"
                                                                className={`inputStyle  cursor-default outline-none w-[60px] text-center h-[38px]  border border-borderColor bg-white  px-3  rounded-lg font-AeonikProRegular `}
                                                                placeholder="Макс"
                                                                value={item?.max_chest_girth}
                                                                onChange={(e) => setState({ ...state, maxBreast: e.target.value, saveBtnDisable: true })}
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
                                                                className={`inputStyle  cursor-default outline-none w-[60px] text-center h-[38px]  ${state?.isCheckValid && !state?.minSize ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3  rounded-lg font-AeonikProRegular `}
                                                                placeholder="Мин"
                                                                value={item?.min_wear_size}
                                                                onChange={(e) => setState({ ...state, minSize: e.target.value, saveBtnDisable: true })}
                                                            />
                                                        </div>
                                                        <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                                        <div className="flex flex-col">
                                                            {state?.maxSizeShow || item?.max_wear_size ? <input
                                                                type="number"
                                                                className={`inputStyle  cursor-default outline-none w-[60px] text-center h-[38px] border border-borderColor bg-white px-3  rounded-lg font-AeonikProRegular `}
                                                                placeholder="Макс"
                                                                value={item?.max_wear_size}
                                                                onChange={(e) => setState({ ...state, maxSize: e.target.value, saveBtnDisable: true })}
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
                                                                                        checked={data?.name === item?.letter_size}
                                                                                        onChange={() => setState({ ...state, sizeListCheck: data?.name, sizeListCheck: data?.name, saveBtnDisable: true })}
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
                                                                                        checked={data?.name === item?.letter_size}
                                                                                        onChange={() => setState({ ...state, sizeListCheck: data?.name, sizeListCheck: data?.name, saveBtnDisable: true })}
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
                                                                                        checked={data?.name === item?.letter_size}
                                                                                        onChange={() => setState({ ...state, sizeListCheck: data?.name, sizeListCheck: data?.name, saveBtnDisable: true })}
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
                                                                                        checked={data?.name === item?.letter_size}
                                                                                        onChange={() => setState({ ...state, sizeListCheck: data?.name, sizeListCheck: data?.name, saveBtnDisable: true })}
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
                                                <div onClick={() => {
                                                    DeleteSize()
                                                    onDeleteId()
                                                }
                                                }
                                                    className="absolute right-2 cursor-pointer active:scale-95	active:opacity-70 text-[#a2a2a2] hover:text-textRedColor transition-colors duration-[0.2s] ease-linear">
                                                    <DeleteIcon width={30} />
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
                                                                className={`inputStyle  cursor-default outline-none w-[60px] h-[38px]  text-center border border-borderColor bg-white px-2 md:px-3  rounded-lg   font-AeonikProRegular `}
                                                                placeholder="Мин"
                                                                value={item?.min_waist_girth}
                                                                onChange={(e) => setState({ ...state, minWaist: e.target.value, saveBtnDisable: true })}

                                                            />
                                                        </div>
                                                        <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                                        <div className="flex flex-col">
                                                            <input
                                                                type="number"
                                                                className={`inputStyle  cursor-default outline-none w-[60px] h-[38px]  text-center border border-borderColor bg-white px-2 md:px-3  rounded-lg  font-AeonikProRegular `}
                                                                placeholder="Макс"
                                                                value={item?.max_waist_girth}
                                                                onChange={(e) => setState({ ...state, maxWaist: e.target.value, saveBtnDisable: true })}

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
                                                                className="inputStyle  cursor-default outline-none w-[60px] h-[38px]  text-center border border-borderColor px-2 md:px-3  rounded-lg   font-AeonikProRegular "
                                                                placeholder="Мин"
                                                                value={item?.min_hip_girth}
                                                                onChange={(e) => setState({ ...state, minHips: e.target.value, saveBtnDisable: true })}
                                                            />
                                                        </div>
                                                        <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                                        <div className="flex flex-col">
                                                            <input
                                                                type="number"
                                                                className="inputStyle  cursor-default outline-none w-[60px] h-[38px] text-center border border-borderColor px-2 md:px-3  rounded-lg  font-AeonikProRegular "
                                                                placeholder="Макс"
                                                                value={item?.max_hip_girth}
                                                                onChange={(e) => setState({ ...state, maxHips: e.target.value, saveBtnDisable: true })}
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
                                                            className={`inputStyle  cursor-default outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-2 text-center  rounded-lg  font-AeonikProRegular `}
                                                            value={item?.amount}
                                                            onChange={(e) => setState({ ...state, quantityNum: e.target.value, saveBtnDisable: true })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-row px-3 gap-x-[11px] md:pt-5 md:gap-x-[20px] mb-[15px]">
                                                <div className="w-fit flex items-center gap-x-[25px]">
                                                    <div className="w-fit hidden md:flex flex-col items-start">
                                                        <div className="flex items-center justify-center ">
                                                            <label
                                                                htmlFor=""
                                                                className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                                                                Возраст
                                                            </label>
                                                            {/* <span className="ml-[5px]">
              <StarLabel />
            </span> */}
                                                        </div>
                                                        <div className="w-fit flex items-center">
                                                            <input
                                                                type="number"
                                                                className="inputStyle  cursor-default w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg   outline-none"
                                                                placeholder=""
                                                                value={item?.age}
                                                                onChange={(e) => setState({ ...state, ageNum: e.target.value, saveBtnDisable: true })}
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
                                                                className="inputStyle  cursor-default w-[70%] font-AeonikProMedium outline-none bg-transparent "
                                                                value={Number(item?.price)?.toLocaleString()}
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
                                                            className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">

                                                            Скидка
                                                        </label>

                                                    </div>
                                                    <div className="w-full flex items-center justify-center">
                                                        <div className="w-full flex items-center gap-x-1">
                                                            <div className="w-[40%] md:w-[72px] flex items-start">
                                                                <div className="w-full h-10 flex items-center  justify-center bg-white border border-borderColor rounded-lg px-[4px] md:px-[6px] py-[8px]">
                                                                    <input
                                                                        type="number"
                                                                        placeholder="0"
                                                                        className="inputStyle  cursor-default w-[70%] font-AeonikProMedium text-center outline-none "
                                                                        value={item?.discount_percent}
                                                                        onChange={handleChangePercent}
                                                                    />
                                                                    <span className="text-textLightColor ml-1">%</span>
                                                                </div>
                                                            </div>
                                                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                                            <div className="w-[60%] md:w-[75%] flex items-center">
                                                                <label htmlFor="salePrice" className="w-full h-[40px] flex items-center justify-between bg-white border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="0"
                                                                        id="salePrice"
                                                                        className="inputStyle  cursor-default w-[75%] select-none font-AeonikProMedium outline-none bg-transparent"
                                                                        value={Number(item?.discount_price)?.toLocaleString()}
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
                                                        onClick={() => {
                                                            setState({ ...state, sizeEditModal: true, editSizeId: item?.id })
                                                        }
                                                        }
                                                        className={`w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg  text-textBlueColor  px-3 py-2 font-AeonikProMedium pr-1`}>
                                                        Изменить
                                                    </button>
                                                </div>
                                            </div>
                                        </div >
                                    </div >
                                </List.Item>
                            )
                        })}
                    </List>
                </Checkbox.Group>
            </div>


        </div >
    );
}
export default React.memo(OutWearAdd)
