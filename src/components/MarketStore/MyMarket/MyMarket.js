import React, { useContext, useEffect, useState } from "react";
import { SearchIcon } from "../../../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import MobileHumburgerMenu from "../../Navbar/mobileHamburgerMenu/MobileMenu";
import { useQuery } from "@tanstack/react-query";
import { deliveryIcon, man, woman } from "../../../assets";
import { useHttp } from "../../../hook/useHttp";
import { StarIcon } from "../../../assets/icons";
import { dressMainData } from "../../../hook/ContextTeam";
import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;

function MyMarket() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [searchName, setSearchName] = useState('');
  const navigate = useNavigate();

  // ------------GET METHOD delivery-method-----------------
  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const data = await axios.get(`${REACT_APP_BASE_URL}/delivery-method`, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
          }
        });
        if (data?.status >= 200 && data?.status < 300) {
          setDressInfo({ ...dressInfo, deliveryList: data?.data?.delivery_methods })
        }
      } catch (error) {

      }
    };
    if (!dressInfo?.deliveryList) {
      fetchDelivery();
    }
  }, []);


  const goDetail = (id) => {
    navigate(`/store/market-list/:${id}`);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  return (
    <div className="w-full h-full  py-1 px-4 md:px-10">
      <div className="w-full pt-6 pb-6 md:pb-4 md:py-4 md:border-b border-lightBorderColor block ">
        <div className="w-full flex items-center justify-center md:hidden">
          <div className="absolute left-4 ">
            <MobileHumburgerMenu />
          </div>
          <span className="text-2xl not-italic font-AeonikProMedium">
            Все магазины
          </span>
        </div>
        <div className="flex items-center justify-between border-t md:border-0 border-borderColor md:mt-0 md:pt-0 mt-4 pt-5">
          <section className="hidden md:block">
            <p className="text-black text-2xl not-italic font-AeonikProMedium">
              Все магазины{" "}
            </p>
          </section>

          <section className="w-full md:w-fit flex items-center justify-between md:justify-static ">
            <div className="w-full md:w-[400px] flex items-center justify-between md:justify-static gap-x-[15px]">
              <label
                htmlFor="searchStore"
                className=" w-full h-10 overflow-hidden border cursor-pointer  border-lightBorderColor flex items-center rounded-lg"
              >
                <input
                  type="text"
                  name="s"
                  id="searchStore"
                  value={searchName}
                  onChange={(e) => setSearchName(e?.target?.value)}
                  className="w-full h-full outline-0 px-[10px]"
                  placeholder="Поиск"
                />
                <span className="px-[10px] bg-lightBorderColor h-full flex items-center justify-center">
                  <SearchIcon />
                </span>
              </label>
            </div>
          </section>
        </div>
      </div>
      <div className="h-fit md:py-7 w-full flex items-center justify-end ">
        <Link
          to={"/store/market-add"}
          className="w-fit h-[42px] active:scale-95 rounded-lg flex items-center px-[10px] md:bg-weatherWinterColor text-weatherWinterColor  md:text-white text-[14px] md:text-base not-italic font-AeonikProMedium"
        >
          Создать новый магазин
        </Link>
      </div>
      <div className="w-full h-fit  flex flex-col gap-y-[30px] ">
        {dressInfo?.shopsList?.shops?.data?.filter(item => item?.name?.toLowerCase()?.includes(searchName?.toLowerCase()))?.map((data, index) => {
          return (
            <div
              key={data?.id}
              className="w-full h-fit md:h-[100px] border border-borderColor md:pr-10  p-[10px] md:p-0 rounded-lg flex md:flex-row flex-col justify-between items-center"
            >
              <div className="w-full md:w-fit flex flex-col md:flex-row items-center md:justify-start  md:border-0 border-b border-borderColor">
                <div className="w-full md:w-fit flex items-center justify-between  md:pr-7 md:pl-5 text-xl font-AeonikProRegular ">
                  <div className="w-[40%] border-b border-borderColor h-[2px] md:hidden"></div>
                  <span className="text-checkboxBorder md:text-black flex items-center">
                    <span className="md:hidden flex">0</span>
                    {index + 1}
                  </span>
                  <div className="w-[40%] border-b border-borderColor h-[2px] md:hidden"></div>
                </div>
                <div className="w-full md:w-fit flex items-center my-[15px] md:my-0 ">
                  <figure className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] overflow-hidden md:left-[40px] rounded-full border border-searchBgColor flex items-center justify-center bg-white">
                    <img
                      src={data?.url_logo_photo}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="w-fit flex flex-col ml-5 md:ml-8">
                    <p className="w-fit text-[13px] md:w-[350px] ls:text-[14px] xs:text-xl xs:font-AeonikProMedium font-AeonikProRegular  mb-3">
                      {data?.name || null}
                    </p>
                    <div className="w-full flex items-center">
                      <div className="w-fit flex items-center ">
                        <div className="w-fit flex items-center mr-[6px]">
                          <StarIcon />
                        </div>
                        <div className="not-italic font-AeonikProRegular  text-[10px] ls:text-xs leading-4 text-right text-gray-500 md:ml-1 flex items-center text-sm">
                          <p className="font-AeonikProRegular text-[12px] md:text-[14px] ls:font-AeonikProMedium text-black mr-1">
                            5.0
                          </p>
                          <p className="text-setTexOpacity font-AeonikProRegular text-[10px] ls:text-[12px] md:text-[14px] ">
                            (859 votes){" "}
                            <span className="ml-[5px] ll:ml-[10px]">|</span>{" "}
                          </p>
                          <p className="font-AeonikProRegular ml-[5px] ll:ml-[10px]  text-[10px] ls:text-[12px] md:text-[14px]  text-setTexOpacity">
                            4937 orders
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-fit flex items-center justify-between sm:gap-x-[130px] mt-3 md:mt-0">
                <div className="flex items-center gap-x-1 ">
                  {(Number(data?.gender_id) === 3 || Number(data?.gender_id) == 1) && <div className="ll:w-12 w-[36px] h-[36px] ll:h-12 rounded-lg border border-borderColor flex items-center justify-center">
                    <img src={man} alt="" />
                  </div>}
                  {(Number(data?.gender_id) === 3 || Number(data?.gender_id) == 2) && <div className="ll:w-12 w-[36px] h-[36px] ll:h-12 rounded-lg border border-borderColor flex items-center justify-center">
                    <img src={woman} alt="" />
                  </div>}
                </div>
                <div className="h-[36px] ll:h-12 px-1 ls:px-[10px] md:w-[260px] ll:px-5 active:opacity-70 border border-borderColor rounded-lg flex items-center justify-center gap-x-1 ll:gap-x-3 ">
                  <img src={deliveryIcon} alt="" />
                  {dressInfo?.deliveryList
                    ?.filter((e) => e.id == data?.delivery_id)
                    ?.map((item) => {
                      return (
                        <span
                          key={item?.id}
                          className="text-tableTextTitle2 text-[11px] ls:text-[12px] ll:text-[14px] xs:text-base not-italic font-AeonikProRegular ll:font-AeonikProMedium"
                        >
                          {item?.name_ru}
                        </span>
                      );
                    })}
                </div>
              </div>
              <div className="w-full md:w-fit flex items-center justify-between gap-x-4 sm:gap-x-[50px]  mt-4 ll:mt-6 md:mt-0">
                <button
                  onClick={() => navigate(`/store/locations/shop/:${data?.id}`)}
                  className="md:text-textBlueColor cursor-pointer w-[50%] flex items-center justify-center md:w-fit  md:text-base text-[13px] not-italic md:font-AeonikProMedium font-AeonikProRegular md:hover:underline md:px-0 px-[20px] ll:px-[25px] xs:px-[54px] md:py-0 py-2 md:rounded-0 rounded-lg md:bg-white bg-locationBg text-locationText"
                >
                  Локации
                </button>
                <p
                  onClick={() => goDetail(data?.id)}
                  className="text-textBlueColor cursor-pointer w-[50%] flex items-center justify-center md:w-fit  md:text-base text-[13px] not-italic md:font-AeonikProMedium font-AeonikProRegular md:hover:underline md:px-0  px-[20px] ll:px-[25px] xs:px-[54px] md:py-0 py-2 md:rounded-0 rounded-lg md:bg-white bg-Editbg"
                >
                  Подробнее
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div >
  );
}
export default React.memo(MyMarket);
