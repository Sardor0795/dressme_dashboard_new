import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../../../hook/useHttp";
import { StarLabel, XIcon } from "../../../../../assets/icons";
import { dressMainData } from "../../../../../hook/ContextTeam";
import AddBtn from "./AddBtn";
import { ClipLoader } from "react-spinners";
import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

export default function TextFormAdd({ productsEdit, handlCallBack, loading, onClick, onEdit }) {

    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [state, setState] = useState({
        titleInRu: null,
        titleInUz: null,
        descriptionInRu: null,
        descriptionInUz: null,
        qualityInRu: null,
        qualityInUz: null,
        noteValueRu: null,
        noteValueUz: null,
        isCheckValid: false,
        brand: null,
        onEditTextForm: false
    })
    useEffect(() => {
        // console.log(productsEdit, "productsEdit");
        setState({
            ...state,
            titleInRu: productsEdit?.name_ru,
            titleInUz: productsEdit?.name_uz,
            descriptionInRu: productsEdit?.description_ru,
            descriptionInUz: productsEdit?.description_uz,
            qualityInRu: productsEdit?.quality_ru,
            qualityInUz: productsEdit?.quality_uz,
            noteValueRu: productsEdit?.composition_ru,
            noteValueUz: productsEdit?.composition_uz,
            brand: productsEdit?.brand_id,
        })
    }, [dressInfo?.nextPageShowForm])


    const handleSelectQuality = (value) => {
        dressInfo?.getProductInfo?.quality?.filter(e => e.name_ru === value).map(item => {
            setState({ ...state, qualityInUz: item?.name_uz, onEditTextForm: true })
        })

        setState({ ...state, qualityInRu: value, qualityInUz: value, onEditTextForm: true })
    }
    const handleSelectQualityUz = (value) => {
        setState({ ...state, onEditTextForm: true })

    }
    const handleBrand = (value) => {
        setState({ ...state, brand: value, onEditTextForm: true })

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(`${REACT_APP_BASE_URL}/products/get-product-info`, {
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                        "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
                    }
                });
                if (data?.status >= 200 && data?.status < 300) {
                    setDressInfo({ ...dressInfo, getProductInfo: data?.data })
                }

            } catch (error) {

            }
        };
        if (!dressInfo?.getProductInfo) {
            fetchData();
        }
    }, []);


    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [dressInfo?.nextPageShowForm]);
    useEffect(() => {
        if (!loading) {
            setState({ ...state, onEditTextForm: false })
        }
    }, [loading]);

    const send = () => {
        setState({ ...state, isCheckValid: true })

        if (state?.titleInRu && state?.titleInUz && state?.qualityInRu && state?.qualityInRu) {
            // LocationAddSubmit()
            handlCallBack({
                brand_id: state?.brand,
                name_Ru: state?.titleInRu,
                name_Uz: state?.titleInUz,
                description_Ru: state?.descriptionInRu,
                description_Uz: state?.descriptionInUz,
                quality_Ru: state?.qualityInRu,
                quality_Uz: state?.qualityInUz,
                composition_Ru: state?.noteValueRu,
                composition_Uz: state?.noteValueUz,
            })
            setState({ ...state, isCheckValid: false })
        }
    }

    const handleInputTitleRu = (e) => {
        if (e.target.value) {
            setState({ ...state, titleInRu: e.target.value?.charAt(0).toUpperCase() + e.target.value?.slice(1), onEditTextForm: true })
        } else {
            setState({ ...state, titleInRu: null })
        }
    }
    const handleInputTitleUz = (e) => {
        if (e.target.value) {
            setState({ ...state, titleInUz: e.target.value?.charAt(0).toUpperCase() + e.target.value?.slice(1), onEditTextForm: true })
        } else {
            setState({ ...state, titleInUz: null })
        }
    }
    const handleInputDescripRu = (e) => {
        if (e.target.value) {
            setState({ ...state, descriptionInRu: e.target.value?.charAt(0).toUpperCase() + e.target.value?.slice(1), onEditTextForm: true })
        } else {
            setState({ ...state, descriptionInRu: null })
        }
    }
    const handleInputDescripUz = (e) => {
        if (e.target.value) {
            setState({ ...state, descriptionInUz: e.target.value?.charAt(0).toUpperCase() + e.target.value?.slice(1), onEditTextForm: true })
        } else {
            setState({ ...state, descriptionInUz: null })
        }
    }
    const handleInputNoteRu = (e) => {
        if (e.target.value) {
            setState({ ...state, noteValueRu: e.target.value?.charAt(0).toUpperCase() + e.target.value?.slice(1), onEditTextForm: true })
        } else {
            setState({ ...state, noteValueRu: null })
        }
    }
    const handleInputNoteUz = (e) => {
        if (e.target.value) {
            setState({ ...state, noteValueUz: e.target.value?.charAt(0).toUpperCase() + e.target.value?.slice(1), onEditTextForm: true })
        } else {
            setState({ ...state, noteValueUz: null })
        }
    }

    // Категория одежды хлопок
    return (
        <div className="w-full  flex py-[40px] md:py-[50px] ">
            <div className="hidden md:flex flex-col items-center justify-center mr-[50px]">
                <div className="text-[#007dca] text-2xl w-[45px] h-[45px] rounded-full flex items-center justify-center border-2 border-[#1e88e5] mb-[5px] font-AeonikProRegular">
                    1
                </div>
                <div className="bg-[#1e88e5] h-[150px] w-[2px] mb-[5px]"></div>
                <div className="text-white bg-[#1e88e5] text-2xl w-[45px] h-[45px] rounded-full flex items-center justify-center border-2 border-[#1e88e5] mb-[5px] font-AeonikProRegular">
                    2
                </div>
                <div className="bg-[#f2f2f2] w-[2px] flex-1"></div>
            </div>
            <div className="flex-1">
                <div>
                    <div className="flex md:hidden mb-4 justify-end">
                        <Link
                            to="https://translate.google.com/?sl=ru&tl=uz&op=translate"
                            target="_blank"
                            className="text-[#007DCA] text-[14px] border-b border-[#007dca] leading-none font-AeonikProRegular"
                        >
                            Google переводчиком
                        </Link>
                    </div>
                    <div
                        className="flex flex-wrap md:flex-nowrap gap-[25px] md:gap-[40px]"
                    >
                        <div className="section1 border-b pb-[30px] md:rounded-lg md:p-5 w-full md:max-w-[490px] md:border border-[#f2f2f2] ">
                            <div className="mb-[10px]">
                                <div className="flex items-center mb-[5px]">
                                    <div className="text-[#303030] w-fit text-base font-AeonikProRegular">
                                        Название на русском
                                    </div>
                                    <span className="ml-[5px]">
                                        <StarLabel />
                                    </span>
                                </div>
                                <div className={`justify-between rounded-lg   ${state?.isCheckValid && !state?.titleInRu ? "border border-[#FFB8B8] " : "border border-borderColor"}  flex h-[48px] px-[5px]`}>
                                    <input
                                        className="flex-1 mr-[30px] w-[30px] focus:outline-none font-AeonikProRegular"
                                        type="text"
                                        name="title"
                                        value={state?.titleInRu}
                                        onChange={handleInputTitleRu}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => navigator.clipboard.writeText(state?.titleInRu)}
                                        className="cursor-pointer ">
                                        <AddBtn />
                                    </button>
                                </div>
                            </div>
                            <div className="mb-[10px]">
                                <div className="flex items-center mb-[5px]">
                                    <div className="text-[#303030] w-fit text-base font-AeonikProRegular">
                                        Название на узбекском
                                    </div>
                                    <span className="ml-[5px]">
                                        <StarLabel />
                                    </span>
                                </div>
                                <div className={`justify-between rounded-lg   ${state?.isCheckValid && !state?.titleInUz ? "border border-[#FFB8B8] " : "border border-borderColor"}  flex h-[48px] px-[5px]`}>
                                    <input
                                        className="flex-1 mr-[30px] w-[30px] ll:w-auto focus:outline-none font-AeonikProRegular"
                                        type="text"
                                        name="title"
                                        value={state?.titleInUz}
                                        onChange={handleInputTitleUz}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => navigator.clipboard.writeText(state?.titleInUz)}
                                        className="cursor-pointer ">
                                        <AddBtn />
                                    </button>
                                </div>
                            </div>
                            <div className="mb-[10px]">
                                <div className="flex items-center mb-[5px]">
                                    <div className="text-[#303030] w-fit text-base font-AeonikProRegular">
                                        Описание на русском
                                    </div>
                                    <span className="text-sm ml-[5px] text-[#a1a1a1] font-AeonikProRegular">
                                        (необязательно)
                                    </span>
                                </div>
                                <div className="rounded-lg relative border pr-[40px] border-[#e5e5e5] flex flex-col h-[120px]  px-[5px]">
                                    <textarea
                                        className="block w-full h-full text-[#000]  resize-none bg-transparent flex-1 outline-none font-AeonikProRegular"
                                        name=""
                                        id=""
                                        value={state?.descriptionInRu}
                                        onChange={handleInputDescripRu}
                                    ></textarea>
                                    <div className="flex justify-end w-full absolute right-[6px] bottom-[6px]">
                                        <button
                                            type="button"
                                            onClick={() => navigator.clipboard.writeText(state?.descriptionInRu)}
                                            className="cursor-pointer ">
                                            <AddBtn />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center mb-[5px]">
                                    <div className="text-[#303030] w-fit text-base font-AeonikProRegular">
                                        Описание на узбекском
                                    </div>
                                    <span className="text-sm ml-[5px] text-[#a1a1a1] font-AeonikProRegular">
                                        (необязательно)
                                    </span>
                                </div>
                                {/* error -  border-[#ffb8b8] bg-[#fff6f6] */}
                                <div className="rounded-lg relative border pr-[40px] border-[#e5e5e5] flex flex-col h-[120px]  px-[5px]">
                                    <textarea
                                        className="block w-full h-full text-[#000]  resize-none bg-transparent flex-1 outline-none font-AeonikProRegular"
                                        name=""
                                        id=""
                                        value={state?.descriptionInUz}
                                        onChange={handleInputDescripUz}
                                    ></textarea>
                                    <div className="flex justify-end w-full absolute right-[6px] bottom-[6px]">
                                        <button
                                            type="button"
                                            onClick={() => navigator.clipboard.writeText(state?.descriptionInUz)}
                                            className="cursor-pointer ">
                                            <AddBtn />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}

                        <div className="w-full pb-[30px] md:border border-[#f2f2f2] flex flex-col md:rounded-lg md:p-5 flex-1">
                            <div className="row mb-[17px] md:mb-[20px] block md:flex gap-[35px]">
                                {/* Language in RUSSIAN */}
                                <div className="flex-1 mb-[10px] ">
                                    <div className="flex items-center mb-[5px]">
                                        <div className="text-[#303030] w-fit text-base font-AeonikProRegular">
                                            Качество на русском
                                        </div>
                                        <span className="ml-[5px]">
                                            <StarLabel />
                                        </span>
                                    </div>
                                    <Select
                                        placeholder={"Выбрать"}
                                        className={`rounded-[6px]   ${state?.isCheckValid && !state?.qualityInRu ? "border border-[#FFB8B8] " : ""}  `}
                                        style={{ width: "100%" }}
                                        // value={lang === '' ? 'Выбрать' : lang}
                                        // allowClear
                                        value={dressInfo?.getProductInfo?.quality?.filter(e => e?.name_ru == state?.qualityInRu)?.map(item => { return item?.name_ru })}
                                        onChange={handleSelectQuality}
                                        options={
                                            dressInfo?.getProductInfo?.quality?.map(item => {
                                                return (
                                                    {
                                                        value: item.name_ru,
                                                        label: item.name_ru
                                                    }
                                                )
                                            })
                                        }
                                    />
                                </div>
                                {/* Language in UZBEK */}
                                <div className="flex-1 mb-[10px]">
                                    <div className="flex items-center mb-[5px]">
                                        <div className="text-[#303030] w-fit text-base font-AeonikProRegular">
                                            Качество на узбекском
                                        </div>
                                        <span className="ml-[5px]">
                                            <StarLabel />
                                        </span>
                                    </div>
                                    <Select
                                        placeholder={"Выбрать"}
                                        className={`rounded-[6px] ${state?.isCheckValid && !state?.qualityInRu ? "border border-[#FFB8B8] " : ""}  `}

                                        style={{ width: "100%" }}
                                        value={
                                            dressInfo?.getProductInfo?.quality?.filter(e => e.name_ru == state?.qualityInRu).map(item => {
                                                return item?.name_uz
                                            })
                                            // lang === ''
                                            // ? 'Выбрать'
                                            // : lang === 'Оригинал'
                                            //     ? 'Original'
                                            //     : lang === 'Полуоригинал'
                                            //         ? 'Yarim original'
                                            //         : lang === 'Не оригинал' ? 'Original emas' : 'Выбрать'
                                        }
                                        onChange={handleSelectQualityUz}
                                        // allowClear
                                        options={
                                            dressInfo?.getProductInfo?.quality?.map(item => {
                                                return (
                                                    {
                                                        value: item?.name_uz,
                                                        label: item?.name_uz
                                                    }
                                                )
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row mb-[17px] md:mb-[20px] block md:flex gap-[35px]">

                                {/* Состав на русском */}
                                <div className="flex-1 mb-[17px] md:mb-[10px]">
                                    <div className="text-[#303030] mb-[5px] pr-[15px] w-fit text-base bg-no-repeat font-AeonikProRegular">
                                        Состав на русском
                                        <span className="text-sm ml-[5px] text-[#a1a1a1] font-AeonikProRegular">
                                            (необязательно)
                                        </span>
                                    </div>
                                    <div className={`rounded-lg  flex h-[48px] px-[5px] border border-borderColor  `}>
                                        <input
                                            className="flex-1 mr-[30px] w-[30px] ll:w-auto focus:outline-none font-AeonikProRegular"
                                            type="text"
                                            name="noteValueRu"
                                            value={state?.noteValueRu}
                                            onChange={handleInputNoteRu}
                                        />

                                        <button
                                            type="button"
                                            onClick={() => navigator.clipboard.writeText(state?.noteValueRu)}
                                            className="cursor-pointer ">
                                            <AddBtn />
                                        </button>
                                    </div>
                                </div>
                                {/* Состав на узбекском */}
                                <div className="flex-1 mb-[10px]">
                                    <div className="text-[#303030] mb-[5px] pr-[15px] w-fit text-base bg-no-repeat font-AeonikProRegular">
                                        Состав на узбекском
                                        <span className="notRecquired ml-[5px] font-AeonikProRegular text-sm text-textLightColor">
                                            (необязательно)
                                        </span>
                                    </div>
                                    <div className={`rounded-lg  flex h-[48px] px-[5px] border border-borderColor `}>
                                        <input
                                            className="flex-1 mr-[30px] w-[30px] ll:w-auto focus:outline-none font-AeonikProRegular"
                                            type="text"
                                            name="noteValueUz"
                                            value={state?.noteValueUz}
                                            onChange={handleInputNoteUz}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => navigator.clipboard.writeText(state?.noteValueUz)}
                                            className="cursor-pointer ">
                                            <AddBtn />
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div className="row mb-[30px] md:mb-[20px] block md:flex gap-[35px]">
                                <div className="flex-1 mb-[10px]">
                                    <div className="inputTitle text-[#303030] mb-[5px] pr-[15px] w-fit text-base font-AeonikProRegular">
                                        Бренд
                                        <span className="notRecquired ml-[5px] text-sm text-textLightColor font-AeonikProRegular">
                                            (необязательно)
                                        </span>
                                    </div>
                                    <Select
                                        className="font-AeonikProMedium"
                                        placeholder={"Выбрать"}
                                        style={{ width: "100%" }}
                                        value={dressInfo?.getProductInfo?.brands?.filter(e => state?.brand == (e?.id))?.map((item) => { return item?.name || null })}
                                        onChange={handleBrand}
                                        options={
                                            dressInfo?.getProductInfo?.brands?.map(item => {
                                                return (
                                                    {
                                                        value: item?.id,
                                                        label: item?.name
                                                    }
                                                )
                                            })
                                        }
                                    />
                                </div>
                                <div className="flex-1 mb-[10px]"></div>
                            </div>

                            <div className="flex md:hidden items-center justify-between mb-[40px]">
                                <div className="w-1/3 h-[1px] bg-borderColor"></div>
                                <div className="w-1/3 flex items-center justify-around">
                                    <button className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full">
                                    </button>
                                    <span className="w-1/2 h-[1px]  bg-textBlueColor "></span>
                                    <button className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full	">
                                        <span className="w-2 h-2 rounded-full bg-textBlueColor block "></span>
                                    </button>
                                </div>
                                <div className="w-1/3 h-[1px] bg-borderColor"></div>
                            </div>

                            <div className="w-full flex justify-between md:justify-end md:gap-[20px] mt-auto">
                                <button
                                    type="button"
                                    onClick={() => setDressInfo({ ...dressInfo, nextPageShowForm: true })}
                                    className="w-[48%] md:w-[200px] h-[38px] sm:h-[42px] md:h-[45px] flex items-center justify-center text-center text-base md:text-lg active:scale-95 active:scale-95  border border-textBlueColor  hover:bg-textBlueColor hover:text-white text-textBlueColor rounded-lg  font-AeonikProMedium"                                >
                                    Назад
                                </button>
                                {state?.onEditTextForm ? <button
                                    type="button"
                                    onClick={send}
                                    className="md:w-[200px] h-[38px] sm:h-[42px] md:h-[45px] flex items-center justify-center text-center text-base md:text-lg active:scale-95 active:scale-95  border border-textBlueColor  hover:bg-textBlueColor hover:text-white text-textBlueColor rounded-lg font-AeonikProMedium">
                                    {loading ?
                                        <ClipLoader
                                            className="h-full py-[2px]"
                                            color={"#fff"}
                                            size={40}
                                            loading={true}
                                        /> : "Сохранить"}
                                </button>
                                    :
                                    <span
                                        className="w-[48%] select-none cursor-not-allowed  md:w-[200px] h-[38px] sm:h-[42px] md:h-[45px] flex items-center justify-center border border-[#b5b5b5] text-[#b5b5b5] bg-[#f5f5f5]  py-3   t rounded-lg text-base md:text-lg font-AeonikProMedium"
                                    >
                                        Сохранить
                                    </span>}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block mt-[30px] font-AeonikProRegular">
                        Воспользоваться
                        <Link
                            to="https://translate.google.com/?sl=ru&tl=uz&op=translate"
                            target="_blank"
                            className="text-[#007dca] text-lg border-b border-[#007dca] ml-[10px] font-AeonikProRegular"
                        >
                            Google переводчиком
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
