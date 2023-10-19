import React, { useEffect, useState } from "react";
// import { ProductImg } from "../../assets";
import {
  MenuCloseIcons,
  SearchIcon,
} from "../../../../assets/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { pdpImg } from "../../../../assets";

import MobileHumburgerMenu from "../../../Navbar/mobileHamburgerMenu/MobileMenu";
// import { DatePicker } from "antd";
import PickerOfFilter from "../../../../hook/DatePickerOfFilter/DatePickerOfFilter";
import { useQuery } from "@tanstack/react-query";
// const { RangePicker } = DatePicker;


export default function LocationList() {

  const [locationListId, setLocationListId] = useState("")
  const [openSelect, setOpenSelect] = useState(false);
  const [shopsList, setShopsList] = useState()
  const navigate = useNavigate()

  const url = "https://api.dressme.uz/api/seller"

  // ------------GET HAS SHOP ?-----------------
  useQuery(["shops-location-modal"], () => {
    return fetch(`${url}/shops`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
    }).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        setShopsList(res)
        // console.log(res, "reslocation-modal");
      },
      onError: (err) => {
        // console.log(err, "err");
      },

    }
  )
  console.log(shopsList, "shopsList");

  const handleShopsOfLocation = (id) => {
    navigate(`/locations-store/:${id}`)
    setOpenSelect(false)
  }

  // // ------------GET  Has Magazin ?-----------------
  const { isLoading } = useQuery(["locations-index"], () => {
    return fetch(`${url}/shops/locations/index`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },

    }).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        setLocationListId(res)
        // console.log(res, "magazin yesy");
      },
      onError: (err) => {
        console.log(err, "err magazin");
      },
    }
  )
  console.log(locationListId?.locations?.data, "setLocationListId");

  const goMapCity = (id) => {
    navigate(`/locations-store/city/:${id}`);
  };
  const goMapWear = (id) => {
    navigate(`/locations-store/wears/:${id}`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const [showPicker, setShowPicker] = useState(true)
  const showPickerHandle = () => {
    setShowPicker(!showPicker)
  }
  // useEffect(() => {
  //   showPickerHandle()
  // }, [showPicker]);
  return (
    <div className="w-full h-full  px-4 md:px-0 ">
      <div
        className={`fixed cursor-pointer z-[200] inset-0 w-full h-full bg-black opacity-40 ${openSelect ? "" : "hidden"}`}
        onClick={() => setOpenSelect(false)}
      ></div>
      <section
        className={` max-w-[440px] md:max-w-[550px] z-[201] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${openSelect ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
          }`}

      >
        <button
          onClick={() => setOpenSelect(false)}
          type="button"
          className="absolute  right-3 top-3 w-5 h-5 ">
          <MenuCloseIcons
            className="w-full h-full"
            colors={"#a1a1a1"} />
        </button>
        <div className="w-full h-fit flex items-center justify-center py-5 border-b border-borderColor2">
          <p className="text-tableTextTitle2 text-2xl not-italic font-AeonikProRegular">
            Прикрепить к магазину
          </p>
        </div>
        <div className="w-full px-[10px] py-[30px] flex flex-col gap-y-[10px]">
          {shopsList?.shops?.data ?
            shopsList?.shops?.data?.map(item => {
              return (
                <>
                  {isLoading ? <div>
                    <h1>Waiting please....</h1>
                  </div> :
                    <button
                      onClick={() => handleShopsOfLocation(item?.id)}
                      key={item?.id}
                      className="w-full py-[10px] flex items-center justify-center rounded-[5px] hover:bg-LocationSelectBg focus:bg-LocationSelectBg"
                    >
                      <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                        {" "}
                        {item?.name}
                      </span>
                    </button>
                  }
                </>
              )
            })
            :
            <div className="flex items-center jsutify-center">
              Malumotlar mavjud emas...
            </div>
          }
        </div>

      </section>

      <div className=" md:hidden pt-6 pb-3 border-b border-[#F2F2F2] mb-3 flex items-center justify-between">
        <div>
          <MobileHumburgerMenu />
        </div>
        <p className="text-black text-2xl not-italic font-AeonikProMedium text-center">
          Все локации
        </p>
        <div className="w-[30px]"></div>
      </div>
      <section className="w-full md:hidden flex items-center justify-between md:justify-static gap-x-6 md:gap-x-[15px]">
        <label
          htmlFor="searchStore"
          className="w-full md:max-w-[400px] h-10 overflow-hidden border  border-lightBorderColor flex items-center rounded-lg"
        >
          <input
            type="text"
            name="s"
            id="searchStore"
            className="w-full h-full   outline-0 	pl-[10px]"
            placeholder="Поиск"
          />
          <span className="pr-[10px]">
            <SearchIcon />
          </span>
        </label>
        <div className="w-fit">
          <PickerOfFilter />
        </div>

      </section>
      <div className="w-full pt-6 pb-4 md:py-4 md:border-b border-lightBorderColor hidden md:block">
        <div className="flex justify-end items-center md:justify-between">
          <section className="hidden md:flex">
            <p className="text-black text-2xl not-italic font-AeonikProMedium">
              Все локации
            </p>
          </section>
          <div className="w-fit flex items-center gap-x-[15px]">
            <form className="max-w-[400px] w-[100%] h-10 overflow-hidden border border-lightBorderColor flex items-center px-[10px] rounded-lg">
              <input
                type="text"
                name="s"
                className="w-full h-full  outline-0	"
                placeholder="Поиск"
              />
              <button>
                <SearchIcon />
              </button>
            </form>
            <div className="w-fit">
              <PickerOfFilter />
            </div>

          </div>
        </div>
      </div>
      {
        locationListId?.locations?.data?.map((item, index) => {
          return (
            <div>
              < div className="md:mt-[16px] flex justify-between items-center">
                <p className="text-black text-[18px] md:text-2xl not-italic font-AeonikProMedium my-4">
                  {item?.shop?.name} <span className="hidden md:inline">({item?.length})</span>
                </p>

                <button
                  onClick={() => setOpenSelect(true)}
                  className="md:hidden p-2 flex items-center cursor-pointer rounded-lg active:scale-95  active:opacity-70 justify-center bg-weatherWinterColor">
                  <span className="text-[11px]  text-white not-italic font-AeonikProMedium">
                    Добавить локацию
                  </span>
                </button>
              </div>

              {/* Table */}
              <div className="w-full h-fit">
                {index == 0 && <div className="w-full mb-[10px] hidden md:block">
                  <ul className="w-full h-full flex items-center justify-between bg-lightBgColor border md:rounded-xl">
                    <li className="w-[70px] pl-4">
                      <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle2">
                        No:
                      </span>
                    </li>
                    <li className="w-[200px] pl-4 mr-[60px]">
                      <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle2">
                        Фото
                      </span>
                    </li>
                    <li className="w-[calc(100%-230px)]  flex items-center justify-between">
                      <ul className="flex items-center w-full">
                        <li className="w-[30%] ">
                          <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                            Регион{" "}
                          </span>
                        </li>
                        <li className="w-[20%]">
                          <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                            Адрес
                          </span>
                        </li>
                        <li className="w-[20%]">
                          <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                            Рабочее время
                          </span>
                        </li>
                        <li className="w-[30%] flex items-center justify-end ">
                          <button onClick={() => setOpenSelect(true)}
                            className="px-[30px] py-3 flex items-center rounded-lg active:scale-95  active:opacity-70 justify-center bg-weatherWinterColor">
                            <span className="text-sm  text-white not-italic font-AeonikProMedium">
                              Добавить локацию
                            </span>
                          </button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>}


                {/* table product */}
                <div className="w-full h-full  flex flex-col  md:rounded-xl overflow-auto rounded-xl md:border">
                  {/* {item.map((data, index) => {
                    return ( */}
                  <>
                    <ul
                      key={item?.id}
                      className="w-full last:border-b-0  md:px-0 md:py-3 md:bg-lightBgColor overflow-hidden hidden md:flex items-center justify-between mb-[6px] md:mb-0 gap-x-5 md:gap-x-0 border-b  bg-lightBgColor"
                    >
                      <li className="w-[70px]  pl-4 flex items-center text-tableTextTitle2 text-lg not-italic font-AeonikProRegular">
                        {index}
                      </li>
                      <li className="w-[200px] h-[100px] pl-4 flex items-center mr-[60px] rounded-lg overflow-hidden">
                        <img className="w-[100%] h-[100%] rounded-lg object-top	object-cover"
                          src={item?.url_image_path_one} alt="" />
                      </li>
                      <li className="w-[calc(100%-230px)] flex items-center justify-between">
                        <ul className="flex items-center w-full">
                          <li className="md:w-[32%] h-full pr-5">
                            <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium">
                              {item?.region?.name_ru || "city"}, {item?.sub_region?.name_ru || "sub_region"}
                            </span>
                          </li>
                          <li className="md:w-[22%] h-full">
                            <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium ">
                              {item?.address || "address"}
                            </span>{" "}
                          </li>
                          <li className="md:w-[13%] h-full">
                            <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium ">
                              {item?.work_time_from || "startTime"} - {item?.work_time_to || "endTime"}
                            </span>
                          </li>
                          <li className="md:w-[15%] h-full flex items-center justify-center text-center">
                            <button
                              onClick={() => goMapWear(item?.shop_id)}
                              className="text-textBlueColor text-center hover:underline text-[11px] md:text-base not-italic font-AeonikProMedium"
                            >
                              {/* item?.wearLink */}
                              Одежда
                            </button>
                          </li>
                          <li className="md:w-[25%] h-full flex items-center justify-center text-center">
                            <button
                              onClick={() => goMapCity(item?.id)}
                              className="text-textBlueColor text-center hover:underline text-[11px] md:text-base not-italic font-AeonikProMedium"
                            >
                              {/* {item?.showMore} */}
                              Подробнее
                            </button>
                          </li>
                        </ul>
                      </li>
                    </ul>

                    {/* Mobile */}
                    <div className="border rounded-xl border-[##F2F2F2] p-[10px] mb-3 md:hidden w-full">
                      <div className="mb-2">
                        <div className="w-full md:w-fit flex items-center justify-between text-xl font-AeonikProRegular ">
                          <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                          <span className="text-checkboxBorder">0{item?.id}</span>
                          <div className="w-[40%] border-b border-borderColor h-[2px]"></div>
                        </div>
                      </div>

                      <div className="mb-3 h-[148px]">
                        <figure className="w-full h-full rounded-lg overflow-hidden">
                          <img className="w-[100%] h-[100%]  object-cover" src={item?.url_image_path_one} alt="" />
                        </figure>
                      </div>

                      <div className="mb-[25px]">
                        <div className="border rounded-lg border-[#F2F2F2] bg-[#FCFCFC] px-1 ll:px-[10px] py-[5px] flex text-[#3F6175] font-AeonikProMedium text-[13px] items-center mb-[8px]">
                          <div className="text-[#3F6175] text-[12px] not-italic font-AeonikProMedium pr-[10px] w-[24%]">Регион</div>
                          <div className="text-[#3F6175] text-[12px] not-italic font-AeonikProMedium pr-[10px] w-[46%]">Адрес</div>
                          <div className="text-[#3F6175] text-[12px] text-center not-italic font-AeonikProMedium w-[30%]">Рабочее время</div>
                        </div>

                        <div className="px-1 ll:px-[10px] py-[5px] flex text-[#2C2C2C] font-AeonikProMedium text-[13px]">
                          <div className="pr-[5px] ll:pr-[10px] w-[24%] break-words  text-gray-700 text-[11px] not-italic font-AeonikProMedium">
                            {item?.region?.name_ru}
                          </div>
                          <div className="relative pr-[5px] ll:pr-[10px] h-[60px] overflow-hidden  w-[46%]  text-justify	text-[11px] not-italic font-AeonikProMedium">
                            <div className="absolute ToogleOff left-0 w-full h-full z-[10] top-0"></div>

                            {item?.address}</div>
                          <div className="w-[30%] flex  justify-center text-[11px] not-italic font-AeonikProMedium">
                            {item?.work_time_from || "startTime"} - {item?.work_time_to || "endTime"}
                          </div>
                        </div>
                      </div>
                      {/* {item?.region?.name_ru || "city"}, {item?.sub_region?.name_ru || "sub_region"} */}

                      <div className="flex items-center justify-between gap-x-[15px]">
                        <button
                          onClick={() => goMapWear(item?.shop_id)}
                          className="text-[#ED7925] bg-[#FDF1E8] text-center w-[50%] py-2 rounded-lg text-[13px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                        >
                          <span className="mr-[5px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <g clip-path="url(#clip0_1350_8602)">
                                <path
                                  d="M12.3335 5.66683V12.3335M12.3335 12.3335V14.6668H3.66683V12.3335M12.3335 12.3335H14.6668V5.66683C14.6668 4.66683 14.0002 3.50016 13.0002 2.66683C12.0002 1.8335 10.0002 1.3335 10.0002 1.3335H6.00016C6.00016 1.3335 4.00016 1.8335 3.00016 2.66683C2.00016 3.50016 1.3335 4.66683 1.3335 5.66683V12.3335H3.66683M3.66683 12.3335V5.66683"
                                  stroke="#ED7925"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M10 1.3335C10 1.86393 9.78929 2.37264 9.41421 2.74771C9.03914 3.12278 8.53043 3.3335 8 3.3335C7.46957 3.3335 6.96086 3.12278 6.58579 2.74771C6.21071 2.37264 6 1.86393 6 1.3335"
                                  stroke="#ED7925"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1350_8602">
                                  <rect width="16" height="16" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                          {item?.wearLink}
                        </button>
                        <button
                          onClick={() => goMapCity(item?.id)}
                          className="text-[#007DCA] bg-[#E8F5FD] text-center w-[50%] py-2 rounded-lg text-[13px] md:text-base not-italic font-AeonikProMedium flex items-center justify-center hover:opacity-80 active:opacity-60 transition-opacity duration-300"
                        >
                          {item?.showMore}
                          <span className="ml-[5px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="8"
                              viewBox="0 0 16 8"
                              fill="none"
                            >
                              <g clip-path="url(#clip0_1350_8461)">
                                <path
                                  d="M5.80625 4.7502H1.25C1.0375 4.7502 0.859253 4.6782 0.715253 4.5342C0.571253 4.3902 0.499503 4.2122 0.500003 4.0002C0.500003 3.7877 0.572003 3.60945 0.716003 3.46545C0.860003 3.32145 1.038 3.2497 1.25 3.2502H5.80625L4.0625 1.4877C3.925 1.3502 3.853 1.1782 3.8465 0.971695C3.84 0.765195 3.912 0.587195 4.0625 0.437695C4.2 0.300195 4.375 0.231445 4.5875 0.231445C4.8 0.231445 4.975 0.300195 5.1125 0.437695L8.15 3.4752C8.3 3.6252 8.375 3.8002 8.375 4.0002C8.375 4.2002 8.3 4.3752 8.15 4.5252L5.1125 7.5627C4.975 7.70019 4.803 7.7722 4.5965 7.7787C4.39 7.78519 4.212 7.71319 4.0625 7.5627C3.925 7.4252 3.85625 7.25019 3.85625 7.03769C3.85625 6.82519 3.925 6.6502 4.0625 6.5127L5.80625 4.7502ZM9.5 7.7502C9.2875 7.7502 9.1095 7.67819 8.966 7.53419C8.8225 7.39019 8.7505 7.21219 8.75 7.0002C8.75 6.78769 8.822 6.60945 8.966 6.46545C9.11 6.32145 9.288 6.24969 9.5 6.2502H14.75C14.9625 6.2502 15.1408 6.3222 15.2848 6.4662C15.4288 6.6102 15.5005 6.7882 15.5 7.0002C15.5 7.2127 15.428 7.39094 15.284 7.53494C15.14 7.67894 14.962 7.7507 14.75 7.7502H9.5ZM9.5 1.7502C9.2875 1.7502 9.1095 1.6782 8.966 1.5342C8.8225 1.3902 8.7505 1.2122 8.75 1.0002C8.75 0.787695 8.822 0.609446 8.966 0.465446C9.11 0.321446 9.288 0.249695 9.5 0.250195H14.75C14.9625 0.250195 15.1408 0.322195 15.2848 0.466195C15.4288 0.610195 15.5005 0.788195 15.5 1.0002C15.5 1.2127 15.428 1.39095 15.284 1.53495C15.14 1.67895 14.962 1.7507 14.75 1.7502H9.5ZM11.75 4.7502C11.5375 4.7502 11.3593 4.6782 11.2153 4.5342C11.0713 4.3902 10.9995 4.2122 11 4.0002C11 3.7877 11.072 3.60945 11.216 3.46545C11.36 3.32145 11.538 3.2497 11.75 3.2502H14.75C14.9625 3.2502 15.1408 3.3222 15.2848 3.4662C15.4288 3.6102 15.5005 3.7882 15.5 4.0002C15.5 4.2127 15.428 4.39095 15.284 4.53495C15.14 4.67895 14.962 4.7507 14.75 4.7502H11.75Z"
                                  fill="#007DCA"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1350_8461">
                                  <rect
                                    width="15"
                                    height="7.54765"
                                    fill="white"
                                    transform="translate(0.5 0.231445)"
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </>
                  {/* )
                  })} */}
                </div>
              </div>
            </div>)
        })
      }
    </div >
  );
}
