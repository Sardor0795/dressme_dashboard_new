import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { dressMainData } from "../../hook/ContextTeam";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../hook/useHttp";
import LoadingForSeller from "../Loading/LoadingFor";
import axios from "axios";
import { SellerRefresh } from "../../hook/SellerRefreshToken";
import { ShopLocationProductList } from "../../hook/ShopLocationProductList";
import axiosInstance from "../Authentication/AxiosIntance";
import { ShopLocationProductCheck } from "../../hook/ShopLocationProductCheck";
const { REACT_APP_BASE_URL } = process.env;


export default function Products() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [sellerRefreshToken] = useContext(SellerRefresh);
  const [shopLocationProductList, setShopLocationProductList] = useContext(ShopLocationProductList);
  const [shopLocationProductCheck, setShopLocationProductCheck] = useContext(ShopLocationProductCheck);
  const [loader, setLoader] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== 'products/location/:id') {
      setDressInfo({ ...dressInfo, nextPageShowForm: true });
    }
  }, [location.pathname]);

  const fetchData = async (customHeaders) => {
    try {
      const response = await axiosInstance.get("/products/locations", {
        headers: customHeaders,
      });
      const status = response.status;
      const data = response.data;
      return { data, status };
    } catch (error) {
      const status = error.response ? error.response.status : null;
      return { error, status };
    }
  };

  const customHeaders = {
    'Content-type': 'application/json; charset=UTF-8',
    "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,    // Add other headers as needed
  };

  const { isLoading } = useQuery(['seller_location_list12'], () => fetchData(customHeaders), {
    onSuccess: (data) => {
      if (data?.status >= 200 && data?.status < 300) {
         setShopLocationProductCheck(data?.data?.products_locations);
        // data?.data?.products_locations?.forEach(item => {
        //    if (item?.shop_locations?.length >= 1) {
        //   }
        // });
      }
    },
    onError: (error) => {
      throw new Error(error || "something wrong");
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (!shopLocationProductList) {
      setLoader(true)
    }
    const checkProduct = shopLocationProductCheck?.some(item => {
      return item?.shop_locations?.map(data => { return data?.products?.length > 0 })
    })
  
    setShopLocationProductList(checkProduct)
    setLoader(false)
  }, [shopLocationProductCheck]);
 
  return (
    <main className="products w-full px-4 md:px-10 md:pb-5">
      {!isLoading && !loader ? <Outlet /> : <LoadingForSeller />}
    </main>
  );
}
