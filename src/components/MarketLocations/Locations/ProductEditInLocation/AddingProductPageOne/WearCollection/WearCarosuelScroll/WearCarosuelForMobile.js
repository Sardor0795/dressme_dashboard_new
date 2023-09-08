import React, { useEffect, useRef, useState } from 'react'
import { MenuCloseIcons } from '../../../../../../../assets/icons'
import { Popover, Select, Switch } from "antd";
import { img1, img2, img3, img4 } from '../../../../../../../assets';
import Slider from "react-slick";
import { GrClose, GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function WearCarosuelForMobile({ onClick }) {
    const [imgGroup] = useState([
        {
            id: 1,
            action: true,
            img: img4,
        },
        {
            id: 2,
            action: false,
            img: img2,
        },
        {
            id: 3,
            action: false,
            img: img3,
        },
        {
            id: 4,
            action: false,
            img: img1,
        },
    ]);

    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    const slider1 = useRef(null);
    const slider2 = useRef(null);

    useEffect(() => {
        setNav1(slider1.current);
        setNav2(slider2.current);
    }, []);

    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <main
                className={`absolute text-center cursor-pointer no-underline opacity-50 w-8 h-8 flex items-center justify-center top-[50%] z-10  right-2 ls:right-[20px] rounded-full bg-bgColor duration-200 border  border-searchBgColor  `}
                onClick={onClick}
            >
                <button className="next">
                    <GrFormNext size={20} />
                </button>
            </main>
        );
    };
    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <main
                className={`absolute text-center cursor-pointer no-underline opacity-50 w-8 h-8 flex items-center justify-center top-[50%] z-10  left-2 ls:left-[20px] rounded-full bg-bgColor duration-200 border  border-searchBgColor  `}
                onClick={onClick}
            >
                <button className="prev">
                    <GrFormPrevious size={20} />
                </button>
            </main>
        );
    };
    let settings = {
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        infinite: true,
        dots: false,
        speed: 500,
    };
    let settings1 = {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 560,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },

            {
                breakpoint: 390,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    return (
        <div className="max-w-[400px] w-[100%] h-[80vh] px-4 py-[18px] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
            <div className='flex items-center justify-between pb-4'>
                <span className='text-gray-800 text-xl not-italic font-AeonikProRegular'>Все фото</span>
                <button type='button' className='p-1' onClick={onClick}><MenuCloseIcons colors={"#000"} /></button>
            </div>
            {/* ----------- */}
            <div className='flex flex-col w-full h-full pb-10 gap-y-4  overflow-auto AllSizeModalScroll'>
                {
                    imgGroup.map(data => {
                        return (
                            <div className="w-full h-[350px] flex flex-col  gap-y-4 border border-borderColor rounded-lg p-[10px] bg-lightBgColor">
                                <div className='w-full flex gap-x-1 h-[280px]'>
                                    <div className="w-[270px] h-full flex items-center  ">
                                        <Slider
                                            className="w-full h-full rounded-lg "
                                            asNavFor={nav2}
                                            ref={slider1}
                                            {...settings}
                                        >
                                            {imgGroup?.map((data) => {
                                                return (
                                                    <article key={data?.id} object-fit>
                                                        <img
                                                            className="!w-full  !h-[280px]  object-cover   rounded-lg"
                                                            src={data?.img}
                                                            alt=""
                                                        />
                                                    </article>
                                                );
                                            })}
                                        </Slider>
                                    </div>
                                    <div className=" w-[110px] items-center justify-between   overflow-hidden ">
                                        <Slider
                                            asNavFor={nav1}
                                            ref={slider2}
                                            swipeToSlide={true}
                                            focusOnSelect={true}
                                            vertical={true}
                                            {...settings1}
                                            className="w-full flex items-center justify-between gap-y-2 flex-row flex-wrap rounded-lg "
                                        >
                                            {imgGroup?.map((data) => {
                                                return (
                                                    <figure
                                                        key={data?.id}
                                                        className="!w-[100%] cursor-pointer bg-btnBgColor rounded-lg "
                                                    >
                                                        <img
                                                            className=" h-[90px]  md:p-0 object-top	object-cover 
                                                            w-full  flex items-center justify-center border border-searchBgColor rounded-lg"
                                                            src={data?.img}
                                                            alt=""
                                                        />
                                                    </figure>
                                                );
                                            })}
                                        </Slider>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <div className='w-fit flex items-center gap-x-[10px]'>
                                        <span className='text-gray-800 text-sm not-italic font-AeonikProRegular'>Цвет:</span>
                                        <button className='px-4 py-1 cursor-pointer text-white bg-[#F4A622] rounded-[35px] text-xs not-italic font-AeonikProMedium'>Желтый</button>
                                    </div>
                                    <div className='w-fit flex items-center gap-x-[10px]'>
                                        <span className='text-gray-800 text-sm not-italic font-AeonikProRegular'>Статус:</span>
                                        <button className='px-4 py-1 cursor-pointer text-white bg-[#4FB459] rounded-[35px] text-xs not-italic font-AeonikProMedium'>Одобренный</button>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}
