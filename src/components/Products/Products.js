import React, { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { dressMainData } from "../../hook/ContextTeam";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../hook/useHttp";
import LoadingForSeller from "../Loading/LoadingFor";
import axios from "axios";
const { REACT_APP_BASE_URL } = process.env;


export default function Products() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const { request } = useHttp()
  const location = useLocation();
  const pathname = window.location.pathname;
  useEffect(() => {
    if (pathname !== 'products/location/:id') {
      setDressInfo({ ...dressInfo, nextPageShowForm: true })
    }
  }, [location.pathname]);

  // const { isLoading } = useQuery(["products_list"], () => { return request({ url: "/products/locations", token: true }) },
  //   {
  //     onSuccess: (res) => {
  //       console.log(res, "res");
  //       res?.products_locations?.map(item => {
  //         if (item?.shop_locations?.length >= 1) {
  //           setDressInfo({ ...dressInfo, isCheckPoructList: item?.shop_locations })
  //         }
  //       })
  //     },
  //     keepPreviousData: true,
  //     refetchOnWindowFocus: false,
  //   }
  // );

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
  useQuery(['seller_getProductList_list_product'], () => fetchData(customHeaders), {
    onSuccess: (data) => {
      console.log(data, "data");
      if (data?.status >= 200 && data?.status < 300) {
        setDressInfo({ ...dressInfo, getProductList: data?.data })
        data?.data?.products_locations?.map(item => {
          if (item?.shop_locations?.length >= 1) {
            setDressInfo({ ...dressInfo, isCheckPoructList: item?.shop_locations })
          }
        })
      }
      if (data?.status === 401) {

      }
    },
    onError: (error) => {
      if (error?.response?.status === 401) {

      }
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
  return (
    <main className="products w-full  md:pb-5">
      {dressInfo?.isCheckPoructList ?
        <Outlet />
        :
        <LoadingForSeller />
      }
    </main>
  );
}
