import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import {
  ArrowTopIcons,
  GoBackIcons,
  MenuCloseIcons,
  SearchIcon,
  StarLabel,
  MapLocationIcon,
} from "../../../../assets/icons";
import { Aligarx } from "../../../../assets";
import { message } from "antd";
import { AiOutlineLeft } from "react-icons/ai";
import LocationOfYandex from "./LocationOfYandex/LocationOfYandex.js";
import RegionListOfLocation from "./Modal/RegionListOfLocation";
import { useMutation, useQuery } from "@tanstack/react-query";
import InputMask from "react-input-mask";
import {
  YMaps,
  Map,
  ZoomControl,
  GeolocationControl,

} from "react-yandex-maps";

import { BiCheckDouble } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { clsx } from "clsx";
// import "./LocationOfYandex.css";
import './LocationOfYandex/LocationOfYandex.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function LocationMapCity() {
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
    getRegionList: "",
    //------forImg
    pictureBgFile1: "",
    pictureBgView1: "",
    picturelogoFile2: "",
    picturelogoView2: "",
    pictureLastFile3: "",
    pictureLastView3: "",
    // ----

  })
  const handleLocationImageOne = (e) => {
    setState({
      ...state,
      pictureBgFile1: e.target.files[0],
      pictureBgView1: URL.createObjectURL(e.target.files[0])
    });
  }
  const handleLocationImageTwo = (e) => {
    setState({
      ...state,
      picturelogoFile2: e.target.files[0],
      picturelogoView2: URL.createObjectURL(e.target.files[0])
    });
  }
  const handleLocationImageThree = (e) => {
    setState({
      ...state,
      pictureLastFile3: e.target.files[0],
      pictureLastView3: URL.createObjectURL(e.target.files[0])
    });
  }


  const [isSendedLocation, setIsSendedLocation] = useState(true);
  const [forMaps, setForMaps] = useState({
    title: "",
    center: [],
    zoom: 12,
  });
  const { id } = useParams();
  const NewId = id.replace(":", "");

  const navigate = useNavigate();

  const [storeLocation, setStoreLocation] = useState("")
  const [storeLocationById, setStoreLocationById] = useState("")
  const url = "https://api.dressme.uz/api/seller"

  // // ------------GET  Has Magazin ?-----------shops/locations/:id------
  const { mutate } = useMutation(() => {
    return fetch(`${url}/shops/locations/${NewId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,

      },
    }).then((res) => res.json());
  });

  const onLocaTionDelete = () => {
    mutate({}, {
      onSuccess: res => {
        console.log(res, "location delte");
        toast.warn(`${res?.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // if (res?.message) {
        //   navigate("/locations-store")
        // }
      },
      onError: err => {

      }
    })
  }

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
        // console.log(res, "magazin yes");
      },
      onError: (err) => {
        // console.log(err, "err magazin");
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
          idWorkTimeFrom: res?.location?.work_time_from,
          idWorkTimeTo: res?.location?.work_time_to,
          // -
          idAssistantPhoneCode: res?.location?.second_assistant_phone && res?.location?.second_assistant_phone?.slice(0, 3),
          idAssistantPhone: res?.location?.second_assistant_phone && res?.location?.second_assistant_phone?.slice(3, 12),
          // -
          idSecondAssistantPhoneCode: res?.location?.second_assistant_phone && res?.location?.second_assistant_phone?.slice(0, 3),
          idSecondAssistantPhone: res?.location?.second_assistant_phone && res?.location?.second_assistant_phone?.slice(3, 12),
          // --------ForImg
          pictureBgView1: res?.location?.url_image_path_one,
          picturelogoView2: res?.location?.url_image_path_two,
          pictureLastView3: res?.location?.url_image_path_three,
          // -----------
          // title: res?.location?.address,
          // center: [parseFloat(res?.location?.latitude), parseFloat(res?.location?.longitude)]

        })
        // console.log(res?.location?.address, "title: res?.location?.address,");
        // console.log(parseFloat(res?.location?.longitude), " parseFloat(res?.location?.longitude),");
        // console.log(parseFloat(res?.location?.latitude), " parseFloat(res?.location?.latitude),");

        setForMaps({
          ...forMaps,
          title: res?.location?.address,
          center: [parseFloat(res?.location?.longitude?.slice(0, 9)), parseFloat(res?.location?.latitude?.slice(0, 9))]
        })

        setStoreLocationById(res)
      },
      onError: (err) => {
      },
      keepPreviousData: true, // bu browserdan tashqariga chiqib yana kirsa, yana yurishni oldini olish uchun
      refetchOnWindowFocus: false, // bu ham focus bolgan vaqti malumot olib kelish
    }
  )
  // ------------GET METHOD Region-----------------

  useQuery(["getRegionList-map-ity"], () => {
    return fetch(`${url}/regions`).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        setState({ ...state, getRegionList: res, })
      },
      onError: (err) => {
        // console.log(err, "err get region");
      },
      keepPreviousData: true, // bu browserdan tashqariga chiqib yana kirsa, yana yurishni oldini olish uchun
      refetchOnWindowFocus: false, // bu ham focus bolgan vaqti malumot olib kelish
    }
  )

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  // console.log(state?.getRegionList, "getRegionList");

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
  console.log(forMaps?.center, "formaps.Center");

  // -------------------------------------------Maps---------------------------------
  const mapOptions = {
    modules: ["geocode", "SuggestView"],
    defaultOptions: { suppressMapOpenBlock: true },
  };

  const [mapConstructor, setMapConstructor] = useState(null);
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  // const initialState = {
  //   title: "",
  //   center: [49.444444, 69.555555],
  //   zoom: 12,
  // };
  // console.log(initialState, "center.initialState");
  // console.log(state?.center, "center");
  // console.log(state?.title, "title");
  // submits length
  const handleSubmit = () => {

    setForMaps({
      ...forMaps,
      title: forMaps?.title,
      center: [mapRef.current.getCenter()[0], mapRef.current.getCenter()[1]]
    })

    setIsSendedLocation(false);
  };
  // reset state & search
  const handleReset = () => {
    setForMaps({ ...forMaps, title: "" });
    searchRef.current.value = "";

  };

  // search popup
  useEffect(() => {

    if (mapConstructor) {
      new mapConstructor.SuggestView(searchRef.current).events.add(
        "select",
        function (e) {
          const selectedName = e.get("item").value;
          mapConstructor.geocode(selectedName).then((result) => {
            const newCoords = result.geoObjects
              .get(0)
              .geometry.getCoordinates();
            setForMaps((prevState) => ({ ...prevState, center: newCoords }));
          });
        }
      );
    }
  }, [mapConstructor]);

  // change title
  const handleBoundsChange = (e) => {
    setIsSendedLocation(true);

    const newCoords = mapRef.current.getCenter();
    mapConstructor.geocode(newCoords).then((res) => {
      const nearest = res.geoObjects.get(0);
      const foundAddress = nearest.properties.get("text");
      const [centerX, centerY] = nearest.geometry.getCoordinates();
      const [initialCenterX, initialCenterY] = forMaps.center;
      if (centerX !== initialCenterX && centerY !== initialCenterY) {
        setForMaps((prevState) => ({ ...prevState, title: foundAddress }));
      }
    });
  };

  // -------------------------------------------Maps---------------------------------
  const handleEditLocation = () => {
    let form = new FormData()
    form.append("address", forMaps?.title);
    form.append("longitude", forMaps?.center[0]);
    form.append("latitude", forMaps?.center[1]);
    form.append("shop_id", state?.idShopId);
    form.append("region_id", state?.idRegionId);
    form.append("sub_region_id", state?.idSupRregionId);
    form.append("work_time_from", state?.idWorkTimeFrom);
    form.append("work_time_to", state?.idWorkTimeTo);
    form.append("assistant_name", state?.idAssistantName);
    form.append("assistant_phone", state?.idAssistantPhone);
    state?.pictureBgFile1 && form.append("shop_photo_one", state?.pictureBgFile1);
    state?.picturelogoFile2 && form.append("shop_photo_two", state?.picturelogoFile2);
    state?.pictureLastFile3 && form.append("shop_photo_three", state?.pictureLastFile3);

    return fetch(`${url}/shops/locations/edit/${NewId}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('DressmeUserToken')}`,
      },
      body: form
    })
      .then((res) => res.json())
      .then(res => {
        console.log(res, "editL=City");
        if (res?.message) {
          toast.success(`Успешно обновлено!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate('/locations-store')

        }

      })
      .catch(err => console.log(err, "errImage"))
  }


  return (
    <div className="w-full">
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
              Редактировать местоположения
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
                onClick={onLocaTionDelete}
                className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[12px] xs:text-sm not-italic font-AeonikProRegular xs:font-AeonikProMedium"
              >
                Удалить
              </button>
            </div>
          </div>
          {/* Location of Maps edit page */}
          <div className="h-[400px]">
            <div className={`w-full `}>
              <div className={"mapRoot"}>
                <YMaps
                  query={{
                    apikey: "8b56a857-f05f-4dc6-a91b-bc58f302ff21",
                    lang: "uz",
                  }}
                >
                  <Map
                    className={` overflow-hidden w-full h-full`}
                    {...mapOptions}
                    state={{
                      center: forMaps?.center,
                      zoom: forMaps?.zoom,
                      title: forMaps?.title
                    }}
                    // defaultState={forMaps}
                    onLoad={setMapConstructor}
                    onBoundsChange={handleBoundsChange}
                    instanceRef={mapRef}
                  >
                    <div className="h-fit p-1 md:p-[10px] absolute top-2 z-40 gap-x-5 mx-1 md:mx-2 backdrop-blur-sm bg-yandexNavbar left-0 right-0 flex items-center justify-between border px-1 md:px-3 rounded-lg">
                      <label
                        htmlFor="ForSearch"
                        className="w-[100%] h-full flex items-center justify-between bg-white  border border-textLightColor px-1 md:px-3 rounded-lg"
                      >
                        <input
                          ref={searchRef}
                          placeholder="Введите адрес"
                          id="ForSearch"
                          className={`w-full outline-none text-sm font-AeonikProMedium mr-3 h-10  rounded-lg ${!Boolean(forMaps.title.length) ? "" : "hidden"
                            }`}
                        />

                        <div
                          className={clsx(["titleBox"], {
                            ["titleBox_show"]: Boolean(forMaps.title.length),
                          })}
                        >
                          <p className=" w-[90%] "> {forMaps.title} </p>
                        </div>


                        {forMaps?.title?.length ? (
                          <button
                            onClick={handleReset}
                            className="cursor-pointer flex items-center h-10 justify-center "
                          >
                            <GrClose className="pointer-events-none" />
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="cursor-pointer flex items-center h-10 justify-center "
                          >
                            <SearchIcon />
                          </button>
                        )}
                      </label>
                      {forMaps?.title?.length ? (
                        <button
                          type="button"
                          className="w-[40px] md:w-[150px] h-10 border cursor-pointer active:scale-95 px-3  flex items-center justify-center bg-textBlueColor text-white rounded-lg text-sm font-AeonikProMedium"
                          onClick={handleSubmit}
                          disabled={Boolean(!forMaps.title.length)}
                        >
                          {isSendedLocation ? (
                            <>
                              {" "}
                              <span className="md:flex hidden">Подтвердить</span>
                              <span className="md:hidden flex">OK</span>
                            </>
                          ) : (
                            <span>
                              <BiCheckDouble size={30} />
                            </span>
                          )}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="w-[40px] md:w-[150px] h-10 px-3  flex items-center justify-center bg-borderColor text-textLightColor rounded-lg text-sm font-AeonikProMedium"
                        >
                          <span className="md:flex hidden">Подтвердить</span>
                          <span className="md:hidden flex">OK</span>{" "}
                        </button>
                      )}
                    </div>

                    <span className={"placemark"}>
                      <MapLocationIcon color="primary" />
                    </span>
                    <ZoomControl
                      options={{
                        float: "right",
                        position: { bottom: 200, right: 10, size: "small" },
                        size: "small",
                      }}
                    />{" "}
                    <GeolocationControl
                      options={{
                        float: "right",
                        position: { bottom: 60, right: 10 },
                        size: "small",
                      }}
                    />
                  </Map>
                </YMaps>
              </div>
            </div>
            {/* <LocationOfYandex
            handleCallback={CallBackYandex}
            lang={state?.idLangitudeById}
            lat={state?.idLatitudeById}
            address={state?.idAddress}
          /> */}
          </div>
          <div className=" px-4 md:px-0  flex mt-[10px] justify-between items-centers gap-x-[5px] ls:gap-x-[10px] md:gap-[25px] mb-[25px] ">
            <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] flex items-center justify-center rounded-lg">
              <button className="h-full w-full border border-searchBgColor rounded-lg overflow-hidden flex items-center justify-center ">
                <label
                  htmlFor="DataImg1"
                  className="h-full w-full  text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-textBlueColor "
                >
                  <input
                    className="hidden"
                    id="DataImg1"
                    type="file"
                    onChange={handleLocationImageOne}
                    accept=" image/*"
                  />
                  {
                    !state?.pictureBgView1 &&
                    <div className="w-fit h-fit flex items-center">
                      <span className="leading-none text-[11px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                        Фото локации
                      </span>
                      <span className=" ml-[2px] md:ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                  }
                  {state?.pictureBgView1 &&
                    <img src={state?.pictureBgView1} alt="backImg" className="w-full h-full object-cover rounded-lg" />}
                </label>
              </button>

            </div>
            <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] flex items-center justify-center rounded-lg">
              <button className="h-full w-full border border-searchBgColor rounded-lg overflow-hidden flex items-center justify-center">
                <label
                  htmlFor="DataImg2"
                  className="h-full w-full text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-textBlueColor "
                >
                  <input
                    className="hidden"
                    id="DataImg2"
                    type="file"
                    onChange={handleLocationImageTwo}
                    accept=" image/*"
                  />
                  {
                    !state?.picturelogoView2 &&
                    <div className="w-fit h-fit flex items-center">
                      <span className="leading-none text-[11px] flex md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                        <span className="hidden md:flex">Второе</span> фото локации
                      </span>
                    </div>
                  }
                  {state?.picturelogoView2 &&
                    <img src={state?.picturelogoView2} alt="backImg" className="w-full h-full object-cover rounded-lg" />}
                </label>
              </button>

            </div>
            <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] flex items-center justify-center rounded-lg">
              <button className="h-full w-full border border-searchBgColor rounded-lg overflow-hidden flex items-center justify-center ">
                <label
                  htmlFor="DataImg3"
                  className="h-full w-full  text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-textBlueColor "
                >
                  <input
                    className="hidden"
                    id="DataImg3"
                    type="file"
                    onChange={handleLocationImageThree}
                    accept=" image/*"
                  />
                  {
                    !state?.pictureLastView3 &&
                    <div className="w-fit h-fit flex items-center">
                      <span className="leading-none text-[11px] flex md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                        <span className="hidden md:flex"> Третье</span> фото локации
                      </span>
                    </div>
                  }
                  {state?.pictureLastView3 &&
                    <img src={state?.pictureLastView3} alt="backImg" className="w-full h-full object-cover rounded-lg" />}
                </label>
              </button>

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
                    min="00:00"
                    max="23:59"
                    pattern="[0-2][0-9]:[0-5][0-9]"
                    value={state?.idWorkTimeFrom}
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
                    value={state?.idWorkTimeTo}
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

              </div>
            </div>
          </div>
          <div className="flex justify-center mt-[50px]  px-4 md:px-0 ">
            <button
              onClick={handleEditLocation}

              className="w-full md:w-fit h-[42px] flex items-center justify-center md:px-[100px]  bg-textBlueColor text-white rounded md:rounded-lg active:scale-95"
            >
              Cохранит
            </button>
          </div>
        </div>

      </div >
    </div >
  );
}
// export default LocationMapCity;
// export default React.memo(LocationMapCity);
