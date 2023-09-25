import React, { useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import {
  ArrowRightIcon,
  ArrowTopIcons,
  CircleNextIcon,
  CreditCardNumber,
  MenuCloseIcons,
  UserMailIcon,
} from "../../../assets/icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { dressMainData } from "../../../hook/ContextTeam";
import { NavLink } from "react-router-dom";
import MobileHumburgerMenu from "../../Navbar/mobileHamburgerMenu/MobileMenu";
import EditPassword from "./EditPassword/EditPassword";
import { useMutation, useQuery } from "@tanstack/react-query";



const ProfilePage = () => {


  const [phone, setPhone] = useState("");
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phoneCode: "+998",
    email: "",
    password: "",
    eyesShow: true,
    cardNumber: "",
    validateConfirm: true,
    requestPerson: true,
    // ------Regions Get -----
    getRegionList: "",
    // -----region Modal-----
    openModalRegions: false,
    // ----popConfirmDelete
    popConfirmDelete: false,
  });

  // ----------Card Number-----------
  const card1 = state?.cardNumber?.split("-")
  const BankCard = card1.join("")

  // ----------phone Number----------
  let data = phone.split("-");
  let arr = data.join("");
  let data1 = arr.split("(");
  let arr1 = data1.join("");
  let arr2 = arr1.split(")");
  let data2 = arr2.join("");
  let arr3 = state.phoneCode.split("+");
  let data3 = arr3.join("");
  const sendMessagePhoneNumber = data3 + data2;

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
        setState({ ...state, getRegionList: res })
      },
      onError: (err) => {
        console.log(err, "err");
      },
      keepPreviousData: true, // bu browserdan tashqariga chiqib yana kirsa, yana yurishni oldini olish uchun
      refetchOnWindowFocus: false, // bu ham focus bolgan vaqti malumot olib kelish
    }
  )


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
    <div className="w-full h-fit md:h-[100vh]  flex flex-col gap-y-4 md:gap-y-[70px] items-center justify-center px-4 md:px-0">
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
      // className={`absolute mx-auto  max-w-[440px] md:max-w-[550px]  flex-col gap-y-[40px]   px-4 py-5 md:py-[35px] md:px-[50px] h-fit rounded-lg bg-white mx-auto w-full  z-[113]  top-[40%] md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%]  duration-300 overflow-hidden ${state?.popConfirmDelete ? " bottom-0  md:flex" : "md:hidden bottom-[-800px] z-[-10]"
      //   }`}
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
          <span className="w-10 h-10 rounded-full border border-textRedColor flex items-center justify-center">
            <MenuCloseIcons colors={"#d50000"} />
          </span>
          <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
            Вы уверены?
          </span>
          <span className=" text-[#a2a2a2] text-base xs:text-lg not-italic font-AeonikProMedium text-center">
            Если вы удалите аккаунт все ваши товары и магазины удалятся
          </span>
        </div>
        <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
          <button
            onClick={() => setState({ ...state, popConfirmDelete: false })}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">Oтмена</button>
          <button
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-textRedColor  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">Удалить</button>
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
        <div className="w-full flex items-center justify-between">
          <span className="text-black text-[20px] md:text-2xl not-italic font-AeonikProMedium leading-6">
            Мои данные
          </span>
          <button
            onClick={() => setState({ ...state, popConfirmDelete: true })}
            className="text-redText text-lg not-italic font-medium leading-5">
            Удалить аккаунт
          </button>
        </div>
        {/* Name, surname */}
        <div className="w-full  xs:flex-row flex-col flex items-center justify-between gap-x-6 gap-y-4 xs:gap-y-0">
          <div className="w-full xs:w-1/2 h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Имя{" "}
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className=" outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type="text"
                placeholder="Имя"
                required
              />
            </div>
          </div>
          <div className="w-full xs:w-1/2 h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Фамилия{" "}
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className=" outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type="text"
                placeholder="Фамилия"
                required
              />
            </div>
          </div>
        </div>
        {/* Номер, Mail */}
        <div className="w-full  flex  xs:flex-row flex-col items-center justify-between gap-x-6 gap-y-4 xs:gap-y-0">
          {/* Имя организации */}
          <div className="w-full xs:w-1/2 h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Имя организации{" "}
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className=" outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type="text"
                placeholder="Имя организации"
                required
              />
            </div>
          </div>
          {/* Mail */}
          <div className="w-full xs:w-1/2 h-fit ">
            <div className=" flex items-center justify-between w-full">
              <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
                Электронная почта{" "}
              </div>
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className=" outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type="email"
                placeholder="Адрес электронной почты"
                required
              />
              <span>
                <UserMailIcon />
              </span>{" "}
            </div>
          </div>
        </div>



        {/* Выберите регион, surname */}
        <div className="w-full  flex  xs:flex-row flex-col items-center justify-between gap-x-6 gap-y-4 xs:gap-y-0">
          {/* Номер */}
          <div className="w-full xs:w-1/2 h-fit">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Номер телефона{" "}
            </div>
            <div className="mt-[6px] flex items-center justify-center overflow-hidden border border-searchBgColor rounded-lg">
              <div className="ss:w-[35%] md:w-[30%] h-[40px] xs:h-12 flex items-center justify-center  cursor-pointer border-r border-searchBgColor overflow-hidden">
                <input
                  className="w-[40px]  h-full select-none mx-2 not-italic font-AeonikProMedium text-base leading-4 text-black"
                  type="text"
                  value={state.phoneCode}
                  readOnly
                />
              </div>
              <div className="ss:w-[65%] md:w-[70%] h-[40px] xs:h-12 overflow-hidden">
                <InputMask
                  mask="(99) 999-99-99"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-4 outline-none h-full not-italic ${phone ? "font-AeonikProMedium" : null
                    } text-base leading-4 text-black`}
                  placeholder={"(97) 123-45-67"}
                ></InputMask>
              </div>
            </div>
          </div>
          {/* ------------------------------------------------------------------------------------------------------------- */}
          <div className="w-full xs:w-1/2 h-fit flex justify-center">
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
                    {!state?.region && !state?.sub_region && "Выберите регион"}

                    {state?.getRegionList?.regions?.filter(e => e.id == state?.region).map(item => {
                      return <span className="flex items-center text-[#000] text-[14px] sm:text-base">
                        {item?.name_ru},
                        {item?.sub_regions?.filter(i => i.id == state?.sub_region).map(item => {
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
          {/* ------------------------------------------------------------------------------------------------------------- */}

        </div>
        <div className="w-full  flex xs:flex-row flex-col items-center justify-between gap-x-6 gap-y-4 xs:gap-y-0">
          <div className="w-full xs:w-1/2 h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Тип{" "}
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className=" outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type="text"
                placeholder="Тип"
                required
              />
            </div>
          </div>
          <div className="w-full xs:w-1/2 h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Раздел{" "}
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className=" outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type="text"
                placeholder="Раздел"
                required
              />
            </div>
          </div>
        </div>
        {/* Edit Password and CardNumber */}
        <div className="w-full  flex  xs:flex-row flex-col items-center justify-between gap-x-6 gap-y-4 xs:gap-y-0">

          {/* ------------------------------------------------------------------------------------------------------------- */}
          <div className="w-full md:w-1/2 h-fit  ">
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
          <div className="w-full xs:w-1/2  flex items-center justify-end xs:mt-5">
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
export { ProfilePage };
