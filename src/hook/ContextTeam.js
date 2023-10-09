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

  });
  const url = "https://api.dressme.uz/api/seller"

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
        console.log(res, "DressINfo");
        setDressInfo({
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


  // useEffect(() => {
  //   setDressInfo({ ...dressInfo, AccessTokenSeller: localStorage.getItem('DressmeUserToken') })
  // }, []);
  return (
    <dressMainData.Provider value={[dressInfo, setDressInfo]}>
      {children}
    </dressMainData.Provider>
  );
}
