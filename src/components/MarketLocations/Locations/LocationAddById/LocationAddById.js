import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowTopIcons,
  GoBackIcons,
  MenuCloseIcons,
  Star6Icon,
  StarLabel,
  TelIcon,
} from "../../../../assets/icons";
import InputMask from "react-input-mask";

import YandexMapStore from "./YandexMaps";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHttp } from "../../../../hook/useHttp";
import { AiOutlineLeft } from "react-icons/ai";
export default function LocationAddById() {
  const url = "https://api.dressme.uz/api/seller";
  const navigate = useNavigate();
  const { request } = useHttp();
  const { id } = useParams();
  const shopId = id?.replace(":", "");
  const [state, setState] = useState({
    imgFirst: "",
    imgSecond: "",
    imgThird: "",
    assistantNameFirst: "",
    assistantNameSecond: "",
    assistantPhoneFirst: "",
    phoneCode: "+998",
    assistantPhoneSecond: "",
    regionIdShops: "",
    subRegionIdShops: "",
    workTimeFrom: "09:00",
    workTimeTo: "18:00",
    shopId: shopId,
    shopLatitude: "",
    shopLongitude: "",
    shopCenterAddress: "",
    // region toogle
    openStoreList: false,
    getRegionList: "",
    // ----errorGroup ----
    errorGroup: "",
    //-----ForImg
    pictureBgFile1: "",
    pictureBgView1: "",
    picturelogoFile2: "",
    picturelogoView2: "",
    pictureLastFile3: "",
    pictureLastView3: "",
  });
  // ----------phone Number----------1

  const assistantPhoneNumberFirst =
    state.phoneCode?.split("+")?.join("") +
    state?.assistantPhoneFirst
      ?.split("-")
      ?.join("")
      ?.split(")")
      ?.join("")
      ?.split("(")
      ?.join("")
      ?.split(" ")
      ?.join("");
  const assistantPhoneNumberSecond =
    state.phoneCode?.split("+")?.join("") +
    state?.assistantPhoneSecond
      ?.split("-")
      ?.join("")
      ?.split(")")
      ?.join("")
      ?.split("(")
      ?.join("")
      ?.split(" ")
      ?.join("");
  // ----------phone Number----------2

  function CallBackYandex(childData) {
    setState({
      ...state,
      shopCenterAddress: childData?.title,
      shopLatitude: childData?.center[0],
      shopLongitude: childData?.center[1],
    });
  }

  // console.log();
  const handleLocationImageOne = (e) => {
    setState({
      ...state,
      pictureBgFile1: e.target.files[0],
      pictureBgView1: URL.createObjectURL(e.target.files[0]),
    });
  };
  const handleLocationImageTwo = (e) => {
    setState({
      ...state,
      picturelogoFile2: e.target.files[0],
      picturelogoView2: URL.createObjectURL(e.target.files[0]),
    });
  };
  const handleLocationImageThree = (e) => {
    setState({
      ...state,
      pictureLastFile3: e.target.files[0],
      pictureLastView3: URL.createObjectURL(e.target.files[0]),
    });
  };

  useQuery(["shops_regions"], () => {
    return request({ url: "/shops/locations/regions", token: true });
  },
    {
      onSuccess: (res) => {
        setState({ ...state, getRegionList: res });
      },
      onError: (err) => {
        console.log(err, "BU -- HOC -- Error");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const LocationAddSubmit = () => {
    // console.log(assistantPhoneNumberFirst, "assistantPhoneSecond ");

    let form = new FormData();
    form.append("address", state?.shopCenterAddress);
    form.append("longitude", state?.shopLongitude);
    form.append("latitude", state?.shopLatitude);
    form.append("shop_id", state?.shopId);
    form.append("region_id", state?.regionIdShops);
    form.append("sub_region_id", state?.subRegionIdShops);
    form.append("work_time_from", state?.workTimeFrom);
    form.append("work_time_to", state?.workTimeTo);
    form.append("assistant_name", state?.assistantNameFirst);
    form.append("assistant_phone", assistantPhoneNumberFirst);
    state?.assistantNameSecond &&
      form.append("second_assistant_name", state?.assistantNameSecond);
    state?.assistantPhoneSecond &&
      form.append("second_assistant_phone", assistantPhoneNumberSecond);
    state?.pictureBgFile1 &&
      form.append("shop_photo_one", state?.pictureBgFile1);
    state?.picturelogoFile2 &&
      form.append("shop_photo_two", state?.picturelogoFile2);
    state?.pictureLastFile3 &&
      form.append("shop_photo_three", state?.pictureLastFile3);

    return fetch(`${url}/shops/locations/store`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
      body: form,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res, "AddLocationById");

        if (res?.errors && res?.message) {
          setState({ ...state, errorGroup: res?.errors });
        } else if (res?.message) {
          toast.success(`${res?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/locations-store");
        }
      })
      .catch((err) => console.log(err, "errImage"));
  };

  const [activeIndex, setActiveIndex] = useState();
  const accordionCityList = (id) => {
    if (activeIndex == id) {
      setActiveIndex(0);
    } else {
      setActiveIndex(id);
    }
  };
  // For DropUp
  useEffect(() => {
    if (state?.openStoreList) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [state?.openStoreList]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  // console.log(state?.workTimeFrom, "workTimeFrom");
  // console.log(state?.workTimeTo, "workTimeTo");

  return (
    <div className="w-full max-w-[920px] mx-auto mt-6 md:mt-12 md:px-10 pb-10">
      <ToastContainer
        style={{ zIndex: "1000", top: "80px" }}
        position="top-right"
        autoClose={5000}
        limit={4}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className=" ">
        <div className=" flex items-center justify-center mb-6 md:mb-[50px]">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="  md:hidden absolute left-0 flex items-center cursor-pointer justify-center "
          >
            <GoBackIcons />
          </button>
          <div className="text-center text-[17px] ls:text-xl md:text-[35px] font-AeonikProMedium   md:px-0">
            Добавить локацию магазина
          </div>
        </div>
        <div className="flex items-center mb-2">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="w-8 h-8 flex items-center cursor-pointer justify-center border border-borderColor rounded-lg active:scale-95  active:opacity-70"
          >
            <AiOutlineLeft />
          </button>
        </div>
        <div>

          <YandexMapStore
            handleCallback={CallBackYandex}
          // errorLat={state?.errorGroup?.latitude}
          // errorLong={state?.errorGroup?.longitude}
          // errorTitle={state?.errorGroup?.address}
          />
          {state?.errorGroup?.address && !state?.shopCenterAddress && (
            <p className="text-[#D50000] text-[12px] ll:text-[14px] md:text-base">
              {state?.errorGroup?.address}
            </p>
          )}
        </div>
        <div className="flex mt-[10px]  px-4 md:px-0 justify-between items-centers gap-x-[5px] ls:gap-x-[10px] md:gap-[25px] mb-[25px] ">
          <div className=" w-full md:w-[31%] flex-col h-[75px] md:h-[150px] border-2 border-dashed flex items-center justify-center rounded-lg">
            <button className="h-full w-full flex items-center justify-center ">
              <label
                htmlFor="DataImg1"
                className="h-full w-full  text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-textBlueColor "
              >
                <input
                  className="hidden"
                  id="DataImg1"
                  type="file"
                  name="fileUpload1"
                  onChange={handleLocationImageOne}
                  accept=" image/*"
                />
                {!state?.pictureBgView1 && (
                  <div className="w-fit h-fit flex items-center">
                    <span className="leading-none text-[11px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                      Фото локации
                    </span>
                    <span className=" ml-[2px] md:ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                )}
                {state?.pictureBgView1 && (
                  <img
                    src={state?.pictureBgView1}
                    alt="backImg"
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </label>
            </button>
            {state?.errorGroup?.shop_photo_one && !state?.pictureBgView1 && (
              <p className="text-[#D50000]  text-[12px] ll:text-[14px] md:text-base">
                {state?.errorGroup?.shop_photo_one}
              </p>
            )}
          </div>
          <div className=" w-full md:w-[31%] h-[75px] md:h-[150px] border-2 border-dashed flex items-center justify-center rounded-lg">
            <button className="h-full w-full flex items-center justify-center">
              <label
                htmlFor="DataImg2"
                className="h-full w-full text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-textBlueColor "
              >
                <input
                  className="hidden"
                  id="DataImg2"
                  type="file"
                  name="fileUpload2"
                  onChange={handleLocationImageTwo}
                  accept=" image/*"
                />
                {!state?.picturelogoView2 && (
                  <div className="w-fit h-fit flex items-center">
                    <span className="leading-none text-[11px] flex md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                      <span className="hidden md:flex">Второе</span> фото
                      локации
                    </span>
                  </div>
                )}
                {state?.picturelogoView2 && (
                  <img
                    src={state?.picturelogoView2}
                    alt="backImg"
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </label>
            </button>
          </div>
          <div className=" w-full md:w-[31%] h-[75px] md:h-[150px] border-2 border-dashed flex items-center justify-center rounded-lg">
            <button className="h-full w-full flex items-center justify-center ">
              <label
                htmlFor="DataImg3"
                className="h-full w-full  text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-textBlueColor "
              >
                <input
                  className="hidden"
                  id="DataImg3"
                  type="file"
                  name="fileUpload3"
                  onChange={handleLocationImageThree}
                  accept=" image/*"
                />
                {!state?.pictureLastView3 && (
                  <div className="w-fit h-fit flex items-center">
                    <span className="leading-none text-[11px] flex md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                      <span className="hidden md:flex"> Третье</span> фото
                      локации
                    </span>
                  </div>
                )}
                {state?.pictureLastView3 && (
                  <img
                    src={state?.pictureLastView3}
                    alt="backImg"
                    className="w-full h-full object-cover rounded-lg"
                  />
                )}
              </label>
            </button>
          </div>
        </div>
        <div className="w-full  px-4 md:px-0 ">
          <div className="flex flex-wrap items-center justify-between gap-x-3 md:gap-4 ">
            {/* INPUT DATA */}
            <div className={"w-full block md:hidden mb-3 md:mb-0"}>
              <label htmlFor="selectRegion2">
                <span className="text-[12px] md:text-base flex items-center mb-1 md:mb-[10px] tracking-[0,16px] ">
                  Выберите регион
                  <span className="ml-[5px]">
                    <Star6Icon />
                  </span>
                </span>
                <div
                  onClick={() => {
                    setState({ ...state, openStoreList: true });
                  }}
                  className="w-full h-10 md:h-[45px] mt-[6px] px-[15px] flex items-center justify-between rounded-lg cursor-pointer border border-searchBgColor"
                >
                  <span className=" w-full  h-[32px] md:h-[45px] flex items-center not-italic font-AeonikProRegular text-[#B5B5B5] text-xs md:text-[16px] leading-4 ">
                    {!state?.regionIdShops &&
                      !state?.subRegionIdShops &&
                      "Выберите регион"}

                    {state?.getRegionList?.regions
                      ?.filter((e) => e.id == state?.regionIdShops)
                      .map((item) => {
                        return (
                          <span key={item?.name_ru} className="flex items-center text-[#000] text-[14px] sm:text-base">
                            {item?.name_ru},
                            {item?.sub_regions
                              ?.filter((i) => i.id == state?.subRegionIdShops)
                              .map((data) => {
                                return (
                                  <span key={data?.name_ru} className="ml-1">{data?.name_ru}</span>
                                );
                              })}
                          </span>
                        );
                      })}
                  </span>
                  <span className="rotate-[180deg]">
                    <ArrowTopIcons colors={"#a1a1a1"} />
                  </span>
                </div>
                {state?.errorGroup?.region_id && !state?.subRegionIdShops && (
                  <p className="text-[#D50000]  text-[12px] ll:text-[14px] md:text-base">
                    {state?.errorGroup?.region_id}
                  </p>
                )}
              </label>
            </div>
            <label htmlFor="fname" className=" w-full md:w-[31%] mb-3 md:mb-0">
              <div className="w-full text-[12px] md:text-base flex items-center mb-1 md:mb-[10px]">
                Имя администратора{" "}
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              <div className="flex flex-col items-center h-10 w-full text-base font-AeonikProMedium">
                <input
                  type="text"
                  name="fname"
                  placeholder=" Имя администратора"
                  value={state?.assistantNameFirst}
                  onChange={(e) =>
                    setState({ ...state, assistantNameFirst: e.target.value })
                  }
                  className="w-full outline-none text-[12px] md:text-[14px]  h-10 md:h-[42px] border border-borderColor rounded-lg md:rounded-lg font-AeonikProRegular px-2"
                />
                {state?.errorGroup?.assistant_name &&
                  !state?.assistantNameFirst && (
                    <p className="text-[#D50000] text-[12px] ll:text-[14px]  w-full ">
                      {state?.errorGroup?.assistant_name}
                    </p>
                  )}
              </div>
            </label>
            <label htmlFor="fname2" className=" w-full md:w-[31%] mb-3 md:mb-0">
              <div className="w-full text-[12px] md:text-base flex items-center mb-1 md:mb-[10px]">
                Имя второго администратора{" "}
              </div>
              <div className="flex flex-col items-center h-10  w-full text-base font-AeonikProMedium">
                <input
                  type="text"
                  name="fname2"
                  placeholder=" (не обезательно)"
                  value={state?.assistantNameSecond}
                  onChange={(e) =>
                    setState({ ...state, assistantNameSecond: e.target.value })
                  }
                  className="w-full outline-none text-[12px] md:text-[14px] h-10 md:h-[42px] border border-borderColor rounded-lg font-AeonikProRegular px-2"
                />
                {state?.errorGroup?.second_assistant_name &&
                  !state?.assistantNameSecond && (
                    <p className="text-[#D50000] text-[12px] ll:text-[14px]  w-full ">
                      {state?.errorGroup?.second_assistant_name}
                    </p>
                  )}
              </div>
            </label>

            <div className=" flex w-full md:w-[31%]">
              <div
                onClick={() => {
                  setState({ ...state, openStoreList: false });
                }}
                className={`fixed inset-0 z-[10000] duration-200 w-full h-[100vh] bg-black opacity-50 ${state?.openStoreList ? "" : "hidden"
                  }`}
              ></div>
              {
                <div
                  className={` max-w-[550px] h-fit fixed px-3 md:px-6  py-2 md:py-4 bg-white rounded-b-none md:rounded-b-lg	 rounded-t-lg  mx-auto w-full duration-500 z-[10001] md:top-[50%] md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] overflow-hidden ${state?.openStoreList
                    ? " bottom-0 md:flex flex-col"
                    : "md:hidden bottom-[-1500px] z-[-10]"
                    }`}
                >
                  <div className="w-full flex items-center justify-between">
                    <span className="text-black text-xl md:text-2xl not-italic font-AeonikProRegular">
                      Выберите регион
                    </span>
                    <span
                      className="select-none cursor-pointer"
                      onClick={() => {
                        setState({ ...state, openStoreList: false });
                      }}
                    >
                      <MenuCloseIcons colors="#000" />
                    </span>
                  </div>

                  <div className="w-full overflow-auto flex flex-col gap-y-4 pt-3 overflow-x-hidden mt-3 h-[50vh] md:h-[60vh] VerticelScroll pr-2 ">
                    {state?.getRegionList?.regions ? (
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
                                className={`${activeIndex == data?.id
                                  ? "rotate-[0deg]"
                                  : "rotate-[180deg]"
                                  } `}
                              >
                                <ArrowTopIcons colors={"#a1a1a1"} />
                              </span>
                            </div>

                            <div
                              className={`w-full grid grid-cols-2 xs:grid-cols-3 duration-[400ms]
                             ${activeIndex == data?.id
                                  ? "openAccardion"
                                  : "CloseAccardion"
                                } `}
                            >
                              {data?.sub_regions?.map((item) => {
                                return (
                                  <div
                                    key={item?.id}
                                    className="flex items-center px-[2px] gap-x-[4px] cursor-pointer"
                                  >
                                    <label
                                      htmlFor={item?.name_ru}
                                      className="flex items-center gap-x-[6px]"
                                    >
                                      <input
                                        type="radio"
                                        id={item?.name_ru}
                                        name="type_work_2"
                                        value={item?.region_id}
                                        checked={
                                          item?.id == state?.subRegionIdShops
                                        }
                                        className="border border-searchBgColor  cursor-pointer  flex items-center justify-center"
                                        onChange={(e) => {
                                          setState({
                                            ...state,
                                            regionIdShops: e.target.value,
                                            subRegionIdShops: item?.id,
                                          });
                                        }}
                                        required
                                      />
                                      <span className="text-[#303030]  cursor-pointer text-[15px] not-italic font-AeonikProRegular">
                                        {item?.name_ru}
                                      </span>
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="w-full h-full flex flex-col items-center justify-center">
                        Malumotlar yuklanyapti...
                      </p>
                    )}
                  </div>
                  <div className="w-full flex items-center justify-end  mt-2">
                    <span
                      onClick={() => {
                        setState({ ...state, openStoreList: false });
                      }}
                      className="cursor-pointer text-fullBlue text-lg not-italic font-AeonikProMedium"
                    >
                      Готово
                    </span>
                  </div>
                </div>
              }
              {/* Region Input  */}
              <div className={"w-full hidden md:block"}>
                <label htmlFor="selectRegion2">
                  <span className="text-[12px] md:text-base flex items-center mb-1 md:mb-[10px] tracking-[0,16px] ">
                    Выберите регион
                    <span className="ml-[5px]">
                      <Star6Icon />
                    </span>
                  </span>
                  <div
                    onClick={() => {
                      setState({ ...state, openStoreList: true });
                    }}
                    className="w-full  h-[32px] md:h-[42px] mt-[6px] px-[15px] flex items-center justify-between rounded-lg cursor-pointer border border-searchBgColor"
                  >
                    <span className=" w-full  h-[32px] md:h-[45px] flex items-center not-italic font-AeonikProRegular text-[#B5B5B5] ll:text-[14px] sm:text-[16px] text-base leading-4 ">
                      {!state?.regionIdShops &&
                        !state?.subRegionIdShops &&
                        "Выберите регион"}

                      {state?.getRegionList?.regions
                        ?.filter((e) => e.id == state?.regionIdShops)
                        .map((item) => {
                          return (
                            <span key={item?.name_ru} className="flex items-center text-[#000] text-[14px] sm:text-base">
                              {item?.name_ru},
                              {item?.sub_regions
                                ?.filter((i) => i.id == state?.subRegionIdShops)
                                .map((data) => {
                                  return (
                                    <span key={data?.name_ru} className="ml-1">
                                      {data?.name_ru}
                                    </span>
                                  );
                                })}
                            </span>
                          );
                        })}
                    </span>
                    <span className="rotate-[180deg]">
                      <ArrowTopIcons colors={"#a1a1a1"} />
                    </span>
                  </div>
                  {state?.errorGroup?.region_id && !state?.subRegionIdShops && (
                    <p className="text-[#D50000]  text-[12px] ll:text-[14px] md:text-base">
                      {state?.errorGroup?.region_id}
                    </p>
                  )}
                </label>
              </div>
            </div>
            <label htmlFor="phone1" className=" w-full md:w-[31%] mb-3 md:mb-0 ">
              <div className="text-[12px] md:text-base flex items-center mb-1 md:mb-[10px]">
                Номер администратора
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>

              <div className="h-10 md:h-[42px] mt-[6px] flex items-center overflow-hidden border border-searchBgColor rounded-lg">
                <div className="text-[12px] md:text-base  flex items-center px-[12px] justify-center   cursor-pointer border-r border-searchBgColor overflow-hidden">
                  <input
                    className=" outline-none	w-[40px] h-[42px]  placeholder-leading-4 placeholder-tracking-[0,16px] placeholder-not-italic placeholder-font-AeonikProMedium text-xs md:text-base placeholder-text-base placeholder-leading-4 placeholder-text-black"
                    name="phoneCode"
                    type="text"
                    value={state.phoneCode}
                    readOnly
                  />
                </div>
                <div className="w-full md:w-[70%] h-10 xs:h-[42px] overflow-hidden flex items-center">
                  <InputMask
                    mask="(99) 999-99-99"
                    value={state?.assistantPhoneFirst || null}
                    name="phone"
                    onChange={(e) =>
                      setState({
                        ...state,
                        assistantPhoneFirst: e.target.value,
                      })
                    }
                    className={`w-full px-2 xs:px-4 outline-none h-full not-italic ${state?.assistantPhoneFirst ? "font-AeonikProMedium" : null
                      } text-xs md:text-base leading-4 text-black`}
                    placeholder={"(77) 777-77-77"}
                  ></InputMask>
                  <span className="mr-[12px]">
                    <TelIcon />
                  </span>
                </div>
              </div>
              {state?.errorGroup?.assistant_phone &&
                !state?.assistantPhoneFirst && (
                  <p className="text-[#D50000] text-[12px] ll:text-[14px]  w-full ">
                    {state?.errorGroup?.assistant_phone}
                  </p>
                )}
            </label>
            <label htmlFor="phone2" className=" w-full md:w-[31%]">
              <div className="text-[12px] md:text-base flex items-center mb-1 md:mb-[10px]">
                Номер второго администратора
                <span className="ml-[5px]">{/* <StarLabel /> */}</span>
              </div>
              <div className="h-10 md:h-[42px] mt-[6px] flex items-center overflow-hidden border border-searchBgColor rounded-lg">
                <div className="text-xs md:text-base  flex items-center px-[12px] justify-center cursor-pointer border-r border-searchBgColor overflow-hidden">
                  <input
                    className=" w-[40px] h-[42px] outline-none placeholder-leading-4 placeholder-tracking-[0,16px] placeholder-not-italic placeholder-font-AeonikProMedium 
                    text-xs md:text-[16px] placeholder-text-base placeholder-leading-4 placeholder-text-black"
                    type="text"
                    name="phoneCode2"
                    value={state.phoneCode}
                    readOnly
                  />
                </div>
                <div className="w-full md:w-[70%] h-10 xs:h-[42px] overflow-hidden flex items-center">
                  <InputMask
                    mask="(99) 999-99-99"
                    value={state?.assistantPhoneSecond || null}
                    name="phone2"
                    placeholder={"(77) 777-77-77"}
                    onChange={(e) =>
                      setState({
                        ...state,
                        assistantPhoneSecond: e.target.value,
                      })
                    }
                    className={`w-full px-2 xs:px-4 outline-none h-full not-italic ${state?.assistantPhoneSecond
                      ? "font-AeonikProMedium"
                      : null
                      } text-xs md:text-[16px] leading-4 text-black`}
                  ></InputMask>
                  <span className="mr-[12px]">
                    <TelIcon />
                  </span>
                </div>
              </div>
              {state?.errorGroup?.second_assistant_phone &&
                !state?.assistantPhoneSecond && (
                  <p className="text-[#D50000] text-[12px] ll:text-[14px]  w-full ">
                    {state?.errorGroup?.second_assistant_phone}
                  </p>
                )}
            </label>
            <div className=" w-full md:w-[31%]">
              <div className="text-[12px] md:text-base flex items-center mb-1 md:mb-[10px]">
                Рабочее время
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </div>
              <div className="w-full flex items-center md:mb-0">
                <span className="w-fit text-[12px] md:text-base flex items-center ">
                  от
                </span>
                <div className="flex flex-col items-center h-[42px] ">
                  <input
                    className="without_ampm mr-5 ml-[5px] outline-none w-[70%] xs:w-[40%] border border-borderColor text-center flex items-center justify-center h-[42px] md:h-[42px] rounded-lg  md:w-[80px] text-[12px] md:text-[14px] font-AeonikProRegular "
                    type="time"
                    min="00:00"
                    max="23:59"
                    name="startTime"
                    pattern="[0-2][0-9]:[0-5][0-9]"
                    value={state?.workTimeFrom || "09:00"}
                    onChange={(e) =>
                      setState({ ...state, workTimeFrom: e.target.value })
                    }
                    required
                  />
                  {state?.errorGroup?.work_time_from &&
                    !state?.workTimeFrom && (
                      <p className="text-[#D50000] text-[12px] w-full">
                        {state?.errorGroup?.work_time_from}
                      </p>
                    )}
                </div>
                <span className="w-fit text-[12px] md:text-base flex items-center ">
                  до
                </span>
                <div className="flex flex-col items-center  h-[42px]">
                  <input
                    className="without_ampm w-[70%] md:w-[80px] xs:w-[40%] h-[42px] md:h-[42px] mr-5 ml-[5px] outline-none border border-borderColor text-center flex items-center justify-center rounded-lg text-[12px] md:text-[14px] font-AeonikProRegular "
                    type="time"
                    min="00:00"
                    max="23:59"
                    name="endTime"
                    pattern="[0-2][0-9]:[0-5][0-9]"
                    value={state?.workTimeTo || "18:00"}
                    onChange={(e) =>
                      setState({ ...state, workTimeTo: e.target.value })
                    }
                    required
                  />
                  {state?.errorGroup?.work_time_to && !state?.workTimeTo && (
                    <p className="text-[#D50000] text-[12px]   w-full ">
                      {state?.errorGroup?.work_time_to}
                    </p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="flex justify-center mt-[50px]  px-4 md:px-0">
          <button
            onClick={LocationAddSubmit}
            className="w-full md:w-fit h-[42px] flex items-center justify-center md:px-[100px]  bg-weatherWinterColor text-white rounded md:rounded-lg active:scale-95"
          // to={"/store"}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
}
// export default React.memo(AddLocation);
