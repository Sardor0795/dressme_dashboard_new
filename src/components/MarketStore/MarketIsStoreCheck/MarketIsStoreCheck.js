import React from "react";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import MyMarket from "../MyMarket/MyMarket";
import AddStore from "../AddMarket/AddStore/AddStore";
import LoadingForSeller from "../../Loading/LoadingFor";

export default function MarketIsStoreCheck() {
  const [sellerShops, setSellerShops] = useState("");
  const [loading, setLoading] = useState(true);
  // LoadingForSeller
  const url = "https://api.dressme.uz/api/seller";

  // // ------------GET  Has Magazin ?-----------------
  const { isLoading, isFetching } = useQuery(
    ["sellerShops"],
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
        console.log(res, "markets");
        if (res?.shops) {
          setSellerShops(res);
          setLoading(false)
        }
        // setDressInfo({ ...dressInfo, SellerMagazin: res })
      },
      onError: (err) => {
        console.log(err, "err magazin");
      },
      keepPreviousData: true, // bu browserdan tashqariga chiqib yana kirsa, yana yurishni oldini olish uchun
      refetchOnWindowFocus: false, // bu ham focus bolgan vaqti malumot olib kelish
    }
  );

  return (
    <div>
      {loading ? (
        <LoadingForSeller />
      ) : (
        <>
          {sellerShops?.shops?.data?.length >= 1 && <MyMarket />}
          {sellerShops?.shops?.data?.length == 0 && <AddStore />}
        </>
      )}
    </div>
  );
}
