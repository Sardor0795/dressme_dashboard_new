import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import MyMarket from "../MyMarket/MyMarket";
import AddStore from "../AddMarket/AddStore/AddStore";
import LoadingForSeller from "../../Loading/LoadingFor";
import { useHttp } from "../../../hook/useHttp";

export default function MarketIsStoreCheck() {
  const [sellerShops, setSellerShops] = useState("");
  const [loading, setLoading] = useState(true);
  const { request } = useHttp()

  // // ------------GET  Has Magazin ?-----------------
  useQuery(["seller_shops"], () => { return request({ url: "/shops", token: true }) },
    {
      onSuccess: (res) => {
        if (res?.shops) {
          setSellerShops(res);
          setLoading(false)
        }
      },
      onError: (err) => {
        setLoading(false)
        console.log(err, "err magazin");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div>
      {loading ? (
        <LoadingForSeller />
      ) : (
        <>
          {sellerShops?.shops?.data?.length >= 1 && <MyMarket shopsList={sellerShops} />}
          {sellerShops?.shops?.data?.length == 0 && <AddStore shopsList={sellerShops} />}
        </>
      )}
    </div>
  );
}
