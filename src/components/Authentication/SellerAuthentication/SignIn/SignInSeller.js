import React, { useContext, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { SircleNext, UserMailIcon } from "../../../../assets/icons";
import { ClipLoader } from "react-spinners";
import "../SignUp/style.css";
import { LanguageDetectorDress } from "../../../../language/LanguageItem";
import { Popover } from "antd";
import { RussianFlag, UzbekFlag } from "../../../../assets";
import { dressMainData } from "../../../../hook/ContextTeam";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export default function SignInSeller() {
  const [state, setState] = useState({
    eyesShow: true,
    password: "",
    email: "",
    rememberCheck: "",
    errorGroup: "",
    isLoadingSent: false,
  });
  const [languageDetector, setLanguageDetector] = useContext(LanguageDetectorDress);

  const [dressInfo, setDressInfo] = useContext(dressMainData);

  const handleChange = (e) => {
    const { checked } = e.target;
    setState({ ...state, rememberCheck: checked });
  };

  const navigate = useNavigate();
  const url = "https://api.dressme.uz/api/seller/login";
   const dataMutate = useMutation(() => {
    return fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": languageDetector?.typeLang,
      },
      body: JSON.stringify({
        email: state.email,
        password: state.password,
        rememberToken: state?.rememberCheck,
      }),
    }).then((res) => res.json());
  });
  const EnterTheSystem = () => {

    setState({ ...state, isLoadingSent: true });
    dataMutate.mutate(
      {},
      {
        onSuccess: (res) => {
          if (res?.message && res?.errors) {
            setState({
              ...state,
              errorGroup: res,
              isLoadingSent: false,
            });
            toast.error(`${res?.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (res?.access_token) {
            localStorage.setItem("DressmeUserToken", res?.access_token);
            localStorage.setItem("RefreshUserToken", res?.refresh_token);
            navigate("/edit-profile");
            setState({
              ...state,
              email: "",
              password: "",
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
        },
      }
    );

  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    // document.title = "Войти в систему продавца";
  }, []);

  // Language switch ------
  // console.log(state?.errorGroup);
  const LanguageList = [
    { id: 1, value: "uz", type: "O'zbekcha", icons: UzbekFlag },
    { id: 2, value: "ru", type: "Русский", icons: RussianFlag },
  ];

  const contentLang = (
    <section className="w-[140px] h-fit m-0 p-0 rounded-lg">
      {LanguageList.map((data) => {
        return (
          <article
            key={data?.value}
            className={`p-2 gap-x-2 rounded-lg text-sm cursor-pointer hover:bg-slate-100 flex items-center justify-start  ${dressInfo?.ColorSeason}`}
            onClick={() => {
              handleLangValue(data?.value);
              window.location.reload();
            }}
          >
            <figure className="mr-[6px]  w-5 h-5">
              <img className="w-full h-full" src={data?.icons} alt="" />
            </figure>
            <article
              className={`text-base not-italic font-AeonikProMedium leading-5  ${dressInfo?.ColorSeason}`}
            >
              {data?.type}
            </article>
          </article>
        );
      })}
    </section>
  );

  const [openLang, setOpenLang] = useState(false);
  const handleOpenChangeLang = (newOpen) => {
    setOpenLang(newOpen);
  };
  const { i18n, t } = useTranslation("signIn");

  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("i18nextLng")
  );

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage(currentLang);
    }
    setLanguageDetector({ typeLang: currentLang });
  }, [currentLang]);
  const handleLangValue = (value) => {
    i18n.changeLanguage(value);
    setCurrentLang(value);
    setOpenLang(false);
  };

  return (
    <div className=" w-full h-[100vh] px-4 md:px-0 flex items-center justify-center flex-col">
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

      <section className="mb-[15px] w-[150px] bg-slate-100 rounded-lg  h-fit font-AeonikProMedium select-none cursor-pointer">
        {LanguageList.filter((data) => data?.value === currentLang).map(
          (data) => {
            return (
              <Popover
                key={data?.id}
                open={openLang}
                onOpenChange={handleOpenChangeLang}
                className="w-full h-[42px] gap-x-[5px] flex items-center justify-center capitalize "
                trigger="click"
                options={["Hide"]}
                placement="top"
                content={contentLang}
              >
                <span className="block mr-[4px] ">
                  <img
                    src={data?.icons}
                    className="min-w-[16px] min-h-[16px]"
                    alt=""
                  />
                </span>
                <p className="text-base not-italic font-AeonikProMedium leading-0 ">
                  {data?.type}
                </p>
              </Popover>
            );
          }
        )}
      </section>

      <div className="max-w-[440px] w-[100%]  h-fit  md:px-[40px] md:py-[32px] py-3 px-3 border border-searchBgColor rounded-lg">
        <div className="w-full mb-7 not-italic font-AeonikProMedium text-[18px] ls:text-xl text-center leading-5 tracking-[0,16px] text-black">
          {t("sellerSignIn")}
        </div>

        <div className="mt-2 w-full h-fit">
          <div className="flex items-center text-[#303030] text-[14px] xs:text-base not-italic font-AeonikProRegular leading-4 tracking-[0,16px] ">
            {t("email")}
          </div>
          <div className="mt-[6px] px-2 md:px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
            <input
              className="outline-none !bg-white  w-full h-[42px] text-base  placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black focus:bg-white placeholder-bg-white"
              type="email"
              name="email"
              value={state.email || ""}
              onChange={({ target: { value } }) => {
                setState({ ...state, email: value });
              }}
              placeholder={t("emailPlaceholder")}
              required
            />
            <span>
              <UserMailIcon colors={"#e2e2e2"} />
            </span>
          </div>
          {state?.errorGroup?.errors?.email &&
            !state?.email && (
              <p className="text-[#D50000] text-[12px] ll:text-[14px] md:text-base">
                {state?.errorGroup?.errors?.email
                }
              </p>
            )}
        </div>
        <div className="mt-4 w-full h-fit">
          <div className="flex items-center text-[#303030] text-[14px] xs:text-base not-italic font-AeonikProRegular leading-4 tracking-[0,16px] ">
            {t("password")}
          </div>
          <div className="mt-[6px] px-2 md:px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
            <input
              className=" outline-none w-full bg-white h-[42px] text-base placeholder-not-italic placeholder-font-AeonikProMedium placeholder-text-base placeholder-leading-4 placeholder-text-black"
              type={state?.eyesShow ? "password" : "text"}
              placeholder={t("passwordPlaceholder")}
              name="password"
              value={state.password || ""}
              onChange={({ target: { value } }) => {
                setState({ ...state, password: value });
              }}
              required
            />
            <span className="cursor-pointer">
              {state?.eyesShow ? (
                <AiOutlineEyeInvisible
                  onClick={() => setState({ ...state, eyesShow: false })}
                  size={20}
                  color={"#e2e2e2"}
                />
              ) : (
                <AiOutlineEye
                  onClick={() => setState({ ...state, eyesShow: true })}
                  size={20}
                  color={"#e2e2e2"}
                />
              )}
            </span>
          </div>
          {state?.errorGroup?.errors?.password &&
            !state?.password && (
              <p className="text-[#D50000] text-[12px] ll:text-[14px] md:text-base">
                {state?.errorGroup?.errors?.password
                }
              </p>
            )}
        </div>

        <div className="my-5 flex items-center justify-between w-full">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-[18px] h-[18px] rounded-lg text-black bg-white placeholder-bg-white mr-2"
              id="vehicle1"
              name="vehicle1"
              onChange={handleChange}
            />
            <label
              htmlFor="vehicle1"
              className="not-italic select-none cursor-pointer font-AeonikProRegular text-sm leading-4 text-black tracking-[0,16px]"
            >
              {" "}
              {t("rememberData")}
            </label>
          </div>
          <NavLink
            to={"/forgot-password-seller"}
            className="not-italic underline	 font-AeonikProRegular text-sm leading-4 cursor-pointer text-black hover:text-SignInBgColor tracking-[0,16px]"
          >
            {t("forgetPassword")}
          </NavLink>
        </div>
        {state?.isLoadingSent ? (
          <button className="mt-2 border cursor-pointer flex items-center justify-center border-searchBgColor w-full h-12 bg-fullBlue select-none rounded-lg active:scale-95	active:opacity-70 ">
            <ClipLoader
              className="h-full py-[2px]"
              color={"#fff"}
              size={40}
              loading={true}
            />
          </button>
        ) : (
          <button
            onClick={EnterTheSystem}
            className="mt-2 border cursor-pointer flex items-center justify-center border-searchBgColor w-full h-12 bg-fullBlue select-none rounded-lg active:scale-95	active:opacity-70 "
          >
            <span className="not-italic font-AeonikProMedium mr-2 text-base leading-4 text-center text-white tracking-[0,16px]">
              {t("enterSystem")}
            </span>
            <span>
              <SircleNext colors={"#fff"} />
            </span>
          </button>
        )}

        <div className=" mt-6 text-center">{t("ifYouHaveAccount")}</div>
        <NavLink
          to={"/signup-seller"}
          className="mt-3  cursor-pointer flex items-center justify-center border-searchBgColor w-full h-12 bg-[#E8E8E8] select-none rounded-lg active:scale-95	active:opacity-70 "
        >
          <span className="not-italic font-AeonikProMedium mr-2 text-base leading-4 text-center text-black tracking-[0,16px]">
            {t("createAccount")}
          </span>
        </NavLink>
      </div>
    </div>
  );
}
