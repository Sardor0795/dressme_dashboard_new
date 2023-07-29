import React from "react";
import { NavbarUserIcon, SearchIcon } from "../../assets/icons";
import MobileHumburgerMenu from "./mobileHamburgerMenu/MobileMenu";

export default function NavbarForSetting() {
  return (
    <div className="w-full pt-6 pb-3 md:py-0 md:h-[80px] border-b md:border border-lightBorderColor flex items-center justify-end border-l-0 md:bg-lightBgColor px-4 md:px-[40px]">
      
      {/* Mobile Main Hamburger Menu */}
      <MobileHumburgerMenu/>

      {/* Mobile Main Menu Search Section */}
      <div className="ml-auto block md:hidden mr-4 cursor-pointer">
        <SearchIcon />
      </div>
      
      {/* Mobile Main Menu User Section */}
      <button className="md:w-[56px] md:h-[56px] rounded-full md:border border-lightBorderColor bg-white flex items-center justify-center cursor-pointer">
        <NavbarUserIcon colors={""} />
      </button>

    </div>
  );
}
