import React, { useEffect, useRef, useState } from "react";
import { GrClose, GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  InputCheck,
  InputCheckedTrueIcons,
  MenuCloseIcons,
} from "../../../../../../assets/icons";
import Slider from "react-slick";
import CarouselItem from "./CarouselItem/CarouselItem";
import { img1, img2, img3, img4 } from "../../../../../../assets";
import WearCarouselScroll from "./WearCarosuelScroll/WearCarouselScroll";

export default function WearCollection({ onClick, openModalId }) {


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
  const wearGroup = [
    { id: 1, name: "Футболки" },
    { id: 2, name: "Рубашки" },
    { id: 3, name: "Шорты" },
    { id: 4, name: "Джинсы" },
    { id: 5, name: "Свитер" },
    { id: 6, name: "Куртки" },
    { id: 7, name: "Толстовки" },
    { id: 8, name: "Обуви" },
    { id: 9, name: "Куртки" },
    { id: 10, name: "Сапоги" },
    { id: 11, name: "Платья" },
    { id: 12, name: "Юбки" },
    { id: 13, name: "Ремень" },
  ];
  return (
    <>


      <div className="max-w-[440px] md:max-w-[1450px] bg-white h-fit w-full overflow-hidden border border-borderColor2">
        <div className="flex items-center flex-col w-full px-4 py-8 gap-y-6">
          <div className={`w-full flex items-center justify-between`}>
            <span className="text-gray-800 text-2xl not-italic font-AeonikProRegular">
              Все фото
            </span>
            <button className="py-2" type="" onClick={onClick}>
              <GrClose size={22} />
            </button>
          </div>

          <WearCarouselScroll _class="WearScroll gap-x-2 ">
            {wearGroup?.map((data) => {
              return (
                <div key={data.id} className={`WearScrollItem`}>

                  <div className="!w-[350px] h-[500px] flex flex-col  border border-lightBorderColor bg-lightBgColor rounded-lg overflow-hidden p-[10px]">

                    <div className="w-full h-full flex items-center">
                      <Slider
                        className="w-full h-full rounded-lg "
                        asNavFor={nav2}
                        ref={slider1}
                        {...settings}
                      >
                        {imgGroup?.map((data) => {
                          return (
                            <article key={data?.id} onClick={openModalId}>
                              <img
                                className="w-full h-[300px] object-cover object-top	 rounded-lg"
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
                              className="!w-[full] !h-[70px] cursor-pointer bg-btnBgColor rounded-lg "
                            >
                              <img
                                className="w-fit h-full md:p-0 object-top	object-cover
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
                        <span className="text-base font-AeonikProRegular ">
                          Цвет:
                        </span>
                        <span className="w-fit h-fit flex items-center justify-center text-white px-2 py-[5px] rounded-full border bg-black text-white ml-[10px] text-xs not-italic font-AeonikProMedium">
                          Черный
                        </span>
                      </div>
                      <div className="w-1/2 flex items-center justify-end">
                        <span className="text-base font-AeonikProRegular ">
                          Статус:
                        </span>
                        <span className="w-fit h-fit text-sm font-AeonikProRegular border bg-redText text-white px-2 py-[5px] ml-[10px] rounded-2xl">
                          Отказанный
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </WearCarouselScroll>

          {/* <div className="w-full flex items-center gap-x-[30px] whitespace-nowrap overflow-x-scroll bor">
          <div className="!w-[320px] h-[480px] flex flex-col  border border-lightBorderColor bg-lightBgColor rounded-lg overflow-hidden p-[10px]">
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
                        className="w-full h-[300px] object-cover object-top	 rounded-lg"
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
                      className="!w-[full] !h-[70px] cursor-pointer bg-btnBgColor rounded-lg "
                    >
                      <img
                        className="w-fit h-full md:p-0 object-top	object-cover
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
                <span className="text-base font-AeonikProRegular ">
                  Цвет:
                </span>
                <span className="w-fit h-fit flex items-center justify-center text-white px-2 py-[5px] rounded-full border bg-black text-white ml-[10px] text-xs not-italic font-AeonikProMedium">
                  Черный
                </span>
              </div>
              <div className="w-1/2 flex items-center justify-end">
                <span className="text-base font-AeonikProRegular ">
                  Статус:
                </span>
                <span className="w-fit h-fit text-sm font-AeonikProRegular border bg-redText text-white px-2 py-[5px] ml-[10px] rounded-2xl">
                  Отказанный
                </span>
              </div>
            </div>
          </div>
          <div className="!w-[320px] h-[480px] flex flex-col  border border-lightBorderColor bg-lightBgColor rounded-lg overflow-hidden p-[10px]">
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
                        className="w-full h-[300px] object-cover object-top	 rounded-lg"
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
                      className="!w-[full] !h-[70px] cursor-pointer bg-btnBgColor rounded-lg "
                    >
                      <img
                        className="w-fit h-full md:p-0 object-top	object-cover
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
                <span className="text-base font-AeonikProRegular ">
                  Цвет:
                </span>
                <span className="w-fit h-fit flex items-center justify-center text-white px-2 py-[5px] rounded-full border bg-black text-white ml-[10px] text-xs not-italic font-AeonikProMedium">
                  Черный
                </span>
              </div>
              <div className="w-1/2 flex items-center justify-end">
                <span className="text-base font-AeonikProRegular ">
                  Статус:
                </span>
                <span className="w-fit h-fit text-sm font-AeonikProRegular border bg-redText text-white px-2 py-[5px] ml-[10px] rounded-2xl">
                  Отказанный
                </span>
              </div>
            </div>
          </div>
          <div className="!w-[320px] h-[480px] flex flex-col  border border-lightBorderColor bg-lightBgColor rounded-lg overflow-hidden p-[10px]">
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
                        className="w-full h-[300px] object-cover object-top	 rounded-lg"
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
                      className="!w-[full] !h-[70px] cursor-pointer bg-btnBgColor rounded-lg "
                    >
                      <img
                        className="w-fit h-full md:p-0 object-top	object-cover
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
                <span className="text-base font-AeonikProRegular ">
                  Цвет:
                </span>
                <span className="w-fit h-fit flex items-center justify-center text-white px-2 py-[5px] rounded-full border bg-black text-white ml-[10px] text-xs not-italic font-AeonikProMedium">
                  Черный
                </span>
              </div>
              <div className="w-1/2 flex items-center justify-end">
                <span className="text-base font-AeonikProRegular ">
                  Статус:
                </span>
                <span className="w-fit h-fit text-sm font-AeonikProRegular border bg-redText text-white px-2 py-[5px] ml-[10px] rounded-2xl">
                  Отказанный
                </span>
              </div>
            </div>
          </div>
          <div className="!w-[320px] h-[480px] flex flex-col  border border-lightBorderColor bg-lightBgColor rounded-lg overflow-hidden p-[10px]">
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
                        className="w-full h-[300px] object-cover object-top	 rounded-lg"
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
                      className="!w-[full] !h-[70px] cursor-pointer bg-btnBgColor rounded-lg "
                    >
                      <img
                        className="w-fit h-full md:p-0 object-top	object-cover
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
                <span className="text-base font-AeonikProRegular ">
                  Цвет:
                </span>
                <span className="w-fit h-fit flex items-center justify-center text-white px-2 py-[5px] rounded-full border bg-black text-white ml-[10px] text-xs not-italic font-AeonikProMedium">
                  Черный
                </span>
              </div>
              <div className="w-1/2 flex items-center justify-end">
                <span className="text-base font-AeonikProRegular ">
                  Статус:
                </span>
                <span className="w-fit h-fit text-sm font-AeonikProRegular border bg-redText text-white px-2 py-[5px] ml-[10px] rounded-2xl">
                  Отказанный
                </span>
              </div>
            </div>
          </div>
          <div className="!w-[320px] h-[480px] flex flex-col  border border-lightBorderColor bg-lightBgColor rounded-lg overflow-hidden p-[10px]">
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
                        className="w-full h-[300px] object-cover object-top	 rounded-lg"
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
                      className="!w-[full] !h-[70px] cursor-pointer bg-btnBgColor rounded-lg "
                    >
                      <img
                        className="w-fit h-full md:p-0 object-top	object-cover
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
                <span className="text-base font-AeonikProRegular ">
                  Цвет:
                </span>
                <span className="w-fit h-fit flex items-center justify-center text-white px-2 py-[5px] rounded-full border bg-black text-white ml-[10px] text-xs not-italic font-AeonikProMedium">
                  Черный
                </span>
              </div>
              <div className="w-1/2 flex items-center justify-end">
                <span className="text-base font-AeonikProRegular ">
                  Статус:
                </span>
                <span className="w-fit h-fit text-sm font-AeonikProRegular border bg-redText text-white px-2 py-[5px] ml-[10px] rounded-2xl">
                  Отказанный
                </span>
              </div>
            </div>
          </div>
        </div> */}
        </div>
      </div>
    </>
  );
}
