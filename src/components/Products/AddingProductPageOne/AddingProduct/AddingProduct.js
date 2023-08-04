import { Select } from 'antd'
import React from 'react'
import { InputCheck, StarLabel } from '../../../../assets/icons';

const AddingProduct = () => {

    const onChange = (value) => {
    console.log(`selected ${value}`);
    };
    const onSearch = (value) => {
    console.log("search:", value);
    };

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
    <div className='relative w-full flex items-center justify-between my-[50px]'>
        
        <div className="absolute top-[0] hidden md:flex items-center justify-center flex-col mr-[50px]">
            <div className="w-[45px] h-[45px] font-AeonikProMedium border-2 flex items-center justify-center bg-textBlueColor border-textBlueColor rounded-full text-2xl text-white mb-[5px]">1</div>
            <div className="w-[2px] h-[150px] bg-textBlueColor active:bg-textBlueColor mb-[5px] "></div>
            <div className="flex items-center justify-center font-AeonikProMedium text-textBlueColor text-2xl border border-textBlueColor w-[45px] h-[45px] rounded-full mb-[5px]">2</div>
            <div className="line flex-1"></div>
        </div>
        <div className='w-full flex items-center justify-between border border-borderColor rounded-xl mx-[185px] px-[30px] py-[50px] gap-x-[30px]'>
            <div className='w-[60%] border border-green-700'>
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
                
            </div>
            <div className='w-[40%] border border-yellow-600'></div>
        </div>
        
    </div>
  )
}

export default AddingProduct