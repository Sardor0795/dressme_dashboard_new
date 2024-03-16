import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { dressMainData } from "../../hook/ContextTeam";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../hook/useHttp";
import LoadingForSeller from "../Loading/LoadingFor";
import axios from "axios";
import { SellerRefresh } from "../../hook/SellerRefreshToken";
import { ShopLocationProductList } from "../../hook/ShopLocationProductList";
const { REACT_APP_BASE_URL } = process.env;


export default function Products() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [sellerRefreshToken] = useContext(SellerRefresh)
  const [shopLocationProductList, setShopLocationProductList] = useContext(ShopLocationProductList)

  const location = useLocation();
  const pathname = window.location.pathname;

  useEffect(() => {
    if (pathname !== 'products/location/:id') {
      setDressInfo({ ...dressInfo, nextPageShowForm: true })
    }
  }, [location.pathname]);


  const fetchData = async (customHeaders) => {
    try {
      const response = await axios.get(`${REACT_APP_BASE_URL}/products/locations`, {
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
  const { isLoading } = useQuery(['seller_location_list1'], () => fetchData(customHeaders), {
    onSuccess: (data) => {
      if (data?.status >= 200 && data?.status < 300) {
        data?.data?.products_locations?.map(item => {
          if (item?.shop_locations?.length >= 1) {
            setDressInfo({ ...dressInfo, sellerStatus: data?.status })
            setShopLocationProductList(item?.shop_locations)
          }
        })
      }
      if (data?.status === 401) {
        setDressInfo({ ...dressInfo, sellerStatus: data?.status })
        sellerRefreshToken()
      }
    },
    onError: (error) => {
      if (error?.response?.status === 401) {
        sellerRefreshToken()
        setDressInfo({ ...dressInfo, sellerStatus: error?.response?.status })
      }
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
   return (
    <main className="products w-full px-4 md:px-10 md:pb-5">
      {!isLoading ?
        <Outlet />
        :
        <LoadingForSeller />
      }
    </main>
  );
}
