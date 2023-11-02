import { Popover, Select, Space, Switch, TreeSelect } from "antd";
import React, { useEffect, useState } from "react";
import {
  AddIconsCircle1,
  ArrowRightIcon,
  DownloadIcon,
  InputCheckedTrueIcons,
  LoaderIcon,
  MenuCloseIcons,
  StarLabel,
} from "../../../../assets/icons";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import HeadWearAdd from "./Details/HeadWear/HeadWearAdd";
import OutWearAdd from "./Details/OutWear/OutWearAdd";
import AccessoriesAdd from "./Details/Accessories/AccessoriesAdd";
import ShoesAdd from "./Details/Shoes/ShoesAdd";
import UnderAddWear from "./Details/UnderAddWear/UnderAddWear";
import ClothingSection from "./DetailsForMobile/ClothesSection/ClothingSection";
import SubClothingSection from "./DetailsForMobile/SubClothesSection/SubClothingSection";
import DressSeason from "./DetailsForMobile/DressSeason/DressSeason";
import ColourGroup from "./DetailsForMobile/ColourList/ColourGroup";
import GenderList from "./DetailsForMobile/GenderList/GenderList";
import DressType from "./DetailsForMobile/DressType/DressType";
import MakeCountry from "./DetailsForMobile/CountrySize/MakeCountry";
import ClothingCategory from "./DetailsForMobile/ClothingCategory/ClothingCategory";
import { useHttp } from "../../../../hook/useHttp";
const { Option } = Select;

