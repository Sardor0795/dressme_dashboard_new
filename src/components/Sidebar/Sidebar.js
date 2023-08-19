import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  ClothesIcons,
  LocationIcon,
  NavbarMarketIcon,
  NavbarReviewIcon,
  NavbarUserIcon,
  ProfileIcon,
  UserExitIcon,
  UserIcon,
} from "../../assets/icons";
import { useLocation } from "react-router-dom";
import { dressMainData } from "../../hook/ContextTeam";

export default function Sidebar() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);

  const location = useLocation();
  const [locationWindow, setLocationWindow] = useState("");

  useEffect(() => {
    setLocationWindow(location.pathname);
  }, [location.pathname]);

  return (
    <div
      className={`hidden md:block w-[300px] h-[100vh] fixed top-0 left-0  border border-lightBorderColor bg-lightBgColor
        ${locationWindow !== "/store" ? "block" : "hidden"}
    `}
    >
      <div className="flex flex-wrap content-between w-full h-full pb-10">
        <div className="w-full pt-5  px-2 flex flex-wrap gap-y-[44px]">
          <div className="w-full h-fit  flex items-center gap-x-4 pl-2 cursor-pointer">
            <button className="md:w-[56px] md:h-[56px] rounded-full md:border border-lightBorderColor bg-white flex items-center justify-center cursor-pointer">
              <NavbarUserIcon colors="#c5c5c5" />
            </button>
            <span className="text-black text-xl not-italic font-AeonikProRegular">
              Самандар
            </span>
          </div>
          {/* Links */}
          {dressInfo?.isAuthen ? (
            <div className="w-full flex flex-wrap gap-y-2">
              {" "}
              <NavLink
                className={
                  "w-full h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-start capitalize"
                }
                style={({ isActive }) => ({
                  color: isActive ? "#007DCA" : "#000",
                  background: isActive ? "#f2f2f2" : "#fcfcfc",
                })}
                to={"/reviews"}
              >
                <span>
                  <NavbarReviewIcon colors="#2c2c2c" />
                </span>
                <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                  Отзывы
                </span>
              </NavLink>
              <NavLink
                className={`w-full h-[54px] gap-x-[15px] px-[25px] flex items-center justify-start capitalize bg-lightBorderColor rounded-lg`}
                style={({ isActive }) => ({
                  color: isActive ? "#007DCA" : "#000",
                  background: isActive ? "#f2f2f2" : "#fcfcfc",
                })}
                to={"/store"}
              >
                <span>
                  <NavbarMarketIcon colors={"#2c2c2c"} />
                </span>
                <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                  Магазины
                </span>
              </NavLink>
              <NavLink
                className={
                  "w-full h-[54px] gap-x-[15px] px-[25px] flex items-center justify-start capitalize bg-lightBorderColor rounded-lg"
                }
                style={({ isActive }) => ({
                  color: isActive ? "#007DCA" : "#000",
                  background: isActive ? "#f2f2f2" : "#fcfcfc",
                })}
                to={"/locations-store"}
              >
                <span>
                  <LocationIcon colors="#2c2c2c" />
                </span>
                <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                  Локации
                </span>
              </NavLink>
              <NavLink
                className={
                  "w-full h-[54px] gap-x-[15px] px-[25px] flex items-center justify-start capitalize bg-lightBorderColor rounded-lg"
                }
                style={({ isActive }) => ({
                  color: isActive ? "#007DCA" : "#000",
                  background: isActive ? "#f2f2f2" : "#fcfcfc",
                })}
                to={"/products"}
              >
                <span>
                  <ClothesIcons colors={"#2c2c2c"} />
                </span>
                <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                  Одежда
                </span>
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
            </div>
          )}

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
        <div className="w-full px-4 flex flex-col gap-y-1">
          <NavLink
            to="/profile"
            style={({ isActive }) => ({
              color: isActive ? "#007DCA" : "#000",
              // background: isActive ? "#f2f2f2" : "#fcfcfc",
            })}
            className="w-full h-fit cursor-pointer py-3   flex items-center gap-x-4"
          >
            <UserIcon />{" "}
            <span className=" text-lg not-italic font-AeonikProMedium leading-5">
              Профиль
            </span>
          </NavLink>
          <button className="w-full h-fit cursor-pointer py-3   flex items-center gap-x-4">
            <UserExitIcon />{" "}
            <span className="text-gray-900 text-lg not-italic font-AeonikProMedium leading-5">
              Выйти
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
