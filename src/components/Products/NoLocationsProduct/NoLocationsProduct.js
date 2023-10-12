import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { dressMainData } from "../../../hook/ContextTeam";

export default function NoLocationProduct() {

  const [dressInfo, setDressInfo] = useContext(dressMainData);


  // const url = "https://api.dressme.uz/api/seller"

  // // // ------------GET  Has Magazin ?-----------------
  // useQuery(["magazin"], () => {
  //   return fetch(`${url}/shops`, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //       "Accept": "application/json",

  //       'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
  //     },

  //   }).then(res => res.json())
  // },
  //   {
  //     onSuccess: (res) => {
  //       setDressInfo({ ...dressInfo, SellerMagazin: res })
  //     },
  //     onError: (err) => {
  //       console.log(err, "err magazin");
  //     },
  //     keepPreviousData: true,
  //     refetchOnWindowFocus: false,
  //   }
  // )

  // // ------------GET  Has Location ?-----------------
  // useQuery(["magazin location"], () => {
  //   return fetch(`${url}/shops/locations/index`, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //       "Accept": "application/json",
  //       'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
  //     },

  //   }).then(res => res.json())
  // },
  //   {
  //     onSuccess: (res) => {
  //       setDressInfo({ ...dressInfo, SellerMagazinLocation: res })

  //     },
  //     onError: (err) => {
  //       console.log(err, "err magazin location");
  //     },
  //     keepPreviousData: true,
  //     refetchOnWindowFocus: false,
  //   }
  // )

  console.log(dressInfo?.SellerMagazinLocation, "dressInfo?.SellerMagazinLocation");
  console.log(dressInfo?.SellerMagazin, "dressInfo?.SellerMagazin");
  return (
    <div className="w-full h-[90vh] ">
      {
        dressInfo?.SellerMagazin?.shops?.data?.length ? (

          !dressInfo?.SellerMagazinLocation?.length && <div className="flex items-center h-full justify-center">
            <Link
              to="/locations-store"
              className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline"
            >
              Сначала добавьте локацию!
            </Link>
          </div>
        )
          :
          <div className="flex items-center h-full justify-center">
            <Link
              to="/store"
              className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline"
            >
              Сначала создайте магазин!
            </Link>
          </div>
      }
      {/* { dressInfo?.hasMagazin?.shops?.data?.length && dressInfo?.hasLocation && <div className="flex items-center h-full justify-center">
        <Link
          to="/locations-store"
          className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline"
        >
          Сначала добавьте локацию!
        </Link>
      </div>}
      {
        !dressInfo?.hasMagazin?.shops?.data?.length && <div className="flex items-center h-full justify-center">
          <Link
            to="/store"
            className="text-textBlueColor text-2xl not-italic font-AeonikProRegular hover:underline"
          >
            Сначала создайте магазин!
          </Link>
        </div>
      } */}



    </div>
  );
}
