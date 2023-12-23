import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import MyMarket from "../MyMarket/MyMarket";
import AddStore from "../AddMarket/AddStore/AddStore";
import LoadingForSeller from "../../Loading/LoadingFor";
import { useHttp } from "../../../hook/useHttp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function MarketIsStoreCheck() {
  const [sellerShops, setSellerShops] = useState("");
  const [loading, setLoading] = useState(true);
  const { request } = useHttp()

  // // ------------GET  Has Magazin ?-----------------
  const { refetch } = useQuery(["seller_shops"], () => { return request({ url: "/shops", token: true }) },
    {
      onSuccess: (res) => {
        if (res?.shops) {
          setSellerShops(res);
          setLoading(false)
          console.log(res, "MerketIsCheck");

        }
      },
      onError: (err) => {
        setLoading(false)
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  console.log(sellerShops, "sellerShops marketCheck");

  return (
    <div>
      {/* <ToastContainer
        style={{ zIndex: "1000", top: "80px" }}
        position="top-right"
        autoClose={5000}
        limit={4}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
      {loading ? (
        <LoadingForSeller />
      ) : (
        <div>
          {sellerShops?.shops?.data?.length >= 1 && <MyMarket shopsList={sellerShops} onRefetch={refetch} />}
          {sellerShops?.shops?.data?.length == 0 && <AddStore shopsList={sellerShops} onRefetch={refetch} />}
        </div>
      )}
    </div>
  );
}