const AddingProduct = () => {
  const { request } = useHttp();
  const [state, setState] = useState({
    buttonReviews: false,
    openDropModalButton: true,
    showColor: false,
    // --------------
    ClothingSection: false,
    SubClothingSection: false,
    DressSeason: false,
    Colour: false,
    GenderModal: false,
    DressTypeModal: false,
    MakeCountryModal: false,
    ClothingCategoryModal: false,
    // --------------
    pictureBgFile1: "",
    pictureBgView1: "",
    pictureBgFile2: "",
    pictureBgView2: "",
    pictureBgFile3: "",
    pictureBgView3: "",
    pictureBgFile4: "",
    pictureBgView4: "",
  });
  const [productsData, setProductsData] = useState({});
  const [selectedSectionData, setSelectedSectionData] = useState(null);
  const [selectedSubSectionsData, setSelectedSubSectionsData] = useState(null);

  // ---------Callback----
  const ClothingSectionToggle = React.useCallback(
    () => setState({ ...state, ClothingSection: false }),
    []
  ); // ClothingSection
  const SubClothingSectionToggle = React.useCallback(
    () => setState({ ...state, SubClothingSection: false }),
    []
  ); // ClothingSection
  const DressSeasonToggle = React.useCallback(
    () => setState({ ...state, DressSeason: false }),
    []
  ); // ClothingSection
  const ColourListToggle = React.useCallback(
    () => setState({ ...state, Colour: false }),
    []
  ); // ClothingSection
  const GenderListToggle = React.useCallback(
    () => setState({ ...state, GenderModal: false }),
    []
  ); // ClothingSection
  const DressTypeToggle = React.useCallback(
    () => setState({ ...state, DressTypeModal: false }),
    []
  ); // ClothingSection
  const MakeCountryToggle = React.useCallback(
    () => setState({ ...state, MakeCountryModal: false }),
    []
  ); // ClothingSection
  const ClothingCategoryToggle = React.useCallback(
    () => setState({ ...state, ClothingCategoryModal: false }),
    []
  ); // ClothingSection

  // ---------Callback----
  useEffect(() => {
    if (
      state?.showColor ||
      state?.ClothingCategoryModal ||
      state?.ClothingSection ||
      state?.Colour ||
      state?.DressSeason ||
      state?.DressTypeModal ||
      state?.GenderModal ||
      state?.MakeCountryModal ||
      state?.SubClothingSection ||
      state?.openDropModalButton
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [
    state?.showColor,
    state?.ClothingCategoryModal,
    state?.ClothingSection,
    state?.Colour,
    state?.DressSeason,
    state?.DressTypeModal,
    state?.GenderModal,
    state?.MakeCountryModal,
    state?.SubClothingSection,
    state?.openDropModalButton,
  ]);

  const handleLocationImageOne = (e) => {
    setState({
      ...state,
      pictureBgFile1: e.target.files[0],
      pictureBgView1: URL.createObjectURL(e.target.files[0]),
    });
  };

  useQuery(
    ["products_get"],
    () => {
      return request({ url: "/products/get-product-info", token: true });
    },
    {
      onSuccess: (res) => {
        if (res) {
          setProductsData(res);
        }
      },
      onError: (err) => {
        console.log(err, "ERR PRODUCTS");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const toggleDropModalButton = () => {
    setState({ ...state, openDropModalButton: !state.openDropModalButton });
  };
  // -----------------------------------------------------------
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const [handleWearList, setHandleWearList] = useState([])
  const [handleWearSubList, setHandleWearSubList] = useState([])

  const handleWearGroup = (value) => {
    setHandleWearList(value)
  };

  const handleWearSubGroup = (value) => {
    setHandleWearSubList(value)
  };

  const newArray = []
  productsData?.sections?.filter(e => handleWearList?.includes(e?.id))?.map((data) => {
    return data?.sub_sections?.map(item => {
      newArray.push(item)
    })
  })
  // -----------------------------------------------------------
  const [getTypeId, setGetTypeId] = useState(0)

  const CategoryTypeId = (value, attribute2) => {
    setGetTypeId(attribute2)
  };
  console.log(getTypeId, "getTypeId");
  // console.log(productsData?.types, "productsData?.types"); onChangeSwitch

  // -----------------------------------------------------------

  const onSearch = (value) => {
    console.log("search:", value);
  };
  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
  };

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
  ]);

  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
    };
  }
  useEffect(() => {
    const updateDimension = () => {
      if (getCurrentDimension().width < 758 && state?.showColor) {
        setState({ ...state, showColor: false });
      }
      setScreenSize(getCurrentDimension());
    };

    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  const HandleIconsColor = (color, id) => {
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

  const handleChangeWeather = (value) => {
    console.log(`selected ${value}`);
  };

  // Checks whether an element is even
  const even = (element) => element.action == true;
  let toggleAction = changeColor.some(even);

  const unCheckedAll = () => {
    setState({ ...state, showColor: false });

    setChangeColor((current) => {
      return current.map((data) => {
        return { ...data, action: false };
      });
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  // Категория одеждыДобавить одежду Артикул(необязательно)
  const [randomSellerCode, setRandomSellerCode] = useState(null);

  function randomCode(len) {
    let p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    setRandomSellerCode(
      [...Array(len)].reduce((a) => a + p[~~(Math.random() * p.length)], "")
    );
  }
  return (
    <div className="relative w-full md:px-0 flex items-center justify-between mb-[50px] my-6 md:my-[50px] focus:bg-textBlueColor">
      <section
        onClick={() =>
          setState({
            ...state,
            ClothingSection: false,
            SubClothingSection: false,
            DressSeason: false,
            Colour: false,
            GenderModal: false,
            DressTypeModal: false,
            MakeCountryModal: false,
            ClothingCategoryModal: false,
            showColor: false,
          })
        }
        className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${state?.ClothingSection ||
            state?.SubClothingSection ||
            state?.DressSeason ||
            state?.Colour ||
            state?.GenderModal ||
            state?.DressTypeModal ||
            state?.ClothingCategoryModal ||
            state?.showColor ||
            state?.MakeCountryModal
            ? ""
            : "hidden"
          }`}
      ></section>

      {state?.showColor && (
        <div className="max-w-[576px] w-full fixed z-[221]  left-1/2 right-1/2 top-[50%] translate-x-[-50%] translate-y-[-50%]  h-fit flex items-center  justify-center mx-auto ">
          {/* </div> */}
          <div className="relative z-[223]  top-0 w-full h-fit p-4 mx-auto bg-white rounded-md shadow-lg">
            <div
              className={`flex items-center justify-between border-b border-searchBgColor pb-3`}
            >
              <span className="text-black text-lg not-italic font-AeonikProRegular leading-5">
                Выберите цвет
              </span>
              <button
                className="py-2"
                type=""
                onClick={() => setState({ ...state, showColor: false })}
              >
                <MenuCloseIcons colors={"#000"} />
              </button>
            </div>
            <div className="py-4 gap-x-2 gap-y-4 grid gap-4 grid-cols-6">
              {productsData?.colors.map((data) => {
                // console.log(data.hex, "COLORS");
                return (
                  <div className="flex flex-col items-center justify-center ">
                    <div
                      key={data?.id}
                      onClick={() =>
                        HandleIconsColor(data?.IconsColor, data?.id)
                      }
                      style={{ background: `${data.hex}` }}
                      className={`rounded-[12px] flex items-center justify-center  w-[65px] h-[40px] bg-[${data.hex
                        }] cursor-pointer ${data?.id == 2
                          ? "border border-setTexOpacity flex items-center justify-center"
                          : ""
                        }
                     `}
                    >
                      {data?.action && data?.id === 2 ? (
                        <InputCheckedTrueIcons colors={"#000"} />
                      ) : null}

                      {data?.action && data?.id !== 2 ? (
                        <InputCheckedTrueIcons colors={"#fff"} />
                      ) : null}
                    </div>
                    <span
                      className={`text-black text-center text-xs not-italic font-AeonikProRegular`}
                    >
                      {data?.name_ru}
                    </span>
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
      )}

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

      {/* ---------------------------------------- */}
      {/* Clothing Section */}
      <section
        className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.ClothingSection ? "bottom-0" : "bottom-[-800px] z-0"
          }`}
      >
        <ClothingSection onClick={ClothingSectionToggle} />
      </section>

      {/*Sub Clothing Section */}
      <section
        className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.SubClothingSection ? "bottom-0" : "bottom-[-800px] z-0"
          }`}
      >
        <SubClothingSection onClick={SubClothingSectionToggle} />
      </section>
      {/*DressSeason */}
      <section
        className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.DressSeason ? "bottom-0" : "bottom-[-800px] z-0"
          }`}
      >
        <DressSeason onClick={DressSeasonToggle} />
      </section>
      {/*ColourList */}
      <section
        className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.Colour ? "bottom-0" : "bottom-[-800px] z-0"
          }`}
      >
        <ColourGroup onClick={ColourListToggle} />
      </section>
      {/*ColourList */}
      <section
        className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.GenderModal ? "bottom-0" : "bottom-[-800px] z-0"
          }`}
      >
        <GenderList onClick={GenderListToggle} />
      </section>
      {/*DressType */}
      <section
        className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.DressTypeModal ? "bottom-0" : "bottom-[-800px] z-0"
          }`}
      >
        <DressType onClick={DressTypeToggle} />
      </section>
      {/*MakeCountry */}
      <section
        className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.MakeCountryModal ? "bottom-0" : "bottom-[-800px] z-0"
          }`}
      >
        <MakeCountry onClick={MakeCountryToggle} />
      </section>
      {/*ClothingCategory */}
      <section
        className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.ClothingCategoryModal ? "bottom-0" : "bottom-[-800px] z-0"
          }`}
      >
        <ClothingCategory onClick={ClothingCategoryToggle} />
      </section>
      {/* ---------------------------------------- */}

      <div className="w-full md:mx-[140px] md:mb-[50px] xs:border border-borderColor rounded-xl overflow-hidden">
        <div className="  w-full h-fit md:relative  py-12 ">
          <div className=" w-full h-fit flex gap-x-4 flex-col-reverse	 md:flex-row md:px-7 ">
            <div className="w-full md:w-[70%] h-fit  flex flex-col gap-y-6">
              <div className="w-full grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-6 ">
                {/* Input Select 1 */}
                <div className=" w-full h-fit flex flex-col gap-y-[5px] overflow-hidden">
                  <div className="flex items-center">
                    <span className="text-[13px] md:text-base font-AeonikProRegular">
                      Раздел одежды
                    </span>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setState({ ...state, ClothingSection: true })
                    }
                    type="button"
                    className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                  >
                    <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                      Выбрать
                    </label>
                    <ArrowRightIcon />
                  </button>
                  <div className="w-full  hidden md:flex border rounded-lg focus:border-none overflow-hidden">
                    <Select
                      className=" rounded-lg w-full h-fit "
                      showSearch
                      mode="multiple"
                      placeholder="Выбрать"
                      optionLabelProp="label"
                      // optionFilterProp="children"
                      onChange={handleWearGroup}
                      onSearch={onSearch}
                      size="large"
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    // options={productsData?.sections?.map((item) => {
                    //   return {
                    //     value: item?.id,
                    //     label: item?.name_ru,
                    //   };
                    // })}
                    >
                      {productsData?.sections?.map((item) => {
                        return (
                          <Option
                            key={item.id}
                            value={item.id}
                            label={item.name_ru}
                          >
                            <Space>
                              <span>{item.name_ru}</span>
                            </Space>
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                </div>
                {/* Input Select 2 */}
                <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                  <div className="flex items-center">
                    <span className={`text-[13px] md:text-base font-AeonikProRegular ${newArray?.length ? "text-[#000]" : "text-[#b5b5b5]"}`}>
                      Подраздел одежды
                    </span>
                    <span className="ml-[5px]">
                      {newArray?.length ? (
                        <StarLabel />
                      ) : null}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setState({ ...state, SubClothingSection: true })
                    }
                    type="button"
                    className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                  >
                    <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                      Выбрать
                    </label>
                    <ArrowRightIcon />
                  </button>
                  <div className="w-full h-fit hidden md:flex">
                    <Select
                      className=" rounded-lg w-full h-11 md:h-10"
                      showSearch
                      disabled={
                        newArray?.length ? false : true
                      }
                      placeholder={
                        newArray.length

                          ? "Выбрать"
                          : "No data"
                      }
                      mode="multiple"
                      optionLabelProp="label"
                      onChange={handleWearSubGroup}
                      onSearch={onSearch}
                      size="large"
                      allowClear
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }

                    >
                      {newArray?.map(item => {
                        return (
                          <Option
                            key={item.id}
                            value={item.id}
                            label={item.name_ru}
                          >
                            <Space>
                              <span>{item.name_ru}</span>
                            </Space>
                          </Option>
                        );

                      })
                      }
                    </Select>

                  </div>
                </div>
                {/* Input Select 3 */}
                <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                  <div className="flex items-center">
                    <span className="text-[13px] md:text-base font-AeonikProRegular">
                      Сезон одежды
                    </span>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <button
                    onClick={() => setState({ ...state, DressSeason: true })}
                    type="button"
                    className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                  >
                    <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                      Выбрать
                    </label>
                    <ArrowRightIcon />
                  </button>
                  <div className="w-full h-fit hidden md:flex">
                    <Select
                      mode="multiple"
                      style={{
                        width: "100%",
                      }}
                      placeholder="Select weather"
                      // defaultValue={["china"]}
                      size="large"
                      onChange={handleChangeWeather}
                      optionLabelProp="label"
                    >
                      {productsData?.seasons?.map((item) => {
                        return (
                          <Option
                            key={item.id}
                            value={item.id}
                            label={item.name_ru}
                          >
                            <Space>
                              <span>{item.name_ru}</span>
                            </Space>
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                </div>
                {/* Input Select 4 */}
                <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                  <div className="flex items-center">
                    <span className="text-[13px] md:text-base font-AeonikProRegular">
                      Цвет
                    </span>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <button
                    onClick={() => setState({ ...state, Colour: true })}
                    type="button"
                    className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                  >
                    <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                      Выбрать
                    </label>
                    <ArrowRightIcon />
                  </button>
                  <div className="w-full hidden md:flex items-center justify-between border rounded-lg  h-[42px] md:h-10 px-[12px]">
                    {productsData.colors
                      ?.filter((e) => e?.id <= 9)
                      ?.map((data) => {
                        // console.log(data.hex, 'Colors');
                        return (
                          <div key={data?.id} className="block">
                            <label
                              key={data?.id}
                              style={{ background: `${data.hex}` }}
                              className={`rounded-full border  w-[22px] h-[22px] cursor-pointer flex items-center justify-center hover:scale-110 duration-300 `}
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
                      onClick={() => setState({ ...state, showColor: true })}
                      type="button"
                    >
                      <AddIconsCircle1 />
                    </button>
                  </div>
                </div>
                {/* Input Select 5 */}
                <div className="w-full h-fit  flex items-center gap-x-3">
                  <div className="w-full md:w-1/2 flex flex-col gap-y-[5px]">
                    <div className="flex items-center">
                      <span className="text-[13px] md:text-base font-AeonikProRegular">
                        Пол
                      </span>
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <button
                      onClick={() => setState({ ...state, GenderModal: true })}
                      type="button"
                      className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                    >
                      <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                        Выбрать
                      </label>
                      <ArrowRightIcon />
                    </button>
                    <div className="w-full h-fit md:flex hidden">
                      <Select
                        className=" rounded-lg w-full h-11 md:h-10"
                        showSearch
                        placeholder="Выбрать"
                        optionFilterProp="children"
                        // onChange={onChange1}
                        onSearch={onSearch}
                        size="large"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={productsData?.gender?.map((item) => {
                          return {
                            value: item?.id,
                            label: item?.name_ru,
                          };
                        })}
                      />
                    </div>
                  </div>
                  <div className="w-1/2 hidden md:flex flex-col gap-y-[5px] ">
                    <div className="flex items-center">
                      <span className="text-[12px] flex flex-wrap whitespace-nowrap md:text-base font-AeonikProRegular">
                        Возраст
                      </span>
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <div className="w-full h-fit flex items-center gap-x-2">
                      <input
                        type="text"
                        name="age"
                        placeholder="Мин"
                        className="inputStyle outline-none w-[55px] h-10 text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                      />
                      <span className="w-[15px] h-[2px] border-b border-borderColor "></span>
                      <input
                        type="text"
                        name="age"
                        placeholder="Мах"
                        className="inputStyle outline-none w-[55px] h-10 text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                      />
                    </div>
                  </div>
                </div>
                {/* Input Select 6 */}
                <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                  <div className="flex items-center  ">
                    <span className="text-[13px] md:text-base font-AeonikProRegular">
                      Артикул
                    </span>
                    <span className="font-AeonikProMedium text-[10px] md:text-[13px] text-textLightColor ml-[5px]">
                      (необязательно)
                    </span>
                  </div>
                  <div className="w-full h-fit flex items-center justify-between gap-x-3">
                    <input
                      type="text"
                      value={randomSellerCode}
                      onChange={(e) => setRandomSellerCode(e.target.value)}
                      placeholder=""
                      className="inputStyle w-[calc(100%-42px)] h-10  flex items-center justify-between border rounded-lg px-[10px] outline-none"
                    />
                    <button
                      onClick={() => randomCode(17)}
                      type={"button"}
                      className="w-[40px] h-[40px] active:scale-95  active:opacity-70 flex items-center justify-center  bg-textBlueColor border border-borderColor rounded-lg"
                    >
                      <LoaderIcon />
                    </button>
                  </div>
                </div>
                {/* Input Select 7 */}
                <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                  <div className="flex items-center">
                    <span className="text-[13px] md:text-base font-AeonikProRegular">
                      Категория одежды
                    </span>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <div className="w-full h-fit">
                    <button
                      onClick={toggleDropModalButton}
                      type="button"
                      className={`w-full overflow-hidden h-[40px] hidden md:flex items-center justify-between border border-borderColor rounded-lg p-3 `}
                    >
                      <span className="text-[#a1a1a1]">Выбрать</span>
                      {state.openDropModalButton ? (
                        <span className="-rotate-90 transition duration-200 ease-out">
                          <ArrowRightIcon />
                        </span>
                      ) : (
                        <span className="rotate-90 transition duration-200 ease-out">
                          <ArrowRightIcon />
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() =>
                        setState({
                          ...state,
                          ClothingCategoryModal: !state?.ClothingCategoryModal,
                        })
                      }
                      type="button"
                      className={`w-full overflow-hidden h-[40px] md:hidden flex items-center justify-between border border-borderColor rounded-lg p-3 `}
                    >
                      <span className="text-[#a1a1a1]">Выбрать</span>
                      {state.openDropModalButton ? (
                        <span className="-rotate-90 transition duration-200 ease-out">
                          <ArrowRightIcon />
                        </span>
                      ) : (
                        <span className="rotate-90 transition duration-200 ease-out">
                          <ArrowRightIcon />
                        </span>
                      )}
                    </button>
                  </div>
                </div>
                {/* Input Select 8 */}
                <div className="w-full   h-fit  hidden md:flex items-center gap-x-3">
                  <div className="w-1/2 flex flex-col gap-y-[5px]">
                    <div className="flex items-center">
                      <span className="text-[13px] md:text-base font-AeonikProRegular">
                        Тип
                      </span>
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <div className="w-full h-fit">
                      <Select
                        className="block rounded-lg w-full h-11 md:h-10"
                        showSearch
                        placeholder="Выбрать"
                        optionFilterProp="children"
                        // onChange={CategoryTypeId}
                        onChange={(value, attribute2) => {

                          CategoryTypeId(value, attribute2?.attribute2)
                        }}
                        onSearch={onSearch}
                        size="large"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      // options={productsData?.types?.map((item) => {
                      //   return {
                      //     value: item?.id,
                      //     label: item?.name_ru,
                      //   };
                      // })}
                      // onChange={(value, attribute2) => {

                      //   console.log(value, attribute2);
                      //   // id_variable = value[0];
                      //   // attribute2_variable = value.attribute2;
                      //   // attribute2_variable = value[1];
                      //   // attribute2_variable = attribute2
                      // }}

                      >
                        {productsData?.types?.map((item) => {
                          return (
                            <Option
                              key={"item_" + item.id}
                              value={item?.id}
                              attribute2={item?.category_id}
                            >
                              {item.name_ru}</Option>)
                        }

                        )
                        }
                      </Select>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col gap-y-[5px]">
                    <div className="flex items-center">
                      <span className="text-[13px] md:text-base font-AeonikProRegular">
                        Производитель
                      </span>
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <div className="w-full h-fit">
                      <Select
                        className=" rounded-lg w-full h-11 md:h-10"
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
                        options={productsData?.producers?.map((item) => {
                          return {
                            value: item?.id,
                            label: item?.name_ru,
                          };
                        })}
                      />
                    </div>
                  </div>
                </div>
                {/* Input Select 9 mobile */}
                <div className="w-full  flex md:hidden flex-col gap-y-[5px]">
                  <div className="flex items-center">
                    <span className="text-[13px] md:text-base font-AeonikProRegular">
                      Тип
                    </span>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <button
                    onClick={() => setState({ ...state, DressTypeModal: true })}
                    type="button"
                    className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                  >
                    <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                      Выбрать
                    </label>
                    <ArrowRightIcon />
                  </button>
                  <div className="w-full h-fit md:flex hidden">
                    <Select
                      className="block rounded-lg w-full h-11 md:h-10"
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
                      options={productsData?.types?.map((item) => {
                        return {
                          value: item?.id,
                          label: item?.name_ru,
                        };
                      })}
                    />
                  </div>
                </div>
                {/* Input Select 10 mobile */}
                <div className="w-full  flex md:hidden flex-col gap-y-[5px]">
                  <div className="flex items-center">
                    <span className="text-[13px] md:text-base font-AeonikProRegular">
                      Производитель
                    </span>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      setState({ ...state, MakeCountryModal: true })
                    }
                    type="button"
                    className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                  >
                    <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                      Выбрать
                    </label>
                    <ArrowRightIcon />
                  </button>
                  <div className="w-full h-fit md:flex hidden">
                    <Select
                      className=" rounded-lg w-full h-11 md:h-10"
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
                      options={productsData?.producers?.map((item) => {
                        return {
                          value: item?.id,
                          label: item?.name_ru,
                        };
                      })}
                    />
                  </div>
                </div>
                {/* Input Select 11 mobile */}
                <div className="w-full  flex md:hidden flex-col gap-y-[5px] ">
                  <div className="flex items-center">
                    <span className="text-[12px] flex flex-wrap whitespace-nowrap md:text-base font-AeonikProRegular">
                      Возрастная категория
                    </span>
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <div className="w-full h-fit flex items-center justify-between gap-x-2">
                    <input
                      type="text"
                      name="age"
                      placeholder="Мин"
                      className="inputStyle outline-none w-[40%] h-10 text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                    />
                    <span className="w-[15px] h-[2px] border-b border-borderColor "></span>
                    <input
                      type="text"
                      name="age"
                      placeholder="Мах"
                      className="inputStyle outline-none w-[40%] h-10 text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                    />
                  </div>
                </div>
              </div>

              <div>
                {state.openDropModalButton ? (
                  <div className="w-full hidden md:flex items-center flex-wrap gap-3 ">
                    <HeadWearAdd title={productsData?.categories} typeId={getTypeId} />
                    <OutWearAdd title={productsData?.categories} typeId={getTypeId} />
                    <UnderAddWear title={productsData?.categories} typeId={getTypeId} />
                    <ShoesAdd title={productsData?.categories} typeId={getTypeId} />
                    <AccessoriesAdd title={productsData?.categories} typeId={getTypeId} />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full md:w-[30%] h-fit flex md:flex-col flex-row  justify-center gap-x-4 ">
              <div className="hidden md:flex items-center  justify-start mb-[5px]">
                <span className="text-base font-AeonikProRegular">Фото</span>
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              <div className="w-[300px] md:w-full h-[350px] flex items-center justify-center ">
                <button
                  type="button"
                  className="h-full w-full flex items-center justify-center "
                >
                  <label
                    htmlFor="DataImg1"
                    className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center  text-textBlueColor "
                  >
                    <input
                      className="hidden"
                      id="DataImg1"
                      type="file"
                      onChange={handleLocationImageOne}
                      accept=" image/*"
                    />
                    {!state?.pictureBgView1 && (
                      <div className="w-full h-full flex  bg-photoBg items-center justify-center border border-dashed rounded-lg">
                        <span className="leading-none text-textBlueColor border-b border-textBlueColor font-AeonikProMedium">
                          Выберите фото
                        </span>
                      </div>
                    )}
                    {state?.pictureBgView1 && (
                      <img
                        src={state?.pictureBgView1}
                        alt="backImg"
                        className="w-full h-full border border-searchBgColor object-contain rounded-lg"
                      />
                    )}
                  </label>
                </button>
              </div>
              <div className="w-[90px] md:w-full flex flex-col md:flex-row items-center justify-between gap-y-2 gap-x-[10px] md:mt-[10px]">
                <div className="w-full h-1/3 md:h-[73px] md:w-1/3 flex flex-col items-center justify-center ">
                  <button
                    type="button"
                    className="h-full w-full flex items-center justify-center "
                  >
                    <label
                      htmlFor="DataImg1"
                      className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                    >
                      <input
                        className="hidden"
                        id="DataImg1"
                        type="file"
                        onChange={handleLocationImageOne}
                        accept=" image/*"
                      />
                      {!state?.pictureBgView1 && (
                        <div className="w-full h-full bg-photoBg border border-dashed rounded-lg flex items-center justify-center">
                          <DownloadIcon />
                        </div>
                      )}
                      {state?.pictureBgView1 && (
                        <img
                          src={state?.pictureBgView1}
                          alt="backImg"
                          className="w-full h-full object-contain border border-searchBgColor rounded-lg"
                        />
                      )}
                    </label>
                  </button>
                </div>
                <div className="w-full h-1/3 md:h-[73px] md:w-1/3 flex flex-col items-center justify-center">
                  <button
                    type="button"
                    className="h-full w-full flex items-center justify-center "
                  >
                    <label
                      htmlFor="DataImg1"
                      className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                    >
                      <input
                        className="hidden"
                        id="DataImg1"
                        type="file"
                        onChange={handleLocationImageOne}
                        accept=" image/*"
                      />
                      {!state?.pictureBgView1 && (
                        <div className="w-full h-full bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                          <DownloadIcon />
                          <div className="text-[11px] text-textLightColor mt-[5px]">
                            (необязательно)
                          </div>
                        </div>
                      )}
                      {state?.pictureBgView1 && (
                        <img
                          src={state?.pictureBgView1}
                          alt="backImg"
                          className="w-full h-full object-contain border border-searchBgColor rounded-lg"
                        />
                      )}
                    </label>
                  </button>
                </div>
                <div className="w-full h-1/3 md:h-[73px] md:w-1/3 flex flex-col items-center justify-center ">
                  <button
                    type="button"
                    className="h-full w-full flex items-center justify-center "
                  >
                    <label
                      htmlFor="DataImg1"
                      className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-textBlueColor "
                    >
                      <input
                        className="hidden"
                        id="DataImg1"
                        type="file"
                        onChange={handleLocationImageOne}
                        accept=" image/*"
                      />
                      {!state?.pictureBgView1 && (
                        <div className="w-full h-full bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                          <DownloadIcon />
                          <div className="text-[11px] text-textLightColor mt-[5px]">
                            (необязательно)
                          </div>
                        </div>
                      )}
                      {state?.pictureBgView1 && (
                        <img
                          src={state?.pictureBgView1}
                          alt="backImg"
                          className="w-full h-full object-contain border border-searchBgColor rounded-lg"
                        />
                      )}
                    </label>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:relative w-full  md:mt-[200px]">
            <div className="flex md:hidden items-center justify-between mb-[40px]">
              <div className="w-1/3 h-[1px] bg-borderColor"></div>
              <div className="w-1/3 flex items-center justify-around">
                <button className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full	">
                  <span className="w-2 h-2 rounded-full bg-textBlueColor block "></span>
                </button>
                <span className="w-1/2 h-[1px]  bg-textBlueColor "></span>
                <button className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full"></button>
              </div>
              <div className="w-1/3 h-[1px] bg-borderColor"></div>
            </div>

            <Link
              to="/products/add-detail"
              className="w-full h-[42px] md:h-[45px] flex items-center justify-center md:w-fit md:absolute active:scale-95 md:right-3 md:bottom-3 md:px-[50px] py-3 border border-textBlueColor bg-textBlueColor text-white rounded-lg text-base md:text-lg font-AeonikProMedium"
            >
              Продолжить
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddingProduct;
