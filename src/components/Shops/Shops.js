import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BgSelectSkin } from "../../assets/icons";
import { Select } from 'antd';


export default function Shops() {

    const onChange = (value) => {
        console.log(`selected ${value}`);
      };
      const onSearch = (value) => {
        console.log('search:', value);
      };

    return (
    <div className="w-full px-4 md:px-[100px] mt-12">
        <div className="text-center mb-[50px] text-[35px] font-AeonikProMedium">Создать магазин</div>
        <div className="relative w-full h-[360px] border-2 border-dashed flex items-center justify-center rounded-lg md:mb-20">
            <Link to='#' className="flex items-center justify-center">
                <span className="text-sm font-AeonikProMedium border-b border-textBlueColor text-textBlueColor mr-[5px]">выберите облошка</span>
                <BgSelectSkin />
            </Link>
            <div className="absolute bottom-[-64px] bg-white left-10 w-[130px] h-[130px] flex items-center justify-center text-center rounded-full border border-dashed">
                <Link to="#" className="text-sm font-AeonikProMedium text-textBlueColor p-3">выберите Логотип</Link>
            </div>
        </div>
        <form action="#" className="w-full flex flex-col items-center justify-between mb-10">
            <div className="w-full flex items-center justify-between mb-[60px] gap-x-10">
                <div className="w-3/5">
                    <div className="w-full flex items-center justify-between gap-x-[30px] mb-5">
                        <label htmlFor="shopName" className="w-[20%] text-base text-mobileTextColor font-AeonikProRegular">Название магазина</label>
                        <input type="text" name="shopName" id="shopName" placeholder="Введите название магазина" className="w-[80%] border border-borderColor2 outline-none px-[15px] py-3 rounded-lg text-base font-AeonikProRegular" />
                    </div>
                    <div className="w-full flex items-center justify-between gap-x-[30px] mb-5">
                        <label htmlFor="shopName" className="w-[20%] text-base text-mobileTextColor font-AeonikProRegular">Пол</label>
                        <div className="w-[80%] border border-borderColor2 outline-none rounded-lg text-base">
                            <button className="w-1/3 text-base font-AeonikProRegular border rounded-lg px-[15px] py-3">Мужской</button>
                            <button className="w-1/3 text-base font-AeonikProRegular border rounded-lg px-[15px] py-3">Женский</button>
                            <button className="w-1/3 text-base font-AeonikProRegular border rounded-lg px-[15px] py-3">Унисекс</button>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between gap-x-[30px] mb-5">
                        <label htmlFor="shopName" className="w-[20%] text-base text-mobileTextColor font-AeonikProRegular">Город</label>
                        <Select
                            className="rounded-lg"
                            showSearch
                            placeholder="Выберите город"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            style={{
                                width:'80%',
                            }}
                            options={[
                            {
                                value: 'Tashkent',
                                label: 'Tashkent',
                            },
                            {
                                value: 'Samarkand',
                                label: 'Samarkand',
                            },
                            {
                                value: 'Bukhara',
                                label: 'Bukhara',
                            },
                            {
                                value: 'Andijan',
                                label: 'Andijan',
                            },
                            {
                                value: 'Qarshi',
                                label: 'Qarshi',
                            },
                            {
                                value: 'Nukus',
                                label: 'Nukus',
                            },
                            {
                                value: 'Navoi',
                                label: 'Navoi',
                            },
                            {
                                value: 'Termez',
                                label: 'Termez',
                            },
                            {
                                value: 'Namangan',
                                label: 'Namangan',
                            },
                            {
                                value: 'Fergana',
                                label: 'Fergana',
                            },
                            {
                                value: 'Karakalpakstan',
                                label: 'Karakalpakstan',
                            },
                            ]}
                        />
                    </div>
                    <div className="w-full flex items-center justify-between gap-x-[30px]">
                        <label htmlFor="shopName" className="w-[20%] text-base text-mobileTextColor font-AeonikProRegular">Метод доставки</label>
                        <div className="w-[80%] flex items-center justify-between outline-none rounded-lg text-base gap-x-[14px]">
                            <button className="group w-1/4 active:scale-95 focus:bg-textBlueColor text-base font-AeonikProRegular border border-borderColor2 rounded-lg px-[15px] py-3">
                                <span className="group-focus:text-white">Такси</span>
                            </button>
                            <button className="group w-3/4 active:scale-95 group-focus:text-white focus:bg-textBlueColor text-base font-AeonikProRegular border border-borderColor2 rounded-lg px-[15px] py-3">
                                <span className="group-focus:text-white">Собственная доставка</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-2/5">
                    <textarea name="storeDescription" id="storeDescription" className="w-full h-[255px] bg-bgColor border border-borderColor2 outline-none rounded-lg p-3 resize-none" placeholder="Пишите здесь..."></textarea>
                </div>
            </div>
            <button className="px-[100px] py-[15px] bg-textBlueColor text-white rounded-lg active:scale-95">Зарегистрироваться</button>
        </form>
    </div>
  )

}
