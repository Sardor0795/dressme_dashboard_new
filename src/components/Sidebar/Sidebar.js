import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  ClothesIcons,
  LocationIcon,
  MenuCloseIcons,
  NavbarMarketIcon,
  NavbarReviewIcon,
  NavbarUserIcon,
  UserExitIcon,
  UserIcon,
} from "../../assets/icons";
import { dressMainData } from "../../hook/ContextTeam";
import { useHttp } from "../../hook/useHttp";
import { useMutation } from "@tanstack/react-query";
import { RussianFlag, UzbekFlag } from "../../assets";
import { Popover } from "antd";
import { SellerMainData } from "../../hook/SellerUserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { LanguageDetectorDress } from "../../language/LanguageItem";
import { ShopList } from "../../hook/ShopList";
import ScrollToTop from "react-scroll-to-top";
import { ReactComponent as MySVG } from "../../assets/backtop/backTop.svg";


function Sidebar() {
  const { i18n, t } = useTranslation("sidebar");
  const [shopList, setShopList] = useContext(ShopList)

  const [dressInfo] = useContext(dressMainData);
  const [languageDetector, setLanguageDetector] = useContext(LanguageDetectorDress);
  const [currentLang, setCurrentLang] = useState(localStorage.getItem("i18nextLng"));

  const { request } = useHttp()
  const [modalOpen, setModalOpen] = useState(false);
  // const [selectLang, setselectLang] = useState(1);
  const [sellerInformation] = useContext(SellerMainData);

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage(currentLang);
    }
    setLanguageDetector({ typeLang: currentLang });
  }, [currentLang]);


  const LanguageList = [
    { id: 1, value: "uz", type: "O'zbekcha", icons: UzbekFlag },
    { id: 2, value: "ru", type: "Русский", icons: RussianFlag },
  ];

  const [openLang, setOpenLang] = useState(false);
  const handleOpenChangeLang = (newOpen) => {
    setOpenLang(newOpen);
  };
  const handleLangValue = (value) => {
    i18n.changeLanguage(value);
    setCurrentLang(value);
    setOpenLang(false);
  };

  const contentLang = (
    <section className="w-[250px] h-fit m-0 p-0">
      {LanguageList.map((data) => {
        return (
          <article
            key={data?.value}
            className={`p-2 gap-x-2 text-sm cursor-pointer hover:bg-bgColor flex items-center justify-start  ${dressInfo?.ColorSeason}`}
            onClick={() => {
              handleLangValue(data?.value);
            }}
          >
            <figure className="mr-[6px]  w-5 h-5">
              <img className="w-full h-full" src={data?.icons} alt="" />
            </figure>
            <article
              className={`text-lg not-italic font-AeonikProMedium leading-5  ${dressInfo?.ColorSeason}`}
            >
              {data?.type}
            </article>
          </article>
        );
      })}
    </section>
  );

  const navigate = useNavigate();
  // -----------------------Seller Delete---------------
  const HandleLogOutSeller = useMutation(() => {
    return request({ url: `/logout`, method: "POST", token: true });
  });
  const logOutHandle = () => {
    HandleLogOutSeller.mutate({}, {
      onSuccess: res => {
        if (res?.message) {
          localStorage.clear();
          navigate("/login-seller")
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
          // setDressInfo({ ...dressInfo, logOutSeller: false })
        }
      },
      onError: err => {

      }
    })
  }
  return (
    <div className="w-full h-full flex ">
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
      <div
        className={`fixed cursor-pointer z-[999999] inset-0 w-full h-full bg-black opacity-80 ${modalOpen ? "" : "hidden"
          }`}
        onClick={() => setModalOpen(false)}
      ></div>
      <div
        className={`fixed hidden md:block w-[300px] h-[100vh] top-0 left-0  border border-lightBorderColor bg-lightBgColor
    `}
      >
        <div className="flex flex-wrap content-between w-full h-full pb-10">
          <div className="w-full pt-5  px-2 flex flex-wrap gap-y-[44px]">
            <div className="w-full h-fit select-none  flex items-center gap-x-4 pl-2 cursor-pointer">
              <button className="md:w-[56px] md:h-[56px] rounded-full md:border border-lightBorderColor bg-white flex items-center justify-center">
                <NavbarUserIcon colors="#c5c5c5" />
              </button>
              <span className="text-black flex items-center gap-x-2 text-xl not-italic font-AeonikProRegular">
                <span>{sellerInformation?.sellerUserData?.name}</span>
                <span>{sellerInformation?.sellerUserData?.surname}</span>
                {/* <span>Ism familiya</span> */}
              </span>
            </div>

            {/* Links */}
            {dressInfo?.isAuthen ? (
              <div className="w-full flex flex-wrap gap-y-2">
                {" "}
                <NavLink
                  className={
                    "w-full  hover:bg-lightBgColor h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-start capitalize"
                  }
                  style={({ isActive }) => ({
                    background: isActive ? "#f2f2f2" : "#fcfcfc",
                  })}
                  to={"/reviews"}
                >
                  {({ isActive }) =>
                    isActive ? (
                      <figure className="flex h-full gap-x-[15px] items-center justify-center">
                        <NavbarReviewIcon colors={"#007dca"} />
                        <p className="text-lg not-italic font-AeonikProMedium leading-5">
                          {t("reviews")}
                        </p>
                      </figure>
                    ) : (
                      <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                        <NavbarReviewIcon colors={"#2c2c2c"} />
                        <p className="text-lg not-italic font-AeonikProMedium leading-5">
                          {t("reviews")}
                        </p>
                      </figure>
                    )
                  }
                </NavLink>
                <NavLink
                  className={
                    "w-full  hover:bg-lightBgColor h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-start capitalize"
                  }
                  style={({ isActive }) => ({
                    background: isActive ? "#f2f2f2" : "#fcfcfc",
                  })}
                  to={"/store"}
                >
                  {({ isActive }) =>
                    isActive ? (
                      <figure className="flex h-full gap-x-[15px] items-center justify-center">
                        <NavbarMarketIcon colors={"#007dca"} />
                        <p className="text-lg not-italic font-AeonikProMedium leading-5">
                          {t("shop")}
                          {shopList?.shops?.length > 1 ? (
                            <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                              {t("ShopS")}
                            </span>
                          ) : (
                            ""
                          )}
                        </p>
                      </figure>
                    ) : (
                      <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                        <NavbarMarketIcon colors={"#2c2c2c"} />
                        <p className="text-lg not-italic font-AeonikProMedium leading-5">
                          {t("shop")}
                          {shopList?.shops?.length > 1 ? (
                            <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                              {t("ShopS")}
                            </span>
                          ) : (
                            ""
                          )}
                        </p>
                      </figure>
                    )
                  }
                </NavLink>
                <NavLink
                  className={
                    "w-full  hover:bg-lightBgColor h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-start capitalize"
                  }
                  style={({ isActive }) => ({
                    background: isActive ? "#f2f2f2" : "#fcfcfc",
                  })}
                  to={"/locations-store"}
                >
                  {({ isActive }) =>
                    isActive ? (
                      <figure className="flex h-full gap-x-[15px] items-center justify-center">
                        <LocationIcon colors={"#007dca"} />
                        <p className="text-lg not-italic font-AeonikProMedium leading-5">
                          {t("locations")}
                        </p>
                      </figure>
                    ) : (
                      <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                        <LocationIcon colors={"#2c2c2c"} />
                        <p className="text-lg not-italic font-AeonikProMedium leading-5">
                          {t("locations")}
                        </p>
                      </figure>
                    )
                  }
                </NavLink>
                <NavLink
                  className={
                    "w-full hover:bg-lightBgColor h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-start capitalize"
                  }
                  style={({ isActive }) => ({
                    background: isActive ? "#f2f2f2" : "#fcfcfc",
                  })}
                  to={"/products"}
                >
                  {({ isActive }) =>
                    isActive ? (
                      <figure className="flex h-full gap-x-[15px] items-center justify-center pl-1">
                        <ClothesIcons
                          colors={"#007dca"}
                          className="ml-[2px] "
                        />
                        <p className="text-lg not-italic font-AeonikProMedium leading-5">
                          {t("products")}
                        </p>
                      </figure>
                    ) : (
                      <figure className=" flex h-full gap-x-[15px] items-center justify-center pl-1">
                        <ClothesIcons
                          colors={"#2c2c2c"}
                          className="ml-[2px] "
                        />
                        <p className="text-lg not-italic font-AeonikProMedium leading-5">
                          {t("products")}
                        </p>
                      </figure>
                    )
                  }
                </NavLink>
              </div>
            ) : (
              <div className="w-full flex flex-wrap gap-y-2">
                {" "}
                <p
                  className={
                    "w-full h-[54px] gap-x-[15px] text-borderColor2 px-[25px]  flex items-center justify-start capitalize"
                  }
                >
                  <span>
                    <NavbarReviewIcon colors="#c5c5c5" />
                  </span>
                  <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                    {t("reviews")}
                  </span>
                </p>
                <p
                  className={
                    "w-full h-[54px] gap-x-[15px] text-borderColor2 px-[25px]  flex items-center justify-start capitalize"
                  }
                >
                  <span>
                    <NavbarMarketIcon colors="#c5c5c5" />
                  </span>
                  <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                    {t("shop")}
                    {shopList?.shops?.length > 1 ? (
                      <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                        {t("ShopS")}
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                </p>
                <p
                  className={
                    "w-full h-[54px] gap-x-[15px] text-borderColor2 px-[25px]  flex items-center justify-start capitalize"
                  }
                >
                  <span>
                    <LocationIcon colors="#c5c5c5" />
                  </span>
                  <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                    {t("locations")}
                  </span>
                </p>
                <p
                  className={
                    "w-full h-[54px] gap-x-[15px] text-borderColor2 px-[25px]  flex items-center justify-start capitalize"
                  }
                >
                  <span>
                    <ClothesIcons colors="#c5c5c5" />
                  </span>
                  <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                    {t("products")}
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="w-full px-2  flex flex-col gap-y-1">
            <section className="w-full hover:bg-lightBorderColor rounded-lg  bg-transparent  h-fit font-AeonikProMedium select-none cursor-pointer">
              {LanguageList.filter((data) => data?.value === currentLang).map(
                (data) => {
                  return (
                    <Popover
                      key={data?.id}
                      open={openLang}
                      onOpenChange={handleOpenChangeLang}
                      className="w-full  h-[54px] gap-x-[15px] px-[25px] flex items-center justify-start capitalize "
                      trigger="click"
                      options={["Hide"]}
                      placement="top"
                      content={contentLang}
                    >
                      <span className="mr-[6px] ">
                        <img src={data?.icons} alt="" />
                      </span>
                      <p className="text-lg not-italic font-AeonikProMedium leading-5 ">
                        {data?.type}
                      </p>
                    </Popover>
                  );
                }
              )}
            </section>
            <NavLink
              className={
                "w-full hover:bg-lightBgColor h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-start capitalize"
              }
              style={({ isActive }) => ({
                background: isActive ? "#f2f2f2" : "#fcfcfc",
              })}
              to="/edit-profile"
            >
              {({ isActive }) =>
                isActive ? (
                  <figure className="flex h-full gap-x-[15px] items-center justify-center">
                    <UserIcon colors={"#007dca"} />
                    <p className="text-lg not-italic font-AeonikProMedium leading-5">
                      {t("profile")}
                    </p>
                  </figure>
                ) : (
                  <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                    <UserIcon colors={"#2c2c2c"} />
                    <p className="text-lg not-italic font-AeonikProMedium leading-5">
                      {t("profile")}
                    </p>
                  </figure>
                )
              }
            </NavLink>

            <button
              // onClick={() => setDressInfo({ ...dressInfo, logOutSeller: true })}
              onClick={() => setModalOpen(true)}
              className="w-full group h-fit cursor-pointer py-3 px-[25px] hover:bg-lightBorderColor rounded-lg  flex items-center gap-x-4"
            >
              <UserExitIcon colors={"#FF4343"} />{" "}
              <span
                className={` text-black text-redText text-lg not-italic font-AeonikProMedium leading-5`}
              >
                {t("logOut")}
              </span>
            </button>
            {/* <ExitModal setModalOpen={setModalOpen} modalOpen={modalOpen} /> */}
          </div>
        </div>
      </div>
      <div className=" w-full md:w-[calc(100%-300px)] md:ml-[300px] ">
        <section
          className={`absolute max-w-[90%] md:max-w-[550px] z-[1000000] mx-auto w-full flex-col h-fit bg-white fixed py-[30px] md:py-[35px] px-[20px] md:px-[50px] rounded-t-lg rounded-b-lg md:top-[50%] duration-300 overflow-hidden left-1/2 right-1/2 translate-x-[-50%] translate-y-[-50%] hidden ${modalOpen ? "bottom-0 md:flex" : "md:hidden z-[-10]"
            }`}
        >
          <button
            onClick={() => setModalOpen(false)}
            type="button"
            className="absolute  right-3 top-3 w-5 h-5 "
          >
            <MenuCloseIcons className="w-full h-full" colors={"#a1a1a1"} />
          </button>
          <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
            <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
              {t("sure")}?
            </span>
          </div>
          <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
            <button
              onClick={() => setModalOpen(false)}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium"
            >
              {t("cancel")}
            </button>
            <button
              onClick={logOutHandle}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center gap-x-2 justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium"
            >
              <UserExitIcon colors={"#fff"} /> <span>{t("logOut")}</span>
            </button>
          </div>
        </section>
        <Outlet />
      </div>
      <article>
        <ScrollToTop
          smooth
          top="600"
          color="#000"
          component={<MySVG />}
          style={{
            borderRadius: "50%",
            bottom: 70,
            right: 25,
            width: "48px",
            height: "48px",
            border: "1px solid #c1c1c1",
            backgroundColor: "#fafafa",
          }}
          className="bg-bgColor rounded-full mt-[-100px] !z-[11] flex items-center opacity-70 justify-center ss:bottom-[75px] ss:right-[15px] md:bottom-10 md:right-10"
        />
      </article>
    </div>
  );
}
export default React.memo(Sidebar)
