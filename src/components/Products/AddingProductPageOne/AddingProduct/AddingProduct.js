import { Popover, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import {
  AddIconsCircle1,
  ArrowRightIcon,
  ArrowTopIcons,
  DownloadIcon,
  InputCheckedTrueIcons,
  LineIcon,
  LoaderIcon,
  MenuCloseIcons,
  Star6Icon,
  StarLabel,
} from "../../../../assets/icons";
import { Link, NavLink, useParams } from "react-router-dom";
import ClothingTypesAnimationPage from "../MobileDropUpSides/ClothingTypesMobileDropUp/ClothingTypesMobileDropUp";
import ClothingSubSectionPage from "../MobileDropUpSides/ClothingSubSectionMobileDropUp/ClothingSubSectionMobileDropUp";
import WeatherMobileDropUp from "../MobileDropUpSides/WeatherMobileDropUp/WeatherMobileDropUp";
import ColorsMobileDropUp from "../MobileDropUpSides/ColorsMobileDropUp/ColorsMobileDropUp";
import GenderTypeDropUp from "../MobileDropUpSides/GenderTypeDropUp/GenderTypeDropUp";
import CategoriesMobileDropUp from "../MobileDropUpSides/CategoriesMobileDropUp/CategoriesMobileDropUp";
import TypesDropUp from "../MobileDropUpSides/TypesDropUp/TypesDropUp";
import AllSizeListForWear from "../../../../hook/AllSizeListForWear/AllSizeListForWear";
import { FaRandom } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const AddingProduct = () => {

  const [openColors, setOpenColors] = useState(false); // Colors
  const [openCategories, setOpenCategories] = useState(false); // Категория одежды
  const [openClothingSection, setOpenClothingSection] = useState(false); // Clothing Types
  const [openClothingSubSection, setOpenClothingSubSection] = useState(false); // Clothing Subsection
  const [openWeather, setOpenWeather] = useState(false); // Weather
  const [openGender, setOpenGender] = useState(false); // Genders
  const [openTypes, setOpenTypes] = useState(false); // Type
  const [showColor, setShowColor] = useState(false); // Color


  const toggleColors = React.useCallback(() => setOpenColors(false), []); // Colors
  const toggleCategories = React.useCallback(
    () => setOpenCategories(false),
    []
  ); // Categories
  const toggleClothingSection = React.useCallback(
    () => setOpenClothingSection(false),
    []
  ); // Clothing Types Section
  const toggleClothingSubSection = React.useCallback(
    () => setOpenClothingSubSection(false),
    []
  ); // Clothing SubSection
  const toggleWeather = React.useCallback(() => setOpenWeather(false), []); // Clothing SubSection
  const toggleGender = React.useCallback(() => setOpenGender(false), []); // Genders
  const toggleTypes = React.useCallback(() => setOpenTypes(false), []); // Type

  const [state, setState] = useState({
    buttonReviews: false,
    openDropModalButton: true,
  })
  // const [openDropModalButton,setOpenDropModalButton] = useState(false)

  const [productsData, setProductsData] = useState({})
  const url = "https://api.dressme.uz/api/seller";

  const { isLoading, isFetched } = useQuery(
    ["products-data-get"],
    () => {
      return fetch(`${url}/products/get-product-info`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
        },
      }).then((res) => res.json());
    },
    {
      onSuccess: (res) => {
        if (res) {
          setProductsData(res)
        }
      },
      onError: (err) => {
        console.log(err, "ERR PRODUCTS");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );


  useEffect(() => {
    if (state?.openDropModalButton) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [state?.openDropModalButton]);

  const toggleDropModalButton = () => {
    setState({ ...state, openDropModalButton: !state.openDropModalButton });
  };

  // For Drop UP
  useEffect(() => {
    if (
      openClothingSection ||
      openClothingSubSection ||
      openWeather ||
      openColors ||
      openGender ||
      openCategories ||
      openTypes
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [
    openClothingSection,
    openClothingSubSection,
    openWeather,
    openColors,
    openGender,
    openCategories,
    openTypes,
  ]);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
  };


  // --------------------------------------Возрастная категория Артикул Обхват Талии Цена Возраст


  // Hats
  const contentHat = (
    <div className="w-[520px] h-fit">
      <div
        className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
      >
        <div className="w-full flex justify-center  gap-x-10 px-3 pt-5">
          <div className="w-fit flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Обхват головы
              <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>

            <div className="w-full flex items-center mt-[7px]">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[55px] h-[38px] text-center border border-borderColor px-2 rounded-lg   outline-none font-AeonikProRegular "
                  placeholder="Мин"
                />
              </div>
              <span className="mx-[5px]"><LineIcon /></span>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[55px] h-[38px] text-center border border-borderColor px-2 rounded-lg  font-AeonikProRegular  outline-none"
                  placeholder="Макс"
                />
              </div>
            </div>
          </div>
          <div className="w-fit flex flex-col">
            <p className="flex items-center justify-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              One Size
              <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="flex items-center justify-center mt-[10px]">
              <Switch className="bg-[#8B8B8B]" onChange={onChangeSwitch} />
            </div>
          </div>
          <div className="w-fit flex flex-col items-center">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Количество
              <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="flex items-start justify-between ">
              <input
                type="text"
                className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-5  rounded-lg  font-AeonikProRegular "
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row px-3 gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mt-[15px]">
          <div className="w-1/2 flex items-center gap-x-[25px]">
            <div className="w-fit hidden md:flex flex-col items-start">
              <div className="flex items-center justify-center  mb-2 ll:mb-[10px]">
                <label
                  htmlFor=""
                  className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                  Возраст
                </label>
              </div>
              <div className="w-full flex items-center">
                <input
                  type="text"
                  className="inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none "
                  placeholder=""
                />
              </div>
            </div>
            <div className="w-full md:w-[90%]">
              <div className="flex items-center mb-2 ll:mb-[10px] ">
                <label
                  htmlFor=""
                  className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                  Цена
                </label>
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              <div className="w-full h-[40px] flex items-center border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                <input
                  type="text"
                  placeholder="0"
                  className="inputStyle w-[70%] font-AeonikProMedium outline-none "
                />
                <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                  сум
                </span>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-start">
            <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
              <label
                htmlFor=""
                className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                Скидка
              </label>
              <span className="font-AeonikProMedium text-[10px] md:text-[13px] text-textLightColor ml-[5px]">
                (необязательно)
              </span>
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="w-full flex items-center gap-x-1">
                <div className="w-[40%] md:w-[72px] flex items-start">
                  <div className="w-full h-10 flex items-center justify-center border border-borderColor rounded-lg px-[10px] md:px-3 py-[8px]">
                    <input
                      type="text"
                      placeholder="0"
                      className="inputStyle w-[70%] font-AeonikProMedium text-start outline-none "
                    />
                    <span className="text-textLightColor ml-2">%</span>
                  </div>
                </div>
                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                <div className="w-[60%] md:w-[75%] flex items-center">
                  <div className="w-full h-[40px] flex items-center justify-between border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                    <input
                      type="text"
                      placeholder="0"
                      className="inputStyle w-[75%] font-AeonikProMedium outline-none "
                    />
                    <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                      сум
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full flex items-end justify-end text-lg text-textBlueColor font-AeonikProMedium pr-1">
          готово
        </button>
      </div>
    </div>
  );
  // Outerwear bor 
  const contentOutwear = (
    <div className="w-[855px] h-fit">
      <div
        className={`w-full h-fit flex flex-col items-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
      >
        <div className="w-full flex  gap-x-10 px-3 pt-5">
          <div className="w-[20%] flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Обхват Груди
              <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="flex items-center">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[60px] text-center h-[38px] border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                  placeholder="Мин"
                />
              </div>
              <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[60px] text-center h-[38px] border border-borderColor px-3  rounded-lg font-AeonikProRegular "
                  placeholder="Макс"
                />
              </div>
            </div>
          </div>
          <div className="w-[20%] flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Размер
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="flex items-center">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[60px] text-center h-[38px] border border-borderColor px-3  rounded-lg font-AeonikProRegular "
                  placeholder="Мин"
                />
              </div>
              <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[60px] text-center h-[38px] border border-borderColor px-3  rounded-lg font-AeonikProRegular "
                  placeholder="Макс"
                />
              </div>
            </div>
          </div>
          <div className="w-[53%] flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
              Обхват Размер
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <AllSizeListForWear />
          </div>
        </div>
        <div className="w-full flex justify-start items-center gap-x-10 px-3 pt-5">
          <div className="w-fit flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Обхват Талии
              <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="flex items-center">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[60px] h-[38px]  text-center border border-borderColor px-2 md:px-3  rounded-lg   font-AeonikProRegular "
                  placeholder="Мин"
                />
              </div>
              <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[60px] h-[38px]  text-center border border-borderColor px-2 md:px-3  rounded-lg  font-AeonikProRegular "
                  placeholder="Макс"
                />
              </div>
            </div>
          </div>
          <div className="w-fit flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Обхват Бедер
            </p>
            <div className="flex items-center">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[60px] h-[38px]  text-center border border-borderColor px-2 md:px-3  rounded-lg   font-AeonikProRegular "
                  placeholder="Мин"
                />
              </div>
              <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-2 md:px-3  rounded-lg  font-AeonikProRegular "
                  placeholder="Макс"
                />
              </div>
            </div>
          </div>
          <div className="w-fit flex flex-col md:ml-5">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Количество
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="flex items-start justify-between ">
              <input
                type="text"
                className="inputStyle  w-[60px] h-[38px] text-center border border-borderColor px-5  rounded-lg  font-AeonikProRegular "
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row px-3 gap-x-[11px] md:pt-5 md:gap-x-[20px] mb-[15px]">
          <div className="w-fit flex items-center gap-x-[25px]">
            <div className="w-fit hidden md:flex flex-col items-start">
              <div className="flex items-center justify-center ">
                <label
                  htmlFor=""
                  className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                  Возраст
                </label>
                {/* <span className="ml-[5px]">
                  <StarLabel />
                </span> */}
              </div>
              <div className="w-fit flex items-center">
                <input
                  type="text"
                  className="inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg   outline-none"
                  placeholder=""
                />
              </div>
            </div>
            <div className="w-full md:w-[55%]">
              <div className="flex items-center mb-2 ll:mb-[10px] ">
                <label
                  htmlFor=""
                  className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                  Цена
                </label>
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              <div className="w-full h-[40px] flex items-center border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                <input
                  type="text"
                  placeholder="0"
                  className="inputStyle w-[70%] font-AeonikProMedium outline-none "
                />
                <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                  сум
                </span>
              </div>
            </div>
          </div>
          <div className="w-fit flex flex-col items-start">
            <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
              <label
                htmlFor=""
                className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">

                Скидка
              </label>
              <span className="font-AeonikProMedium text-[10px] md:text-[13px] text-textLightColor ml-[5px]">
                (необязательно)
              </span>
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="w-full flex items-center gap-x-1">
                <div className="w-[40%] md:w-[72px] flex items-start">
                  <div className="w-full h-10 flex items-center justify-center border border-borderColor rounded-lg px-[10px] md:px-3 py-[8px]">
                    <input
                      type="text"
                      placeholder="0"
                      className="inputStyle w-[70%] font-AeonikProMedium text-start outline-none "
                    />
                    <span className="text-textLightColor ml-2">%</span>
                  </div>
                </div>
                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                <div className="w-[60%] md:w-[75%] flex items-center">
                  <div className="w-full h-[40px] flex items-center justify-between border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                    <input
                      type="text"
                      placeholder="0"
                      className="inputStyle w-[75%] font-AeonikProMedium outline-none "
                    />
                    <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                      сум
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full flex items-end justify-end text-lg text-textBlueColor font-AeonikProMedium pr-1">
          готово
        </button>
      </div>
    </div>
  );
  // Underwear bor Цена
  const contentUnderWear = (
    <div className="w-[840px] h-fit">
      <div
        className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
      >
        <div className="w-full flex gap-x-10 px-3 pt-5">
          <div className="w-fit flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Обхват Талии
              <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="flex items-center">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-3  rounded-lg   font-AeonikProRegular "
                  placeholder="Мин"
                />
              </div>
              <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                  placeholder="Макс"
                />
              </div>
            </div>
          </div>
          <div className="w-fit flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Размер
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="flex items-center justify-between gap-x-1">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="inputStyle w-[60px] text-center h-[38px] border border-borderColor px-3  rounded-lg   font-AeonikProRegular "
                    placeholder="Мин"
                  />
                </div>
                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="inputStyle w-[60px] text-center h-[38px] border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                    placeholder="Макс"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[53%] flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
              Обхват Размер
            </p>
            <AllSizeListForWear />
          </div>
        </div>
        <div className="w-full flex gap-x-10 px-3 pt-5">
          <div className="w-fit flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Размер Бедер
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="flex items-center">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-3  rounded-lg   font-AeonikProRegular "
                  placeholder="Мин"
                />
              </div>
              <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                  placeholder="Макс"
                />
              </div>
            </div>
          </div>
          <div className="w-fit flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Рост
            </p>
            <div className="flex items-center justify-between gap-x-1">
              <div className="flex items-center">
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="inputStyle w-[60px] text-center h-[38px] border border-borderColor px-3  rounded-lg   font-AeonikProRegular "
                    placeholder="Мин"
                  />
                </div>
                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                <div className="flex flex-col">
                  <input
                    type="text"
                    className="inputStyle w-[60px] text-center h-[38px] border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                    placeholder="Макс"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-fit flex flex-col md:ml-[14px]">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Количество
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="flex items-start justify-between ">
              <input
                type="text"
                className="inputStyle w-[60px] h-[38px] text-center border border-borderColor px-5  rounded-lg  font-AeonikProRegular "
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row px-3 pt-5 gap-x-[11px] md:gap-x-[20px] mb-[15px]">
          <div className="w-fit flex items-center gap-x-[25px]">
            <div className="w-fit hidden md:flex flex-col items-start">
              <div className="flex items-center justify-center  mb-2 ll:mb-[10px]">
                <label
                  htmlFor=""
                  className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                  Возраст
                </label>
                {/* <span className="ml-[5px]">
                  <StarLabel />
                </span> */}
              </div>
              <div className="w-fit flex items-center">
                <input
                  type="text"
                  className=" inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none"
                  placeholder=""
                />
              </div>
            </div>
            <div className="w-full md:w-[55%]">
              <div className="flex items-center  mb-2 ll:mb-[10px]">
                <label
                  htmlFor=""
                  className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                  Цена
                </label>
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              <div className="w-full h-[40px] flex items-center border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                <input
                  type="text"
                  placeholder="0"
                  className="inputStyle w-[70%] font-AeonikProMedium outline-none"
                />
                <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                  сум
                </span>
              </div>
            </div>
          </div>
          <div className="w-fit flex flex-col items-start">
            <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
              <label
                htmlFor=""
                className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">

                Скидка
              </label>
              <span className="font-AeonikProMedium text-[10px] md:text-[13px] text-textLightColor ml-[5px]">
                (необязательно)
              </span>
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="w-full flex items-center gap-x-1">
                <div className="w-[40%] md:w-[72px] flex items-start">
                  <div className="w-full h-10 flex items-center justify-center border border-borderColor rounded-lg px-[10px] md:px-3 py-[8px]">
                    <input
                      type="text"
                      placeholder="0"
                      className="inputStyle w-[70%] font-AeonikProMedium text-start outline-none "
                    />
                    <span className="text-textLightColor ml-2">%</span>
                  </div>
                </div>
                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                <div className="w-[60%] md:w-[75%] flex items-center">
                  <div className="w-full h-[40px] flex items-center justify-between border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                    <input
                      type="text"
                      placeholder="0"
                      className="inputStyle w-[75%] font-AeonikProMedium outline-none "
                    />
                    <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                      сум
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full flex items-end justify-end text-lg text-textBlueColor font-AeonikProMedium pr-1">
          готово
        </button>
      </div>
    </div>
  );
  // Shoes
  const contentShoes = (
    <div className="w-fit h-fit">
      <div
        className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
      >
        <div className="w-full flex gap-x-10 px-3 pt-5">
          <div className="w-fit flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Размер
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="w-[65px] flex items-center justify-between gap-x-1">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-full text-start h-[40px] border border-borderColor px-3  rounded-lg   font-AeonikProRegular "
                />
              </div>
            </div>
          </div>
          <div className="w-fit flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Длина Стопы
              <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
            </p>
            <div className="flex items-center gap-x-1">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[60px] h-[40px] text-center border border-borderColor px-3  rounded-lg   font-AeonikProRegular "
                  placeholder="Мин"
                />
              </div>
              <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-[60px] h-[40px] text-center border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                  placeholder="Макс"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row px-3 pt-5 gap-x-[11px] md:gap-x-[20px] mb-[15px]">
          <div className="w-fit flex items-center gap-x-[25px]">
            <div className="w-fit hidden md:flex flex-col items-start">
              <div className="flex items-center justify-center  mb-2 ll:mb-[10px]">
                <label
                  htmlFor=""
                  className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                  Возраст
                </label>
                {/* <span className="ml-[5px]">
                  <StarLabel />
                </span> */}
              </div>
              <div className="w-fit flex items-center">
                <input
                  type="text"
                  className="inputStyle w-[58px] h-[40px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none "
                  placeholder=""
                />
              </div>
            </div>
            <div className="w-full md:w-[55%]">
              <div className="flex items-center mb-2 ll:mb-[10px] ">
                <label
                  htmlFor=""
                  className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                  Цена
                </label>
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              <div className="w-full h-[40px] flex items-center border border-borderColor px-3 py-[6px] rounded-lg text-xs ">
                <input
                  type="text"
                  placeholder="0"
                  className="inputStyle w-[70%] font-AeonikProMedium outline-none "
                />
                <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                  сум
                </span>
              </div>
            </div>
          </div>
          <div className="w-fit flex flex-col items-start">
            <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
              <label
                htmlFor=""
                className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                Скидка
              </label>
              <span className="font-AeonikProMedium text-[10px] md:text-[13px] text-textLightColor ml-[5px]">
                (необязательно)
              </span>
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="w-full flex items-center gap-x-1">
                <div className="w-[40%] md:w-[72px] flex items-start">
                  <div className="w-full h-10 flex items-center justify-center border border-borderColor rounded-lg px-[10px] md:px-3 py-[8px]">
                    <input
                      type="text"
                      placeholder="0"
                      className="inputStyle w-[70%] font-AeonikProMedium text-start outline-none "
                    />
                    <span className="text-textLightColor ml-2">%</span>
                  </div>
                </div>
                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                <div className="w-[60%] md:w-[75%] flex items-center">
                  <div className="w-full h-[40px] flex items-center justify-between border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                    <input
                      type="text"
                      placeholder="0"
                      className="inputStyle w-[75%] font-AeonikProMedium outline-none "
                    />
                    <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                      сум
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full flex items-end justify-end text-lg text-textBlueColor font-AeonikProMedium pr-1">
          готово
        </button>
      </div>
    </div>
  );
  // Accessories bor
  const contentAccessories = (
    <div className="w-[595px] h-fit">
      <div
        className={`w-full h-fit flex flex-col cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
      >
        <div className="w-full flex gap-x-10 px-3 pt-5">
          <div className="w-fit flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Размер{" "}
              <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
            </p>
            <div className="w-[83px] flex items-center justify-between gap-x-1">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-full text-start h-[38px] border border-borderColor px-3 rounded-lg  font-AeonikProRegular "
                />
              </div>
            </div>
          </div>

          <div className="w-[80%] flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
              Обхват Размер
            </p>
            <AllSizeListForWear />
          </div>
        </div>
        <div className="w-full flex gap-x-10 px-3 pt-5">
          <div className="w-[20%] flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Длина
              <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-full h-[40px] text-start border border-borderColor px-3 rounded-lg   font-AeonikProRegular "
                />
              </div>
            </div>
          </div>
          <div className="w-[20%] flex flex-col">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Ширина
            </p>
            <div className="flex items-center justify-between gap-x-1">
              <div className="flex flex-col">
                <input
                  type="text"
                  className="inputStyle w-full h-[40px] text-start border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                />
              </div>
            </div>
          </div>
          <div className="w-[60%] flex flex-col ml-auto">
            <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

              Количество
            </p>
            <div className="flex items-start justify-between ">
              <input
                type="text"
                className="inputStyle w-[60px] h-[40px] text-center border border-borderColor px-5  rounded-lg  font-AeonikProRegular "
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row px-3 pt-5 gap-x-[11px] md:gap-x-[20px] mb-[15px]">
          <div className="w-[45%] flex items-center gap-x-[25px]">
            <div className="w-fit hidden md:flex flex-col items-start">
              <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                <label
                  htmlFor=""
                  className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">

                  Возраст
                </label>
                {/* <span className="ml-[5px]">
                  <StarLabel />
                </span> */}
              </div>
              <div className="w-fit flex items-center">
                <input
                  type="text"
                  className="inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px] outline-none "
                  placeholder=""
                />
              </div>
            </div>
            <div className="w-full md:w-[55%]">
              <div className="flex items-center mb-2 ll:mb-[10px] ">
                <label
                  htmlFor=""
                  className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                  Цена
                </label>
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              <div className="w-full h-[40px] flex items-center border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                <input
                  type="text"
                  placeholder="0"
                  className="inputStyle w-[70%] font-AeonikProMedium outline-none "
                />
                <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                  сум
                </span>
              </div>
            </div>
          </div>
          <div className="w-[40%] flex flex-col items-start">
            <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
              <label
                htmlFor=""
                className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">

                Скидка
              </label>
              <span className="font-AeonikProMedium text-[10px] md:text-[13px] text-textLightColor ml-[5px]">
                (необязательно)
              </span>
            </div>
            <div className="w-full flex items-center justify-center">
              <div className="w-full flex items-center gap-x-1">
                <div className="w-[40%] md:w-[72px] flex items-start">
                  <div className="w-full h-10 flex items-center justify-center border border-borderColor rounded-lg px-[10px] md:px-3 py-[8px]">
                    <input
                      type="text"
                      placeholder="0"
                      className="inputStyle w-[70%] font-AeonikProMedium text-start outline-none "
                    />
                    <span className="text-textLightColor ml-2">%</span>
                  </div>
                </div>
                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                <div className="w-[60%] md:w-[75%] flex items-center">
                  <div className="w-full h-[40px] flex items-center justify-between border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                    <input
                      type="text"
                      placeholder="0"
                      className="inputStyle w-[75%] font-AeonikProMedium outline-none "
                    />
                    <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                      сум
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button className="w-full flex items-end justify-end text-lg text-textBlueColor font-AeonikProMedium pr-1">
          готово
        </button>
      </div>
    </div>
  );

  // const changeColor = [
  //   { id: 1, data: 1, icons: InputCheck, action: false, colors: "bg-black" },
  //   { id: 2, data: 2, icons: InputCheck, action: false, colors: "bg-white" },
  //   { id: 3, data: 3, icons: InputCheck, action: false, colors: "bg-zinc-500" },
  //   { id: 4, data: 4, icons: InputCheck, action: false, colors: "bg-purple-500" },
  //   { id: 5, data: 5, icons: InputCheck, action: false, colors: "bg-sky-600" },
  //   { id: 6, data: 6, icons: InputCheck, action: false, colors: "bg-amber-400 " },
  //   { id: 7, data: 7, icons: InputCheck, action: false, colors: "bg-green-700 " },
  //   { id: 8, data: 8, icons: InputCheck, action: false, colors: "bg-amber-600 " },
  //   { id: 9, data: 9, icons: InputCheck, action: false, colors: "bg-red-700  " },
  //   // { id: 10, data: 10, icons: InputCheck, action: false, colors: "bg-purple-800 " },
  //   // { id: 11, data: 11, icons: InputCheck, action: false, colors: "bg-blue-900 " },
  //   // { id: 12, data: 12, icons: InputCheck, action: false, colors: "bg-yellow-900 " },
  // ];
  const [changeColor, setChangeColor] = useState([
    {
      id: 1,
      data: 1,
      icons: <InputCheckedTrueIcons />,
      action: false,
      colors: "bg-black",
      colorName: "Black",

    },
    {
      id: 2,
      data: 2,
      icons: <InputCheckedTrueIcons />,
      action: false,
      colors: "bg-white",
      colorName: "Black",

    },
    {
      id: 3,
      data: 3,
      icons: <InputCheckedTrueIcons />,
      action: false,
      colors: "bg-zinc-500",
      colorName: "Black",

    },
    {
      id: 4,
      data: 4,
      icons: <InputCheckedTrueIcons />,
      action: false,
      colors: "bg-purple-500",
      colorName: "Black",

    },
    {
      id: 5,
      data: 5,
      icons: <InputCheckedTrueIcons />,
      action: false,
      colors: "bg-sky-600",
      colorName: "Black",

    },
    {
      id: 6,
      data: 6,
      icons: <InputCheckedTrueIcons />,
      action: false,
      colorName: "Black",
      colors: "bg-amber-400 ",
    },
    {
      id: 7,
      data: 7,
      icons: <InputCheckedTrueIcons />,
      action: false,
      colorName: "Black",
      colors: "bg-green-700 ",
    },
    {
      id: 8,
      data: 8,
      icons: <InputCheckedTrueIcons />,
      action: false,
      colorName: "Black",
      colors: "bg-amber-600 ",
    },
    {
      id: 9,
      data: 9,
      icons: <InputCheckedTrueIcons />,
      action: false,
      colorName: "Black",
      colors: "bg-red-700  ",
    },
    {
      id: 10,
      data: 10,
      icons: <InputCheckedTrueIcons />,
      action: false,
      colorName: "Black",
      colors: "bg-purple-800 ",
    },
    {
      id: 11,
      data: 11,
      icons: <InputCheckedTrueIcons />,
      action: false,
      colorName: "Black",
      colors: "bg-blue-900  ",
    },
    {
      id: 12,
      data: 12,
      icons: <InputCheckedTrueIcons />,
      action: false,
      colorName: "Black",
      colors: "bg-yellow-900 ",
    },
  ])
  useEffect(() => {
    if (
      showColor
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [
    showColor
  ]);
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
    };
  }
  useEffect(() => {
    const updateDimension = () => {
      if (getCurrentDimension().width < 758 && showColor) {
        setShowColor(false)
      }
      setScreenSize(getCurrentDimension());
    };

    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);
  const [iconsColor, setIconsColor] = useState("black");
  const HandleIconsColor = (color, id) => {
    setIconsColor(color);
    setChangeColor((current) => {
      return current.map((data) => {
        if (data?.id == id) {
          return { ...data, action: true };
        } else {
          return { ...data, action: false };
        }
      });
    });
  };

  // Checks whether an element is even
  const even = (element) => element.action == true;
  let toggleAction = changeColor.some(even);

  const unCheckedAll = () => {
    setShowColor(false);

    setChangeColor((current) => {
      return current.map((data) => {
        return { ...data, action: false };
      });
    });
    setIconsColor("black");
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  // Категория одеждыДобавить одежду Артикул(необязательно)
  const [randomSellerCode, setRandomSellerCode] = useState(null)

  function randomCode(len) {
    let p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    setRandomSellerCode([...Array(len)].reduce(a => a + p[~~(Math.random() * p.length)], ''))

  }


  const [activeIndex, setActiveIndex] = useState();
  const accordionCityList = (id) => {
    if (activeIndex == id) {
      setActiveIndex(0)
    } else {
      setActiveIndex(id)
    }
  }


  return (
    <div className="relative w-full px-4 md:px-0 flex items-center justify-between mb-[50px] my-6 md:my-[50px] focus:bg-textBlueColor">

      {/* Open for select color modal */}
      <div
        onClick={() => { setShowColor(false) }}
        className={`fixed inset-0 z-[220] cursor-pointer duration-200 w-full h-[100vh] bg-black opacity-50
         ${showColor ? "" : "hidden"}`}
      >
      </div>
      {showColor && (
        <div className="max-w-[576px] w-full fixed z-[221]  left-1/2 right-1/2 top-[50%] translate-x-[-50%] translate-y-[-50%]  h-fit flex items-center  justify-center mx-auto ">

          {/* </div> */}
          <div className="relative z-[223]  top-0 w-full h-fit p-4 mx-auto bg-white rounded-md shadow-lg">
            <div
              className={`flex items-center justify-between border-b border-searchBgColor pb-3"
                       `}
            >
              <span className="text-black text-lg not-italic font-AeonikProRegular leading-5">Выберите цвет</span>
              <button
                className="py-2"
                type=""
                onClick={() => { setShowColor(false) }}

              >
                <MenuCloseIcons colors={"#000"} />
              </button>
            </div>
            <div className="py-4 gap-x-2 gap-y-4 grid gap-4 grid-cols-6">
              {productsData?.colors.map((data) => {
                console.log(data.hex, "COLORS");
                return (
                  <div className="flex flex-col items-center justify-center ">
                    <div
                      key={data?.id}
                      onClick={() =>
                        HandleIconsColor(data?.IconsColor, data?.id)
                      }
                      className={`rounded-[12px] flex items-center justify-center mr-2 w-[65px] h-[40px] bg-[#aaaaaa] bg-[${data.hex}] cursor-pointer ${data?.id == 2 ? "border border-setTexOpacity flex items-center justify-center" : "" }
                     `}
                    >
                      {data?.action && data?.id === 2 ? (
                        <InputCheckedTrueIcons colors={"#000"} />
                      ) : null}

                      {data?.action && data?.id !== 2 ? (
                        <InputCheckedTrueIcons colors={"#fff"} />
                      ) : null}
                    </div>
                    <span className={`text-black text-center text-xs not-italic font-AeonikProRegular`}>{data?.name_ru}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-end">
              {toggleAction && (
                <button
                  onClick={unCheckedAll}
                  className="flex items-center text-fullBlue active:scale-95  active:opacity-70 justify-center  px-4 py-1"
                >
                  Отключить
                </button>
              )}
              {/* </div> */}
            </div>
          </div>
        </div>
      )
      }

      <div className="absolute top-[0px] hidden md:flex items-center justify-center flex-col mr-[50px]">
        <div className="w-[45px] h-[45px] font-AeonikProMedium border-2 flex items-center justify-center bg-textBlueColor border-textBlueColor rounded-full text-2xl text-white mb-[5px]">
          1
        </div>
        <div className="w-[2px] h-[150px] bg-textBlueColor active:bg-textBlueColor mb-[5px] "></div>
        <div className="flex items-center justify-center font-AeonikProMedium text-textBlueColor text-2xl border border-textBlueColor w-[45px] h-[45px] rounded-full mb-[5px]">
          2
        </div>
        <div className="line flex-1"></div>
      </div>

      {/* Open Clothing Types Bottom Mobile Modal Animation Section */}
      <div>
        <section
          onClick={() => setOpenClothingSection(false)}
          className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50 ${openClothingSection ? "" : "hidden"
            }`}
        ></section>
        <section
          className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${openClothingSection ? "bottom-0" : "bottom-[-800px] z-0"
            }`}
        >
          <ClothingTypesAnimationPage onClick={toggleClothingSection} />
        </section>
      </div>

      {/* Open Clothing SubSection Bottom Mobile Modal Animation Section */}
      <div>
        <section
          onClick={() => setOpenClothingSubSection(false)}
          className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50 ${openClothingSubSection ? "" : "hidden"
            }`}
        ></section>
        <section
          className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${openClothingSubSection ? "bottom-0" : "bottom-[-800px] z-0"
            }`}
        >
          <ClothingSubSectionPage onClick={toggleClothingSubSection} />
        </section>
      </div>

      {/* Open Weather Bottom Mobile Modal Animation Section */}
      <div>
        <section
          onClick={() => setOpenWeather(false)}
          className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50 ${openWeather ? "" : "hidden"
            }`}
        ></section>
        <section
          className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${openWeather ? "bottom-0" : "bottom-[-800px] z-0"
            }`}
        >
          <WeatherMobileDropUp onClick={toggleWeather} />
        </section>
      </div>

      {/* Colors Bottom Mobile Modal Animation Section */}
      <div
      >
        <section
          onClick={() => setOpenColors(false)}
          className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50 ${openColors ? "" : "hidden"
            }`}
        ></section>
        <section
          className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${openColors ? "bottom-0" : "bottom-[-800px] z-0"
            }`}
        >
          <ColorsMobileDropUp onClick={toggleColors} />
        </section>
      </div>

      {/* Open Gender Bottom Mobile Modal Animation Section */}
      <div>
        <section
          onClick={() => setOpenGender(false)}
          className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50 ${openGender ? "" : "hidden"
            }`}
        ></section>
        <section
          className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${openGender ? "bottom-0" : "bottom-[-800px] z-0"
            }`}
        >
          <GenderTypeDropUp onClick={toggleGender} />
        </section>
      </div>

      {/* Categories Mobile Bottom Modal Animation Section */}
      <div>
        <section
          onClick={() => setOpenCategories(false)}
          className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50 ${openCategories ? "" : "hidden"
            }`}
        ></section>
        <section
          className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${openCategories ? "bottom-0" : "bottom-[-800px] z-0"
            }`}
        >
          <CategoriesMobileDropUp onClick={toggleCategories} />
        </section>
      </div>

      {/* Open Type Bottom Mobile Modal Animation Section  action*/}
      <div>
        <section
          onClick={() => setOpenTypes(false)}
          className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50 ${openTypes ? "" : "hidden"
            }`}
        ></section>
        <section
          className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${openTypes ? "bottom-0" : "bottom-[-800px] z-0"
            }`}
        >
          <TypesDropUp onClick={toggleTypes} />
        </section>
      </div>

      <form
        action="#"
        className="w-full md:mx-[180px] md:mb-[50px]"
      >

        <div className="md:relative md:border border-borderColor rounded-xl md:px-[30px] md:pt-[50px]  md:pb-[250px]">

          {/* Photo Section For Mobile */}
          <div className="w-full flex md:hidden mb-6 gap-x-[15px]">
            <div className="w-3/4 flex items-center justify-center rounded-lg border border-dashed border-borderColor bg-photoBg">
              <Link
                to="#"
                className=" text-xs font-AeonikProMedium text-textBlueColor border-b border-textBlueColor"
              >
                Выберите фото
              </Link>
            </div>
            <div className="w-1/4 flex flex-col">
              <div className="w-full h-[95px] flex items-center justify-center rounded-lg border border-dashed border-borderColor mb-2">
                <Link to="#">
                  {" "}
                  <DownloadIcon />{" "}
                </Link>
              </div>
              <div className="w-full h-[95px] flex flex-col items-center justify-center rounded-lg border border-dashed border-borderColor mb-2">
                <Link to="#" className="mt-7">
                  {" "}
                  <DownloadIcon />{" "}
                </Link>
                <span className="text-textLightColor font-AeonikProRegular text-[9px] mt-[15px]">
                  (необязательно)
                </span>
              </div>
              <div className="w-full h-[95px] flex flex-col items-center justify-center rounded-lg border border-dashed border-borderColor">
                <Link to="#" className="mt-7">
                  {" "}
                  <DownloadIcon />{" "}
                </Link>
                <span className="text-textLightColor font-AeonikProRegular text-[9px] mt-[15px]">
                  (необязательно)
                </span>
              </div>
            </div>
          </div>

          {/* Add Product Parts Section */}
          <div className="w-full flex items-start justify-between md:gap-x-[30px]">
            <div className="w-full md:w-[65%]">
              {/* 1 */}
              <div className="w-full flex flex-row gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mb-[25px]">
                <div className="w-1/2 flex flex-col items-start">
                  <div className="flex items-center justify-center mb-[5px]">
                    <label
                      htmlFor=""
                      className="text-[13px] md:text-base font-AeonikProRegular"
                    >
                      Раздел одежды
                    </label>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <button
                    onClick={() => setOpenClothingSection(true)}
                    type="button"
                    className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                  >
                    <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                      Выбрать
                    </label>
                    <ArrowRightIcon />
                  </button>
                  {/* <Select
                    className="hidden md:block rounded-lg w-full h-11 md:h-10"
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
                    options={
                      productsData?.sections?.map(item => {
                        return (
                          {
                            value: item?.id,
                            label: item?.name_ru
                          }
                        )
                      })
                    }
                  /> */}

                  {
                    <div className={`max-w-[300px] h-fit fixed px-3 md:px-6 py-2 md:py-4 bg-white rounded-b-none md:rounded-b-lg	 rounded-t-lg  mx-auto w-full duration-500 z-[113] overflow-hidden`} >
                    <div className="w-full flex items-center justify-between  ">
                      {/* <div
                        className="select-none cursor-pointer"
                        onClick={() => {
                          setState({ ...state, openModalRegions: false });
                        }}
                      >
                        <MenuCloseIcons colors="#000" /></div> */}
                    </div>
                   
                    <div className="w-full overflow-auto  flex flex-col gap-y-4 pt-3  overflow-x-hidden mt-3 h-[50vh] md:h-[60vh] VerticelScroll pr-2 ">


                      {state?.getRegionList?.regions ?
                        state?.getRegionList?.regions?.map((data, index) => {
                          return (
                            <div key={data?.id} className="w-full  h-fit  ">
                              <div
                                onClick={() => accordionCityList(data?.id)}
                                className="w-full cursor-pointer flex items-center pr-1 justify-between border-b border-[#F0F0F0] "
                              >
                                <span className="text-[#303030] text-lg not-italic font-AeonikProRegular">
                                  {data?.name_ru}
                                </span>
                                <span
                                  className={`${data?.id == activeIndex ? "rotate-[0deg]" : "rotate-[180deg]"} `}
                                >
                                  <ArrowTopIcons colors={"#a1a1a1"} />
                                </span>
                              </div>
                              <div
                                className={`w-full grid grid-cols-2 xs:grid-cols-3 duration-[400ms]
                              `}
                              >
                                {data?.sub_regions?.map((item) => {
                                  return (
                                    <div key={item?.id} className="flex items-center px-[2px] gap-x-[4px] cursor-pointer">
                                      <label
                                        htmlFor={item?.name_ru}
                                        className="flex items-center gap-x-[6px]"
                                      >
                                        <input
                                          type="radio"
                                          id={item?.name_ru}
                                          name="select_in_city"
                                          value={item?.region_id}
                                          checked={parseFloat(item?.id) === parseFloat(state?.sub_region)}
                                          className="border border-borderColor  cursor-pointer  flex items-center justify-center"
                                          onChange={(e) => {
                                            setState({ ...state, region: e.target.value, sub_region: item?.id })
                                          }}
                                          required

                                        />
                                        <span className="text-[#303030]  cursor-pointer text-[15px] not-italic font-AeonikProRegular"
                                        >{item?.name_ru}</span>
                                      </label>
                                    </div>

                                  );
                                })}
                              </div>
                            </div>
                          );
                        }) :
                        <p className="w-full h-full flex flex-col items-center justify-center">Malumotlar yuklanyapti...</p>}

                    </div>
                    <div className="w-full flex items-center justify-end  mt-2">
                      <span onClick={() => {
                        setState({ ...state, openModalRegions: false });
                      }} className="cursor-pointer text-fullBlue text-lg not-italic font-AeonikProMedium">Готово</span>
                    </div>
                    </div>
                  }

                  {/* Region INput  */}
                  <div className={"w-full"}>
                    <label htmlFor="" >
                      <span className="flex items-center text-[#303030] text-base not-italic font-AeonikProRegular leading-4 tracking-[0,16px] ">
                        Выберите регион

                        <span className="ml-[5px]"><Star6Icon /></span>
                      </span>
                      <div
                        onClick={() => {
                          setState({ ...state, openModalRegions: true });
                        }}
                        className="w-full h-[42px] mt-[6px] px-[15px] flex items-center justify-between rounded-lg cursor-pointer border border-searchBgColor">
                        <span className=" w-full h-[42px] flex items-center not-italic font-AeonikProRegular text-[#B5B5B5] ll:text-[14px] sm:text-[16px] text-base leading-4 ">
                          {!state?.region && !state?.sub_region && "Выберите регион"}

                          {state?.getRegionList?.regions?.filter(e => e.id == state?.region).map(item => {
                            return <span key={item?.id} className="flex items-center text-[#000] text-[14px] sm:text-base">
                              {item?.name_ru},
                              {item?.sub_regions?.filter(i => i.id == state?.sub_region).map(item => {
                                return <span key={item?.id} className="ml-1">{item?.name_ru}</span>
                              })}
                            </span>
                          })
                          }
                        </span>
                        <span className="rotate-[180deg]"><ArrowTopIcons colors={"#a1a1a1"} /></span>
                      </div>
                      {
                        state?.errorGroup?.errors?.region_id && !state?.region &&
                        <p className="text-[#D50000]  text-[12px] ll:text-[14px] md:text-base">
                          {state?.errorGroup?.errors?.region_id}
                        </p>
                      }

                    </label>
                  </div>


                </div>
                <div className="w-1/2 flex  flex-col items-start">
                  <div className="flex items-center justify-center mb-[5px]">
                    <label
                      htmlFor=""
                      className="text-[13px] md:text-base font-AeonikProRegular"
                    >
                      Производитель
                    </label>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <button
                    onClick={() => setOpenClothingSubSection(true)}
                    type="button"
                    className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                  >
                    <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                      Выбрать
                    </label>
                    <ArrowRightIcon />
                  </button>
                  <Select
                    className="hidden md:block rounded-lg w-full h-11 md:h-10"
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
                    options={
                      productsData?.producers?.map(item => {
                        return (
                          {
                            value: item?.id,
                            label: item?.name_ru
                          }
                        )
                      })
                    }
                  />
                </div>
              </div>

              {/* 2 */}
              <div className="w-full flex flex-row gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mb-[25px]">
                <div className="w-1/2 flex  flex-col items-start">
                  <div className="flex items-center justify-center mb-[5px]">
                    <label
                      htmlFor=""
                      className="text-[13px] md:text-base font-AeonikProRegular"
                    >
                      Сезон одежды
                    </label>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <button
                    onClick={() => setOpenWeather(true)}
                    type="button"
                    className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                  >
                    <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                      Выбрать
                    </label>
                    <ArrowRightIcon />
                  </button>
                  <Select
                    className="hidden md:block rounded-lg w-full h-11 md:h-10"
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
                    options={
                      productsData?.seasons?.map(item => {
                        return (
                          {
                            value: item?.id,
                            label: item?.name_ru
                          }
                        )
                      })
                    }
                  />
                </div>
                <div className="w-1/2 flex  flex-col items-start">
                  <div className="flex items-center justify-between mb-[5px]">
                    <label
                      htmlFor=""
                      className="text-[13px] md:text-base font-AeonikProRegular"
                    >
                      Цвет
                    </label>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenColors(true)}
                    className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                  >
                    <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                      Выбрать
                    </label>
                    <ArrowRightIcon />
                  </button>
                  <div className="w-full hidden md:flex items-center justify-between border rounded-lg md:py-[9px] px-[12px]">
                    {changeColor?.filter(e => e?.id <= 9)?.map((data) => {
                      return (
                        <div key={data?.id} className="hidden md:block">
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
                    <button
                      onClick={() => { setShowColor(true) }}
                      type="button"
                    >
                      <AddIconsCircle1 />
                    </button>
                  </div>
                </div>
              </div>

              {/* 3 input*/}
              <div className="w-full flex flex-row gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mb-[25px]">
                <div className="w-1/2 flex flex-col items-start">
                  <div className="w-full mb-[5px]">
                    <div className="flex items-center justify-between ">
                      <label
                        htmlFor=""
                        className="flex items-center text-[13px] md:text-base font-AeonikProRegular"
                      >
                        Пол
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </label>
                      <label
                        className="hidden md:flex items-center text-[13px] md:text-base font-AeonikProRegular"
                      >
                        Возрастная категория
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="w-full flex items-center ">
                    <div className="w-full md:w-[45%]">
                      <button
                        onClick={() => setOpenGender(true)}
                        type="button"
                        className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                      >
                        <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                          Выбрать
                        </label>
                        <ArrowRightIcon />
                      </button>
                      <Select
                        className="hidden md:block rounded-lg w-full h-11 md:h-10"
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
                        options={
                          productsData?.gender?.map(item => {
                            return (
                              {
                                value: item?.id,
                                label: item?.name_ru
                              }
                            )
                          })
                        }
                      />
                    </div>
                    <div className="w-[60%] hidden md:flex items-center justify-center">
                      <div className="flex flex-col">
                        <input
                          type="text"
                          className="inputStyle w-[60px] h-10 text-center border border-borderColor px-3 flex items-center rounded-lg font-AeonikProRegular "
                          placeholder="Мин"
                        />
                      </div>
                      <span className="rotate-90 h-full text-borderColor mx-3">|</span>
                      <div className="flex flex-col">
                        <input
                          type="text"
                          className="inputStyle w-[60px] h-10 text-center border border-borderColor px-3 flex items-center rounded-lg  font-AeonikProRegular "
                          placeholder="Мах"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col items-start">
                  <div className="flex items-center justify-center mb-[5px]">
                    <label
                      htmlFor=""
                      className="text-[13px] md:text-base font-AeonikProRegular"
                    >
                      Артикул
                    </label>
                    <span className="font-AeonikProMedium text-[10px] md:text-[13px] text-textLightColor ml-[5px]">
                      (необязательно)
                    </span>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <input
                      type="text"
                      value={randomSellerCode}
                      onChange={(e) => setRandomSellerCode(e.target.value)}
                      placeholder="Seller code of random "
                      className="inputStyle w-full h-10  flex items-center justify-between border rounded-lg px-[10px] outline-none"
                    />

                    <button
                      onClick={() => randomCode(17)}
                      type={"button"}
                      className="w-[54px] h-[42px] active:scale-95  active:opacity-70 flex items-center justify-center ml-3 bg-textBlueColor border border-borderColor rounded-lg">
                      <LoaderIcon />
                      {/* <FaRandom color={"#ffffff"} /> */}
                    </button>
                  </div>
                </div>
              </div>

              {/* 4 */}
              <div className="w-full hidden md:flex flex-row gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mb-[25px]">
                <div className="w-1/2 hidden md:flex flex-col items-start">
                  <div className="flex items-center justify-center mb-[5px]">
                    <label htmlFor="" className="text-base font-AeonikProRegular">
                      Категория одежды
                    </label>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <button
                    onClick={toggleDropModalButton}
                    type="button" className={`w-full overflow-hidden h-[42px] flex items-center justify-between border border-borderColor rounded-lg p-3 `}>
                    <span className="text-[#a1a1a1]">Выбрать</span>
                    {state.openDropModalButton ? (
                      <span className="-rotate-90 transition duration-200 ease-out"><ArrowRightIcon /></span>
                    ) : (
                      <span className="rotate-90 transition duration-200 ease-out"><ArrowRightIcon /></span>
                    )
                    }

                  </button>
                </div>
                <div className="w-1/2 items-start gap-x-[10px]">
                  <div className="w-full flex items-center justify-start mb-[5px]">
                    <label className="text-[13px] md:text-base font-AeonikProRegular" >
                      Тип{" "}
                    </label>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <button
                    onClick={() => setOpenTypes(true)}
                    type="button"
                    className="w-full flex md:hidden items-center justify-between border border-borderColor rounded-lg h-[40px] px-3"
                  >
                    <span className="text-[#b5b5b5] mt-[3px] font-AeonikProRegular text-[11px] ">
                      Выбрать
                    </span>
                    <span className="">
                      <ArrowRightIcon />
                    </span>
                  </button>
                  <Select
                    className="hidden md:block rounded-lg w-full h-11 md:h-10"
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
                    options={
                      productsData?.types?.map(item => {
                        return (
                          {
                            value: item?.id,
                            label: item?.name_ru
                          }
                        )
                      })
                    }
                  />
                </div>
              </div>

              {/* 4 Buttons For Mobile */}
              <div className="w-full flex md:hidden items-center justify-between mb-[15px] gap-x-[11px]">
                <div className="w-1/2 flex items-start gap-x-[10px]">
                  <div className="w-full md:w-1/2 flex flex-col items-start">
                    <div className="flex items-center justify-center mb-[5px]">
                      <label
                        className="text-[13px] md:text-base font-AeonikProRegular"
                      >
                        Тип{" "}
                      </label>
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <button
                      onClick={() => setOpenTypes(true)}
                      type="button"
                      className="w-full flex md:hidden items-center justify-between border border-borderColor rounded-lg h-[40px] px-3"
                    >
                      <span className="text-[#b5b5b5] mt-[3px] font-AeonikProRegular text-[11px] ">
                        Выбрать
                      </span>
                      <span className="">
                        <ArrowRightIcon />
                      </span>
                    </button>
                    <Select
                      className="hidden md:block rounded-lg w-full h-11 md:h-10"
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
                      options={
                        [
                          // no data
                        ]
                      }
                    />
                  </div>
                  <div className="w-1/2 hidden md:flex flex-col items-start">
                    <div className="flex items-center justify-center mb-[5px]">
                      <label
                        className="text-base font-AeonikProRegular"
                      >
                        Вес (грамм)
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border border-borderColor p-[11px] rounded-lg outline-none text-xs [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="(необязательно)"
                    />
                  </div>
                </div>
                <div className="w-1/2 flex items-start gap-x-[10px]">
                  <div className="w-full md:w-1/2 flex flex-col items-start">
                    <div className="flex items-center justify-center mb-[5px]">
                      <label
                        className="text-[13px] md:text-base font-AeonikProRegular"
                      >
                        Страна размера
                      </label>
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <button
                      onClick={() => setOpenTypes(true)}
                      type="button"
                      className="w-full flex items-center justify-between border border-borderColor rounded-lg h-[40px] px-3"
                    >
                      <span className="text-[#b5b5b5] mt-[3px] font-AeonikProRegular text-[11px] ">
                        Выбрать
                      </span>
                      <span className="">
                        <ArrowRightIcon />
                      </span>
                    </button>
                  </div>
                  <div className="w-1/2 hidden md:flex flex-col items-start">
                    <div className="flex items-center justify-center mb-[5px]">
                      <label
                        className="text-base font-AeonikProRegular"
                      >
                        Вес (грамм)
                      </label>
                    </div>
                    <input
                      type="text"
                      className="w-full border border-borderColor p-[11px] rounded-lg outline-none text-xs [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="(необязательно)"
                    />
                  </div>
                </div>
              </div>

              {/* 5 Категория одежды*/}
              {state.openDropModalButton ? (
                <div className="w-full hidden md:flex items-center flex-wrap gap-3 ">
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
              ) : (
                ""
              )}

              {/* 5 Bottom Buttons For Mobile */}
              <div className="w-full flex md:hidden flex-row gap-x-[11px] mb-[30px] ">
                <div className="w-1/2 flex flex-col items-start">
                  <div className="flex items-center justify-center mb-[5px]">
                    <label
                      htmlFor=""
                      className="text-[13px] md:text-base font-AeonikProRegular"
                    >
                      Категория одежды
                    </label>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenCategories(true)}
                    className="w-full flex items-center justify-between border border-borderColor rounded-lg h-[40px] px-3"
                  >
                    <span className="text-[#b5b5b5] mt-[3px] font-AeonikProRegular text-[11px] ">
                      Выбрать
                    </span>
                    <span className="">
                      <ArrowRightIcon />
                    </span>
                  </button>
                </div>
                <div className="w-1/2 flex md:hidden flex-col items-start">
                  <div className="flex items-center justify-center mb-[5px]">
                    <label
                      htmlFor=""
                      className="text-[13px] md:text-base font-AeonikProRegular"
                    >
                      Возрастная категория
                    </label>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <div className="w-full flex items-center ">
                    <input
                      type="text"
                      className="inputStyle w-[40%] md:w-[60px] h-[40px] text-center border border-borderColor px-2 rounded-lg   outline-none font-AeonikProRegular "
                      placeholder="Мин"
                    />
                    <span className="mx-[5px]"><LineIcon /></span>
                    <input
                      type="text"
                      className="inputStyle w-[40%] md:w-[60px] h-[40px] text-center border border-borderColor px-2 rounded-lg  font-AeonikProRegular  outline-none"
                      placeholder="Макс"
                    />
                  </div>
                  {/* <div className="w-full flex items-center">
                    <input
                      type="text"
                      className="w-1/2 md:w-[58px] h-[40px] text-center fon border border-borderColor rounded-lg px-[12px] py-[10px] outline-none text-xs [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="Мин"
                    />
                    <span className="rotate-90 text-borderColor ml-3 mr-[9px]">
                      |
                    </span>
                    <input
                      type="text"
                      className="w-1/2 md:w-[58px] h-[40px] text-center fon border border-borderColor rounded-lg px-[10px] py-[10px] outline-none text-xs [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="Макс"
                    />
                  </div> */}
                </div>
              </div>
            </div>

            <div className="w-[35%] h-[510px] hidden md:block">
              <div className="flex items-center justify-start mb-[5px]">
                <label htmlFor="" className="text-base font-AeonikProRegular">
                  Фото
                </label>
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              <div className="w-full h-[400px] bg-photoBg flex items-center justify-center border border-dashed rounded-lg">
                <Link
                  to="#"
                  className="text-textBlueColor border-b border-textBlueColor font-AeonikProMedium"
                >
                  Выберите фото
                </Link>
              </div>
              <div className="w-full flex items-center justify-between gap-x-[10px] mt-[10px]">
                <div className="w-1/3 flex flex-col items-center justify-center mb-[21px]">
                  <Link
                    to="#"
                    className="w-full h-[73px] flex items-center justify-center rounded-lg border border-dashed bg-photoBg"
                  >
                    <DownloadIcon />
                  </Link>
                </div>
                <div className="w-1/3 flex flex-col items-center justify-center">
                  <Link
                    to="#"
                    className=" w-full h-[73px] flex items-center justify-center rounded-lg border border-dashed bg-photoBg"
                  >
                    <DownloadIcon />
                  </Link>
                  <div className="text-[11px] text-textLightColor mt-[5px]">
                    (необязательно)
                  </div>
                </div>
                <div className="w-1/3 flex flex-col items-center justify-center ">
                  <Link
                    to="#"
                    className=" w-full h-[73px] flex items-center justify-center rounded-lg border border-dashed bg-photoBg"
                  >
                    <DownloadIcon />
                  </Link>
                  <div className="text-[11px] text-textLightColor mt-[5px]">
                    (необязательно)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:hidden items-center justify-between mb-[40px]">
            <div className="w-1/3 h-[1px] bg-borderColor"></div>
            <div className="w-1/3 flex items-center justify-around">
              <button className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full	">
                <span className="w-2 h-2 rounded-full bg-textBlueColor block "></span>
              </button>
              <span className="w-1/2 h-[1px]  bg-textBlueColor "></span>
              <button className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full">
              </button>
            </div>
            <div className="w-1/3 h-[1px] bg-borderColor"></div>
          </div>

          <NavLink
            to="/products/add-detail"
            className="w-full h-[42px] md:h-[45px] flex items-center justify-center md:w-fit md:absolute active:scale-95 md:right-3 md:bottom-3 md:px-[50px] py-3 border border-textBlueColor bg-textBlueColor text-white rounded-lg text-base md:text-lg font-AeonikProMedium"
          >
            Продолжить
          </NavLink>
        </div>
      </form >
    </div >
  );
};

export default AddingProduct;

