import React, { useContext, useEffect } from "react";
import AddingProduct from "./AddingProduct/AddingProduct";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { GoBackIcons } from "../../../assets/icons";
import { dressMainData } from "../../../hook/ContextTeam";
import { useTranslation } from "react-i18next";
import { BackBtn } from "../../backBtn/backBtn";
import { ShopLocationProductList } from "../../../hook/ShopLocationProductList";

export default function ProductsPageOne() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const { t } = useTranslation("product");
  const [shopLocationProductList, setShopLocationProductList] = useContext(ShopLocationProductList)

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  const navigate = useNavigate();
  // console.log(dressInfo?.nextPageShowForm);

  return (
    <div>
      <div className="w-full pt-6 md:pb-4 md:py-4 md:border-b border-lightBorderColor block">
        <div className="w-full flex items-center md:justify-between mb-6 md:mb-0">
          <section className="w-full md:w-fit flex justify-center md:justify-start">
            <section className="w-full md:w-fit flex justify-start">
              {shopLocationProductList[0]?.products?.length >= 1 ? (
                <BackBtn />
              ) : (
                !dressInfo?.nextPageShowForm && (
                  <>
                    {" "}
                    <button
                      button
                      onClick={() =>
                        setDressInfo({ ...dressInfo, nextPageShowForm: true })
                      }
                      className="w-8 h-8 hidden md:flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
                    >
                      <AiOutlineLeft />
                    </button>
                    <button
                      onClick={() =>
                        setDressInfo({ ...dressInfo, nextPageShowForm: true })
                      }
                      className="  md:hidden absolute left-0 flex items-center cursor-pointer "
                    >
                      <GoBackIcons />
                    </button>
                  </>
                )
              )}
              <p
                className={`w-full md:w-fit text-center text-black text-[20px] ll:text-2xl not-italic font-AeonikProMedium md:ml-[30px] `}
              >
                {t("APaddProduct")}
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
