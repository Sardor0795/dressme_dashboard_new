import { Popover, Select, Switch } from "antd";
import React, { useEffect, useState } from "react";
import {
  AddIconsCircle,
  AddIconsCircle1,
  ArrowRightIcon,
  DownloadIcon,
  InputCheck,
  InputCheckedTrueIcons,
  StarLabel,
} from "../../../../../../assets/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ClothingTypesAnimationPage from "../MobileDropUpSides/ClothingTypesMobileDropUp/ClothingTypesMobileDropUp";
import ClothingSubSectionPage from "../MobileDropUpSides/ClothingSubSectionMobileDropUp/ClothingSubSectionMobileDropUp";
import WeatherMobileDropUp from "../MobileDropUpSides/WeatherMobileDropUp/WeatherMobileDropUp";
import ColorsMobileDropUp from "../MobileDropUpSides/ColorsMobileDropUp/ColorsMobileDropUp";
import GenderTypeDropUp from "../MobileDropUpSides/GenderTypeDropUp/GenderTypeDropUp";
import CategoriesMobileDropUp from "../MobileDropUpSides/CategoriesMobileDropUp/CategoriesMobileDropUp";
import TypesDropUp from "../MobileDropUpSides/TypesDropUp/TypesDropUp";
import { ProductCarouselEdit } from "../MobileDropUpSides/ProductCarouselEdit/ProductCarouselEdit";
import { GrClose } from "react-icons/gr";
import WearCollection from "../WearCollection/WearCollection";
import AllSizeModalEdit from "./AllSizeModalEdit/AllSizeModalEdit";

