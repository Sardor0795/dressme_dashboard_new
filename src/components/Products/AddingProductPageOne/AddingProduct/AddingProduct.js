import { Popover, Select } from 'antd'
import React, { useState } from 'react'
import { ArrowRightIcon, DownloadIcon, InputCheck, StarLabel } from '../../../../assets/icons';
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
        <div className="w-[390px] h-fit">
            <action className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`} >
                <div className='w-full flex  gap-x-10 px-3 pt-5'>
                    <div className='w-1/2 flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]' >
                            Обхват головы 
                            <span className='text-sm text-textLightColor ml-[6px]'>(см)</span>
                            <span className='ml-[5px]'><StarLabel/></span>
                        </p>
                        <div className='flex items-center '>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] h-[38px] text-center border border-borderColor px-5 py-[10px] rounded-lg text-base [&::-webkit-inner-spin-button]:appearance-none outline-none' />
                                <div className='mt-[5px] text-textLightColor text-xs font-AeonikProMedium'>Мин</div>
                            </div>
                            <span className='rotate-90 text-borderColor mx-3 mb-5'>|</span>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] h-[38px] text-center border border-borderColor px-5 py-[10px] rounded-lg text-base font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' />
                                <div className='mt-[5px] text-textLightColor text-xs font-AeonikProMedium'>Макс</div>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2 flex flex-col items-center'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Количество 
                            <span className='text-sm text-textLightColor ml-[6px]'>(см)</span>
                            <span className='ml-[5px]'><StarLabel/></span>
                        </p>
                        <div className='flex items-start justify-between '>
                            <input type="number" className='w-[60px] h-[38px] text-center border border-borderColor px-5 py-[10px] rounded-lg text-base font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' />
                        </div>
                    </div>
                </div>
                <button className='w-full flex items-end justify-end text-textBlueColor font-AeonikProMedium pr-1'>готово</button>
            </action>
        </div>
    );
    
    // Outerwear    
    const contentOutwear = (
        <div className="w-[620px] h-fit">
            <action className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`} >
                <div className='w-full flex  gap-x-10 px-3 pt-5'>
                    <div className='w-[28%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Обхват Груди 
                            <span className='text-sm text-textLightColor ml-[6px]'>(см)</span>
                            <span className='ml-[5px]'><StarLabel/></span>
                        </p>
                        <div className='flex items-center'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Мин' />
                            </div>
                            <span className='rotate-90 text-borderColor mx-[9px]'>|</span>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Макс' />
                            </div>
                        </div>
                    </div>
                    <div className='w-[28%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Размер
                            <span className='ml-[5px]'><StarLabel/></span>
                        </p>
                        <div className='flex items-center'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Мин' />
                            </div>
                            <span className='rotate-90 text-borderColor mx-[9px]'>|</span>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Макс' />
                            </div>
                        </div>
                    </div>
                    <div className='w-[36%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[15px]'>
                            Буквенный Размер 
                            <span className='ml-[5px]'><StarLabel/></span>
                        </p>
                        <div className='w-full flex items-start mb-[10px]'>
                            <div className='flex justify-center items-center'>
                                <input type="radio" id="xxs_outwear" name="size_Outwear" value="XXS" className='w-[18px] h-[18px]' />
                                <label htmlFor="xxs_outwear"  className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer'>XXS</label>
                            </div>
                            <div className='flex justify-center items-center'>
                                <input type="radio" id="xs_outwear" name="size_Outwear" value="XS" className='w-[18px] h-[18px]' />
                                <label htmlFor="xs_outwear"  className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer'>XS</label>
                            </div>
                            <div className='flex justify-center items-center ml-[1px]'>
                                <input type="radio" id="s_outwear" name="size_Outwear" value="S" className='w-[18px] h-[18px]' />
                                <label htmlFor="s_outwear"  className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer'>S</label>
                              </div>
                            <div className='flex justify-center items-center ml-[17px]'>
                                <input type="radio" id="m_outwear" name="size_Outwear" value="M" className='w-[18px] h-[18px]' />
                                <label htmlFor="m_outwear"  className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mt-[2px] cursor-pointer'>M</label>
                            </div>  
                        </div>
                        <div className='w-full flex items-start'>
                            <div className='flex items-center justify-center mr-[18px]'>
                                <input type="radio" id="l_outwear" name="size_Outwear" value="L" className='w-[18px] h-[18px]' />
                                <label htmlFor="l_outwear" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor pr-[10px] mt-[2px] cursor-pointer'>L</label>
                            </div>
                            <div className='flex items-center justify-center mr-[2px]'>
                                <input type="radio" id="xl_outwear" name="size_Outwear" value="XL" className='w-[18px] h-[18px]' />
                                <label htmlFor="xl_outwear" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor pr-[10px] mt-[2px] cursor-pointer'>XL</label>
                            </div>
                            <div className='flex items-center justify-center'>
                                <input type="radio" id="two_xl_outwear" name="size_Outwear" value="2XL" className='w-[18px] h-[18px]' />
                                <label htmlFor="two_xl_outwear" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer'>2XL</label>
                            </div>
                            <div className='flex items-center justify-center'>
                                <input type="radio" id="three_xl_outwear" name="size_Outwear" value="3XL" className='w-[18px] h-[18px] ' />
                                <label htmlFor="three_xl_outwear" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mt-[2px] cursor-pointer'>3XL</label>
                        </div></div>
                    </div>
                </div>
                <div className='w-full flex  gap-x-10 px-3 pt-5'>
                    <div className='w-[28%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Обхват Талии<span className='text-sm text-textLightColor ml-[6px]'>(см)</span>
                            <span className='ml-[5px]'><StarLabel/></span>
                        </p>
                        <div className='flex items-center'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Мин' />
                            </div>
                            <span className='rotate-90 text-borderColor mx-[9px]'>|</span>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Макс' />
                            </div>
                        </div>
                    </div>
                    <div className='w-[28%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Обхват Бедер
                        </p>
                        <div className='flex items-center'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Мин'/>
                            </div>
                            <span className='rotate-90 text-borderColor mx-[9px]'>|</span>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] h-[38px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Макс' />
                            </div>
                        </div>
                    </div>
                    <div className='w-[36%] flex flex-col '>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Количество 
                            <span className='ml-[5px]'><StarLabel/></span>
                        </p>
                        <div className='flex items-start justify-between '>
                            <input type="number" className='w-[60px] h-[38px] text-center border border-borderColor px-5 py-[10px] rounded-lg text-base font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' />
                        </div>
                    </div>
                </div>
                <button className='w-full flex items-end justify-end text-textBlueColor font-AeonikProMedium pr-1'>готово</button>
            </action>
        </div>
    );

    // Underwear
    const contentUnderWear = (
        <div className="w-fit h-fit">
            <action className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`} >
                <div className='w-full flex  gap-x-10 px-3 pt-5'>
                    <div className='w-[28%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Размер Талии
                            <span className='text-sm text-textLightColor ml-[6px]'>(см)</span>
                            <span className='ml-[5px]'><StarLabel/></span>
                        </p>
                        <div className='flex items-center'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Мин' />
                            </div>
                            <span className='rotate-90 text-borderColor mx-[9px]'>|</span>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Макс' />
                            </div>
                        </div>
                    </div>
                    <div className='w-[28%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Размер
                            <span className='ml-[5px]'><StarLabel/></span>
                        </p>
                        <div className='flex items-center justify-between gap-x-1'>
                            <div className='flex items-center'>
                                <div className='flex flex-col'>
                                    <input type="number" className='w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Мин' />
                                </div>
                                <span className='rotate-90 text-borderColor mx-[9px]'>|</span>
                                <div className='flex flex-col'>
                                    <input type="number" className='w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Макс' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[36%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[15px]'>
                        Буквенный Размер 
                        </p>
                        <div className='w-full flex items-start mb-[10px]'>
                            <div className='flex justify-center items-center'>
                                <input type="radio" id="xxs_underwear" name="size_Underwear" value="XXS" className='w-[18px] h-[18px]' />
                                <label htmlFor="xxs_underwear"  className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer'>XXS</label>
                            </div>
                            <div className='flex justify-center items-center'>
                                <input type="radio" id="xs_underwear" name="size_Underwear" value="XS" className='w-[18px] h-[18px]' />
                                <label htmlFor="xs_underwear"  className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer'>XS</label>
                            </div>
                            <div className='flex justify-center items-center ml-[1px]'>
                                <input type="radio" id="s_underwear" name="size_Underwear" value="S" className='w-[18px] h-[18px]' />
                                <label htmlFor="s_underwear"  className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer'>S</label>
                              </div>
                            <div className='flex justify-center items-center ml-[17px]'>
                                <input type="radio" id="m_underwear" name="size_Underwear" value="M" className='w-[18px] h-[18px]' />
                                <label htmlFor="m_underwear"  className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mt-[2px] cursor-pointer'>M</label>
                            </div>  
                        </div>
                        <div className='w-full flex items-start'>
                            <div className='flex items-center justify-center mr-[18px]'>
                                <input type="radio" id="l_underwear" name="size_Underwear" value="L" className='w-[18px] h-[18px]' />
                                <label htmlFor="l_underwear" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor pr-[10px] mt-[2px] cursor-pointer'>L</label>
                            </div>
                            <div className='flex items-center justify-center mr-[2px]'>
                                <input type="radio" id="xl_underwear" name="size_Underwear" value="XL" className='w-[18px] h-[18px]' />
                                <label htmlFor="xl_underwear" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor pr-[10px] mt-[2px] cursor-pointer'>XL</label>
                            </div>
                            <div className='flex items-center justify-center'>
                                <input type="radio" id="two_xl_underwear" name="size_Underwear" value="2XL" className='w-[18px] h-[18px]' />
                                <label htmlFor="two_xl_underwear" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mr-[10px] mt-[2px] cursor-pointer'>2XL</label>
                            </div>
                            <div className='flex items-center justify-center'>
                                <input type="radio" id="three_xl_underwear" name="size_Underwear" value="3XL" className='w-[18px] h-[18px] '/>
                                <label htmlFor="three_xl_underwear" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor mt-[2px] cursor-pointer'>3XL</label>
                        </div></div>
                    </div>
                </div>
                <div className='w-full flex  gap-x-10 px-3 pt-5'>
                    <div className='w-[28%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Размер Бедер
                            <span className='ml-[5px]'><StarLabel/></span>
                        </p>
                        <div className='flex items-center'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Мин'/>
                            </div>
                            <span className='rotate-90 text-borderColor mx-[9px]'>|</span>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] h-[38px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Макс' />
                            </div>
                        </div>
                    </div>
                    <div className='w-[28%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Рост
                        </p>
                        <div className='flex items-center justify-between gap-x-1'>
                            <div className='flex items-center'>
                                <div className='flex flex-col'>
                                    <input type="number" className='w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Мин' />
                                </div>
                                <span className='rotate-90 text-borderColor mx-[9px]'>|</span>
                                <div className='flex flex-col'>
                                    <input type="number" className='w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Макс' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[36%] flex flex-col '>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Количество 
                            <span className='ml-[5px]'><StarLabel/></span>
                        </p>
                        <div className='flex items-start justify-between '>
                            <input type="number" className='w-[60px] h-[38px] text-center border border-borderColor px-5 py-[10px] rounded-lg text-base font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' />
                        </div>
                    </div>
                </div>
                <button className='w-full flex items-end justify-end text-textBlueColor font-AeonikProMedium pr-1'>готово</button>
            </action>
        </div>
    )
   
    // Shoes
    const contentShoes = (
        <div className="w-fit h-fit">
            <action className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`} >
                <div className='w-full flex gap-x-10 px-3 pt-5'>
                    <div className='w-[50%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Размер
                            <span className='ml-[5px]'><StarLabel/></span>
                        </p>
                        <div className='flex items-center justify-between gap-x-1'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-full text-start h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' />
                            </div>
                        </div>
                    </div>
                    <div className='w-[50%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Длина Стопы
                            <span className='text-sm text-textLightColor ml-[6px]'>(см)</span>
                            <span className='ml-[5px]'><StarLabel/></span>
                        </p>
                        <div className='flex items-center gap-x-1'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Мин' />
                            </div>
                            <span className='rotate-90 text-borderColor ml-[10px] mr-[9px]'>|</span>
                            <div className='flex flex-col'>
                                <input type="number" className='w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' placeholder='Макс' />
                            </div>
                        </div>
                    </div>
                    
                </div>
                <button className='w-full flex items-end justify-end text-textBlueColor font-AeonikProMedium pr-1 mt-3'>готово</button>
            </action>
        </div>
    )
   
    // Accessories
    const contentAccessories = (
        <div className="w-fit h-fit">
            <action className={`w-full h-fit flex flex-col cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`} >
                <div className='w-full flex  gap-x-10 px-3 pt-5'>
                    <div className='w-[20%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Размер <span className='text-sm text-textLightColor ml-[6px]'>(см)</span>
                        </p>
                        <div className='flex items-center justify-between gap-x-1'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-full text-start h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none'  />
                            </div>
                        </div>
                    </div>
                    
                    <div className='w-[80%] flex flex-col '>
                        <p className='flex items-center text-base text-mobileTextColor mb-[15px]'>
                        Буквенный Размер 
                        </p>
                        <div className='w-full flex items-start justify-between mb-[10px]'>
                            <div className='w-1/4 flex items-center'>
                                <input type="radio" id="xxs_accessories" name="size_Accessories" className='w-[18px] h-[18px]' value="XXS" />
                                <label htmlFor="xxs_accessories" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor'>XXS</label>
                            </div>
                            <div className='w-1/4 flex items-center'>
                                <input type="radio" id="xs_accessories" name="size_Accessories" className='w-[18px] h-[18px]' value="XS" />
                                <label htmlFor="xs_accessories" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor cursor-pointer'>XS</label>
                            </div>
                            <div className='w-1/4 flex items-center'>
                                <input type="radio" id="s_accessories" name="size_Accessories" className='w-[18px] h-[18px]' value="S" />
                                <label htmlFor="s_accessories" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor cursor-pointer'>S</label>
                            </div>
                            <div className='w-1/4 flex items-center'>
                                <input type="radio" id="m_accessories" name="size_Accessories" className='w-[18px] h-[18px]' value="M" />
                                <label htmlFor="m_accessories" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor cursor-pointer'>M</label>
                            </div>
                        </div>
                        <div className='w-full flex items-start justify-between '>
                            <div className='w-1/4 flex items-center'>
                                <input type="radio" id="l_accessories" name="size_Accessories" className='w-[18px] h-[18px]' value="L" />
                                <label htmlFor="l_accessories" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor cursor-pointer'>L</label>
                            </div>
                            <div className='w-1/4 flex items-center'>
                                <input type="radio" id="xl_accessories" name="size_Accessories" className='w-[18px] h-[18px]' value="XL" />
                                <label htmlFor="xl_accessories" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor cursor-pointer'>XL</label>
                            </div>
                            <div className='w-1/4 flex items-center'>
                                <input type="radio" id="two_xl_accessories" name="size_Accessories" className='w-[18px] h-[18px]' value="2XL" />
                                <label htmlFor="two_xl_accessories" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor cursor-pointer'>2XL</label>
                            </div>
                            <div className='w-1/4 flex items-center'>
                                <input type="radio" id="three_xl_accessories" name="size_Accessories" className='w-[18px] h-[18px]' value="3XL" />
                                <label htmlFor="three_xl_accessories" className='text-[14px] ml-[5px] font-AeonikProMedium text-textLightColor cursor-pointer'>3XL</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full flex  gap-x-10 px-3 pt-5'>
                    <div className='w-[20%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Длина
                            <span className='text-sm text-textLightColor ml-[6px]'>(см)</span>
                            </p>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-full text-start border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' />
                            </div>
                        </div>
                    </div>
                    <div className='w-[20%] flex flex-col'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>Ширина</p>
                        <div className='flex items-center justify-between gap-x-1'>
                            <div className='flex flex-col'>
                                <input type="number" className='w-full text-start border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none'/>
                            </div>
                        </div>
                    </div>
                    <div className='w-[60%] flex flex-col ml-auto'>
                        <p className='flex items-center text-base text-mobileTextColor mb-[10px]'>
                            Количество 
                        </p>
                        <div className='flex items-start justify-between '>
                            <input type="number" className='w-[60px] h-[38px] text-center border border-borderColor px-5 py-[10px] rounded-lg text-base font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none' />
                        </div>
                    </div>
                </div>
                <button className='w-full flex items-end justify-end text-textBlueColor font-AeonikProMedium pr-1'>готово</button>
            </action>
        </div>
    )

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
            <form action='#' className='md:relative w-full md:border border-borderColor rounded-xl md:mx-[185px] md:px-[30px] md:py-[50px] md:pb-[250px]'>
                <div className='w-full flex items-center justify-between md:gap-x-[30px]'>
                    <div className='w-full md:w-[65%]'>
                        {/* 1 */}
                        <div className='w-full flex flex-row gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mb-[25px]'>
                            <div className='w-1/2 flex flex-col items-start'>
                                <div className='flex items-center justify-center mb-[5px]'>
                                    <label htmlFor="" className='text-[13px] md:text-base font-AeonikProRegular'>Раздел одежды</label>
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
                                    <label htmlFor="" className='text-[13px] md:text-base font-AeonikProRegular'>Подраздел одежды </label>
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
                        <div className='w-full flex flex-row gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mb-[25px]'>
                            <div className='w-1/2 flex  flex-col items-start'>
                                <div className='flex items-center justify-center mb-[5px]'>
                                    <label htmlFor="" className='text-[13px] md:text-base font-AeonikProRegular'>Сезон одежды</label>
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
                                    <label htmlFor="" className='text-[13px] md:text-base font-AeonikProRegular'>Цвет</label>
                                    <span className='ml-[5px]'><StarLabel/></span>
                                </div>
                                <div className='w-full flex items-center justify-between border rounded-lg py-[7px] md:py-[9px] px-[12px]'>
                                    {changeColor?.map((data) => {
                                        return (
                                            <div key={data?.id} className='hidden md:block'>
                                                <label
                                                    key={data?.id}
                                                    className={`${data.colors} rounded-full border border-${data.colors} w-[22px] h-[22px] cursor-pointer flex items-center justify-center hover:scale-110 duration-300 `}
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
                                    <button className='w-full flex md:hidden items-center justify-between'>
                                        <span className='text-borderColor font-AeonikProRegular'>Выбрать</span>
                                        <span className=''>
                                            <ArrowRightIcon />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 3 */}
                        <div className='w-full flex flex-row gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mb-[25px]'>
                            <div className='w-1/2 flex  flex-col items-start'>
                                <div className='flex items-center justify-center mb-[5px]'>
                                    <label htmlFor="" className='text-[13px] md:text-base font-AeonikProRegular'>Пол</label>
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
                                    <label htmlFor="" className='text-[13px] md:text-base font-AeonikProRegular'>Артикул</label>
                                    <span className='font-AeonikProMedium text-[10px] md:text-[13px] text-textLightColor ml-[5px]'>(не обезательно)</span>
                                </div>
                                <input type='text' className='w-full flex items-center justify-between border rounded-lg py-[7px] px-[10px] outline-none' />
                            
                            </div>
                        </div>

                        {/* 4 */}
                        <div className='w-full flex flex-row gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mb-[25px]'>
                            <div className='w-1/2 flex items-center gap-x-[25px]'>
                                <div className='w-[45%] hidden md:flex flex-col items-start'>
                                    <div className='flex items-center justify-center mb-[5px]'>
                                        <label htmlFor="" className='text-[13px] md:text-base font-AeonikProRegular'>Возраст</label>
                                        <span className='ml-[5px]'><StarLabel/></span>
                                    </div>
                                    <div className='w-full flex items-center'>
                                        <input
                                            type='number'
                                            className='w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px] py-[10px] outline-none text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                            placeholder='Мин'
                                        />
                                        <span className='rotate-90 text-borderColor ml-3 mr-[9px]'>|</span>
                                        <input
                                            type='number'
                                            className='w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[10px] py-[10px] outline-none text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                            placeholder='Макс'
                                        />
                                    </div>
                                </div>
                                <div className='w-full md:w-[55%]'>
                                    <div className='flex items-center mb-[5px]'>
                                        <label htmlFor="" className='text-[13px] md:text-base font-AeonikProRegular'>Цена</label>
                                        <span className='ml-[5px]'><StarLabel/></span>
                                    </div>
                                    <div className='w-full h-[42px] flex items-center border border-borderColor px-3 py-[6px] rounded-lg text-xs'>
                                        <input type='number' className='w-[70%] font-AeonikProMedium outline-none [&::-webkit-inner-spin-button]:appearance-none'/>
                                        <span className='text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular'>сум</span>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/2 flex flex-col items-start'>
                                <div className='flex items-center justify-center mb-[5px]'>
                                    <label htmlFor="" className='text-[13px] md:text-base font-AeonikProRegular'>Скидка</label>
                                    <span className='font-AeonikProMedium text-[10px] md:text-[13px] text-textLightColor ml-[5px]'>(не обезательно)</span>
                                </div>
                                <div className='w-full flex items-center justify-center'>
                                    <div className='w-full flex items-center gap-x-1'>
                                        <div className='w-[40%] md:w-[25%] flex items-start'>
                                            <div className='w-full flex items-center justify-center border border-borderColor rounded-lg px-[10px] py-[8px]'>
                                                <input
                                                    type='number'
                                                    className='w-[70%] font-AeonikProMedium text-center outline-none text-xs [&::-webkit-inner-spin-button]:appearance-none'
                                                />
                                                <span className='text-textLightColor ml-2'>%</span>
                                            </div>
                                        </div>
                                        <span className='rotate-90 text-borderColor ml-[6px] mr-1 md:ml-3 md:mr-[9px]'>|</span>
                                        <div className='w-[60%] md:w-[75%] flex items-center'>
                                            <div className='w-full h-[42px] flex items-center justify-between border border-borderColor px-3 py-[6px] rounded-lg text-xs'>
                                                <input type='number' className='w-[75%] font-AeonikProMedium outline-none [&::-webkit-inner-spin-button]:appearance-none'/>
                                                <span className='text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular'>сум</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5 */}
                        <div className='w-full flex flex-row gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mb-[25px]'>
                            <div className='w-1/2 flex md:hidden flex-col items-start'>
                                <div className='flex items-center justify-center mb-[5px]'>
                                    <label htmlFor="" className='text-[13px] md:text-base font-AeonikProRegular'>Возраст</label>
                                    <span className='ml-[5px]'><StarLabel/></span>
                                </div>
                                <div className='w-full flex items-center'>
                                    <input
                                        type='number'
                                        className='w-1/2 md:w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px] py-[10px] outline-none text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                        placeholder='Мин'
                                    />
                                    <span className='rotate-90 text-borderColor ml-3 mr-[9px]'>|</span>
                                    <input
                                        type='number'
                                        className='w-1/2 md:w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[10px] py-[10px] outline-none text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                        placeholder='Макс'
                                    />
                                </div>
                            </div>
                            <div className='w-1/2 hidden md:flex flex-col items-start'>
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
                                <div className='w-full md:w-1/2 flex flex-col items-start'>
                                    <div className='flex items-center justify-center mb-[5px]'>
                                        <label htmlFor="" className='text-[13px] md:text-base font-AeonikProRegular'>Тип </label>
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
                                <div className='w-1/2 hidden md:flex flex-col items-start'>
                                    <div className='flex items-center justify-center mb-[5px]'>
                                        <label htmlFor="" className='text-base font-AeonikProRegular'>Вес (грамм)</label>
                                        <span className='ml-[5px]'><StarLabel/></span>
                                    </div>
                                    <input type='number' className='w-full border border-borderColor p-[11px] rounded-lg outline-none text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' placeholder='(не обезательно)' />
                                </div>
                            </div>
                        </div>
                                        
                        {/* bottom buttons for mobile */}
                        <div className='w-full flex md:hidden flex-row gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mb-[25px]'>
                            <div className='w-1/2 flex flex-col items-start'>
                                <div className='flex items-center justify-center mb-[5px]'>
                                    <label htmlFor="" className='text-[13px] md:text-base font-AeonikProRegular'>Категория одежды</label>
                                    <span className='ml-[5px]'></span>
                                </div>
                                <Select
                                    className="hidden md:flex rounded-lg w-full h-11 md:h-10"
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
                                <button className='w-full flex md:hidden items-center justify-between border border-borderColor rounded-lg h-[39px] p-2'>
                                    <span className='text-borderColor font-AeonikProRegular text-[11px] '>Выбрать</span>
                                    <span className=''>
                                        <ArrowRightIcon />
                                    </span>
                                </button>
                            </div>
                            <div className='w-1/2 flex flex-col items-start'>
                                <div className='flex items-center justify-center mb-[5px]'>
                                    <label htmlFor="" className='text-[13px] md:text-base font-AeonikProRegular'>Вес (грамм)</label>
                                    <span className='ml-[5px]'><StarLabel/></span>
                                </div>
                                <input type='number' className='w-full border border-borderColor p-[11px] rounded-lg outline-none text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' placeholder='(не обезательно)' />
                            </div>
                        </div>

                        {/* 6 */}
                        <div className='w-full hidden md:flex items-center justify-between'>
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
                                placement="bottom"
                                content={contentUnderWear}
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
                                content={contentShoes}
                            >
                            Обувь
                            </Popover>
                            <Popover
                                // open={state?.openwear}
                                // onOpenChange={handleOpenChangeWear}
                                className="group px-[15px] h-[38px] border-textBlueColor text-textBlueColor border-[1.5px] font-AeonikProMedium flex items-center justify-center text-sm cursor-pointer active:scale-95  rounded-lg focus:bg-textBlueColor focus:text-white hover:bg-textBlueColor hover:text-white transition duration-300"
                                trigger="click"
                                options={["Hide"]}
                                placement="bottomRight"
                                content={contentAccessories}
                            >
                                Аксессуары
                            </Popover> 
                        </div>
                    </div>
                    
                    
                    <div className='w-[35%] h-[510px] hidden md:block'>
                        <div className='flex items-center justify-start mb-[5px]'>
                            <label htmlFor="" className='text-base font-AeonikProRegular'>Фото</label>
                            <span className='ml-[5px]'><StarLabel/></span>
                        </div>
                        <div className='w-full h-[400px] bg-photoBg flex items-center justify-center border border-dashed rounded-lg'>
                            <Link to='#' className='text-textBlueColor border-b border-textBlueColor font-AeonikProMedium'>Выберите фото</Link>
                        </div>
                        <div className='w-full flex items-center justify-between gap-x-[10px] mt-[10px]'>
                            <div className='w-1/3 flex flex-col items-center justify-center mb-[21px]'>
                                <Link to='#' className='w-full h-[73px] flex items-center justify-center rounded-lg border border-dashed bg-photoBg'>
                                    <DownloadIcon />
                                </Link>
                            </div>
                            <div className='w-1/3 flex flex-col items-center justify-center'>
                                <Link to='#' className=' w-full h-[73px] flex items-center justify-center rounded-lg border border-dashed bg-photoBg'>
                                    <DownloadIcon />
                                </Link>
                                <div className='text-[11px] text-textLightColor mt-[5px]'>(не обезательно)</div>
                            </div>
                            <div className='w-1/3 flex flex-col items-center justify-center '>
                                <Link to='#' className=' w-full h-[73px] flex items-center justify-center rounded-lg border border-dashed bg-photoBg'>
                                    <DownloadIcon />
                                </Link>
                                <div className='text-[11px] text-textLightColor mt-[5px]'>(не обезательно)</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex md:hidden items-center justify-center mb-[40px]">
                    <div className="w-1/3 h-[1px] bg-borderColor"></div>
                    <div className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full  mx-[10px]">
                        <span className="w-2 h-2 rounded-full bg-textBlueColor block "></span>
                    </div>
                    <div className="h-[1px] bg-textBlueColor w-[50px]"></div>
                    <div className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full  mx-[10px]"></div>
                    <div className="h-[1px] bg-borderColor flex-grow"></div>
                </div>
                
                <Link to='/products_nextpage' className='w-full flex items-center justify-center md:w-fit md:absolute active:scale-95 md:right-3 md:bottom-3 md:px-[50px] py-3 border border-textBlueColor bg-textBlueColor text-white rounded-lg text-base md:text-lg font-AeonikProMedium'>Продолжить</Link>
                
            </form>
        </div>
    )
}

export default AddingProduct