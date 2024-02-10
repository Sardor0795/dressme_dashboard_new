import React, { useContext, useEffect } from "react";
import AddingProduct from "./AddingProduct/AddingProduct";
import MobileHumburgerMenu from "../../Navbar/mobileHamburgerMenu/MobileMenu";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { GoBackIcons } from "../../../assets/icons";
import { dressMainData } from "../../../hook/ContextTeam";

export default function ProductEditPage() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);

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

              {dressInfo?.isCheckPoructList?.length >= 1 && dressInfo?.nextPageShowForm ?
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="w-8 h-8 absolute md:relative md:left-0 left-4  md:mr-[30px] flex items-center cursor-pointer justify-center border border-borderColor rounded-lg active:scale-95  active:opacity-70"
                >
                  <GoBackIcons />
                </button>
                :
                !dressInfo?.nextPageShowForm ?
                  <><button
                    button
                    onClick={() => setDressInfo({ ...dressInfo, nextPageShowForm: true })}
                    className="w-8 h-8 hidden md:flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
                  >
                    <GoBackIcons />
                  </button>
                    <button
                      onClick={() => setDressInfo({ ...dressInfo, nextPageShowForm: true })}
                      className="  md:hidden absolute left-0 flex items-center cursor-pointer "
                    >
                      <GoBackIcons />
                    </button></>
                  :
                  <button
                    onClick={() => {
                      navigate(-1);
                    }}
                    className="w-8 h-8 absolute md:relative md:left-0 left-4  md:mr-[30px] flex items-center cursor-pointer justify-center border border-borderColor rounded-lg active:scale-95  active:opacity-70"
                  >
                    <GoBackIcons />
                  </button>
              }
              <p className={`text-black text-[20px] ll:text-2xl not-italic font-AeonikProMedium ${!dressInfo?.nextPageShowForm && "md:ml-[30px]"} `}>
                Изменить товар
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
    </div >

  );
}
