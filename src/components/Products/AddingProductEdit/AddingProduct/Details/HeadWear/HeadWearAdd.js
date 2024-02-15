import React, { useContext, useEffect, useState } from "react";
import AllSizeListForWear from "../../../../../../hook/AllSizeListForWear/AllSizeListForWear";
import { DeleteIcon, LineIcon, MenuCloseIcons, StarLabel } from "../../../../../../assets/icons";
import { Checkbox, List, Popover, Select, Switch } from "antd";
import { dressMainData } from "../../../../../../hook/ContextTeam";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { BiCheck } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import { HelperData } from "../../../../../../hook/HelperDataStore";
const url = "https://api.dressme.uz/api/seller";
function HeadWearAdd({ stateList, colorsList, ColorModal, onClick, DeleteSize, addNewColor, onRefetch, onDeleteId, checkColor, pivotColorId, handleGetSizeCheckedList }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [helperDatainform, setHelperDatainform] = useContext(HelperData);

    const [state, setState] = useState({
        minHeadGirth: null,
        maxHeadGirth: null,
        sizeCheck: false,
        amount: null,
        age: null,
        price: null,
        discountPercent: 0,
        discountPrice: null,
        isCheckValid: false,
        productColorId: null,
        // ---save
        saveBtnDisable: false,
        successChanged: false,
        successMessage: '',
        errorMessage: '',
        // Size Delete Modal
        sizeDeleteModal: false,
        // Size Edit Modal
        sizeEditModal: false,
        sendingLoader: false,
        editSizeId: null,
        addnewColorIdIcons: null,
        disableSizes: null,
    })
    const [getSizesIds, setGetSizesIds] = useState([]);

    const [checked, setChecked] = useState([]);
    const [indeterminate, setIndeterminate] = useState(false);
    const [checkAll, setCheckAll] = useState(false);

    const SelectedNumber = 1
    useEffect(() => {
        if (state?.discountPercent > 0) {
            const sale = state?.price?.split(",")?.join("") * (100 - state?.discountPercent) / 100
            const formattedValue = parseInt(sale).toLocaleString()
            setState({ ...state, discountPrice: formattedValue })
        } else {
            setState({ ...state, discountPrice: 0 })
        }
    }, [state?.discountPercent, state?.price])

    const onChangeSwitch = (id) => {
        setState({ ...state, sizeCheck: id, saveBtnDisable: true, disableSizes: 0 })
    };

    function saveEditData() {
        setState({ ...state, sendingLoader: true })
        let form = new FormData();
        form.append("one_size", state?.sizeCheck ? 1 : 0);
        state?.minHeadGirth && form.append("min_head_girth", state?.minHeadGirth);
        state?.maxHeadGirth && form.append("max_head_girth", state?.maxHeadGirth);
        state?.disableSizes === 1 && state?.discountPercent?.length > 0 && form.append("discount_percent", state?.discountPercent);
        state?.disableSizes === 1 && state?.discountPercent?.length === 0 && form.append("discount_percent", 0);
        state?.disableSizes === 1 && (state?.discountPercent?.length === 0 || Number(state?.discountPercent) === 0) && form.append("discount_price", 0);
        state?.disableSizes === 1 && state?.discountPercent > 0 && form.append("discount_price", state?.discountPrice?.split(",")?.join(""));
        state?.disableSizes === 3 && state?.age && form.append("age", Number(state?.age));
        state?.disableSizes === 2 && form.append("amount", state?.amount);
        state?.disableSizes === 1 && form.append("price", state?.price?.split(",")?.join(""));
        form.append("shop_location_id", stateList?.shop_locations[0]?.pivot?.shop_location_id);
        form.append("color_id", pivotColorId);
        form.append("product_id", Number(stateList?.shop_locations[0]?.pivot?.product_id));

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
                    setState({ ...state, sendingLoader: false, errorMessage: res?.message, successChanged: true })
                    setTimeout(() => {
                        setState({ ...state, sizeEditModal: false, errorMessage: '', successChanged: false })
                    }, 3000);
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
                    setState({ ...state, sendingLoader: false, successChanged: true, successMessage: res?.message })
                    setTimeout(() => {
                        setState({ ...state, sizeEditModal: false, successChanged: false, successMessage: null })
                    }, 1000);
                    onRefetch()
                }
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
            minHeadGirth: null,
            maxHeadGirth: null,
            sizeCheck: null,
            amount: null,
            age: null,
            price: null,
            discountPercent: null,
            discountPrice: null,
            productColorId: null,
            saveBtnDisable: false
        })
        stateList?.sizes?.filter(e => Number(e?.id) === state?.editSizeId)?.map(data => {
            setState({
                ...state,
                minHeadGirth: data?.min_head_girth || null,
                maxHeadGirth: data?.max_head_girth || null,
                sizeCheck: Number(data?.one_size) || null,
                amount: data?.amount || null,
                age: data?.age || null,
                price: Number(data?.price)?.toLocaleString(),
                discountPercent: data?.discount_percent || null,
                discountPrice: data?.discount_price || null,
                productColorId: data?.product_color_id || null,
            })
        })
    }, [state?.editSizeId, checkColor])

    const handleChangePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')
        const sanitizedValue = result.replace(/,/g, '');
        const formattedValue = Number(sanitizedValue).toLocaleString()
        setState({ ...state, price: formattedValue, saveBtnDisable: true, disableSizes: 1 });
    };
    const handleChangeSalePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')
        const sanitizedValue = result.replace(/,/g, '');
        const formattedValue = Number(sanitizedValue).toLocaleString()
        setState({ ...state, discountPrice: formattedValue, saveBtnDisable: true, disableSizes: 1 });
    };
    const handleChangePercent = (event) => {
        const { value } = event.target
        console.log(value, 'value');
        if (value >= 0 && value < 100) {
            setState({ ...state, discountPercent: value, saveBtnDisable: true, disableSizes: 1 });
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
            handleGetSizeCheckedList(checked, state?.addnewColorIdIcons)
        }
    }, [checked, state?.addnewColorIdIcons]);

    const onCheckAllChange = (e) => {
        setChecked(e.target.checked ? stateList?.sizes?.filter(e => e?.product_color_id == checkColor)?.map((item) => item.id) : []);
        setCheckAll(e.target.checked);
    };
    useEffect(() => {
        setChecked([])
        setIndeterminate(false)
        setCheckAll(false)
    }, [checkColor])

    function sendCheckListItem(id) {
        console.log(id, "bucolorId");
        if (state?.addnewColorIdIcons) {
            setState({ ...state, addnewColorIdIcons: null })
        }
        if (!state?.addnewColorIdIcons) {
            setState({ ...state, addnewColorIdIcons: id })
            setTimeout(() => {
                onClick()
            }, 1000);
        }
    }

    // console.log(state?.discountPercentstate?.sizeCheck, 'stateList   --------------');
    return (
        <div className={`w-full ${SelectedNumber == stateList?.category_id ? "" : "hidden"}  h-fit overflow-hidden  my-2`}>
            <div>
                <section
                    onClick={() => {
                        setState({ ...state, sizeEditModal: false, successChanged: false, editSizeId: null, errorMessage: '', successMessage: '' })
                    }}
                    className={`fixed inset-0 z-[222] duration-200 w-full h-[100vh] bg-black opacity-50 ${state?.sizeEditModal ? "" : "hidden"}`}
                ></section>
                <section
                    className={` max-w-[780px]  mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-2 py-3 rounded-t-lg md:rounded-b-lg z-[223] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.sizeEditModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"}`}>
                    <div className="flex justify-end">

                        <button
                            type="button"
                            onClick={() => setState({ ...state, sizeEditModal: false, successChanged: false, editSizeId: null, errorMessage: '', successMessage: '' })}
                        >
                            <MenuCloseIcons
                                className="w-full h-full "
                                colors={"#b2b2b2"} />
                        </button>
                    </div>
                    {state?.successChanged ?
                        <div className="w-full h-[290px] flex flex-col items-center justify-center">
                            {state?.errorMessage ?
                                <span className="flex flex-col items-center justify-center p-2">
                                    <span className="text-2xl not-italic font-AeonikProMedium">{state?.errorMessage}</span>
                                    <MdError size={45} color="#FF4343" />
                                </span>
                                :
                                <div className="flex flex-col items-center justify-center">
                                    <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                                        <FaCheck size={35} color="#009B17" /></span>
                                    <span className="text-2xl mt-2 not-italic font-AeonikProMedium">{state?.successMessage}</span>
                                </div>
                            }
                        </div>
                        :
                        <div
                            className={`w-full h-fit flex flex-col items-center justify-center   rounded-lg  not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
                        >
                            <div className="relative w-full flex justify-start px-3  gap-x-10  pt-5 ">
                                <div className="w-fit flex flex-col">
                                    <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">

                                        Обхват головы
                                        <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                                    </p>
                                    <div className="w-full flex items-center mt-[10px] ">
                                        <div className="flex flex-col border border-borderColor rounded-lg">
                                            {state?.disableSizes === 1 || state?.disableSizes === 2 || state?.disableSizes === 3 ?
                                                <span
                                                    className={`inputStyle w-[55px] flex items-center justify-center h-[38px] opacity-20 text-center  bg-white  px-2 rounded-lg   outline-none font-AeonikProRegular `}
                                                >{state?.minHeadGirth}</span>
                                                :
                                                <input
                                                    type="number"
                                                    className={`inputStyle w-[55px] h-[38px] text-center  bg-white  px-2 rounded-lg   outline-none font-AeonikProRegular `}
                                                    placeholder="Мин"
                                                    name="minHeadGirth"
                                                    value={state?.minHeadGirth}
                                                    onChange={(e) => {
                                                        setState({ ...state, minHeadGirth: e.target.value, saveBtnDisable: true, disableSizes: 0 })
                                                    }}
                                                    required
                                                />
                                            }
                                        </div>
                                        <span className="mx-[5px]"><LineIcon /></span>
                                        <div className="flex flex-col border border-borderColor rounded-lg">
                                            {state?.disableSizes === 1 || state?.disableSizes === 2 || state?.disableSizes === 3 ?
                                                <span
                                                    className={`inputStyle w-[55px] flex items-center justify-center h-[38px] opacity-20 text-center  bg-white  px-2 rounded-lg   outline-none font-AeonikProRegular `}
                                                >{state?.maxHeadGirth}</span>
                                                : <input
                                                    type="number"
                                                    className={`inputStyle w-[55px] h-[38px] text-center   bg-white px-2 rounded-lg  font-AeonikProRegular  outline-none`}
                                                    placeholder="Макс"
                                                    name="maxHeadGirth"
                                                    value={state?.maxHeadGirth}
                                                    onChange={(e) => setState({ ...state, maxHeadGirth: e.target.value, saveBtnDisable: true, disableSizes: 0 })}
                                                    required
                                                />}
                                        </div>
                                    </div>
                                </div>
                                <div className="w-fit flex flex-col">
                                    <p className="flex items-center justify-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                        One Size
                                        <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                                    </p>
                                    <div className="flex items-center justify-center mt-[10px]">
                                        {state?.disableSizes === 1 || state?.disableSizes === 2 || state?.disableSizes === 3 ?
                                            <Switch
                                                className={`border opacity-20 border-borderColor bg-[#8B8B8B] `}
                                                checked={state?.sizeCheck}
                                            /> :
                                            <Switch
                                                className={`border border-borderColor bg-[#8B8B8B] `}
                                                onChange={onChangeSwitch}
                                                checked={state?.sizeCheck}
                                            />}
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
                                    <div className="flex items-start justify-between mt-[10px] border border-borderColor rounded-lg">
                                        {state?.disableSizes === 1 || state?.disableSizes === 0 || state?.disableSizes === 3 ?
                                            <span
                                                className={`inputStyle w-[60px] flex items-center justify-center h-[38px] opacity-20 text-center border border-borderColor bg-white  px-2 rounded-lg   outline-none font-AeonikProRegular `}
                                            >{state?.amount}</span>
                                            : <input
                                                type="number"
                                                className={`inputStyle w-[60px] h-[38px] text-center  flex items-center justify-center outline-none px-1  rounded-lg  font-AeonikProRegular `}
                                                value={state?.amount}
                                                name="amount"
                                                onChange={(e) => setState({ ...state, amount: e.target.value, saveBtnDisable: true, disableSizes: 2 })}
                                                required
                                            />}
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
                                        <div className="w-full flex items-center border border-borderColor rounded-lg">
                                            {state?.disableSizes === 1 || state?.disableSizes === 2 || state?.disableSizes === 0 ?
                                                <span
                                                    className={`inputStyle w-[55px] flex items-center justify-center h-[38px] opacity-20 text-center  bg-white  px-2 rounded-lg   outline-none font-AeonikProRegular `}
                                                >{state?.age}</span>
                                                : <input
                                                    type="number"
                                                    className="inputStyle w-[58px] h-[42px] text-center fon  rounded-lg px-[12px]  outline-none "
                                                    placeholder="0"
                                                    value={state?.age}
                                                    name="age"
                                                    onChange={(e) => setState({ ...state, age: e.target.value, saveBtnDisable: true, disableSizes: 3 })}
                                                />}
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
                                        <label htmlFor="enterPrice1" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.price ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3 py-[6px] rounded-lg text-xs`}>
                                            {state?.disableSizes === 0 || state?.disableSizes === 2 || state?.disableSizes === 3 ?
                                                <span
                                                    className="inputStyle w-[70%] flex items-center justify-start opacity-20 font-AeonikProMedium outline-none bg-transparent"
                                                >{state?.price}</span>
                                                :
                                                <input
                                                    type="text"
                                                    placeholder="0"
                                                    id="enterPrice1"
                                                    className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                                    name="price"
                                                    value={state?.price}
                                                    onChange={handleChangePrice}
                                                    required
                                                />}
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
                                                <div className="w-full h-10 flex items-center justify-center border border-borderColor rounded-lg px-[4px] md:px-1 py-[8px]">
                                                    {state?.disableSizes === 0 || state?.disableSizes === 2 || state?.disableSizes === 3 ?
                                                        <span
                                                            className="inputStyle w-[70%] flex items-center justify-start opacity-20 text-center  font-AeonikProMedium  outline-none flex items-center justify-center mx-auto"
                                                        >{state?.discountPercent}</span>
                                                        :
                                                        <input
                                                            type="number"
                                                            placeholder="0"
                                                            name="discountPercent"
                                                            className="inputStyle w-[70%] text-center  font-AeonikProMedium  outline-none flex items-center justify-center mx-auto"
                                                            value={state?.discountPercent}
                                                            defaultValue={0}
                                                            onChange={handleChangePercent}
                                                        />}
                                                    <span className="text-textLightColor ml-1">%</span>
                                                </div>
                                            </div>
                                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                            <div className="w-[60%] md:w-[75%] flex items-center">
                                                <label htmlFor="discountPrice1" className="w-full h-[40px] flex items-center justify-between border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                                                    {state?.disableSizes === 0 || state?.disableSizes === 2 || state?.disableSizes === 3 ?
                                                        <span
                                                            className="inputStyle w-[75%] flex items-center justify-start opacity-20 select-none font-AeonikProMedium outline-none bg-transparent"
                                                        >{state?.discountPrice}</span>
                                                        : <input
                                                            type="text"
                                                            placeholder="0"
                                                            id="discountPrice1"
                                                            name="discountPrice"
                                                            className="inputStyle w-[75%] select-none font-AeonikProMedium outline-none bg-transparent"
                                                            value={state?.discountPrice}
                                                            onChange={handleChangeSalePrice}
                                                            readOnly
                                                        />}
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
                                        className={`w-fit h-fit flex items-end justify-end select-none  text-lg text-[#b5b5b5]  px-3 py-2 font-AeonikProMedium pr-1`}>
                                        Сохранить
                                    </button>
                                }
                            </div>
                        </div>}
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
                    <div className="w-fit ">
                        <button type="button"
                            onClick={addNewColor?.id ? () => sendCheckListItem(addNewColor?.id) : ColorModal}
                            className="text-textBlueColor flex items-center gap-x-1 hover:underline text-base not-italic font-AeonikProMedium">
                            <span> Добавить к цвету</span>
                            {addNewColor &&
                                <span
                                    style={{ background: `${addNewColor?.hex}` }}
                                    className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${addNewColor?.id === 2 ? "border " : ""}`}
                                >
                                    {state?.addnewColorIdIcons === addNewColor?.id && addNewColor?.id !== 1 &&
                                        < BiCheck size={28} color={"#000"} className="flex items-center justify-center" />
                                    }
                                    {state?.addnewColorIdIcons === addNewColor?.id && addNewColor?.id === 1 &&
                                        < BiCheck size={28} color={"#fff"} className="flex items-center justify-center" />
                                    }
                                </span>}
                        </button>
                    </div>
                    :
                    <div className="w-fit flex items-center gap-x-1">
                        <button
                            className=" flex items-center gap-x-1 text-base not-italic font-AeonikProMedium">
                            <span className="text-[#b5b5b5]  text-base not-italic font-AeonikProMedium">
                                Добавить к цвету
                            </span>
                            {addNewColor &&
                                <span
                                    style={{ background: `${addNewColor?.hex}` }}
                                    className={`w-[22px] h-[22px] flex items-center justify-center rounded-full ${addNewColor?.id === 2 ? "border " : ""}`}
                                >
                                    {state?.addnewColorIdIcons === addNewColor?.id && addNewColor?.id !== 1 &&
                                        < BiCheck size={28} color={"#000"} className="flex items-center justify-center" />
                                    }
                                    {state?.addnewColorIdIcons === addNewColor?.id && addNewColor?.id === 1 &&
                                        < BiCheck size={28} color={"#fff"} className="flex items-center justify-center" />
                                    }
                                </span>}
                        </button>
                    </div>
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
                            // console.log(item, "item--Map");
                            return (
                                <List.Item key={index} className="w-full "
                                >
                                    <div className="w-full flex items-center gap-x-1">
                                        <div className="flex items-center h-full">
                                            <Checkbox value={item?.id} checked={checked} />
                                        </div>
                                        <div
                                            className={`w-full  h-fit flex flex-col items-center justify-center border border-borderColor  rounded-lg  not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
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
                                                        <div className="flex flex-col items-center">
                                                            <p
                                                                className={`inputStyle flex items-center justify-center cursor-default w-[55px] h-[38px] text-center border border-borderColor bg-white  px-2 rounded-lg   outline-none font-AeonikProRegular `}
                                                            >{item?.min_head_girth || null}
                                                            </p>
                                                        </div>
                                                        <span className="mx-[5px]"><LineIcon /></span>
                                                        <div className="flex flex-col">
                                                            <p
                                                                className={`inputStyle flex items-center justify-center cursor-default w-[55px] h-[38px] text-center  border border-borderColor bg-white px-2 rounded-lg  font-AeonikProRegular  outline-none`}
                                                            >{item?.max_head_girth || null}</p>
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
                                                            className={`border border-borderColor cursor-default bg-[#8B8B8B] `}
                                                            checked={Number(item?.one_size)}
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
                                                        <p
                                                            className={`inputStyle flex items-center justify-center cursor-default w-[60px] h-[38px] text-center  flex items-center justify-center outline-none px-1 ${state?.isCheckValid && !state?.amount ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   rounded-lg  font-AeonikProRegular `}
                                                        >{item?.amount || null}</p>
                                                    </div>
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        DeleteSize()
                                                        onDeleteId(item?.id)
                                                    }
                                                    }
                                                    className="absolute right-2 cursor-pointer active:scale-95	active:opacity-70 text-[#a2a2a2] hover:text-textRedColor transition-colors duration-[0.2s] ease-linear">
                                                    <DeleteIcon
                                                        width={30} />
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
                                                            <p
                                                                className="inputStyle flex items-center justify-center cursor-default w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none "
                                                            >{item?.age || null}</p>
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
                                                        <div className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.price ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3 py-[6px] rounded-lg text-xs`}>
                                                            <p
                                                                className="inputStyle flex items-center  cursor-default  w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                                            >{Number(item?.price)?.toLocaleString() || null}</p>
                                                            <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                                                сум
                                                            </span>
                                                        </div>
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
                                                                <div className="w-full h-10 flex items-center justify-center border border-borderColor rounded-lg px-[4px] md:px-1 py-[8px]">
                                                                    <p
                                                                        className="inputStyle w-[70%] flex items-center justify-center cursor-default  text-center  font-AeonikProMedium  outline-none flex items-center justify-center mx-auto"
                                                                    >{item?.discount_percent || null}</p>
                                                                    <span className="text-textLightColor ml-1">%</span>
                                                                </div>
                                                            </div>
                                                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                                            <div className="w-[60%] md:w-[75%] flex items-center">
                                                                <div className="w-full h-[40px] flex items-center justify-between border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                                                                    <p
                                                                        className="inputStyle flex items-center justify-start cursor-default w-[75%] select-none font-AeonikProMedium outline-none bg-transparent"
                                                                    >{Number(item?.discount_price)?.toLocaleString() || null}</p>
                                                                    <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                                                        сум
                                                                    </span>
                                                                </div>
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
                                                    onClick={() => {
                                                        setState({ ...state, sizeEditModal: true, sendingLoader: false, editSizeId: item?.id, disableSizes: null, saveBtnDisable: false })
                                                    }
                                                    }
                                                    className={`w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg  text-textBlueColor  px-3 py-2 font-AeonikProMedium pr-1`}>
                                                    Изменить
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
