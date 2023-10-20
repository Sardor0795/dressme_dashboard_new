import React, { useContext, useState } from "react";
import { deliveryIcon, man, nike, woman } from "../../../assets";
import { BgNoImgIcon, StarIcon } from "../../../assets/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { dressMainData } from "../../../hook/ContextTeam";
import { useQuery } from "@tanstack/react-query";

const MarketList = () => {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [sellerMagazinList, setSellerMagazinList] = useState();
  const [deliverList, setDeliverList] = useState();

  const url = "https://api.dressme.uz/api/seller";

  // // ------------GET  Has Magazin ?-----------------
  useQuery(
    ["magazin"],
    () => {
      return fetch(`${url}/shops`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",

          Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
        },
      }).then((res) => res.json());
    },
    {
      onSuccess: (res) => {
        setSellerMagazinList(res);
        // setDressInfo({ ...dressInfo, SellerMagazin: res })
      },
      onError: (err) => {
        console.log(err, "err magazin");
      },
    }
  );
  // ------------GET METHOD delivery-method-----------------
  useQuery(["get delivery-method"], () => {
    return fetch(`${url}/delivery-method`, {
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
    }).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        // console.log(res?.delivery_methods, "delivery-method");
        setDeliverList(res?.delivery_methods)
      },
      onError: (err) => {
        console.log(err, "err getDelivery-method");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`/store/market-list/:${id}`);
  };

  return (
    <div className="w-full h-fit  flex flex-col gap-y-[30px] ">
      {sellerMagazinList?.shops?.data?.map((data, index) => {
        return (
          <div
            key={data?.id}
            className="w-full md:h-[100px] h-fit border border-borderColor md:pr-10  p-[10px] md:p-0 rounded-lg flex md:flex-row flex-col justify-between items-center"
          >
            <div className="w-full md:w-fit flex items-center md:flex-row flex-col justify-center md:justify-start  md:border-0 border-b border-borderColor">
              <div className="w-full md:w-fit flex items-center justify-between  md:pr-7 md:pl-5 text-xl font-AeonikProRegular ">
                <div className="w-[40%] border-b border-borderColor h-[2px] md:hidden"></div>
                <span className="text-checkboxBorder md:text-black flex items-center">
                  {" "}
                  <span className="md:hidden flex">0</span>
                  {data?.id}
                </span>
                <div className="w-[40%] border-b border-borderColor h-[2px] md:hidden"></div>
              </div>
              <div className="w-full md:w-fit flex items-center justify-between my-[15px] md:my-0 ">
                <figure className="w-[80px] md:w-[120px] h-[80px] overflow-hidden md:h-[120px] md:left-[40px] rounded-full border border-searchBgColor flex items-center justify-center bg-white">
                  <img
                    src={data?.url_logo_photo}
                    alt=""
                    className="w-full h-full  object-cover"
                  />
                </figure>
                <div className="flex flex-col ll:ml-8">
                  <p className="text-[13px] ls:text-[14px] xs:text-xl  xs:font-AeonikProMedium font-AeonikProRegular  mb-3">
                    {data?.name || null}
                  </p>
                  <div className="">
                    <div className="flex items-center ">
                      <div className="flex items-center  mr-[6px]">
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
                <div className="ll:w-12 w-[36px] h-[36px] ll:h-12 rounded-lg border border-borderColor flex items-center justify-center">
                  <img src={man} alt="" />
                </div>
                <div className="ll:w-12 w-[36px] h-[36px] ll:h-12 rounded-lg border border-borderColor flex items-center justify-center">
                  <img src={woman} alt="" />
                </div>
              </div>
              <div className="h-[36px] ll:h-12 px-1 ls:px-[10px] md:w-[260px] ll:px-5 active:opacity-70 border border-borderColor rounded-lg flex items-center gap-x-1 ll:gap-x-3 ">
                <img src={deliveryIcon} alt="" />
                {
                  deliverList?.filter(e => e.id == data?.delivery_id)?.map(item => {
                    return (
                      <span className="text-tableTextTitle2 text-[11px] ls:text-[12px] ll:text-[14px] xs:text-base not-italic font-AeonikProRegular ll:font-AeonikProMedium">
                        {item?.name_ru}
                      </span>

                    )
                  })
                }
              </div>
            </div>
            <div className="w-full md:w-fit flex items-center justify-between gap-x-4 sm:gap-x-[50px]  mt-4 ll:mt-6 md:mt-0">
              <NavLink
                to={`locations/shop/${data?.id}`}
                className="md:text-textBlueColor cursor-pointer w-[50%] flex items-center justify-center md:w-fit  md:text-base text-[13px] not-italic md:font-AeonikProMedium font-AeonikProRegular md:hover:underline md:px-0 px-[20px] ll:px-[25px] xs:px-[54px] md:py-0 py-2 md:rounded-0 rounded-lg md:bg-white bg-locationBg text-locationText"
              >
                Локации
              </NavLink>
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
  );
};
export default MarketList;
