import React, { useState, useEffect, useRef, useContext } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Slider from "react-slick";
import { LanguageDetectorDress } from "../../../../language/LanguageItem";

const WearCommentDetail = ({ sliderData }) => {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

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
    };
  }, [screenSize]);

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
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full h-fit">
      <div className="pb-5 text-tableTextTitle2 text-xl not-italic font-AeonikProMedium flex items-center gap-x-4">
        <div className="h-5 w-[4px] bg-textBlueColor"></div>
        <p>
          {languageDetector?.typeLang === "ru" &&
            sliderData?.locationListId?.product?.name_ru}
          {languageDetector?.typeLang === "uz" &&
            sliderData?.locationListId?.product?.name_uz}
        </p>
      </div>
      <section className="w-full flex flex-col flex-wrap h-fit gap-x-[10px]">
        <div className="w-full flex items-start md:gap-x-[10px]">
          {sliderData?.locationListId?.product?.photos?.length > 1 ? (
            <div className="flex md:h-[402px] gap-x-4">
              <div className="md:w-[350px] h-full  overflow-hidden flex items-center justify-center md:border border-searchBgColor rounded-xl">
                <Slider
                  className="w-full h-full flex items-center justify-center rounded-lg "
                  asNavFor={nav2}
                  ref={slider1}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  {...settings}
                >
                  {sliderData?.locationListId?.product?.photos?.map((data) => {
                    return (
                      <article
                        key={data?.id}
                        className="flex items-center justify-center h-full"
                      >
                        <figure className="md:h-full overflow-hidden border border-searchBgColor bg-btnBgColor rounded-lg flex items-center justify-center">
                          <img
                            className="md:w-[350px] md:h-[402px] object-cover"
                            src={data?.url_photo}
                            alt=""
                          />
                        </figure>
                      </article>
                    );
                  })}
                </Slider>
              </div>
              <div className="w-full md:w-[120px] h-full flex items-center justify-between  border border-red-600">
                <Slider
                  asNavFor={nav1}
                  ref={slider2}
                  swipeToSlide={true}
                  focusOnSelect={true}
                  vertical={true}
                  {...settings1}
                  className="!w-full h-full  flex items-center justify-between flex-row flex-wrap pt-0 rounded-lg border border-green-600"
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
              </div>
            </div>
          ) : (
            <div>
              <div className="w-[350px] md:h-[380px] overflow-hidden flex items-center justify-center border border-searchBgColor rounded-xl">
                {sliderData?.locationListId?.product?.photos?.map((data) => {
                  return (
                    <article key={data?.id}>
                      <figure className="relative w-full h-[200px] md:h-full overflow-hidden border border-searchBgColor bg-btnBgColor rounded-lg flex items-center justify-center">
                        <img
                          className="h-full md:w-full md:h-fit"
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
    </div>
  );
};
export { WearCommentDetail };
