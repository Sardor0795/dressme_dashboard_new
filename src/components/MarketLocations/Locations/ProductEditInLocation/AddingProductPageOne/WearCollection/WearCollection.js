import React, { useEffect, useRef, useState } from "react";
import { GrClose, GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  InputCheck,
  InputCheckedTrueIcons,
} from "../../../../../../assets/icons";
import Slider from "react-slick";
import CarouselItem from "./CarouselItem/CarouselItem";

export default function WearCollection({ onClick }) {
  const [selectColorToggleMobile, setSelectColorToggleMobile] = useState(true); // Type
  const [colorGroup, setColorGroup] = useState([
    { id: 1, ColorId: 1, icons: InputCheck, action: false, colors: "bg-black" },
    { id: 2, ColorId: 2, icons: InputCheck, action: false, colors: "bg-white" },
    {
      id: 3,
      ColorId: 3,
      icons: InputCheck,
      action: false,
      colors: "bg-zinc-500",
    },
    {
      id: 4,
      ColorId: 4,
      icons: InputCheck,
      action: false,
      colors: "bg-purple-500",
    },
    {
      id: 5,
      ColorId: 5,
      icons: InputCheck,
      action: false,
      colors: "bg-sky-600",
    },
    {
      id: 6,
      ColorId: 6,
      icons: InputCheck,
      action: false,
      colors: "bg-amber-400 ",
    },
    {
      id: 7,
      ColorId: 7,
      icons: InputCheck,
      action: false,
      colors: "bg-green-700 ",
    },
    {
      id: 8,
      ColorId: 8,
      icons: InputCheck,
      action: false,
      colors: "bg-amber-600 ",
    },
    {
      id: 9,
      ColorId: 9,
      icons: InputCheck,
      action: false,
      colors: "bg-red-700  ",
    },
    {
      id: 10,
      ColorId: 10,
      icons: InputCheck,
      action: false,
      colors: "bg-purple-800 ",
    },
    {
      id: 11,
      ColorId: 11,
      icons: InputCheck,
      action: false,
      colors: "bg-blue-900 ",
    },
    {
      id: 12,
      ColorId: 12,
      icons: InputCheck,
      action: false,
      colors: "bg-yellow-900 ",
    },
  ]);

  const [imgGroup] = useState([
    {
      id: 1,
      action: true,
      img: "https://images.uzum.uz/ch15okj57mg9720fq5h0/original.jpg",
    },
    {
      id: 2,
      action: false,
      img: "https://images.uzum.uz/cgcp9n7g49devoab8a50/t_product_240_high.jpg",
    },
    {
      id: 3,
      action: false,
      img: "https://images.uzum.uz/ch15okng49devoaengt0/original.jpg",
    },
    {
      id: 4,
      action: false,
      img: "https://images.uzum.uz/ch15okvhj8j9g69e280g/original.jpg",
    },
    // {
    //   id: 5,
    //   action: false,
    //   img: "https://images.uzum.uz/cgcphi7hgiov1qif46p0/original.jpg",
    // },
    // {
    //   id: 6,
    //   action: false,
    //   img: "https://images.uzum.uz/ch0g2rr57mg9720fmb9g/t_product_240_high.jpg",
    // },
    // {
    //   id: 7,
    //   action: false,
    //   img: "https://images.uzum.uz/ch0g2rvhj8j9g69dv4v0/original.jpg",
    // },
    // {
    //   id: 8,
    //   action: false,
    //   img: "https://images.uzum.uz/ch0g2rvhj8j9g69dv4vg/original.jpg",
    // },
    // {
    //   id: 9,
    //   action: false,
    //   img: "https://images.uzum.uz/cgl7vevhj8j9g69br4e0/original.jpg",
    // },
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
        className={`absolute text-center cursor-pointer no-underline opacity-50 w-8 h-8 flex items-center justify-center top-[50%] z-10  right-[20px] rounded-full bg-bgColor duration-200 border  border-searchBgColor  `}
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
        className={`absolute text-center cursor-pointer no-underline opacity-50 w-8 h-8 flex items-center justify-center top-[50%] z-10  left-[20px] rounded-full bg-bgColor duration-200 border  border-searchBgColor  `}
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
    <div className="w-full">
      <section
        className={`h-fit top-30  left-[16px] fixed  bg-white shadow-lg  duration-200 z-50  w-[92%]`}
      >
        <div className="fixed inset-0 z-10 ">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={onClick}
          >

          </div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-[1450px] p-10 mx-auto bg-white rounded-md shadow-lg">
              <div className={`flex items-center justify-between`}>
                <span className="text-gray-800 text-2xl not-italic font-AeonikProRegular">
                  Все фото
                </span>
                <button className="py-2" type="" onClick={onClick}>
                  <GrClose size={22} />
                </button>
              </div>

              <div className="w-full flex items-center justify-between">
                  <div className="w-1/4 h-full flex flex-col border border-lightBorderColor bg-lightBgColor rounded-lg overflow-hidden p-[10px]">
                    <div className="w-full h-full flex items-center">
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
                                className="w-full h-[328px] rounded-lg"
                                src={data?.img}
                                alt=""
                              />
                            </article>
                          );
                        })}
                      </Slider>
                    </div>
                    <div className="w-full items-center justify-between mt-[8.7px] ">
                      <Slider
                        asNavFor={nav1}
                        ref={slider2}
                        // slidesToShow={5}
                        swipeToSlide={true}
                        focusOnSelect={true}
                        vertical={false}
                        {...settings1}
                        className="flex items-center justify-between flex-row flex-wrap pt-0 rounded-lg"
                      >
                        {imgGroup?.map((data) => {
                          return (
                            <figure
                              key={data?.id}
                              className="!w-[full] !h-[64px] md:!w-[95%] md:!h-[96px] cursor-pointer bg-btnBgColor rounded-lg "
                            >
                              <img
                                className="w-fit h-full md:p-0
                                md:w-full md:h-full flex items-center justify-center border border-searchBgColor rounded-lg"
                                src={data?.img}
                                alt=""
                              />
                            </figure>
                          );
                        })}
                      </Slider>
                    </div>
                    <div className="w-full flex items-center justify-between mt-5">
                        <div className="w-1/2 flex items-center">
                          <span  className="text-base font-AeonikProRegular ">Цвет:</span>
                          <span className="w-[22px] h-[22px] rounded-full border bg-black ml-[10px]"></span>
                        </div>
                        <div className="w-1/2 flex items-center justify-end">
                          <span className="text-base font-AeonikProRegular ">Статус:</span>
                          <span className="w-fit h-fit text-sm font-AeonikProRegular border bg-red-500 text-white px-2 py-[5px] ml-[10px] rounded-2xl">Отказанный</span>
                        </div>
                    </div>
                  </div>
                  <div className="w-1/4 h-full flex flex-col border border-lightBorderColor bg-lightBgColor rounded-lg overflow-hidden p-[10px]">
                    <div className="w-full h-full flex items-center">
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
                                className="w-full h-[328px] rounded-lg"
                                src={data?.img}
                                alt=""
                              />
                            </article>
                          );
                        })}
                      </Slider>
                    </div>
                    <div className="w-full items-center justify-between mt-[8.7px] ">
                      <Slider
                        asNavFor={nav1}
                        ref={slider2}
                        // slidesToShow={5}
                        swipeToSlide={true}
                        focusOnSelect={true}
                        vertical={false}
                        {...settings1}
                        className="flex items-center justify-between flex-row flex-wrap pt-0 rounded-lg"
                      >
                        {imgGroup?.map((data) => {
                          return (
                            <figure
                              key={data?.id}
                              className="!w-[full] !h-[64px] md:!w-[95%] md:!h-[96px] cursor-pointer bg-btnBgColor rounded-lg "
                            >
                              <img
                                className="w-fit h-full md:p-0
                                md:w-full md:h-full flex items-center justify-center border border-searchBgColor rounded-lg"
                                src={data?.img}
                                alt=""
                              />
                            </figure>
                          );
                        })}
                      </Slider>
                    </div>
                    <div className="w-full flex items-center justify-between mt-5">
                        <div className="w-1/2 flex items-center">
                          <span  className="text-base font-AeonikProRegular ">Цвет:</span>
                          <span className="w-[22px] h-[22px] rounded-full border bg-black ml-[10px]"></span>
                        </div>
                        <div className="w-1/2 flex items-center justify-end">
                          <span className="text-base font-AeonikProRegular ">Статус:</span>
                          <span className="w-fit h-fit text-sm font-AeonikProRegular border bg-red-500 text-white px-2 py-[5px] ml-[10px] rounded-2xl">Отказанный</span>
                        </div>
                    </div>
                  </div>
                  <div className="w-1/4 h-full flex flex-col border border-lightBorderColor bg-lightBgColor rounded-lg overflow-hidden p-[10px]">
                    <div className="w-full h-full flex items-center">
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
                                className="w-full h-[328px] rounded-lg"
                                src={data?.img}
                                alt=""
                              />
                            </article>
                          );
                        })}
                      </Slider>
                    </div>
                    <div className="w-full items-center justify-between mt-[8.7px] ">
                      <Slider
                        asNavFor={nav1}
                        ref={slider2}
                        // slidesToShow={5}
                        swipeToSlide={true}
                        focusOnSelect={true}
                        vertical={false}
                        {...settings1}
                        className="flex items-center justify-between flex-row flex-wrap pt-0 rounded-lg"
                      >
                        {imgGroup?.map((data) => {
                          return (
                            <figure
                              key={data?.id}
                              className="!w-[full] !h-[64px] md:!w-[95%] md:!h-[96px] cursor-pointer bg-btnBgColor rounded-lg "
                            >
                              <img
                                className="w-fit h-full md:p-0
                                md:w-full md:h-full flex items-center justify-center border border-searchBgColor rounded-lg"
                                src={data?.img}
                                alt=""
                              />
                            </figure>
                          );
                        })}
                      </Slider>
                    </div>
                    <div className="w-full flex items-center justify-between mt-5">
                        <div className="w-1/2 flex items-center">
                          <span  className="text-base font-AeonikProRegular ">Цвет:</span>
                          <span className="w-[22px] h-[22px] rounded-full border bg-black ml-[10px]"></span>
                        </div>
                        <div className="w-1/2 flex items-center justify-end">
                          <span className="text-base font-AeonikProRegular ">Статус:</span>
                          <span className="w-fit h-fit text-sm font-AeonikProRegular border bg-red-500 text-white px-2 py-[5px] ml-[10px] rounded-2xl">Отказанный</span>
                        </div>
                    </div>
                  </div>
                  <div className="w-1/4 h-full flex flex-col border border-lightBorderColor bg-lightBgColor rounded-lg overflow-hidden p-[10px]">
                    <div className="w-full h-full flex items-center">
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
                                className="w-full h-[328px] rounded-lg"
                                src={data?.img}
                                alt=""
                              />
                            </article>
                          );
                        })}
                      </Slider>
                    </div>
                    <div className="w-full items-center justify-between mt-[8.7px] ">
                      <Slider
                        asNavFor={nav1}
                        ref={slider2}
                        // slidesToShow={5}
                        swipeToSlide={true}
                        focusOnSelect={true}
                        vertical={false}
                        {...settings1}
                        className="flex items-center justify-between flex-row flex-wrap pt-0 rounded-lg"
                      >
                        {imgGroup?.map((data) => {
                          return (
                            <figure
                              key={data?.id}
                              className="!w-[full] !h-[64px] md:!w-[95%] md:!h-[96px] cursor-pointer bg-btnBgColor rounded-lg "
                            >
                              <img
                                className="w-fit h-full md:p-0
                                md:w-full md:h-full flex items-center justify-center border border-searchBgColor rounded-lg"
                                src={data?.img}
                                alt=""
                              />
                            </figure>
                          );
                        })}
                      </Slider>
                    </div>
                    <div className="w-full flex items-center justify-between mt-5">
                        <div className="w-1/2 flex items-center">
                          <span  className="text-base font-AeonikProRegular ">Цвет:</span>
                          <span className="w-[22px] h-[22px] rounded-full border bg-black ml-[10px]"></span>
                        </div>
                        <div className="w-1/2 flex items-center justify-end">
                          <span className="text-base font-AeonikProRegular ">Статус:</span>
                          <span className="w-fit h-fit text-sm font-AeonikProRegular border bg-red-500 text-white px-2 py-[5px] ml-[10px] rounded-2xl">Отказанный</span>
                        </div>
                    </div>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
