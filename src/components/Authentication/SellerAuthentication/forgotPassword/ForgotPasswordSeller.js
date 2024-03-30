import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MenuCloseIcons,
  SircleNext,
  SuccessIconsForMail,
  UserMailIcon,
} from "../../../../assets/icons";
import { ClipLoader } from "react-spinners";
import { LanguageDetectorDress } from "../../../../language/LanguageItem";
import { useTranslation } from "react-i18next";

export default function ForgotPasswordSeller() {
  const [languageDetector] = useContext(LanguageDetectorDress);

  const { t } = useTranslation("forgotPassword");

  const url = "https://api.dressme.uz/api/seller";
  const [state, setState] = useState({
    email: "",
    passwordEye: false,
    openModalEmailMessage: false,
    isLoadingSent: false,
    errorsGroup: null
  });

  const forgotPasswordMutate = useMutation(() => {
    return fetch(`${url}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Accept": "application/json",
        "Accept-Language": languageDetector?.typeLang,
      },
      body: JSON.stringify({ email: state?.email }),
    }).then((res) => res.json());
  });

  const onSubmit = () => {
    setState({ ...state, isLoadingSent: true });
    forgotPasswordMutate.mutate(
      {},
      {
        onSuccess: (res) => {
          setState({ ...state, isLoadingSent: false });
          if (res?.errors && res?.message) {
            setState({ ...state, isLoadingSent: false, errorsGroup: res?.errors });
             toast.error(`${res?.errors?.email}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
          if (!res?.errors && res?.message) {
             toast.error(`${res?.message}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setState({
              ...state, openModalEmailMessage: true, errorGroup: ""
            });
            setTimeout(() => {
              setState({ ...state, openModalEmailMessage: false, email: "" });
            }, 5000);
          }
       
        },
        onError: (err) => {
          toast.error(`${err?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setState({ ...state, isLoadingSent: false });
          throw new Error(err || "something wrong");
        },
      }
    );
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    // document.title = "Забыли пароль";
  }, []);
  return (
    <div className="w-full min-h-[calc(100vh-180px)] flex flex-col items-center justify-center ss:px-4 md:px-0 ">
      <ToastContainer
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
      {/* -----------------------Email Verify Modal------------------- */}
      {state?.openModalEmailMessage && (
        <div className="w-full md:w-1/2 h-fit ">
          <div
            onClick={() => {
              setState({ ...state, openModalEmailMessage: false });
            }}
            className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50 ${state?.openModalEmailMessage ? "" : "hidden"
              }`}
          ></div>
          {state?.openModalEmailMessage && (
            <div className="fixed max-w-[490px] h-[275px]  p-3 bg-white rounded-lg  mx-auto w-full  z-[113] top-[50%] left-1/2 right-1/2 translate-x-[-50%] translate-y-[-50%] overflow-hidden">
              <div className="flex items-center justify-end">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    setState({ ...state, openModalEmailMessage: false });
                  }}
                >
                  <MenuCloseIcons colors="#303030" />
                </span>
              </div>
              <div className="w-full flex items-center justify-center flex-col">
                <button className="flex p-4 items-center justify-center rounded-full mt-4 bg-[#D8EDFF]">
                  <SuccessIconsForMail />
                </button>
                <p className="text-[#1F1F1F] text-3xl not-italic font-AeonikProMedium mt-5">
                  {t("sentLink")}
                </p>
                <p className="text-[#8B8B8B] text-xl not-italic font-AeonikProRegular mt-[30px]">
                  {t("checkEmail")}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="max-w-[440px]  w-[100%] h-fit  md:px-[40px] md:py-[32px] ss:p-5 border border-searchBgColor rounded-lg">
        <div className=" w-full mt-1 mb-7 flex flex-col justify-center">
          <span className="not-italic font-AeonikProMedium text-xl ss:text-start md:text-center leading-5   tracking-[0,16px] text-black">
            {t("forgetPassword")}
          </span>
          <span className="mt-2 not-italic font-AeonikProRegular text-sm leading-4 ss:text-start md:text-center text-setTexOpacity tracking-[0.16px]">
            {t("dontWorry")}
          </span>
        </div>

        <div className="mt-1 flex flex-col gap-y-5 w-full h-fit">
          <div className="w-full h-fit">
            <div className="flex items-center text-[#303030] text-[14px] xs:text-base not-italic font-AeonikProRegular leading-4 tracking-[0,16px] ">
              {t("email")}
            </div>
            <div className="mt-1 xs:mt-[6px]  w-full flex items-center bg-btnBgColor border border-searchBgColor rounded-lg ">
              <input
                className="outline-none w-full h-[42px] pl-2 xs:pl-[16px] rounded-lg bg-btnBgColor focus:bg-btnBgColor active:bg-btnBgColor placeholder:bg-btnBgColor placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black "
                type="email"
                name="email"
                value={state?.email || ""}
                onChange={(e) => setState({ ...state, email: e.target.value })}
                placeholder={t("emailPlaceholder")}
                required
              />
              <span className="pr-2 xs:pr-[16px]">
                <UserMailIcon />
              </span>{" "}
            </div>
            {state?.errorsGroup?.email &&
              !state?.email && (
                <p className="text-[#D50000] text-[12px] ll:text-[14px] md:text-base">
                  {state?.errorsGroup?.email}
                </p>
              )}
          </div>
        </div>

        {state?.isLoadingSent ? (
          <button
            type="button"
            className="mt-8  border cursor-pointer flex items-center justify-center border-searchBgColor w-full h-12 bg-textBlueColor select-none rounded-lg active:scale-95	active:opacity-70 "
          >
            <ClipLoader
              className="h-full py-[2px]"
              color={"#fff"}
              size={40}
              loading={true}
            />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            className="mt-8  border cursor-pointer flex items-center justify-center border-searchBgColor w-full h-12 bg-textBlueColor select-none rounded-lg active:scale-95	active:opacity-70 "
          >
            <span className="not-italic font-AeonikProMedium mr-2 text-base leading-4 text-center text-white tracking-[0,16px]">
              {t("resetPassword")}
            </span>
            <span>
              <SircleNext colors={"#fff"} />
            </span>{" "}
          </button>
        )}
      </div>
    </div>
  );
}
