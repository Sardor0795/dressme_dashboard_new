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
    <div className="w-full px-4 md:px-[100px]">
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
        <form className="w-full flex items-center justify-between gap-x-10 mb-[500px]">
            <div className="w-3/5 border border-green-700">
                <div className="w-full flex items-center justify-between gap-x-[30px] mb-5">
                    <label htmlFor="shopName" className="w-[20%] text-base text-mobileTextColor font-AeonikProRegular">Название магазина</label>
                    <input type="text" name="shopName" id="shopName" placeholder="Введите название магазина" className="w-[80%] border border-mobileTextColor outline-none px-[15px] py-3 rounded-lg text-base font-AeonikProRegular" />
                </div>
                <div className="w-full flex items-center justify-between gap-x-[30px] mb-5">
                    <label htmlFor="shopName" className="w-[20%] text-base text-mobileTextColor font-AeonikProRegular">Пол</label>
                    <div className="w-[80%] border border-mobileTextColor outline-none rounded-lg text-base">
                        <button className="w-1/3 text-base font-AeonikProRegular border border-blue-500 rounded-lg px-[15px] py-3">Мужской</button>
                        <button className="w-1/3 text-base font-AeonikProRegular border border-blue-500 rounded-lg px-[15px] py-3">Женский</button>
                        <button className="w-1/3 text-base font-AeonikProRegular border border-blue-500 rounded-lg px-[15px] py-3">Унисекс</button>
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
                <div className="w-full flex items-center justify-between gap-x-[30px] mb-5">
                    <label htmlFor="shopName" className="w-[20%] text-base text-mobileTextColor font-AeonikProRegular">Метод доставки</label>
                    <div className="group w-[80%] flex items-center justify-between outline-none rounded-lg text-base gap-x-[14px]">
                        <button className="w-1/4 group-focus:text-white focus:bg-textBlueColor text-base font-AeonikProRegular border border-borderColor rounded-lg px-[15px] py-3">
                            
                        </button>
                        <button className="w-3/4 group-focus:text-white focus:bg-textBlueColor text-base font-AeonikProRegular border border-borderColor rounded-lg px-[15px] py-3">
                            Собственная доставка
                        </button>
                    </div>
                </div>
            </div>
            
            
            <div className="w-2/5 border border-red-700"></div>
        </form>
    </div>
  )

}
