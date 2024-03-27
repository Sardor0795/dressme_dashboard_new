import React, { useState, useEffect, useRef, useContext } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Slider from "react-slick";
import { LanguageDetectorDress } from "../../../../language/LanguageItem";
import { MenuCloseIcons } from "../../../../assets/icons";

const WearCommentDetail = ({ sliderData }) => {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [modalOfCarsouel, setModalOfCarsouel] = useState(false);
  const [carosuelCurrent, setCarosuelCurrent] = useState(null);

  const [languageDetector] = useContext(LanguageDetectorDress);

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
      setCarosuelCurrent(null)
      setModalOfCarsouel(false)
    };
  }, [screenSize]);


  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef11 = useRef(null);
  let sliderRef22 = useRef(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  // useEffect(() => {
  //   setNav1(sliderRef1);
  //   setNav2(sliderRef2);
  // }, []);

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
  }
  const NextArrow11 = (props) => {
    const { onClick } = props;
    return (
      <main
        className={`absolute text-center cursor-pointer no-underline opacity-50 w-8 h-8 flex items-center justify-center top-[50%] z-[-10]  right-[20px] rounded-full bg-bgColor duration-200 border  border-searchBgColor  `}
        onClick={onClick}
      >
        <button className="next">
          <GrFormNext size={20} />
        </button>
      </main>
    );
  };

  const PrevArrow11 = (props) => {
    const { onClick } = props;
    return (
      <main
        className={`absolute text-center cursor-pointer no-underline opacity-50 w-8 h-8 flex items-center justify-center top-[50%] z-[-10]  left-[20px] rounded-full bg-bgColor duration-200 border  border-searchBgColor  `}
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
    nextArrow: <NextArrow11 />,
    prevArrow: <PrevArrow11 />,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 390,
        settings: {
          slidesToShow: 4,
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
  let settings11 = {
    nextArrow: <NextArrow11 />,
    prevArrow: <PrevArrow11 />,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 390,
        settings: {
          slidesToShow: 4,
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
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <div className="w-full h-fit">
      <section
        onClick={() => {
          setModalOfCarsouel(false)
        }}
        className={`fixed inset-0 z-[200] duration-200 w-full h-[100vh] bg-black opacity-60 
          ${modalOfCarsouel ? "" : "hidden"
          }`}
      ></section>

      <section
        className={`fixed z-[201] rounded-lg bg-white   w-fit h-fit m-auto cursor-pointer flex flex-col items-center justify-center inset-0  ${modalOfCarsouel ? "" : "hidden"
          }`}
      >
        <button
          onClick={() => setModalOfCarsouel(false)}
          className="absolute   z-[202] sm:top-0  top-[-50px] z-[224] right-[0px] sm:right-[-50px] md:right-[-80px]  flex items-center justify-center h-[38px] w-[38px] md:w-[50px] md:h-[50px] rounded-full bg-[#808080]">
          <MenuCloseIcons colors="#fff" />
        </button>
        <div>
          <div
            className="w-full max-w-[440px] md:max-w-[620px] h-fit bg-white rounded-lg mt-[-4px] p-0 m-0 "
          >
            < div className="w-full  flex flex-col items-center justify-start">
              {sliderData?.locationListId?.product?.photos?.filter(e => e?.id === carosuelCurrent)?.map(item => {
                return (
                  <div key={item?.id} className="w-full">
                    <div className="w-full h-[400px] md:h-[80vh]   flex items-center">
                      <img
                        src={item?.url_photo}
                        alt="backImg"
                        className=" w-full max-w-[440px] md:max-w-[620px] h-[400px] md:h-[80vh]	 border border-searchBgColor object-cover rounded-lg"
                      />

                    </div>
                  </div>
                )
              })
              }
            </div>
          </div>

        </div>
      </section>
      <section className="w-full flex flex-col flex-wrap h-fit ">
        <div className="w-full flex    items-start md:gap-x-[10px]">
          {sliderData?.locationListId?.product?.photos?.length > 1 ?
            <div className="w-full  ">
              {screenSize?.width > 768 &&
                <div className="w-full  flex h-fit md:h-[402px] gap-x-4 gap-y-4  ">
                  <Slider
                    className="w-full max-w-[350px] h-[200px] md:h-[402px] overflow-hidden flex items-center md:justify-start justify-center  mx-auto md:mx-0 md:border border-searchBgColor rounded-xl "
                    asNavFor={sliderRef22.current}
                    ref={sliderRef11}
                    {...settings}
                  >
                    {sliderData?.locationListId?.product?.photos?.map((data) => {
                      return (
                        <article
                          key={data?.id}
                          onClick={() => {
                            setModalOfCarsouel(true)
                            setCarosuelCurrent(data?.id)
                          }}
                          className="flex items-center justify-center h-full"
                        >
                          <figure className="md:h-full overflow-hidden border border-searchBgColor bg-btnBgColor rounded-lg flex items-center justify-center">
                            <img
                              className=" w-[350px] h-[200px] md:h-[402px] object-cover"
                              src={data?.url_photo}
                              alt=""
                            />
                          </figure>
                        </article>
                      );
                    })}
                  </Slider>
                  <Slider
                    asNavFor={sliderRef11.current}
                    ref={sliderRef22}
                    swipeToSlide={true}
                    focusOnSelect={true}
                    vertical={true}
                    {...settings11}
                    className="w-full md:w-[120px] h-full  flex items-center flex-row flex-wrap pt-0 rounded-lg   "
                  >
                    {sliderData?.locationListId?.product?.photos?.map((data) => {
                      return (
                        <figure
                          key={data?.id}
                          className="  !h-[90px] md:w-[120px]   cursor-pointer bg-btnBgColor rounded-lg "
                        >
                          <img
                            className="!h-[90px] md:w-[120px] object-cover flex items-center justify-center border border-searchBgColor rounded-lg"
                            src={data?.url_photo}
                            alt=""
                          />
                        </figure>
                      );
                    })}
                  </Slider>

                </div>}

              {screenSize?.width <= 768 && <div className="w-full  flex h-fit md:h-[402px] gap-x-4 gap-y-4 flex-col     ">
                <Slider
                  className="w-full max-w-[350px] h-[200px] md:h-[402px] overflow-hidden flex items-center   justify-center  mx-auto md:mx-0 md:border border-searchBgColor rounded-xl "
                  asNavFor={sliderRef2.current}
                  ref={sliderRef1}
                  {...settings}
                >
                  {sliderData?.locationListId?.product?.photos?.map((data) => {
                    return (
                      <article
                        key={data?.id}
                        onClick={() => {
                          setModalOfCarsouel(true)
                          setCarosuelCurrent(data?.id)
                        }}
                        className="flex items-center justify-center h-full"
                      >
                        <figure className="md:h-full overflow-hidden border border-searchBgColor bg-btnBgColor rounded-lg flex items-center justify-center">
                          <img
                            className=" w-[350px] h-[200px] md:h-[402px] object-cover"
                            src={data?.url_photo}
                            alt=""
                          />
                        </figure>
                      </article>
                    );
                  })}
                </Slider>
                <Slider
                  asNavFor={sliderRef1.current}
                  ref={sliderRef2}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  vertical={false}
                  {...settings1}
                  className="  w-full   mx-auto max-w-[350px] md:w-[120px]  h-[70px] md:h-full md:hidden flex items-center justify-between "
                >
                  {sliderData?.locationListId?.product?.photos?.map((data) => {
                    return (
                      <figure
                        key={data?.id}
                        className=" h-[70px] md:h-[90px] !w-[80px] md:w-[120px] cursor-pointer bg-btnBgColor rounded-lg mx-1"
                      >
                        <img
                          className="h-full md:h-[90px] w-full md:w-[120px] object-cover   rounded-lg"
                          src={data?.url_photo}
                          alt=""
                        />
                      </figure>
                    );
                  })}
                </Slider>
              </div>}
            </div>

            : (
              <div className="w-full">
                <div className="max-w-[350px] mx-auto h-[200px] md:h-[380px] overflow-hidden flex items-center justify-center border border-searchBgColor rounded-xl">
                  {sliderData?.locationListId?.product?.photos?.map((data) => {
                    return (
                      <article
                        onClick={() => {
                          setModalOfCarsouel(true)
                          setCarosuelCurrent(data?.id)
                        }}
                        key={data?.id}>
                        <figure className="relative  w-full h-full overflow-hidden bg-btnBgColor rounded-lg flex items-center justify-center">
                          <img
                            className=" w-[350px] md:h-[380px] h-[200px] object-cover"
                            src={data?.url_photo}
                            alt=""
                          />
                        </figure>
                      </article>
                    );
                  })}
                </div>
              </div>
            )}
        </div>
      </section>
    </div >
  );
};
export { WearCommentDetail };
