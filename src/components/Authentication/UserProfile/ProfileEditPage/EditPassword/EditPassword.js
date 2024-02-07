import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MenuCloseIcons } from "../../../../../assets/icons";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
function EditPassword({ onClick }) {
  const [state, setState] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    newConfirmPassword: "",
    isLoadingSent: false,
    confirmPassword: "",
    eyesShowOld: false,
    eyesShowNew: false,
    eyesShowConfirm: false,
    errorGroup: null
  });
  const url = "https://api.dressme.uz/api/seller";

  const dataMutate = useMutation(() => {
    return fetch(`${url}/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,

      },
      body: JSON.stringify({
        current_password: state?.oldPassword,
        new_password: state?.newPassword,
        new_confirm_password: state?.newConfirmPassword,
      }),
    }).then((res) => res.json());
  });
  const handleChangePassword = () => {

    setState({ ...state, isLoadingSent: true })
    dataMutate.mutate(
      {},
      {
        onSuccess: (res) => {
          console.log(res, "change-password");
          if (res?.message && res?.errors) {
            setState({ ...state, errorGroup: res?.errors, isLoadingSent: false })
            // toast.error(`${res?.message}`, {
            //   position: "top-right",
            //   autoClose: 3000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "light",
            // });

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
            onClick()
            setState({ ...state, oldPassword: "", newConfirmPassword: "", newPassword: "", errorGroup: "", isLoadingSent: false });
          }
        },
        onError: (err) => {
          setState({ ...state, isLoadingSent: false })
          toast.error(`${err}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        },
      }
    );

  };
  console.log(state?.errorGroup, "errorGroup");
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
          <label htmlFor="oldPassword" className="mt-[6px]  overflow-hidden pr-2 w-full flex items-center border border-searchBgColor rounded-lg ">
            <input
              className=" outline-none w-full h-[40px] pl-2 xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
              type={state?.eyesShowOld ? "text" : "password"}
              placeholder="Старый пароль"
              name="oldPassword"
              value={state?.oldPassword}
              onChange={(e) => setState({ ...state, oldPassword: e.target.value })}
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
          <div className="w-full flex items-center justify-end">
            {state?.errorGroup?.current_password && (
              <p className="text-[#D50000] text-[12px] ll:text-[14px] md:text-base">
                {state?.errorGroup?.current_password}
              </p>
            )}
          </div>
        </div>
        <div className="w-full  h-fit ">
          <span className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
            Новый пароль{" "}
          </span>
          <label htmlFor="password" className="mt-[6px] pr-2 overflow-hidden  w-full flex items-center border border-searchBgColor rounded-lg ">
            <input
              className=" outline-none w-full pl-2 h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
              type={state?.eyesShowNew ? "text" : "password"}
              placeholder="Ввести старый пароль"
              name="password"
              value={state?.newPassword}
              onChange={(e) => setState({ ...state, newPassword: e.target.value })}
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
          <div className="w-full flex items-center justify-end">
            {state?.errorGroup?.new_password && (
              <p className="text-[#D50000] text-[12px] ll:text-[14px] md:text-base">
                {state?.errorGroup?.new_password}
              </p>
            )}
          </div>
        </div>
        <div className="w-full  h-fit ">
          <span className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
            Подтвердить пароль{" "}
          </span>
          <label htmlFor="confirm-password" className="mt-[6px] pr-2  overflow-hidden w-full flex items-center border border-searchBgColor rounded-lg ">
            <input
              className=" outline-none pl-2 w-full h-[40px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
              type={state?.eyesShowConfirm ? "text" : "password"}
              placeholder="Ввести старый пароль"
              name="confirm-password"
              value={state?.newConfirmPassword}
              onChange={(e) => setState({ ...state, newConfirmPassword: e.target.value })}
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
          <div className="w-full flex items-center justify-end">
            {state?.errorGroup?.new_confirm_password && (
              <p className="text-[#D50000] text-[12px] ll:text-[14px] md:text-base">
                {state?.errorGroup?.new_confirm_password}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full mt-[50px]">
        <button type="button" onClick={() => handleChangePassword()} className="h-12 w-full active:scale-95  active:opacity-70 text-white rounded-lg  flex bg-textBlueColor items-center justify-center text-center text-lg not-italic font-AeonikProMedium">
          {state?.isLoadingSent ?
            <ClipLoader
              className="h-full py-[2px]"
              color={"#fff"}
              size={40}
              loading={true}
            /> : "Обновить пароль"}

        </button>
      </div>
    </div>
  );
}
export default React.memo(EditPassword)