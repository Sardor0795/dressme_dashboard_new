import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import {
  ArrowTopIcons,
  GoBackIcons,
  MenuCloseIcons,
  SearchIcon,
  StarLabel,
  TelIcon,
} from "../../../../assets/icons";
import { Aligarx } from "../../../../assets";
import { message } from "antd";
import { AiOutlineLeft } from "react-icons/ai";
import { DatePicker, Space } from "antd";
import LocationOfYandex from "./LocationOfYandex/LocationOfYandex.js";
import RegionListOfLocation from "./Modal/RegionListOfLocation";
import { useQuery } from "@tanstack/react-query";
import InputMask from "react-input-mask";

const { RangePicker } = DatePicker;

function LocationMapCity() {
  const [state, setState] = useState({
    idAddress: "",
    idAssistantMessenger: "",
    idAssistantName: "",
    idAssistantPhone: "",
    idAssistantPhoneCode: "",
    idSecondAssistantMessegner: "",
    idSecondAssistantName: "",
    idSecondAssistantPhone: "",
    idSecondAssistantPhoneCode: "",
    idLangitudeById: "",
    idLatitudeById: "",
    idAssistantName: "",
    idShopId: "",
    idRegionId: "",
    idSupRregionId: "",
    idImageOne: "",
    idImageTwo: "",
    idImageThree: "",
    idWorkTimeFrom: "",
    idWorkTimeTo: "",
    // ---------------
    getRegionList: ""
  })
  const { id } = useParams();
  const NewId = id.replace(":", "");
  // console.log(NewId, "NewId-locationMapCity");

  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const [storeLocation, setStoreLocation] = useState("")
  const [storeLocationById, setStoreLocationById] = useState("")
  // const url = "https://api.dressme.uz/api/seller"
  // const pathname = window.location.pathname;

  let LocationMapId = pathname.replace("/locations-store/city/:", "");
  // // ------------GET  Has Magazin ?-----------------
  const { isLoading } = useQuery(["store-location"], () => {
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
        setStoreLocation(res)
        console.log(res, "magazin yes");
      },
      onError: (err) => {
        console.log(err, "err magazin");
      },
    }
  )
  // // ------------GET  location id?-----------------
  useQuery(["store-location-id"], () => {
    return fetch(`${url}/shops/locations/${NewId}`, {
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
        setState({
          ...state,
          idAddress: res?.location?.address,
          idAssistantMessenger: res?.location?.assistant_messenger,
          idAssistantName: res?.location?.assistant_name,
          // assistantPhone: res?.location?.assistant_phone,
          idSecondAssistantMessegner: res?.location?.second_assistant_messenger,
          idSecondAssistantName: res?.location?.second_assistant_name,
          idLecondAssistantPhone: res?.location?.second_assistant_phone,
          idLangitudeById: res?.location?.latitude,
          idLatitudeById: res?.location?.longitude,
          idShopId: res?.location?.shop_id,
          idRegionId: res?.location?.region_id,
          idSupRregionId: res?.location?.sub_region_id,
          idImageOne: res?.location?.url_image_path_one,
          idImageTwo: res?.location?.url_image_path_two,
          idImageThree: res?.location?.url_image_path_three,
          idWorkTimeFrom: res?.location?.work_time_from,
          idWorkTimeTo: res?.location?.work_time_to,
          // -
          idAssistantPhoneCode: res?.location?.assistant_phone && res?.location?.assistant_phone?.slice(0, 3),
          idAssistantPhone: res?.location?.assistant_phone && res?.location?.assistant_phone?.slice(3, 12),
          // -
          idSecondAssistantPhoneCode: res?.location?.second_assistant_phone && res?.location?.second_assistant_phone?.slice(0, 3),
          idSecondAssistantPhone: res?.location?.second_assistant_phone && res?.location?.second_assistant_phone?.slice(3, 12),
        })
        setStoreLocationById(res)
        console.log(res, "magazin location id show");
      },
      onError: (err) => {
        console.log(err, "err magazin location id show");
      },
    }
  )

  // ------------GET METHOD Region-----------------

  useQuery(["getRegionList"], () => {
    return fetch(`${url}/regions`).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        setState({ ...state, getRegionList: res, })
      },
      onError: (err) => {
        console.log(err, "err get region");
      },
      keepPreviousData: true, // bu browserdan tashqariga chiqib yana kirsa, yana yurishni oldini olish uchun
      refetchOnWindowFocus: false, // bu ham focus bolgan vaqti malumot olib kelish
    }
  )

  const success2 = () => {
    messageApi.open({
      type: "success",
      content: "Удалить",
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  console.log(state?.idImageOne, "idImageOne");
  console.log(state?.idWorkTimeTo);

  const [openRegionList, setOpenRegionList] = useState(false);
  // const RegionToggle = React.useCallback(() => setOpenRegionList(false), []);
  const [activeIndex, setActiveIndex] = useState();
  const accordionCityList = (id) => {
    if (activeIndex == id) {
      setActiveIndex(0)
    } else {
      setActiveIndex(id)
    }
  }
  return (
    <div className="w-full">
      {/* <div className="">
        <section
          onClick={() => setOpenRegionList(false)}
          className={`fixed inset-0 z-[10000]  duration-200 w-full h-[100vh] bg-black opacity-50 
          ${openRegionList ? "" : "hidden"
            }`}
        ></section>
        <section
          className={`max-w-[440px] w-full h-fit mx-auto fixed z-[10001] left-0 right-0  duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${openRegionList ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
            }`}
        >
          {openRegionList &&
            <RegionListOfLocation onClick={RegionToggle} />
          }
        </section>
      </div> */}
      <div className="w-full max-w-[920px] mx-auto mt-6 md:mt-12 mb-[30px]">

        <div className="my-4 ">
          <div className="flex items-center justify-center mb-6">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="  md:hidden absolute left-2 flex items-center cursor-pointer justify-center "
            >
              <GoBackIcons />
            </button>
            <div className="text-center text-xl md:text-[35px] font-AeonikProMedium md:px-0">
              {NewId}
            </div>
          </div>
          <div className=" px-4 md:px-0 w-full flex items-center justify-end md:justify-between mb-2 md:mb-3 md:pb-0 pb-[8px] md:border-0 border-b border-borderColor">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="md:w-8 md:h-8 w-6 h-6 hidden md:flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
            >
              <AiOutlineLeft />
            </button>
            <div className="flex items-center gap-x-[8px] xs:gap-x-[15px]">
              <NavLink
                to="/store/market-add"
                className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[12px] xs:text-sm not-italic font-AeonikProRegular xs:font-AeonikProMedium"
              >
                Одежда{" "}
              </NavLink>
              <span className="w-[2px] h-[12px] xs:h-[14px] bg-borderColor"></span>
              <button
                onClick={success2}
                className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[12px] xs:text-sm not-italic font-AeonikProRegular xs:font-AeonikProMedium"
              >
                Удалить
              </button>
            </div>
          </div>
          <div className="h-[400px]">
            <LocationOfYandex />
          </div>
          <div className=" px-4 md:px-0  flex mt-[10px] justify-between items-centers gap-x-[5px] ls:gap-x-[10px] md:gap-[25px] mb-[25px] ">
            <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] flex items-center justify-center rounded-lg">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={state?.idImageOne}
                alt=""
              />
            </div>
            <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] flex items-center justify-center rounded-lg">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={state?.idImageTwo}
                alt=""
              />
            </div>
            <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] flex items-center justify-center rounded-lg">
              <img
                className="w-full h-full object-cover rounded-lg"
                src={state?.idImageThree}
                alt=""
              />
            </div>
          </div>
          <div className="w-full  px-4 md:px-0  ">
            <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 ">
              <label className="w-full md:w-[31%] xs:w-[48%]   ">
                <div className="w-full text-[12px] md:text-base flex items-center mb-[10px]">
                  Имя администратора{" "}
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </div>
                <div className="flex items-center border border-borderColor h-[32px] md:h-[45px] rounded md:rounded-lg w-full md:max-w-[287px] text-base font-AeonikProMedium">
                  <input
                    type="text"
                    name="fname"
                    value={state?.idAssistantName}
                    onChange={(e) => setState({ ...state, idAssistantName: e.target.value })}
                    placeholder=" Имя администратора"
                    className="w-full outline-none text-[12px] md:text-[14px] font-AeonikProRegular px-2"
                  />
                </div>
              </label>
              <label className="w-full md:w-[31%] xs:w-[48%]  ">
                <div className="w-full text-[12px] md:text-base flex items-center mb-[10px]">
                  Имя второго администратора{" "}
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </div>
                <div className="w-full flex items-center border border-borderColor h-[32px] md:h-[45px] rounded md:rounded-lg md:max-w-[287px] text-base font-AeonikProMedium">
                  <input
                    type="text"
                    name="fname"
                    value={state?.idSecondAssistantName}
                    onChange={(e) => setState({ ...state, idSecondAssistantName: e.target.value })}
                    placeholder=" Имя администратора"
                    className="w-full outline-none text-[12px] md:text-[14px] font-AeonikProRegular px-2 "
                  />
                </div>
              </label>
              <div className="w-full md:w-[31%] xs:w-[48%]  ">
                <div className="text-[12px] md:text-base flex items-center mb-1 md:mb-[10px]">
                  Рабочее время
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </div>
                <div className="w-full flex  items-center">
                  {" "}
                  <span className="w-fit text-[12px] md:text-base flex items-center ">
                    от
                  </span>
                  <input
                    className="without_ampm mr-5 ml-[5px]  outline-none w-[45%] xs:w-[40%] border border-borderColor text-center flex items-center justify-center h-[32px] md:h-[45px] rounded md:rounded-lg  md:w-[80px] text-[12px] md:text-[14px] font-AeonikProRegular "
                    type="time"
                    step="3600"
                    min="00:00"
                    max="23:59"
                    pattern="[0-2][0-9]:[0-5][0-9]"
                    value={0 + state?.idWorkTimeFrom || "09:00"}
                    onChange={(e) => setState({ ...state, idWorkTimeFrom: e.target.value })}
                    required />

                  <span className="w-fit text-[12px] md:text-base flex items-center ">
                    до
                  </span>
                  <input
                    className="without_ampm mr-5 ml-[5px]  outline-none w-[45%] xs:w-[40%] border border-borderColor text-center flex items-center justify-center h-[32px] md:h-[45px] rounded md:rounded-lg  md:w-[80px] text-[12px] md:text-[14px] font-AeonikProRegular "
                    type="time"
                    min="00:00"
                    max="23:59"
                    pattern="[0-2][0-9]:[0-5][0-9]"
                    value={state?.idWorkTimeTo || "19:00"}
                    onChange={(e) => setState({ ...state, idWorkTimeTo: e.target.value })}
                    required />

                </div>

              </div>
              <label className="w-full md:w-[31%] xs:w-[48%]   ">
                <div className="text-[12px] md:text-base flex items-center mb-[10px]">
                  Номер администратора
                  <span className="ml-[5px]">{/* <StarLabel /> */}</span>
                </div>
                <div className="mt-[6px] flex items-center justify-center overflow-hidden border border-searchBgColor rounded-lg">
                  <div className="ss:w-[35%] md:w-[30%] h-[42px] flex items-center justify-center  cursor-pointer border-r border-searchBgColor overflow-hidden">
                    <input
                      className="w-[40px] outline-none h-full select-none mx-2 not-italic font-AeonikProRegular text-base leading-4 text-black"
                      type="text"
                      value={"+" + state?.idAssistantPhoneCode || ""}
                      // readOnly
                      placeholder="998"
                    />
                  </div>
                  <div className="ss:w-[65%] md:w-[70%] h-[42px] overflow-hidden">
                    <InputMask
                      mask="(99) 999-99-99"
                      name="phone"
                      value={state?.idAssistantPhone || null}
                      onChange={(e) => setState({ ...state, idAssistantPhone: e.target.value })}
                      className={`w-full px-4 outline-none font-AeonikProRegular h-full not-italic ${state?.idAssistantPhone ? "font-AeonikProMedium" : null
                        } text-base leading-4 text-black`}
                      placeholder={"(99) 999-99-99"}
                    ></InputMask>
                  </div>
                </div>

              </label>
              <label className="w-full md:w-[31%] xs:w-[48%]  ">
                <div className="text-[12px] md:text-base flex items-center mb-[10px]">
                  Номер второго администратора{" "}
                  <span className="ml-[5px]">{/* <StarLabel /> */}</span>
                </div>

                <div className="mt-[6px] flex items-center justify-center overflow-hidden border border-searchBgColor rounded-lg">
                  <div className="ss:w-[35%] md:w-[30%] h-[42px] flex items-center justify-center  cursor-pointer border-r border-searchBgColor overflow-hidden">
                    <input
                      className="w-[40px] outline-none h-full select-none mx-2 not-italic font-AeonikProRegular text-base leading-4 text-black"
                      type="text"
                      value={"+" + state?.idSecondAssistantPhoneCode || ""}
                      // readOnly
                      placeholder="998"
                    />
                  </div>
                  <div className="ss:w-[65%] md:w-[70%] h-[42px] overflow-hidden">
                    <InputMask
                      mask="(99) 999-99-99"
                      name="phone"
                      value={state?.idSecondAssistantPhone || null}
                      onChange={(e) => setState({ ...state, idSecondAssistantPhone: e.target.value })}
                      className={`w-full px-4 outline-none font-AeonikProRegular h-full not-italic ${state?.idSecondAssistantPhone ? "font-AeonikProMedium" : null
                        } text-base leading-4 text-black`}
                      placeholder={"(99) 999-99-99"}
                    ></InputMask>
                  </div>
                </div>
              </label>
              <div className="w-full md:w-[31%] xs:w-[48%]   ">
                <div className="w-full h-fit flex justify-center ">
                  <div className={` max-w-[600px] h-fit fixed    px-3 md:px-6  py-2 md:py-4 bg-white rounded-b-none md:rounded-b-lg	 rounded-t-lg  mx-auto w-full duration-500 z-[113] md:top-[50%] md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] overflow-hidden ${openRegionList ? " bottom-0 md:flex flex-col" : "md:hidden bottom-[-1500px] z-[-10]"}`} >
                    <div className="w-full flex items-center justify-between  ">
                      <span className="text-black text-xl md:text-2xl not-italic font-AeonikProRegular">Выберите регион</span>
                      <span
                        className="select-none cursor-pointer"

                        onClick={() => setOpenRegionList(false)}

                      >
                        <MenuCloseIcons colors="#000" /></span>
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
                                  className={`${activeIndex == data?.id ? "rotate-[0deg]" : "rotate-[180deg]"} `}
                                >
                                  <ArrowTopIcons colors={"#a1a1a1"} />
                                </span>
                              </div>

                              <div
                                className={`w-full grid grid-cols-2 xs:grid-cols-3 duration-[400ms]
                             ${activeIndex == data?.id ? "openAccardion" : "CloseAccardion"} `}
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
                                          name="type_work"
                                          value={item?.region_id}
                                          checked={state?.idSupRregionId == item?.id}
                                          className="border border-borderColor  cursor-pointer  flex items-center justify-center"
                                          onChange={(e) => {
                                            setState({ ...state, idRegionId: e.target.value, idSupRregionId: item?.id })
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
                      <span
                        onClick={() => setOpenRegionList(false)}
                        className="cursor-pointer text-textBlueColor text-lg not-italic font-AeonikProMedium">Готово</span>
                    </div>
                  </div>

                  {/* Region INput  */}
                  <div className={"w-full"}>
                    <label htmlFor="" >
                      <span className="flex items-center text-[#303030] text-base not-italic font-AeonikProRegular leading-4 tracking-[0,16px] ">
                        Выберите регион
                      </span>
                      <div

                        onClick={() => setOpenRegionList(true)}
                        className="w-full h-[42px] mt-[6px] px-[15px] flex items-center justify-between rounded-lg cursor-pointer border border-searchBgColor">
                        <span className=" w-full h-[42px] flex items-center not-italic font-AeonikProRegular text-[#B5B5B5] ll:text-[14px] sm:text-[16px] text-base leading-4 ">
                          {!state?.idRegionId && !state?.idSupRregionId && "Выберите регион"}

                          {state?.getRegionList?.regions?.filter(e => e.id == state?.idRegionId).map(item => {
                            return <span className="flex items-center text-[#000] text-[14px] sm:text-base">
                              {item?.name_ru},
                              {item?.sub_regions?.filter(i => i.id == state?.idSupRregionId).map(item => {
                                return <span className="ml-1">{item?.name_ru}</span>
                              })}
                            </span>
                          })
                          }
                        </span>
                        <span className="rotate-[180deg]"><ArrowTopIcons colors={"#a1a1a1"} /></span>
                      </div>


                    </label>
                  </div>
                </div>
                {/* <div className="w-full">
                  <div className="text-[12px] md:text-[14px] font-AeonikProRegular flex items-center mb-[10px]">
                    Выберите регион
                    <span className="ml-[5px]">
                      <StarLabel />
                    </span>
                  </div>
                  <div onClick={() => setOpenRegionList(true)} className="flex items-center justify-between px-3 cursor-pointer border border-borderColor h-[32px] md:h-[45px] rounded md:rounded-lg w-full md:max-w-[287px] text-base font-AeonikProMedium">
                    <span className="text-[#8C8C8C] text-[12px] md:text-[14px] font-AeonikProRegular ">
                      Выберите регион
                    </span>
                    <span className="rotate-[90deg]">
                      <ArrowTopIcons colors={"#A4A4A4"} />
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-[50px]  px-4 md:px-0 ">
            <Link
              className="w-full md:w-fit h-[42px] flex items-center justify-center md:px-[100px]  bg-textBlueColor text-white rounded md:rounded-lg active:scale-95"
            // to={"/store"}
            >
              Добавить
            </Link>
          </div>
        </div>

      </div >
    </div >
  );
}
export default React.memo(LocationMapCity);
