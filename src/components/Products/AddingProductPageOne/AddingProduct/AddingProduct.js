import { Popover, Select } from 'antd'
import React, { useState } from 'react'
import { InputCheck, StarLabel } from '../../../../assets/icons';
import { BiChevronDown } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const AddingProduct = () => {

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
        console.log("search:", value);
    };

    const [state, setState] = useState({
        // openhat: true,
        // openOutwear: true,
    });

    // Hats
    const contentHat = (
        <div className="w-[375px] h-fit">
            <action className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`} >
                <div className='w-full flex  gap-x-10 px-3 pt-5'>
                    <div className='w-1/2 flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>Обхват головы <span className='text-sm text-textLightColor ml-[6px]'>(см)</span></p>
                        <div className='flex items-center justify-between gap-x-[25px]'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] border border-borderColor px-5 py-[10px] rounded-lg text-base [&::-webkit-inner-spin-button]:appearance-none outline-none' />
                                <div className='mt-[5px] text-textLightColor text-xs font-AeonikProMedium'>Мин</div>
                            </div>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] border border-borderColor px-5 py-[10px] rounded-lg text-base font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' />
                                <div className='mt-[5px] text-textLightColor text-xs font-AeonikProMedium'>Макс</div>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2 flex flex-col items-center'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Количество <span className='text-sm text-textLightColor ml-[6px]'>(см)</span>
                        </p>
                        <div className='flex items-start justify-between '>
                            <input type="number" className='w-[60px] border border-borderColor px-5 py-[10px] rounded-lg text-base font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' />
                        </div>
                    </div>
                </div>
                <button className='w-full flex items-end justify-end text-textBlueColor font-AeonikProMedium pr-1'>готово</button>
            </action>
        </div>
    );
    
    // Outerwear    
    const contentOutwear = (
        <div className="w-[611px] h-fit">
            <action className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`} >
                <div className='w-full flex  gap-x-10 px-3 pt-5'>
                    <div className='w-[32%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>Размер Груди <span className='text-sm text-textLightColor ml-[6px]'>(см)</span></p>
                        <div className='flex items-center justify-between gap-x-[25px]'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Мин' />
                            </div>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Макс' />
                            </div>
                        </div>
                    </div>
                    <div className='w-[32%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>Размер</p>
                        <div className='flex items-center justify-between gap-x-[25px]'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Мин' />
                            </div>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Макс' />
                            </div>
                        </div>
                    </div>
                    <div className='w-[36%] flex flex-col '>
                        <p className='flex items-center text-base text-mobileTextColor mb-[15px]'>
                        Буквенный Размер 
                        </p>
                        <div className='w-full flex items-start justify-between mb-[10px]'>
                            <div className='w-1/4 flex items-center mr-[10px]'>
                                <input type="radio" id="xxs" name="size" value="xxs" checked />
                                <label for="xxs" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor'>XXS</label>
                            </div>
                            <div className='w-1/4 flex items-center mr-[10px]'>
                                <input type="radio" id="xs" name="size" value="xs" />
                                <label for="xs" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor'>XS</label>
                            </div>
                            <div className='w-1/4 flex items-center mr-[10px]'>
                                <input type="radio" id="s" name="size" value="s" />
                                <label for="s" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor'>S</label>
                            </div>
                            <div className='w-1/4 flex items-center mr-[10px]'>
                                <input type="radio" id="M" name="size" value="M" />
                                <label for="M" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor'>M</label>
                            </div>
                        </div>
                        <div className='w-full flex items-start justify-between '>
                            <div className='w-1/4 flex items-center mr-[10px]'>
                                <input type="radio" id="L" name="size" value="L" checked />
                                <label for="L" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor'>L</label>
                            </div>
                            <div className='w-1/4 flex items-center mr-[10px]'>
                                <input type="radio" id="XL" name="size" value="XL" />
                                <label for="XL" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor'>XL</label>
                            </div>
                            <div className='w-1/4 flex items-center mr-[10px]'>
                                <input type="radio" id="2XL" name="size" value="2XL" />
                                <label for="2XL" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor'>2XL</label>
                            </div>
                            <div className='w-1/4 flex items-center mr-[10px]'>
                                <input type="radio" id="3XL" name="size" value="3XL" />
                                <label for="3XL" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor'>3XL</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex  gap-x-10 px-3 pt-5'>
                    <div className='w-[32%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>Размер Груди <span className='text-sm text-textLightColor ml-[6px]'>(см)</span></p>
                        <div className='flex items-center justify-between gap-x-[25px]'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Мин' />
                            </div>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Макс' />
                            </div>
                        </div>
                    </div>
                    <div className='w-[32%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>Размер</p>
                        <div className='flex items-center justify-between gap-x-[25px]'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Мин'/>
                            </div>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] h-[38px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Макс' />
                            </div>
                        </div>
                    </div>
                    <div className='w-[36%] flex flex-col '>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Количество 
                        </p>
                        <div className='flex items-start justify-between '>
                            <input type="number" className='w-[60px] h-[38px] border border-borderColor px-5 py-[10px] rounded-lg text-base font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' />
                        </div>
                    </div>
                </div>
                <button className='w-full flex items-end justify-end text-textBlueColor font-AeonikProMedium pr-1'>готово</button>
            </action>
        </div>
    );


    const changeColor = [
        { id: 1, data: 1, icons: InputCheck, action: false, colors: "bg-black" },
        { id: 2, data: 2, icons: InputCheck, action: false, colors: "bg-white" },
        { id: 3, data: 3, icons: InputCheck, action: false, colors: "bg-zinc-500" },
        { id: 4, data: 4, icons: InputCheck, action: false, colors: "bg-purple-500"},
        { id: 5, data: 5, icons: InputCheck, action: false, colors: "bg-sky-600" },
        { id: 6, data: 6, icons: InputCheck, action: false, colors: "bg-amber-400 "},
        { id: 7, data: 7, icons: InputCheck, action: false, colors: "bg-green-700 "},
        { id: 8, data: 8, icons: InputCheck, action: false, colors: "bg-amber-600 "},
        { id: 9, data: 9, icons: InputCheck, action: false, colors: "bg-red-700  "},
        { id: 10, data: 10, icons: InputCheck, action: false, colors: "bg-purple-800 "},
        { id: 11, data: 11, icons: InputCheck, action: false, colors: "bg-blue-900 "},
        { id: 12, data: 12, icons: InputCheck, action: false, colors: "bg-yellow-900 "},
    ];


    return (
        <div className='relative w-full flex items-center justify-between my-[50px] focus:bg-textBlueColor'>
            
            <div className="absolute top-[0] hidden md:flex items-center justify-center flex-col mr-[50px]">
                <div className="w-[45px] h-[45px] font-AeonikProMedium border-2 flex items-center justify-center bg-textBlueColor border-textBlueColor rounded-full text-2xl text-white mb-[5px]">1</div>
                <div className="w-[2px] h-[150px] bg-textBlueColor active:bg-textBlueColor mb-[5px] "></div>
                <div className="flex items-center justify-center font-AeonikProMedium text-textBlueColor text-2xl border border-textBlueColor w-[45px] h-[45px] rounded-full mb-[5px]">2</div>
                <div className="line flex-1"></div>
            </div>
            <form action='#' className='relative w-full border border-borderColor rounded-xl mx-[185px] px-[30px] py-[50px]  pb-[250px]'>
                <div className='w-full flex items-center justify-between gap-x-[30px]'>
                    <div className='w-[60%]'>
                        {/* 1 */}
                        <div className='w-full flex flex-row gap-x-[30px] mb-[25px]'>
                            <div className='w-1/2 flex  flex-col items-start'>
                                <div className='flex items-center justify-center mb-[5px]'>
                                    <label htmlFor="" className='text-base font-AeonikProRegular'>Раздел одежды</label>
                                    <span className='ml-[5px]'><StarLabel/></span>
                                </div>
                                <Select
                                    className="rounded-lg w-full h-11 md:h-10"
                                    showSearch
                                    placeholder="Выбрать"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    size="large"
                                    filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                    options={[
                                    {
                                        value: "Tashkent",
                                        label: "Tashkent",
                                    },
                                    {
                                        value: "Samarkand",
                                        label: "Samarkand",
                                    },
                                    {
                                        value: "Bukhara",
                                        label: "Bukhara",
                                    },
                                    ]}
                                />
                            </div>
                            <div className='w-1/2 flex  flex-col items-start'>
                                <div className='flex items-center justify-center mb-[5px]'>
                                    <label htmlFor="" className='text-base font-AeonikProRegular'>Подраздел одежды </label>
                                    <span className='ml-[5px]'><StarLabel/></span>
                                </div>
                                <Select
                                    className="rounded-lg w-full h-11 md:h-10"
                                    showSearch
                                    placeholder="Выбрать"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    size="large"
                                    filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                    options={[
                                    {
                                        value: "Tashkent",
                                        label: "Tashkent",
                                    },
                                    {
                                        value: "Samarkand",
                                        label: "Samarkand",
                                    },
                                    {
                                        value: "Bukhara",
                                        label: "Bukhara",
                                    },
                                    ]}
                                />
                            </div>
                        </div>
                        {/* 2 */}
                        <div className='w-full flex flex-row gap-x-[30px] mb-[25px]'>
                            <div className='w-1/2 flex  flex-col items-start'>
                                <div className='flex items-center justify-center mb-[5px]'>
                                    <label htmlFor="" className='text-base font-AeonikProRegular'>Сезон одежды</label>
                                    <span className='ml-[5px]'><StarLabel/></span>
                                </div>
                                <Select
                                    className="rounded-lg w-full h-11 md:h-10"
                                    showSearch
                                    placeholder="Выбрать"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    size="large"
                                    filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                    options={[
                                    {
                                        value: "Tashkent",
                                        label: "Tashkent",
                                    },
                                    {
                                        value: "Samarkand",
                                        label: "Samarkand",
                                    },
                                    {
                                        value: "Bukhara",
                                        label: "Bukhara",
                                    },
                                    ]}
                                />
                            </div>
                            <div className='w-1/2 flex  flex-col items-start'>
                                <div className='flex items-center justify-between mb-[5px]'>
                                    <label htmlFor="" className='text-base font-AeonikProRegular'>Цвет</label>
                                    <span className='ml-[5px]'><StarLabel/></span>
                                </div>
                                <div className='w-full flex items-center justify-between border rounded-lg py-[9px] px-[10px]'>
                                {changeColor?.map((data) => {
                                        return (
                                            <div key={data?.id}>
                                                <label
                                                    key={data?.id}
                                                    className={`${data.colors} rounded-full border border-${data.colors} w-5 h-5 cursor-pointer flex items-center justify-center hover:scale-110 duration-300 `}
                                                >
                                                    {/* <img src={data.icons} alt="" /> */}
                                                </label>
                                                <input
                                                    type="radio"
                                                    id={data?.id}
                                                    name="checkStatus"
                                                    value={data?.id}
                                                    className={"hidden w-full h-full"}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        {/* 3 */}
                        <div className='w-full flex flex-row gap-x-[30px] mb-[25px]'>
                            <div className='w-1/2 flex  flex-col items-start'>
                                <div className='flex items-center justify-center mb-[5px]'>
                                    <label htmlFor="" className='text-base font-AeonikProRegular'>Пол</label>
                                </div>
                                <Select
                                    className="rounded-lg w-full h-11 md:h-10"
                                    showSearch
                                    placeholder="Выбрать"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    size="large"
                                    filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                    options={[
                                    {
                                        value: "Tashkent",
                                        label: "Tashkent",
                                    },
                                    {
                                        value: "Samarkand",
                                        label: "Samarkand",
                                    },
                                    {
                                        value: "Bukhara",
                                        label: "Bukhara",
                                    },
                                    ]}
                                />
                            </div>
                            <div className='w-1/2 flex  flex-col items-start'>
                                <div className='flex items-center justify-center mb-[5px]'>
                                    <label htmlFor="" className='text-base font-AeonikProRegular'>Артикул</label>
                                    <span className='font-AeonikProMedium text-[13px] text-textLightColor ml-[5px]'>(не обезательно)</span>
                                </div>
                                <input type='text' className='w-full flex items-center justify-between border rounded-lg py-[7px] px-[10px] outline-none' />
                            
                            </div>
                        </div>
                        {/* 4 */}
                        <div className='w-full flex flex-row gap-x-[30px] mb-[25px]'>
                            <div className='w-1/2 flex items-center gap-x-[25px]'>
                                <div className='w-[45%] flex flex-col items-start'>
                                    <div className='flex items-center justify-center mb-[5px]'>
                                        <label htmlFor="" className='text-base font-AeonikProRegular'>Возраст</label>
                                        <span className='ml-[5px]'><StarLabel/></span>
                                    </div>
                                    <div className='w-full flex items-center gap-x-5'>
                                        <input
                                            type='number'
                                            className='w-1/2 flex items-center justify-center border border-borderColor rounded-lg px-[12px] py-[10px] outline-none text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                            placeholder='Мин'
                                        />
                                        <input
                                            type='number'
                                            className='w-1/2 flex items-center justify-center border border-borderColor rounded-lg px-[10px] py-[10px] outline-none text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                            placeholder='Макс'
                                        />
                                    </div>
                                </div>
                                <div className='w-[55%]'>
                                    <div className='flex items-center mb-[5px]'>
                                        <label htmlFor="" className='text-base font-AeonikProRegular'>Цена</label>
                                        <span className='ml-[5px]'><StarLabel/></span>
                                    </div>
                                    <input type='number' className='w-full border border-borderColor p-[11px] rounded-lg outline-none text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' placeholder='сум' />
                                </div>
                            </div>
            
                            <div className='w-1/2 flex  flex-col items-start'>
                                <div className='flex items-center justify-center mb-[5px]'>
                                    <label htmlFor="" className='text-base font-AeonikProRegular'>Скидка</label>
                                    <span className='font-AeonikProMedium text-[13px] text-textLightColor ml-[5px]'>(не обезательно)</span>
                                </div>
                                <div className='w-full flex items-center justify-center'>
                                    <div className='w-full flex items-center gap-x-[25px]'>
                                        <div className='w-[25%] flex flex-col items-start'>
                                            <input
                                                type='number'
                                                className='w-full flex items-center justify-center border border-borderColor rounded-lg px-[12px] py-[10px] outline-none text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                                placeholder='%'
                                            />
                                        </div>
                                        <div className='w-[75%]'>
                                            <input type='number' className='w-full border border-borderColor p-[11px] rounded-lg outline-none text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' placeholder='сум' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 5 */}
                        <div className='w-full flex flex-row gap-x-[30px] mb-[25px]'>
                            <div className='w-1/2 flex  flex-col items-start'>
                                <div className='flex items-center justify-center mb-[5px]'>
                                    <label htmlFor="" className='text-base font-AeonikProRegular'>Категория одежды</label>
                                    <span className='ml-[5px]'><StarLabel/></span>
                                </div>
                                <Select
                                    className="rounded-lg w-full h-11 md:h-10"
                                    showSearch
                                    placeholder="Выбрать"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    size="large"
                                    filterOption={(input, option) =>
                                    (option?.label ?? "")
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                    options={[
                                    {
                                        value: "Tashkent",
                                        label: "Tashkent",
                                    },
                                    {
                                        value: "Samarkand",
                                        label: "Samarkand",
                                    },
                                    {
                                        value: "Bukhara",
                                        label: "Bukhara",
                                    },
                                    ]}
                                />
                            </div>
                            <div className='w-1/2 flex items-start gap-x-[10px]'>
                                <div className='w-1/2 flex flex-col items-start'>
                                    <div className='flex items-center justify-center mb-[5px]'>
                                        <label htmlFor="" className='text-base font-AeonikProRegular'>Тип </label>
                                        <span className='ml-[5px]'><StarLabel/></span>
                                    </div>
                                    <Select
                                        className="rounded-lg w-full h-11 md:h-10"
                                        showSearch
                                        placeholder="Выбрать"
                                        optionFilterProp="children"
                                        onChange={onChange}
                                        onSearch={onSearch}
                                        size="large"
                                        filterOption={(input, option) =>
                                        (option?.label ?? "")
                                            .toLowerCase()
                                            .includes(input.toLowerCase())
                                        }
                                        options={[
                                        {
                                            value: "Tashkent",
                                            label: "Tashkent",
                                        },
                                        {
                                            value: "Samarkand",
                                            label: "Samarkand",
                                        },
                                        {
                                            value: "Bukhara",
                                            label: "Bukhara",
                                        },
                                        ]}
                                    />
                                </div>
                                <div className='w-1/2 flex flex-col items-start'>
                                    <div className='flex items-center justify-center mb-[5px]'>
                                        <label htmlFor="" className='text-base font-AeonikProRegular'>Вес (грамм)</label>
                                        <span className='ml-[5px]'><StarLabel/></span>
                                    </div>
                                    <input type='number' className='w-full border border-borderColor p-[11px] rounded-lg outline-none text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' placeholder='(не обезательно)' />
                                </div>
                            </div>
                        </div>
                        {/* 6 */}
                        <div className='w-full flex items-center justify-between'>
                            <Popover
                                // open={state?.openhat}
                                // onOpenChange={handleOpenChangeHat}
                                className="px-[15px] h-[38px] border-textBlueColor text-textBlueColor border-[1.5px] font-AeonikProMedium flex items-center text-sm justify-center cursor-pointer active:scale-95 rounded-lg focus:bg-textBlueColor hover:bg-textBlueColor hover:text-white transition duration-300"
                                trigger="click"
                                options={["Hide"]}
                                placement="bottomLeft"
                                content={contentHat}
                            >
                                Головные уборы
                            </Popover>
                            <Popover
                                // open={state?.openOutwear}
                                // onOpenChange={handleOpenChangeOutwear}
                                className="group px-[15px] h-[38px] border-textBlueColor text-textBlueColor border-[1.5px] font-AeonikProMedium flex items-center text-sm justify-center cursor-pointer active:scale-95 rounded-lg hover:bg-textBlueColor hover:text-white transition duration-300"
                                trigger="click"
                                options={["Hide"]}
                                placement="bottomLeft"
                                content={contentOutwear}
                            >
                                Верхняя одежда
                            </Popover> 
                            <Popover
                                // open={state?.openOutwaer}
                                // onOpenChange={handleOpenChangeOutwear}
                                className="group px-[15px] h-[38px] rounded-lg border-textBlueColor text-textBlueColor border-[1.5px] font-AeonikProMedium flex items-center text-sm justify-center cursor-pointer active:scale-95 focus:bg-textBlueColor focus:text-white hover:bg-textBlueColor hover:text-white transition duration-300"
                                trigger="click"
                                options={["Hide"]}
                                placement="bottomLeft"
                                // content={contentWear}
                            >
                                Нижняя одежда
                            </Popover>
                            <Popover
                                // open={state?.openwear}
                                // onOpenChange={handleOpenChangeWear}
                                className="px-[15px] h-[38px] border-textBlueColor text-textBlueColor border-[1.5px] font-AeonikProMedium flex items-center justify-center text-sm cursor-pointer active:scale-95 rounded-lg focus:bg-textBlueColor focus:text-white hover:bg-textBlueColor hover:text-white transition duration-300"
                                trigger="click"
                                options={["Hide"]}
                                placement="bottom"
                                // content={contentWear}
                            >
                            Обувь
                            </Popover>
                            <Popover
                                // open={state?.openwear}
                                // onOpenChange={handleOpenChangeWear}
                                className="group px-[15px] h-[38px] border-textBlueColor text-textBlueColor border-[1.5px] font-AeonikProMedium flex items-center justify-center text-sm cursor-pointer active:scale-95  rounded-lg focus:bg-textBlueColor focus:text-white hover:bg-textBlueColor hover:text-white transition duration-300"
                                trigger="click"
                                options={["Hide"]}
                                placement="bottom"
                                // content={contentWear}
                            >
                                Аксессуары
                            </Popover> 
                        </div>
                    </div>
                    <div className='w-[40%] border border-borderColor h-[510px]'></div>
                </div>
                <Link to='/products_nextpage' className='absolute active:scale-95 right-3 bottom-3 px-[50px] py-3 border border-textBlueColor bg-textBlueColor text-white rounded-lg'>Продолжить</Link>
            </form>
        </div>
    )
}

export default AddingProduct