const AddingProduct = () => {
  const [openColors, setOpenColors] = useState(false); // Colors
  const [openCategories, setOpenCategories] = useState(false); // Categories
  const [openClothingSection, setOpenClothingSection] = useState(false); // Clothing Types
  const [openClothingSubSection, setOpenClothingSubSection] = useState(false); // Clothing Subsection
  const [openWeather, setOpenWeather] = useState(false); // Weather
  const [openGender, setOpenGender] = useState(false); // Genders
  const [openTypes, setOpenTypes] = useState(false); // Type
  const [selectColorToggleMobile, setSelectColorToggleMobile] = useState(false); // Type
  const [categoryWear, setCategoryWear] = useState(true);
  const [wearCollection, setWearCollection] = useState(false);

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
  const toggleWearCollection = React.useCallback(
    () => setWearCollection(false),
    []
  );
  // Type


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
  const navigate = useNavigate();
  const goProductTitleEdit = (id) => {
    navigate(`/locations-store/edit-title/:${id}`);
  };
  // allSizeModalShow
  const [allSizeModalShow, setAllSizeModalShow] = useState(false);
  const toggleAllSizeModalShow = React.useCallback(
    () => setAllSizeModalShow(false),
    []
  );
  // ModalColorGroup
  const toggleColorGroup = React.useCallback(
    () => setSelectColorToggleMobile(!selectColorToggleMobile),
    []
  );

  const [decraseList, setDecraseList] = useState(false);
  const [wearSizeList, setWearSizeList] = useState([
    { id: 1, action: false, name: "XXS" },
    { id: 2, action: false, name: "XS" },
    { id: 3, action: false, name: "S" },
    { id: 4, action: false, name: "M" },
    { id: 5, action: false, name: "5X" },
    { id: 6, action: false, name: "7X" },
    { id: 7, action: false, name: "9X" },

    { id: 8, action: false, name: "10X" },
    { id: 9, action: false, name: "L" },
    { id: 10, action: false, name: "XL" },
  ]);
  // Outerwear
  const contentOutwear = (
    <div className="w-[620px] h-fit">
      <action
        className={`w-full h-fit flex   justify-between not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center `}
      >
        <div className="w-1/2 flex flex-wrap justify-between gap-6 ">
          <div className="w-[45%] flex flex-col ">
            <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
              Обхват Груди
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="flex items-center">
              <div className="flex flex-col">
                <input
                  type="number"
                  className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                  placeholder="Мин"
                />
              </div>
              <span className="rotate-90 text-borderColor mx-[9px]">|</span>
              <div className="flex flex-col">
                <input
                  type="number"
                  className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                  placeholder="Макс"
                />
              </div>
            </div>
          </div>
          <div className="w-[45%] flex flex-col ">
            <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
              Размер
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="flex items-center">
              <div className="flex flex-col">
                <input
                  type="number"
                  className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                  placeholder="Мин"
                />
              </div>
              <span className="rotate-90 text-borderColor mx-[9px]">|</span>
              <div className="flex flex-col">
                <input
                  type="number"
                  className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                  placeholder="Макс"
                />
              </div>
            </div>
          </div>
          <div className="w-[45%] flex flex-col ">
            <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
              Обхват Талии
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="flex items-center">
              <div className="flex flex-col">
                <input
                  type="number"
                  className="w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                  placeholder="Мин"
                />
              </div>
              <span className="rotate-90 text-borderColor mx-[9px]">|</span>
              <div className="flex flex-col">
                <input
                  type="number"
                  className="w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                  placeholder="Макс"
                />
              </div>
            </div>
          </div>
          <div className="w-[45%] flex flex-col ">
            <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
              Обхват Бедер
            </p>
            <div className="flex items-center">
              <div className="flex flex-col">
                <input
                  type="number"
                  className="w-[60px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                  placeholder="Мин"
                />
              </div>
              <span className="rotate-90 text-borderColor mx-[9px]">|</span>
              <div className="flex flex-col">
                <input
                  type="number"
                  className="w-[60px] h-[38px] text-center border border-borderColor px-3 py-[10px] rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                  placeholder="Макс"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-[47%] flex flex-col gap-y-5 ">
          <div className="w-full">
            <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
              Буквенный Размер
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="w-full flex flex-wrap gap-[8px] ">
              {wearSizeList.map((data) => {
                return (
                  <div
                    key={data?.id}
                    className="flex justify-center items-center"
                  >
                    <label
                      htmlFor="m_outwear"
                      className="text-[14px] flex gap-x-1 items-center font-AeonikProMedium text-textLightColor mt-[2px] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="m_outwear"
                        name="size_Outwear"
                        value="M"
                        className="w-[18px] h-[18px]"
                      />
                      <span className="text-textLightColor select-none text-sm not-italic font-AeonikProMedium">
                        {data?.name}
                      </span>
                    </label>
                  </div>
                );
              })}
              <button
                type="button"
                onClick={() => setDecraseList(!decraseList)}
                className="text-textBlueColor text-xs not-italic font-AeonikProMedium cursor-pointer"
              >
                {decraseList ? "Меньше" : "Больше"}
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col ">
            <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
              Количество{" "}
              <span className="ml-[5px]">
                <StarLabel />
              </span>
            </p>
            <div className="flex items-center">
              <div className="flex flex-col">
                <input
                  type="text"
                  value={1}
                  className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </action>
      <div className="w-full flex gap-x-5  mt-[15px]">
        <div className="w-fit flex flex-col ">
          <p className="flex text-mobileTextColor text-base not-italic font-AeonikProMedium mb-[10px]">
            Возраст{" "}
          </p>
          <div className="flex flex-col items-center">
            <input
              type="text"
              value={1}
              className="w-[60px] text-center h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
            />
          </div>
        </div>
        <div className="w-fit flex flex-col ">
          <p className="flex text-mobileTextColor text-base not-italic font-AeonikProMedium mb-[10px]">
            Цена{" "}
            <span className="ml-[5px]">
              <StarLabel />
            </span>
          </p>
          <label className="w-[210]  flex h-[38px] border border-borderColor flex items-center">
            <input
              type="text"
              placeholder="Цена"
              className="w-full   px-3 h-full rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
            />
            <span className="text-gray-600 text-base not-italic font-AeonikProRegular pr-3">
              сум
            </span>
          </label>
        </div>
        <div className="w-fit flex flex-col ">
          <p className="flex items-center text-base text-mobileTextColor mb-[10px]">
            <span className="flex text-mobileTextColor text-base not-italic font-AeonikProMedium">
              Скидка{" "}
              <span className="text-gray-600 text-[13px] ml-1 not-italic font-AeonikProMedium">
                (не обезательно)
              </span>
            </span>

            <span className="ml-[5px]">
              <StarLabel />
            </span>
          </p>
          <div className="flex items-center">
            <div className="flex flex-col">
              <input
                type="number"
                value={"13 %"}
                className="w-[60px] px-3  h-[38px] border border-borderColor px-3 py-[10px] rounded-lg text-xs  font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
                placeholder=""
              />
            </div>
            <span className="rotate-90 text-borderColor mx-[9px]">|</span>
            <label className="w-[210]  flex h-[38px] border border-borderColor flex items-center">
              <input
                type="number"
                value="1 300 000"
                className="w-full   px-3 h-full rounded-lg text-xs font-AeonikProRegular [&::-webkit-inner-spin-button]:appearance-none outline-none"
              />
              <span className="text-gray-600 text-base not-italic font-AeonikProRegular pr-3">
                сум
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const [colorGroup, setColorGroup] = useState([
    {
      colorName: "Black",
      id: 1,
      ColorId: 1,
      icons: InputCheck,
      action: true,
      colors: "black",
    },
    {
      colorName: "Белый",
      id: 2,
      ColorId: 2,
      icons: InputCheck,
      action: false,
      colors: "white",
    },
    {
      id: 3,
      ColorId: 3,
      icons: InputCheck,
      colorName: "Серый",
      action: false,
      colors: "zinc-500",
    },
    {
      id: 4,
      ColorId: 4,
      icons: InputCheck,
      colorName: "Фиолетовый",
      action: false,
      colors: "purple-500",
    },
    {
      id: 5,
      ColorId: 5,
      icons: InputCheck,
      colorName: "Голубой",
      action: false,
      colors: "sky-600",
    },
    {
      id: 6,
      ColorId: 6,
      icons: InputCheck,
      colorName: "Желтый",
      action: false,
      colors: "amber-400 ",
    },
    {
      id: 7,
      ColorId: 7,
      icons: InputCheck,
      colorName: "Зеленый",
      action: false,
      colors: "green-700 ",
    },
    {
      id: 8,
      ColorId: 8,
      icons: InputCheck,
      colorName: "Amber",
      action: false,
      colors: "amber-600 ",
    },
    {
      id: 9,
      ColorId: 9,
      icons: InputCheck,
      colorName: "Красный",
      action: false,
      colors: "red-700  ",
    },
    {
      id: 10,
      ColorId: 10,
      icons: InputCheck,
      colorName: "Фиолетовый",
      action: false,
      colors: "purple-800 ",
    },
    {
      id: 11,
      ColorId: 11,
      icons: InputCheck,
      colorName: "Blue",
      action: false,
      colors: "blue-900 ",
    },
    {
      id: 12,
      ColorId: 12,
      icons: InputCheck,
      colorName: "Brown",
      action: false,
      colors: "yellow-900 ",
    },
  ]);
  const HandleIconsColor = (colorId, id) => {
    // setIconsColor(color);
    setColorGroup((current) => {
      return current.map((data) => {
        if (data?.id == id) {
          return { ...data, action: true };
        } else {
          return { ...data, action: false };
        }
      });
    });
  };

  return (
    <div className="relative w-full px-4 md:px-0 flex items-center justify-between mb-[50px] my-6 md:my-[50px] focus:bg-textBlueColor">
      <div className="absolute top-[0] hidden md:flex items-center justify-center flex-col mr-[50px]">
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
      <div className="">
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
      <div className="">
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

      {/* Open Type Bottom Mobile Modal Animation Section */}
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
        className="md:relative w-full   rounded-xl md:mx-[185px] md:px-[30px] md:py-[50px] md:pb-[250px]"
      // className="md:relative w-full  md:border border-borderColor rounded-xl md:mx-[185px] md:px-[30px] md:py-[50px] md:pb-[250px]"
      >
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
        <div className="w-full flex items-center justify-between md:gap-x-[30px]">
          <div className="w-full md:w-[65%]">
            {/* 1 */}
            <div className="w-full flex flex-row gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mb-[25px]">
              <div className="w-1/2 flex flex-col items-start">
                <div className="flex items-center justify-center mb-[5px]">
                  <label
                    htmlFor=""
                    className="text-[13px] md:text-base font-AeonikProRegular"
                  >
                    Раздел одежды{" "}
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
                  options={[
                    {
                      value: "Брюки",
                      label: "Брюки",
                    },
                    {
                      value: "Джинсы",
                      label: "Джинсы",
                    },
                    {
                      value: "Штаны",
                      label: "Штаны",
                    },
                    {
                      value: "Шорты",
                      label: "Шорты",
                    },
                  ]}
                />
              </div>
              <div className="w-1/2 flex  flex-col items-start">
                <div className="flex items-center justify-center mb-[5px]">
                  <label
                    htmlFor=""
                    className="text-[13px] md:text-base font-AeonikProRegular"
                  >
                    Подраздел одежды{" "}
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
                    [
                      // no data
                    ]
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
                  options={[
                    {
                      value: "Брюки",
                      label: "Брюки",
                    },
                    {
                      value: "Джинсы",
                      label: "Джинсы",
                    },
                    {
                      value: "Штаны",
                      label: "Штаны",
                    },
                    {
                      value: "Шорты",
                      label: "Шорты",
                    },
                  ]}
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
                <div className="w-fit hidden md:flex gap-x-4 items-center justify-between border rounded-lg h-[42px] px-[12px]">
                  <div className="w-fit whitespace-nowrap overflow-hidden flex items-center gap-x-4 ">
                    {colorGroup.map((data) => {
                      return (
                        <>
                          {data?.action && (
                            <button
                              className={`w-[22px] h-[22px] rounded-full bg-${data?.colors}`}
                            ></button>
                          )}
                        </>
                      );
                    })}
                  </div>
                  <button
                    onClick={() => setSelectColorToggleMobile(true)}
                    type="button"
                  >
                    <AddIconsCircle1 />
                  </button>
                </div>
                {/* ----Colors Modal---------- */}
                <div className="w-full">
                  <section
                    className={`h-fit top-30  left-[16px] fixed  bg-white shadow-lg  duration-200 z-50 ${selectColorToggleMobile ? "w-[92%]" : "w-0"
                      }`}
                  >
                    {selectColorToggleMobile && (
                      <div className="fixed inset-0 z-10 ">
                        <div
                          className="fixed inset-0 w-full h-full bg-black opacity-40"
                          onClick={() => setSelectColorToggleMobile(false)}
                        ></div>
                        <div className="flex items-center min-h-screen px-4 py-8">
                          <div className="relative w-full max-w-lg p-[30px] mx-auto bg-white rounded-md shadow-lg">
                            <div
                              className={`flex items-center justify-between`}
                            >
                              <span className="text-gray-800 text-2xl not-italic font-AeonikProMedium   ">
                                Выберите цвет
                              </span>
                              <button
                                className="mr-[-18px] mt-[-18px]"
                                type=""
                                onClick={() =>
                                  setSelectColorToggleMobile(false)
                                }
                              >
                                <GrClose size={22} />
                              </button>
                            </div>
                            <div className="py-2 gap-x-2 flex flex-wrap items-center">
                              {colorGroup?.map((data) => {
                                return (
                                  <div
                                    key={data?.id}
                                    onClick={() =>
                                      HandleIconsColor(
                                        data?.colors,
                                        data?.ColorId
                                      )
                                    }
                                  >
                                    <button
                                      type="button"
                                      className={`w-[65px] border cursor-pointer h-10 rounded-lg flex items-center justify-center bg-${data?.colors} `}
                                    >
                                      {data?.action && data?.id === 2 ? (
                                        <span>
                                          <InputCheckedTrueIcons
                                            colors={"#000"}
                                          />
                                        </span>
                                      ) : null}

                                      {data?.action && data?.id !== 2 ? (
                                        <InputCheckedTrueIcons
                                          colors={"#fff"}
                                        />
                                      ) : null}
                                    </button>
                                    <span
                                      className={` w-[60px] break-all	h-10  flex justify-center text-[12px] not-italic font-AeonikProRegular text-${data?.colors}`}
                                    >
                                      {data?.colorName}
                                    </span>
                                  </div>
                                  // <div
                                  //   key={data?.id}
                                  //   onClick={() =>
                                  //     HandleIconsColor(
                                  //       data?.colors,
                                  //       data?.ColorId
                                  //     )
                                  //   }
                                  //   className={`rounded-full flex items-center justify-center mr-2 w-6 h-6 ${
                                  //     data?.colors
                                  //   } cursor-pointer ${
                                  //     data?.id == 2
                                  //       ? "border border-setTexOpacity"
                                  //       : ""
                                  //   } `}
                                  // >
                                  //   {data?.action && data?.id === 2 ? (
                                  //     <span>
                                  //       <InputCheckedTrueIcons
                                  //         colors={"#000"}
                                  //       />
                                  //     </span>
                                  //   ) : null}

                                  //   {data?.action && data?.id !== 2 ? (
                                  //     <InputCheckedTrueIcons colors={"#fff"} />
                                  //   ) : null}
                                  // </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </section>
                </div>
              </div>
            </div>

            {/* 3 */}
            <div className="w-full flex flex-row gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mb-[25px]">
              <div className="w-1/2 flex  flex-col items-start">
                <div className="flex items-center justify-center mb-[5px]">
                  <label
                    htmlFor=""
                    className="flex items-center text-[13px] md:text-base font-AeonikProRegular"
                  >
                    Пол
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </label>
                </div>
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
                  options={[
                    {
                      value: "Брюки",
                      label: "Брюки",
                    },
                    {
                      value: "Джинсы",
                      label: "Джинсы",
                    },
                    {
                      value: "Штаны",
                      label: "Штаны",
                    },
                    {
                      value: "Шорты",
                      label: "Шорты",
                    },
                  ]}
                />
              </div>
              <div className="w-1/2 flex  flex-col items-start">
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
                <input
                  type="text"
                  value="33"
                  className="w-full h-10 flex text-[10px] md:text-sm items-center justify-between border rounded-lg py-[7px] px-[10px] outline-none"
                  placeholder="0"
                />
              </div>
            </div>

            {/* 4 */}
            <div className="w-full flex flex-row gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mb-[25px]">
              <div className="w-1/2 flex items-center justify-between gap-x-[25px]">
                <div className="w-[43%] hidden md:flex flex-col items-start">
                  <div className="flex items-center justify-center mb-[5px]">
                    <label
                      htmlFor=""
                      className="text-[13px] md:text-base font-AeonikProRegular"
                    >
                      Возраст
                    </label>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <div className="w-full flex items-center">
                    <input
                      type="number"
                      value="12"
                      className="w-[50%] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px] py-[10px] outline-none text-xs [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="Мин"
                    />
                    <span className="w-3 border-b text-borderColor mx-[4px]"></span>
                    <input
                      type="number"
                      value="100"
                      className="w-[50%] h-[42px] text-center fon border border-borderColor rounded-lg px-[10px] py-[10px] outline-none text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="Макс"
                    />
                  </div>
                </div>
                <div className="w-full md:w-[50%]">
                  <div className="flex items-center mb-[5px]">
                    <label
                      htmlFor=""
                      className="text-[13px] md:text-base font-AeonikProRegular"
                    >
                      Цена
                    </label>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <div className="w-full h-[40px] flex items-center border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                    <input
                      type="number"
                      placeholder="0"
                      value="270000"
                      className="w-[70%] font-AeonikProMedium outline-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                      сум
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex flex-col items-start">
                <div className="flex items-center justify-center mb-[5px]">
                  <label
                    htmlFor=""
                    className="text-[13px] md:text-base font-AeonikProRegular"
                  >
                    Скидка
                  </label>
                  <span className="font-AeonikProMedium text-[10px] md:text-[13px] text-textLightColor ml-[5px]">
                    (необязательно)
                  </span>
                </div>
                <div className="w-full flex items-center justify-center">
                  <div className="w-full flex items-center gap-x-1">
                    <div className="w-[40%] md:w-[25%] flex items-start">
                      <div className="w-full h-10 flex items-center justify-center border border-borderColor rounded-lg px-[10px] py-[8px]">
                        <input
                          type="number"
                          placeholder="0"
                          value="40"
                          className="w-[70%] font-AeonikProMedium text-start outline-none text-xs [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="text-textLightColor ml-2">%</span>
                      </div>
                    </div>
                    <span className="rotate-90 text-borderColor ml-[7px] mr-1 md:ml-3 md:mr-[9px]">
                      |
                    </span>
                    <div className="w-[60%] md:w-[75%] flex items-center">
                      <div className="w-full h-[40px] flex items-center justify-between border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                        <input
                          type="number"
                          placeholder="0"
                          value="200000"
                          className="w-[75%] font-AeonikProMedium outline-none [&::-webkit-inner-spin-button]:appearance-none"
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

            {/* 5 */}
            <div className="w-full flex flex-row gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mb-[25px]">
              <div className="w-1/2 flex md:hidden flex-col items-start">
                <div className="flex items-center justify-center mb-[5px]">
                  <label
                    htmlFor=""
                    className="text-[13px] md:text-base font-AeonikProRegular"
                  >
                    Категория одежды
                  </label>
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>{" "}
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
                      value: "Брюки",
                      label: "Брюки",
                    },
                    {
                      value: "Джинсы",
                      label: "Джинсы",
                    },
                    {
                      value: "Штаны",
                      label: "Штаны",
                    },
                    {
                      value: "Шорты",
                      label: "Шорты",
                    },
                  ]}
                />
                <button
                  type="button"
                  onClick={() => setOpenCategories(true)}
                  className="w-full flex md:hidden items-center justify-between border border-borderColor rounded-lg h-[40px] px-3"
                >
                  <span className="text-[#b5b5b5] mt-[3px] font-AeonikProRegular text-[11px] ">
                    Выбрать
                  </span>
                  <span className="rotate-[180deg]">
                    <ArrowRightIcon />
                  </span>
                </button>
              </div>
              <div className="w-1/2 hidden md:flex flex-col items-start">
                <div className="flex items-center justify-between mb-[5px]">
                  <span> Категория одежды</span>
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </div>
                <button
                  onClick={() => setCategoryWear(!categoryWear)}
                  type="button"
                  className="w-full h-[40px] rounded-lg flex items-center justify-between px-3 border border-borderColor overflow-hidden"
                >
                  <span className="text-gray-500 text-sm not-italic font-AeonikProRegular ">
                    Выбрать
                  </span>
                  <span
                    className={` ${categoryWear ? "rotate-[270deg]" : "rotate-[90deg]"
                      }`}
                  >
                    <ArrowRightIcon />
                  </span>
                </button>
              </div>
              <div className="w-1/2 flex items-start gap-x-[10px]">
                <div className="w-full md:w-1/2 flex flex-col items-start">
                  <div className="flex items-center justify-center mb-[5px]">
                    <label
                      htmlFor=""
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
                    options={[
                      {
                        value: "Брюки",
                        label: "Брюки",
                      },
                      {
                        value: "Джинсы",
                        label: "Джинсы",
                      },
                      {
                        value: "Штаны",
                        label: "Штаны",
                      },
                      {
                        value: "Шорты",
                        label: "Шорты",
                      },
                    ]}
                  />
                </div>
                <div className="w-1/2 hidden md:flex flex-col items-start">
                  <div className="flex items-center justify-center mb-[5px]">
                    <label
                      htmlFor=""
                      className="text-base font-AeonikProRegular"
                    >
                      Вес (грамм)
                    </label>
                  </div>
                  <input
                    type="number"
                    defaultValue={"80"}
                    className="w-full border border-borderColor p-[11px] rounded-lg outline-none text-xs [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="(необязательно)"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Buttons For Mobile */}
            <div className="w-full flex md:hidden flex-row gap-x-[11px] md:gap-x-[30px] mb-[30px] md:mb-[25px]">
              <div className="w-1/2 flex md:hidden flex-col items-start">
                <div className="flex items-center justify-center mb-[5px]">
                  <label
                    htmlFor=""
                    className="text-[13px] md:text-base font-AeonikProRegular"
                  >
                    Возраст
                  </label>
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </div>
                <div className="w-full flex items-center">
                  <input
                    type="number"
                    className="w-1/2 md:w-[58px] h-[40px] text-center fon border border-borderColor rounded-lg px-[12px] py-[10px] outline-none text-xs [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Мин"
                  />
                  <span className="rotate-90 text-borderColor ml-3 mr-[9px]">
                    |
                  </span>
                  <input
                    type="number"
                    className="w-1/2 md:w-[58px] h-[40px] text-center fon border border-borderColor rounded-lg px-[10px] py-[10px] outline-none text-xs [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="Макс"
                  />
                </div>
              </div>
              <div className="w-1/2 flex flex-col items-start">
                <div className="flex items-center justify-center mb-[5px]">
                  <label
                    htmlFor=""
                    className="text-[13px] md:text-base font-AeonikProRegular"
                  >
                    Вес (грамм)
                  </label>
                </div>
                <input
                  type="number"
                  className="w-full border border-borderColor p-[11px] rounded-lg outline-none text-xs [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  placeholder="(необязательно)"
                />
              </div>
            </div>

            {/* 6 */}
            <div
              className={`w-full items-center gap-x-6  ${categoryWear ? "md:flex hidden " : "hidden "
                }`}
            >
              <div className="w-[170px] flex items-center text-redText justify-center h-[38px] overflow-hidden border border-textBlueColor text-textBlueColor border-[1.5px] font-AeonikProMedium flex items-center text-sm justify-center cursor-pointer  rounded-lg focus:bg-textBlueColor hover:bg-textBlueColor hover:text-white transition duration-300">
                <Select
                  className="hidden md:block text-center rounded-lg w-full h-11 md:h-10 text-redText"
                  placeholder="Верхняя одежда"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  size="large"
                  suffixIcon={null}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "Брюки",
                      label: "Брюки",
                    },
                    {
                      value: "Джинсы",
                      label: "Джинсы",
                    },
                    {
                      value: "Штаны",
                      label: "Штаны",
                    },
                    {
                      value: "Шорты",
                      label: "Шорты",
                    },
                  ]}
                />
              </div>
              {/* <Popover
                className="w-[165px] flex items-center justify-center h-[38px] whitespace-nowrap border-textBlueColor text-textBlueColor border-[1.5px] font-AeonikProMedium flex items-center text-sm justify-center cursor-pointer  rounded-lg focus:bg-textBlueColor hover:bg-textBlueColor hover:text-white transition duration-300"
                trigger="click"
                options={["Hide"]}
                placement="bottomLeft"
                content={contentOutwear}
              >
                Верхняя одежда
              </Popover> */}
              <button
                type="button"
                onClick={() => setAllSizeModalShow(true)}
                className="group w-[165px] flex items-center justify-center h-[38px] whitespace-nowrap border-textBlueColor text-textBlueColor border-[1.5px] font-AeonikProMedium flex items-center text-sm justify-center cursor-pointer  rounded-lg focus:bg-textBlueColor focus:text-white transition duration-300"
              >
                Все размеры{" "}
              </button>

              <div
                onClick={() => setAllSizeModalShow(false)}
                className={`fixed inset-0 z-[115]  w-full h-[100vh] bg-black opacity-50 ${allSizeModalShow ? "" : "hidden"
                  }`}
              ></div>
              <section
                className={`fixed z-[120] cursor-pointer flex items-center justify-center inset-0 border border-red-500 overflow-hidden ${allSizeModalShow ? "" : "hidden"
                  }`}
              >
                {allSizeModalShow && (
                  <AllSizeModalEdit onClick={toggleAllSizeModalShow} modalOpenColor={toggleColorGroup} />
                )}{" "}
              </section>
              {/* NewLine */}

              <Popover
                className="w-[165px] flex items-center justify-center h-[38px] whitespace-nowrap border-textBlueColor text-textBlueColor border-[1.5px] font-AeonikProMedium flex items-center text-sm justify-center cursor-pointer  rounded-lg focus:bg-textBlueColor hover:bg-textBlueColor hover:text-white transition duration-300"
                trigger="click"
                options={["Hide"]}
                placement="bottomLeft"
                content={contentOutwear}
              >
                Добавить размер{" "}
              </Popover>
            </div>
          </div>
          {/* carousel item */}
          <div className="w-fit h-[510px] hidden md:flex flex-col gap-y-[120px]">
            <div className="">
              <ProductCarouselEdit />
            </div>
            <div className="w-full flex items-center justify-end">
              <button
                onClick={() => setWearCollection(true)}
                type="button"
                className="text-weatherWinterColor hover:underline text-base not-italic font-AeonikProRegular"
              >
                Все фото
              </button>
            </div>
            {/* ----------------wear collection------------ */}
            <div>
              {" "}
              {wearCollection && (
                <WearCollection onClick={toggleWearCollection} />
              )}
            </div>{" "}
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
        <div className="w-full h-fit flex gap-x-[30px]  md:w-fit md:absolute md:right-3 md:bottom-3">
          <button
            type="button"
            className="w-full h-[42px] md:h-[45px] flex items-center justify-center cursor-pointer  active:scale-95  md:px-[50px] py-3 border border-textBlueColor hover:bg-textBlueColor hover:text-white text-textBlueColor rounded-lg text-base md:text-lg font-AeonikProMedium"
          >
            Сохранить
          </button>
          <button
            type="button"
            onClick={() => goProductTitleEdit(3)}
            className="w-full h-[42px] md:h-[45px] flex items-center justify-center cursor-pointer  active:scale-95  md:px-[50px] py-3 border border-textBlueColor hover:bg-textBlueColor hover:text-white text-textBlueColor rounded-lg text-base md:text-lg font-AeonikProMedium"
          >
            Продолжить
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddingProduct;
