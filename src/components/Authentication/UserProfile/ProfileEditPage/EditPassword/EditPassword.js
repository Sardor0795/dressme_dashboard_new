import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MenuCloseIcons } from "../../../../../assets/icons";

export default function EditPassword({ onClick }) {
  const [state, setState] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    eyesShowOld: false,
    eyesShowNew: false,
    eyesShowConfirm: false,
  });
  return (
    <div className="w-full md:w-[455px] h-fit bg-white rounded-t-lg md:rounded-lg px-4 py-5 md:py-[35px] md:px-[50px]">
      <div className="flex justify-end items-center md:mr-[-30px] md:mt-[-15px]">
        {" "}
        <button
          onClick={onClick}
          className=" border border-borderColor rounded-lg p-[3px]"
        >
          <MenuCloseIcons colors={"#000"} />
        </button>
      </div>
      <div className="w-full flex items-center justify-center">
        <span className="text-gray-800 text-center text-2xl not-italic font-AeonikProMedium">
          Изменить пароль
        </span>
      </div>
      <div className="mt-[30px] flex flex-col gap-y-5">
        <div className="w-full  h-fit ">
          <span className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
            Старый пароль
          </span>
          <label className="mt-[6px]  overflow-hidden pr-2 w-full flex items-center border border-searchBgColor rounded-lg ">
            <input
              className=" outline-none w-full h-[40px] pl-2 xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
              type={state?.eyesShowOld ? "text" : "password"}
              placeholder="Старый пароль"
              name="password"
              autoComplete="off"
              required
            />

            <span className="cursor-pointer pr-2">
              {state?.eyesShowOld ? (
                <span
                  onClick={() => setState({ ...state, eyesShowOld: false })}
                >
                  < AiOutlineEye size={20} color={"#e2e2e2"} />
                </span>
              ) : (
                <span
                  onClick={() => setState({ ...state, eyesShowOld: true })}
                >
                  <AiOutlineEyeInvisible size={20} color={"#e2e2e2"} />
                </span>

              )}
            </span>
          </label>
        </div>
        <div className="w-full  h-fit ">
          <span className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
            Новый пароль{" "}
          </span>
          <label className="mt-[6px] pr-2 overflow-hidden  w-full flex items-center border border-searchBgColor rounded-lg ">
            <input
              className=" outline-none w-full pl-2 h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
              type={state?.eyesShowNew ? "text" : "password"}
              placeholder="Ввести старый пароль"
              name="password"
              autoComplete="off"
              required
            />

            <span className="cursor-pointer pr-2">
              {state?.eyesShowNew ? (
                <span
                  onClick={() => setState({ ...state, eyesShowNew: false })}
                >
                  < AiOutlineEye size={20} color={"#e2e2e2"} />
                </span>
              ) : (
                <span
                  onClick={() => setState({ ...state, eyesShowNew: true })}
                >
                  <AiOutlineEyeInvisible size={20} color={"#e2e2e2"} />
                </span>

              )}
            </span>

          </label>
        </div>
        <div className="w-full  h-fit ">
          <span className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
            Подтвердить пароль{" "}
          </span>
          <label className="mt-[6px] pr-2  overflow-hidden w-full flex items-center border border-searchBgColor rounded-lg ">
            <input
              className=" outline-none pl-2 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
              type={state?.eyesShowConfirm ? "text" : "password"}
              placeholder="Ввести старый пароль"
              name="password"
              autoComplete="off"
              required
            />

            <span className="cursor-pointer pr-2">
              {state?.eyesShowConfirm ? (
                <span
                  onClick={() => setState({ ...state, eyesShowConfirm: false })}
                >
                  < AiOutlineEye size={20} color={"#e2e2e2"} />
                </span>
              ) : (
                <span
                  onClick={() => setState({ ...state, eyesShowConfirm: true })}
                >
                  <AiOutlineEyeInvisible size={20} color={"#e2e2e2"} />
                </span>

              )}
            </span>

          </label>
        </div>
      </div>
      <div className="w-full mt-[50px]">
        <button className="h-12 w-full active:scale-95  active:opacity-70 text-white rounded-lg  flex bg-textBlueColor items-center justify-center text-center text-lg not-italic font-AeonikProMedium">
          Обновить пароль
        </button>
      </div>
    </div>
  );
}
