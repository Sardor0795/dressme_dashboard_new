import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
import {
  ArrowRightIcon,
  CircleNextIcon,
  CreditCardNumber,
  UserMailIcon,
} from "../../../../assets/icons";
import { dressMainData } from "../../../../hook/ContextTeam";
import { useNavigate } from "react-router-dom";
import MobileHumburgerMenu from "../../../Navbar/mobileHamburgerMenu/MobileMenu";
import ModalOfMenu from "./ModalOfMenu/ModalOfMenu";

import EditPassword from "./EditPassword/EditPassword";
import { useMutation, useQuery } from "@tanstack/react-query";

const { REACT_APP_BASE_URL: url } = process.env

const UserProfile = () => {
  const navigate = useNavigate()
  const [dressInfo, setDressInfo] = useContext(dressMainData);

  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "+998",
    region: 1,
    sub_Region: 1,
    cardNumber: "",
    seller_type_id: 1,
    phone: "",
    password: "12233223",
    error: ""

  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  // ------------Card Number---------------------
  const fallbackRef = useRef();
  const domRef = fallbackRef;

  const handleChange = useCallback(() => {
    if (domRef.current) {
      const cardValue = domRef.current.value
        .replace(/\D/g, "")
        .match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
      if (cardValue) {
        domRef.current.value = !cardValue[2]
          ? cardValue[1]
          : `${cardValue[1]}-${cardValue[2]}${`${cardValue[3] ? `-${cardValue[3]}` : ""
          }`}${`${cardValue[4] ? `-${cardValue[4]}` : ""}`}`;
        const numbers = domRef.current.value.replace(/(\D)/g, "");
        setState({ ...state, cardNumber: numbers });
      }
    }
  }, [domRef]);


  // ----------phone Number----------
  let data = state?.phone.split("-");
  let arr = data.join("");
  let data1 = arr.split("(");
  let arr1 = data1.join("");
  let arr2 = arr1.split(")");
  let data2 = arr2.join("");
  let data3 = data2.split(" ")
  let data4 = data3.join("")
  let arr3 = state.phoneCode.split("+");
  let data5 = arr3.join("");
  const sendMessagePhoneNumber = data5 + data4;

  // -------------------------------------
  const [openRegionModal, setOpenRegionModal] = useState(false);
  // -------------------------------------
  const toggle = React.useCallback(() => setOpenRegionModal(false), []);
  // -------------------------------------
  const [openEditModal, setOpenEditModal] = useState(false);
  const togglePassword = React.useCallback(() => setOpenEditModal(false), []);
  // -------------------------------------

  // ------------------------GET METHOD-------------------
  useQuery(["get statistic"], () => {
    return fetch(`https://api.dressme.uz/api/main`)
      .then(res => res.json())

  },
    {
      onSuccess: res => {
        console.log(res, "GET MAIN");
      }
    }, {
    onError: err => {
      console.log(err, "error");
    }
  }
  )


  // -----------------------POST METHOD-----------------
  const { mutate } = useMutation(() => {
    // return fetch(`https://api.dressme.uz/api/admin/login`, {
    return fetch(`https://api.dressme.uz/api/seller/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: state?.firstName,
        surname: state?.lastName,
        email: state?.email,
        password: state?.password,
        // rememberToken: true
        phone: sendMessagePhoneNumber,
        card_number: state?.cardNumber,
        seller_type_id: state?.seller_type_id,
        region_id: state?.region,
        sub_region_id: state?.sub_Region
      })
    }).then((res) => res.json());
  });
  const onSubmit = () => {
    console.log("Clickup");
    console.log(state?.firstName, "firstName");
    console.log(state?.lastName, "lastName");
    console.log(state?.email, "email");
    console.log(state?.cardNumber, "cardNumber");
    console.log(state?.password, "password");
    console.log(state?.region, "region");
    console.log(state?.sub_Region, "sub_Region");
    console.log(state?.seller_type_id, "seller_type_id");
    console.log(sendMessagePhoneNumber, "sendMessagePhoneNumber");
    if (
      // state?.firstName.length &&
      // state?.lastName?.length &&
      // state?.email?.length &&
      // state?.cardNumber?.length &&
      // state?.region &&
      // state?.seller_type_id &&
      sendMessagePhoneNumber
    ) {
      console.log("malumotlarni junatildi");

      mutate({}, {
        onSuccess: (res) => {
          console.log(res, "res");
        },
        onError: (err) => {
          console.log(err, "err");

        },
        onSettled: (onSett) => {
          console.log(onSett, "onSett");
        }

      })
    } else {
      console.log("malumotlarni tuldring");
    }
    // if (state?.email?.length && state?.firstName.length) {
    //   mutate(
    //     {},
    //     {
    //       onSuccess: (res) => {
    //         if (res?.authenticationToken) {
    //           localStorage.setItem("token", res?.authenticationToken);
    //           navigate("/home");
    //           // setEmail("");
    //         } else {
    //           setError("Email yoki parolda xatolik");
    //         }
    //       },
    //       onError: (error, variables, context) => { },
    //       onSettled: (data, error, variables, context) => { }
    //     }
    //   );
    // } else {
    //   setError("Bush maydon junatish mumkin emas");
    // }
  };

  return (
    <div className="relative w-full h-fit md:h-[100vh]  flex flex-col gap-y-4 md:gap-y-[70px] items-center justify-center px-4 md:px-0">
      <div
        onClick={() => {
          setOpenRegionModal(false);
          setOpenEditModal(false);
        }}
        className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50 ${openRegionModal || openEditModal ? "" : "hidden"
          }`}
      ></div>
      <div className="w-full md:w-auto flex items-center justify-start md:hidden mt-4">
        <span>
          {" "}
          <MobileHumburgerMenu />
        </span>{" "}
      </div>{" "}

      {/* Edit password */}
      <section
        className={`fixed max-w-[440px] mx-auto w-full  md:w-auto z-[113] bottom-0 md:bottom-auto  duration-300 overflow-hidden ${openEditModal ? "" : "hidden z-0"
          }`}
      >
        <EditPassword onClick={togglePassword} />
      </section>

      {/* Regiona Menu */}

      {/* ---------------------------------- */}
      <div className="">
        <section
          onClick={() => setOpenRegionModal(false)}
          className={`fixed inset-0 z-[112]  duration-200 w-full h-[100vh] bg-black opacity-50 
          ${openRegionModal ? "" : "hidden"
            }`}
        ></section>
        <section
          className={`max-w-[440px] mx-auto w-full h-fit mx-auto fixed z-[113] left-0 right-0  duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${openRegionModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
            }`}
        >
          {openRegionModal &&
            <ModalOfMenu onClick={toggle} />
          }
        </section>
      </div>
      {/* ---------------------------------- */}
      {dressInfo?.ConfirmAuthen && (
        <div className="max-w-[800px] w-full md:text-center flex items-center md:justify-center">
          <span className="text-black text-[16px] md:text-3xl not-italic md:font-AeonikProMedium  font-AeonikProRegular tracking-[1px]">
            Скоро с вами свяжутся, ожидайте одобрения от администраторов{" "}
          </span>
        </div>
      )}
      <div className="max-w-[800px] w-full h-fit border border-lightBorderColor flex flex-col gap-y-6 rounded-[12px] p-4 md:p-[30px]">
        {/* title */}
        <div>
          <span className="text-black text-[20px] md:text-2xl not-italic font-AeonikProMedium leading-6">
            Мои данные
          </span>
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
                name="fname"
                autoComplete="off"
                placeholder="Имя"
                value={state?.firstName}
                onChange={(e) => setState({ ...state, firstName: e.target.value })}
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
                name="lname"
                autoComplete="off"
                placeholder="Фамилия"
                value={state?.lastName}
                onChange={(e) => setState({ ...state, lastName: e.target.value })}
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
                name="email"
                placeholder="Адрес электронной почты"
                value={state?.email}
                onChange={(e) => setState({ ...state, email: e.target.value })}
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
                  value={state?.phone}
                  onChange={(e) => setState({ ...state, phone: e.target.value })}
                  className={`w-full px-4 outline-none h-full not-italic ${state?.phone ? "font-AeonikProMedium" : null
                    } text-base leading-4 text-black`}
                  placeholder={"(97) 123-45-67"}
                ></InputMask>
              </div>
            </div>
          </div>
          <div className="w-full xs:w-1/2 h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Выберите регион{" "}
            </div>
            <div
              onClick={() => setOpenRegionModal(true)}
              className="mt-[6px] cursor-pointer select-none h-[40px] xs:h-12 px-[16px] w-full  flex items-center justify-between border border-searchBgColor rounded-lg leading-4"
            >
              <span className=" not-italic font-AeonikProRegular text-[14px] leading-4 text-textLightColor">
                Выберите регион
              </span>
              <span className="rotate-[90deg]">
                <ArrowRightIcon />
              </span>
            </div>
          </div>
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
              Номер банковской карты
            </div>
            <div className="mt-[6px] gap-x-[10px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              {/* CredtCardicons */}
              <span><CreditCardNumber /></span>
              {/* Component */}
              <input
                className=" outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                ref={domRef}
                type="text"
                placeholder="0000-0000-0000-0000"
                onChange={handleChange}
              />

            </div>
          </div>
        </div>
        {/* Edit Password and CardNumber */}
        <div className="w-full  flex  xs:flex-row flex-col items-center justify-end gap-x-6 gap-y-4 xs:gap-y-0">

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
            onClick={onSubmit}
            // onClick={() =>
            //   setDressInfo({
            //     ...dressInfo,
            //     ConfirmAuthen: true,
            //   })
            // }
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
export { UserProfile };
