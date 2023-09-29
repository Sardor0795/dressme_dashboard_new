import React, { useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import {
  ArrowRightIcon,
  ArrowTopIcons,
  CircleNextIcon,
  CreditCardNumber,
  DeleteIcon,
  MenuCloseIcons,
  UserMailIcon,
} from "../../../../assets/icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { dressMainData } from "../../../../hook/ContextTeam";
import { NavLink } from "react-router-dom";
import MobileHumburgerMenu from "../../../Navbar/mobileHamburgerMenu/MobileMenu";
import EditPassword from "./EditPassword/EditPassword";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Select } from "antd";



const EditProfilePage = () => {


  const [phone, setPhone] = useState("");
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cardNumber: "",
    password: "",
    sellerTypeId: "",
    selectSellerType: "",
    regionId: "",
    subRegionId: "",
    phoneCode: "+",
    phoneNum: "",
    //----

    validateConfirm: true,
    eyesShow: true,
    requestPerson: true,
    // ------Regions Get -----
    getRegionList: "",
    // ------ Get Profile-----
    getProfileList: "",
    // ------ Get getSellerList-----
    getSellerList: "",
    // -----region Modal-----
    openModalRegions: false,
    // ----popConfirmDelete
    popConfirmDelete: false,
  });

  // ----------Card Number-----------
  const card1 = state?.cardNumber?.split("-")
  const BankCard = card1.join("")


  // let data = phone.split("-");
  // let arr = data.join("");
  // let data1 = arr.split("(");
  // let arr1 = data1.join("");
  // let arr2 = arr1.split(")");
  // let data2 = arr2.join("");
  // let arr3 = state.phoneCode.split("+");
  // let data3 = arr3.join("");
  // const sendMessageget = data3 + data2;

  const [openEditModal, setOpenEditModal] = useState(false);

  // -------------------------------------
  const togglePassword = React.useCallback(() => setOpenEditModal(false), []);
  // -------------------------------------

  const url = "https://api.dressme.uz/api/seller"
  // ------------GET METHOD Region-----------------

  const { isLoading } = useQuery(["get region"], () => {
    return fetch(`${url}/regions`).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        setState({ ...state, getRegionList: res, })
      },
      onError: (err) => {
        console.log(err, "err");
      },
      keepPreviousData: true, // bu browserdan tashqariga chiqib yana kirsa, yana yurishni oldini olish uchun
      refetchOnWindowFocus: false, // bu ham focus bolgan vaqti malumot olib kelish
    }
  )

  // ------------GET METHOD seller-types-----------------
  const { isFetching } = useQuery(["get seller-type"], () => {
    return fetch(`${url}/seller-types`).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        setState({ ...state, getSellerList: res, })


      },
      onError: (err) => {
        console.log(err, "err");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
  console.log(state?.selectSellerType, "selectSellerType");
  console.log(state?.sellerTypeId, "sellerTypeId");

  const changeTip = () => {
    state?.getSellerList?.individual?.forEach(e => {
      if (e?.id == state?.sellerTypeId)
        setState({ ...state, selectSellerType: e?.name_ru })
    })
  }
  // ------------GET METHOD Profile-----------------

  useQuery(["get profile"], () => {
    return fetch(`${url}/profile`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },

    }).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        console.log(res, "res");
        setState({
          ...state, getProfileList: res,
          firstName: res.name,
          lastName: res.surname,
          email: res?.email,
          cardNumber: res?.card_number,
          regionId: res?.region_id,
          subRegionId: res?.sub_region_id,
          sellerTypeId: res?.seller_type_id,
          phoneCode: res?.phone.slice(0, 3),
          phoneNum: res?.phone.slice(3, 12),

        })
      },
      onError: (err) => {
        console.log(err, "err");
      },

      keepPreviousData: true, // bu browserdan tashqariga chiqib yana kirsa, yana yurishni oldini olish uchun
      refetchOnWindowFocus: false, // bu ham focus bolgan vaqti malumot olib kelish
    }
  )
  console.log(localStorage.getItem("DressmeUserToken"), "localStorage.getItem")
  console.log(state?.getProfileList, "DressmeUserToken")


  //  selectSellerType: res?.individual.filter(e => e.id == sellerTypeId)?.map(item)=> { return { item?.name_ru } } 
  // state?.getSellerList?.individual?.forEach(e => {
  //   if (e?.id == state?.sellerTypeId)
  //     setState({ ...state, selectSellerType: e?.name_ru })
  // })
  // ----------phone Number----------
  // let codeNum = state?.getphoneNumber.slice(0, 3)
  // let phoneNum1 = state?.getphoneNumber.slice(3, 12)
  // state?.phoneCode(codeNum)
  // state?.phoneNum(phoneNum1)
  // console.log(codeNum, ":codeNuykm");
  // console.log(phoneNum, ":phoneNum");

  // -----------------------Seller Delete---------------
  const { mutate } = useMutation(() => {
    return fetch(`${url}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,

      },
      body: JSON.stringify({ email: "murodillaxayitov@gmail.com", password: "00000000" }),
    }).then((res) => res.json());
  });

  const onUserDelete = () => {
    setState({ ...state, popConfirmDelete: false })
    mutate({}, {
      onSuccess: res => {
        console.log(res, "userDelete");
      },
      onError: err => {

      }
    })
  }
  const [activeIndex, setActiveIndex] = useState();
  const accordionCityList = (id) => {
    if (activeIndex == id) {
      setActiveIndex(0)
    } else {
      setActiveIndex(id)
    }
  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <div className="w-full h-fit md:h-[100vh]  flex flex-col gap-y-4 md:gap-y-[40px] items-center justify-center px-4 md:px-0">
      <div className="w-full flex items-center justify-start md:hidden mt-4">
        <span>
          {" "}
          <MobileHumburgerMenu />
        </span>{" "}
      </div>{" "}
      <div
        onClick={() => {
          setOpenEditModal(false);
          setState({ ...state, popConfirmDelete: false, openModalRegions: false })
          // setState({ ...state, openModalRegions: false })
        }}
        className={`fixed inset-0 z-[112] cursor-pointer duration-200 w-full h-[100vh] bg-black opacity-50
         ${state?.popConfirmDelete || openEditModal || state?.openModalRegions ? "" : "hidden"
          }`}
      ></div>
      {/* Delete Account Of Pop Confirm */}
      <section
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.popConfirmDelete ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
          }`}

      >
        <button
          onClick={() => setState({ ...state, popConfirmDelete: false })}
          type="button"
          className="absolute  right-3 top-3 w-5 h-5 ">
          <MenuCloseIcons
            className="w-full h-full"
            colors={"#a1a1a1"} />
        </button>
        <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
          <span className="w-10 h-10 rounded-full border border-[#FF4747] flex items-center justify-center">
            <span className="cursor-pointer active:translate-y-[2px] text-[#FF4747] transition-colors duration-[0.2s] ease-linear">
              <DeleteIcon width={30} />
            </span>
          </span>
          <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
            Вы уверены?
          </span>
          <span className=" text-[#a2a2a2] text-base xs:text-lg not-italic font-AeonikProMedium text-center">
            Если вы удалите аккаунт все ваши товары и магазины удалятся, если они имеются
          </span>
        </div>
        <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
          <button
            onClick={() => setState({ ...state, popConfirmDelete: false })}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">Oтмена</button>
          <button
            onClick={onUserDelete}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">Удалить</button>
        </div>

      </section>
      {/* ---password change----- */}
      <section
        className={`fixed  max-w-[440px] md:max-w-[550px] mx-auto w-full md:w-auto z-[113] bottom-0 md:bottom-auto  duration-300 overflow-hidden ${openEditModal ? "" : "hidden z-0"
          }`}
      >
        <EditPassword onClick={togglePassword} />
      </section>

      <div className="max-w-[800px] w-full md:text-center flex items-center md:justify-center">
        <span className="text-black text-[16px] md:text-3xl not-italic md:font-AeonikProMedium  font-AeonikProRegular tracking-[1px]">
          Скоро с вами свяжутся, ожидайте одобрения от администраторов{" "}
        </span>
      </div>

      <div className="max-w-[800px] w-full h-fit border border-lightBorderColor flex flex-col gap-y-6 rounded-[12px] p-4 md:p-[30px]">
        {/* title */}
        <div className="w-full flex items-center justify-between ">
          <span className="text-black text-[20px] md:text-2xl not-italic font-AeonikProMedium leading-6">
            Мои данные
          </span>
          <button
            onClick={() => setState({ ...state, popConfirmDelete: true })}
            className="text-redText flex items-center text-[14px] xs:text-base not-italic font-AeonikProRegular leading-5">
            Удалить аккаунт
          </button>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-6 w-full h-fit ">
          {/* Name */}
          <div className="w-full h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Имя{" "}
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className=" outline-none	 w-full h-[42px] placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type="text"
                name="fname"
                placeholder="Имя"
                value={state?.firstName || null}
                onChange={(e) => setState({ ...state, firstName: e.target.value })}
                required
              />
            </div>
          </div>
          {/*  surname */}
          <div className="w-full h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Фамилия{" "}
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className=" outline-none	 w-full h-[42px] placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type="text"
                name="lname"
                placeholder="Фамилия"
                value={state?.lastName || null}
                onChange={(e) => setState({ ...state, lastName: e.target.value })}
                required
              />
            </div>
          </div>
          {/* Имя организации */}
          {
            state?.sellerTypeId >= 3 &&
            <div className="w-full h-fit  ">
              <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
                Имя организации{" "}
              </div>
              <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
                <input
                  className=" outline-none	 w-full h-[42px] placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                  type="text"
                  placeholder="Имя организации"
                  required
                />
              </div>
            </div>}
          {/* Mail */}
          <div className="w-full h-fit  ">
            <div className=" flex items-center justify-between w-full">
              <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
                Электронная почта{" "}
              </div>
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className=" outline-none	 w-full h-[42px] placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type="email"
                name="email"
                placeholder="Адрес электронной почты"
                value={state?.email || null}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                required
              />
              <span>
                <UserMailIcon />
              </span>{" "}
            </div>
          </div>
          {/* Номер */}
          <div className="w-full h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Номер телефона{" "}
            </div>
            <div className="mt-[6px] flex items-center justify-center overflow-hidden border border-searchBgColor rounded-lg">
              <div className="ss:w-[35%] md:w-[30%] h-[42px] flex items-center justify-center  cursor-pointer border-r border-searchBgColor overflow-hidden">
                <input
                  className="w-[40px]  h-full select-none mx-2 not-italic font-AeonikProMedium text-base leading-4 text-black"
                  type="text"
                  value={"+" + state.phoneCode}
                  readOnly
                />
              </div>
              <div className="ss:w-[65%] md:w-[70%] h-[42px] overflow-hidden">
                <InputMask
                  mask="(99) 999-99-99"
                  name="phone"
                  value={state?.phoneNum || null}
                  onChange={(e) => setState({ ...state, phoneNum: e.target.value })}
                  className={`w-full px-4 outline-none h-full not-italic ${state?.phoneNum ? "font-AeonikProMedium" : null
                    } text-base leading-4 text-black`}
                  placeholder={"(97) 123-45-67"}
                ></InputMask>
              </div>
            </div>
          </div>
          {/* Выберите регион, */}
          <div className="w-full h-fit flex justify-center ">
            <div className={` max-w-[600px] h-fit fixed    px-3 md:px-6  py-2 md:py-4 bg-white rounded-b-none md:rounded-b-lg	 rounded-t-lg  mx-auto w-full duration-500 z-[113] md:top-[50%] md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] overflow-hidden ${state?.openModalRegions ? " bottom-0 md:flex flex-col" : "md:hidden bottom-[-1500px] z-[-10]"}`} >
              <div className="w-full flex items-center justify-between  ">
                <span className="text-black text-xl md:text-2xl not-italic font-AeonikProRegular">Выберите регион</span>
                <span
                  className="select-none cursor-pointer"
                  onClick={() => {
                    setState({ ...state, openModalRegions: false });
                  }}
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
                                    checked={state?.sub_region == item?.id}
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
                }} className="cursor-pointer text-textBlueColor text-lg not-italic font-AeonikProMedium">Готово</span>
              </div>
            </div>

            {/* Region INput  */}
            <div className={"w-full"}>
              <label htmlFor="" >
                <span className="flex items-center text-[#303030] text-base not-italic font-AeonikProRegular leading-4 tracking-[0,16px] ">
                  Выберите регион
                </span>
                <div
                  onClick={() => {
                    setState({ ...state, openModalRegions: true });
                  }}
                  className="w-full h-[42px] mt-[6px] px-[15px] flex items-center justify-between rounded-lg cursor-pointer border border-searchBgColor">
                  <span className=" w-full h-[42px] flex items-center not-italic font-AeonikProRegular text-[#B5B5B5] ll:text-[14px] sm:text-[16px] text-base leading-4 ">
                    {!state?.regionId && !state?.subRegionId && "Выберите регион"}

                    {state?.getRegionList?.regions?.filter(e => e.id == state?.regionId).map(item => {
                      return <span className="flex items-center text-[#000] text-[14px] sm:text-base">
                        {item?.name_ru},
                        {item?.sub_regions?.filter(i => i.id == state?.subRegionId).map(item => {
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
          {/* Type */}
          {/* <div className="w-full h-fit  ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Тип{" "}
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className=" outline-none	 w-full h-[42px] placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type="text"
                placeholder="Тип"
                required
              />
            </div>
          </div> */}
          {
            state?.sellerTypeId >= 3 ?

              <div className="select relative w-full flex items-center ">
                <Select
                  className="select flex items-center rounded-lg w-full focus:border border-searchBgColor cursor-pointer"
                  placeholder="Тип предприятия"
                  optionFilterProp="children"
                  onChange={(e) => setState({ ...state, sellerTypeId: e })}
                  suffixIcon={null}
                  size="large"
                  options={
                    state?.getSellerList?.company?.map(item => {
                      return (
                        {
                          value: item?.id,
                          label: item?.name_ru,
                        }
                      )
                    })
                  }
                />
                <span className={`data absolute right-[10px] top- h-full flex items-center select-focus:rotate-[90deg] rotate-[180deg] `}>
                  <ArrowTopIcons colors="#a1a1a1" />
                </span>
              </div>
              :
              // <div className="select relative w-full flex items-center ">
              //   <Select
              //     className="select flex items-center rounded-lg w-full focus:border border-searchBgColor cursor-pointer"
              //     placeholder="Тип предприятия"
              //     onClick={changeTip}
              //     optionFilterProp="children"
              //     onChange={(e) => setState({ ...state, sellerTypeId: e })}
              //     suffixIcon={null}
              //     defaultValue={state?.selectSellerType}
              //     // value={state?.getSellerList?.individual.filter(e => e.id == state?.sellerTypeId).map(item => {
              //     //   return item?.name_ru
              //     // })}
              //     size="large"
              //     options={
              //       state?.getSellerList?.individual?.map(item => {
              //         return (
              //           {
              //             value: item?.id,
              //             label: item?.name_ru,
              //           }
              //         )
              //       })
              //     }
              //   />
              //   <span className={`data absolute right-[10px] top- h-full flex items-center select-focus:rotate-[90deg] rotate-[180deg] `}>
              //     <ArrowTopIcons colors="#a1a1a1" />
              //   </span>
              // </div>
              <div className="w-full h-fit ">
                <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
                  Тип
                </div>
                <div className="relative mt-[6px] flex items-center justify-between ">
                  <select
                    id="changeIcons"
                    // className="text-[#a1a1a1]"
                    className="w-full h-[42px]  outline-none  px-[16px] w-full flex items-center border border-searchBgColor rounded-lg"
                    value={state?.sellerTypeId}
                    onChange={(e) => setState({ ...state, sellerTypeId: e.target.value })}
                    placeholder="Тип предприятия"
                    required
                  >
                    {/* <option value="">Тип предприятия</option> */}
                    {
                      state?.getSellerList?.individual?.map(data => {
                        return (
                          <option key={data.id} value={data.id}> {data.name_ru} </option>
                        )
                      })
                    }

                  </select>
                  <span className={`data absolute right-[10px]  h-full flex items-center select-focus:rotate-[90deg] rotate-[180deg] `}>
                    <ArrowTopIcons colors="#a1a1a1" />
                  </span>
                </div>
              </div>
          }
          {/*  CardNumber */}
          <div className="w-full  h-fit   ">
            <span className="flex items-center text-[#303030] text-base not-italic font-AeonikProRegular  leading-4 tracking-[0,16px] ">
              Номер банковской карты
            </span>
            <div className="mt-[6px] gap-x-[10px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              {/* CredtCardicons */}
              <span><CreditCardNumber /></span>
              <InputMask
                value={state?.cardNumber}
                mask='9999-9999-9999-9999'
                className="outline-none	 w-full h-[42px]  text-black  not-italic font-AeonikProRegular placeholder-text-[#B5B5B5] ll:text-[14px] sm:text-[16px] text-base leading-4"
                onChange={(e) => setState({ ...state, cardNumber: e.target.value })}
                placeholder="0000-0000-0000-0000"
              />
            </div>

          </div>
          {/* EditPassword */}
          <div className="w-full  flex items-center xs:justify-start justify-end xs:mt-5 ">
            <button
              onClick={() => setOpenEditModal(true)}
              className={
                " text-textBlueColor flex items-center text-base not-italic font-AeonikProRegular hover:underline"
              }
            >
              Изменить пароль
            </button>
          </div>
        </div>

        {/* Button */}
        <div className="w-full  flex items-center justify-between gap-x-6 mt-7">
          <button
            className="w-full active:scale-95  active:opacity-70 h-[40px] xs:h-12 rounded-lg flex items-center gap-x-[10px] justify-center bg-weatherWinterColor"
          >
            <span className="text-center text-base text-white not-italic font-AeonikProMedium">
              Сохранить данные
            </span>
            <span>
              <CircleNextIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export { EditProfilePage };
