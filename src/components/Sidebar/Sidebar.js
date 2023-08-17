import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  ClothesIcons,
  LocationIcon,
  NavbarMarketIcon,
  NavbarReviewIcon,
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
      className={`hidden md:block w-[300px] h-[100vh] fixed top-0 left-0 border border-lightBorderColor bg-lightBgColor
        ${locationWindow !== "/store" ? "block" : "hidden"}
    `}
    >
      <div className="w-full h-[80px] flex items-center justify-center">
        <p className="w-fit text-black text-3xl not-italic font-AeonikProMedium">
          RED TAG (store)
        </p>
      </div>
      <div className="w-full py-[25px] px-2 flex flex-wrap gap-y-2">
        <NavLink
          className={
            "w-full h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-start capitalize"
          }
          style={({ isActive }) => ({
            color: isActive ? "#007DCA" : "#000",
            background: isActive ? "#f2f2f2" : "#fcfcfc",
          })}
          to={"/reviews1"}
        >
          <span>
            <NavbarReviewIcon colors={""} />
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
            <NavbarMarketIcon colors={""} />
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
            <ClothesIcons colors={""} />
          </span>
          <span className=" text-lg not-italic font-AeonikProMedium leading-5">
            Одежда
          </span>
        </NavLink>
        <div>
          {dressInfo.isItPorduct ? (
            <button
              onClick={() => setDressInfo({ ...dressInfo, isItPorduct: false })}
              className="w-full py-3 px-5 mx-auto mt-10 rounded-lg flex items-center justify-center bg-green-400"
            >
              has Product
            </button>
          ) : (
            <button
              onClick={() => setDressInfo({ ...dressInfo, isItPorduct: true })}
              className="w-full py-3 px-5 mx-auto mt-10 rounded-lg flex items-center justify-center bg-red-400"
            >
              no Product
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
