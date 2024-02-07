import React, { useEffect, useState } from "react";
import { BackIcon, NavbarUserIcon, SearchIcon } from "../../assets/icons";
import MobileHumburgerMenu from "./mobileHamburgerMenu/MobileMenu";
import { useLocation } from "react-router-dom";

export default function NavbarForSetting() {

  const [searchBtn, setSearchBtn] = useState(true)

  const location = useLocation();
  const [locationWindow, setLocationWindow] = useState("");
  useEffect(() => {
    setLocationWindow(location.pathname);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile Main Menu Search Section */}
      {searchBtn ? (
        <div className={`w-full pt-6 pb-3 md:py-0 md:h-[80px] border-b md:border border-lightBorderColor flex items-center md:justify-end border-l-0 md:bg-lightBgColor px-4 md:px-[40px]
            ${locationWindow !== '/review-details' ? "block" : "hidden"}
          `}
        >
          <div className="w-full flex items-center justify-between md:justify-end">
            {/* Mobile Main Hamburger Menu */}
            <MobileHumburgerMenu />
            <div className="flex items-center">
              <button
                onClick={() => setSearchBtn(false)}
                className="block md:hidden mr-4 cursor-pointer"
              >
                <SearchIcon />
              </button>
              {/* Mobile Main Menu User Section */}
              <button className="md:w-[56px] md:h-[56px] rounded-full md:border border-lightBorderColor bg-white flex items-center justify-center cursor-pointer">
                <NavbarUserIcon colors={""} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full pt-6 pb-3 md:py-0 md:h-[80px] border-b md:border border-lightBorderColor flex items-center md:justify-end border-l-0 md:bg-lightBgColor px-4 md:px-[40px]">
          <div className="w-full flex md:hidden items-center justify-between">
            {/* Mobile Main Hamburger Menu */}
            <button onClick={() => setSearchBtn(true)} >
              <BackIcon />
            </button>

            {/* Mobile Main Menu User Section */}
            <div
              className="w-full ml-[30px] h-9 overflow-hidden border border-lightBorderColor flex items-center px-[10px] rounded-lg">
              <input
                type="text"
                name="search"
                className="w-full h-full text-[13px] outline-none"
                placeholder="Поиск"
              />
              <span> <SearchIcon /> </span>
            </div>
          </div>
          {/* Desktop Main Header User Section */}
          <button className="md:w-[56px] md:h-[56px] rounded-full md:border border-lightBorderColor bg-white hidden md:flex items-center justify-center cursor-pointer">
            <NavbarUserIcon colors={""} />
          </button>
        </div>
      )}
    </>
  )
}
