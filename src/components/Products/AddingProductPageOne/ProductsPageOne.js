import React, { useEffect } from "react";
import AddingProduct from "./AddingProduct/AddingProduct";
import MobileHumburgerMenu from "../../Navbar/mobileHamburgerMenu/MobileMenu";

export default function ProductsPageOne() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div>
      <div className="w-full pt-6 md:pb-4 px-4 md:px-0 md:py-4 md:border-b border-lightBorderColor block">

        <div className="flex items-center md:justify-between mb-6 md:mb-0">
          <section className="w-full md:w-fit  flex justify-center md:justify-start">
            <button className="absolute left-4 md:hidden flex">
              <MobileHumburgerMenu />
            </button>
            <p className="text-black text-[20px] ll:text-2xl not-italic font-AeonikProMedium ">
              Добавить одежду
            </p>
          </section>

        </div>
      </div>
      <div className="w-full max-w-[1540px] mx-auto">
        <div className="w-full">
          <AddingProduct />
        </div>
      </div>
    </div>

  );
}
