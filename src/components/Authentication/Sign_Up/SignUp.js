import React, { useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import {
  ArrowRightIcon,
  CircleNextIcon,
  CreditCardNumber,
  UserMailIcon,
} from "../../../assets/icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { dressMainData } from "../../../hook/ContextTeam";
import { NavLink } from "react-router-dom";
import MobileHumburgerMenu from "../../Navbar/mobileHamburgerMenu/MobileMenu";
import ModalOfMenu from "./ModalOfMenu/ModalOfMenu";

import EditPassword from "./EditPassword/EditPassword";

const CardCredit = React.forwardRef((props, ref) => {
  const [card, setCard] = useState();
  const fallbackRef = React.useRef();
  const domRef = ref || fallbackRef;

  const handleChange = React.useCallback(() => {
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
        setCard(numbers);
      }
    }
  }, [domRef]);

  useEffect(() => {
    handleChange();
  }, [card, handleChange]);

  return (
    <>
      <input
        className=" outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
        type="text"
        placeholder="0000-0000-0000-0000"
        ref={domRef}
        onChange={handleChange} />
    </>
  );
});

const SignUp = () => {
  const [dressInfo, setDressInfo] = useContext(dressMainData);

  const [phone, setPhone] = useState("");
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    phoneCode: "+998",
    email: "",
    password: "",
    eyesShow: true,
    validateConfirm: true,
    requestPerson: true,
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  let data = phone.split("-");
  let arr = data.join("");
  let data1 = arr.split("(");
  let arr1 = data1.join("");
  let arr2 = arr1.split(")");
  let data2 = arr2.join("");
  let arr3 = state.phoneCode.split("+");
  let data3 = arr3.join("");
  const sendMessagePhoneNumber = data3 + data2;
  const [openRegionModal, setOpenRegionModal] = useState(false);
  // -------------------------------------
  const toggle = React.useCallback(() => setOpenRegionModal(false), []);
  // -------------------------------------

  const [openEditModal, setOpenEditModal] = useState(false);
  const togglePassword = React.useCallback(() => setOpenEditModal(false), []);
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
          className={`fixed inset-0 z-[112] border border-red-500 duration-200 w-full h-[100vh] bg-black opacity-50 
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

        {/* Тип, Изменить пароль */}
        {/* <div className="w-full  flex items-center justify-between gap-x-6 gap-y-4 xs:gap-y-0">
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
              Пароль
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className=" outline-none	 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type={state?.eyesShow ? "password" : "text"}
                placeholder="Enter your password"
                required
              />
              <span className="cursor-pointer">
                {state?.eyesShow ? (
                  <AiOutlineEyeInvisible
                    onClick={() => setState({ ...state, eyesShow: false })}
                    size={20}
                  />
                ) : (
                  <AiOutlineEye
                    onClick={() => setState({ ...state, eyesShow: true })}
                    size={20}
                  />
                )}
              </span>
            </div>
          </div>
        </div> */}

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
          {/* Имя организации */}
          <div className="w-full xs:w-1/2 h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Номер банковской карты            </div>
            <div className="mt-[6px] gap-x-[10px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              {/* CredtCardicons */}
              <span><CreditCardNumber /></span>
              {/* Component */}
              <CardCredit />
            </div>
          </div>
          {/* EditPassword */}
          <button
            onClick={() => setOpenEditModal(true)}
            className={
              "text-textBlueColor flex items-center text-base not-italic font-AeonikProRegular hover:underline"
            }
          >
            Изменить пароль
          </button>
        </div>


        {/* Button */}
        <div className="w-full  flex items-center justify-between gap-x-6 mt-7">
          <button
            onClick={() =>
              setDressInfo({
                ...dressInfo,
                ConfirmAuthen: true,
              })
            }
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
export { SignUp };
