import React, { useContext, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { MenuCloseIcons } from "../../../../../assets/icons";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../../../language/LanguageItem";
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
    errorGroup: null,
  });
  const url = "https://api.dressme.uz/api/seller";

  const { t } = useTranslation("profil");
  const [languageDetector] = useContext(LanguageDetectorDress);

  const dataMutate = useMutation(() => {
    return fetch(`${url}/change-password`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
        "Accept-Language": languageDetector?.typeLang,
      },
      body: JSON.stringify({
        current_password: state?.oldPassword,
        new_password: state?.newPassword,
        new_confirm_password: state?.newConfirmPassword,
      }),
    }).then((res) => res.json());
  });
  const handleChangePassword = () => {
    setState({ ...state, isLoadingSent: true });
    dataMutate.mutate(
      {},
      {
        onSuccess: (res) => {
          if (res?.message && res?.errors) {
            setState({
              ...state,
              errorGroup: res?.errors,
              isLoadingSent: false,
            });
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
            onClick();
            setState({
              ...state,
              oldPassword: "",
              newConfirmPassword: "",
              newPassword: "",
              errorGroup: "",
              isLoadingSent: false,
            });
          }
        },
        onError: (err) => {
          setState({ ...state, isLoadingSent: false });
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
          throw new Error(err || "something wrong");
        },
      }
    );
  };
  return (
    <div className="w-full md:w-[455px] h-fit bg-white rounded-t-lg md:rounded-lg px-4 py-5 md:py-[35px] md:px-[50px]">
      <div className="flex justify-end items-center md:mr-[-30px] md:mt-[-15px]">
        {" "}
        <button
          type="button"
          className="select-none  cursor-pointer"
          onClick={onClick}
        >
          <MenuCloseIcons colors="#a1a1a1" />
        </button>
      </div>
      <div className="w-full flex items-center justify-center">
        <span className="text-gray-800 text-center text-2xl not-italic font-AeonikProMedium">
          {t("editPassword")}
        </span>
      </div>
      <div className="mt-[30px] flex flex-col gap-y-5">
        <div className="w-full  h-fit ">
          <span className="not-italic font-AeonikProRegular text-sm leading-4 text-black  tracking-[0,16px] ">
            {t("oldPassword")}
          </span>
          <label
            htmlFor="oldPassword"
            className="mt-[6px]  overflow-hidden pr-2 w-full flex items-center border border-searchBgColor rounded-lg "
          >
            <input
              className=" outline-none w-full h-[40px] pl-2 xs:h-[42px] placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-[14px] placeholder-leading-4 placeholder-text-black"
              type={state?.eyesShowOld ? "text" : "password"}
              placeholder={t("writeOldPassword")}
              name="oldPassword"
              value={state?.oldPassword || ""}
              onChange={(e) =>
                setState({ ...state, oldPassword: e.target.value })
              }
              autoComplete="off"
              required
            />

            <span className="cursor-pointer pr-2">
              {state?.eyesShowOld ? (
                <span
                  onClick={() => setState({ ...state, eyesShowOld: false })}
                >
                  <AiOutlineEye size={20} color={"#e2e2e2"} />
                </span>
              ) : (
                <span onClick={() => setState({ ...state, eyesShowOld: true })}>
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
            {t("newPassword")}
          </span>
          <label
            htmlFor="newPassword"
            className="mt-[6px] pr-2 overflow-hidden  w-full flex items-center border border-searchBgColor rounded-lg "
          >
            <input
              className=" outline-none w-full pl-2 h-[40px] xs:h-[42px] placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-[14px] placeholder-leading-4 placeholder-text-black"
              type={state?.eyesShowNew ? "text" : "password"}
              placeholder={t("writeNewPassword")}
              name="newPassword"
              value={state?.newPassword || ""}
              onChange={(e) =>
                setState({ ...state, newPassword: e.target.value })
              }
              autoComplete="off"
              required
            />

            <span className="cursor-pointer pr-2">
              {state?.eyesShowNew ? (
                <span
                  onClick={() => setState({ ...state, eyesShowNew: false })}
                >
                  <AiOutlineEye size={20} color={"#e2e2e2"} />
                </span>
              ) : (
                <span onClick={() => setState({ ...state, eyesShowNew: true })}>
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
            {t("confirmPassword")}
          </span>
          <label
            htmlFor="confirmPassword"
            className="mt-[6px] pr-2  overflow-hidden w-full flex items-center border border-searchBgColor rounded-lg "
          >
            <input
              className=" outline-none pl-2 w-full h-[40px] xs:h-[42px] placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-[14px] placeholder-leading-4 placeholder-text-black"
              type={state?.eyesShowConfirm ? "text" : "password"}
              placeholder={t("confirmPassword")}
              name="confirmPassword"
              value={state?.newConfirmPassword || ""}
              onChange={(e) =>
                setState({ ...state, newConfirmPassword: e.target.value })
              }
              autoComplete="off"
              required
            />

            <span className="cursor-pointer pr-2">
              {state?.eyesShowConfirm ? (
                <span
                  onClick={() => setState({ ...state, eyesShowConfirm: false })}
                >
                  <AiOutlineEye size={20} color={"#e2e2e2"} />
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
        <button
          type="button"
          onClick={() => handleChangePassword()}
          className="h-12 w-full active:scale-95  active:opacity-70 text-white rounded-lg  flex bg-textBlueColor items-center justify-center text-center text-lg not-italic font-AeonikProMedium"
        >
          {state?.isLoadingSent ? (
            <ClipLoader
              className="h-full py-[2px]"
              color={"#fff"}
              size={40}
              loading={true}
            />
          ) : (
            t("updatePassword")
          )}
        </button>
      </div>
    </div>
  );
}
export default React.memo(EditPassword);
