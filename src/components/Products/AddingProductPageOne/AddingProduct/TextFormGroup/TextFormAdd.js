import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Select } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../../../hook/useHttp";
import { StarLabel, XIcon } from "../../../../../assets/icons";
import { dressMainData } from "../../../../../hook/ContextTeam";
import AddBtn from "./AddBtn";

export default function TextFormAdd({ onClick, handlCallBack }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [titleInRu, setTitleInRu] = useState('')
    const [titleInUz, setTitleInUz] = useState('')
    const [descriptionInRu, setDescriptionInRu] = useState('')
    const [descriptionInUz, setDescriptionInUz] = useState('')
    const [qualityInRu, setQualityInRu] = useState('')
    const [qualityInUz, setQualityInUz] = useState('')
    const [noteValueRu, setNoteValueRu] = useState('')
    const [noteValueUz, setNoteValueUz] = useState('')
    const [brand, setBrand] = useState('')



    const { request } = useHttp()
    const [productsData, setProductsData] = useState({})

    const handleSelectQuality = (value) => {
        productsData?.quality?.filter(e => e.name_ru == value).map(item => {
            setQualityInUz(item?.name_uz)
        })
        setQualityInRu(value)
    }
    const handleSelectQualityUz = (value) => {
    }
    const handleBrand = (value) => {
        setBrand(value)
    }

    useQuery(["products_get_page_next"], () => { return request({ url: "/products/get-product-info", token: true }) },
        {
            onSuccess: (res) => {
                if (res) {
                    setProductsData(res)
                }
            },
            onError: (err) => {
                console.log(err, "ERR PRODUCTS_NEXT_PAGE");
                ;
            },
            keepPreviousData: true,
            refetchOnWindowFocus: false,
        }
    );


    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, [dressInfo?.nextPageShowForm]);


    const send = () => {
        handlCallBack({
            brand_id: brand,
            name_Ru: titleInRu,
            name_Uz: titleInUz,
            description_Ru: descriptionInRu,
            description_Uz: descriptionInUz,
            quality_Ru: qualityInRu,
            quality_Uz: qualityInUz,
            composition_Ru: noteValueRu,
            composition_Uz: noteValueUz,
        })
        onClick()

    }


    // Категория одежды хлопок
    return (
        <div className="flex py-[40px] md:py-[50px] ">
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
                                <div className="justify-between rounded-lg border border-[#e5e5e5] flex py-[10px] px-[5px]">
                                    <input
                                        className="flex-1 mr-[30px] w-[30px] focus:outline-none font-AeonikProRegular"
                                        type="text"
                                        name="title"
                                        value={titleInRu}
                                        onChange={(e) => setTitleInRu(e.target.value)}
                                    />
                                    <AddBtn />
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
                                <div className="rounded-lg border border-[#e5e5e5] flex py-[10px] px-[5px]">
                                    <input
                                        className="flex-1 mr-[30px] w-[30px] ll:w-auto focus:outline-none font-AeonikProRegular"
                                        type="text"
                                        name="title"
                                        value={titleInUz}
                                        onChange={(e) => setTitleInUz(e.target.value)}
                                    />
                                    <AddBtn />
                                </div>
                            </div>
                            <div className="mb-[10px]">
                                <div className="flex items-center mb-[5px]">
                                    <div className="text-[#303030] w-fit text-base font-AeonikProRegular">
                                        Описание на русском
                                    </div>
                                    <span className="ml-[5px]">
                                        <StarLabel />
                                    </span>
                                </div>
                                <div className="rounded-lg relative border pr-[40px] border-[#e5e5e5] flex flex-col h-[120px] py-[10px] px-[5px]">
                                    <textarea
                                        className="block w-full h-full text-[#666] text-sm resize-none bg-transparent flex-1 outline-none font-AeonikProRegular"
                                        name=""
                                        id=""
                                        value={descriptionInRu}
                                        onChange={(e) => setDescriptionInRu(e.target.value)}
                                    ></textarea>
                                    <div className="flex justify-end w-full absolute right-[6px] bottom-[6px]">
                                        <AddBtn />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center mb-[5px]">
                                    <div className="text-[#303030] w-fit text-base font-AeonikProRegular">
                                        Описание на узбекском
                                    </div>
                                    <span className="ml-[5px]">
                                        <StarLabel />
                                    </span>
                                </div>
                                {/* error -  border-[#ffb8b8] bg-[#fff6f6] */}
                                <div className="rounded-lg relative border pr-[40px] border-[#e5e5e5] flex flex-col h-[120px] py-[10px] px-[5px]">
                                    <textarea
                                        className="block w-full h-full text-[#666] text-sm resize-none bg-transparent flex-1 outline-none font-AeonikProRegular"
                                        name=""
                                        id=""
                                        value={descriptionInUz}
                                        onChange={(e) => setDescriptionInUz(e.target.value)}
                                    ></textarea>
                                    <div className="flex justify-end w-full absolute right-[6px] bottom-[6px]">
                                        <AddBtn />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}

                        <div className="w-full pb-[30px] md:border border-[#f2f2f2] flex flex-col md:rounded-lg md:p-5 flex-1">
                            <div className="row mb-[17px] md:mb-[20px] block md:flex gap-[35px]">
                                {/* Language in RUSSIAN */}
                                <div className="flex-1 mb-[10px]">
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
                                        style={{ width: "100%" }}
                                        // value={lang === '' ? 'Выбрать' : lang}
                                        allowClear
                                        onChange={handleSelectQuality}
                                        options={
                                            productsData?.quality?.map(item => {
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
                                        style={{ width: "100%" }}
                                        value={
                                            productsData?.quality?.filter(e => e.name_ru == qualityInRu).map(item => {
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
                                        allowClear
                                        options={
                                            productsData?.quality?.map(item => {
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
                                        Состав на русском{" "}
                                        <span className="text-sm ml-[5px] text-[#a1a1a1] font-AeonikProRegular">
                                            (необязательно)
                                        </span>
                                    </div>
                                    <div className="rounded-lg border border-[#e5e5e5] flex py-[10px] px-[5px]">
                                        <input
                                            className="flex-1 mr-[30px] w-[30px] ll:w-auto focus:outline-none font-AeonikProRegular"
                                            type="text"
                                            // name="note"
                                            value={noteValueRu}
                                            // onKeyDown={_handleKeyDownRu}
                                            onChange={(e) => setNoteValueRu(e.target.value)}
                                        />
                                        <AddBtn />
                                    </div>
                                    {/* <div className="mt-[10px] 
                   w-full flex flex-wrap items-center gap-2">
                                        {noteListRu?.length > 1 && noteListRu?.filter(e => e?.id >= 1)?.map((data, index) => {
                                            return (
                                                <div key={data?.id} className="flex items-center text-white w-fit px-2 py-[4px] text-[14px] rounded-md font-AeonikProRegular bg-[#007dca]">
                                                    {data?.name}{" "}
                                                    <button onClick={deleteNoteRu(data?.id)} className="flex items-center justify-center active:translate-y-[2px] w-4 h-4 rounded-full bg-white ml-[10px]">
                                                        <XIcon />
                                                    </button>
                                                </div>)
                                        })}
                                    </div> */}
                                </div>
                                {/* Состав на узбекском */}
                                <div className="flex-1 mb-[10px]">
                                    <div className="text-[#303030] mb-[5px] pr-[15px] w-fit text-base bg-no-repeat font-AeonikProRegular">
                                        Состав на узбекском
                                        <span className="notRecquired font-AeonikProRegular text-sm text-textLightColor">
                                            (необязательно)
                                        </span>
                                    </div>
                                    <div className="rounded-lg border border-[#e5e5e5] flex py-[10px] px-[5px]">
                                        <input
                                            className="flex-1 mr-[30px] w-[30px] ll:w-auto focus:outline-none font-AeonikProRegular"
                                            type="text"
                                            value={noteValueUz}
                                            // onKeyDown={_handleKeyDownUz}
                                            onChange={(e) => setNoteValueUz(e.target.value)}
                                        />
                                        <AddBtn />
                                    </div>
                                    {/* <div className="mt-[10px] 
                   w-full flex flex-wrap items-center gap-2">
                                        {noteListUz?.length > 1 && noteListUz?.filter(e => e?.id >= 1)?.map((data, index) => {
                                            return (
                                                <div key={data?.id} className="flex items-center text-white w-fit px-2 py-[4px] text-[14px] rounded-md font-AeonikProRegular bg-[#007dca]">
                                                    {data?.name}{" "}
                                                    <button onClick={deleteNoteUz(data?.id)} className="flex items-center justify-center active:translate-y-[2px] w-4 h-4 rounded-full bg-white ml-[10px]">
                                                        <XIcon />
                                                    </button>
                                                </div>)
                                        })}
                                    </div> */}
                                </div>
                            </div>
                            <div className="row mb-[30px] md:mb-[20px] block md:flex gap-[35px]">
                                <div className="flex-1 mb-[10px]">
                                    <div className="inputTitle text-[#303030] mb-[5px] pr-[15px] w-fit text-base font-AeonikProRegular">
                                        Бренд{" "}
                                        <span className="notRecquired text-sm text-textLightColor font-AeonikProRegular">
                                            (необязательно)
                                        </span>
                                    </div>
                                    <Select
                                        className="font-AeonikProMedium"
                                        placeholder={"Выбрать"}
                                        style={{ width: "100%" }}
                                        onChange={handleBrand}
                                        options={
                                            productsData?.brands?.map(item => {
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

                            <div className="flex justify-center md:justify-end gap-[20px] mt-auto">
                                <button
                                    type="button"
                                    onClick={() => setDressInfo({ ...dressInfo, nextPageShowForm: true })}
                                    className="h-[42px] md:h-[45px] flex items-center justify-center text-white text-center text-base md:text-lg  active:translate-y-[2px] rounded-lg bg-[#007dca] max-w-[130px] w-full font-AeonikProRegular"
                                >
                                    Назад
                                </button>
                                <button
                                    type="button"
                                    onClick={send}
                                    // onClick={onClick}
                                    className="h-[42px] md:h-[45px] flex items-center justify-center text-white text-center text-base md:text-lg active:translate-y-[2px] rounded-lg bg-[#007dca] max-w-[130px] w-full font-AeonikProRegular">
                                    Добавить
                                </button>
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
