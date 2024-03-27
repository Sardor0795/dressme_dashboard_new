import React, { useContext, useEffect } from "react";
import AddingProduct from "./AddingProduct/AddingProduct";
import MobileHumburgerMenu from "../../Navbar/mobileHamburgerMenu/MobileMenu";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { GoBackIcons } from "../../../assets/icons";
import { dressMainData } from "../../../hook/ContextTeam";
import { useTranslation } from "react-i18next";
import { BackBtn } from "../../backBtn/backBtn";
import { ShopLocationProductList } from "../../../hook/ShopLocationProductList";

export default function ProductEditPage() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const { t } = useTranslation("product");
  const [shopLocationProductList, setShopLocationProductList] = useContext(ShopLocationProductList)

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-full pt-6 md:pb-4  md:py-4 md:border-b border-lightBorderColor block">
        <div className="flex items-center md:justify-between mb-6 md:mb-0">
          <section className="w-full md:w-fit  flex justify-center md:justify-start">
            <section className=" w-full md:w-fit  flex justify-center md:justify-start">
              {shopLocationProductList &&
                dressInfo?.nextPageShowForm ? (
                <>
                  <div className="md:hidden absolute left-[16px]">
                    <BackBtn />
                  </div>
                  <div className="hidden md:block mr-[30px]">
                    <BackBtn />
                  </div>
                </>
              ) : !dressInfo?.nextPageShowForm ? (
                <>
                  <div className="md:hidden absolute left-[16px]">
                    <BackBtn
                      onClick={() =>
                        setDressInfo({ ...dressInfo, nextPageShowForm: true })
                      }
                    />
                  </div>
                  <div className="hidden md:block mr-[30px]">
                    <BackBtn
                      onClick={() =>
                        setDressInfo({ ...dressInfo, nextPageShowForm: true })
                      }
                    />
                  </div>
                </>
              ) : (
                <div className="mr-2">
                  <BackBtn />
                </div>
              )}
              <p
                className={`text-black text-[20px] ll:text-2xl not-italic font-AeonikProMedium ${!dressInfo?.nextPageShowForm && ""
                  } `}
              >
                {t("PReditProduct")}
              </p>
            </section>
          </section>
        </div>
      </div>
      <div className="w-full max-w-[1540px] mx-auto ">
        <div className="w-full">
          <AddingProduct />
        </div>
      </div>
    </div>
  );
}
