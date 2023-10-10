import { useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
export const dressMainData = createContext();

export default function ContextTeam({ children }) {
  const [dressInfo, setDressInfo] = useState({
    isItPorduct: true,
    isAuthen: true,
    ConfirmAuthen: false,
    // AccessTokenSeller: localStorage.getItem('DressmeUserToken'),
    // ------------sellerUserInformation
    sellerFname: "",
    sellerLname: "",
    sellerEmail: "",
    sellerCardNumber: "",
    sellerRegionId: "",
    sellerSubRegionId: "",
    sellerTypeId: "",
    sellerStatus: "",
    sellerPhoneCode: "",
    sellerPhoneNum: "",
    // ---------------url-----------
    hasMagazin: "",
    hasLocation: "",

  });
  const url = "https://api.dressme.uz/api/seller"

  // ----------------Get Seller Profile-------------
  useQuery(["get profile"], () => {
    return fetch(`${url}/profile`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },

    }).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        setDressInfo({
          ...dressInfo,
          sellerFname: res.name,
          sellerLname: res.surname,
          sellerEmail: res?.email,
          sellerCardNumber: res?.card_number,
          sellerRegionId: res?.region_id,
          sellerSubRegionId: res?.sub_region_id,
          sellerTypeId: res?.seller_type_id,
          sellerStatus: res?.status,
          sellerPhoneCode: res?.phone.slice(0, 3),
          sellerPhoneNum: res?.phone.slice(3, 12),
        })


      },
      onError: (err) => {
        console.log(err, "err");
      },

      keepPreviousData: true, // bu browserdan tashqariga chiqib yana kirsa, yana yurishni oldini olish uchun
      refetchOnWindowFocus: false, // bu ham focus bolgan vaqti malumot olib kelish
    }
  )

  // ------------GET  Has Magazin ?-----------------
  useQuery(["magazin"], () => {
    return fetch(`${url}/shops`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },

    }).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        setDressInfo({ ...dressInfo, hasMagazin: res })
      },
      onError: (err) => {
        console.log(err, "err");
      },
      // keepPreviousData: true,
      // refetchOnWindowFocus: false,
    }
  )
  // ------------GET  Has Location ?-----------------
  useQuery(["magazin location"], () => {
    return fetch(`${url}/shops/locations/index`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },

    }).then(res => res.json())
  },
    {
      onSuccess: (res) => {
        setDressInfo({ ...dressInfo, hasLocation: res })
      },
      onError: (err) => {
        console.log(err, "err");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  )
  console.log(dressInfo?.hasMagazin, "hasMagazinhasMagazin");
  console.log(dressInfo?.hasLocation, "hasLocationhasLocation");

  return (
    <dressMainData.Provider value={[dressInfo, setDressInfo]}>
      {children}
    </dressMainData.Provider>
  );
}
