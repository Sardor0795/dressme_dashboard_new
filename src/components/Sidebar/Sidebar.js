import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  ClothesIcons,
  LocationIcon,
  MenuCloseIcons,
  NavbarMarketIcon,
  NavbarReviewIcon,
  NavbarUserIcon,
  ProfileIcon,
  UserExitIcon,
  UserIcon,
} from "../../assets/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { dressMainData } from "../../hook/ContextTeam";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Sidebar() {
  const navigate = useNavigate()
  const [dressInfo, setDressInfo] = useContext(dressMainData);

  const [state, setState] = useState({
    email: "",
    password: "",
    logOutModal: false
  });

  // const [logOutModal, setLogOutModal] = useState(false)
  const location = useLocation();
  const [locationWindow, setLocationWindow] = useState("");

  useEffect(() => {
    setLocationWindow(location.pathname);
  }, [location.pathname]);
  const url = "https://api.dressme.uz/api/seller"

  // -----------------------Seller Delete---------------
  const { mutate } = useMutation(() => {
    return fetch(`${url}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,

      },
    }).then((res) => res.json());
  });

  const logOutHandle = () => {
    mutate({}, {
      onSuccess: res => {
        if (res?.message) {
          localStorage.clear();
          navigate("/login-seller")
          window.location.reload();
          setState({ ...state, logOutModal: false })
          console.log(res, "logOut");
          toast.success(`${res?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      },
      onError: err => {

      }
    })
  }

  return (
    <div
      className={`relative hidden md:block w-[300px] h-[100vh] fixed top-0 left-0  border border-lightBorderColor bg-lightBgColor
    `}
    >
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
      <div className="flex flex-wrap content-between w-full h-full pb-10">
        <div className="w-full pt-5  px-2 flex flex-wrap gap-y-[44px]">
          <NavLink
            to={"/sign-up"}
            className="w-full h-fit  flex items-center gap-x-4 pl-2 cursor-pointer"
          >
            <button className="md:w-[56px] md:h-[56px] rounded-full md:border border-lightBorderColor bg-white flex items-center justify-center cursor-pointer">
              <NavbarUserIcon colors="#c5c5c5" />
            </button>
            <span className="text-black flex items-center gap-x-2 text-xl not-italic font-AeonikProRegular">
              {dressInfo?.sellerFname || "Ism"}
              {dressInfo?.sellerLname || "Familiya"}
            </span>
          </NavLink>
          {/* <div>
            <p>
              {
                localStorage.getItem("DressmeUserToken")
              }
              getItem
            </p>
            <p>

              {
                dressInfo?.AccessTokenSeller
              }
              dressMe
            </p>
          </div> */}
          {/* Links */}
          {dressInfo?.sellerStatus == "approved" && (
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
                        Отзывы
                      </p>
                    </figure>
                  ) : (
                    <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                      <NavbarReviewIcon colors={"#2c2c2c"} />
                      <p className="text-lg not-italic font-AeonikProMedium leading-5">
                        Отзывы
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
                        Магазины
                      </p>
                    </figure>
                  ) : (
                    <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                      <NavbarMarketIcon colors={"#2c2c2c"} />
                      <p className="text-lg not-italic font-AeonikProMedium leading-5">
                        Магазины
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
                        Локации
                      </p>
                    </figure>
                  ) : (
                    <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                      <LocationIcon colors={"#2c2c2c"} />
                      <p className="text-lg not-italic font-AeonikProMedium leading-5">
                        Локации
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
                        Одежда
                      </p>
                    </figure>
                  ) : (
                    <figure className=" flex h-full gap-x-[15px] items-center justify-center pl-1">
                      <ClothesIcons
                        colors={"#2c2c2c"}
                        className="ml-[2px] "
                      />
                      <p className="text-lg not-italic font-AeonikProMedium leading-5">
                        Одежда
                      </p>
                    </figure>
                  )
                }
              </NavLink>
            </div>
          )}
          {dressInfo?.sellerStatus == "pending" &&
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
                  Отзывы
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
                  Магазины
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
                  Локации
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
                  Одежда
                </span>
              </p>
            </div>}


          <div className="w-full">
            <div className="w-full flex items-center justify-center">
              {dressInfo.isItPorduct ? (
                <button
                  onClick={() =>
                    setDressInfo({ ...dressInfo, isItPorduct: false })
                  }
                  className="w-full py-3 px-5 mx-auto mt-10 rounded-lg flex items-center justify-center bg-green-400"
                >
                  has Product
                </button>
              ) : (
                <button
                  onClick={() =>
                    setDressInfo({ ...dressInfo, isItPorduct: true })
                  }
                  className="w-full py-3 px-5 mx-auto mt-10 rounded-lg flex items-center justify-center bg-red-400"
                >
                  no Product
                </button>
              )}
            </div>
            <div className=" w-full">
              {dressInfo.isAuthen ? (
                <button
                  onClick={() =>
                    setDressInfo({ ...dressInfo, isAuthen: false })
                  }
                  className="w-full py-3 px-5 mx-auto mt-10 rounded-lg flex items-center justify-center bg-green-400"
                >
                  has authentication
                </button>
              ) : (
                <button
                  onClick={() => setDressInfo({ ...dressInfo, isAuthen: true })}
                  className="w-full py-3 px-5 mx-auto mt-10 rounded-lg flex items-center justify-center bg-red-400"
                >
                  no authentication
                </button>
              )}
            </div>
          </div>

        </div>

        <div className="w-full px-2  flex flex-col gap-y-1">
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
                    Профиль
                  </p>
                </figure>
              ) : (
                <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                  <UserIcon colors={"#2c2c2c"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    Профиль
                  </p>
                </figure>
              )
            }
          </NavLink>
          <button
            onClick={() => setState({ ...state, logOutModal: true })}
            className="w-full group h-fit cursor-pointer py-3 px-[25px] hover:bg-lightBorderColor rounded-lg  flex items-center gap-x-4">
            <UserExitIcon colors={"#FF4343"} />{" "}
            <span
              className={` text-black text-redText text-lg not-italic font-AeonikProMedium leading-5`}
            >
              Выйти
            </span>
          </button>
          <div
            onClick={() => setState({ ...state, logOutModal: false })}
            className={`fixed inset-0 z-[99998] cursor-pointer duration-200 w-full h-[100vh] bg-black opacity-50
         ${state?.logOutModal ? "" : "hidden"
              }`}
          ></div>
          {/* Delete Account Of Pop Confirm */}
          <section
            className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[99999] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.logOutModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
              }`}

          >
            <button
              onClick={() => setState({ ...state, logOutModal: false })}
              type="button"
              className="absolute  right-3 top-3 w-5 h-5 ">
              <MenuCloseIcons
                className="w-full h-full"
                colors={"#a1a1a1"} />
            </button>
            <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
              {/* <span className="w-10 h-10 rounded-full border border-[#FF4747] flex items-center justify-center">
                <span className="cursor-pointer active:translate-y-[2px] text-[#FF4747] transition-colors duration-[0.2s] ease-linear">
                  <DeleteIcon width={30} />
                </span>
              </span> */}
              <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
                Вы уверены?
              </span>

            </div>
            <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
              <button
                onClick={() => setState({ ...state, logOutModal: false })}
                type="button"
                className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
                Oтмена
              </button>
              <button
                onClick={logOutHandle}
                type="button"
                className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center gap-x-2 justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
                <UserExitIcon colors={"#fff"} />{" "}
                <span>Выйти</span>
              </button>
            </div>

          </section>
        </div>
      </div>
    </div >
  );
}
