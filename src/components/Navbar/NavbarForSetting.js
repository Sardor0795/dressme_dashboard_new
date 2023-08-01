import React, { useState } from "react";
import { NavbarUserIcon, SearchIcon } from "../../assets/icons";
import MobileHumburgerMenu from "./mobileHamburgerMenu/MobileMenu";

export default function NavbarForSetting() {

  const [searchBtn, setSearchBtn] = useState(false)

  return (
    <>
      {/* Mobile Main Menu Search Section */}
        {searchBtn ? (
          <div className="w-full pt-6 pb-3 md:py-0 md:h-[80px] border-b md:border border-lightBorderColor flex items-center md:justify-end border-l-0 md:bg-lightBgColor px-4 md:px-[40px]">
            <div className="w-full flex items-center justify-between md:justify-end">  
              {/* Mobile Main Hamburger Menu */}
              <MobileHumburgerMenu />
              <div className="flex items-center">
                  <div className="block md:hidden mr-4 cursor-pointer">
                    <SearchIcon />
                  </div>   
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
              <MobileHumburgerMenu />
              
              {/* Mobile Main Menu User Section */}
              <div 
                onClick={() => setSearchBtn(false)}
                className="w-full ml-[30px] h-9 overflow-hidden border border-lightBorderColor flex items-center px-[10px] rounded-lg">
                  <input  
                    type="text"
                    className="w-full h-full text-[13px]"
                    placeholder="Поиск"
                  />
                  <span> <SearchIcon /> </span>
              </div>
              {/* Desktop Main Header User Section */}
              <button className="md:w-[56px] md:h-[56px] rounded-full md:border border-lightBorderColor bg-white flex items-center justify-center cursor-pointer">
                <NavbarUserIcon colors={""} />
              </button>
            </div>
          </div>
        )}
    </>
  )
}
