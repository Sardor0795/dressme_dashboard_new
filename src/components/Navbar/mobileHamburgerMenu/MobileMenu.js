import { Button, Modal, Popover } from "antd";
import {
  ClothesIcons,
  LocationIcon,
  MobileNavMenu,
  NavbarMarketIcon,
  NavbarReviewIcon,
  UserExitIcon,
  UserIcon,
} from "../../../assets/icons";
import i18next from "i18next";
import { RussianFlag, UzbekFlag } from "../../../assets";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { dressMainData } from "../../../hook/ContextTeam";
import { useHttp } from "../../../hook/useHttp";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LanguageDetectorDress } from "../../../language/LanguageItem";
import { useTranslation } from "react-i18next";
export default function MobileHumburgerMenu() {
  const { request } = useHttp();
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { i18n, t } = useTranslation("mobileMenu");

  const [openLang, setOpenLang] = useState(false);
  const handleOpenChangeLang = (newOpen) => {
    setOpenLang(newOpen);
  };

  const [languageDetector, setLanguageDetector] = useContext(
    LanguageDetectorDress
  );
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem("i18nextLng")
  );

  // -----------------------Seller Delete---------------
  const HandleLogOutSeller = useMutation(() => {
    return request({ url: `/logout`, method: "POST", token: true });
  });
  const logOutHandle = () => {
    HandleLogOutSeller.mutate(
      {},
      {
        onSuccess: (res) => {
          setIsModalOpen(false);
          if (res?.message) {
            localStorage.clear();
            navigate("/login-seller");
            window.location.reload();
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
            setDressInfo({ ...dressInfo, logOutSeller: false });
          }
        },
      }
    );
  };

  const LanguageList = [
    { id: 1, value: "uz", type: "O'zbekcha", icons: UzbekFlag },
    { id: 2, value: "ru", type: "Русский", icons: RussianFlag },
  ];

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

  const contentLang = (
    <section className="w-[140px] h-fit m-0 p-0">
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
              className={`text-base not-italic font-AeonikProMedium leading-5  ${dressInfo?.ColorSeason}`}
            >
              {data?.type}
            </article>
          </article>
        );
      })}
    </section>
  );

  return (
    <div className="flex md:hidden items-center">
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
      <button type="primary" onClick={showModal}>
        <MobileNavMenu />
      </button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closeIcon={false}
        footer={null}
      >
        <div className="w-full flex flex-wrap gap-y-5  justify-center   ">
          <NavLink
            className={
              "w-full h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-start  "
            }
            style={({ isActive }) => ({
              background: isActive ? "#f2f2f2" : "#fcfcfc",
            })}
            to={"/reviews"}
            onClick={() => setIsModalOpen(false)}
          >
            {({ isActive }) =>
              isActive ? (
                <figure className="w-[150px] mx-auto flex h-full gap-x-[15px] items-center justify-start  ">
                  <NavbarReviewIcon colors={"#007dca"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    {t("reviews")}
                  </p>
                </figure>
              ) : (
                <figure className="w-[150px] mx-auto flex h-full gap-x-[15px] items-center justify-start  ">
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
              "w-full h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-center  "
            }
            style={({ isActive }) => ({
              background: isActive ? "#f2f2f2" : "#fcfcfc",
            })}
            to={"/store"}
            onClick={() => setIsModalOpen(false)}
          >
            {({ isActive }) =>
              isActive ? (
                <figure className="w-[150px] mx-auto flex h-full gap-x-[15px] items-center justify-start  ">
                  <NavbarMarketIcon colors={"#007dca"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    {t("shops")}
                  </p>
                </figure>
              ) : (
                <figure className="w-[150px] mx-auto flex h-full gap-x-[15px] items-center justify-start  ">
                  <NavbarMarketIcon colors={"#2c2c2c"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    {t("shops")}
                  </p>
                </figure>
              )
            }
          </NavLink>

          <NavLink
            className={
              "w-full h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-center  "
            }
            style={({ isActive }) => ({
              background: isActive ? "#f2f2f2" : "#fcfcfc",
            })}
            to={"/locations-store"}
            onClick={() => setIsModalOpen(false)}
          >
            {({ isActive }) =>
              isActive ? (
                <figure className="w-[150px] mx-auto flex h-full gap-x-[15px] items-center justify-start  ">
                  <LocationIcon colors={"#007dca"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    {t("locations")}
                  </p>
                </figure>
              ) : (
                <figure className=" w-[150px] mx-auto flex h-full gap-x-[15px] items-center justify-start  ">
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
              "w-full h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-center  "
            }
            style={({ isActive }) => ({
              background: isActive ? "#f2f2f2" : "#fcfcfc",
            })}
            to={"/products"}
            onClick={() => setIsModalOpen(false)}
          >
            {({ isActive }) =>
              isActive ? (
                <figure className="w-[150px] pl-[1px] mx-auto flex h-full gap-x-[15px] items-center justify-start  ">
                  <ClothesIcons colors={"#007dca"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    {t("products")}
                  </p>
                </figure>
              ) : (
                <figure className="w-[150px] pl-[1px] mx-auto flex h-full gap-x-[15px] items-center justify-start  ">
                  <ClothesIcons colors={"#2c2c2c"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    {t("products")}
                  </p>
                </figure>
              )
            }
          </NavLink>
        </div>
        <div className=" flex items-center justify-between gap-x-2 border-t border-borderColor w-full mt-2 pt-2">
          <button
            onClick={logOutHandle}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95 active:opacity-70 flex items-center gap-x-2 justify-center rounded-[12px]  border-textRedColor text-white bg-[#FF4747] h-[42px] px-4 text-center text-base not-italic font-AeonikProMedium"
          >
            <UserExitIcon colors={"#fff"} /> <span>{t("exit")}</span>
          </button>
          <section className="w-1/2 xs:w-[45%] bg-lightBorderColor rounded-lg  h-fit font-AeonikProMedium select-none cursor-pointer">
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
                    <p className="text-base not-italic font-AeonikProMedium leading-5 ">
                      {data?.type}
                    </p>
                  </Popover>
                );
              }
            )}
          </section>
        </div>
        <div className="w-full mt-5 ">
          <NavLink
            onClick={() => setIsModalOpen(false)}
            className={
              "w-full h-[42px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-[12px] flex items-center justify-center"
            }
            style={({ isActive }) => ({
              background: isActive ? "#f2f2f2" : "#fcfcfc",
            })}
            to="/edit-profile"
          >
            {({ isActive }) =>
              isActive ? (
                <figure className="w-full mx-auto flex h-full gap-x-[15px] items-center justify-center">
                  <UserIcon colors={"#007dca"} />
                  <p className="text-base not-italic font-AeonikProMedium ">
                    {t("profil")}
                  </p>
                </figure>
              ) : (
                <figure className="w-full mx-auto flex h-full gap-x-[15px] items-center justify-center">
                  <UserIcon colors={"#2c2c2c"} />
                  <p className="text-base not-italic font-AeonikProMedium ">
                    {t("profil")}
                  </p>
                </figure>
              )
            }
          </NavLink>
        </div>
      </Modal>
    </div>
  );
}
