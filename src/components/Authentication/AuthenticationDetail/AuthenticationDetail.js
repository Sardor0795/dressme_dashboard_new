import React, { useContext, useState } from "react";
import InputMask from "react-input-mask";
import { CircleNextIcon, UserMailIcon } from "../../../assets/icons";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { dressMainData } from "../../../hook/ContextTeam";

const AuthenticationDetail = () => {
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

  let data = phone.split("-");
  let arr = data.join("");
  let data1 = arr.split("(");
  let arr1 = data1.join("");
  let arr2 = arr1.split(")");
  let data2 = arr2.join("");
  let arr3 = state.phoneCode.split("+");
  let data3 = arr3.join("");
  const sendMessagePhoneNumber = data3 + data2;
  return (
    <div className="w-full h-[100vh]  flex flex-col gap-y-[70px] items-center justify-center">
      {dressInfo?.ConfirmAuthen && (
        <div className="w-full flex items-center justify-center">
          <span className="text-black text-3xl not-italic font-AeonikProMedium tracking-[1px]">
            Скоро с вами свяжутся, ожидайте одобрения от администраторов
          </span>
        </div>
      )}
      <div className="w-[800px] h-fit border border-lightBorderColor flex flex-col gap-y-6 rounded-[12px] p-[30px]">
        {/* title */}
        <div>
          <span className="text-black text-2xl not-italic font-AeonikProMedium leading-6">
            Мои данные
          </span>
        </div>
        {/* Name, surname */}
        <div className="w-full  flex items-center justify-between gap-x-6">
          <div className=" w-1/2 h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Имя{" "}
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className="  w-full h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type="text"
                placeholder="Имя"
                required
              />
            </div>
          </div>
          <div className=" w-1/2 h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Фамилия{" "}
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className="  w-full h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type="text"
                placeholder="Фамилия"
                required
              />
            </div>
          </div>
        </div>
        {/* Номер, Mail */}
        <div className="w-full  flex items-center justify-between gap-x-6">
          {/* Номер */}
          <div className=" w-1/2 h-fit">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Номер телефона{" "}
            </div>
            <div className="mt-[6px] flex items-center justify-center overflow-hidden border border-searchBgColor rounded-lg">
              <div className="ss:w-[35%] md:w-[30%] h-12 flex items-center justify-center  cursor-pointer border-r border-searchBgColor overflow-hidden">
                <input
                  className="w-[40px]  h-full select-none mx-2 not-italic font-AeonikProMedium text-base leading-4 text-black"
                  type="text"
                  value={state.phoneCode}
                  readOnly
                />
                {/* <span className="rotate-[180deg]">
                  <ArrowTopIcons colors={"#000"} />
                </span> */}
              </div>
              <div className="ss:w-[65%] md:w-[70%] h-12 overflow-hidden">
                <InputMask
                  mask="(99) 999-99-99"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-4  h-full not-italic ${
                    phone ? "font-AeonikProMedium" : null
                  } text-base leading-4 text-black`}
                  placeholder={"(97) 123-45-67"}
                ></InputMask>
              </div>
            </div>
          </div>
          {/* Mail */}
          <div className=" w-1/2 h-fit ">
            <div className=" flex items-center justify-between w-full">
              <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
                Электронная почта{" "}
              </div>
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className="  w-full h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
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
        <div className="w-full  flex items-center justify-between gap-x-6">
          <div className=" w-1/2 h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Тип{" "}
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className="  w-full h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type="text"
                placeholder="Тип"
                required
              />
            </div>
          </div>
          <div className=" w-1/2 h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Пароль
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className="  w-full h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
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
        </div>

        {/* Выберите регион, surname */}
        <div className="w-full  flex items-center justify-between gap-x-6">
          <div className=" w-1/2 h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Выберите регион{" "}
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className="  w-full h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type="text"
                placeholder="Выберите регион"
                required
              />
            </div>
          </div>
          <div className=" w-1/2 h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
              Раздел{" "}
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className="  w-full h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
                type="text"
                placeholder="Раздел"
                required
              />
            </div>
          </div>
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
            className="w-full active:scale-95  active:opacity-70 h-12 rounded-lg flex items-center gap-x-[10px] justify-center bg-weatherWinterColor"
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
export { AuthenticationDetail };
