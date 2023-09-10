import React, { useState } from 'react'

export default function AllSizeListForWear() {
    const [decraseList, setDecraseList] = useState(false);

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
            { id: 1, action: true, name: "5X" },
            { id: 2, action: true, name: "7X" },
            { id: 3, action: true, name: "9X" },
            { id: 4, action: true, name: "10X" },
            { id: 5, action: true, name: "4X" },
            { id: 6, action: true, name: "6X" },
            { id: 7, action: true, name: "8X" },
        ]
    }
    )
    return (
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

                </div>
                <div className="w-fit w-[222px]  h-[50px] grid grid-cols-4  gap-2 items-end">
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
    )
}
